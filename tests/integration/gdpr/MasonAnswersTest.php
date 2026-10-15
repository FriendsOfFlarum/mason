<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Tests\integration\gdpr;

use Flarum\Discussion\Discussion;
use Flarum\Gdpr\DataProcessor;
use Flarum\Post\Post;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use FoF\Mason\Gdpr\MasonAnswers;
use PHPUnit\Framework\Attributes\Test;

class MasonAnswersTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        // gdpr first: Mason lists it as an optional dependency, so it boots before Mason.
        $this->extension('flarum-gdpr', 'fof-mason');

        $now = date('Y-m-d H:i:s');
        $field = fn (array $f) => $f + ['min_answers_count' => 0, 'max_answers_count' => 1, 'show_when_empty' => false, 'created_at' => $now, 'updated_at' => $now];
        $answer = fn (array $a) => $a + ['created_at' => $now, 'updated_at' => $now];
        $link = fn (int $discussionId, int $answerId) => ['discussion_id' => $discussionId, 'answer_id' => $answerId, 'created_at' => $now, 'updated_at' => $now];

        $this->prepareDatabase([
            User::class => [
                $this->normalUser(),
                ['id' => 3, 'username' => 'other', 'email' => 'other@machine.local', 'is_email_confirmed' => 1],
            ],
            Discussion::class => [
                ['id' => 1, 'title' => 'Crash on startup', 'user_id' => 2, 'first_post_id' => 1],
                ['id' => 2, 'title' => 'Private one', 'user_id' => 2, 'first_post_id' => 2, 'is_private' => true],
                ['id' => 3, 'title' => 'Someone else', 'user_id' => 3, 'first_post_id' => 3],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'number' => 1, 'user_id' => 2],
                ['id' => 2, 'discussion_id' => 2, 'number' => 1, 'user_id' => 2, 'is_private' => true],
                ['id' => 3, 'discussion_id' => 3, 'number' => 1, 'user_id' => 3],
            ],
            'fof_mason_fields' => array_map($field, [
                ['id' => 1, 'name' => 'Operating system', 'user_values_allowed' => false, 'sort' => 1],
                ['id' => 2, 'name' => 'App version', 'user_values_allowed' => true, 'sort' => 0],
                ['id' => 3, 'name' => 'Retired field', 'user_values_allowed' => false, 'sort' => 2, 'deleted_at' => $now],
            ]),
            'fof_mason_answers' => array_map($answer, [
                ['id' => 11, 'field_id' => 1, 'content' => 'Linux', 'is_suggested' => true],
                ['id' => 21, 'field_id' => 2, 'content' => '2.3.1', 'is_suggested' => false],
                ['id' => 22, 'field_id' => 2, 'content' => '9.9.9', 'is_suggested' => false],
                ['id' => 23, 'field_id' => 2, 'content' => 'orphaned earlier', 'is_suggested' => false],
                ['id' => 31, 'field_id' => 3, 'content' => 'Retired answer', 'is_suggested' => true],
            ]),
            'fof_mason_discussion_answer' => [
                $link(1, 11), $link(1, 21), $link(1, 22), $link(1, 31),
                $link(2, 11),
                // "2.3.1" is shared: another user typed the same text.
                $link(3, 11), $link(3, 21),
            ],
        ]);
    }

    protected function type(int $userId): MasonAnswers
    {
        return $this->app()->getContainer()->make(MasonAnswers::class, [
            'user'           => User::query()->findOrFail($userId),
            'erasureRequest' => null,
        ]);
    }

    protected function pivotRows(int $discussionId): array
    {
        return $this->database()->table('fof_mason_discussion_answer')
            ->where('discussion_id', $discussionId)->orderBy('answer_id')->pluck('answer_id')->all();
    }

    protected function answerExists(int $id): bool
    {
        return $this->database()->table('fof_mason_answers')->where('id', $id)->exists();
    }

    #[Test]
    public function it_is_registered_with_gdpr(): void
    {
        $this->app();

        // Descriptions are not asserted: the test install has no language pack, so even gdpr's own stay untranslated.
        $this->assertArrayHasKey(MasonAnswers::class, $this->app()->getContainer()->make(DataProcessor::class)->types());
    }

    #[Test]
    public function export_lists_the_answers_on_each_public_discussion_the_user_started(): void
    {
        $export = $this->type(2)->export();

        $this->assertCount(1, $export);
        $this->assertSame(['mason/discussion-1.json'], array_keys($export[0]));
        $this->assertSame([
            'discussion_id' => 1,
            'title'         => 'Crash on startup',
            'fields'        => [
                ['field' => 'App version', 'answers' => ['2.3.1', '9.9.9']],
                ['field' => 'Operating system', 'answers' => ['Linux']],
            ],
        ], json_decode($export[0]['mason/discussion-1.json'], true));
    }

    #[Test]
    public function export_is_empty_for_a_user_without_answers(): void
    {
        $this->assertNull($this->type(1)->export());
    }

    #[Test]
    public function anonymizing_keeps_the_answers(): void
    {
        $this->type(2)->anonymize();

        $this->assertSame([11, 21, 22, 31], $this->pivotRows(1));
        $this->assertSame([11], $this->pivotRows(2));
        $this->assertTrue($this->answerExists(22));
    }

    #[Test]
    public function deleting_unlinks_the_users_answers_and_purges_unused_free_text(): void
    {
        $this->type(2)->delete();

        // Every discussion the user started loses its answers, private ones included.
        $this->assertSame([], $this->pivotRows(1));
        $this->assertSame([], $this->pivotRows(2));
        // Other users' discussions keep theirs.
        $this->assertSame([11, 21], $this->pivotRows(3));

        $this->assertTrue($this->answerExists(21), 'free text still used by another discussion survives');
        $this->assertFalse($this->answerExists(22), 'free text no longer used is deleted');
        $this->assertFalse($this->answerExists(23), 'free text already unused is deleted');
        $this->assertTrue($this->answerExists(11), 'suggested answers are admin data');
        $this->assertTrue($this->answerExists(31), 'suggested answers are admin data');
    }
}

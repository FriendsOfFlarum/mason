<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Tests\integration\api;

use Flarum\Extend;
use FoF\Mason\Answer;
use FoF\Mason\Event\DiscussionAnswersChanged;
use FoF\Mason\Tests\integration\MasonTestCase;
use PHPUnit\Framework\Attributes\Test;

/**
 * The event is public API for other extensions, independent of flarum/audit.
 */
class DiscussionAnswersChangedEventTest extends MasonTestCase
{
    /** @var DiscussionAnswersChanged[] */
    public static array $dispatched = [];

    protected function setUp(): void
    {
        parent::setUp();

        self::$dispatched = [];

        $this->extend((new Extend\Event())->listen(DiscussionAnswersChanged::class, function (DiscussionAnswersChanged $event) {
            self::$dispatched[] = $event;
        }));

        $this->seedMason(
            [
                ['id' => 1, 'name' => 'Operating system', 'min_answers_count' => 0],
                ['id' => 2, 'name' => 'App version', 'min_answers_count' => 0, 'user_values_allowed' => true],
            ],
            [
                ['id' => 11, 'field_id' => 1, 'content' => 'Windows'],
                ['id' => 12, 'field_id' => 1, 'content' => 'Linux'],
            ],
            $this->discussionRows(1, 2)
                + $this->memberPermissionRows('startDiscussion', 'postWithoutThrottle', 'fof-mason.fill-fields', 'fof-mason.update-own-fields')
                + ['fof_mason_discussion_answer' => [['discussion_id' => 1, 'answer_id' => 11]]]
        );
    }

    protected function setAnswers(array $answers): void
    {
        $response = $this->json('PATCH', '/api/discussions/1', 2, [
            'type'          => 'discussions',
            'id'            => '1',
            'relationships' => ['masonAnswers' => ['data' => $answers]],
        ]);

        $this->assertEquals(200, $response->getStatusCode(), $this->msg($response));
    }

    protected function contents(array $answers): array
    {
        return array_map(fn (Answer $answer) => $answer->content, $answers);
    }

    #[Test]
    public function changing_answers_dispatches_old_and_new_answers(): void
    {
        $this->setAnswers([['type' => 'mason-answers', 'id' => '12']]);

        $this->assertCount(1, self::$dispatched);
        $this->assertSame(['Windows'], $this->contents(self::$dispatched[0]->oldAnswers));
        $this->assertSame(['Linux'], $this->contents(self::$dispatched[0]->newAnswers));
        $this->assertSame(2, self::$dispatched[0]->actor->id);
    }

    #[Test]
    public function adding_free_text_dispatches_with_the_saved_answer(): void
    {
        $this->setAnswers([
            ['type' => 'mason-answers', 'id' => '11'],
            ['type' => 'mason-answers', 'attributes' => ['content' => '2.3.1'], 'relationships' => ['field' => ['data' => ['type' => 'mason-fields', 'id' => '2']]]],
        ]);

        $this->assertCount(1, self::$dispatched);
        $this->assertSame(['Windows', '2.3.1'], $this->contents(self::$dispatched[0]->newAnswers));
        $this->assertTrue(self::$dispatched[0]->newAnswers[1]->exists, 'dispatched after the save');
    }

    #[Test]
    public function saving_the_same_answers_dispatches_nothing(): void
    {
        $this->setAnswers([['type' => 'mason-answers', 'id' => '11']]);

        $this->assertSame([], self::$dispatched);
    }

    #[Test]
    public function starting_a_discussion_dispatches_nothing(): void
    {
        $response = $this->json('POST', '/api/discussions', 2, [
            'type'          => 'discussions',
            'attributes'    => ['title' => 'A new discussion', 'content' => 'Hello world, this is a post'],
            'relationships' => ['masonAnswers' => ['data' => [['type' => 'mason-answers', 'id' => '12']]]],
        ]);

        $this->assertEquals(201, $response->getStatusCode(), $this->msg($response));
        $this->assertSame([], self::$dispatched);
    }
}

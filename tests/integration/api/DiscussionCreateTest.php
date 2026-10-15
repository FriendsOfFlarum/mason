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

use FoF\Mason\Tests\integration\MasonTestCase;
use Psr\Http\Message\ResponseInterface;

class DiscussionCreateTest extends MasonTestCase
{
    private function seed(array $permissions, ?array $fields = null): void
    {
        $this->seedMason(
            $fields ?? [
                ['id' => 1, 'name' => 'Color', 'min_answers_count' => 0, 'user_values_allowed' => true],
                ['id' => 2, 'name' => 'Size', 'min_answers_count' => 0, 'user_values_allowed' => false],
            ],
            [
                ['id' => 1, 'field_id' => 1, 'content' => 'Red', 'is_suggested' => true],
                ['id' => 2, 'field_id' => 2, 'content' => 'Large', 'is_suggested' => true],
            ],
            $this->memberPermissionRows('startDiscussion', 'postWithoutThrottle', ...$permissions)
        );
    }

    private function create(?array $answers, string $content = 'Hello world, this is a post'): ResponseInterface
    {
        $data = [
            'type'       => 'discussions',
            'attributes' => ['title' => 'A test discussion title', 'content' => $content],
        ];

        if ($answers !== null) {
            $data['relationships'] = ['masonAnswers' => ['data' => $answers]];
        }

        return $this->json('POST', '/api/discussions', 2, $data);
    }

    private function inline(int $fieldId, string $content): array
    {
        return [
            'type'          => 'mason-answers',
            'attributes'    => ['content' => $content],
            'relationships' => ['field' => ['data' => ['type' => 'mason-fields', 'id' => (string) $fieldId]]],
        ];
    }

    private function pivotCount(): int
    {
        return $this->database()->table('fof_mason_discussion_answer')->count();
    }

    public function test_create_with_suggested_answer(): void
    {
        $this->seed(['fof-mason.fill-fields', 'fof-mason.see-own-fields']);

        $r = $this->create([['type' => 'mason-answers', 'id' => '1']]);

        $this->assertEquals(201, $r->getStatusCode(), $this->msg($r));
        $this->assertEquals(1, $this->database()->table('fof_mason_discussion_answer')->where('answer_id', 1)->count());
        $rel = $this->decode($r)['data']['relationships']['masonAnswers']['data'] ?? [];
        $this->assertEquals(['1'], array_column($rel, 'id'), $this->msg($r));
    }

    public function test_inline_answer_creates_and_reuses_answer_row(): void
    {
        $this->seed(['fof-mason.fill-fields']);

        $r = $this->create([$this->inline(1, 'Teal')]);
        $this->assertEquals(201, $r->getStatusCode(), $this->msg($r));

        $answers = $this->database()->table('fof_mason_answers')->where('content', 'Teal')->get();
        $this->assertCount(1, $answers);
        $this->assertEquals(0, $answers[0]->is_suggested);

        $r = $this->create([$this->inline(1, 'Teal')], 'Another post with the same answer');
        $this->assertEquals(201, $r->getStatusCode(), $this->msg($r));

        $this->assertEquals(1, $this->database()->table('fof_mason_answers')->where('content', 'Teal')->count());
        $this->assertEquals(2, $this->database()->table('fof_mason_discussion_answer')->where('answer_id', $answers[0]->id)->count());
    }

    public function test_inline_answer_on_field_without_user_values_is_forbidden(): void
    {
        $this->seed(['fof-mason.fill-fields']);

        $r = $this->create([$this->inline(2, 'Huge')]);

        $this->assertEquals(403, $r->getStatusCode(), $this->msg($r));
        $this->assertEquals(0, $this->database()->table('fof_mason_answers')->where('content', 'Huge')->count());
    }

    private function requiredFields(): array
    {
        return [['id' => 1, 'name' => 'Color', 'min_answers_count' => 1, 'user_values_allowed' => true]];
    }

    public function test_required_field_omitted_is_rejected(): void
    {
        $this->seed(['fof-mason.fill-fields'], $this->requiredFields());

        $r = $this->create([]);

        $this->assertEquals(422, $r->getStatusCode(), $this->msg($r));
        $this->assertEquals(0, $this->pivotCount());
    }

    public function test_required_field_with_relationship_absent_is_rejected(): void
    {
        $this->seed(['fof-mason.fill-fields'], $this->requiredFields());

        $r = $this->create(null);

        $this->assertEquals(422, $r->getStatusCode(), $this->msg($r));
        $this->assertEquals(0, $this->database()->table('discussions')->count());
    }

    public function test_malformed_inline_answer_is_a_bad_request(): void
    {
        $this->seed(['fof-mason.fill-fields']);

        $answer = $this->inline(1, 'Teal');
        $answer['relationships']['field']['data']['id'] = [];

        $r = $this->create([$answer]);

        $this->assertEquals(400, $r->getStatusCode(), $this->msg($r));
    }

    public function test_skip_required_fields_permission_allows_omission(): void
    {
        $this->seed(['fof-mason.fill-fields', 'fof-mason.skip-required-fields'], $this->requiredFields());

        $r = $this->create([]);

        $this->assertEquals(201, $r->getStatusCode(), $this->msg($r));
    }

    public function test_user_without_fill_fields_cannot_send_answers_but_can_omit(): void
    {
        $this->seed([]);

        $r = $this->create([['type' => 'mason-answers', 'id' => '1']]);
        $this->assertEquals(403, $r->getStatusCode(), $this->msg($r));

        $r = $this->create(null);
        $this->assertEquals(201, $r->getStatusCode(), $this->msg($r));
        $this->assertEquals(0, $this->pivotCount());
    }

    public function test_answers_of_soft_deleted_field_are_not_returned(): void
    {
        $this->seed(['fof-mason.fill-fields', 'fof-mason.see-own-fields', 'fof-mason.update-own-fields']);

        $r = $this->create([['type' => 'mason-answers', 'id' => '1']]);
        $this->assertEquals(201, $r->getStatusCode(), $this->msg($r));
        $discussionId = $this->decode($r)['data']['id'];

        $this->database()->table('fof_mason_fields')->where('id', 1)->update(['deleted_at' => date('Y-m-d H:i:s')]);

        $r = $this->json('GET', "/api/discussions/$discussionId", 2);
        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $body = $this->decode($r);
        $this->assertEmpty($body['data']['relationships']['masonAnswers']['data'] ?? [], $this->msg($r));
        $this->assertNotContains('mason-answers:1', $this->includedKeys($body), $this->msg($r));
    }
}

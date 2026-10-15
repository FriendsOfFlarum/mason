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

class DiscussionUpdateAndVisibilityTest extends MasonTestCase
{
    private function seed(array $permissions): void
    {
        $this->seedMason(
            [['id' => 1, 'name' => 'Color', 'min_answers_count' => 0]],
            [
                ['id' => 1, 'field_id' => 1, 'content' => 'Red', 'is_suggested' => true],
                ['id' => 2, 'field_id' => 1, 'content' => 'Blue', 'is_suggested' => true],
                ['id' => 3, 'field_id' => 1, 'content' => 'Secret', 'is_suggested' => false],
            ],
            $this->discussionRows(1, 2)
            + $this->memberPermissionRows(...$permissions)
            + ['fof_mason_discussion_answer' => [['discussion_id' => 1, 'answer_id' => 1]]]
        );
    }

    private function patchAnswers(int $userId, int $discussionId = 1): ResponseInterface
    {
        return $this->json('PATCH', "/api/discussions/$discussionId", $userId, [
            'type'          => 'discussions',
            'id'            => (string) $discussionId,
            'relationships' => ['masonAnswers' => ['data' => [['type' => 'mason-answers', 'id' => '2']]]],
        ]);
    }

    public function test_owner_with_update_own_replaces_answers(): void
    {
        $this->seed(['fof-mason.update-own-fields', 'fof-mason.see-own-fields']);

        $r = $this->patchAnswers(2);

        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $pivot = $this->database()->table('fof_mason_discussion_answer');
        $this->assertEquals(0, (clone $pivot)->where('answer_id', 1)->count());
        $this->assertEquals(1, (clone $pivot)->where('answer_id', 2)->count());
    }

    public function test_owner_without_update_permission_is_forbidden(): void
    {
        $this->seed(['fof-mason.see-own-fields']);

        $r = $this->patchAnswers(2);

        $this->assertEquals(403, $r->getStatusCode(), $this->msg($r));
        $this->assertEquals(1, $this->database()->table('fof_mason_discussion_answer')->where('answer_id', 1)->count());
    }

    public function test_update_other_fields_on_someones_discussion(): void
    {
        $this->seedMason(
            [['id' => 1, 'name' => 'Color', 'min_answers_count' => 0]],
            [
                ['id' => 1, 'field_id' => 1, 'content' => 'Red', 'is_suggested' => true],
                ['id' => 2, 'field_id' => 1, 'content' => 'Blue', 'is_suggested' => true],
            ],
            $this->discussionRows(1, 1) + $this->memberPermissionRows('fof-mason.update-other-fields')
        );

        $r = $this->patchAnswers(2);

        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $this->assertEquals(1, $this->database()->table('fof_mason_discussion_answer')->where('answer_id', 2)->count());
    }

    public function test_user_without_see_permissions_sees_no_answers(): void
    {
        $this->seed([]);

        $r = $this->json('GET', '/api/discussions/1', 2);

        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $data = $this->decode($r)['data'];
        $this->assertFalse($data['attributes']['canSeeMasonAnswers'], $this->msg($r));
        $this->assertArrayNotHasKey('masonAnswers', $data['relationships'] ?? [], $this->msg($r));
    }

    public function test_owner_with_see_own_sees_answers(): void
    {
        $this->seed(['fof-mason.see-own-fields', 'fof-mason.update-own-fields']);

        $r = $this->json('GET', '/api/discussions/1', 2);

        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $data = $this->decode($r)['data'];
        $this->assertTrue($data['attributes']['canSeeMasonAnswers'], $this->msg($r));
        $this->assertTrue($data['attributes']['canUpdateMasonAnswers'], $this->msg($r));
        $this->assertEquals(['1'], array_column($data['relationships']['masonAnswers']['data'] ?? [], 'id'), $this->msg($r));
    }

    public function test_can_update_flag_false_without_update_permission(): void
    {
        $this->seed(['fof-mason.see-own-fields']);

        $r = $this->json('GET', '/api/discussions/1', 2);

        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $attrs = $this->decode($r)['data']['attributes'];
        $this->assertTrue($attrs['canSeeMasonAnswers'], $this->msg($r));
        $this->assertFalse($attrs['canUpdateMasonAnswers'], $this->msg($r));
    }

    public function test_all_answers_relationship_hidden_from_non_admin_but_shown_to_admin(): void
    {
        $this->seed(['fof-mason.fill-fields']);

        $r = $this->json('GET', '/api', 2);
        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $body = $this->decode($r);

        foreach ($body['included'] ?? [] as $inc) {
            if ($inc['type'] === 'mason-fields') {
                $this->assertArrayNotHasKey('allAnswers', $inc['relationships'] ?? [], $this->msg($r));
            }
        }
        $this->assertNotContains('mason-answers:3', $this->includedKeys($body), $this->msg($r));

        $r = $this->json('GET', '/api/mason-fields', 1);
        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $first = $this->decode($r)['data'][0] ?? [];
        $this->assertArrayHasKey('allAnswers', $first['relationships'] ?? [], $this->msg($r));
        $this->assertCount(3, $first['relationships']['allAnswers']['data'], $this->msg($r));
    }
}

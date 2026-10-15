<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Tests\integration\audit;

use FoF\Mason\Tests\integration\MasonTestCase;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;

class AuditLogTest extends MasonTestCase
{
    protected function setUp(): void
    {
        // flarum/audit is an optional dependency of Mason, so it is enabled first.
        $this->extension('flarum-audit');

        parent::setUp();

        $this->seedMason(
            [
                ['id' => 1, 'name' => 'Operating system', 'min_answers_count' => 0, 'sort' => 0],
                ['id' => 2, 'name' => 'App version', 'min_answers_count' => 0, 'user_values_allowed' => true, 'sort' => 1],
            ],
            [
                ['id' => 11, 'field_id' => 1, 'content' => 'Windows'],
                ['id' => 12, 'field_id' => 1, 'content' => 'Linux'],
            ],
            $this->discussionRows(1, 2)
                + $this->memberPermissionRows('startDiscussion', 'postWithoutThrottle', 'fof-mason.fill-fields', 'fof-mason.see-own-fields', 'fof-mason.update-own-fields')
                + ['fof_mason_discussion_answer' => [['discussion_id' => 1, 'answer_id' => 11]]]
        );
    }

    /**
     * Key-sorted (see sortKeys()).
     *
     * @return array<int, array{actor_id: int|null, payload: array<string, mixed>}>
     */
    protected function logs(string $action): array
    {
        return $this->sortKeys($this->database()->table('audit_log')->where('action', $action)->orderBy('id')->get()
            ->map(fn ($log) => ['actor_id' => $log->actor_id, 'payload' => json_decode($log->payload, true)])
            ->all());
    }

    /**
     * MySQL's JSON columns store object keys in their own order, so payloads are compared by key.
     * Lists (e.g. `keys`) keep their order: it is part of the payload.
     */
    protected function sortKeys(array $value): array
    {
        if (!array_is_list($value)) {
            ksort($value);
        }

        return array_map(fn ($item) => is_array($item) ? $this->sortKeys($item) : $item, $value);
    }

    protected function assertLogs(array $expected, string $action): void
    {
        $this->assertSame($this->sortKeys($expected), $this->logs($action));
    }

    protected function assertSuccessful(ResponseInterface $response): void
    {
        $this->assertLessThan(300, $response->getStatusCode(), $this->msg($response));
    }

    protected function setAnswers(int $userId, array $answers): ResponseInterface
    {
        return $this->json('PATCH', '/api/discussions/1', $userId, [
            'type'          => 'discussions',
            'id'            => '1',
            'relationships' => ['masonAnswers' => ['data' => $answers]],
        ]);
    }

    #[Test]
    public function creating_a_field_is_logged(): void
    {
        $this->assertSuccessful($this->json('POST', '/api/mason-fields', 1, [
            'type'       => 'mason-fields',
            'attributes' => ['name' => 'Severity', 'min_answers_count' => 0, 'max_answers_count' => 1, 'show_when_empty' => false, 'user_values_allowed' => false],
        ]));

        $logs = $this->logs('mason_field.created');

        $this->assertCount(1, $logs);
        $this->assertSame(1, $logs[0]['actor_id']);
        $this->assertSame('Severity', $logs[0]['payload']['name']);
        $this->assertArrayHasKey('field_id', $logs[0]['payload']);
    }

    #[Test]
    public function updating_a_field_logs_only_what_changed(): void
    {
        $this->assertSuccessful($this->json('PATCH', '/api/mason-fields/1', 1, [
            'type'       => 'mason-fields',
            'id'         => '1',
            'attributes' => ['name' => 'OS', 'min_answers_count' => 1, 'show_when_empty' => false],
        ]));

        $logs = $this->logs('mason_field.updated');

        $this->assertCount(1, $logs);
        $this->assertSame($this->sortKeys([
            'field_id' => 1,
            'name'     => 'OS',
            'keys'     => ['name', 'min_answers_count'],
            'changes'  => [
                'name'              => ['old' => 'Operating system', 'new' => 'OS'],
                'min_answers_count' => ['old' => 0, 'new' => 1],
            ],
        ]), $logs[0]['payload']);
    }

    #[Test]
    public function saving_a_field_without_changes_is_not_logged(): void
    {
        $this->assertSuccessful($this->json('PATCH', '/api/mason-fields/1', 1, [
            'type'       => 'mason-fields',
            'id'         => '1',
            'attributes' => ['name' => 'Operating system'],
        ]));

        $this->assertSame([], $this->logs('mason_field.updated'));
    }

    #[Test]
    public function deleting_a_field_is_logged(): void
    {
        $this->assertSuccessful($this->json('DELETE', '/api/mason-fields/1', 1));

        $this->assertLogs([['actor_id' => 1, 'payload' => ['field_id' => 1, 'name' => 'Operating system']]], 'mason_field.deleted');
    }

    #[Test]
    public function adding_an_answer_is_logged(): void
    {
        $this->assertSuccessful($this->json('POST', '/api/mason-answers', 1, [
            'type'          => 'mason-answers',
            'attributes'    => ['content' => 'macOS', 'is_suggested' => true],
            'relationships' => ['field' => ['data' => ['type' => 'mason-fields', 'id' => '1']]],
        ]));

        $logs = $this->logs('mason_answer.created');

        $this->assertCount(1, $logs);
        $this->assertSame($this->sortKeys(['field_id' => 1, 'key' => 'Operating system', 'name' => 'macOS']), array_diff_key($logs[0]['payload'], ['answer_id' => 0]));
    }

    #[Test]
    public function updating_an_answer_is_logged_with_old_and_new_content(): void
    {
        $this->assertSuccessful($this->json('PATCH', '/api/mason-answers/11', 1, [
            'type'       => 'mason-answers',
            'id'         => '11',
            'attributes' => ['content' => 'Microsoft Windows', 'is_suggested' => true],
        ]));

        $this->assertLogs([[
            'actor_id' => 1,
            'payload'  => [
                'answer_id' => 11,
                'field_id'  => 1,
                'key'       => 'Operating system',
                'old_name'  => 'Windows',
                'new_name'  => 'Microsoft Windows',
                'keys'      => ['content'],
                'changes'   => ['content' => ['old' => 'Windows', 'new' => 'Microsoft Windows']],
            ],
        ]], 'mason_answer.updated');
    }

    #[Test]
    public function deleting_an_answer_is_logged(): void
    {
        $this->assertSuccessful($this->json('DELETE', '/api/mason-answers/12', 1));

        $this->assertLogs([[
            'actor_id' => 1,
            'payload'  => ['answer_id' => 12, 'field_id' => 1, 'key' => 'Operating system', 'name' => 'Linux'],
        ]], 'mason_answer.deleted');
    }

    #[Test]
    public function the_owner_changing_answers_is_logged_with_old_and_new_values(): void
    {
        $this->assertSuccessful($this->setAnswers(2, [['type' => 'mason-answers', 'id' => '12']]));

        $this->assertLogs([[
            'actor_id' => 2,
            'payload'  => [
                'discussion_id' => 1,
                'keys'          => ['Operating system'],
                'old_value'     => 'Operating system: Windows',
                'new_value'     => 'Operating system: Linux',
                'changes'       => ['Operating system' => ['old' => ['Windows'], 'new' => ['Linux']]],
            ],
        ]], 'discussion.mason_answers_changed');
    }

    #[Test]
    public function another_user_changing_answers_is_logged_as_that_user(): void
    {
        $this->assertSuccessful($this->setAnswers(1, [
            ['type' => 'mason-answers', 'id' => '11'],
            ['type' => 'mason-answers', 'attributes' => ['content' => '2.3.1'], 'relationships' => ['field' => ['data' => ['type' => 'mason-fields', 'id' => '2']]]],
        ]));

        $logs = $this->logs('discussion.mason_answers_changed');

        $this->assertCount(1, $logs);
        $this->assertSame(1, $logs[0]['actor_id']);
        $this->assertSame(['App version'], $logs[0]['payload']['keys']);
        $this->assertSame('', $logs[0]['payload']['old_value']);
        $this->assertSame('App version: 2.3.1', $logs[0]['payload']['new_value']);
    }

    #[Test]
    public function saving_the_same_answers_or_only_renaming_is_not_logged(): void
    {
        $this->assertSuccessful($this->setAnswers(2, [['type' => 'mason-answers', 'id' => '11']]));
        $this->assertSuccessful($this->json('PATCH', '/api/discussions/1', 1, [
            'type'       => 'discussions',
            'id'         => '1',
            'attributes' => ['title' => 'Renamed'],
        ]));

        $this->assertSame([], $this->logs('discussion.mason_answers_changed'));
    }

    #[Test]
    public function starting_a_discussion_with_answers_is_not_logged_as_a_change(): void
    {
        $this->assertSuccessful($this->json('POST', '/api/discussions', 2, [
            'type'          => 'discussions',
            'attributes'    => ['title' => 'A new discussion', 'content' => 'Hello world, this is a post'],
            'relationships' => ['masonAnswers' => ['data' => [['type' => 'mason-answers', 'id' => '12']]]],
        ]));

        $this->assertSame([], $this->logs('discussion.mason_answers_changed'));
    }
}

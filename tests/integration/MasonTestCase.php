<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Tests\integration;

use Flarum\Discussion\Discussion;
use Flarum\Extend;
use Flarum\Group\Group;
use Flarum\Post\Post;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use Psr\Http\Message\ResponseInterface;

abstract class MasonTestCase extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-mason');

        $this->extend(
            (new Extend\Csrf())
                ->exemptRoute('discussions.create')
                ->exemptRoute('discussions.update')
                ->exemptRoute('mason-fields.index')
                ->exemptRoute('mason-fields.create')
                ->exemptRoute('mason-fields.update')
                ->exemptRoute('mason-fields.delete')
                ->exemptRoute('mason-answers.create')
                ->exemptRoute('mason-answers.update')
                ->exemptRoute('mason-answers.delete')
                ->exemptRoute('fof-mason.fields.order')
                ->exemptRoute('fof-mason.answers.order')
        );
    }

    /**
     * Seeds users (admin id 1 + normal user id 2) and optional mason rows.
     *
     * @param array<int, array<string, mixed>> $fields
     * @param array<int, array<string, mixed>> $answers
     */
    protected function seedMason(array $fields = [], array $answers = [], array $extra = []): void
    {
        $now = date('Y-m-d H:i:s');

        $fields = array_map(fn (array $f) => $f + [
            'name'                => 'Field',
            'min_answers_count'   => 1,
            'max_answers_count'   => 1,
            'show_when_empty'     => false,
            'user_values_allowed' => false,
            'created_at'          => $now,
            'updated_at'          => $now,
        ], $fields);

        $answers = array_map(fn (array $a) => $a + [
            'content'      => 'Answer',
            'is_suggested' => true,
            'created_at'   => $now,
            'updated_at'   => $now,
        ], $answers);

        $this->prepareDatabase([
            User::class            => [$this->normalUser()],
            'fof_mason_fields'     => $fields,
            'fof_mason_answers'    => $answers,
        ] + $extra);
    }

    /**
     * Seeds a discussion (with its first post) authored by $userId.
     *
     * @return array<string, array<int, array<string, mixed>>>
     */
    protected function discussionRows(int $id = 1, int $userId = 2): array
    {
        return [
            Discussion::class => [['id' => $id, 'title' => "Discussion $id", 'user_id' => $userId, 'first_post_id' => $id]],
            Post::class       => [['id' => $id, 'discussion_id' => $id, 'number' => 1, 'user_id' => $userId]],
        ];
    }

    /**
     * @return array<string, array<int, array<string, mixed>>>
     */
    protected function memberPermissionRows(string ...$permissions): array
    {
        return ['group_permission' => array_map(
            fn (string $p) => ['group_id' => Group::MEMBER_ID, 'permission' => $p],
            $permissions
        )];
    }

    protected function actorOptions(?int $userId): array
    {
        return $userId ? ['authenticatedAs' => $userId] : [];
    }

    protected function json(string $method, string $path, ?int $userId = null, ?array $data = null): ResponseInterface
    {
        $options = $this->actorOptions($userId);

        if ($data !== null) {
            $options['json'] = ['data' => $data];
        }

        return $this->send($this->request($method, $path, $options));
    }

    protected function decode(ResponseInterface $response): array
    {
        return json_decode((string) $response->getBody(), true) ?? [];
    }

    protected function msg(ResponseInterface $response): string
    {
        return (string) $response->getBody();
    }

    /**
     * @return array<int, string> "type:id" for each included resource
     */
    protected function includedKeys(array $body): array
    {
        return array_map(fn ($i) => $i['type'].':'.$i['id'], $body['included'] ?? []);
    }
}

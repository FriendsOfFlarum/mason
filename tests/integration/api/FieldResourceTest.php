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
use Illuminate\Database\ConnectionInterface;
use PHPUnit\Framework\Attributes\DataProvider;

class FieldResourceTest extends MasonTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->seedMason(
            [['id' => 1, 'name' => 'Existing', 'sort' => 0]],
            [['id' => 1, 'field_id' => 1, 'content' => 'Yes', 'is_suggested' => true]]
        );
    }

    private function attrs(array $over = []): array
    {
        return $over + [
            'name'                => 'New field',
            'description'         => 'desc',
            'min_answers_count'   => 0,
            'max_answers_count'   => 1,
            'show_when_empty'     => false,
            'user_values_allowed' => true,
        ];
    }

    public function test_admin_can_create_field(): void
    {
        $r = $this->json('POST', '/api/mason-fields', 1, ['type' => 'mason-fields', 'attributes' => $this->attrs()]);

        $this->assertEquals(201, $r->getStatusCode(), $this->msg($r));
        $body = $this->decode($r);
        $this->assertEquals('mason-fields', $body['data']['type']);
        $this->assertEquals('New field', $body['data']['attributes']['name']);
        $this->assertEquals(0, $body['data']['attributes']['min_answers_count']);
        $this->assertTrue($body['data']['attributes']['user_values_allowed']);
        $this->assertArrayHasKey('allAnswers', $body['data']['relationships'], $this->msg($r));
    }

    public function test_normal_user_cannot_create_field(): void
    {
        $r = $this->json('POST', '/api/mason-fields', 2, ['type' => 'mason-fields', 'attributes' => $this->attrs()]);
        $this->assertEquals(403, $r->getStatusCode(), $this->msg($r));
    }

    public function test_guest_cannot_create_field(): void
    {
        $r = $this->json('POST', '/api/mason-fields', null, ['type' => 'mason-fields', 'attributes' => $this->attrs()]);
        $this->assertEquals(403, $r->getStatusCode(), $this->msg($r));
    }

    public function test_admin_can_list_fields_with_all_answers(): void
    {
        $r = $this->json('GET', '/api/mason-fields', 1);

        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $body = $this->decode($r);
        $this->assertCount(1, $body['data']);
        $this->assertContains('mason-answers:1', $this->includedKeys($body), $this->msg($r));
    }

    public function test_normal_user_cannot_list_fields(): void
    {
        $r = $this->json('GET', '/api/mason-fields', 2);
        $this->assertEquals(403, $r->getStatusCode(), $this->msg($r));
    }

    public function test_admin_can_update_field(): void
    {
        $r = $this->json('PATCH', '/api/mason-fields/1', 1, ['type' => 'mason-fields', 'id' => '1', 'attributes' => ['name' => 'Renamed']]);

        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $this->assertEquals('Renamed', $this->decode($r)['data']['attributes']['name']);
        $this->assertEquals('Renamed', $this->database()->table('fof_mason_fields')->where('id', 1)->value('name'));
    }

    public function test_normal_user_cannot_update_field(): void
    {
        $r = $this->json('PATCH', '/api/mason-fields/1', 2, ['type' => 'mason-fields', 'id' => '1', 'attributes' => ['name' => 'Nope']]);

        $this->assertEquals(403, $r->getStatusCode(), $this->msg($r));
        $this->assertEquals('Existing', $this->database()->table('fof_mason_fields')->where('id', 1)->value('name'));
    }

    public function test_admin_can_delete_field_soft(): void
    {
        $r = $this->json('DELETE', '/api/mason-fields/1', 1);

        $this->assertEquals(204, $r->getStatusCode(), $this->msg($r));
        $this->assertNotNull($this->database()->table('fof_mason_fields')->where('id', 1)->value('deleted_at'));
    }

    public function test_normal_user_cannot_delete_field(): void
    {
        $r = $this->json('DELETE', '/api/mason-fields/1', 2);

        $this->assertEquals(403, $r->getStatusCode(), $this->msg($r));
        $this->assertNull($this->database()->table('fof_mason_fields')->where('id', 1)->value('deleted_at'));
    }

    public function test_min_answers_count_above_one_is_rejected(): void
    {
        $r = $this->json('POST', '/api/mason-fields', 1, ['type' => 'mason-fields', 'attributes' => $this->attrs(['min_answers_count' => 5])]);
        $this->assertEquals(422, $r->getStatusCode(), $this->msg($r));
    }
}

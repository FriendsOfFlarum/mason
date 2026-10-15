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

class AnswerResourceTest extends MasonTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->seedMason(
            [['id' => 1, 'name' => 'Field']],
            [['id' => 1, 'field_id' => 1, 'content' => 'Old', 'is_suggested' => false]]
        );
    }

    private function createPayload(): array
    {
        return [
            'type'          => 'mason-answers',
            'attributes'    => ['content' => 'Fresh', 'is_suggested' => true],
            'relationships' => ['field' => ['data' => ['type' => 'mason-fields', 'id' => '1']]],
        ];
    }

    public function test_admin_can_create_answer(): void
    {
        $r = $this->json('POST', '/api/mason-answers', 1, $this->createPayload());

        $this->assertEquals(201, $r->getStatusCode(), $this->msg($r));
        $body = $this->decode($r);
        $this->assertEquals('Fresh', $body['data']['attributes']['content']);
        $keys = $this->includedKeys($body);
        $this->assertContains('mason-fields:1', $keys, $this->msg($r));
        $this->assertContains('mason-answers:1', $keys, $this->msg($r));
        $this->assertEquals(1, $this->database()->table('fof_mason_answers')->where('content', 'Fresh')->value('field_id'));
    }

    public function test_create_without_field_is_rejected(): void
    {
        $p = $this->createPayload();
        unset($p['relationships']);

        $r = $this->json('POST', '/api/mason-answers', 1, $p);
        $this->assertEquals(422, $r->getStatusCode(), $this->msg($r));
    }

    public function test_normal_user_cannot_create_answer(): void
    {
        $r = $this->json('POST', '/api/mason-answers', 2, $this->createPayload());
        $this->assertEquals(403, $r->getStatusCode(), $this->msg($r));
    }

    public function test_admin_can_update_answer(): void
    {
        $r = $this->json('PATCH', '/api/mason-answers/1', 1, [
            'type'       => 'mason-answers', 'id' => '1',
            'attributes' => ['content' => 'Changed', 'is_suggested' => true],
        ]);

        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $row = $this->database()->table('fof_mason_answers')->where('id', 1)->first();
        $this->assertEquals('Changed', $row->content);
        $this->assertEquals(1, $row->is_suggested);
    }

    public function test_normal_user_cannot_update_answer(): void
    {
        $r = $this->json('PATCH', '/api/mason-answers/1', 2, [
            'type' => 'mason-answers', 'id' => '1', 'attributes' => ['content' => 'Nope'],
        ]);

        $this->assertEquals(403, $r->getStatusCode(), $this->msg($r));
        $this->assertEquals('Old', $this->database()->table('fof_mason_answers')->where('id', 1)->value('content'));
    }

    public function test_admin_can_delete_answer(): void
    {
        $r = $this->json('DELETE', '/api/mason-answers/1', 1);

        $this->assertEquals(204, $r->getStatusCode(), $this->msg($r));
        $this->assertEquals(0, $this->database()->table('fof_mason_answers')->where('id', 1)->count());
    }

    public function test_normal_user_cannot_delete_answer(): void
    {
        $r = $this->json('DELETE', '/api/mason-answers/1', 2);

        $this->assertEquals(403, $r->getStatusCode(), $this->msg($r));
        $this->assertEquals(1, $this->database()->table('fof_mason_answers')->where('id', 1)->count());
    }
}

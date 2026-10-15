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

class OrderTest extends MasonTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->seedMason(
            [['id' => 1, 'name' => 'A'], ['id' => 2, 'name' => 'B'], ['id' => 3, 'name' => 'C']],
            [
                ['id' => 1, 'field_id' => 1, 'content' => 'a1'],
                ['id' => 2, 'field_id' => 1, 'content' => 'a2'],
                ['id' => 3, 'field_id' => 1, 'content' => 'a3'],
            ]
        );
    }

    private function order(string $path, ?int $userId, array $body): \Psr\Http\Message\ResponseInterface
    {
        $options = $this->actorOptions($userId) + ['json' => $body];

        return $this->send($this->request('POST', $path, $options));
    }

    public function test_admin_can_order_fields(): void
    {
        $r = $this->order('/api/mason-fields/order', 1, ['sort' => [3, 2, 1]]);

        $this->assertEquals(204, $r->getStatusCode(), $this->msg($r));
        foreach ([3 => 0, 2 => 1, 1 => 2] as $id => $sort) {
            $this->assertEquals($sort, $this->database()->table('fof_mason_fields')->where('id', $id)->value('sort'));
        }
    }

    public function test_non_admin_cannot_order_fields(): void
    {
        $r = $this->order('/api/mason-fields/order', 2, ['sort' => [3, 2, 1]]);

        $this->assertEquals(403, $r->getStatusCode(), $this->msg($r));
        $this->assertNull($this->database()->table('fof_mason_fields')->where('id', 1)->value('sort'));
    }

    public function test_admin_can_order_answers(): void
    {
        $r = $this->order('/api/mason-fields/1/answers/order', 1, ['sort' => [3, 2, 1]]);

        $this->assertEquals(204, $r->getStatusCode(), $this->msg($r));
        foreach ([3 => 0, 2 => 1, 1 => 2] as $id => $sort) {
            $this->assertEquals($sort, $this->database()->table('fof_mason_answers')->where('id', $id)->value('sort'));
        }
    }

    public function test_non_admin_cannot_order_answers(): void
    {
        $r = $this->order('/api/mason-fields/1/answers/order', 2, ['sort' => [3, 2, 1]]);

        $this->assertEquals(403, $r->getStatusCode(), $this->msg($r));
        $this->assertNull($this->database()->table('fof_mason_answers')->where('id', 1)->value('sort'));
    }
}

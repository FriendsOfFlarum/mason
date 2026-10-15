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

class ForumPayloadTest extends MasonTestCase
{
    private function seed(array $permissions): void
    {
        $this->seedMason(
            [
                ['id' => 1, 'name' => 'Color'],
                ['id' => 2, 'name' => 'Size'],
                ['id' => 3, 'name' => 'Gone', 'deleted_at' => date('Y-m-d H:i:s')],
            ],
            [
                ['id' => 1, 'field_id' => 1, 'content' => 'Red', 'is_suggested' => true],
                ['id' => 2, 'field_id' => 1, 'content' => 'Hidden', 'is_suggested' => false],
            ],
            $this->memberPermissionRows(...$permissions)
        );
    }

    public function test_member_with_fill_fields_gets_full_payload(): void
    {
        $this->seed(['fof-mason.fill-fields']);

        $r = $this->json('GET', '/api', 2);
        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $body = $this->decode($r);
        $attrs = $body['data']['attributes'];

        $this->assertTrue($attrs['canFillMasonFields'], $this->msg($r));
        $this->assertFalse($attrs['canSkipRequiredMasonFields'], $this->msg($r));
        $this->assertArrayHasKey('fof-mason.column-count', $attrs, $this->msg($r));

        $ids = array_column($body['data']['relationships']['masonFields']['data'] ?? [], 'id');
        sort($ids);
        $this->assertEquals(['1', '2'], $ids, $this->msg($r));

        $keys = $this->includedKeys($body);
        $this->assertContains('mason-fields:1', $keys, $this->msg($r));
        $this->assertContains('mason-answers:1', $keys, $this->msg($r));
        $this->assertNotContains('mason-answers:2', $keys, $this->msg($r));
    }

    public function test_guest_without_permissions_gets_nothing(): void
    {
        $this->seed([]);

        $r = $this->json('GET', '/api');
        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $body = $this->decode($r);
        $attrs = $body['data']['attributes'];

        $this->assertFalse($attrs['canFillMasonFields'], $this->msg($r));
        $this->assertFalse($attrs['canSkipRequiredMasonFields'], $this->msg($r));
        $this->assertArrayNotHasKey('fof-mason.column-count', $attrs, $this->msg($r));
        $this->assertEmpty($body['data']['relationships']['masonFields']['data'] ?? [], $this->msg($r));
    }

    public function test_see_own_fields_exposes_only_see_settings(): void
    {
        $this->seed(['fof-mason.see-own-fields']);

        $r = $this->json('GET', '/api', 2);
        $this->assertEquals(200, $r->getStatusCode(), $this->msg($r));
        $attrs = $this->decode($r)['data']['attributes'];

        $this->assertFalse($attrs['canFillMasonFields'], $this->msg($r));
        $this->assertArrayHasKey('fof-mason.column-count', $attrs, $this->msg($r));
        $this->assertArrayNotHasKey('fof-mason.labels-as-placeholders', $attrs, $this->msg($r));
    }

    public function test_soft_deleted_field_not_listed(): void
    {
        $this->seed(['fof-mason.fill-fields']);

        $r = $this->json('GET', '/api', 2);
        $body = $this->decode($r);

        $ids = array_column($body['data']['relationships']['masonFields']['data'] ?? [], 'id');
        $this->assertNotContains('3', $ids, $this->msg($r));
        $this->assertNotContains('mason-fields:3', $this->includedKeys($body), $this->msg($r));
    }
}

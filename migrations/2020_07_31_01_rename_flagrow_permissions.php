<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Flarum\Group\Permission;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        foreach ([
            'see-own-fields',
            'see-other-fields',
            'fill-fields',
            'update-own-fields',
            'update-other-fields',
            'skip-required-fields',
        ] as $permission) {
            Permission::query()
                ->where('permission', "flagrow.mason.$permission")
                ->update(['permission' => "fof-mason.$permission"]);
        }
    },
    'down' => function (Builder $schema) {
        // Not doing anything but `down` has to be defined
    },
];

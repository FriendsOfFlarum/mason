<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        // Re-use the tables from the Flagrow version if they exist
        if ($schema->hasTable('flagrow_mason_fields') && !$schema->hasTable('fof_mason_fields')) {
            $schema->rename('flagrow_mason_fields', 'fof_mason_fields');
        }
        if ($schema->hasTable('flagrow_mason_answers') && !$schema->hasTable('fof_mason_answers')) {
            $schema->rename('flagrow_mason_answers', 'fof_mason_answers');
        }
        if ($schema->hasTable('flagrow_mason_discussion_answer') && !$schema->hasTable('fof_mason_discussion_answer')) {
            $schema->rename('flagrow_mason_discussion_answer', 'fof_mason_discussion_answer');
        }
    },
    'down' => function (Builder $schema) {
        // Not doing anything but `down` has to be defined
    },
];

<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('fof_mason_discussion_answer')) {
            return;
        }

        $schema->create('fof_mason_discussion_answer', function (Blueprint $table) {
            $table->unsignedInteger('discussion_id');
            $table->unsignedInteger('answer_id');
            $table->timestamps();

            $table->foreign('discussion_id')->references('id')->on('discussions')->onDelete('cascade');
            $table->foreign('answer_id')->references('id')->on('fof_mason_answers')->onDelete('cascade');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('fof_mason_discussion_answer');
    },
];

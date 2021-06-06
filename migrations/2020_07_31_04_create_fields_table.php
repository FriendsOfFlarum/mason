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
        if ($schema->hasTable('fof_mason_fields')) {
            return;
        }

        $schema->create('fof_mason_fields', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->unsignedSmallInteger('min_answers_count')->default(1);
            $table->unsignedSmallInteger('max_answers_count')->default(1);
            $table->boolean('show_when_empty')->default(false);
            $table->boolean('user_values_allowed')->default(false);
            $table->string('validation')->nullable();
            $table->string('icon')->nullable();
            $table->integer('sort')->nullable()->index();
            $table->timestamps();
            $table->softDeletes();
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('fof_mason_fields');
    },
];

<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flagrow_mason_fields', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->unsignedSmallInteger('min_answers_count')->default(1);
            $table->unsignedSmallInteger('max_answers_count')->default(1);
            $table->boolean('user_values_allowed')->default(false);
            $table->string('validation')->nullable();
            $table->string('icon')->nullable();
            $table->integer('sort')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    },
    'down' => function (Builder $schema) {
        $schema->drop('flagrow_mason_fields');
    },
];

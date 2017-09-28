<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flagrow_mason_discussion_answer', function (Blueprint $table) {
            $table->unsignedInteger('discussion_id');
            $table->unsignedInteger('answer_id');
            $table->timestamps();

            $table->foreign('discussion_id')->references('id')->on('discussions');
            $table->foreign('answer_id')->references('id')->on('flagrow_mason_answers');
        });
    },
    'down' => function (Builder $schema) {
        $schema->drop('flagrow_mason_discussion_answer');
    },
];

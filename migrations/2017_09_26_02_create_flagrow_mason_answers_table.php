<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flagrow_mason_answers', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('field_id');
            $table->text('content');
            $table->boolean('is_suggested')->default(false);
            $table->integer('sort')->nullable()->index();
            $table->timestamps();

            $table->foreign('field_id')->references('id')->on('flagrow_mason_fields')->onDelete('cascade');
        });
    },
    'down' => function (Builder $schema) {
        $schema->drop('flagrow_mason_answers');
    },
];

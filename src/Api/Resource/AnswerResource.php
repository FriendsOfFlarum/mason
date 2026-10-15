<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Api\Resource;

use Flarum\Api\Context;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource\AbstractDatabaseResource;
use Flarum\Api\Schema;
use FoF\Mason\Answer;
use Illuminate\Database\Eloquent\Builder;
use Tobyz\JsonApiServer\Context as OriginalContext;

/**
 * Attribute names stay snake_case: they are the 1.x wire format the frontend models read.
 *
 * @extends AbstractDatabaseResource<Answer>
 */
class AnswerResource extends AbstractDatabaseResource
{
    public function type(): string
    {
        return 'mason-answers';
    }

    public function model(): string
    {
        return Answer::class;
    }

    /**
     * @param Context $context
     */
    public function scope(Builder $query, OriginalContext $context): void
    {
        $query->whereVisibleTo($context->getActor());
    }

    public function endpoints(): array
    {
        return [
            // The admin UI renders answers from `field.allAnswers`, so return the refreshed list.
            Endpoint\Create::make()
                ->admin()
                ->defaultInclude(['field', 'field.allAnswers']),
            Endpoint\Update::make()
                ->admin(),
            Endpoint\Delete::make()
                ->admin(),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\Str::make('content')
                ->requiredOnCreate()
                ->writable(),
            Schema\Boolean::make('is_suggested')
                ->writable(),
            Schema\Integer::make('sort')
                ->nullable(),

            Schema\Relationship\ToOne::make('field')
                ->type('mason-fields')
                ->includable()
                ->requiredOnCreate()
                ->writableOnCreate(),
        ];
    }
}

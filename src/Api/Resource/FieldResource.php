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
use FoF\Mason\Api\Resource\Concerns\ReportsChanges;
use FoF\Mason\Event\FieldCreated;
use FoF\Mason\Event\FieldDeleted;
use FoF\Mason\Event\FieldUpdated;
use FoF\Mason\Field;
use Illuminate\Database\Eloquent\Builder;
use Tobyz\JsonApiServer\Context as OriginalContext;

/**
 * Attribute names stay snake_case: they are the 1.x wire format the frontend models read.
 *
 * @extends AbstractDatabaseResource<Field>
 */
class FieldResource extends AbstractDatabaseResource
{
    use ReportsChanges;

    public function type(): string
    {
        return 'mason-fields';
    }

    public function model(): string
    {
        return Field::class;
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
            Endpoint\Index::make()
                ->admin()
                ->defaultInclude(['allAnswers']),
            Endpoint\Create::make()
                ->admin()
                ->defaultInclude(['allAnswers']),
            Endpoint\Update::make()
                ->admin()
                ->defaultInclude(['allAnswers']),
            Endpoint\Delete::make()
                ->admin(),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\Str::make('name')
                ->requiredOnCreate()
                ->writable()
                ->maxLength(255),
            Schema\Str::make('description')
                ->nullable()
                ->writable()
                ->maxLength(255),
            // Multiple answers were never implemented: min only toggles optional/required, max is fixed at 1.
            Schema\Integer::make('min_answers_count')
                ->requiredOnCreate()
                ->writable()
                ->min(0)
                ->max(1),
            Schema\Integer::make('max_answers_count')
                ->requiredOnCreate()
                ->writable()
                ->min(1)
                ->max(1),
            Schema\Boolean::make('show_when_empty')
                ->requiredOnCreate()
                ->writable(),
            Schema\Boolean::make('user_values_allowed')
                ->requiredOnCreate()
                ->writable(),
            Schema\Str::make('validation')
                ->nullable()
                ->writable()
                ->maxLength(255),
            Schema\Str::make('icon')
                ->nullable()
                ->writable()
                ->maxLength(255),
            Schema\Integer::make('sort')
                ->nullable(),

            Schema\Relationship\ToMany::make('suggestedAnswers')
                ->type('mason-answers')
                ->includable(),
            Schema\Relationship\ToMany::make('allAnswers')
                ->type('mason-answers')
                ->includable()
                ->visible(fn (Field $field, Context $context) => $context->getActor()->isAdmin()),
        ];
    }

    /**
     * @param Field $model
     * @param Context $context
     */
    public function created(object $model, OriginalContext $context): ?object
    {
        $this->events->dispatch(new FieldCreated($model, $context->getActor()));

        return $model;
    }

    /**
     * @param Field $model
     * @param Context $context
     */
    public function updated(object $model, OriginalContext $context): ?object
    {
        if ($changes = $this->changesOf($model)) {
            $this->events->dispatch(new FieldUpdated($model, $context->getActor(), $changes));
        }

        return $model;
    }

    /**
     * @param Field $model
     * @param Context $context
     */
    public function deleted(object $model, OriginalContext $context): void
    {
        $this->events->dispatch(new FieldDeleted($model, $context->getActor()));
    }
}

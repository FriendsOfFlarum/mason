<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Api;

use Flarum\Api\Context;
use Flarum\Api\Schema;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use FoF\Mason\Repositories\FieldRepository;

class ForumResourceFields
{
    public function __construct(
        protected SettingsRepositoryInterface $settings,
        protected FieldRepository $fields
    ) {
    }

    public function __invoke(): array
    {
        $canFill = fn ($forum, Context $context) => $this->canFill($context->getActor());
        $canSee = fn ($forum, Context $context) => $this->canSee($context->getActor());
        $canFillOrSee = fn ($forum, Context $context) => $this->canFill($context->getActor()) || $this->canSee($context->getActor());

        return [
            Schema\Boolean::make('canFillMasonFields')
                ->get($canFill),
            // Lets the fields form skip its required-fields check for actors the server would let through anyway.
            Schema\Boolean::make('canSkipRequiredMasonFields')
                ->get(fn ($forum, Context $context) => $context->getActor()->can('fof-mason.skip-required-fields')),

            Schema\Str::make('fof-mason.fields-section-title')
                ->visible($canFillOrSee)
                ->get(fn () => (string) $this->settings->get('fof-mason.fields-section-title', '')),
            Schema\Integer::make('fof-mason.column-count')
                ->visible($canFillOrSee)
                ->get(fn () => (int) $this->settings->get('fof-mason.column-count', 1)),

            Schema\Boolean::make('fof-mason.labels-as-placeholders')
                ->visible($canFill)
                ->get(fn () => (bool) $this->settings->get('fof-mason.labels-as-placeholders', false)),
            Schema\Boolean::make('fof-mason.tags-as-fields')
                ->visible($canFill)
                ->get(fn () => (bool) $this->settings->get('fof-mason.tags-as-fields', false)),
            Schema\Str::make('fof-mason.tags-field-name')
                ->visible($canFill)
                ->get(fn () => (string) $this->settings->get('fof-mason.tags-field-name', '')),

            Schema\Boolean::make('fof-mason.fields-in-hero')
                ->visible($canSee)
                ->get(fn () => (bool) $this->settings->get('fof-mason.fields-in-hero', false)),
            Schema\Boolean::make('fof-mason.hide-empty-fields-section')
                ->visible($canSee)
                ->get(fn () => (bool) $this->settings->get('fof-mason.hide-empty-fields-section', false)),

            // Preloaded for the composer, and so discussions can render fields that have no answer.
            Schema\Relationship\ToMany::make('masonFields')
                ->type('mason-fields')
                ->includable()
                ->get(function ($forum, Context $context) {
                    if (! $this->canFill($context->getActor()) && ! $this->canSee($context->getActor())) {
                        return [];
                    }

                    return $this->fields->all()->load('suggestedAnswers')->all();
                }),
        ];
    }

    protected function canFill(User $actor): bool
    {
        return $actor->can('fof-mason.fill-fields');
    }

    protected function canSee(User $actor): bool
    {
        return $actor->can('fof-mason.see-other-fields') || $actor->can('fof-mason.see-own-fields');
    }
}

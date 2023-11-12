<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class ForumAttributes
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(ForumSerializer $serializer): array
    {
        $actor = $serializer->getActor();

        $canFill = $actor->can('fof-mason.fill-fields');
        $canSeeSome = $actor->can('fof-mason.see-other-fields') || $actor->can('fof-mason.see-own-fields');

        $attributes = [
            'canFillMasonFields' => $canFill,
        ];

        if ($canFill || $canSeeSome) {
            $attributes['fof-mason.fields-section-title'] = $this->settings->get('fof-mason.fields-section-title', '');
            $attributes['fof-mason.column-count'] = (int) $this->settings->get('fof-mason.column-count', 1);
        }

        if ($canFill) {
            $attributes['fof-mason.labels-as-placeholders'] = (bool) $this->settings->get('fof-mason.labels-as-placeholders', false);
            $attributes['fof-mason.tags-as-fields'] = (bool) $this->settings->get('fof-mason.tags-as-fields', false);
            $attributes['fof-mason.tags-field-name'] = $this->settings->get('fof-mason.tags-field-name', '');
        }

        if ($canSeeSome) {
            $attributes['fof-mason.fields-in-hero'] = (bool) $this->settings->get('fof-mason.fields-in-hero', false);
            $attributes['fof-mason.hide-empty-fields-section'] = (bool) $this->settings->get('fof-mason.hide-empty-fields-section', false);
        }

        return $attributes;
    }
}

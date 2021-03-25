<?php

use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        /**
         * @var $settings SettingsRepositoryInterface
         */
        $settings = resolve(SettingsRepositoryInterface::class);

        foreach ([
                     'fields-section-title',
                     'column-count',
                     'labels-as-placeholders',
                     'fields-in-hero',
                     'hide-empty-fields-section',
                     'tags-as-fields',
                     'tags-field-name',
                 ] as $key) {
            $value = $settings->get("flagrow.mason.$key");

            if (!is_null($value)) {
                $settings->set("fof-mason.$key", $value);
                $settings->delete('flagrow.mason.' . $key);
            }
        }
    },
    'down' => function (Builder $schema) {
        // Not doing anything but `down` has to be defined
    },
];

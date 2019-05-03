<?php

namespace Flagrow\Mason\Extend;

use Flagrow\Mason\Api\Serializers\FieldSerializer;
use Flagrow\Mason\Repositories\FieldRepository;
use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Event\WillGetData;
use Flarum\Api\Event\WillSerializeData;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\GetApiRelationship;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;

class ForumAttributes implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(WillSerializeData::class, [$this, 'loadRelationship']);
        $container['events']->listen(GetApiRelationship::class, [$this, 'serializer']);
        $container['events']->listen(WillGetData::class, [$this, 'includes']);
        $container['events']->listen(Serializing::class, [$this, 'attributes']);
    }

    public function loadRelationship(WillSerializeData $event)
    {
        /**
         * @var $fields FieldRepository
         */
        $fields = app(FieldRepository::class);

        if ($event->isController(ShowForumController::class)) {
            // Fields need to be pre-loaded for the discussion composer, and also to be able to show empty fields on discussions
            // We first try the permissions the users are most likely to have
            if ($event->actor->can('flagrow.mason.see-other-fields') || $event->actor->can('flagrow.mason.fill-fields') || $event->actor->can('flagrow.mason.see-own-fields')) {
                $event->data['flagrowMasonFields'] = $fields->all();
            }
        }
    }

    public function serializer(GetApiRelationship $event)
    {
        if ($event->isRelationship(ForumSerializer::class, 'flagrowMasonFields')) {
            return $event->serializer->hasMany($event->model, FieldSerializer::class, 'flagrowMasonFields');
        }
    }

    public function includes(WillGetData $event)
    {
        if ($event->controller->serializer === ForumSerializer::class) {
            $event->addInclude('flagrowMasonFields');
            $event->addInclude('flagrowMasonFields.suggested_answers');
        }
    }

    public function attributes(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            /**
             * @var $settings SettingsRepositoryInterface
             */
            $settings = app(SettingsRepositoryInterface::class);

            $canFill = $event->actor->can('flagrow.mason.fill-fields');
            $canSeeSome = $event->actor->can('flagrow.mason.see-other-fields') || $event->actor->can('flagrow.mason.see-own-fields');

            if ($canFill || $canSeeSome) {
                $event->attributes['flagrow.mason.fields-section-title'] = $settings->get('flagrow.mason.fields-section-title', '');
                $event->attributes['flagrow.mason.column-count'] = (int) $settings->get('flagrow.mason.column-count', 1);
            }

            if ($canFill) {
                $event->attributes['flagrow.mason.labels-as-placeholders'] = (bool) $settings->get('flagrow.mason.labels-as-placeholders', false);
                $event->attributes['flagrow.mason.tags-as-fields'] = (bool) $settings->get('flagrow.mason.tags-as-fields', false);
                $event->attributes['flagrow.mason.tags-field-name'] = $settings->get('flagrow.mason.tags-field-name', '');
            }

            if ($canSeeSome) {
                $event->attributes['flagrow.mason.fields-in-hero'] = (bool) $settings->get('flagrow.mason.fields-in-hero', false);
                $event->attributes['flagrow.mason.hide-empty-fields-section'] = (bool) $settings->get('flagrow.mason.hide-empty-fields-section', false);
            }

            $event->attributes['canFillFlagrowMasonFields'] = $canFill;
        }
    }
}

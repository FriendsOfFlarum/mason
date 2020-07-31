<?php

namespace FoF\Mason\Extenders;

use FoF\Mason\Api\Serializers\FieldSerializer;
use FoF\Mason\Repositories\FieldRepository;
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
            if ($event->actor->can('fof-mason.see-other-fields') || $event->actor->can('fof-mason.fill-fields') || $event->actor->can('fof-mason.see-own-fields')) {
                $event->data['masonFields'] = $fields->all();
            } else {
                // Fill empty set. Without this, installs with visible notices will get "Undefined index: masonFields"
                $event->data['masonFields'] = [];
            }
        }
    }

    public function serializer(GetApiRelationship $event)
    {
        if ($event->isRelationship(ForumSerializer::class, 'masonFields')) {
            return $event->serializer->hasMany($event->model, FieldSerializer::class, 'masonFields');
        }
    }

    public function includes(WillGetData $event)
    {
        if ($event->controller->serializer === ForumSerializer::class) {
            $event->addInclude('masonFields');
            $event->addInclude('masonFields.suggested_answers');
        }
    }

    public function attributes(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            /**
             * @var $settings SettingsRepositoryInterface
             */
            $settings = app(SettingsRepositoryInterface::class);

            $canFill = $event->actor->can('fof-mason.fill-fields');
            $canSeeSome = $event->actor->can('fof-mason.see-other-fields') || $event->actor->can('fof-mason.see-own-fields');

            if ($canFill || $canSeeSome) {
                $event->attributes['fof-mason.fields-section-title'] = $settings->get('fof-mason.fields-section-title', '');
                $event->attributes['fof-mason.column-count'] = (int) $settings->get('fof-mason.column-count', 1);
            }

            if ($canFill) {
                $event->attributes['fof-mason.labels-as-placeholders'] = (bool) $settings->get('fof-mason.labels-as-placeholders', false);
                $event->attributes['fof-mason.tags-as-fields'] = (bool) $settings->get('fof-mason.tags-as-fields', false);
                $event->attributes['fof-mason.tags-field-name'] = $settings->get('fof-mason.tags-field-name', '');
            }

            if ($canSeeSome) {
                $event->attributes['fof-mason.fields-in-hero'] = (bool) $settings->get('fof-mason.fields-in-hero', false);
                $event->attributes['fof-mason.hide-empty-fields-section'] = (bool) $settings->get('fof-mason.hide-empty-fields-section', false);
            }

            $event->attributes['canFillMasonFields'] = $canFill;
        }
    }
}

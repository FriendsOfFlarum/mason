<?php

namespace Flagrow\Mason\Listeners;

use Flagrow\Mason\Api\Serializers\FieldSerializer;
use Flagrow\Mason\Repositories\FieldRepository;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\ConfigureApiController;
use Flarum\Event\GetApiRelationship;
use Illuminate\Contracts\Events\Dispatcher;
use Tobscure\JsonApi\Collection;
use Tobscure\JsonApi\Relationship;

class AddForumFieldRelationship
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetApiRelationship::class, [$this, 'addSerializerRelationship']);
        $events->listen(ConfigureApiController::class, [$this, 'addSerializerInclude']);
    }

    public function addSerializerRelationship(GetApiRelationship $event)
    {
        // We add the list of fields as a Forum Serializer relationship so models are included with the forum when it loads
        if ($event->isRelationship(ForumSerializer::class, 'flagrowMasonFields')) {
            /**
             * @var FieldRepository
             */
            $fields = app(FieldRepository::class);

            /**
             * @var FieldSerializer
             */
            $serializer = app(FieldSerializer::class);

            return new Relationship(new Collection($fields->all(), $serializer));
        }
    }

    public function addSerializerInclude(ConfigureApiController $event)
    {
        if ($event->controller->serializer === ForumSerializer::class) {
            $event->addInclude('flagrowMasonFields');
            $event->addInclude('flagrowMasonFields.suggested_answers');
        }
    }
}

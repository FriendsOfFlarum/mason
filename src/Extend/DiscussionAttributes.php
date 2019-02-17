<?php

namespace Flagrow\Mason\Extend;

use Flagrow\Mason\Answer;
use Flagrow\Mason\Api\Serializers\AnswerSerializer;
use Flagrow\Mason\Handlers\DiscussionSaving;
use Flarum\Api\Controller\CreateDiscussionController;
use Flarum\Api\Controller\ListDiscussionsController;
use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Controller\UpdateDiscussionController;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Event\WillGetData;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Illuminate\Contracts\Container\Container;

class DiscussionAttributes implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(GetModelRelationship::class, [$this, 'relationships']);
        $container['events']->listen(GetApiRelationship::class, [$this, 'serializer']);
        $container['events']->listen(WillGetData::class, [$this, 'includes']);
        $container['events']->listen(Serializing::class, [$this, 'attributes']);
        $container['events']->listen(Saving::class, [$this, 'saving']);
    }

    public function relationships(GetModelRelationship $event)
    {
        if ($event->isRelationship(Discussion::class, 'flagrowMasonAnswers')) {
            return $event->model->belongsToMany(Answer::class, 'flagrow_mason_discussion_answer', 'discussion_id', 'answer_id')
                ->withTimestamps()
                ->whereHas('field', function ($query) {
                    // Only load answers to fields that have not been deleted
                    $query->whereNull('deleted_at');
                });
        }
    }

    public function serializer(GetApiRelationship $event)
    {
        if ($event->isRelationship(DiscussionSerializer::class, 'flagrowMasonAnswers')) {
            return $event->serializer->hasMany($event->model, AnswerSerializer::class, 'flagrowMasonAnswers');
        }
    }

    public function includes(WillGetData $event)
    {
        if ($event->isController(ListDiscussionsController::class)
            || $event->isController(ShowDiscussionController::class)
            || $event->isController(CreateDiscussionController::class)
            || $event->isController(UpdateDiscussionController::class)) {
            $event->addInclude([
                'flagrowMasonAnswers',
                'flagrowMasonAnswers.field',
            ]);
        }
    }

    public function attributes(Serializing $event)
    {
        if ($event->isSerializer(DiscussionSerializer::class)) {
            $event->attributes['canUpdateFlagrowMasonAnswers'] = $event->actor->can('updateFlagrowMasonAnswers', $event->model);
        }
    }

    public function saving(Saving $event)
    {
        /**
         * @var $saving DiscussionSaving
         */
        $saving = app(DiscussionSaving::class);
        $saving($event);
    }
}

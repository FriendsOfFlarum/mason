<?php

namespace Flagrow\Mason\Listeners;

use Flagrow\Mason\Answer;
use Flagrow\Mason\Api\Serializers\AnswerSerializer;
use Flarum\Api\Controller;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Core\Discussion;
use Flarum\Event\ConfigureApiController;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
use Flarum\Event\PrepareApiAttributes;
use Illuminate\Contracts\Events\Dispatcher;

class AddDiscussionAnswerRelationship
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetModelRelationship::class, [$this, 'getModelRelationship']);
        $events->listen(GetApiRelationship::class, [$this, 'getApiRelationship']);
        $events->listen(ConfigureApiController::class, [$this, 'includeRelationship']);
        $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
    }

    public function getModelRelationship(GetModelRelationship $event)
    {
        if ($event->isRelationship(Discussion::class, 'flagrowMasonAnswers')) {
            return $event->model->belongsToMany(Answer::class, 'flagrow_mason_discussion_answer', 'discussion_id', 'answer_id', 'flagrowMasonAnswers')
                ->withTimestamps()
                ->whereHas('field', function ($query) {
                    // Only load answers to fields that have not been deleted
                    $query->whereNull('deleted_at');
                });
        }
    }

    public function getApiRelationship(GetApiRelationship $event)
    {
        if ($event->isRelationship(DiscussionSerializer::class, 'flagrowMasonAnswers')) {
            return $event->serializer->hasMany($event->model, AnswerSerializer::class, 'flagrowMasonAnswers');
        }
    }

    public function includeRelationship(ConfigureApiController $event)
    {
        if ($event->isController(Controller\ListDiscussionsController::class)
            || $event->isController(Controller\ShowDiscussionController::class)
            || $event->isController(Controller\CreateDiscussionController::class)
            || $event->isController(Controller\UpdateDiscussionController::class)) {
            $event->addInclude([
                'flagrowMasonAnswers',
                'flagrowMasonAnswers.field',
            ]);
        }
    }

    public function prepareApiAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(DiscussionSerializer::class)) {
            $event->attributes['canUpdateFlagrowMasonAnswers'] = $event->actor->can('updateFlagrowMasonAnswers', $event->model);
        }
    }
}

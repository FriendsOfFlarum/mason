<?php

namespace FoF\Mason;

use Flarum\Api\Controller\CreateDiscussionController;
use Flarum\Api\Controller\ListDiscussionsController;
use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Controller\UpdateDiscussionController;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Extend;
use FoF\Mason\Api\Serializers\AnswerSerializer;
use FoF\Mason\Api\Serializers\FieldSerializer;
use FoF\Mason\Listeners\DiscussionSaving;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/resources/less/forum.less')
        ->js(__DIR__ . '/js/dist/forum.js'),
    (new Extend\Frontend('admin'))
        ->css(__DIR__ . '/resources/less/admin.less')
        ->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Routes('api'))
        // Fields
        ->post('/fof/mason/fields/order', 'fof-mason.api.fields.order', Api\Controllers\FieldOrderController::class)
        ->get('/fof/mason/fields', 'fof-mason.api.fields.index', Api\Controllers\FieldIndexController::class)
        ->post('/fof/mason/fields', 'fof-mason.api.fields.store', Api\Controllers\FieldStoreController::class)
        ->patch('/fof/mason/fields/{id:[0-9]+}', 'fof-mason.api.fields.update', Api\Controllers\FieldUpdateController::class)
        ->delete('/fof/mason/fields/{id:[0-9]+}', 'fof-mason.api.fields.delete', Api\Controllers\FieldDeleteController::class)

        // Answers
        ->post('/fof/mason/fields/{id:[0-9]+}/answers/order', 'fof-mason.api.answers.order', Api\Controllers\AnswerOrderController::class)
        ->post('/fof/mason/fields/{id:[0-9]+}/answers', 'fof-mason.api.answers.create', Api\Controllers\AnswerStoreController::class)
        ->patch('/fof/mason/answers/{id:[0-9]+}', 'fof-mason.api.answers.update', Api\Controllers\AnswerUpdateController::class)
        ->delete('/fof/mason/answers/{id:[0-9]+}', 'fof-mason.api.answers.delete', Api\Controllers\AnswerDeleteController::class),
    (new Extend\Locales(__DIR__ . '/resources/locale')),

    (new Extend\ApiController(ShowForumController::class))
        ->addInclude('masonFields.suggested_answers')
        ->prepareDataForSerialization(LoadForumFieldsRelationship::class),
    (new Extend\ApiSerializer(ForumSerializer::class))
        ->hasMany('masonFields', FieldSerializer::class)
        ->mutate(ForumAttributes::class),

    (new Extend\ApiController(ListDiscussionsController::class))
        ->addInclude('masonAnswers.field'),
    (new Extend\ApiController(ShowDiscussionController::class))
        ->addInclude('masonAnswers.field'),
    (new Extend\ApiController(CreateDiscussionController::class))
        ->addInclude('masonAnswers.field'),
    (new Extend\ApiController(UpdateDiscussionController::class))
        ->addInclude('masonAnswers.field'),
    (new Extend\ApiSerializer(DiscussionSerializer::class))
        ->hasMany('masonAnswers', AnswerSerializer::class)
        ->mutate(function (DiscussionSerializer $serializer, Discussion $discussion): array {
            $canSee = $serializer->getActor()->can('seeMasonAnswers', $discussion);

            if (!$canSee) {
                // Will cause a skip of the relationship retrieval
                $discussion->setRelation('masonAnswers', null);
            }

            return [
                'canSeeMasonAnswers' => $canSee,
                'canUpdateMasonAnswers' => $serializer->getActor()->can('updateMasonAnswers', $discussion),
            ];
        }),
    (new Extend\Model(Discussion::class))
        ->relationship('masonAnswers', function (Discussion $discussion) {
            return $discussion->belongsToMany(Answer::class, 'fof_mason_discussion_answer', 'discussion_id', 'answer_id')
                ->withTimestamps()
                ->whereHas('field', function ($query) {
                    // Only load answers to fields that have not been deleted
                    $query->whereNull('deleted_at');
                });
        }),

    (new Extend\Event())
        ->listen(Saving::class, DiscussionSaving::class),

    (new Extend\Policy())
        ->modelPolicy(Answer::class, Access\AnswerPolicy::class)
        ->modelPolicy(Discussion::class, Access\DiscussionPolicy::class)
        ->modelPolicy(Field::class, Access\FieldPolicy::class),
];

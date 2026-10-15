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

use Flarum\Api\Endpoint;
use Flarum\Audit\Extend\Audit as AuditExtend;
use Flarum\Api\Resource;
use Flarum\Discussion\Discussion;
use Flarum\Extend;
use Flarum\Gdpr\Extend\UserData as GdprUserData;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__.'/resources/less/forum.less')
        ->js(__DIR__.'/js/dist/forum.js')
        ->jsDirectory(__DIR__.'/js/dist/forum'),

    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/resources/less/admin.less')
        ->js(__DIR__.'/js/dist/admin.js')
        ->jsDirectory(__DIR__.'/js/dist/admin'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Routes('api'))
        ->post('/mason-fields/order', 'fof-mason.fields.order', Api\Controllers\FieldOrderController::class)
        ->post('/mason-fields/{id:[0-9]+}/answers/order', 'fof-mason.answers.order', Api\Controllers\AnswerOrderController::class),

    new Extend\ApiResource(Api\Resource\FieldResource::class),
    new Extend\ApiResource(Api\Resource\AnswerResource::class),

    (new Extend\ApiResource(Resource\ForumResource::class))
        ->fields(Api\ForumResourceFields::class)
        ->endpoint(Endpoint\Show::class, function (Endpoint\Show $endpoint) {
            return $endpoint->addDefaultInclude(['masonFields', 'masonFields.suggestedAnswers']);
        }),

    (new Extend\ApiResource(Resource\DiscussionResource::class))
        ->fields(Api\DiscussionResourceFields::class)
        ->endpoint(
            [Endpoint\Index::class, Endpoint\Show::class, Endpoint\Create::class, Endpoint\Update::class],
            function (Endpoint\Index|Endpoint\Show|Endpoint\Create|Endpoint\Update $endpoint) {
                return $endpoint
                    ->addDefaultInclude(['masonAnswers', 'masonAnswers.field'])
                    ->eagerLoadWhenIncluded(['masonAnswers' => ['masonAnswers.field']]);
            }
        ),

    (new Extend\Model(Discussion::class))
        ->relationship('masonAnswers', DiscussionAnswersRelationship::class),

    (new Extend\Policy())
        ->modelPolicy(Answer::class, Access\AnswerPolicy::class)
        ->modelPolicy(Discussion::class, Access\DiscussionPolicy::class)
        ->modelPolicy(Field::class, Access\FieldPolicy::class),

    (new Extend\Conditional())
        ->whenExtensionEnabled('flarum-gdpr', fn () => [
            (new GdprUserData())
                ->addType(Gdpr\MasonAnswers::class),
        ])
        ->whenExtensionEnabled('flarum-audit', fn () => [
            (new AuditExtend())
                ->listen(Event\FieldCreated::class, 'mason_field.created', Audit\Payloads::fieldCreated(...))
                ->listen(Event\FieldUpdated::class, 'mason_field.updated', Audit\Payloads::fieldUpdated(...))
                ->listen(Event\FieldDeleted::class, 'mason_field.deleted', Audit\Payloads::fieldDeleted(...))
                ->listen(Event\AnswerCreated::class, 'mason_answer.created', Audit\Payloads::answerCreated(...))
                ->listen(Event\AnswerUpdated::class, 'mason_answer.updated', Audit\Payloads::answerUpdated(...))
                ->listen(Event\AnswerDeleted::class, 'mason_answer.deleted', Audit\Payloads::answerDeleted(...))
                ->listen(Event\DiscussionAnswersChanged::class, 'discussion.mason_answers_changed', Audit\Payloads::discussionAnswersChanged(...)),
        ]),
];

<?php

namespace FoF\Mason;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__.'/resources/less/forum.less')
        ->js(__DIR__.'/js/dist/forum.js'),
    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/resources/less/admin.less')
        ->js(__DIR__.'/js/dist/admin.js'),
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
    (new Extend\Locales(__DIR__.'/resources/locale')),
    new Extenders\ForumAttributes,
    new Extenders\DiscussionAttributes,
    new Extenders\Policies,
];

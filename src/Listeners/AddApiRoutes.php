<?php

namespace Flagrow\Mason\Listeners;

use Flagrow\Mason\Api\Controllers\AnswerDeleteController;
use Flagrow\Mason\Api\Controllers\AnswerOrderController;
use Flagrow\Mason\Api\Controllers\AnswerStoreController;
use Flagrow\Mason\Api\Controllers\AnswerUpdateController;
use Flagrow\Mason\Api\Controllers\FieldDeleteController;
use Flagrow\Mason\Api\Controllers\FieldIndexController;
use Flagrow\Mason\Api\Controllers\FieldOrderController;
use Flagrow\Mason\Api\Controllers\FieldStoreController;
use Flagrow\Mason\Api\Controllers\FieldUpdateController;
use Flarum\Event\ConfigureApiRoutes;
use Illuminate\Contracts\Events\Dispatcher;

class AddApiRoutes
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'routes']);
    }

    public function routes(ConfigureApiRoutes $routes)
    {
        /**
         * Admin side
         */
        $routes->post('/flagrow/mason/fields/order', 'flagrow.discussion-fields.api.fields.order', FieldOrderController::class);
        $routes->get('/flagrow/mason/fields', 'flagrow.discussion-fields.api.fields.index', FieldIndexController::class);
        $routes->post('/flagrow/mason/fields', 'flagrow.discussion-fields.api.fields.store', FieldStoreController::class);
        $routes->patch('/flagrow/mason/fields/{id:[0-9]+}', 'flagrow.discussion-fields.api.fields.update', FieldUpdateController::class);
        $routes->delete('/flagrow/mason/fields/{id:[0-9]+}', 'flagrow.discussion-fields.api.fields.delete', FieldDeleteController::class);

        $routes->post('/flagrow/mason/fields/{id:[0-9]+}/answers/order', 'flagrow.discussion-fields.api.answers.order', AnswerOrderController::class);
        $routes->post('/flagrow/mason/fields/{id:[0-9]+}/answers', 'flagrow.discussion-fields.api.answers.create', AnswerStoreController::class);
        $routes->patch('/flagrow/mason/answers/{id:[0-9]+}', 'flagrow.discussion-fields.api.answers.update', AnswerUpdateController::class);
        $routes->delete('/flagrow/mason/answers/{id:[0-9]+}', 'flagrow.discussion-fields.api.answers.delete', AnswerDeleteController::class);
    }
}

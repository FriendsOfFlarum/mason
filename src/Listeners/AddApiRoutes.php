<?php

namespace Flagrow\Mason\Listeners;

use Flagrow\Mason\Api\Controllers;
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
        // Fields
        $routes->post(
            '/flagrow/mason/fields/order',
            'flagrow.mason.api.fields.order',
            Controllers\FieldOrderController::class
        );
        $routes->get(
            '/flagrow/mason/fields',
            'flagrow.mason.api.fields.index',
            Controllers\FieldIndexController::class
        );
        $routes->post(
            '/flagrow/mason/fields',
            'flagrow.mason.api.fields.store',
            Controllers\FieldStoreController::class
        );
        $routes->patch(
            '/flagrow/mason/fields/{id:[0-9]+}',
            'flagrow.mason.api.fields.update',
            Controllers\FieldUpdateController::class
        );
        $routes->delete(
            '/flagrow/mason/fields/{id:[0-9]+}',
            'flagrow.mason.api.fields.delete',
            Controllers\FieldDeleteController::class
        );

        // Answers
        $routes->post(
            '/flagrow/mason/fields/{id:[0-9]+}/answers/order',
            'flagrow.mason.api.answers.order',
            Controllers\AnswerOrderController::class
        );
        $routes->post(
            '/flagrow/mason/fields/{id:[0-9]+}/answers',
            'flagrow.mason.api.answers.create',
            Controllers\AnswerStoreController::class
        );
        $routes->patch(
            '/flagrow/mason/answers/{id:[0-9]+}',
            'flagrow.mason.api.answers.update',
            Controllers\AnswerUpdateController::class
        );
        $routes->delete(
            '/flagrow/mason/answers/{id:[0-9]+}',
            'flagrow.mason.api.answers.delete',
            Controllers\AnswerDeleteController::class
        );
    }
}

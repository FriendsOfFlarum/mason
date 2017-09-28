<?php

namespace Flagrow\Mason\Listeners;

use Flagrow\Mason\Api\Controllers\FieldDeleteController;
use Flagrow\Mason\Api\Controllers\FieldIndexController;
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
        $routes->get('/flagrow/mason/fields', 'flagrow.discussion-fields.api.fields.index', FieldIndexController::class);
        $routes->post('/flagrow/mason/fields', 'flagrow.discussion-fields.api.fields.store', FieldStoreController::class);
        $routes->patch('/flagrow/mason/fields/{id:[0-9]+}', 'flagrow.discussion-fields.api.fields.update', FieldUpdateController::class);
        $routes->delete('/flagrow/mason/fields/{id:[0-9]+}', 'flagrow.discussion-fields.api.fields.delete', FieldDeleteController::class);
        $routes->post('/flagrow/mason/fields/{id:[0-9]+}/answers', 'flagrow.discussion-fields.api.answer.create', FieldIndexController::class);
        $routes->patch('/flagrow/mason/answers/{id:[0-9]+}', 'flagrow.discussion-fields.api.answer.update', FieldIndexController::class);
        $routes->delete('/flagrow/mason/answers/{id:[0-9]+}', 'flagrow.discussion-fields.api.answer.delete', FieldIndexController::class);
    }
}

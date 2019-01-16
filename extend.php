<?php

namespace Flagrow\Mason;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__.'/resources/less/forum.less')
        ->js(__DIR__.'/js/dist/forum.js')
];


//return function (Dispatcher $events) {
//    $events->subscribe(Listeners\AddApiRoutes::class);
//    $events->subscribe(Listeners\AddClientAssets::class);
//    $events->subscribe(Listeners\AddDiscussionAnswerRelationship::class);
//    $events->subscribe(Listeners\AddForumFieldRelationship::class);
//    $events->subscribe(Listeners\InjectSettings::class);
//    $events->subscribe(Listeners\SaveAnswersToDatabase::class);
//
//    $events->subscribe(Access\AnswerPolicy::class);
//    $events->subscribe(Access\DiscussionPolicy::class);
//    $events->subscribe(Access\FieldPolicy::class);
//};

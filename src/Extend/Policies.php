<?php

namespace Flagrow\Mason\Extend;

use Flagrow\Mason\Access\AnswerPolicy;
use Flagrow\Mason\Access\DiscussionPolicy;
use Flagrow\Mason\Access\FieldPolicy;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Illuminate\Contracts\Container\Container;

class Policies implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->subscribe(AnswerPolicy::class);
        $container['events']->subscribe(DiscussionPolicy::class);
        $container['events']->subscribe(FieldPolicy::class);
    }
}

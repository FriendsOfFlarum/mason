<?php

namespace Flagrow\Mason\Access;

use Flarum\Discussion\Discussion;
use Flarum\User\AbstractPolicy;
use Flarum\User\User;

class DiscussionPolicy extends AbstractPolicy
{
    protected $model = Discussion::class;

    public function seeFlagrowMasonAnswers(User $actor, Discussion $discussion)
    {
        if ($actor->can('flagrow.mason.see-other-fields')) {
            return true;
        }

        if ($actor->can('flagrow.mason.see-own-fields') && $discussion->user_id == $actor->id) {
            return true;
        }

        return false;
    }

    public function fillFlagrowMasonAnswers(User $actor, Discussion $discussion)
    {
        return $actor->can('flagrow.mason.fill-fields');
    }

    public function updateFlagrowMasonAnswers(User $actor, Discussion $discussion)
    {
        if ($actor->can('flagrow.mason.update-other-fields')) {
            return true;
        }

        if ($actor->can('flagrow.mason.update-own-fields') && $discussion->user_id == $actor->id) {
            return true;
        }

        return false;
    }
}

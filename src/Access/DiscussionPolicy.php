<?php

namespace Flagrow\Mason\Access;

use Flarum\Core\Access\AbstractPolicy;
use Flarum\Core\Discussion;
use Flarum\Core\User;

class DiscussionPolicy extends AbstractPolicy
{
    protected $model = Discussion::class;

    public function updateFlagrowMasonAnswers(User $actor, Discussion $discussion)
    {
        if ($actor->can('flagrow.mason.update-other-fields')) {
            return true;
        }

        if ($actor->can('flagrow.mason.update-own-fields') && $discussion->start_user_id == $actor->id) {
            return true;
        }

        return false;
    }
}

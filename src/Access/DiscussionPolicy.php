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
        // TODO: add setting to control this
        return $discussion->start_user_id == $actor->id;
    }
}

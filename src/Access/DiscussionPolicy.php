<?php

namespace FoF\Mason\Access;

use Flarum\Discussion\Discussion;
use Flarum\User\AbstractPolicy;
use Flarum\User\User;

class DiscussionPolicy extends AbstractPolicy
{
    protected $model = Discussion::class;

    public function seeMasonAnswers(User $actor, Discussion $discussion)
    {
        if ($actor->can('fof-mason.see-other-fields')) {
            return true;
        }

        if ($actor->can('fof-mason.see-own-fields') && $discussion->user_id == $actor->id) {
            return true;
        }

        return false;
    }

    public function fillMasonAnswers(User $actor, Discussion $discussion)
    {
        return $actor->can('fof-mason.fill-fields');
    }

    public function updateMasonAnswers(User $actor, Discussion $discussion)
    {
        if ($actor->can('fof-mason.update-other-fields')) {
            return true;
        }

        if ($actor->can('fof-mason.update-own-fields') && $discussion->user_id == $actor->id) {
            return true;
        }

        return false;
    }
}

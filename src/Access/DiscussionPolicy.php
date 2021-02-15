<?php

namespace FoF\Mason\Access;

use Flarum\Discussion\Discussion;
use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class DiscussionPolicy extends AbstractPolicy
{
    public function seeMasonAnswers(User $actor, Discussion $discussion)
    {
        if ($actor->can('fof-mason.see-other-fields')) {
            return $this->allow();
        }

        if ($actor->can('fof-mason.see-own-fields') && $discussion->user_id == $actor->id) {
            return $this->allow();
        }
    }

    public function fillMasonAnswers(User $actor, Discussion $discussion)
    {
        if ($actor->can('fof-mason.fill-fields')) {
            return $this->allow();
        }
    }

    public function updateMasonAnswers(User $actor, Discussion $discussion)
    {
        if ($actor->can('fof-mason.update-other-fields')) {
            return $this->allow();
        }

        if ($actor->can('fof-mason.update-own-fields') && $discussion->user_id == $actor->id) {
            return $this->allow();
        }
    }
}

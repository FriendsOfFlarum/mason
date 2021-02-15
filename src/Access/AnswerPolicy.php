<?php

namespace FoF\Mason\Access;

use Flarum\User\Access\AbstractPolicy;
use FoF\Mason\Answer;
use Flarum\User\User;

class AnswerPolicy extends AbstractPolicy
{
    public function addToDiscussion(User $user, Answer $answer)
    {
        if ($answer->is_suggested || $user->can('useCustomAnswer', $answer->field)) {
            return $this->allow();
        }
    }
}

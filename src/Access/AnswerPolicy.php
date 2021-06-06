<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Access;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;
use FoF\Mason\Answer;

class AnswerPolicy extends AbstractPolicy
{
    public function addToDiscussion(User $user, Answer $answer)
    {
        if ($answer->is_suggested || $user->can('useCustomAnswer', $answer->field)) {
            return $this->allow();
        }
    }
}

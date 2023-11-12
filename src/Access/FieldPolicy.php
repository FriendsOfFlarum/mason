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
use FoF\Mason\Field;

class FieldPolicy extends AbstractPolicy
{
    /**
     * A custom answer can only be created if the field setting allow it (or admin).
     *
     * @param User  $user
     * @param Field $field
     */
    public function useCustomAnswer(User $user, Field $field)
    {
        if ($field->user_values_allowed) {
            return $this->allow();
        }
    }

    /**
     * A field can only be skipped if no answer is required (or admin).
     *
     * @param User  $user
     * @param Field $field
     */
    public function skipField(User $user, Field $field)
    {
        if ($field->min_answers_count === 0 || $user->can('fof-mason.skip-required-fields')) {
            return $this->allow();
        }
    }
}

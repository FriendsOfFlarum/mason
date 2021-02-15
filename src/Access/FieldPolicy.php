<?php

namespace FoF\Mason\Access;

use Flarum\User\Access\AbstractPolicy;
use FoF\Mason\Field;
use Flarum\User\User;

class FieldPolicy extends AbstractPolicy
{
    /**
     * A custom answer can only be created if the field setting allow it (or admin)
     * @param User $user
     * @param Field $field
     * @return bool
     */
    public function useCustomAnswer(User $user, Field $field)
    {
        if ($field->user_values_allowed) {
            return $this->allow();
        }
    }

    /**
     * A field can only be skipped if no answer is required (or admin)
     * @param User $user
     * @param Field $field
     * @return bool
     */
    public function skipField(User $user, Field $field)
    {
        if ($field->min_answers_count === 0 || $user->can('fof-mason.skip-required-fields')) {
            return $this->allow();
        }
    }
}

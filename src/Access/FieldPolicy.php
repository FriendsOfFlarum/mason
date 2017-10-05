<?php

namespace Flagrow\Mason\Access;

use Flagrow\Mason\Field;
use Flarum\Core\Access\AbstractPolicy;
use Flarum\Core\User;

class FieldPolicy extends AbstractPolicy
{
    protected $model = Field::class;

    /**
     * A custom answer can only be created if the field setting allow it (or admin)
     * @param User $user
     * @param Field $field
     * @return bool
     */
    public function useCustomAnswer(User $user, Field $field)
    {
        return $field->user_values_allowed;
    }

    /**
     * A field can only be skipped if no answer is required (or admin)
     * @param User $user
     * @param Field $field
     * @return bool
     */
    public function skipField(User $user, Field $field)
    {
        return $field->min_answers_count === 0 || $user->can('flagrow.mason.skip-required-fields');
    }
}

<?php

namespace Flagrow\Mason\Validators;

use Flarum\Core\Validator\AbstractValidator;

class FieldValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'name' => 'required|string',
            'description' => 'sometimes|string',
            'min_answers_count' => 'required|integer|min:0|max:255',
            'max_answers_count' => 'required|integer|min:1|max:255',
            'user_values_allowed' => 'required|boolean',
            'validation' => 'sometimes|string',
            'icon' => 'sometimes|string',
        ];
    }
}

<?php

namespace FoF\Mason\Validators;

use Flarum\Foundation\AbstractValidator;

class FieldValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'name' => 'required|string',
            'description' => 'sometimes|string',
            'min_answers_count' => 'required|integer|min:0|max:255',
            'max_answers_count' => 'required|integer|min:1|max:255',
            'show_when_empty' => 'required|boolean',
            'user_values_allowed' => 'required|boolean',
            'validation' => 'sometimes|string',
            'icon' => 'sometimes|string',
        ];
    }
}

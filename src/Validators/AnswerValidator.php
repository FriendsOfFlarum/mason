<?php

namespace Flagrow\Mason\Validators;

use Flarum\Foundation\AbstractValidator;

class AnswerValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'content' => 'required|string',
            'is_suggested' => 'sometimes|boolean',
        ];
    }
}

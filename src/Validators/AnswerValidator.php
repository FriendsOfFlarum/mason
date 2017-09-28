<?php

namespace Flagrow\Mason\Validators;

use Flarum\Core\Validator\AbstractValidator;

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

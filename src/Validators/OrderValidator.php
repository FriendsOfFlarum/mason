<?php

namespace Flagrow\Mason\Validators;

use Flarum\Core\Validator\AbstractValidator;

class OrderValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'sort' => 'required|array',
        ];
    }
}

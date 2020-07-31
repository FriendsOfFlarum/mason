<?php

namespace FoF\Mason\Validators;

use Flarum\Foundation\AbstractValidator;

class OrderValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'sort' => 'required|array',
        ];
    }
}

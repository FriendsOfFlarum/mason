<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Validators;

use Flarum\Foundation\AbstractValidator;

class FieldValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'name'                => 'required|string',
            'description'         => 'sometimes|string',
            'min_answers_count'   => 'required|integer|min:0|max:1', // Min was never implemented, just switches between optional and required
            'max_answers_count'   => 'required|integer|min:1|max:1', // Max was never implemented, do not allow changing for now
            'show_when_empty'     => 'required|boolean',
            'user_values_allowed' => 'required|boolean',
            'validation'          => 'sometimes|string',
            'icon'                => 'sometimes|string',
        ];
    }
}

<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Event;

use Flarum\User\User;
use FoF\Mason\Field;

class FieldCreated
{
    public function __construct(
        public readonly Field $field,
        public readonly User $actor
    ) {
    }
}

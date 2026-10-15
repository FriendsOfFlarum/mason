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
use FoF\Mason\Answer;

class AnswerUpdated
{
    /**
     * @param array<string, array{0: mixed, 1: mixed}> $changes attribute => [old, new]
     */
    public function __construct(
        public readonly Answer $answer,
        public readonly User $actor,
        public readonly array $changes
    ) {
    }
}

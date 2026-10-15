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

use Flarum\Discussion\Discussion;
use Flarum\User\User;
use FoF\Mason\Answer;

/**
 * Dispatched once the discussion is saved, so new free-text answers have been persisted.
 */
class DiscussionAnswersChanged
{
    /**
     * @param Answer[] $oldAnswers
     * @param Answer[] $newAnswers
     */
    public function __construct(
        public readonly Discussion $discussion,
        public readonly User $actor,
        public readonly array $oldAnswers,
        public readonly array $newAnswers
    ) {
    }
}

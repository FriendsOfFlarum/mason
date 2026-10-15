<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason;

use Flarum\Discussion\Discussion;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Defines `Discussion::masonAnswers()`. An invokable class rather than an extend.php closure
 * so callers get a typed relation that flarum/phpstan cannot infer from Extend\Model::relationship().
 */
class DiscussionAnswersRelationship
{
    /**
     * @return BelongsToMany<Answer, Discussion>
     */
    public function __invoke(Discussion $discussion): BelongsToMany
    {
        return $discussion->belongsToMany(Answer::class, 'fof_mason_discussion_answer', 'discussion_id', 'answer_id')
            ->withTimestamps()
            // Hides answers to soft-deleted fields. sync() works on the pivot alone, so
            // the discussion's next answer update detaches them (as in 1.x).
            ->whereHas('field');
    }
}

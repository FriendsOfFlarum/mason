<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Repositories;

use FoF\Mason\Answer;
use FoF\Mason\Field;

class AnswerRepository
{
    /**
     * Reuses an existing answer with the same content so identical free-text answers share a row.
     * A new answer is returned unsaved; persist it once the owning discussion is saved.
     */
    public function findOrNew(Field $field, string $content): Answer
    {
        $answer = $field->answers()->where('content', $content)->first();

        if (!$answer) {
            $answer = new Answer(['content' => $content]);
            $answer->field()->associate($field);
        }

        return $answer;
    }

    /**
     * @param array<int, int|string> $sorting answer ids, in display order
     */
    public function sorting(Field $field, array $sorting): void
    {
        foreach ($sorting as $i => $answerId) {
            $field->answers()->where('id', $answerId)->update(['sort' => $i]);
        }
    }
}

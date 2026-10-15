<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Gdpr;

use Flarum\Discussion\Discussion;
use Flarum\Gdpr\Data\Type;
use FoF\Mason\Answer;
use FoF\Mason\Field;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

/**
 * Answers carry no author: a user's Mason data is the answers on the discussions they started.
 */
class MasonAnswers extends Type
{
    public function export(): ?array
    {
        $export = [];

        $this->startedDiscussions()
            // As core's Discussions type; extensions owning the private flag export those.
            ->where('is_private', false)
            ->whereVisibleTo($this->user)
            ->whereHas('masonAnswers')
            ->with('masonAnswers.field')
            ->orderBy('created_at')
            ->each(function (Discussion $discussion) use (&$export) {
                $export[] = [
                    "mason/discussion-{$discussion->id}.json" => $this->encodeForExport([
                        'discussion_id' => $discussion->id,
                        'title'         => $discussion->title,
                        'fields'        => $this->fieldsOf($discussion->getRelation('masonAnswers')),
                    ]),
                ];
            });

        return $export ?: null;
    }

    public function anonymize(): void
    {
        // Answers describe the discussion, which stays, like core keeps post content.
    }

    public function delete(): void
    {
        (new Answer())->getConnection()
            ->table('fof_mason_discussion_answer')
            ->whereIn('discussion_id', $this->startedDiscussions()->select('id'))
            ->delete();

        // Free text is shared between discussions with the same answer, so only rows nothing uses go.
        // This includes those orphaned when core deleted the user's emptied discussions earlier in the job.
        Answer::query()
            ->where('is_suggested', false)
            ->whereDoesntHave('discussions')
            ->delete();
    }

    /**
     * @return Builder<Discussion>
     */
    protected function startedDiscussions(): Builder
    {
        return Discussion::query()->where('user_id', $this->user->id);
    }

    /**
     * @param Collection<int, Answer> $answers
     * @return array<int, array{field: string, answers: string[]}>
     */
    protected function fieldsOf(Collection $answers): array
    {
        return $answers
            ->groupBy('field_id')
            ->map(fn (Collection $fieldAnswers) => [
                'field'   => $fieldAnswers->first()->field,
                'answers' => $fieldAnswers->sortBy('id')->pluck('content')->values()->all(),
            ])
            // Admin order: sort ascending, never-sorted fields last.
            ->sortBy(fn (array $group) => [$group['field']->sort ?? PHP_INT_MAX, $group['field']->id])
            ->map(fn (array $group) => ['field' => $group['field']->name, 'answers' => $group['answers']])
            ->values()
            ->all();
    }
}

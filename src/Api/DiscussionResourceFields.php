<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Api;

use Flarum\Api\Context;
use Flarum\Api\Schema;
use Flarum\Discussion\Discussion;
use Flarum\Foundation\ValidationException;
use Flarum\User\Exception\PermissionDeniedException;
use Flarum\User\User;
use FoF\Mason\Answer;
use FoF\Mason\Api\Schema\AnswersRelationship;
use FoF\Mason\DiscussionAnswersRelationship;
use FoF\Mason\Event\DiscussionAnswersChanged;
use FoF\Mason\Field;
use FoF\Mason\Repositories\FieldRepository;
use Illuminate\Contracts\Validation\Factory;

class DiscussionResourceFields
{
    public function __construct(
        protected FieldRepository $fields,
        protected Factory $validation
    ) {
    }

    public function __invoke(): array
    {
        return [
            Schema\Boolean::make('canSeeMasonAnswers')
                ->get(fn (Discussion $discussion, Context $context) => $context->getActor()->can('seeMasonAnswers', $discussion)),
            Schema\Boolean::make('canUpdateMasonAnswers')
                ->get(fn (Discussion $discussion, Context $context) => $context->getActor()->can('updateMasonAnswers', $discussion)),

            AnswersRelationship::make('masonAnswers')
                ->type('mason-answers')
                ->includable()
                ->visible(fn (Discussion $discussion, Context $context) => $context->getActor()->can('seeMasonAnswers', $discussion))
                ->writable(function (Discussion $discussion, Context $context) {
                    return $context->creating()
                        ? $context->getActor()->can('fillMasonAnswers', $discussion)
                        : $context->getActor()->can('updateMasonAnswers', $discussion);
                })
                // Always run the setter on create so required fields are enforced
                // even when the client leaves the relationship out entirely.
                ->default(['data' => []])
                ->set($this->setAnswers(...))
                // Persistence happens in afterSave(); the stock sync() can't handle unsaved inline answers.
                ->save(fn () => null),
        ];
    }

    /**
     * @param Answer[] $answers
     */
    protected function setAnswers(Discussion $discussion, array $answers, Context $context): void
    {
        $actor = $context->getActor();

        // Only reachable through default(): an explicit payload from this actor fails writable().
        if ($context->creating() && $actor->cannot('fillMasonAnswers', $discussion)) {
            return;
        }

        $answersPerField = [];

        foreach ($answers as $answer) {
            if ($actor->cannot('addToDiscussion', $answer)) {
                throw new PermissionDeniedException();
            }

            $answersPerField[$answer->field_id] = ($answersPerField[$answer->field_id] ?? 0) + 1;
        }

        foreach ($this->fields->all() as $field) {
            if ($actor->can('skipField', $field)) {
                continue;
            }

            $this->validateAnswerCount($field, $answersPerField[$field->id] ?? 0);
        }

        if ($discussion->exists) {
            $this->raiseIfChanged($discussion, $answers, $actor);
        }

        $discussion->afterSave(function (Discussion $discussion) use ($answers) {
            foreach ($answers as $answer) {
                if (!$answer->exists) {
                    $answer->save();
                }
            }

            (new DiscussionAnswersRelationship())($discussion)->sync(array_map(fn (Answer $answer) => $answer->id, $answers));
            $discussion->unsetRelation('masonAnswers');
        });
    }

    /**
     * @param Answer[] $answers
     */
    protected function raiseIfChanged(Discussion $discussion, array $answers, User $actor): void
    {
        $oldAnswers = (new DiscussionAnswersRelationship())($discussion)->with('field')->get();
        // An unsaved (new free-text) answer has no id, so it always counts as a change.
        $newIds = array_map(fn (Answer $answer) => $answer->id, $answers);

        $unchanged = !in_array(null, $newIds, true)
            && count($newIds) === $oldAnswers->count()
            && !array_diff($newIds, $oldAnswers->modelKeys());

        if (!$unchanged) {
            // Raised events are dispatched after the save, once new free-text answers exist.
            $discussion->raise(new DiscussionAnswersChanged($discussion, $actor, $oldAnswers->all(), $answers));
        }
    }

    protected function validateAnswerCount(Field $field, int $count): void
    {
        $min = $field->min_answers_count;
        $max = $field->max_answers_count;
        $key = 'Answer Count '.$field->name;

        $validator = $this->validation->make(
            [$key => $count],
            [$key => ['numeric', $min === $max ? "size:$min" : "between:$min,$max"]]
        );

        if ($validator->fails()) {
            throw new ValidationException([], ['masonAnswers' => $validator->getMessageBag()->first($key)]);
        }
    }
}

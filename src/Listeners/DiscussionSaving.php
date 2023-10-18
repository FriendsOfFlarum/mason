<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Listeners;

use Flarum\Discussion\Event\Saving;
use Flarum\Foundation\ValidationException;
use Flarum\User\Exception\PermissionDeniedException;
use FoF\Mason\Field;
use FoF\Mason\Repositories\AnswerRepository;
use FoF\Mason\Repositories\FieldRepository;
use FoF\Mason\Validators\UserAnswerValidator;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\Arr;

class DiscussionSaving
{
    private $validation;
    private $fields;
    private $answers;

    public function __construct(Factory $validation, FieldRepository $fields, AnswerRepository $answers)
    {
        $this->validation = $validation;
        $this->fields = $fields;
        $this->answers = $answers;
    }

    /**
     * @param Saving $event
     *
     * @throws PermissionDeniedException
     * @throws \Illuminate\Validation\ValidationException
     * @throws ValidationException
     */
    public function handle(Saving $event)
    {
        $hasAnswersData = isset($event->data['relationships']['masonAnswers']['data']);

        if ($event->discussion->exists) { // Discussion update
            // If we're updating a discussion, we only handle fields update if fields attribute is given
            // This skips cases like discussion renaming
            if ($hasAnswersData) {
                if ($event->actor->can('updateMasonAnswers', $event->discussion)) {
                    $this->fillOrUpdateFields($event);
                } else {
                    throw new PermissionDeniedException();
                }
            }
        } else { // Discussion creation
            if ($event->actor->can('fillMasonAnswers', $event->discussion)) {
                $this->fillOrUpdateFields($event);
            } elseif ($hasAnswersData) {
                // Only throw a permission exception if fields data was included in the request
                // Users not authorized to use the fields should not have a masonAnswers relationship at all
                throw new PermissionDeniedException();
            }
        }
    }

    /**
     * @param Saving $event
     *
     * @throws PermissionDeniedException
     * @throws \Illuminate\Validation\ValidationException
     * @throws ValidationException
     */
    protected function fillOrUpdateFields(Saving $event)
    {
        $newAnswerIds = [];
        $answersPerField = [];

        $answerRelations = Arr::get($event->data, 'relationships.masonAnswers.data', []);

        foreach ($answerRelations as $answerRelation) {
            $answer = null;

            if ($id = Arr::get($answerRelation, 'id')) {
                $answer = $this->answers->findOrFail($id);
            } elseif (Arr::has($answerRelation, 'attributes.content') && Arr::has($answerRelation, 'relationships.field.data.id')) {
                $field = $this->fields->findOrFail(Arr::get($answerRelation, 'relationships.field.data.id'));
                $content = trim(Arr::get($answerRelation, 'attributes.content'));

                /**
                 * @var $answerValidator UserAnswerValidator
                 */
                $answerValidator = resolve(UserAnswerValidator::class);
                $answerValidator->setField($field);
                $answerValidator->assertValid([
                    $field->name => $content,
                ]);

                // If the field is empty, we skip the findOrCreate part
                // It will also not be counted towards the field answers count
                if ($content === null || $content === '') {
                    continue;
                }

                $answer = $this->answers->findOrCreate($field, $content);
            } else {
                throw new ValidationException([], ['masonAnswers' => 'Invalid answer payload']);
            }

            if (!$event->actor->can('addToDiscussion', $answer)) {
                throw new PermissionDeniedException();
            }

            $newAnswerIds[] = $answer->id;
            $answersPerField[$answer->field->id] = Arr::get($answersPerField, $answer->field->id, 0) + 1;
        }

        $this->fields->all()->each(function ($field) use ($event, $answersPerField) {
            // If the actor can skip fields, no need to check their number
            if ($event->actor->can('skipField', $field)) {
                return;
            }

            $count = Arr::get($answersPerField, $field->id, 0);

            $this->validateAnswerCount($field, $count);
        });

        $event->discussion->afterSave(function ($discussion) use ($newAnswerIds) {
            $discussion->masonAnswers()->sync($newAnswerIds);
        });
    }

    /**
     * @param Field $field
     * @param       $count
     *
     * @throws ValidationException
     */
    protected function validateAnswerCount(Field $field, $count)
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

<?php

namespace Flagrow\Mason\Handlers;

use Flagrow\Mason\Field;
use Flagrow\Mason\Repositories\AnswerRepository;
use Flagrow\Mason\Repositories\FieldRepository;
use Flagrow\Mason\Validators\UserAnswerValidator;
use Flarum\Discussion\Event\Saving;
use Flarum\Foundation\ValidationException;
use Flarum\User\Exception\PermissionDeniedException;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\Arr;

class DiscussionSaving
{
    /**
     * @var Factory
     */
    private $validation;
    /**
     * @var FieldRepository
     */
    private $fields;
    /**
     * @var AnswerRepository
     */
    private $answers;

    public function __construct(Factory $validation, FieldRepository $fields, AnswerRepository $answers)
    {
        $this->validation = $validation;
        $this->fields = $fields;
        $this->answers = $answers;
    }

    public function __invoke(Saving $event)
    {
        $discussion = $event->discussion;
        $actor = $event->actor;

        $hasAnswersData = isset($event->data['relationships']['flagrowMasonAnswers']['data']);

        if ($discussion->exists) {
            if (!$actor->can('updateFlagrowMasonAnswers', $discussion)) {
                if (!$hasAnswersData) {
                    // If we're updating a discussion and no answer data has been given we skip
                    // Handles cases like discussion renaming
                    return;
                } else {
                    // However if the user is trying but isn't allowed to update fields, we throw a permission error
                    throw new PermissionDeniedException;
                }
            }

        } else {
            if (!$actor->can('fillFlagrowMasonAnswers', $discussion)) {
                if (!$hasAnswersData) {
                    // if no answer data is provided and the user can't fill fields, just skip this handler
                    return;
                } else {
                    // However if the user is trying but isn't allowed to fill fields, we throw a permission error
                    throw new PermissionDeniedException;
                }
            }
        }

        $newAnswerIds = [];
        $answersPerField = [];

        $answerRelations = $hasAnswersData ? $event->data['relationships']['flagrowMasonAnswers']['data'] : [];

        foreach ($answerRelations as $answerRelation) {
            $answer = null;

            if ($id = Arr::get($answerRelation, 'id')) {
                $answer = $this->answers->findOrFail($id);
            } else if (isset($answerRelation['attributes']['content']) && isset($answerRelation['relationships']['field']['data']['id'])) {
                $field = $this->fields->findOrFail($answerRelation['relationships']['field']['data']['id']);
                $content = trim($answerRelation['attributes']['content']);

                /**
                 * @var $answerValidator UserAnswerValidator
                 */
                $answerValidator = app(UserAnswerValidator::class);
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
                throw new \Exception('Invalid answer payload');
            }

            if (!$actor->can('addToDiscussion', $answer)) {
                throw new PermissionDeniedException;
            }

            $newAnswerIds[] = $answer->id;
            $answersPerField[$answer->field->id] = Arr::get($answersPerField, $answer->field->id, 0) + 1;
        }

        $this->fields->all()->each(function ($field) use ($actor, $answersPerField) {
            // If the actor can skip fields, no need to check their number
            if ($actor->can('skipField', $field)) {
                return;
            }

            $count = Arr::get($answersPerField, $field->id, 0);

            $this->validateAnswerCount($field, $count);
        });

        $discussion->afterSave(function ($discussion) use ($newAnswerIds) {
            $discussion->flagrowMasonAnswers()->sync($newAnswerIds);
        });
    }

    protected function validateAnswerCount(Field $field, $count)
    {
        $min = $field->min_answers_count;
        $max = $field->max_answers_count;
        $key = 'Answer Count ' . $field->name;

        $validator = $this->validation->make(
            [$key => $count],
            [$key => ['numeric', $min === $max ? "size:$min" : "between:$min,$max"]]
        );

        if ($validator->fails()) {
            throw new ValidationException([], ['flagrowMasonAnswers' => $validator->getMessageBag()->first($key)]);
        }
    }
}

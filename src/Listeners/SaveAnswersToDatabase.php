<?php

namespace Flagrow\Mason\Listeners;

use Flagrow\Mason\Field;
use Flagrow\Mason\Repositories\AnswerRepository;
use Flagrow\Mason\Repositories\FieldRepository;
use Flarum\Core\Exception\PermissionDeniedException;
use Flarum\Core\Exception\ValidationException;
use Flarum\Event\DiscussionWillBeSaved;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\Arr;

class SaveAnswersToDatabase
{
    /**
     * @var Factory
     */
    protected $validator;

    /**
     * @var AnswerRepository
     */
    protected $answers;

    /**
     * @var FieldRepository
     */
    protected $fields;

    public function __construct(Factory $validator)
    {
        $this->validator = $validator;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(DiscussionWillBeSaved::class, [$this, 'whenDiscussionWillBeSaved']);
    }

    public function whenDiscussionWillBeSaved(DiscussionWillBeSaved $event)
    {
        $discussion = $event->discussion;
        $actor = $event->actor;

        // Can't be put in the constructor, it's probably too early in the container lifecycle
        $this->answers = app(AnswerRepository::class);
        $this->fields = app(FieldRepository::class);

        $hasAnswersData = isset($event->data['relationships']['flagrowMasonAnswers']['data']);

        if ($discussion->exists) {
            if ($hasAnswersData) {
                if (!$actor->can('updateFlagrowMasonAnswers', $discussion)) {
                    throw new PermissionDeniedException;
                }
            } else {
                // If we're updating a discussion and no answer data has been given we skip
                // Handles cases like discussion renaming
                return;
            }
        }

        $newAnswerIds = [];
        $answersPerField = [];

        $answerRelations = $hasAnswersData ? $event->data['relationships']['flagrowMasonAnswers']['data'] : [];

        foreach ($answerRelations as $answerRelation) {
            $answer = null;

            if ($id = Arr::get($answerRelation, 'id')) {
                $answer = $this->answers->findOrFail($id);
            } else {
                // TODO: create custom answer. Requires to have the field relation in the payload
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
        $key = 'answer_count_' . $field->id;

        $validator = $this->validator->make(
            [$key => $count],
            [$key => ['numeric', $min === $max ? "size:$min" : "between:$min,$max"]]
        );

        if ($validator->fails()) {
            throw new ValidationException([], ['flagrowMasonAnswers' => $validator->getMessageBag()->first($key)]);
        }
    }
}

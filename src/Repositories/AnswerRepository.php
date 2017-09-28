<?php

namespace Flagrow\Mason\Repositories;

use Flagrow\Mason\Answer;
use Flagrow\Mason\Field;
use Flagrow\Mason\Validators\AnswerValidator;

class AnswerRepository
{
    /**
     * @var Answer
     */
    protected $answer;

    /**
     * @var AnswerValidator
     */
    protected $validator;

    public function __construct(Answer $answer, AnswerValidator $validator)
    {
        $this->answer = $answer;
        $this->validator = $validator;
    }

    protected function query(Field $field)
    {
        return $field->answers()->orderBy('is_suggested', 'desc')->orderBy('sort', 'desc');
    }

    public function all(Field $field)
    {
        return $this->query($field)->get();
    }

    public function suggested(Field $field)
    {
        return $this->query($field)->where('is_suggested', true)->get();
    }

    /**
     * @param $id
     * @return Answer
     */
    public function findOrFail($id)
    {
        return $this->answer->newQuery()->findOrFail($id);
    }

    /**
     * @param Field $field
     * @param array $attributes
     * @return Answer
     */
    public function store(Field $field, array $attributes)
    {
        $this->validator->assertValid($attributes);

        $answer = new Answer($attributes);
        $answer->field()->associate($field);
        $answer->save();

        return $answer;
    }

    /**
     * @param Answer $answer
     * @param array $attributes
     * @return Answer
     */
    public function update(Answer $answer, array $attributes)
    {
        $this->validator->assertValid($attributes);

        $answer->fill($attributes);
        $answer->save();

        return $answer;
    }

    public function delete(Answer $answer)
    {
        $answer->delete();
    }

    public function sorting(array $sorting)
    {
        foreach ($sorting as $i => $answerId) {
            $this->answer->where('id', $answerId)->update(['sort' => $i]);
        }
    }
}

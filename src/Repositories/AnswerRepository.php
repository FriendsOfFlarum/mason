<?php

namespace FoF\Mason\Repositories;

use FoF\Mason\Answer;
use FoF\Mason\Field;
use FoF\Mason\Validators\AnswerValidator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class AnswerRepository
{
    protected $answer;
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

    /**
     * @param Field $field
     * @return Collection|Answer[]
     */
    public function all(Field $field): Collection
    {
        return $this->query($field)->get();
    }

    public function suggested(Field $field)
    {
        return $this->query($field)->where('is_suggested', true)->get();
    }

    /**
     * @param $id
     * @return Answer|Model
     */
    public function findOrFail($id)
    {
        return $this->answer->newQuery()->findOrFail($id);
    }

    public function findOrCreate(Field $field, $content): Answer
    {
        $answer = $field->answers()->where('content', $content)->first();

        if (!$answer) {
            $answer = new Answer([
                'content' => $content,
            ]);
            $answer->field()->associate($field);
            $answer->save();
        }

        return $answer;
    }

    public function store(Field $field, array $attributes): Answer
    {
        $this->validator->assertValid($attributes);

        $answer = new Answer($attributes);
        $answer->field()->associate($field);
        $answer->save();

        return $answer;
    }

    public function update(Answer $answer, array $attributes): Answer
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
            $this->answer->newQuery()->where('id', $answerId)->update(['sort' => $i]);
        }
    }
}

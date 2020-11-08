<?php

namespace FoF\Mason\Repositories;

use FoF\Mason\Field;
use FoF\Mason\Validators\FieldValidator;
use Illuminate\Cache\Repository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class FieldRepository
{
    protected $field;
    protected $validator;
    protected $cache;

    public function __construct(Field $field, FieldValidator $validator, Repository $cache)
    {
        $this->field = $field;
        $this->validator = $validator;
        $this->cache = $cache;
    }

    protected function query(): Builder
    {
        return $this->field->newQuery()->orderBy('sort', 'desc');
    }

    /**
     * @param $id
     * @return Field|Model
     */
    public function findOrFail($id): Field
    {
        return $this->field->newQuery()->findOrFail($id);
    }

    /**
     * @return Collection|Field[]
     */
    public function all(): Collection
    {
        return $this->query()->get();
    }

    public function store(array $attributes): Field
    {
        $this->validator->assertValid($attributes);

        $field = new Field($attributes);
        $field->save();

        return $field;
    }

    public function update(Field $field, array $attributes): Field
    {
        $this->validator->assertValid($attributes);

        $field->fill($attributes);
        $field->save();

        return $field;
    }

    public function delete(Field $field)
    {
        $field->delete();
    }

    public function sorting(array $sorting)
    {
        foreach ($sorting as $i => $fieldId) {
            $this->field->newQuery()->where('id', $fieldId)->update(['sort' => $i]);
        }
    }
}

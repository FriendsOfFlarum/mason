<?php

namespace FoF\Mason\Repositories;

use FoF\Mason\Field;
use FoF\Mason\Validators\FieldValidator;
use Illuminate\Cache\Repository;

class FieldRepository
{
    /**
     * @var Field
     */
    protected $field;

    /**
     * @var FieldValidator
     */
    protected $validator;

    /**
     * @var Repository
     */
    protected $cache;

    public function __construct(Field $field, FieldValidator $validator, Repository $cache)
    {
        $this->field = $field;
        $this->validator = $validator;
        $this->cache = $cache;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function query()
    {
        return $this->field->newQuery()->orderBy('sort', 'desc');
    }

    /**
     * @param $id
     * @return Field
     */
    public function findOrFail($id)
    {
        return $this->field->newQuery()->findOrFail($id);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection|Field[]
     */
    public function all()
    {
        return $this->query()->get();
    }

    /**
     * @param array $attributes
     * @return Field
     */
    public function store(array $attributes)
    {
        $this->validator->assertValid($attributes);

        $field = new Field($attributes);
        $field->save();

        return $field;
    }

    /**
     * @param Field $field
     * @param array $attributes
     * @return Field
     */
    public function update(Field $field, array $attributes)
    {
        $this->validator->assertValid($attributes);

        $field->fill($attributes);
        $field->save();

        return $field;
    }

    /**
     * @param Field $field
     */
    public function delete(Field $field)
    {
        $field->delete();
    }

    public function sorting(array $sorting)
    {
        foreach ($sorting as $i => $fieldId) {
            $this->field->where('id', $fieldId)->update(['sort' => $i]);
        }
    }
}

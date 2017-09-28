<?php

namespace Flagrow\Mason\Repositories;

use Flagrow\Mason\Answer;
use Flagrow\Mason\Field;
use Flagrow\Mason\Validators\FieldValidator;
use Flarum\Core\User;
use Illuminate\Cache\Repository;
use Illuminate\Support\Arr;
use Validator;

class FieldRepository
{
    const CACHE_KEY_ALL_FIELDS = 'masquerade.fields.all';
    const CACHE_KEY_UNCOMPLETED = 'masquerade.uncompleted.u.%d';

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
}

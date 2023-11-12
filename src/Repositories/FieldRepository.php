<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Repositories;

use FoF\Mason\Field;
use FoF\Mason\Validators\FieldValidator;
use Illuminate\Cache\Repository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

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
     *
     * @return Field
     */
    public function findOrFail($id): Field
    {
        return $this->field->newQuery()->findOrFail($id);
    }

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

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
use Illuminate\Database\Eloquent\Collection;

class FieldRepository
{
    public function findOrFail(int|string|null $id): Field
    {
        return Field::query()->findOrFail($id);
    }

    /**
     * @return Collection<int, Field>
     */
    public function all(): Collection
    {
        return Field::query()->orderBy('sort', 'desc')->get();
    }

    /**
     * @param array<int, int|string> $sorting field ids, in display order
     */
    public function sorting(array $sorting): void
    {
        foreach ($sorting as $i => $fieldId) {
            Field::query()->where('id', $fieldId)->update(['sort' => $i]);
        }
    }
}

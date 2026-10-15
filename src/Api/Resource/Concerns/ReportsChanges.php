<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Api\Resource\Concerns;

use Flarum\Database\AbstractModel;
use Illuminate\Support\Arr;

trait ReportsChanges
{
    /**
     * What the save just performed changed, cast like the model's attributes (getPrevious() is raw).
     *
     * @return array<string, array{0: mixed, 1: mixed}> attribute => [old, new]
     */
    protected function changesOf(AbstractModel $model): array
    {
        $before = $model->newInstance()->setRawAttributes($model->getPrevious());
        $changes = [];

        foreach (array_keys(Arr::except($model->getChanges(), [$model->getUpdatedAtColumn()])) as $attribute) {
            $changes[$attribute] = [$before->getAttribute($attribute), $model->getAttribute($attribute)];
        }

        return $changes;
    }
}

<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use FoF\Mason\Answer;
use Tobscure\JsonApi\Relationship;

/**
 * @TODO: Remove this in favor of one of the API resource classes that were added.
 *      Or extend an existing API Resource to add this to.
 *      Or use a vanilla RequestHandlerInterface controller.
 *      @link https://docs.flarum.org/2.x/extend/api#endpoints
 */
class AnswerSerializer extends AbstractSerializer
{
    protected $type = 'mason-answers';

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param Answer|array $model
     *
     * @return array
     */
    protected function getDefaultAttributes($model)
    {
        return $model->toArray();
    }

    /**
     * @param $model
     *
     * @return Relationship
     */
    public function field($model)
    {
        return $this->hasOne(
            $model,
            FieldSerializer::class,
            'field'
        );
    }
}

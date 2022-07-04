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
use FoF\Mason\Field;
use FoF\Mason\Repositories\AnswerRepository;
use Tobscure\JsonApi\Collection;
use Tobscure\JsonApi\Relationship;

class FieldSerializer extends AbstractSerializer
{
    protected $type = 'mason-fields';

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param Field|array $model
     *
     * @return array
     */
    protected function getDefaultAttributes($model)
    {
        return $model->toArray();
    }

    /**
     * @param Field $model
     *
     * @return Relationship
     */
    public function suggestedAnswers($model)
    {
        /**
         * @var $answers AnswerRepository
         */
        $answers = resolve(AnswerRepository::class);

        return new Relationship(new Collection($answers->suggested($model), resolve(AnswerSerializer::class)));
    }

    /**
     * @param Field $model
     *
     * @return Relationship
     */
    public function allAnswers($model)
    {
        $actor = $this->getActor();

        if (!$actor || !$actor->isAdmin()) {
            return null;
        }

        /**
         * @var $answers AnswerRepository
         */
        $answers = resolve(AnswerRepository::class);

        return new Relationship(new Collection($answers->all($model), resolve(AnswerSerializer::class)));
    }
}

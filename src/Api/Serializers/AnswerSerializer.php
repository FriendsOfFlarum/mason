<?php

namespace FoF\Mason\Api\Serializers;

use FoF\Mason\Answer;
use Flarum\Api\Serializer\AbstractSerializer;
use Tobscure\JsonApi\Relationship;

class AnswerSerializer extends AbstractSerializer
{
    protected $type = 'mason-answers';

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param Answer|array $model
     * @return array
     */
    protected function getDefaultAttributes($model)
    {
        return $model->toArray();
    }

    /**
     * @param $model
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

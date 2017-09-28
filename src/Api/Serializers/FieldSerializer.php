<?php

namespace Flagrow\Mason\Api\Serializers;

use Flagrow\Mason\Field;
use Flagrow\Mason\Repositories\AnswerRepository;
use Flarum\Api\Serializer\AbstractSerializer;
use Tobscure\JsonApi\Collection;
use Tobscure\JsonApi\Relationship;

class FieldSerializer extends AbstractSerializer
{
    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param Field|array $model
     * @return array
     */
    protected function getDefaultAttributes($model)
    {
        return $model->toArray();
    }

    /**
     * @param Field $model
     * @return string
     */
    public function getType($model)
    {
        return 'flagrow-mason-field';
    }

    /**
     * @param Field $model
     * @return Relationship
     */
    public function suggested_answers($model)
    {
        /**
         * @var AnswerRepository
         */
        $answers = app(AnswerRepository::class);

        return new Relationship(new Collection($answers->suggested($model), app(AnswerSerializer::class)));
    }

    /**
     * @param Field $model
     * @return Relationship
     */
    public function all_answers($model)
    {
        $actor = $this->getActor();

        if (!$actor || !$actor->isAdmin()) {
            return null;
        }

        /**
         * @var AnswerRepository
         */
        $answers = app(AnswerRepository::class);

        return new Relationship(new Collection($answers->all($model), app(AnswerSerializer::class)));
    }
}

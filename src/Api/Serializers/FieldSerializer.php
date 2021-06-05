<?php

namespace FoF\Mason\Api\Serializers;

use FoF\Mason\Field;
use FoF\Mason\Repositories\AnswerRepository;
use Flarum\Api\Serializer\AbstractSerializer;
use Tobscure\JsonApi\Collection;
use Tobscure\JsonApi\Relationship;

class FieldSerializer extends AbstractSerializer
{
    protected $type = 'mason-fields';

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
     * @return Relationship
     */
    public function suggested_answers($model)
    {
        /**
         * @var $answers AnswerRepository
         */
        $answers = resolve(AnswerRepository::class);

        return new Relationship(new Collection($answers->suggested($model), resolve(AnswerSerializer::class)));
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
         * @var $answers AnswerRepository
         */
        $answers = resolve(AnswerRepository::class);

        return new Relationship(new Collection($answers->all($model), resolve(AnswerSerializer::class)));
    }
}

<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Api\Schema;

use Flarum\Api\Schema\Relationship\ToMany;
use FoF\Mason\Answer;
use FoF\Mason\Repositories\AnswerRepository;
use FoF\Mason\Repositories\FieldRepository;
use FoF\Mason\Validators\UserAnswerValidator;
use Illuminate\Support\Arr;
use Tobyz\JsonApiServer\Context;
use Tobyz\JsonApiServer\Exception\BadRequestException;
use Tobyz\JsonApiServer\Exception\Sourceable;

/**
 * The composer sends free-text answers inline, without an id:
 * `{type: 'mason-answers', attributes: {content}, relationships: {field: {data: {type, id}}}}`.
 * The stock ToMany rejects identifiers without an id, so those resolve here to an existing
 * answer with the same content or a new, unsaved one; the caller persists it after the save.
 */
class AnswersRelationship extends ToMany
{
    public function deserializeValue(mixed $value, Context $context): mixed
    {
        if (!is_array($value) || !array_key_exists('data', $value)) {
            throw new BadRequestException('relationship does not include data key');
        }

        if (!is_array($value['data']) || !array_is_list($value['data'])) {
            throw (new BadRequestException('relationship data must be a list of identifier objects'))
                ->setSource(['pointer' => '/data']);
        }

        $answers = [];

        foreach ($value['data'] as $i => $identifier) {
            try {
                $answer = isset($identifier['id'])
                    ? $this->findResourceForIdentifier($identifier, $context)
                    : $this->resolveInlineAnswer((array) $identifier);
            } catch (Sourceable $e) {
                throw $e->prependSource(['pointer' => "/data/$i"]);
            }

            if ($answer) {
                $answers[] = $answer;
            }
        }

        return $this->deserializer ? ($this->deserializer)($answers, $context) : $answers;
    }

    /**
     * Returns null for blank content: an empty free-text field counts as "no answer".
     */
    protected function resolveInlineAnswer(array $identifier): ?Answer
    {
        $fieldId = Arr::get($identifier, 'relationships.field.data.id');
        $content = Arr::get($identifier, 'attributes.content');

        if (!is_string($content) || !is_scalar($fieldId)) {
            throw new BadRequestException('answer must have an id, or content and a field');
        }

        $field = resolve(FieldRepository::class)->findOrFail($fieldId);
        $content = trim($content);

        resolve(UserAnswerValidator::class)
            ->setField($field)
            ->assertValid([$field->name => $content]);

        if ($content === '') {
            return null;
        }

        return resolve(AnswerRepository::class)->findOrNew($field, $content);
    }
}

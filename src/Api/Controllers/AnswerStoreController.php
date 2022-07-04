<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Api\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use FoF\Mason\Api\Serializers\FieldSerializer;
use FoF\Mason\Repositories\AnswerRepository;
use FoF\Mason\Repositories\FieldRepository;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class AnswerStoreController extends AbstractCreateController
{
    public $serializer = FieldSerializer::class;

    public $include = [
        'allAnswers',
    ];

    protected $fields;
    protected $answers;

    public function __construct(FieldRepository $fields, AnswerRepository $answers)
    {
        $this->fields = $fields;
        $this->answers = $answers;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        RequestUtil::getActor($request)->assertAdmin();

        $fieldId = Arr::get($request->getQueryParams(), 'id');

        $field = $this->fields->findOrFail($fieldId);

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        $this->answers->store($field, $attributes);

        // It's more useful to return the full field instead of the answer here
        // This helps update the store client-side with all answers for that field
        return $field;
    }
}

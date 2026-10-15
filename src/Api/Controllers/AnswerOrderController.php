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

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use FoF\Mason\Api\Serializers\FieldSerializer;
use FoF\Mason\Repositories\AnswerRepository;
use FoF\Mason\Repositories\FieldRepository;
use FoF\Mason\Validators\OrderValidator;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

/**
 * @TODO: Remove this in favor of one of the API resource classes that were added.
 *      Or extend an existing API Resource to add this to.
 *      Or use a vanilla RequestHandlerInterface controller.
 *      @link https://docs.flarum.org/2.x/extend/api#endpoints
 */
class AnswerOrderController extends AbstractShowController
{
    public $serializer = FieldSerializer::class;

    public $include = [
        'allAnswers',
    ];

    public function __construct(protected OrderValidator $validator, protected AnswerRepository $answers, protected FieldRepository $fields)
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        RequestUtil::getActor($request)->assertAdmin();

        $attributes = $request->getParsedBody();

        $this->validator->assertValid($attributes);

        $order = Arr::get($attributes, 'sort');

        $this->answers->sorting($order);

        $fieldId = Arr::get($request->getQueryParams(), 'id');

        // Return updated sorting values
        // Return the field instead of individual answers as it's easier to update the store client-side
        return $this->fields->findOrFail($fieldId);
    }
}

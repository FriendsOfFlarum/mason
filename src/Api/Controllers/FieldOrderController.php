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

use Flarum\Api\Controller\AbstractListController;
use FoF\Mason\Api\Serializers\FieldSerializer;
use FoF\Mason\Repositories\FieldRepository;
use FoF\Mason\Validators\OrderValidator;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class FieldOrderController extends AbstractListController
{
    public $serializer = FieldSerializer::class;

    public function __construct(protected OrderValidator $validator, protected FieldRepository $fields)
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $request->getAttribute('actor')->assertAdmin();

        $attributes = $request->getParsedBody();

        $this->validator->assertValid($attributes);

        $order = Arr::get($attributes, 'sort');

        $this->fields->sorting($order);

        // Return updated sorting values
        return $this->fields->all();
    }
}

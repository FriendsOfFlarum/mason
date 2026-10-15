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

use Flarum\Http\RequestUtil;
use FoF\Mason\Repositories\AnswerRepository;
use FoF\Mason\Repositories\FieldRepository;
use FoF\Mason\Validators\OrderValidator;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\EmptyResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class AnswerOrderController implements RequestHandlerInterface
{
    public function __construct(
        protected OrderValidator $validator,
        protected FieldRepository $fields,
        protected AnswerRepository $answers
    ) {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        RequestUtil::getActor($request)->assertAdmin();

        $field = $this->fields->findOrFail(Arr::get($request->getQueryParams(), 'id'));

        $body = (array) $request->getParsedBody();

        $this->validator->assertValid($body);

        $this->answers->sorting($field, $body['sort']);

        return new EmptyResponse(204);
    }
}

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

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use FoF\Mason\Repositories\AnswerRepository;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class AnswerDeleteController extends AbstractDeleteController
{
    public function __construct(protected AnswerRepository $answers)
    {
    }

    protected function delete(ServerRequestInterface $request): void
    {
        RequestUtil::getActor($request)->assertAdmin();

        $id = Arr::get($request->getQueryParams(), 'id');

        $field = $this->answers->findOrFail($id);

        $this->answers->delete($field);
    }
}

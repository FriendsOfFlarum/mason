<?php

namespace FoF\Mason\Api\Controllers;

use FoF\Mason\Repositories\FieldRepository;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class FieldDeleteController extends AbstractDeleteController
{
    protected $fields;

    public function __construct(FieldRepository $fields)
    {
        $this->fields = $fields;
    }

    protected function delete(ServerRequestInterface $request)
    {
        RequestUtil::getActor($request)->assertAdmin();

        $id = Arr::get($request->getQueryParams(), 'id');

        $field = $this->fields->findOrFail($id);

        $this->fields->delete($field);
    }
}

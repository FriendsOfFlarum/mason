<?php

namespace FoF\Mason\Api\Controllers;

use FoF\Mason\Repositories\FieldRepository;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\User\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class FieldDeleteController extends AbstractDeleteController
{
    use AssertPermissionTrait;

    /**
     * @var FieldRepository
     */
    protected $fields;

    public function __construct(FieldRepository $fields)
    {
        $this->fields = $fields;
    }

    protected function delete(ServerRequestInterface $request)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $id = Arr::get($request->getQueryParams(), 'id');

        $field = $this->fields->findOrFail($id);

        $this->fields->delete($field);
    }
}

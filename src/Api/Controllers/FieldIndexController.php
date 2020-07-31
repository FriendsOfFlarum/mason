<?php

namespace FoF\Mason\Api\Controllers;

use FoF\Mason\Api\Serializers\FieldSerializer;
use FoF\Mason\Repositories\FieldRepository;
use Flarum\Api\Controller\AbstractListController;
use Flarum\User\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class FieldIndexController extends AbstractListController
{
    use AssertPermissionTrait;

    public $serializer = FieldSerializer::class;

    public $include = [
        'all_answers',
    ];

    /**
     * @var FieldRepository
     */
    protected $fields;

    public function __construct(FieldRepository $fields)
    {
        $this->fields = $fields;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        return $this->fields->all();
    }
}

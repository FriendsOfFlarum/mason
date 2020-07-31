<?php

namespace FoF\Mason\Api\Controllers;

use FoF\Mason\Api\Serializers\FieldSerializer;
use FoF\Mason\Repositories\FieldRepository;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\User\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class FieldStoreController extends AbstractCreateController
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

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        return $this->fields->store($attributes);
    }
}

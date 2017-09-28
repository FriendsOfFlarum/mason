<?php

namespace Flagrow\Mason\Api\Controllers;

use Flagrow\Mason\Api\Serializers\FieldSerializer;
use Flagrow\Mason\Repositories\FieldRepository;
use Flagrow\Mason\Validators\OrderValidator;
use Flarum\Api\Controller\AbstractCollectionController;
use Flarum\Core\Access\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class FieldOrderController extends AbstractCollectionController
{
    use AssertPermissionTrait;

    public $serializer = FieldSerializer::class;

    /**
     * @var OrderValidator
     */
    protected $validator;

    /**
     * @var FieldRepository
     */
    protected $fields;

    public function __construct(OrderValidator $validator, FieldRepository $fields)
    {
        $this->validator = $validator;
        $this->fields = $fields;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $attributes = $request->getParsedBody();

        $this->validator->assertValid($attributes);

        $order = Arr::get($attributes, 'sort');

        $this->fields->sorting($order);

        // Return updated sorting values
        return $this->fields->all();
    }
}

<?php

namespace FoF\Mason\Api\Controllers;

use FoF\Mason\Api\Serializers\FieldSerializer;
use FoF\Mason\Repositories\FieldRepository;
use FoF\Mason\Validators\OrderValidator;
use Flarum\Api\Controller\AbstractListController;
use Flarum\User\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class FieldOrderController extends AbstractListController
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

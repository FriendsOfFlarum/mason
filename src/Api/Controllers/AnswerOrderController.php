<?php

namespace FoF\Mason\Api\Controllers;

use FoF\Mason\Api\Serializers\FieldSerializer;
use FoF\Mason\Repositories\AnswerRepository;
use FoF\Mason\Repositories\FieldRepository;
use FoF\Mason\Validators\OrderValidator;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\User\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class AnswerOrderController extends AbstractShowController
{
    use AssertPermissionTrait;

    public $serializer = FieldSerializer::class;

    public $include = [
        'all_answers',
    ];

    /**
     * @var OrderValidator
     */
    protected $validator;

    /**
     * @var AnswerRepository
     */
    protected $answers;

    /**
     * @var FieldRepository
     */
    protected $fields;

    public function __construct(OrderValidator $validator, AnswerRepository $answers, FieldRepository $fields)
    {
        $this->validator = $validator;
        $this->answers = $answers;
        $this->fields = $fields;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $attributes = $request->getParsedBody();

        $this->validator->assertValid($attributes);

        $order = Arr::get($attributes, 'sort');

        $this->answers->sorting($order);

        $fieldId = Arr::get($request->getQueryParams(), 'id');

        $field = $this->fields->findOrFail($fieldId);

        // Return updated sorting values
        // Return the field instead of individual answers as it's easier to update the store client-side
        return $field;
    }
}

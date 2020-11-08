<?php

namespace FoF\Mason\Api\Controllers;

use FoF\Mason\Api\Serializers\FieldSerializer;
use FoF\Mason\Repositories\AnswerRepository;
use FoF\Mason\Repositories\FieldRepository;
use FoF\Mason\Validators\OrderValidator;
use Flarum\Api\Controller\AbstractShowController;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class AnswerOrderController extends AbstractShowController
{
    public $serializer = FieldSerializer::class;

    public $include = [
        'all_answers',
    ];

    protected $validator;
    protected $answers;
    protected $fields;

    public function __construct(OrderValidator $validator, AnswerRepository $answers, FieldRepository $fields)
    {
        $this->validator = $validator;
        $this->answers = $answers;
        $this->fields = $fields;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $request->getAttribute('actor')->assertAdmin();

        $attributes = $request->getParsedBody();

        $this->validator->assertValid($attributes);

        $order = Arr::get($attributes, 'sort');

        $this->answers->sorting($order);

        $fieldId = Arr::get($request->getQueryParams(), 'id');

        // Return updated sorting values
        // Return the field instead of individual answers as it's easier to update the store client-side
        return $this->fields->findOrFail($fieldId);
    }
}

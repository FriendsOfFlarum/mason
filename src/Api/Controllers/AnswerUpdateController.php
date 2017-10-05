<?php

namespace Flagrow\Mason\Api\Controllers;

use Flagrow\Mason\Api\Serializers\AnswerSerializer;
use Flagrow\Mason\Repositories\AnswerRepository;
use Flagrow\Mason\Repositories\FieldRepository;
use Flarum\Api\Controller\AbstractResourceController;
use Flarum\Core\Access\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class AnswerUpdateController extends AbstractResourceController
{
    use AssertPermissionTrait;

    public $serializer = AnswerSerializer::class;

    /**
     * @var FieldRepository
     */
    protected $answers;

    public function __construct(AnswerRepository $answers)
    {
        $this->answers = $answers;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $id = Arr::get($request->getQueryParams(), 'id');

        $answer = $this->answers->findOrFail($id);

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        return $this->answers->update($answer, $attributes);
    }
}

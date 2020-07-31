<?php

namespace FoF\Mason\Api\Controllers;

use FoF\Mason\Repositories\AnswerRepository;
use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\User\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class AnswerDeleteController extends AbstractDeleteController
{
    use AssertPermissionTrait;

    /**
     * @var AnswerRepository
     */
    protected $answers;

    public function __construct(AnswerRepository $answers)
    {
        $this->answers = $answers;
    }

    protected function delete(ServerRequestInterface $request)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $id = Arr::get($request->getQueryParams(), 'id');

        $field = $this->answers->findOrFail($id);

        $this->answers->delete($field);
    }
}

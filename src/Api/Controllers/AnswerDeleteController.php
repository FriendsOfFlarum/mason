<?php

namespace FoF\Mason\Api\Controllers;

use FoF\Mason\Repositories\AnswerRepository;
use Flarum\Api\Controller\AbstractDeleteController;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class AnswerDeleteController extends AbstractDeleteController
{
    protected $answers;

    public function __construct(AnswerRepository $answers)
    {
        $this->answers = $answers;
    }

    protected function delete(ServerRequestInterface $request)
    {
        $request->getAttribute('actor')->assertAdmin();

        $id = Arr::get($request->getQueryParams(), 'id');

        $field = $this->answers->findOrFail($id);

        $this->answers->delete($field);
    }
}

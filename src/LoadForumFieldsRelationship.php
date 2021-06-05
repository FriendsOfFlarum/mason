<?php

namespace FoF\Mason;

use Flarum\Api\Controller\ShowForumController;
use Flarum\User\User;
use FoF\Mason\Repositories\FieldRepository;
use Psr\Http\Message\ServerRequestInterface;

class LoadForumFieldsRelationship
{
    public function __invoke(ShowForumController $controller, &$data, ServerRequestInterface $request)
    {
        /**
         * @var User $actor
         */
        $actor = $request->getAttribute('actor');

        /**
         * @var FieldRepository $fields
         */
        $fields = resolve(FieldRepository::class);

        // Fields need to be pre-loaded for the discussion composer, and also to be able to show empty fields on discussions
        // We first try the permissions the users are most likely to have
        if ($actor->can('fof-mason.see-other-fields') || $actor->can('fof-mason.fill-fields') || $actor->can('fof-mason.see-own-fields')) {
            $data['masonFields'] = $fields->all();
        } else {
            // Fill empty set. Without this, installs with visible notices will get "Undefined index: masonFields"
            $data['masonFields'] = [];
        }
    }
}

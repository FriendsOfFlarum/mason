<?php

namespace Flagrow\Mason\Listeners;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class InjectSettings
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiAttributes::class, [$this, 'permissions']);
    }

    public function permissions(PrepareApiAttributes $event)
    {
        if ($event->serializer instanceof ForumSerializer) {
            $event->attributes['flagrow.mason.column-count'] = (int) $this->settings->get('flagrow.mason.column-count', 1);
            $event->attributes['flagrow.mason.tags-as-fields'] = (bool) $this->settings->get('flagrow.mason.tags-as-fields', false);
            $event->attributes['flagrow.mason.tags-field-name'] = $this->settings->get('flagrow.mason.tags-field-name', '');
        }
    }
}

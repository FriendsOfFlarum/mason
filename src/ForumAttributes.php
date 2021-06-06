<?php


namespace FoF\Mason;


use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class ForumAttributes
{
    public function __invoke(ForumSerializer $serializer): array
    {
        /**
         * @var $settings SettingsRepositoryInterface
         */
        $settings = resolve(SettingsRepositoryInterface::class);

        $actor = $serializer->getActor();

        $canFill = $actor->can('fof-mason.fill-fields');
        $canSeeSome = $actor->can('fof-mason.see-other-fields') || $actor->can('fof-mason.see-own-fields');

        $attributes = [
            'canFillMasonFields' => $canFill,
        ];

        if ($canFill || $canSeeSome) {
            $attributes['fof-mason.fields-section-title'] = $settings->get('fof-mason.fields-section-title', '');
            $attributes['fof-mason.column-count'] = (int)$settings->get('fof-mason.column-count', 1);
        }

        if ($canFill) {
            $attributes['fof-mason.labels-as-placeholders'] = (bool)$settings->get('fof-mason.labels-as-placeholders', false);
            $attributes['fof-mason.tags-as-fields'] = (bool)$settings->get('fof-mason.tags-as-fields', false);
            $attributes['fof-mason.tags-field-name'] = $settings->get('fof-mason.tags-field-name', '');
        }

        if ($canSeeSome) {
            $attributes['fof-mason.fields-in-hero'] = (bool)$settings->get('fof-mason.fields-in-hero', false);
            $attributes['fof-mason.hide-empty-fields-section'] = (bool)$settings->get('fof-mason.hide-empty-fields-section', false);
        }

        return $attributes;
    }
}

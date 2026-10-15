import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';
import commonExtend from '../common/extend';
import MasonPage from './components/MasonPage';

export default [
  ...commonExtend,

  new Extend.Admin() //
    .page(MasonPage)
    .customSetting(() => <h3 className="ExtensionPage-subHeader">{app.translator.trans('fof-mason.admin.titles.settings')}</h3>, 100)
    .setting(
      () => ({
        setting: 'fof-mason.fields-section-title',
        type: 'text',
        label: app.translator.trans('fof-mason.admin.settings.fields-section-title'),
        help: app.translator.trans('fof-mason.admin.settings.fields-section-title-help'),
        placeholder: app.translator.trans('fof-mason.admin.settings.fields-section-title-placeholder', {}, true),
      }),
      70
    )
    .setting(
      () => ({
        setting: 'fof-mason.column-count',
        type: 'select',
        label: app.translator.trans('fof-mason.admin.settings.column-count'),
        options: Object.fromEntries(
          [1, 2, 3].map((count) => [String(count), app.translator.trans('fof-mason.admin.settings.n-columns', { count }, true)])
        ),
        default: '1',
      }),
      60
    )
    .setting(
      () => ({
        setting: 'fof-mason.fields-in-hero',
        type: 'switch',
        label: app.translator.trans('fof-mason.admin.settings.fields-in-hero'),
      }),
      50
    )
    .setting(
      () => ({
        setting: 'fof-mason.hide-empty-fields-section',
        type: 'switch',
        label: app.translator.trans('fof-mason.admin.settings.hide-empty-fields-section'),
        help: app.translator.trans('fof-mason.admin.settings.hide-empty-fields-section-help'),
      }),
      40
    )
    .setting(
      () => ({
        setting: 'fof-mason.labels-as-placeholders',
        type: 'switch',
        label: app.translator.trans('fof-mason.admin.settings.labels-as-placeholders'),
        help: app.translator.trans('fof-mason.admin.settings.labels-as-placeholders-help'),
      }),
      30
    )
    .setting(
      () =>
        'flarum-tags' in flarum.extensions
          ? {
              setting: 'fof-mason.tags-as-fields',
              type: 'switch',
              label: app.translator.trans('fof-mason.admin.settings.tags-as-field'),
              help: app.translator.trans('fof-mason.admin.settings.tags-as-field-help'),
            }
          : null,
      20
    )
    .setting(
      () =>
        'flarum-tags' in flarum.extensions
          ? {
              setting: 'fof-mason.tags-field-name',
              type: 'text',
              label: app.translator.trans('fof-mason.admin.settings.tags-field-name'),
              placeholder: app.translator.trans('fof-mason.admin.settings.tags-field-name-placeholder', {}, true),
            }
          : null,
      10
    )
    .permission(
      () => ({
        icon: 'fas fa-eye',
        label: app.translator.trans('fof-mason.admin.permissions.see-own-fields'),
        permission: 'fof-mason.see-own-fields',
      }),
      'view'
    )
    .permission(
      () => ({
        icon: 'fas fa-eye',
        label: app.translator.trans('fof-mason.admin.permissions.see-other-fields'),
        permission: 'fof-mason.see-other-fields',
        allowGuest: true,
      }),
      'view'
    )
    .permission(
      () => ({
        icon: 'fas fa-clipboard-list',
        label: app.translator.trans('fof-mason.admin.permissions.fill-fields'),
        permission: 'fof-mason.fill-fields',
      }),
      'start'
    )
    .permission(
      () => ({
        icon: 'fas fa-edit',
        label: app.translator.trans('fof-mason.admin.permissions.update-own-fields'),
        permission: 'fof-mason.update-own-fields',
      }),
      'reply'
    )
    .permission(
      () => ({
        icon: 'fas fa-edit',
        label: app.translator.trans('fof-mason.admin.permissions.update-other-fields'),
        permission: 'fof-mason.update-other-fields',
      }),
      'moderate'
    )
    .permission(
      () => ({
        icon: 'fas fa-forward',
        label: app.translator.trans('fof-mason.admin.permissions.skip-required-fields'),
        permission: 'fof-mason.skip-required-fields',
      }),
      'moderate'
    ),
] satisfies object[];

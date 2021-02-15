import app from 'flarum/app';
import Answer from './../lib/models/Answer';
import Field from './../lib/models/Field';
import MasonFieldsPage from './pages/MasonFieldsPage';

app.initializers.add('fof-mason', () => {
    app.store.models['mason-fields'] = Field;
    app.store.models['mason-answers'] = Answer;

    app.extensionData
        .for('fof-mason')
        .registerPage(MasonFieldsPage)
        .registerPermission({
            icon: 'fas fa-eye',
            label: app.translator.trans('fof-mason.admin.permissions.see-own-fields'),
            permission: 'fof-mason.see-own-fields',
        }, 'view')
        .registerPermission({
            icon: 'fas fa-eye',
            label: app.translator.trans('fof-mason.admin.permissions.see-other-fields'),
            permission: 'fof-mason.see-other-fields',
            allowGuest: true,
        }, 'view')
        .registerPermission({
            icon: 'fas fa-tasks',
            label: app.translator.trans('fof-mason.admin.permissions.fill-fields'),
            permission: 'fof-mason.fill-fields',
        }, 'reply')
        .registerPermission({
            icon: 'fas fa-edit',
            label: app.translator.trans('fof-mason.admin.permissions.update-own-fields'),
            permission: 'fof-mason.update-own-fields',
        }, 'reply')
        .registerPermission({
            icon: 'fas fa-edit',
            label: app.translator.trans('fof-mason.admin.permissions.update-other-fields'),
            permission: 'fof-mason.update-other-fields',
            allowGuest: true,
        }, 'moderate')
        .registerPermission({
            icon: 'fas fa-forward',
            label: app.translator.trans('fof-mason.admin.permissions.skip-required-fields'),
            permission: 'fof-mason.skip-required-fields',
        }, 'moderate');
});

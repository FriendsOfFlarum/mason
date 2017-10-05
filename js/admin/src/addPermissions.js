import {extend} from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';

export default function () {
    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('flagrow-mason-update-own-fields', {
            icon: 'check-square',
            label: app.translator.trans('flagrow-mason.admin.permissions.update-own-fields'),
            permission: 'flagrow.mason.update-own-fields',
        });
    });

    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('flagrow-mason-update-other-fields', {
            icon: 'check-square',
            label: app.translator.trans('flagrow-mason.admin.permissions.update-other-fields'),
            permission: 'flagrow.mason.update-other-fields',
            allowGuest: true,
        });
    });
}

import {extend} from 'flarum/extend';
import app from 'flarum/app';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import MasonFieldsPage from './pages/MasonFieldsPage';

/* global m */

export default function () {
    app.routes['fof-mason-page'] = {
        path: '/mason',
        component: MasonFieldsPage,
    };

    app.extensionSettings['fof-mason'] = () => m.route.set(app.route('fof-mason-page'));

    extend(AdminNav.prototype, 'items', items => {
        items.add('fof-mason', AdminLinkButton.component({
            href: app.route('fof-mason-page'),
            icon: 'fas fa-dungeon',
            description: app.translator.trans('fof-mason.admin.menu.description'),
        }, app.translator.trans('fof-mason.admin.menu.title')));
    });
}

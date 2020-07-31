import {extend} from 'flarum/extend';
import app from 'flarum/app';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import MasonFieldsPane from './panes/MasonFieldsPane';

export default function () {
    // create the route
    app.routes['fof-mason-page'] = {
        path: '/mason',
        component: MasonFieldsPane.component(),
    };

    // bind the route we created to the three dots settings button
    app.extensionSettings['fof-mason'] = () => m.route(app.route('fof-mason-page'));

    extend(AdminNav.prototype, 'items', items => {
        // add the Image Upload tab to the admin navigation menu
        items.add('fof-mason', AdminLinkButton.component({
            href: app.route('fof-mason-page'),
            icon: 'fas fa-dungeon',
            children: 'Mason',
            description: app.translator.trans('fof-mason.admin.menu.description'),
        }));
    });
}

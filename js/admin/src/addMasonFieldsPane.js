import {extend} from 'flarum/extend';
import app from 'flarum/app';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import MasonFieldsPane from 'flagrow/mason/panes/MasonFieldsPane';

export default function () {
    // create the route
    app.routes['flagrow-mason-fields'] = {
        path: '/flagrow/mason',
        component: MasonFieldsPane.component(),
    };

    // bind the route we created to the three dots settings button
    app.extensionSettings['flagrow-mason'] = () => m.route(app.route('flagrow-mason-fields'));

    extend(AdminNav.prototype, 'items', items => {
        // add the Image Upload tab to the admin navigation menu
        items.add('flagrow-mason-fields', AdminLinkButton.component({
            href: app.route('flagrow-mason-fields'),
            icon: 'id-card-o',
            children: 'Mason',
            description: app.translator.trans('flagrow-mason.admin.menu.description'),
        }));
    });
}

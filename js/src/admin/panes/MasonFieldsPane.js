import sortable from 'html5sortable/dist/html5sortable.es.js';

import app from 'flarum/app';
import Component from 'flarum/Component';
import FieldEdit from './../components/FieldEdit';
import sortByAttribute from './../../lib/helpers/sortByAttribute';
import MasonSettings from './../components/MasonSettings';

export default class MasonFieldsPane extends Component {
    init() {
        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/fof/mason/fields',
        }).then(result => {
            app.store.pushPayload(result);
            m.redraw();
        });
    }

    config() {
        sortable(this.element.querySelector('.js-fields-container'), {
            handle: '.js-field-handle',
        })[0].addEventListener('sortupdate', () => {
            const sorting = this.$('.js-field-data')
                .map(function () {
                    return $(this).data('id');
                })
                .get();

            this.updateSort(sorting);
        });
    }

    view() {
        const fields = app.store.all('mason-fields');

        let fieldsList = [];

        sortByAttribute(fields)
            .forEach(field => {
                // Build array of fields to show.
                fieldsList.push(m('.js-field-data', {
                    key: field.id(),
                    'data-id': field.id(),
                }, FieldEdit.component({
                    field,
                })));
            });

        return m('.container', [
            m('h2', app.translator.trans('fof-mason.admin.titles.fields')),
            m('.Mason-Container', [
                m('.js-fields-container', fieldsList),
                FieldEdit.component({
                    key: 'new',
                    field: null,
                }),
            ]),
            m('h2', app.translator.trans('fof-mason.admin.titles.settings')),
            MasonSettings.component(),
        ]);
    }

    updateSort(sorting) {
        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/fof/mason/fields/order',
            data: {
                sort: sorting,
            },
        }).then(result => {
            // Update sort attributes
            app.store.pushPayload(result);
            m.redraw();
        });
    }
}

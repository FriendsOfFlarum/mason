import sortable from 'html5sortable/dist/html5sortable.es.js';

import app from 'flarum/app';
import Page from 'flarum/components/Page';
import FieldEdit from './../components/FieldEdit';
import sortByAttribute from './../../lib/helpers/sortByAttribute';
import MasonSettings from './../components/MasonSettings';

/* global m, $ */

export default class MasonFieldsPage extends Page {
    oninit(vnode) {
        super.oninit(vnode);

        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/fof/mason/fields',
        }).then(result => {
            app.store.pushPayload(result);
            m.redraw();
        });
    }

    configSortable() {
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

    oncreate(vnode) {
        super.oncreate(vnode);

        this.configSortable();
    }

    onupdate() {
        this.configSortable();
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
            body: {
                sort: sorting,
            },
        }).then(result => {
            // Update sort attributes
            app.store.pushPayload(result);
            m.redraw();
        });
    }
}

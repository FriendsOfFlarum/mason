import app from 'flarum/app';
import Component from 'flarum/Component';
import FieldEdit from 'flagrow/mason/components/FieldEdit';

export default class MasonFieldsPane extends Component {
    init() {
        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/flagrow/mason/fields',
        }).then(result => {
            app.store.pushPayload(result);
            m.redraw();
        });
    }

    config() {
        this.$('.Existing--Fields')
            .sortable({
                handle: '.Field--Handle',
            })
            .on('sortupdate', () => {
                const sorting = this.$('.Existing--Fields > .Field')
                    .map(function () {
                        return $(this).data('id');
                    })
                    .get();

                this.updateSort(sorting);
            });
    }

    view() {
        const fields = app.store.all('flagrow-mason-field');

        let fieldsList = [];

        fields
            .sort((a, b) => a.sort() - b.sort())
            .forEach(field => {
                // Build array of fields to show.
                fieldsList.push(m('.Field', {
                    key: field.id(),
                    'data-id': field.id(),
                }, [
                    m('span.fa.fa-arrows.Field--Handle'),
                    FieldEdit.component({
                        field,
                    }),
                ]));
            });

        return m('.ProfileConfigurePane', [
            m('.container', [
                m('.Existing--Fields', fieldsList),
                FieldEdit.component({
                    //key: 'new',
                    field: null,
                }),
            ]),
        ]);
    }

    updateSort(sorting) {
        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/flagrow/mason/fields/order',
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

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

    view() {
        const fields = app.store.all('flagrow-mason-field');

        return m('.ProfileConfigurePane', [
            m('.container', [
                fields.map(
                    field => m('div', {
                        key: field.id(),
                    }, FieldEdit.component({
                        field,
                    }))
                ),
                FieldEdit.component({
                    //key: 'new',
                    field: null,
                }),
            ]),
        ]);
    }
}

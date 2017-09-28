import app from 'flarum/app';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import Switch from 'flarum/components/Switch';
import Field from 'flagrow/mason/models/Field';

export default class FieldEdit extends Component {
    init() {
        this.field = this.props.field;
        this.dirty = false;
        this.processing = false;
        this.toggleFields = false;

        if (this.field === null) {
            this.initNewField();
        }
    }

    initNewField() {
        this.field = new Field();

        this.field.pushAttributes({
            name: 'New field',
            description: '',
            min_answers_count: 0,
            max_answers_count: 1,
            user_values_allowed: false,
            validation: '',
            icon: '',
        });
    }

    view() {
        return m('form', [
            m('.Button.Button-block', {
                onclick: () => {
                    this.toggleFields = !this.toggleFields;
                },
            }, this.field.name() + ' - Show/hide'),
            (this.toggleFields ? this.viewFields() : null),
        ]);
    }

    viewFields() {
        return m('ul', [
            m('li', [
                m('label', app.translator.trans('flagrow-mason.admin.fields.name')),
                m('input.FormControl', {
                    value: this.field.name(),
                    oninput: m.withAttr('value', this.updateAttribute.bind(this, 'name')),
                }),
                m('span.helpText', app.translator.trans('flagrow-mason.admin.fields.name-help')),
            ]),
            m('li', [
                m('label', app.translator.trans('flagrow-mason.admin.fields.description')),
                m('input.FormControl', {
                    value: this.field.description(),
                    oninput: m.withAttr('value', this.updateAttribute.bind(this, 'description')),
                }),
                m('span.helpText', app.translator.trans('flagrow-mason.admin.fields.description-help')),
            ]),
            m('li', [
                m('label', app.translator.trans('flagrow-mason.admin.fields.min_answers_count')),
                m('input.FormControl', {
                    type: 'number',
                    min: 0,
                    value: this.field.min_answers_count(),
                    oninput: m.withAttr('value', this.updateAttribute.bind(this, 'min_answers_count')),
                }),
            ]),
            m('li', [
                m('label', app.translator.trans('flagrow-mason.admin.fields.max_answers_count')),
                m('input.FormControl', {
                    type: 'number',
                    min: 1,
                    value: this.field.max_answers_count(),
                    oninput: m.withAttr('value', this.updateAttribute.bind(this, 'max_answers_count')),
                }),
            ]),
            m('li', [
                m('label', [
                    Switch.component({
                        state: this.field.user_values_allowed(),
                        onchange: this.updateAttribute.bind(this, 'user_values_allowed'),
                        children: app.translator.trans('flagrow-mason.admin.fields.user_values_allowed'),
                    }),
                ]),
                m('span.helpText', app.translator.trans('flagrow-mason.admin.fields.user_values_allowed-help')),
            ]),
            m('li', [
                m('label', app.translator.trans('flagrow-mason.admin.fields.validation')),
                m('input.FormControl', {
                    value: this.field.validation(),
                    oninput: m.withAttr('value', this.updateAttribute.bind(this, 'validation')),
                }),
                m('span.helpText', app.translator.trans('flagrow-mason.admin.fields.validation-help', {
                    a: m('a[href=https://laravel.com/docs/5.1/validation#available-validation-rules][_target=blank]'),
                })),
            ]),
            m('li', [
                m('label', app.translator.trans('flagrow-mason.admin.fields.icon')),
                m('input.FormControl', {
                    value: this.field.icon(),
                    oninput: m.withAttr('value', this.updateAttribute.bind(this, 'icon')),
                }),
                m('span.helpText', app.translator.trans('flagrow-mason.admin.fields.icon-help', {
                    a: m('a[href=http://fontawesome.io/icons/][_target=blank]'),
                })),
            ]),
            m('li.ButtonGroup', [
                Button.component({
                    type: 'submit',
                    className: 'Button Button--primary',
                    children: app.translator.trans('flagrow-mason.admin.buttons.' + (this.field.exists ? 'edit' : 'add') + '-field'),
                    loading: this.processing,
                    disabled: !this.readyToSave(),
                    onclick: this.saveField.bind(this),
                }),
                (this.field.exists ? Button.component({
                    type: 'submit',
                    className: 'Button Button--danger',
                    children: app.translator.trans('flagrow-mason.admin.buttons.delete-field'),
                    loading: this.processing,
                    onclick: this.deleteField.bind(this),
                }) : '')
            ])
        ]);
    }

    updateAttribute(attribute, value) {
        this.field.pushAttributes({
            [attribute]: value,
        });

        this.dirty = true;
    }

    readyToSave() {
        // TODO: check required fields
        return this.dirty;
    }

    saveField() {
        this.processing = true;

        const createNewRecord = !this.field.exists;

        app.request({
            method: createNewRecord ? 'POST' : 'PATCH',
            url: this.field.apiEndpoint(),
            data: this.field.data,
        }).then(result => {
            app.store.pushPayload(result);

            if (createNewRecord) {
                this.initNewField();
            }

            this.processing = false;
            this.dirty = false;
            m.redraw();
        });
    }

    deleteField() {
        this.processing = true;

        app.request({
            method: 'DELETE',
            url: this.field.apiEndpoint(),
        }).then(() => {
            app.store.remove(this.field);

            this.processing = false;
            m.redraw();
        });
    }
}

import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import Switch from 'flarum/components/Switch';
import Field from 'flagrow/mason/models/Field';
import FieldAnswersEdit from 'flagrow/mason/components/FieldAnswersEdit';

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
            show_when_empty: false,
            validation: '',
            icon: '',
        });
    }

    view() {
        return m('.Mason-Box', [
            (this.field.exists ? m('span.fa.fa-arrows.Mason-Box--handle.js-field-handle') : null),
            m('.Button.Button--block.Mason-Box-Header', {
                onclick: () => {
                    this.toggleFields = !this.toggleFields;
                },
            }, [
                m('.Mason-Box-Header-Title', this.field.name()),
                m('div', [
                    app.translator.trans('flagrow-mason.admin.buttons.edit-field'),
                    ' ',
                    icon(this.toggleFields ? 'chevron-up' : 'chevron-down'),
                ]),
            ]),
            (this.toggleFields ? this.viewFields() : null),
        ]);
    }

    viewFields() {
        return m('form', [
            m('.Mason-Box--row', [
                m('.Mason-Box--column', [
                    m('h4', 'Field settings'),
                    m('.Form-group', [
                        m('label', app.translator.trans('flagrow-mason.admin.fields.name')),
                        m('input.FormControl', {
                            value: this.field.name(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'name')),
                        }),
                        m('.helpText', app.translator.trans('flagrow-mason.admin.fields.name-help')),
                    ]),
                    m('.Form-group', [
                        m('label', app.translator.trans('flagrow-mason.admin.fields.description')),
                        m('input.FormControl', {
                            value: this.field.description(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'description')),
                        }),
                        m('.helpText', app.translator.trans('flagrow-mason.admin.fields.description-help')),
                    ]),
                    m('.Form-group', [
                        m('label', app.translator.trans('flagrow-mason.admin.fields.min_answers_count')),
                        m('input.FormControl', {
                            type: 'number',
                            min: 0,
                            max: 1, // TODO: remove when multiple answers is ready
                            value: this.field.min_answers_count(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'min_answers_count')),
                        }),
                    ]),
                    m('.Form-group', [
                        m('label', app.translator.trans('flagrow-mason.admin.fields.max_answers_count')),
                        m('input.FormControl', {
                            type: 'number',
                            min: 1,
                            disabled: true, // TODO: remove when multiple answers is ready
                            value: this.field.max_answers_count(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'max_answers_count')),
                        }),
                    ]),
                    m('.Form-group', [
                        m('label', [
                            Switch.component({
                                state: this.field.show_when_empty(),
                                onchange: this.updateAttribute.bind(this, 'show_when_empty'),
                                children: app.translator.trans('flagrow-mason.admin.fields.show_when_empty'),
                            }),
                        ]),
                        m('.helpText', app.translator.trans('flagrow-mason.admin.fields.show_when_empty-help')),
                    ]),
                    m('.Form-group', [
                        m('label', [
                            Switch.component({
                                disabled: true, // TODO: remove when user answers is ready
                                state: this.field.user_values_allowed(),
                                onchange: this.updateAttribute.bind(this, 'user_values_allowed'),
                                children: app.translator.trans('flagrow-mason.admin.fields.user_values_allowed'),
                            }),
                        ]),
                        m('.helpText', app.translator.trans('flagrow-mason.admin.fields.user_values_allowed-help')),
                    ]),
                    m('.Form-group', [
                        m('label', app.translator.trans('flagrow-mason.admin.fields.validation')),
                        m('input.FormControl', {
                            disabled: true, // TODO: remove when user answers is ready
                            value: this.field.validation(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'validation')),
                        }),
                        m('.helpText', app.translator.trans('flagrow-mason.admin.fields.validation-help', {
                            a: m('a[href=https://laravel.com/docs/5.1/validation#available-validation-rules][_target=blank]'),
                        })),
                    ]),
                    m('.Form-group', [
                        m('label', [
                            app.translator.trans('flagrow-mason.admin.fields.icon'),
                            this.iconPreview(this.field.icon()),
                        ]),
                        m('input.FormControl', {
                            value: this.field.icon(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'icon')),
                        }),
                        m('.helpText', app.translator.trans('flagrow-mason.admin.fields.icon-help', {
                            a: m('a[href=http://fontawesome.io/icons/][_target=blank]'),
                        })),
                    ]),
                ]),
                m('.Mason-Box--column', [
                    m('h4', 'Field answers'),
                    m('.Form-group', FieldAnswersEdit.component({
                        field: this.field,
                    })),
                ]),
            ]),
            m('li.ButtonGroup', [
                Button.component({
                    type: 'submit',
                    className: 'Button Button--primary',
                    children: app.translator.trans('flagrow-mason.admin.buttons.' + (this.field.exists ? 'save' : 'add') + '-field'),
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
                }) : ''),
            ]),
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
        if (!confirm(app.translator.trans('flagrow-mason.admin.messages.delete-field-confirmation', {
                name: this.field.name(),
            }))) {
            return;
        }

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

    iconPreview(value) {
        if (!value) {
            return '';
        }

        return [
            ' (',
            app.translator.trans('flagrow-mason.admin.fields.icon-preview', {
                preview: icon(value),
            }),
            ')',
        ];
    }
}

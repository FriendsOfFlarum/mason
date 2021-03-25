import app from 'flarum/admin/app';
import icon from 'flarum/common/helpers/icon';
import extractText from 'flarum/common/utils/extractText';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';
import FieldAnswersEdit from './FieldAnswersEdit';

/* global m */

export default class FieldEdit extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.field = this.attrs.field;
        this.dirty = false;
        this.processing = false;
        this.toggleFields = false;

        if (this.field === null) {
            this.initNewField();
        }
    }

    initNewField() {
        this.field = app.store.createRecord('mason-fields', {
            attributes: {
                name: '',
                description: '',
                min_answers_count: 0,
                max_answers_count: 1, // Currently not visible in the editor
                user_values_allowed: false,
                show_when_empty: false,
                validation: '',
                icon: '',
            },
        });
    }

    boxTitle() {
        if (this.field.exists) {
            return this.field.name();
        }

        return app.translator.trans('fof-mason.admin.buttons.new-field');
    }

    view() {
        return m('.Mason-Box', [
            (this.field.exists ? m('span.fas.fa-arrows-alt.Mason-Box--handle.js-field-handle') : null),
            m('.Button.Button--block.Mason-Box-Header', {
                onclick: () => {
                    this.toggleFields = !this.toggleFields;
                },
            }, [
                m('.Mason-Box-Header-Title', this.boxTitle()),
                m('div', [
                    (this.field.exists ? [
                        app.translator.trans('fof-mason.admin.buttons.edit-field'),
                        ' ',
                    ] : null),
                    icon('fas fa-chevron-' + (this.toggleFields ? 'up' : 'down')),
                ]),
            ]),
            (this.toggleFields ? this.viewFields() : null),
        ]);
    }

    viewFields() {
        return [
            m('.Mason-Box--row', [
                m('.Mason-Box--column', [
                    m('h4', app.translator.trans('fof-mason.admin.titles.field-settings')),
                    m('.Form-group', [
                        m('label', app.translator.trans('fof-mason.admin.fields.name')),
                        m('input.FormControl', {
                            value: this.field.name(),
                            oninput: event => {
                                this.updateAttribute('name', event.target.value);
                            },
                        }),
                        m('.helpText', app.translator.trans('fof-mason.admin.fields.name-help')),
                    ]),
                    m('.Form-group', [
                        m('label', app.translator.trans('fof-mason.admin.fields.description')),
                        m('input.FormControl', {
                            value: this.field.description(),
                            oninput: event => {
                                this.updateAttribute('description', event.target.value);
                            },
                        }),
                        m('.helpText', app.translator.trans('fof-mason.admin.fields.description-help')),
                    ]),
                    m('.Form-group', [
                        m('label', [
                            // multi-answers were never implemented so min_answers_count just switches between 0 and 1 for optional and required
                            Switch.component({
                                state: this.field.min_answers_count() === 1,
                                onchange: value => {
                                    this.updateAttribute('min_answers_count', value ? 1 : 0);
                                },
                            }, app.translator.trans('fof-mason.admin.fields.required')),
                        ]),
                    ]),
                    m('.Form-group', [
                        m('label', [
                            Switch.component({
                                state: this.field.show_when_empty(),
                                onchange: this.updateAttribute.bind(this, 'show_when_empty'),
                            }, app.translator.trans('fof-mason.admin.fields.show_when_empty')),
                        ]),
                        m('.helpText', app.translator.trans('fof-mason.admin.fields.show_when_empty-help')),
                    ]),
                    m('.Form-group', [
                        m('label', [
                            Switch.component({
                                state: this.field.user_values_allowed(),
                                onchange: this.updateAttribute.bind(this, 'user_values_allowed'),
                            }, app.translator.trans('fof-mason.admin.fields.user_values_allowed')),
                        ]),
                        m('.helpText', app.translator.trans('fof-mason.admin.fields.user_values_allowed-help')),
                    ]),
                    m('.Form-group', [
                        m('label', app.translator.trans('fof-mason.admin.fields.validation')),
                        m('input.FormControl', {
                            disabled: !this.field.user_values_allowed(),
                            placeholder: this.field.user_values_allowed() ? '' : app.translator.trans('fof-mason.admin.fields.enable-user-values-for-validation'),
                            value: this.field.validation(),
                            oninput: event => {
                                this.updateAttribute('validation', event.target.value);
                            },
                        }),
                        m('.helpText', app.translator.trans('fof-mason.admin.fields.validation-help', {
                            a: m('a', {
                                href: 'https://laravel.com/docs/6.x/validation#available-validation-rules',
                                target: '_blank',
                            }),
                        })),
                    ]),
                    m('.Form-group', [
                        m('label', [
                            app.translator.trans('fof-mason.admin.fields.icon'),
                            this.iconPreview(this.field.icon()),
                        ]),
                        m('input.FormControl', {
                            value: this.field.icon(),
                            oninput: event => {
                                this.updateAttribute('icon', event.target.value);
                            },
                        }),
                        m('.helpText', app.translator.trans('fof-mason.admin.fields.icon-help', {
                            a: m('a', {
                                href: 'https://fontawesome.com/icons?m=free',
                                target: '_blank',
                            }),
                        })),
                    ]),
                ]),
                m('.Mason-Box--column', [
                    m('h4', app.translator.trans('fof-mason.admin.titles.field-answers')),
                    m('.Form-group', FieldAnswersEdit.component({
                        field: this.field,
                    })),
                ]),
            ]),
            m('.ButtonGroup', [
                Button.component({
                    className: 'Button Button--primary',
                    loading: this.processing,
                    disabled: !this.readyToSave(),
                    onclick: this.saveField.bind(this),
                }, app.translator.trans('fof-mason.admin.buttons.' + (this.field.exists ? 'save' : 'add') + '-field')),
                (this.field.exists ? Button.component({
                    className: 'Button Button--danger',
                    loading: this.processing,
                    onclick: this.deleteField.bind(this),
                }, app.translator.trans('fof-mason.admin.buttons.delete-field')) : ''),
            ]),
        ];
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

        this.field.save(this.field.data.attributes).then(() => {
            if (createNewRecord) {
                this.initNewField();
                this.toggleFields = false;
            }

            this.processing = false;
            this.dirty = false;

            m.redraw();
        }).catch(err => {
            this.processing = false;

            throw err;
        });
    }

    deleteField() {
        if (!confirm(extractText(app.translator.trans('fof-mason.admin.messages.delete-field-confirmation', {
            name: this.field.name(),
        })))) {
            return;
        }

        this.processing = true;

        this.field.delete().then(() => {
            this.processing = false;

            m.redraw();
        }).catch(err => {
            this.processing = false;

            throw err;
        });
    }

    iconPreview(value) {
        if (!value) {
            return '';
        }

        return [
            ' (',
            app.translator.trans('fof-mason.admin.fields.icon-preview', {
                preview: icon(value),
            }),
            ')',
        ];
    }
}

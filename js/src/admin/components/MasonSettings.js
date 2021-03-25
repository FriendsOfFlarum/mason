import app from 'flarum/admin/app';
import saveSettings from "flarum/admin/utils/saveSettings";
import Component from 'flarum/common/Component';
import Select from 'flarum/common/components/Select';
import Switch from 'flarum/common/components/Switch';

/* global m */

export default class MasonSettings extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.fieldsSectionTitle = app.data.settings['fof-mason.fields-section-title'] || '';
        this.columnCount = app.data.settings['fof-mason.column-count'] || 1;
        this.labelsAsPlaceholders = app.data.settings['fof-mason.labels-as-placeholders'] > 0;
        this.fieldsInHero = app.data.settings['fof-mason.fields-in-hero'] > 0;
        this.hideEmptyFieldsSection = app.data.settings['fof-mason.hide-empty-fields-section'] > 0;
        this.tagsAsFields = app.data.settings['fof-mason.tags-as-fields'] > 0;
        this.tagsFieldName = app.data.settings['fof-mason.tags-field-name'] || '';

        this.columnOptions = {};

        for (let i = 1; i <= 3; i++) {
            this.columnOptions[i] = app.translator.trans('fof-mason.admin.settings.n-columns', {count: i});
        }
    }

    view() {
        return m('.Mason-Container', [
            m('.Form-group', [
                m('label', app.translator.trans('fof-mason.admin.settings.fields-section-title')),
                m('input.FormControl', {
                    value: this.fieldsSectionTitle,
                    placeholder: app.translator.trans('fof-mason.admin.settings.fields-section-title-placeholder'),
                    onchange: event => {
                        this.updateSetting('fieldsSectionTitle', 'fof-mason.fields-section-title', event.target.value);
                    },
                }),
                m('.helpText', app.translator.trans('fof-mason.admin.settings.fields-section-title-help')),
            ]),
            m('.Form-group', [
                m('label', app.translator.trans('fof-mason.admin.settings.column-count')),
                Select.component({
                    options: this.columnOptions,
                    value: this.columnCount,
                    onchange: this.updateSetting.bind(this, 'columnCount', 'fof-mason.column-count'),
                }),
            ]),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.labelsAsPlaceholders,
                    onchange: this.updateSetting.bind(this, 'labelsAsPlaceholders', 'fof-mason.labels-as-placeholders'),
                }, app.translator.trans('fof-mason.admin.settings.labels-as-placeholders'))),
                m('.helpText', app.translator.trans('fof-mason.admin.settings.labels-as-placeholders-help')),
            ]),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.fieldsInHero,
                    onchange: this.updateSetting.bind(this, 'fieldsInHero', 'fof-mason.fields-in-hero'),
                }, app.translator.trans('fof-mason.admin.settings.fields-in-hero'))),
            ]),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.hideEmptyFieldsSection,
                    onchange: this.updateSetting.bind(this, 'hideEmptyFieldsSection', 'fof-mason.hide-empty-fields-section'),
                }, app.translator.trans('fof-mason.admin.settings.hide-empty-fields-section'))),
                m('.helpText', app.translator.trans('fof-mason.admin.settings.hide-empty-fields-section-help')),
            ]),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.tagsAsFields,
                    onchange: this.updateSetting.bind(this, 'tagsAsFields', 'fof-mason.tags-as-fields'),
                }, app.translator.trans('fof-mason.admin.settings.tags-as-field'))),
                m('.helpText', app.translator.trans('fof-mason.admin.settings.tags-as-field-help')),
            ]),
            (this.tagsAsFields ? m('.Form-group', [
                m('label', app.translator.trans('fof-mason.admin.settings.tags-field-name')),
                m('input.FormControl', {
                    value: this.tagsFieldName,
                    placeholder: app.translator.trans('fof-mason.admin.settings.tags-field-name-placeholder'),
                    onchange: event => {
                        this.updateSetting('tagsFieldName', 'fof-mason.tags-field-name', event.target.value);
                    },
                }),
            ]) : null),
        ]);
    }

    /**
     * Updates setting in database.
     * @param attribute
     * @param setting
     * @param value
     */
    updateSetting(attribute, setting, value) {
        saveSettings({
            [setting]: value,
        });

        this[attribute] = value;
    }
}

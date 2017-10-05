import app from 'flarum/app';
import saveSettings from "flarum/utils/saveSettings";
import Component from 'flarum/Component';
import Select from 'flarum/components/Select';
import Switch from 'flarum/components/Switch';

export default class MasonSettings extends Component {
    init() {
        this.columnCount = m.prop(app.data.settings['flagrow.mason.column-count'] || 1);
        this.tagsAsFields = m.prop(app.data.settings['flagrow.mason.tags-as-fields'] > 0);
        this.tagsFieldName = m.prop(app.data.settings['flagrow.mason.tags-field-name'] || '');

        this.columnOptions = {};

        for (let i = 1; i <= 3; i++) {
            this.columnOptions[i] = app.translator.trans('flagrow-mason.admin.settings.n-columns', {count: i});
        }
    }

    view() {
        return m('.Mason-Container', [
            m('.Form-group', [
                m('label', app.translator.trans('flagrow-mason.admin.settings.column-count')),
                Select.component({
                    options: this.columnOptions,
                    value: this.columnCount(),
                    onchange: this.updateSetting.bind(this, this.columnCount, 'flagrow.mason.column-count'),
                }),
            ]),
            m('.Form-group', [
                m('label', Switch.component({
                    state: this.tagsAsFields(),
                    onchange: this.updateSetting.bind(this, this.tagsAsFields, 'flagrow.mason.tags-as-fields'),
                    children: app.translator.trans('flagrow-mason.admin.settings.tags-as-field'),
                })),
                m('.helpText', app.translator.trans('flagrow-mason.admin.settings.tags-as-field-help')),
            ]),
            (this.tagsAsFields() ? m('.Form-group', [
                m('label', app.translator.trans('flagrow-mason.admin.settings.tags-field-name')),
                m('input.FormControl', {
                    value: this.tagsFieldName(),
                    placeholder: app.translator.trans('flagrow-mason.admin.settings.tags-field-name-placeholder'),
                    onchange: m.withAttr('value', this.updateSetting.bind(this, this.tagsFieldName, 'flagrow.mason.tags-field-name')),
                }),
            ]) : null),
        ]);
    }

    /**
     * Updates setting in database.
     * @param prop
     * @param setting
     * @param value
     */
    updateSetting(prop, setting, value) {
        saveSettings({
            [setting]: value
        });

        prop(value)
    }
}

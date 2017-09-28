'use strict';

System.register('flagrow/mason/addMasonFieldsPane', ['flarum/extend', 'flarum/app', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'flagrow/mason/panes/MasonFieldsPane'], function (_export, _context) {
    "use strict";

    var extend, app, AdminNav, AdminLinkButton, MasonFieldsPane;

    _export('default', function () {
        // create the route
        app.routes['flagrow-mason-fields'] = {
            path: '/flagrow/mason',
            component: MasonFieldsPane.component()
        };

        // bind the route we created to the three dots settings button
        app.extensionSettings['flagrow-mason'] = function () {
            return m.route(app.route('flagrow-mason-fields'));
        };

        extend(AdminNav.prototype, 'items', function (items) {
            // add the Image Upload tab to the admin navigation menu
            items.add('flagrow-mason-fields', AdminLinkButton.component({
                href: app.route('flagrow-mason-fields'),
                icon: 'id-card-o',
                children: 'Mason',
                description: app.translator.trans('flagrow-mason.admin.menu.description')
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav.default;
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton.default;
        }, function (_flagrowMasonPanesMasonFieldsPane) {
            MasonFieldsPane = _flagrowMasonPanesMasonFieldsPane.default;
        }],
        execute: function () {}
    };
});;
"use strict";

System.register("flagrow/mason/addProfileConfigurePane", ["flarum/extend", "flarum/components/AdminNav", "flarum/components/AdminLinkButton", "flagrow/masquerade/panes/ProfileConfigurePane"], function (_export, _context) {
    "use strict";

    var extend, AdminNav, AdminLinkButton, ProfileConfigurePane;

    _export("default", function () {
        // create the route
        app.routes['flagrow-masquerade-configure-profile'] = { path: '/flagrow/masquerade/configure', component: ProfileConfigurePane.component() };

        // bind the route we created to the three dots settings button
        app.extensionSettings['flagrow-masquerade'] = function () {
            return m.route(app.route('flagrow-masquerade-configure-profile'));
        };

        extend(AdminNav.prototype, 'items', function (items) {
            // add the Image Upload tab to the admin navigation menu
            items.add('flagrow-masquerade-configure-profile', AdminLinkButton.component({
                href: app.route('flagrow-masquerade-configure-profile'),
                icon: 'id-card-o',
                children: 'Masquerade',
                description: app.translator.trans('flagrow-masquerade.admin.menu.description')
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav.default;
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton.default;
        }, function (_flagrowMasqueradePanesProfileConfigurePane) {
            ProfileConfigurePane = _flagrowMasqueradePanesProfileConfigurePane.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/mason/components/FieldEdit', ['flarum/app', 'flarum/Component', 'flarum/components/Button', 'flarum/components/Switch', 'flagrow/mason/models/Field'], function (_export, _context) {
    "use strict";

    var app, Component, Button, Switch, Field, FieldEdit;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }, function (_flagrowMasonModelsField) {
            Field = _flagrowMasonModelsField.default;
        }],
        execute: function () {
            FieldEdit = function (_Component) {
                babelHelpers.inherits(FieldEdit, _Component);

                function FieldEdit() {
                    babelHelpers.classCallCheck(this, FieldEdit);
                    return babelHelpers.possibleConstructorReturn(this, (FieldEdit.__proto__ || Object.getPrototypeOf(FieldEdit)).apply(this, arguments));
                }

                babelHelpers.createClass(FieldEdit, [{
                    key: 'init',
                    value: function init() {
                        this.field = this.props.field;
                        this.dirty = false;
                        this.processing = false;
                        this.toggleFields = false;

                        if (this.field === null) {
                            this.initNewField();
                        }
                    }
                }, {
                    key: 'initNewField',
                    value: function initNewField() {
                        this.field = new Field();

                        this.field.pushAttributes({
                            name: 'New field',
                            description: '',
                            min_answers_count: 0,
                            max_answers_count: 1,
                            user_values_allowed: false,
                            validation: '',
                            icon: ''
                        });
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this2 = this;

                        return m('form', [m('.Button.Button-block', {
                            onclick: function onclick() {
                                _this2.toggleFields = !_this2.toggleFields;
                            }
                        }, this.field.name() + ' - Show/hide'), this.toggleFields ? this.viewFields() : null]);
                    }
                }, {
                    key: 'viewFields',
                    value: function viewFields() {
                        return m('ul', [m('li', [m('label', app.translator.trans('flagrow-mason.admin.fields.name')), m('input.FormControl', {
                            value: this.field.name(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'name'))
                        }), m('span.helpText', app.translator.trans('flagrow-mason.admin.fields.name-help'))]), m('li', [m('label', app.translator.trans('flagrow-mason.admin.fields.description')), m('input.FormControl', {
                            value: this.field.description(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'description'))
                        }), m('span.helpText', app.translator.trans('flagrow-mason.admin.fields.description-help'))]), m('li', [m('label', app.translator.trans('flagrow-mason.admin.fields.min_answers_count')), m('input.FormControl', {
                            type: 'number',
                            min: 0,
                            value: this.field.min_answers_count(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'min_answers_count'))
                        })]), m('li', [m('label', app.translator.trans('flagrow-mason.admin.fields.max_answers_count')), m('input.FormControl', {
                            type: 'number',
                            min: 1,
                            value: this.field.max_answers_count(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'max_answers_count'))
                        })]), m('li', [m('label', [Switch.component({
                            state: this.field.user_values_allowed(),
                            onchange: this.updateAttribute.bind(this, 'user_values_allowed'),
                            children: app.translator.trans('flagrow-mason.admin.fields.user_values_allowed')
                        })]), m('span.helpText', app.translator.trans('flagrow-mason.admin.fields.user_values_allowed-help'))]), m('li', [m('label', app.translator.trans('flagrow-mason.admin.fields.validation')), m('input.FormControl', {
                            value: this.field.validation(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'validation'))
                        }), m('span.helpText', app.translator.trans('flagrow-mason.admin.fields.validation-help', {
                            a: m('a[href=https://laravel.com/docs/5.1/validation#available-validation-rules][_target=blank]')
                        }))]), m('li', [m('label', app.translator.trans('flagrow-mason.admin.fields.icon')), m('input.FormControl', {
                            value: this.field.icon(),
                            oninput: m.withAttr('value', this.updateAttribute.bind(this, 'icon'))
                        }), m('span.helpText', app.translator.trans('flagrow-mason.admin.fields.icon-help', {
                            a: m('a[href=http://fontawesome.io/icons/][_target=blank]')
                        }))]), m('li.ButtonGroup', [Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: app.translator.trans('flagrow-mason.admin.buttons.' + (this.field.exists ? 'edit' : 'add') + '-field'),
                            loading: this.processing,
                            disabled: !this.readyToSave(),
                            onclick: this.saveField.bind(this)
                        }), this.field.exists ? Button.component({
                            type: 'submit',
                            className: 'Button Button--danger',
                            children: app.translator.trans('flagrow-mason.admin.buttons.delete-field'),
                            loading: this.processing,
                            onclick: this.deleteField.bind(this)
                        }) : ''])]);
                    }
                }, {
                    key: 'updateAttribute',
                    value: function updateAttribute(attribute, value) {
                        this.field.pushAttributes(babelHelpers.defineProperty({}, attribute, value));

                        this.dirty = true;
                    }
                }, {
                    key: 'readyToSave',
                    value: function readyToSave() {
                        // TODO: check required fields
                        return this.dirty;
                    }
                }, {
                    key: 'saveField',
                    value: function saveField() {
                        var _this3 = this;

                        this.processing = true;

                        var createNewRecord = !this.field.exists;

                        app.request({
                            method: createNewRecord ? 'POST' : 'PATCH',
                            url: this.field.apiEndpoint(),
                            data: this.field.data
                        }).then(function (result) {
                            app.store.pushPayload(result);

                            if (createNewRecord) {
                                _this3.initNewField();
                            }

                            _this3.processing = false;
                            _this3.dirty = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'deleteField',
                    value: function deleteField() {
                        var _this4 = this;

                        this.processing = true;

                        app.request({
                            method: 'DELETE',
                            url: this.field.apiEndpoint()
                        }).then(function () {
                            app.store.remove(_this4.field);

                            _this4.processing = false;
                            m.redraw();
                        });
                    }
                }]);
                return FieldEdit;
            }(Component);

            _export('default', FieldEdit);
        }
    };
});;
'use strict';

System.register('flagrow/mason/main', ['flarum/app', 'flagrow/mason/models/Answer', 'flagrow/mason/models/Field', 'flagrow/mason/addMasonFieldsPane'], function (_export, _context) {
    "use strict";

    var app, Answer, Field, addMasonFieldsPane;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flagrowMasonModelsAnswer) {
            Answer = _flagrowMasonModelsAnswer.default;
        }, function (_flagrowMasonModelsField) {
            Field = _flagrowMasonModelsField.default;
        }, function (_flagrowMasonAddMasonFieldsPane) {
            addMasonFieldsPane = _flagrowMasonAddMasonFieldsPane.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-masquerade', function (app) {
                app.store.models['flagrow-mason-field'] = Field;
                app.store.models['flagrow-mason-answer'] = Answer;

                addMasonFieldsPane();
            });
        }
    };
});;
'use strict';

System.register('flagrow/mason/models/Answer', ['flarum/app', 'flarum/Model', 'flarum/utils/mixin'], function (_export, _context) {
    "use strict";

    var app, Model, mixin, Answer;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsMixin) {
            mixin = _flarumUtilsMixin.default;
        }],
        execute: function () {
            Answer = function (_mixin) {
                babelHelpers.inherits(Answer, _mixin);

                function Answer() {
                    babelHelpers.classCallCheck(this, Answer);
                    return babelHelpers.possibleConstructorReturn(this, (Answer.__proto__ || Object.getPrototypeOf(Answer)).apply(this, arguments));
                }

                babelHelpers.createClass(Answer, [{
                    key: 'apiEndpoint',
                    value: function apiEndpoint() {
                        return app.forum.attribute('apiUrl') + '/flagrow/mason/answer' + (this.exists ? '/' + this.data.id : '');
                    }
                }]);
                return Answer;
            }(mixin(Model, {
                content: Model.attribute('content'),
                field: Model.hasOne('field'),
                userId: Model.attribute('user_id')
            }));

            _export('default', Answer);
        }
    };
});;
'use strict';

System.register('flagrow/mason/models/Field', ['flarum/app', 'flarum/Model', 'flarum/utils/mixin'], function (_export, _context) {
    "use strict";

    var app, Model, mixin, Field;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsMixin) {
            mixin = _flarumUtilsMixin.default;
        }],
        execute: function () {
            Field = function (_mixin) {
                babelHelpers.inherits(Field, _mixin);

                function Field() {
                    babelHelpers.classCallCheck(this, Field);
                    return babelHelpers.possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).apply(this, arguments));
                }

                babelHelpers.createClass(Field, [{
                    key: 'apiEndpoint',
                    value: function apiEndpoint() {
                        return app.forum.attribute('apiUrl') + '/flagrow/mason/fields' + (this.exists ? '/' + this.data.id : '');
                    }
                }]);
                return Field;
            }(mixin(Model, {
                name: Model.attribute('name'),
                description: Model.attribute('description'),
                min_answers_count: Model.attribute('min_answers_count'),
                max_answers_count: Model.attribute('max_answers_count'),
                user_values_allowed: Model.attribute('user_values_allowed'),
                validation: Model.attribute('validation'),
                icon: Model.attribute('icon'),
                sort: Model.attribute('sort'),
                deleted_at: Model.attribute('deleted_at', Model.transformDate),
                answer: Model.hasMany('answers')
            }));

            _export('default', Field);
        }
    };
});;
'use strict';

System.register('flagrow/mason/panes/MasonFieldsPane', ['flarum/app', 'flarum/Component', 'flagrow/mason/components/FieldEdit'], function (_export, _context) {
    "use strict";

    var app, Component, FieldEdit, MasonFieldsPane;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flagrowMasonComponentsFieldEdit) {
            FieldEdit = _flagrowMasonComponentsFieldEdit.default;
        }],
        execute: function () {
            MasonFieldsPane = function (_Component) {
                babelHelpers.inherits(MasonFieldsPane, _Component);

                function MasonFieldsPane() {
                    babelHelpers.classCallCheck(this, MasonFieldsPane);
                    return babelHelpers.possibleConstructorReturn(this, (MasonFieldsPane.__proto__ || Object.getPrototypeOf(MasonFieldsPane)).apply(this, arguments));
                }

                babelHelpers.createClass(MasonFieldsPane, [{
                    key: 'init',
                    value: function init() {
                        app.request({
                            method: 'GET',
                            url: app.forum.attribute('apiUrl') + '/flagrow/mason/fields'
                        }).then(function (result) {
                            app.store.pushPayload(result);
                            m.redraw();
                        });
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var fields = app.store.all('flagrow-mason-field');

                        return m('.ProfileConfigurePane', [m('.container', [fields.map(function (field) {
                            return m('div', {
                                key: field.id()
                            }, FieldEdit.component({
                                field: field
                            }));
                        }), FieldEdit.component({
                            //key: 'new',
                            field: null
                        })])]);
                    }
                }]);
                return MasonFieldsPane;
            }(Component);

            _export('default', MasonFieldsPane);
        }
    };
});;
"use strict";

System.register("flagrow/mason/panes/ProfileConfigurePane", ["flarum/Component", "flarum/components/Select", "flarum/components/Switch", "flarum/components/Button", "flarum/utils/saveSettings", "flagrow/masquerade/components/SelectFieldOptionEditor"], function (_export, _context) {
    "use strict";

    var Component, Select, Switch, Button, saveSettings, SelectFieldOptionEditor, ProfileConfigurePane;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsSelect) {
            Select = _flarumComponentsSelect.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumUtilsSaveSettings) {
            saveSettings = _flarumUtilsSaveSettings.default;
        }, function (_flagrowMasqueradeComponentsSelectFieldOptionEditor) {
            SelectFieldOptionEditor = _flagrowMasqueradeComponentsSelectFieldOptionEditor.default;
        }],
        execute: function () {
            ProfileConfigurePane = function (_Component) {
                babelHelpers.inherits(ProfileConfigurePane, _Component);

                function ProfileConfigurePane() {
                    babelHelpers.classCallCheck(this, ProfileConfigurePane);
                    return babelHelpers.possibleConstructorReturn(this, (ProfileConfigurePane.__proto__ || Object.getPrototypeOf(ProfileConfigurePane)).apply(this, arguments));
                }

                babelHelpers.createClass(ProfileConfigurePane, [{
                    key: "init",
                    value: function init() {
                        this.resetNew();
                        this.loading = false;
                        this.existing = [];
                        this.loadExisting();
                        this.enforceProfileCompletion = m.prop(app.data.settings['masquerade.force-profile-completion'] == 1);
                        this.disableUserBio = m.prop(app.data.settings['masquerade.disable-user-bio'] == 1);
                    }
                }, {
                    key: "config",
                    value: function config() {
                        var _this2 = this;

                        this.$('.Existing--Fields').sortable({
                            cancel: ''
                        }).on('sortupdate', function (e, ui) {
                            var sorting = _this2.$('.Existing--Fields > .Field').map(function () {
                                return $(this).data('id');
                            }).get();

                            _this2.updateSort(sorting);
                        });
                    }
                }, {
                    key: "view",
                    value: function view() {
                        var _this3 = this;

                        var fields = [];

                        this.existing.sort(function (a, b) {
                            return a.sort() - b.sort();
                        }).forEach(function (field) {
                            // Build array of fields to show.
                            fields.push(_this3.addField(field));
                        });

                        return m('div', {
                            className: 'ProfileConfigurePane'
                        }, [m('div', { className: 'container' }, [m('form', {
                            className: 'Configuration'
                        }, [m('label', ''), [Switch.component({
                            state: this.enforceProfileCompletion(),
                            onchange: this.updateSetting.bind(this, this.enforceProfileCompletion, 'masquerade.force-profile-completion'),
                            children: app.translator.trans('flagrow-masquerade.admin.fields.force-user-to-completion')
                        }), m('br')], m('label', ''), [Switch.component({
                            state: this.disableUserBio(),
                            onchange: this.updateSetting.bind(this, this.disableUserBio, 'masquerade.disable-user-bio'),
                            children: app.translator.trans('flagrow-masquerade.admin.fields.disable-user-bio')
                        }), m('br')]]), m('form', {
                            className: 'Existing--Fields'
                        }, fields), m('form', { onsubmit: this.submitAddField.bind(this) }, [this.addField(this.new)])])]);
                    }
                }, {
                    key: "updateSetting",
                    value: function updateSetting(prop, setting, value) {
                        saveSettings(babelHelpers.defineProperty({}, setting, value));

                        prop(value);
                    }
                }, {
                    key: "addField",
                    value: function addField(field) {
                        var _this4 = this;

                        var exists = field.id();

                        return m('fieldset', {
                            className: 'Field',
                            'data-id': field.id()
                        }, [m('legend', [exists ? m('div', { className: 'ButtonGroup pull-right' }, [Button.component({
                            className: 'Button Button--icon Button--danger',
                            icon: "trash",
                            onclick: this.deleteField.bind(this, field)
                        })]) : null, m('span', {
                            className: 'title',
                            onclick: function onclick(e) {
                                return _this4.toggleField(e);
                            }
                        }, app.translator.trans('flagrow-masquerade.admin.fields.' + (exists ? 'edit' : 'add'), {
                            field: field.name()
                        }))]), m('ul', [m('li', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.name')), m('input', {
                            className: 'FormControl',
                            value: field.name(),
                            oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'name', field))
                        }), m('span', { className: 'helpText' }, app.translator.trans('flagrow-masquerade.admin.fields.name-help'))]), m('li', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.description')), m('input', {
                            className: 'FormControl',
                            value: field.description(),
                            oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'description', field))
                        }), m('span', { className: 'helpText' }, app.translator.trans('flagrow-masquerade.admin.fields.description-help'))]), m('li', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.icon')), m('input', {
                            className: 'FormControl',
                            value: field.icon(),
                            oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'icon', field))
                        }), m('span', { className: 'helpText' }, app.translator.trans('flagrow-masquerade.admin.fields.icon-help', {
                            a: m("a", { href: "http://fontawesome.io/icons/", target: "_blank" })
                        }))]),
                        // @todo Disabled for now, wasn't really showing up nicely.
                        // m('li', [
                        //     m('label', app.translator.trans('flagrow-masquerade.admin.fields.prefix')),
                        //     m('input', {
                        //         className: 'FormControl',
                        //         value: field.prefix(),
                        //         oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'prefix', field))
                        //     }),
                        //     m('span', {className: 'helpText'}, app.translator.trans('flagrow-masquerade.admin.fields.prefix-help'))
                        // ]),
                        m('li', [m('label', ''), [Switch.component({
                            state: field.on_bio(),
                            onchange: this.updateExistingFieldInput.bind(this, 'on_bio', field),
                            children: app.translator.trans('flagrow-masquerade.admin.fields.on_bio')
                        }), m('br')]]), m('li', [m('label', ''), [Switch.component({
                            state: field.required(),
                            onchange: this.updateExistingFieldInput.bind(this, 'required', field),
                            children: app.translator.trans('flagrow-masquerade.admin.fields.required')
                        }), m('br')]]), m('li', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.type')), Select.component({
                            onchange: function onchange(value) {
                                if (value === 'null') {
                                    value = null;
                                }

                                _this4.updateExistingFieldInput('type', field, value);
                            },
                            options: this.availableTypes(),
                            value: field.type()
                        })]), field.type() === 'select' ? SelectFieldOptionEditor.component({
                            onchange: function onchange(value) {
                                _this4.updateExistingFieldInput('validation', field, value);
                            },
                            value: field.validation()
                        }) : null, field.type() === null ? m('li', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.validation')), m('input', {
                            className: 'FormControl',
                            value: field.validation(),
                            oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'validation', field))
                        }), m('span', { className: 'helpText' }, app.translator.trans('flagrow-masquerade.admin.fields.validation-help', {
                            a: m("a", { href: "https://laravel.com/docs/5.2/validation#available-validation-rules",
                                target: "_blank" })
                        }))]) : null, m('li', { className: 'ButtonGroup' }, [Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: app.translator.trans('flagrow-masquerade.admin.buttons.' + (exists ? 'edit' : 'add') + '-field'),
                            loading: this.loading,
                            disabled: !this.readyToAdd(field),
                            onclick: this.updateExistingField.bind(this, field)
                        }), exists ? Button.component({
                            type: 'submit',
                            className: 'Button Button--danger',
                            children: app.translator.trans('flagrow-masquerade.admin.buttons.delete-field'),
                            loading: this.loading,
                            onclick: this.deleteField.bind(this, field)
                        }) : ''])])]);
                    }
                }, {
                    key: "updateExistingFieldInput",
                    value: function updateExistingFieldInput(what, field, value) {
                        var exists = field.id();

                        if (exists) {
                            field.pushAttributes(babelHelpers.defineProperty({}, what, value));
                        } else {
                            field[what](value);
                        }
                    }
                }, {
                    key: "updateSort",
                    value: function updateSort(sorting) {
                        var data = {
                            sort: sorting
                        };

                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/masquerade/fields/order',
                            data: data
                        });
                    }
                }, {
                    key: "toggleField",
                    value: function toggleField(e) {
                        $(e.target).parents('.Field').toggleClass('active');
                    }
                }, {
                    key: "deleteField",
                    value: function deleteField(field) {
                        app.request({
                            method: 'DELETE',
                            url: app.forum.attribute('apiUrl') + '/masquerade/fields/' + field.id()
                        }).then(this.requestSuccess.bind(this));
                    }
                }, {
                    key: "submitAddField",
                    value: function submitAddField(e) {
                        e.preventDefault();

                        var data = this.new;

                        // @todo xhr call app.request
                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/masquerade/fields',
                            data: data
                        }).then(this.requestSuccess.bind(this));

                        this.resetNew();

                        m.redraw();
                    }
                }, {
                    key: "updateExistingField",
                    value: function updateExistingField(field) {
                        if (!field.id()) return;

                        var data = field.data;

                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/masquerade/fields/' + field.id(),
                            data: data
                        }).then(this.requestSuccess.bind(this));
                    }
                }, {
                    key: "requestSuccess",
                    value: function requestSuccess(result) {
                        var model = app.store.pushPayload(result);

                        // In case we've updated/deleted one instance delete it if necessary.
                        if (!(model instanceof Array) && model.deleted_at()) {
                            app.store.remove(model);
                        }

                        this.existing = app.store.all('masquerade-field');

                        this.loading = false;
                        m.redraw();
                    }
                }, {
                    key: "loadExisting",
                    value: function loadExisting() {
                        this.loading = true;

                        return app.request({
                            method: 'GET',
                            url: app.forum.attribute('apiUrl') + '/masquerade/fields'
                        }).then(this.requestSuccess.bind(this));
                    }
                }, {
                    key: "resetNew",
                    value: function resetNew() {
                        this.new = {
                            'id': m.prop(),
                            'name': m.prop(''),
                            'description': m.prop(''),
                            'prefix': m.prop(''),
                            'icon': m.prop(''),
                            'required': m.prop(false),
                            'on_bio': m.prop(false),
                            'type': m.prop(null),
                            'validation': m.prop('')
                        };
                    }
                }, {
                    key: "readyToAdd",
                    value: function readyToAdd(field) {
                        if (field.name()) {
                            return true;
                        }

                        return false;
                    }
                }, {
                    key: "availableTypes",
                    value: function availableTypes() {
                        return {
                            url: app.translator.trans('flagrow-masquerade.admin.types.url'),
                            email: app.translator.trans('flagrow-masquerade.admin.types.email'),
                            boolean: app.translator.trans('flagrow-masquerade.admin.types.boolean'),
                            select: app.translator.trans('flagrow-masquerade.admin.types.select'),
                            null: app.translator.trans('flagrow-masquerade.admin.types.advanced')
                        };
                    }
                }]);
                return ProfileConfigurePane;
            }(Component);

            _export("default", ProfileConfigurePane);
        }
    };
});
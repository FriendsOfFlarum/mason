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
'use strict';

System.register('flagrow/mason/components/FieldEdit', ['flarum/app', 'flarum/Component', 'flarum/components/Button', 'flarum/components/Switch', 'flagrow/mason/models/Field', 'flagrow/mason/components/FieldAnswersEdit'], function (_export, _context) {
    "use strict";

    var app, Component, Button, Switch, Field, FieldAnswersEdit, FieldEdit;
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
        }, function (_flagrowMasonComponentsFieldAnswersEdit) {
            FieldAnswersEdit = _flagrowMasonComponentsFieldAnswersEdit.default;
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
                        }))]), m('li', FieldAnswersEdit.component({
                            field: this.field
                        })), m('li.ButtonGroup', [Button.component({
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
                        return app.forum.attribute('apiUrl') + '/flagrow/mason/answers' + (this.exists ? '/' + this.data.id : '');
                    }
                }]);
                return Answer;
            }(mixin(Model, {
                content: Model.attribute('content'),
                is_suggested: Model.attribute('is_suggested'),
                sort: Model.attribute('sort'),
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
                all_answers: Model.hasMany('all_answers'),
                suggested_answers: Model.hasMany('suggested_answers')
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
                    key: 'config',
                    value: function config() {
                        var _this2 = this;

                        this.$('.Existing--Fields').sortable({
                            handle: '.Field--Handle'
                        }).on('sortupdate', function () {
                            var sorting = _this2.$('.Existing--Fields > .Field').map(function () {
                                return $(this).data('id');
                            }).get();

                            _this2.updateSort(sorting);
                        });
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var fields = app.store.all('flagrow-mason-field');

                        var fieldsList = [];

                        fields.sort(function (a, b) {
                            return a.sort() - b.sort();
                        }).forEach(function (field) {
                            // Build array of fields to show.
                            fieldsList.push(m('.Field', {
                                key: field.id(),
                                'data-id': field.id()
                            }, [m('span.fa.fa-arrows.Field--Handle'), FieldEdit.component({
                                field: field
                            })]));
                        });

                        return m('.ProfileConfigurePane', [m('.container', [m('.Existing--Fields', fieldsList), FieldEdit.component({
                            //key: 'new',
                            field: null
                        })])]);
                    }
                }, {
                    key: 'updateSort',
                    value: function updateSort(sorting) {
                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/flagrow/mason/fields/order',
                            data: {
                                sort: sorting
                            }
                        }).then(function (result) {
                            // Update sort attributes
                            app.store.pushPayload(result);
                            m.redraw();
                        });
                    }
                }]);
                return MasonFieldsPane;
            }(Component);

            _export('default', MasonFieldsPane);
        }
    };
});;
'use strict';

System.register('flagrow/mason/components/FieldAnswersEdit', ['flarum/app', 'flarum/Component', 'flarum/components/Button', 'flagrow/mason/components/AnswerEdit'], function (_export, _context) {
    "use strict";

    var app, Component, Button, AnswerEdit, FieldAnswersEdit;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowMasonComponentsAnswerEdit) {
            AnswerEdit = _flagrowMasonComponentsAnswerEdit.default;
        }],
        execute: function () {
            FieldAnswersEdit = function (_Component) {
                babelHelpers.inherits(FieldAnswersEdit, _Component);

                function FieldAnswersEdit() {
                    babelHelpers.classCallCheck(this, FieldAnswersEdit);
                    return babelHelpers.possibleConstructorReturn(this, (FieldAnswersEdit.__proto__ || Object.getPrototypeOf(FieldAnswersEdit)).apply(this, arguments));
                }

                babelHelpers.createClass(FieldAnswersEdit, [{
                    key: 'init',
                    value: function init() {
                        this.field = this.props.field;
                        this.processing = false;
                        this.new_content = '';
                    }
                }, {
                    key: 'config',
                    value: function config() {
                        var _this2 = this;

                        this.$('.Answers').sortable({
                            handle: '.Answer--Handle'
                        }).on('sortupdate', function () {
                            var sorting = _this2.$('.Answers > .Answer').map(function () {
                                return $(this).data('id');
                            }).get();

                            _this2.updateSort(sorting);
                        });
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this3 = this;

                        if (!this.field.exists) {
                            return m('div', app.translator('flagrow-mason.admin.fields.save-field-for-options'));
                        }

                        var answersList = [];

                        console.log(this.field.all_answers());

                        this.field.all_answers().sort(function (a, b) {
                            return a.sort() - b.sort();
                        }).forEach(function (answer) {
                            // Build array of fields to show.
                            answersList.push(m('.Answer', {
                                key: answer.id(),
                                'data-id': answer.id()
                            }, AnswerEdit.component({
                                answer: answer
                            })));
                        });

                        return m('div', [m('.Answers', answersList), m('form', [m('input.FormControl', {
                            value: this.new_content,
                            oninput: m.withAttr('value', function (value) {
                                _this3.new_content = value;
                            })
                        }), Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: app.translator.trans('flagrow-mason.admin.buttons.add-answer'),
                            loading: this.processing,
                            disabled: !this.new_content,
                            onclick: this.saveField.bind(this)
                        })])]);
                    }
                }, {
                    key: 'saveField',
                    value: function saveField() {
                        var _this4 = this;

                        this.processing = true;

                        app.request({
                            method: 'POST',
                            url: this.field.apiEndpoint() + '/answers',
                            data: {
                                attributes: {
                                    content: this.new_content,
                                    is_suggested: true
                                }
                            }
                        }).then(function (result) {
                            app.store.pushPayload(result);

                            _this4.processing = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'updateSort',
                    value: function updateSort(sorting) {
                        app.request({
                            method: 'POST',
                            url: this.field.apiEndpoint() + '/answers/order',
                            data: {
                                sort: sorting
                            }
                        }).then(function (result) {
                            // Update sort attributes
                            app.store.pushPayload(result);
                            m.redraw();
                        });
                    }
                }]);
                return FieldAnswersEdit;
            }(Component);

            _export('default', FieldAnswersEdit);
        }
    };
});;
'use strict';

System.register('flagrow/mason/components/AnswerEdit', ['flarum/app', 'flarum/Component', 'flarum/components/Button', 'flarum/components/Switch'], function (_export, _context) {
    "use strict";

    var app, Component, Button, Switch, FieldEdit;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
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
                        this.answer = this.props.answer;
                        this.dirty = false;
                        this.processing = false;
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this2 = this;

                        return m('form', [m('span.fa.fa-arrows.Answer--Handle'), m('span', {
                            onclick: function onclick() {
                                var newContent = prompt('Edit content', _this2.answer.content());

                                if (newContent) {
                                    _this2.updateAttribute('content', newContent);
                                }
                            }
                        }, ' ' + this.answer.content() + ' '), Switch.component({
                            state: this.answer.is_suggested(),
                            onchange: this.updateAttribute.bind(this, 'is_suggested'),
                            children: app.translator.trans('flagrow-mason.admin.fields.is_suggested')
                        }), Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: app.translator.trans('flagrow-mason.admin.buttons.edit-answer'),
                            loading: this.processing,
                            disabled: !this.readyToSave(),
                            onclick: this.saveField.bind(this)
                        }), Button.component({
                            type: 'submit',
                            className: 'Button Button--danger',
                            children: app.translator.trans('flagrow-mason.admin.buttons.delete-answer'),
                            loading: this.processing,
                            onclick: this.deleteField.bind(this)
                        })]);
                    }
                }, {
                    key: 'updateAttribute',
                    value: function updateAttribute(attribute, value) {
                        this.answer.pushAttributes(babelHelpers.defineProperty({}, attribute, value));

                        this.dirty = true;
                    }
                }, {
                    key: 'readyToSave',
                    value: function readyToSave() {
                        return this.dirty;
                    }
                }, {
                    key: 'saveField',
                    value: function saveField() {
                        var _this3 = this;

                        this.processing = true;

                        app.request({
                            method: 'PATCH',
                            url: this.answer.apiEndpoint(),
                            data: this.answer.data
                        }).then(function (result) {
                            app.store.pushPayload(result);

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
                            url: this.answer.apiEndpoint()
                        }).then(function () {
                            app.store.remove(_this4.answer);

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
});
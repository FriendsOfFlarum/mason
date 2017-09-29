'use strict';

System.register('flagrow/mason/addComposerFields', ['flarum/extend', 'flarum/app', 'flarum/components/DiscussionComposer', 'flagrow/mason/components/DiscussionFields'], function (_export, _context) {
    "use strict";

    var extend, app, DiscussionComposer, DiscussionFields;

    _export('default', function () {
        DiscussionComposer.prototype.flagrowMasonAnswers = [];

        extend(DiscussionComposer.prototype, 'headerItems', function (items) {
            var _this = this;

            // add the Image Upload tab to the admin navigation menu
            items.add('flagrow-mason-fields', DiscussionFields.component({
                answers: this.flagrowMasonAnswers,
                onchange: function onchange(answers) {
                    _this.flagrowMasonAnswers = answers;
                }
            }));
        });

        extend(DiscussionComposer.prototype, 'data', function (data) {
            data.relationships = data.relationships || {};
            data.relationships.flagrowMasonAnswers = this.flagrowMasonAnswers;
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsDiscussionComposer) {
            DiscussionComposer = _flarumComponentsDiscussionComposer.default;
        }, function (_flagrowMasonComponentsDiscussionFields) {
            DiscussionFields = _flagrowMasonComponentsDiscussionFields.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/mason/components/DiscussionFields', ['flarum/app', 'flarum/helpers/icon', 'flarum/Component'], function (_export, _context) {
    "use strict";

    var app, icon, Component, DiscussionFields;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }],
        execute: function () {
            DiscussionFields = function (_Component) {
                babelHelpers.inherits(DiscussionFields, _Component);

                function DiscussionFields() {
                    babelHelpers.classCallCheck(this, DiscussionFields);
                    return babelHelpers.possibleConstructorReturn(this, (DiscussionFields.__proto__ || Object.getPrototypeOf(DiscussionFields)).apply(this, arguments));
                }

                babelHelpers.createClass(DiscussionFields, [{
                    key: 'init',
                    value: function init() {
                        var _this2 = this;

                        this.fields = app.store.all('flagrow-mason-field');

                        // Index to quickly do a reverse lookup from answer to field
                        this.answerToFieldIndex = [];
                        this.fields.forEach(function (field) {
                            field.suggested_answers().forEach(function (answer) {
                                _this2.answerToFieldIndex[answer.id()] = field.id();
                            });
                        });
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this3 = this;

                        return m('ul', [this.fields.map(function (field) {
                            return m('li', m('.FormGroup', [m('label', [field.icon() ? [icon(field.icon()), ' '] : null, field.name(), field.min_answers_count() > 0 ? ' *' : null]), m('select', {
                                multiple: field.min_answers_count() > 1,
                                onchange: m.withAttr('value', function (value) {
                                    _this3.updateSelection(field, value);
                                })
                            }, [m('option', {
                                selected: true,
                                disabled: true,
                                hidden: true
                            }, 'Choose'), field.suggested_answers().map(function (answer) {
                                return m('option', {
                                    value: answer.id()
                                }, answer.content());
                            })]), field.description() ? m('span.helpText', field.description()) : null]));
                        })]);
                    }
                }, {
                    key: 'updateSelection',
                    value: function updateSelection(field, value) {
                        var _this4 = this;

                        // Keep only answers to other fields
                        var answers = this.props.answers.filter(function (answer) {
                            return _this4.answerToFieldIndex[answer.id()] !== field.id();
                        });

                        console.log('filter', this.props.answers, answers);

                        var answerIds = Array.isArray(value) ? value : [value];

                        answerIds.forEach(function (id) {
                            answers.push(app.store.getById('flagrow-mason-answer', id));
                        });

                        console.log('ids', answerIds, answers);

                        this.props.onchange(answers);
                    }
                }]);
                return DiscussionFields;
            }(Component);

            _export('default', DiscussionFields);
        }
    };
});;
'use strict';

System.register('flagrow/mason/main', ['flarum/app', 'flagrow/mason/models/Answer', 'flagrow/mason/models/Field', 'flagrow/mason/addComposerFields'], function (_export, _context) {
    "use strict";

    var app, Answer, Field, addComposerFields;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flagrowMasonModelsAnswer) {
            Answer = _flagrowMasonModelsAnswer.default;
        }, function (_flagrowMasonModelsField) {
            Field = _flagrowMasonModelsField.default;
        }, function (_flagrowMasonAddComposerFields) {
            addComposerFields = _flagrowMasonAddComposerFields.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-masquerade', function (app) {
                app.store.models['flagrow-mason-field'] = Field;
                app.store.models['flagrow-mason-answer'] = Answer;

                addComposerFields();
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
});
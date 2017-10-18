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
                },
                ontagchange: function ontagchange(tags) {
                    _this.tags = tags;
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

System.register('flagrow/mason/addFieldsOnDiscussionHero', ['flarum/extend', 'flarum/app', 'flarum/components/DiscussionHero', 'flagrow/mason/components/PostFields'], function (_export, _context) {
    "use strict";

    var extend, app, DiscussionHero, PostFields;

    _export('default', function () {
        extend(DiscussionHero.prototype, 'items', function (items) {
            if (!app.forum.attribute('flagrow.mason.fields-in-hero')) {
                return;
            }

            items.add('flagrow-mason-fields', PostFields.component({
                discussion: this.props.discussion
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsDiscussionHero) {
            DiscussionHero = _flarumComponentsDiscussionHero.default;
        }, function (_flagrowMasonComponentsPostFields) {
            PostFields = _flagrowMasonComponentsPostFields.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/mason/addFieldsOnDiscussionPost', ['flarum/extend', 'flarum/app', 'flarum/components/CommentPost', 'flagrow/mason/components/PostFields'], function (_export, _context) {
    "use strict";

    var extend, app, CommentPost, PostFields;


    function showFieldsOnPost(post) {
        // We only add fields to the first post, and only if fields are not displayed in the hero
        // TODO: what if the first post is deleted ?
        return post.number() === 1 && !app.forum.attribute('flagrow.mason.fields-in-hero');
    }

    _export('default', function () {
        extend(CommentPost.prototype, 'init', function () {
            var _this = this;

            this.subtree.check(function () {
                if (showFieldsOnPost(_this.props.post)) {
                    // Create a string with all answer ids
                    // If answers change this string will be different
                    return _this.props.post.discussion().flagrowMasonAnswers().map(function (answer) {
                        return answer.id();
                    }).join(',');
                }

                // For other posts we always return the same thing
                return '';
            });
        });

        extend(CommentPost.prototype, 'content', function (content) {
            if (!showFieldsOnPost(this.props.post)) {
                return;
            }

            var postHeaderIndex = content.findIndex(function (item) {
                return item.attrs && item.attrs.className === 'Post-header';
            });

            // Insert the new content just after the header
            // or at the very beginning if the header is not found
            content.splice(postHeaderIndex === -1 ? 0 : postHeaderIndex + 1, 0, PostFields.component({
                discussion: this.props.post.discussion()
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsCommentPost) {
            CommentPost = _flarumComponentsCommentPost.default;
        }, function (_flagrowMasonComponentsPostFields) {
            PostFields = _flagrowMasonComponentsPostFields.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/mason/addFieldUpdateControl', ['flarum/extend', 'flarum/utils/DiscussionControls', 'flarum/components/Button', 'flagrow/mason/components/DiscussionFieldsModal'], function (_export, _context) {
    "use strict";

    var extend, DiscussionControls, Button, DiscussionFieldsModal;

    _export('default', function () {
        extend(DiscussionControls, 'moderationControls', function (items, discussion) {
            if (discussion.canUpdateFlagrowMasonAnswers()) {
                items.add('flagrow-mason-update-answers', Button.component({
                    children: app.translator.trans('flagrow-mason.forum.discussion-controls.edit-answers'),
                    icon: 'tag',
                    onclick: function onclick() {
                        return app.modal.show(new DiscussionFieldsModal({ discussion: discussion }));
                    }
                }));
            }
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumUtilsDiscussionControls) {
            DiscussionControls = _flarumUtilsDiscussionControls.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowMasonComponentsDiscussionFieldsModal) {
            DiscussionFieldsModal = _flagrowMasonComponentsDiscussionFieldsModal.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/mason/components/DiscussionFields', ['flarum/app', 'flarum/helpers/icon', 'flarum/utils/ItemList', 'flarum/Component', 'flagrow/mason/helpers/sortByAttribute', 'flagrow/mason/components/FieldEditDropdown', 'flagrow/mason/components/FieldEditText', 'flagrow/mason/components/FieldEditTags', 'flagrow/mason/components/FieldGrid'], function (_export, _context) {
    "use strict";

    var app, icon, ItemList, Component, sortByAttribute, FieldEditDropdown, FieldEditText, FieldEditTags, FieldGrid, DiscussionFields;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flagrowMasonHelpersSortByAttribute) {
            sortByAttribute = _flagrowMasonHelpersSortByAttribute.default;
        }, function (_flagrowMasonComponentsFieldEditDropdown) {
            FieldEditDropdown = _flagrowMasonComponentsFieldEditDropdown.default;
        }, function (_flagrowMasonComponentsFieldEditText) {
            FieldEditText = _flagrowMasonComponentsFieldEditText.default;
        }, function (_flagrowMasonComponentsFieldEditTags) {
            FieldEditTags = _flagrowMasonComponentsFieldEditTags.default;
        }, function (_flagrowMasonComponentsFieldGrid) {
            FieldGrid = _flagrowMasonComponentsFieldGrid.default;
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

                        this.fields = sortByAttribute(app.store.all('flagrow-mason-field'));

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
                        return m('form.Mason-Fields.Mason-Fields--editor', {
                            onsubmit: function onsubmit(event) {
                                event.preventDefault();
                            }
                        }, [this.headItems().toArray(), FieldGrid.component({
                            items: this.fieldItems().toArray()
                        })]);
                    }
                }, {
                    key: 'updateSelection',
                    value: function updateSelection(field, fieldAnswers) {
                        var _this3 = this;

                        // Keep only answers to other fields
                        var answers = this.props.answers.filter(function (answer) {
                            var reverseFieldLookup = _this3.answerToFieldIndex[answer.id()];

                            // If the answer is not in the reverse lookup table it's probably a non-suggested (user) answer
                            // In that case the field should be linked in the relationship
                            if (typeof reverseFieldLookup === 'undefined') {
                                return answer.field().id() !== field.id();
                            }

                            return reverseFieldLookup !== field.id();
                        });

                        answers = answers.concat(fieldAnswers);

                        this.props.onchange(answers);
                    }
                }, {
                    key: 'headItems',
                    value: function headItems() {
                        var items = new ItemList();

                        if (app.forum.attribute('flagrow.mason.fields-section-title')) {
                            items.add('title', m('h5.Mason-Field--title', app.forum.attribute('flagrow.mason.fields-section-title')));
                        }

                        return items;
                    }
                }, {
                    key: 'fieldItems',
                    value: function fieldItems() {
                        var _this4 = this;

                        var items = new ItemList();

                        if (app.forum.attribute('flagrow.mason.tags-as-fields')) {
                            items.add('tags', FieldEditTags.component({
                                discussion: this.props.discussion,
                                onchange: function onchange(tags) {
                                    if (_this4.props.ontagchange) {
                                        _this4.props.ontagchange(tags);
                                    }
                                }
                            }));
                        }

                        this.fields.forEach(function (field) {
                            var inputAttrs = {
                                field: field,
                                answers: _this4.props.answers,
                                onchange: function onchange(fieldAnswers) {
                                    // Every input component calls "onchange" with a list of answers from the store
                                    _this4.updateSelection(field, fieldAnswers);
                                }
                            };
                            var input = null;

                            if (field.user_values_allowed()) {
                                input = FieldEditText.component(inputAttrs);
                            } else {
                                input = FieldEditDropdown.component(inputAttrs);
                            }

                            items.add('field-' + field.id(), m('.Mason-Field.Form-group', {
                                className: app.forum.attribute('flagrow.mason.labels-as-placeholders') ? 'Mason-Field--label-as-placeholder' : ''
                            }, [m('label', [field.icon() ? [icon(field.icon()), ' '] : null, field.name(), field.required() ? ' *' : null]), input, field.description() ? m('.helpText', field.description()) : null]));
                        });

                        return items;
                    }
                }]);
                return DiscussionFields;
            }(Component);

            _export('default', DiscussionFields);
        }
    };
});;
'use strict';

System.register('flagrow/mason/components/DiscussionFieldsModal', ['flarum/app', 'flarum/components/Modal', 'flarum/components/Button', 'flagrow/mason/components/DiscussionFields'], function (_export, _context) {
    "use strict";

    var app, Modal, Button, DiscussionFields, DiscussionFieldsModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowMasonComponentsDiscussionFields) {
            DiscussionFields = _flagrowMasonComponentsDiscussionFields.default;
        }],
        execute: function () {
            DiscussionFieldsModal = function (_Modal) {
                babelHelpers.inherits(DiscussionFieldsModal, _Modal);

                function DiscussionFieldsModal() {
                    babelHelpers.classCallCheck(this, DiscussionFieldsModal);
                    return babelHelpers.possibleConstructorReturn(this, (DiscussionFieldsModal.__proto__ || Object.getPrototypeOf(DiscussionFieldsModal)).apply(this, arguments));
                }

                babelHelpers.createClass(DiscussionFieldsModal, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(DiscussionFieldsModal.prototype.__proto__ || Object.getPrototypeOf(DiscussionFieldsModal.prototype), 'init', this).call(this);

                        this.answers = this.props.discussion.flagrowMasonAnswers();
                        this.dirty = false;
                        this.processing = false;

                        // Stays null if the feature is not used
                        this.tags = null;
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('flagrow-mason.forum.answers-modal.edit-title', {
                            title: m('em', this.props.discussion.title())
                        });
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        var _this2 = this;

                        return [m('.Modal-body', DiscussionFields.component({
                            discussion: this.props.discussion, // Only for the tags feature
                            answers: this.answers,
                            onchange: this.answersChanged.bind(this),
                            ontagchange: function ontagchange(tags) {
                                _this2.tags = tags;
                                _this2.dirty = true;
                            }
                        })), m('.Modal-footer', [Button.component({
                            className: 'Button Button--primary',
                            children: app.translator.trans('flagrow-mason.forum.answers-modal.save'),
                            loading: this.processing,
                            disabled: !this.dirty,
                            onclick: this.saveAnswers.bind(this)
                        })])];
                    }
                }, {
                    key: 'answersChanged',
                    value: function answersChanged(answers) {
                        this.answers = answers;
                        this.dirty = true;
                    }
                }, {
                    key: 'saveAnswers',
                    value: function saveAnswers() {
                        var _this3 = this;

                        this.processing = true;

                        var relationships = {
                            flagrowMasonAnswers: this.answers
                        };

                        // If tag edit is enabled, take care of them here as well
                        if (this.tags !== null) {
                            relationships.tags = this.tags;
                        }

                        this.props.discussion.save({
                            relationships: relationships
                        }).then(function () {
                            _this3.processing = false;
                            app.modal.close();
                            m.redraw();
                        }).catch(function (err) {
                            _this3.processing = false;
                            throw err;
                        });
                    }
                }]);
                return DiscussionFieldsModal;
            }(Modal);

            _export('default', DiscussionFieldsModal);
        }
    };
});;
'use strict';

System.register('flagrow/mason/components/FieldEditDropdown', ['flarum/app', 'flarum/helpers/icon', 'flarum/Component', 'flagrow/mason/helpers/sortByAttribute'], function (_export, _context) {
    "use strict";

    var app, icon, Component, sortByAttribute, FieldEditDropdown;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flagrowMasonHelpersSortByAttribute) {
            sortByAttribute = _flagrowMasonHelpersSortByAttribute.default;
        }],
        execute: function () {
            FieldEditDropdown = function (_Component) {
                babelHelpers.inherits(FieldEditDropdown, _Component);

                function FieldEditDropdown() {
                    babelHelpers.classCallCheck(this, FieldEditDropdown);
                    return babelHelpers.possibleConstructorReturn(this, (FieldEditDropdown.__proto__ || Object.getPrototypeOf(FieldEditDropdown)).apply(this, arguments));
                }

                babelHelpers.createClass(FieldEditDropdown, [{
                    key: 'init',
                    value: function init() {
                        this.field = this.props.field;
                        this.answers = this.props.answers;
                        this.onchange = this.props.onchange;
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this2 = this;

                        var selectedAnswerIdsForThisField = [];

                        this.field.suggested_answers().forEach(function (answer) {
                            var answerIndex = _this2.answers.findIndex(function (a) {
                                // Temporary store entries seem to turn into undefined after saving
                                if (typeof a === 'undefined') {
                                    return false;
                                }

                                return a.id() === answer.id();
                            });

                            if (answerIndex !== -1) {
                                selectedAnswerIdsForThisField.push(answer.id());
                            }
                        });

                        return m('span.Select', [m('select.Select-input.FormControl', {
                            multiple: this.field.multiple(),
                            onchange: function onchange(event) {
                                var answers = [];

                                var _iteratorNormalCompletion = true;
                                var _didIteratorError = false;
                                var _iteratorError = undefined;

                                try {
                                    for (var _iterator = event.target.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var option = _step.value;

                                        if (option.selected && option.value !== 'none') {
                                            var answerId = option.value;

                                            // This will only work with suggested answers for now
                                            // As they are the only ones registered in the store
                                            answers.push(app.store.getById('flagrow-mason-answer', answerId));
                                        }
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return) {
                                            _iterator.return();
                                        }
                                    } finally {
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }

                                _this2.onchange(answers);
                            }
                        }, [this.field.multiple() ? null : m('option', {
                            value: 'none',
                            selected: selectedAnswerIdsForThisField.length === 0,
                            disabled: this.field.required(),
                            hidden: this.placeholderHidden()
                        }, this.selectPlaceholder()), sortByAttribute(this.field.suggested_answers()).map(function (answer) {
                            return m('option', {
                                value: answer.id(),
                                selected: selectedAnswerIdsForThisField.indexOf(answer.id()) !== -1
                            }, answer.content());
                        })]), icon('sort', { className: 'Select-caret' })]);
                    }
                }, {
                    key: 'placeholderHidden',
                    value: function placeholderHidden() {
                        // If labels are hidden, we need to always show the default value (even if it can't be selected)
                        // Otherwise when the field is "required" you can't find the name of the field anymore once something is selected
                        if (app.forum.attribute('flagrow.mason.labels-as-placeholders')) {
                            return false;
                        }

                        return this.field.required();
                    }
                }, {
                    key: 'selectPlaceholder',
                    value: function selectPlaceholder() {
                        var text = '';

                        if (app.forum.attribute('flagrow.mason.labels-as-placeholders')) {
                            text += this.field.name();

                            if (this.field.required()) {
                                text += ' *';
                            }

                            text += ' - ';
                        }

                        if (this.field.required()) {
                            text += app.translator.trans('flagrow-mason.forum.answers.choose-option');
                        } else {
                            text += app.translator.trans('flagrow-mason.forum.answers.no-option-selected');
                        }

                        return text;
                    }
                }]);
                return FieldEditDropdown;
            }(Component);

            _export('default', FieldEditDropdown);
        }
    };
});;
'use strict';

System.register('flagrow/mason/components/FieldEditTags', ['flarum/app', 'flarum/helpers/icon', 'flarum/Component', 'flarum/tags/utils/sortTags'], function (_export, _context) {
    "use strict";

    var app, icon, Component, sortTags, DiscussionFields;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumTagsUtilsSortTags) {
            sortTags = _flarumTagsUtilsSortTags.default;
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

                        this.tags = app.store.all('tags');
                        this.selectedTags = [];

                        if (this.props.discussion) {
                            this.tags = this.tags.filter(function (tag) {
                                return tag.canAddToDiscussion() || _this2.props.discussion.tags().indexOf(tag) !== -1;
                            });

                            this.selectedTags = this.props.discussion.tags();
                        } else {
                            this.tags = this.tags.filter(function (tag) {
                                return tag.canStartDiscussion();
                            });
                        }

                        this.minPrimary = app.forum.attribute('minPrimaryTags');
                        this.maxPrimary = app.forum.attribute('maxPrimaryTags');
                        this.minSecondary = app.forum.attribute('minSecondaryTags');
                        this.maxSecondary = app.forum.attribute('maxSecondaryTags');

                        // If primary tags are disabled, don't offer them
                        if (this.maxPrimary <= 0) {
                            this.tags = this.tags.filter(function (tag) {
                                return !tag.isPrimary();
                            });
                        }

                        // If secondary tags are disabled, don't offer them
                        if (this.maxSecondary <= 0) {
                            this.tags = this.tags.filter(function (tag) {
                                return tag.isPrimary();
                            });
                        }

                        this.tags = sortTags(this.tags);
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this3 = this;

                        if (this.maxPrimary > 1 || this.maxSecondary > 1) {
                            return m('.Alert', app.translator.trans('flagrow-mason.forum.tags.inadequate-settings'));
                        }

                        // We take the first child selected or if none, the first parent selected
                        // Of course this only works if a single tag or tag+parent is selected
                        // Multiple tags are not supported on this selector
                        var currentSelectedChild = this.selectedTags.length ? this.selectedTags.sort(function (tag) {
                            return tag.parent() ? -1 : 1;
                        })[0].id() : null;

                        var required = this.fieldRequired();

                        return m('.Mason-Field.Form-group', {
                            className: app.forum.attribute('flagrow.mason.labels-as-placeholders') ? 'Mason-Field--label-as-placeholder' : ''
                        }, [m('label', this.fieldLabel()), m('span.Select', [m('select.Select-input.FormControl', {
                            onchange: m.withAttr('value', function (id) {
                                _this3.selectedTags = [];

                                if (id !== 'none') {
                                    _this3.selectedTags.push(_this3.tags.find(function (tag) {
                                        return tag.id() === id;
                                    }));

                                    var parent = _this3.selectedTags[0].parent();
                                    if (parent) {
                                        _this3.selectedTags.push(parent);
                                    }
                                }

                                _this3.props.onchange(_this3.selectedTags);
                            })
                        }, [m('option', {
                            value: 'none',
                            selected: this.selectedTags.length === 0,
                            disabled: required,
                            hidden: this.placeholderHidden()
                        }, this.selectPlaceholder()), this.tags.map(function (tag) {
                            var parent = tag.parent();

                            return m('option', {
                                value: tag.id(),
                                selected: tag.id() === currentSelectedChild
                            }, (parent ? parent.name() + ' | ' : '') + tag.name());
                        })]), icon('sort', { className: 'Select-caret' })])]);
                    }
                }, {
                    key: 'fieldRequired',
                    value: function fieldRequired() {
                        return this.minPrimary > 0 || this.minSecondary > 0;
                    }
                }, {
                    key: 'fieldLabel',
                    value: function fieldLabel() {
                        var text = app.forum.attribute('flagrow.mason.tags-field-name') || app.translator.trans('flagrow-mason.forum.tags.tags-label');

                        if (this.fieldRequired()) {
                            text += ' *';
                        }

                        return text;
                    }
                }, {
                    key: 'placeholderHidden',
                    value: function placeholderHidden() {
                        if (app.forum.attribute('flagrow.mason.labels-as-placeholders')) {
                            return false;
                        }

                        return this.fieldRequired();
                    }
                }, {
                    key: 'selectPlaceholder',
                    value: function selectPlaceholder() {
                        var text = '';

                        if (app.forum.attribute('flagrow.mason.labels-as-placeholders')) {
                            text += this.fieldLabel() + ' - ';
                        }

                        if (this.fieldRequired()) {
                            text += app.translator.trans('flagrow-mason.forum.answers.choose-option');
                        } else {
                            text += app.translator.trans('flagrow-mason.forum.answers.no-option-selected');
                        }

                        return text;
                    }
                }]);
                return DiscussionFields;
            }(Component);

            _export('default', DiscussionFields);
        }
    };
});;
'use strict';

System.register('flagrow/mason/components/FieldEditText', ['flarum/app', 'flarum/Model', 'flarum/Component'], function (_export, _context) {
    "use strict";

    var app, Model, Component, FieldEditText;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }],
        execute: function () {
            FieldEditText = function (_Component) {
                babelHelpers.inherits(FieldEditText, _Component);

                function FieldEditText() {
                    babelHelpers.classCallCheck(this, FieldEditText);
                    return babelHelpers.possibleConstructorReturn(this, (FieldEditText.__proto__ || Object.getPrototypeOf(FieldEditText)).apply(this, arguments));
                }

                babelHelpers.createClass(FieldEditText, [{
                    key: 'init',
                    value: function init() {
                        var _this2 = this;

                        this.field = this.props.field;
                        this.answers = this.props.answers;
                        this.onchange = this.props.onchange;

                        this.content = '';

                        var answersForThisField = this.answers.filter(function (answer) {
                            // Temporary store entries seem to turn into undefined after saving
                            if (typeof answer === 'undefined') {
                                return false;
                            }

                            return answer.field().id() === _this2.field.id();
                        });

                        if (answersForThisField.length) {
                            // For now we only support a single custom answer
                            this.content = answersForThisField[0].content();
                        }
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this3 = this;

                        return m('input.FormControl', {
                            required: this.field.required(),
                            value: this.content,
                            oninput: m.withAttr('value', function (value) {
                                _this3.content = value;

                                if (_this3.content === '') {
                                    _this3.onchange([]);
                                } else {
                                    var answer = app.store.createRecord('flagrow-mason-answer', {
                                        attributes: {
                                            content: _this3.content
                                        },
                                        relationships: {
                                            field: {
                                                data: Model.getIdentifier(_this3.field)
                                            }
                                        }
                                    });

                                    _this3.onchange([answer]);
                                }
                            }),
                            placeholder: this.fieldPlaceholder()
                        });
                    }
                }, {
                    key: 'fieldPlaceholder',
                    value: function fieldPlaceholder() {
                        if (app.forum.attribute('flagrow.mason.labels-as-placeholders')) {
                            return this.field.name() + (this.field.required() ? ' *' : '');
                        }

                        return '';
                    }
                }]);
                return FieldEditText;
            }(Component);

            _export('default', FieldEditText);
        }
    };
});;
'use strict';

System.register('flagrow/mason/components/FieldGrid', ['flarum/app', 'flarum/Component', 'flagrow/mason/helpers/chunkArray'], function (_export, _context) {
    "use strict";

    var app, Component, chunkArray, FieldGrid;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flagrowMasonHelpersChunkArray) {
            chunkArray = _flagrowMasonHelpersChunkArray.default;
        }],
        execute: function () {
            FieldGrid = function (_Component) {
                babelHelpers.inherits(FieldGrid, _Component);

                function FieldGrid() {
                    babelHelpers.classCallCheck(this, FieldGrid);
                    return babelHelpers.possibleConstructorReturn(this, (FieldGrid.__proto__ || Object.getPrototypeOf(FieldGrid)).apply(this, arguments));
                }

                babelHelpers.createClass(FieldGrid, [{
                    key: 'view',
                    value: function view() {
                        return m('.Mason-Grid-Wrapper', m('.Mason-Grid', chunkArray(this.props.items, app.forum.attribute('flagrow.mason.column-count')).map(function (row) {
                            return m('.Mason-Row', row.map(function (item) {
                                return m('.Mason-Column', item);
                            }));
                        })));
                    }
                }]);
                return FieldGrid;
            }(Component);

            _export('default', FieldGrid);
        }
    };
});;
'use strict';

System.register('flagrow/mason/components/PostFields', ['flarum/app', 'flarum/helpers/icon', 'flarum/utils/ItemList', 'flarum/Component', 'flarum/components/Button', 'flagrow/mason/components/DiscussionFieldsModal', 'flagrow/mason/components/FieldGrid', 'flagrow/mason/helpers/sortByAttribute'], function (_export, _context) {
    "use strict";

    var app, icon, ItemList, Component, Button, DiscussionFieldsModal, FieldGrid, sortByAttribute, PostFields;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }, function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowMasonComponentsDiscussionFieldsModal) {
            DiscussionFieldsModal = _flagrowMasonComponentsDiscussionFieldsModal.default;
        }, function (_flagrowMasonComponentsFieldGrid) {
            FieldGrid = _flagrowMasonComponentsFieldGrid.default;
        }, function (_flagrowMasonHelpersSortByAttribute) {
            sortByAttribute = _flagrowMasonHelpersSortByAttribute.default;
        }],
        execute: function () {
            PostFields = function (_Component) {
                babelHelpers.inherits(PostFields, _Component);

                function PostFields() {
                    babelHelpers.classCallCheck(this, PostFields);
                    return babelHelpers.possibleConstructorReturn(this, (PostFields.__proto__ || Object.getPrototypeOf(PostFields)).apply(this, arguments));
                }

                babelHelpers.createClass(PostFields, [{
                    key: 'init',
                    value: function init() {
                        this.fields = sortByAttribute(app.store.all('flagrow-mason-field'));
                        this.discussion = this.props.discussion;
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this2 = this;

                        return m('.Mason-Fields.Mason-Fields--viewer', [this.headItems().toArray(), FieldGrid.component({
                            items: this.fields.map(function (field) {
                                // Discussion answers to this field
                                var answers = sortByAttribute(_this2.discussion.flagrowMasonAnswers().filter(function (answer) {
                                    // It's necessary to compare the field() relationship
                                    // Because field.suggested_answers() won't contain new and user answers
                                    return answer.field().id() === field.id();
                                }));

                                var answer_list = answers.map(function (answer) {
                                    return m('span.Mason-Inline-Answer', answer.content());
                                });

                                if (answers.length === 0) {
                                    if (field.show_when_empty()) {
                                        answer_list.push(m('em.Mason-Inline-Answer', app.translator.trans('flagrow-mason.forum.post-answers.no-answer')));
                                    } else {
                                        // If the field has no answer and the setting is off we don't show it
                                        return null;
                                    }
                                }

                                return m('.Mason-Field.Form-group', [m('label', [field.icon() ? [icon(field.icon()), ' '] : null, field.name()]), m('.FormControl.Mason-Inline-Answers', answer_list)]);
                            })
                        })]);
                    }
                }, {
                    key: 'headItems',
                    value: function headItems() {
                        var _this3 = this;

                        var items = new ItemList();

                        if (this.discussion.canUpdateFlagrowMasonAnswers()) {
                            items.add('edit', Button.component({
                                className: 'Button Mason-Fields--edit',
                                children: app.translator.trans('flagrow-mason.forum.discussion-controls.edit-answers'),
                                icon: 'pencil',
                                onclick: function onclick() {
                                    return app.modal.show(new DiscussionFieldsModal({
                                        discussion: _this3.discussion
                                    }));
                                }
                            }));
                        }

                        if (app.forum.attribute('flagrow.mason.fields-section-title')) {
                            items.add('title', m('h5.Mason-Field--title', app.forum.attribute('flagrow.mason.fields-section-title')));
                        }

                        return items;
                    }
                }]);
                return PostFields;
            }(Component);

            _export('default', PostFields);
        }
    };
});;
"use strict";

System.register("flagrow/mason/helpers/chunkArray", [], function (_export, _context) {
    "use strict";

    _export("default", function (items, itemsPerChunk) {
        var R = [];
        for (var i = 0; i < items.length; i += itemsPerChunk) {
            R.push(items.slice(i, i + itemsPerChunk));
        }
        return R;
    });

    return {
        setters: [],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/mason/helpers/sortByAttribute', [], function (_export, _context) {
    "use strict";

    _export('default', function (items) {
        var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'sort';

        return items.sort(function (a, b) {
            return a[attr]() - b[attr]();
        });
    });

    return {
        setters: [],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/mason/main', ['flarum/app', 'flarum/Model', 'flarum/models/Discussion', 'flagrow/mason/models/Answer', 'flagrow/mason/models/Field', 'flagrow/mason/addComposerFields', 'flagrow/mason/addFieldUpdateControl', 'flagrow/mason/addFieldsOnDiscussionHero', 'flagrow/mason/addFieldsOnDiscussionPost', 'flagrow/mason/patchModelIdentifier'], function (_export, _context) {
    "use strict";

    var app, Model, Discussion, Answer, Field, addComposerFields, addFieldUpdateControl, addFieldsOnDiscussionHero, addFieldsOnDiscussionPost, patchModelIdentifier;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumModelsDiscussion) {
            Discussion = _flarumModelsDiscussion.default;
        }, function (_flagrowMasonModelsAnswer) {
            Answer = _flagrowMasonModelsAnswer.default;
        }, function (_flagrowMasonModelsField) {
            Field = _flagrowMasonModelsField.default;
        }, function (_flagrowMasonAddComposerFields) {
            addComposerFields = _flagrowMasonAddComposerFields.default;
        }, function (_flagrowMasonAddFieldUpdateControl) {
            addFieldUpdateControl = _flagrowMasonAddFieldUpdateControl.default;
        }, function (_flagrowMasonAddFieldsOnDiscussionHero) {
            addFieldsOnDiscussionHero = _flagrowMasonAddFieldsOnDiscussionHero.default;
        }, function (_flagrowMasonAddFieldsOnDiscussionPost) {
            addFieldsOnDiscussionPost = _flagrowMasonAddFieldsOnDiscussionPost.default;
        }, function (_flagrowMasonPatchModelIdentifier) {
            patchModelIdentifier = _flagrowMasonPatchModelIdentifier.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-mason', function (app) {
                app.store.models['flagrow-mason-field'] = Field;
                app.store.models['flagrow-mason-answer'] = Answer;

                Discussion.prototype.flagrowMasonAnswers = Model.hasMany('flagrowMasonAnswers');
                Discussion.prototype.canUpdateFlagrowMasonAnswers = Model.attribute('canUpdateFlagrowMasonAnswers');

                addComposerFields();
                addFieldsOnDiscussionHero();
                addFieldsOnDiscussionPost();
                addFieldUpdateControl();
                patchModelIdentifier();
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
                        return '/flagrow/mason/answers' + (this.exists ? '/' + this.data.id : '');
                    }
                }]);
                return Answer;
            }(mixin(Model, {
                content: Model.attribute('content'),
                is_suggested: Model.attribute('is_suggested'),
                sort: Model.attribute('sort'),
                field: Model.hasOne('field')
            }));

            _export('default', Answer);
        }
    };
});;
'use strict';

System.register('flagrow/mason/models/Field', ['flarum/app', 'flarum/Model', 'flarum/utils/mixin', 'flarum/utils/computed'], function (_export, _context) {
    "use strict";

    var app, Model, mixin, computed, Field;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsMixin) {
            mixin = _flarumUtilsMixin.default;
        }, function (_flarumUtilsComputed) {
            computed = _flarumUtilsComputed.default;
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
                        return '/flagrow/mason/fields' + (this.exists ? '/' + this.data.id : '');
                    }
                }]);
                return Field;
            }(mixin(Model, {
                name: Model.attribute('name'),
                description: Model.attribute('description'),
                min_answers_count: Model.attribute('min_answers_count'),
                max_answers_count: Model.attribute('max_answers_count'),
                show_when_empty: Model.attribute('show_when_empty'),
                user_values_allowed: Model.attribute('user_values_allowed'),
                validation: Model.attribute('validation'),
                icon: Model.attribute('icon'),
                sort: Model.attribute('sort'),
                deleted_at: Model.attribute('deleted_at', Model.transformDate),
                all_answers: Model.hasMany('all_answers'),
                suggested_answers: Model.hasMany('suggested_answers'),
                required: computed('min_answers_count', function (min_answers_count) {
                    return min_answers_count > 0;
                }),
                multiple: computed('max_answers_count', function (max_answers_count) {
                    return max_answers_count > 1;
                })
            }));

            _export('default', Field);
        }
    };
});;
'use strict';

System.register('flagrow/mason/patchModelIdentifier', ['flarum/extend', 'flarum/Model', 'flagrow/mason/models/Answer'], function (_export, _context) {
    "use strict";

    var override, Model, Answer;

    _export('default', function () {
        override(Model, 'getIdentifier', function (original, model) {
            // For Answers that don't yet exist, we include the content and the field relationship when calling the API
            // That way they can be created server-side without making individual API requests for each answer
            if (model instanceof Answer && !model.exists) {
                return {
                    type: model.data.type,
                    attributes: {
                        content: model.data.attributes.content
                    },
                    relationships: {
                        field: {
                            data: Model.getIdentifier(model.data.relationships.field)
                        }
                    }
                };
            }

            // Default behaviour
            return original(model);
        });
    });

    return {
        setters: [function (_flarumExtend) {
            override = _flarumExtend.override;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flagrowMasonModelsAnswer) {
            Answer = _flagrowMasonModelsAnswer.default;
        }],
        execute: function () {}
    };
});
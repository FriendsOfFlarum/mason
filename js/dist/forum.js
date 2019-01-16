module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/forum/addComposerFields.js":
/*!****************************************!*\
  !*** ./src/forum/addComposerFields.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/DiscussionComposer */ "flarum/components/DiscussionComposer");
/* harmony import */ var flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_FieldsEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/FieldsEditor */ "./src/forum/components/FieldsEditor.js");



/* harmony default export */ __webpack_exports__["default"] = (function () {
  flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.flagrowMasonAnswers = [];
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'headerItems', function (items) {
    var _this = this;

    items.add('flagrow-mason-fields', _components_FieldsEditor__WEBPACK_IMPORTED_MODULE_2__["default"].component({
      answers: this.flagrowMasonAnswers,
      onchange: function onchange(answers) {
        _this.flagrowMasonAnswers = answers;
      },
      ontagchange: function ontagchange(tags) {
        _this.tags = tags;
      }
    }));
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionComposer__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'data', function (data) {
    data.relationships = data.relationships || {};
    data.relationships.flagrowMasonAnswers = this.flagrowMasonAnswers;
  });
});

/***/ }),

/***/ "./src/forum/addFieldUpdateControl.js":
/*!********************************************!*\
  !*** ./src/forum/addFieldUpdateControl.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_utils_DiscussionControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/utils/DiscussionControls */ "flarum/utils/DiscussionControls");
/* harmony import */ var flarum_utils_DiscussionControls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_DiscussionControls__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_FieldsEditorModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/FieldsEditorModal */ "./src/forum/components/FieldsEditorModal.js");




/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_utils_DiscussionControls__WEBPACK_IMPORTED_MODULE_1___default.a, 'moderationControls', function (items, discussion) {
    if (discussion.canUpdateFlagrowMasonAnswers()) {
      items.add('flagrow-mason-update-answers', flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        children: app.translator.trans('flagrow-mason.forum.discussion-controls.edit-answers'),
        icon: 'tag',
        onclick: function onclick() {
          return app.modal.show(new _components_FieldsEditorModal__WEBPACK_IMPORTED_MODULE_3__["default"]({
            discussion: discussion
          }));
        }
      }));
    }
  });
});

/***/ }),

/***/ "./src/forum/addFieldsOnDiscussionHero.js":
/*!************************************************!*\
  !*** ./src/forum/addFieldsOnDiscussionHero.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_DiscussionHero__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/DiscussionHero */ "flarum/components/DiscussionHero");
/* harmony import */ var flarum_components_DiscussionHero__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_DiscussionHero__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_FieldsViewer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/FieldsViewer */ "./src/forum/components/FieldsViewer.js");




/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_DiscussionHero__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'items', function (items) {
    if (!flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.fields-in-hero')) {
      return;
    }

    items.add('flagrow-mason-fields', _components_FieldsViewer__WEBPACK_IMPORTED_MODULE_3__["default"].component({
      discussion: this.props.discussion
    }));
  });
});

/***/ }),

/***/ "./src/forum/addFieldsOnDiscussionPost.js":
/*!************************************************!*\
  !*** ./src/forum/addFieldsOnDiscussionPost.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/CommentPost */ "flarum/components/CommentPost");
/* harmony import */ var flarum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_FieldsViewer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/FieldsViewer */ "./src/forum/components/FieldsViewer.js");





function showFieldsOnPost(post) {
  // We only add fields to the first post, and only if fields are not displayed in the hero
  // TODO: what if the first post is deleted ?
  return post.number() === 1 && !flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.fields-in-hero');
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'init', function () {
    var _this = this;

    this.subtree.check(function () {
      if (showFieldsOnPost(_this.props.post)) {
        // Create a string with all answer ids
        // If answers change this string will be different
        return _this.props.post.discussion().flagrowMasonAnswers().map(function (answer) {
          return answer.id();
        }).join(',');
      } // For other posts we always return the same thing


      return '';
    });
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_CommentPost__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'content', function (content) {
    if (!showFieldsOnPost(this.props.post)) {
      return;
    }

    var postHeaderIndex = content.findIndex(function (item) {
      return item.attrs && item.attrs.className === 'Post-header';
    }); // Insert the new content just after the header
    // or at the very beginning if the header is not found

    content.splice(postHeaderIndex === -1 ? 0 : postHeaderIndex + 1, 0, _components_FieldsViewer__WEBPACK_IMPORTED_MODULE_3__["default"].component({
      discussion: this.props.post.discussion()
    }));
  });
});

/***/ }),

/***/ "./src/forum/components/FieldEditDropdown.js":
/*!***************************************************!*\
  !*** ./src/forum/components/FieldEditDropdown.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FieldEditDropdown; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../lib/helpers/sortByAttribute */ "./src/lib/helpers/sortByAttribute.js");






var FieldEditDropdown =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FieldEditDropdown, _Component);

  function FieldEditDropdown() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FieldEditDropdown.prototype;

  _proto.init = function init() {
    this.field = this.props.field;
    this.answers = this.props.answers;
    this.onchange = this.props.onchange;
  };

  _proto.view = function view() {
    var _this = this;

    var selectedAnswerIdsForThisField = [];
    this.field.suggested_answers().forEach(function (answer) {
      var answerIndex = _this.answers.findIndex(function (a) {
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

        for (var _iterator = event.target.options, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var option = _ref;

          if (option.selected && option.value !== 'none') {
            var answerId = option.value; // This will only work with suggested answers for now
            // As they are the only ones registered in the store

            answers.push(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.getById('flagrow-mason-answer', answerId));
          }
        }

        _this.onchange(answers);
      }
    }, [this.field.multiple() ? null : m('option', {
      value: 'none',
      selected: selectedAnswerIdsForThisField.length === 0,
      disabled: this.field.required(),
      hidden: this.placeholderHidden()
    }, this.selectPlaceholder()), Object(_lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_4__["default"])(this.field.suggested_answers()).map(function (answer) {
      return m('option', {
        value: answer.id(),
        selected: selectedAnswerIdsForThisField.indexOf(answer.id()) !== -1
      }, answer.content());
    })]), flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()('sort', {
      className: 'Select-caret'
    })]);
  };

  _proto.placeholderHidden = function placeholderHidden() {
    // If labels are hidden, we need to always show the default value (even if it can't be selected)
    // Otherwise when the field is "required" you can't find the name of the field anymore once something is selected
    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.labels-as-placeholders')) {
      return false;
    }

    return this.field.required();
  };

  _proto.selectPlaceholder = function selectPlaceholder() {
    var text = '';

    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.labels-as-placeholders')) {
      text += this.field.name();

      if (this.field.required()) {
        text += ' *';
      }

      text += ' - ';
    }

    if (this.field.required()) {
      text += flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.forum.answers.choose-option');
    } else {
      text += flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.forum.answers.no-option-selected');
    }

    return text;
  };

  return FieldEditDropdown;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "./src/forum/components/FieldEditTags.js":
/*!***********************************************!*\
  !*** ./src/forum/components/FieldEditTags.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DiscussionFields; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_tags_utils_sortTags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/tags/utils/sortTags */ "flarum/tags/utils/sortTags");
/* harmony import */ var flarum_tags_utils_sortTags__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_tags_utils_sortTags__WEBPACK_IMPORTED_MODULE_4__);






var DiscussionFields =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(DiscussionFields, _Component);

  function DiscussionFields() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = DiscussionFields.prototype;

  _proto.init = function init() {
    var _this = this;

    this.tags = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.all('tags');
    this.selectedTags = [];

    if (this.props.discussion) {
      this.tags = this.tags.filter(function (tag) {
        return tag.canAddToDiscussion() || _this.props.discussion.tags().indexOf(tag) !== -1;
      });
      this.selectedTags = this.props.discussion.tags();
    } else {
      this.tags = this.tags.filter(function (tag) {
        return tag.canStartDiscussion();
      });
    }

    this.minPrimary = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('minPrimaryTags');
    this.maxPrimary = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('maxPrimaryTags');
    this.minSecondary = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('minSecondaryTags');
    this.maxSecondary = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('maxSecondaryTags'); // If primary tags are disabled, don't offer them

    if (this.maxPrimary <= 0) {
      this.tags = this.tags.filter(function (tag) {
        return !tag.isPrimary();
      });
    } // If secondary tags are disabled, don't offer them


    if (this.maxSecondary <= 0) {
      this.tags = this.tags.filter(function (tag) {
        return tag.isPrimary();
      });
    }

    this.tags = flarum_tags_utils_sortTags__WEBPACK_IMPORTED_MODULE_4___default()(this.tags);
  };

  _proto.view = function view() {
    var _this2 = this;

    if (this.maxPrimary > 1 || this.maxSecondary > 1) {
      return m('.Alert', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.forum.tags.inadequate-settings'));
    } // We take the first child selected or if none, the first parent selected
    // Of course this only works if a single tag or tag+parent is selected
    // Multiple tags are not supported on this selector


    var currentSelectedChild = this.selectedTags.length ? this.selectedTags.sort(function (tag) {
      return tag.parent() ? -1 : 1;
    })[0].id() : null;
    var required = this.fieldRequired();
    return m('.Mason-Field.Form-group', {
      className: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.labels-as-placeholders') ? 'Mason-Field--label-as-placeholder' : ''
    }, [m('label', this.fieldLabel()), m('span.Select', [m('select.Select-input.FormControl', {
      onchange: m.withAttr('value', function (id) {
        _this2.selectedTags = [];

        if (id !== 'none') {
          _this2.selectedTags.push(_this2.tags.find(function (tag) {
            return tag.id() === id;
          }));

          var parent = _this2.selectedTags[0].parent();

          if (parent) {
            _this2.selectedTags.push(parent);
          }
        }

        _this2.props.onchange(_this2.selectedTags);
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
    })]), flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()('sort', {
      className: 'Select-caret'
    })])]);
  };

  _proto.fieldRequired = function fieldRequired() {
    return this.minPrimary > 0 || this.minSecondary > 0;
  };

  _proto.fieldLabel = function fieldLabel() {
    var text = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.tags-field-name') || flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.forum.tags.tags-label');

    if (this.fieldRequired()) {
      text += ' *';
    }

    return text;
  };

  _proto.placeholderHidden = function placeholderHidden() {
    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.labels-as-placeholders')) {
      return false;
    }

    return this.fieldRequired();
  };

  _proto.selectPlaceholder = function selectPlaceholder() {
    var text = '';

    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.labels-as-placeholders')) {
      text += this.fieldLabel() + ' - ';
    }

    if (this.fieldRequired()) {
      text += flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.forum.answers.choose-option');
    } else {
      text += flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.forum.answers.no-option-selected');
    }

    return text;
  };

  return DiscussionFields;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "./src/forum/components/FieldEditText.js":
/*!***********************************************!*\
  !*** ./src/forum/components/FieldEditText.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FieldEditText; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_3__);





var FieldEditText =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FieldEditText, _Component);

  function FieldEditText() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FieldEditText.prototype;

  _proto.init = function init() {
    var _this = this;

    this.field = this.props.field;
    this.answers = this.props.answers;
    this.onchange = this.props.onchange;
    this.content = '';
    var answersForThisField = this.answers.filter(function (answer) {
      // Temporary store entries seem to turn into undefined after saving
      if (typeof answer === 'undefined') {
        return false;
      }

      return answer.field().id() === _this.field.id();
    });

    if (answersForThisField.length) {
      // For now we only support a single custom answer
      this.content = answersForThisField[0].content();
    }
  };

  _proto.view = function view() {
    var _this2 = this;

    return m('input.FormControl', {
      required: this.field.required(),
      value: this.content,
      oninput: m.withAttr('value', function (value) {
        _this2.content = value;

        if (_this2.content === '') {
          _this2.onchange([]);
        } else {
          var answer = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.createRecord('flagrow-mason-answer', {
            attributes: {
              content: _this2.content
            },
            relationships: {
              field: {
                data: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.getIdentifier(_this2.field)
              }
            }
          });

          _this2.onchange([answer]);
        }
      }),
      placeholder: this.fieldPlaceholder()
    });
  };

  _proto.fieldPlaceholder = function fieldPlaceholder() {
    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.labels-as-placeholders')) {
      return this.field.name() + (this.field.required() ? ' *' : '');
    }

    return '';
  };

  return FieldEditText;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "./src/forum/components/FieldGrid.js":
/*!*******************************************!*\
  !*** ./src/forum/components/FieldGrid.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FieldGrid; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_chunkArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../helpers/chunkArray */ "./src/forum/helpers/chunkArray.js");





var FieldGrid =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FieldGrid, _Component);

  function FieldGrid() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FieldGrid.prototype;

  _proto.view = function view() {
    return m('.Mason-Grid-Wrapper', m('.Mason-Grid', Object(_helpers_chunkArray__WEBPACK_IMPORTED_MODULE_3__["default"])(this.props.items, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.column-count')).map(function (row) {
      return m('.Mason-Row', row.map(function (item) {
        return m('.Mason-Column', item);
      }));
    })));
  };

  return FieldGrid;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/components/FieldsEditor.js":
/*!**********************************************!*\
  !*** ./src/forum/components/FieldsEditor.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FieldsEditor; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../lib/helpers/sortByAttribute */ "./src/lib/helpers/sortByAttribute.js");
/* harmony import */ var _FieldEditDropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FieldEditDropdown */ "./src/forum/components/FieldEditDropdown.js");
/* harmony import */ var _FieldEditText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FieldEditText */ "./src/forum/components/FieldEditText.js");
/* harmony import */ var _FieldEditTags__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FieldEditTags */ "./src/forum/components/FieldEditTags.js");
/* harmony import */ var _FieldGrid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./FieldGrid */ "./src/forum/components/FieldGrid.js");











var FieldsEditor =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FieldsEditor, _Component);

  function FieldsEditor() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FieldsEditor.prototype;

  _proto.init = function init() {
    var _this = this;

    this.fields = Object(_lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_5__["default"])(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.all('flagrow-mason-field')); // Index to quickly do a reverse lookup from answer to field

    this.answerToFieldIndex = [];
    this.fields.forEach(function (field) {
      field.suggested_answers().forEach(function (answer) {
        _this.answerToFieldIndex[answer.id()] = field.id();
      });
    });
  };

  _proto.view = function view() {
    return m('form.Mason-Fields.Mason-Fields--editor', {
      onsubmit: function onsubmit(event) {
        event.preventDefault();
      }
    }, [this.headItems().toArray(), _FieldGrid__WEBPACK_IMPORTED_MODULE_9__["default"].component({
      items: this.fieldItems().toArray()
    })]);
  };

  _proto.updateSelection = function updateSelection(field, fieldAnswers) {
    var _this2 = this;

    // Keep only answers to other fields
    var answers = this.props.answers.filter(function (answer) {
      var reverseFieldLookup = _this2.answerToFieldIndex[answer.id()]; // If the answer is not in the reverse lookup table it's probably a non-suggested (user) answer
      // In that case the field should be linked in the relationship


      if (typeof reverseFieldLookup === 'undefined') {
        return answer.field().id() !== field.id();
      }

      return reverseFieldLookup !== field.id();
    });
    answers = answers.concat(fieldAnswers);
    this.props.onchange(answers);
  };

  _proto.headItems = function headItems() {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();

    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.fields-section-title')) {
      items.add('title', m('h5.Mason-Field--title', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.fields-section-title')));
    }

    return items;
  };

  _proto.fieldItems = function fieldItems() {
    var _this3 = this;

    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();

    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.tags-as-fields')) {
      items.add('tags', _FieldEditTags__WEBPACK_IMPORTED_MODULE_8__["default"].component({
        discussion: this.props.discussion,
        onchange: function onchange(tags) {
          if (_this3.props.ontagchange) {
            _this3.props.ontagchange(tags);
          }
        }
      }));
    }

    this.fields.forEach(function (field) {
      var inputAttrs = {
        field: field,
        answers: _this3.props.answers,
        onchange: function onchange(fieldAnswers) {
          // Every input component calls "onchange" with a list of answers from the store
          _this3.updateSelection(field, fieldAnswers);
        }
      };
      var input = null;

      if (field.user_values_allowed()) {
        input = _FieldEditText__WEBPACK_IMPORTED_MODULE_7__["default"].component(inputAttrs);
      } else {
        input = _FieldEditDropdown__WEBPACK_IMPORTED_MODULE_6__["default"].component(inputAttrs);
      }

      items.add('field-' + field.id(), m('.Mason-Field.Form-group', {
        className: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.labels-as-placeholders') ? 'Mason-Field--label-as-placeholder' : ''
      }, [m('label', [field.icon() ? [flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()(field.icon()), ' '] : null, field.name(), field.required() ? ' *' : null]), input, field.description() ? m('.helpText', field.description()) : null]));
    });
    return items;
  };

  return FieldsEditor;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_4___default.a);



/***/ }),

/***/ "./src/forum/components/FieldsEditorModal.js":
/*!***************************************************!*\
  !*** ./src/forum/components/FieldsEditorModal.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FieldsEditorModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _FieldsEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FieldsEditor */ "./src/forum/components/FieldsEditor.js");






var FieldsEditorModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FieldsEditorModal, _Modal);

  function FieldsEditorModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = FieldsEditorModal.prototype;

  _proto.init = function init() {
    _Modal.prototype.init.call(this);

    this.answers = this.props.discussion.flagrowMasonAnswers();
    this.dirty = false;
    this.processing = false; // Stays null if the feature is not used

    this.tags = null;
  };

  _proto.title = function title() {
    return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.forum.answers-modal.edit-title', {
      title: m('em', this.props.discussion.title())
    });
  };

  _proto.content = function content() {
    var _this = this;

    return [m('.Modal-body', _FieldsEditor__WEBPACK_IMPORTED_MODULE_4__["default"].component({
      discussion: this.props.discussion,
      // Only for the tags feature
      answers: this.answers,
      onchange: this.answersChanged.bind(this),
      ontagchange: function ontagchange(tags) {
        _this.tags = tags;
        _this.dirty = true;
      }
    })), m('.Modal-footer', [flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      className: 'Button Button--primary',
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.forum.answers-modal.save'),
      loading: this.processing,
      disabled: !this.dirty,
      onclick: this.saveAnswers.bind(this)
    })])];
  };

  _proto.answersChanged = function answersChanged(answers) {
    this.answers = answers;
    this.dirty = true;
  };

  _proto.saveAnswers = function saveAnswers() {
    var _this2 = this;

    this.processing = true;
    var relationships = {
      flagrowMasonAnswers: this.answers
    }; // If tag edit is enabled, take care of them here as well

    if (this.tags !== null) {
      relationships.tags = this.tags;
    }

    this.props.discussion.save({
      relationships: relationships
    }).then(function () {
      _this2.processing = false;
      flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.close();
      m.redraw();
    }).catch(function (err) {
      _this2.processing = false;
      throw err;
    });
  };

  return FieldsEditorModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/components/FieldsViewer.js":
/*!**********************************************!*\
  !*** ./src/forum/components/FieldsViewer.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FieldsViewer; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _FieldsEditorModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FieldsEditorModal */ "./src/forum/components/FieldsEditorModal.js");
/* harmony import */ var _FieldGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FieldGrid */ "./src/forum/components/FieldGrid.js");
/* harmony import */ var _lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../lib/helpers/sortByAttribute */ "./src/lib/helpers/sortByAttribute.js");










var FieldsViewer =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FieldsViewer, _Component);

  function FieldsViewer() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FieldsViewer.prototype;

  _proto.init = function init() {
    this.fields = Object(_lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_8__["default"])(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.all('flagrow-mason-field'));
    this.discussion = this.props.discussion;
  };

  _proto.view = function view() {
    var head = this.headItems().toArray();
    var fields = this.fieldsItems().toArray(); // If all fields are hidden
    // And either no controls are shown or the setting hides them
    // We don't show the viewer

    if (!fields.length && (!head.length || flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.hide-empty-fields-section'))) {
      // We need to return an actual dom element or Flarum does not like it
      return m('div');
    }

    return m('.Mason-Fields.Mason-Fields--viewer', [head, _FieldGrid__WEBPACK_IMPORTED_MODULE_7__["default"].component({
      items: fields
    })]);
  };

  _proto.headItems = function headItems() {
    var _this = this;

    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();

    if (this.discussion.canUpdateFlagrowMasonAnswers()) {
      items.add('edit', flarum_components_Button__WEBPACK_IMPORTED_MODULE_5___default.a.component({
        className: 'Button Mason-Fields--edit',
        children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.forum.discussion-controls.edit-answers'),
        icon: 'pencil',
        onclick: function onclick() {
          return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.modal.show(new _FieldsEditorModal__WEBPACK_IMPORTED_MODULE_6__["default"]({
            discussion: _this.discussion
          }));
        }
      }));
    }

    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.fields-section-title')) {
      items.add('title', m('h5.Mason-Field--title', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('flagrow.mason.fields-section-title')));
    }

    return items;
  };

  _proto.fieldsItems = function fieldsItems() {
    var _this2 = this;

    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_3___default.a();
    this.fields.forEach(function (field) {
      // Discussion answers to this field
      var answers = Object(_lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_8__["default"])(_this2.discussion.flagrowMasonAnswers().filter(function (answer) {
        // It's necessary to compare the field() relationship
        // Because field.suggested_answers() won't contain new and user answers
        return answer.field().id() === field.id();
      }));
      var answer_list = answers.map(function (answer) {
        return m('span.Mason-Inline-Answer', answer.content());
      });

      if (answers.length === 0) {
        if (field.show_when_empty()) {
          answer_list.push(m('em.Mason-Inline-Answer', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.forum.post-answers.no-answer')));
        } else {
          // If the field has no answer and the setting is off we don't show it
          return;
        }
      }

      items.add('field-' + field.id(), m('.Mason-Field.Form-group', [m('label', [field.icon() ? [flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()(field.icon()), ' '] : null, field.name()]), m('.FormControl.Mason-Inline-Answers', answer_list)]));
    });
    return items;
  };

  return FieldsViewer;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_4___default.a);



/***/ }),

/***/ "./src/forum/helpers/chunkArray.js":
/*!*****************************************!*\
  !*** ./src/forum/helpers/chunkArray.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Split an array into multiple arrays of a given size
 * Useful for grid layouts
 * @see https://stackoverflow.com/a/10456644/3133038
 * @param {Array} items
 * @param {number} itemsPerChunk
 * @returns {Array}
 */
/* harmony default export */ __webpack_exports__["default"] = (function (items, itemsPerChunk) {
  var R = [];

  for (var i = 0; i < items.length; i += itemsPerChunk) {
    R.push(items.slice(i, i + itemsPerChunk));
  }

  return R;
});

/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/models/Discussion */ "flarum/models/Discussion");
/* harmony import */ var flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_models_Answer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../lib/models/Answer */ "./src/lib/models/Answer.js");
/* harmony import */ var _lib_models_Field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../lib/models/Field */ "./src/lib/models/Field.js");
/* harmony import */ var _addComposerFields__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./addComposerFields */ "./src/forum/addComposerFields.js");
/* harmony import */ var _addFieldUpdateControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./addFieldUpdateControl */ "./src/forum/addFieldUpdateControl.js");
/* harmony import */ var _addFieldsOnDiscussionHero__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./addFieldsOnDiscussionHero */ "./src/forum/addFieldsOnDiscussionHero.js");
/* harmony import */ var _addFieldsOnDiscussionPost__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addFieldsOnDiscussionPost */ "./src/forum/addFieldsOnDiscussionPost.js");
/* harmony import */ var _patchModelIdentifier__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./patchModelIdentifier */ "./src/forum/patchModelIdentifier.js");










flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializers.add('flagrow-mason', function (app) {
  app.store.models['flagrow-mason-field'] = _lib_models_Field__WEBPACK_IMPORTED_MODULE_4__["default"];
  app.store.models['flagrow-mason-answer'] = _lib_models_Answer__WEBPACK_IMPORTED_MODULE_3__["default"];
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.flagrowMasonAnswers = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.hasMany('flagrowMasonAnswers');
  flarum_models_Discussion__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.canUpdateFlagrowMasonAnswers = flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('canUpdateFlagrowMasonAnswers');
  Object(_addComposerFields__WEBPACK_IMPORTED_MODULE_5__["default"])();
  Object(_addFieldsOnDiscussionHero__WEBPACK_IMPORTED_MODULE_7__["default"])();
  Object(_addFieldsOnDiscussionPost__WEBPACK_IMPORTED_MODULE_8__["default"])();
  Object(_addFieldUpdateControl__WEBPACK_IMPORTED_MODULE_6__["default"])();
  Object(_patchModelIdentifier__WEBPACK_IMPORTED_MODULE_9__["default"])();
});

/***/ }),

/***/ "./src/forum/patchModelIdentifier.js":
/*!*******************************************!*\
  !*** ./src/forum/patchModelIdentifier.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_models_Answer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../lib/models/Answer */ "./src/lib/models/Answer.js");



/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["override"])(flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a, 'getIdentifier', function (original, model) {
    // For Answers that don't yet exist, we include the content and the field relationship when calling the API
    // That way they can be created server-side without making individual API requests for each answer
    if (model instanceof _lib_models_Answer__WEBPACK_IMPORTED_MODULE_2__["default"] && !model.exists) {
      return {
        type: model.data.type,
        attributes: {
          content: model.data.attributes.content
        },
        relationships: {
          field: {
            data: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.getIdentifier(model.data.relationships.field)
          }
        }
      };
    } // Default behaviour


    return original(model);
  });
});

/***/ }),

/***/ "./src/lib/helpers/sortByAttribute.js":
/*!********************************************!*\
  !*** ./src/lib/helpers/sortByAttribute.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (items, attr) {
  if (attr === void 0) {
    attr = 'sort';
  }

  return items.sort(function (a, b) {
    return a[attr]() - b[attr]();
  });
});

/***/ }),

/***/ "./src/lib/models/Answer.js":
/*!**********************************!*\
  !*** ./src/lib/models/Answer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Answer; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/mixin */ "flarum/utils/mixin");
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_3__);





var Answer =
/*#__PURE__*/
function (_mixin) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Answer, _mixin);

  function Answer() {
    return _mixin.apply(this, arguments) || this;
  }

  var _proto = Answer.prototype;

  /**
   * @inheritDoc
   */
  _proto.apiEndpoint = function apiEndpoint() {
    return '/flagrow/mason/answers' + (this.exists ? '/' + this.data.id : '');
  };

  return Answer;
}(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_3___default()(flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a, {
  content: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('content'),
  is_suggested: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('is_suggested'),
  sort: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('sort'),
  field: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.hasOne('field')
}));



/***/ }),

/***/ "./src/lib/models/Field.js":
/*!*********************************!*\
  !*** ./src/lib/models/Field.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Field; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/mixin */ "flarum/utils/mixin");
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_utils_computed__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/utils/computed */ "flarum/utils/computed");
/* harmony import */ var flarum_utils_computed__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_computed__WEBPACK_IMPORTED_MODULE_4__);






var Field =
/*#__PURE__*/
function (_mixin) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Field, _mixin);

  function Field() {
    return _mixin.apply(this, arguments) || this;
  }

  var _proto = Field.prototype;

  /**
   * @inheritDoc
   */
  _proto.apiEndpoint = function apiEndpoint() {
    return '/flagrow/mason/fields' + (this.exists ? '/' + this.data.id : '');
  };

  return Field;
}(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_3___default()(flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a, {
  name: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('name'),
  description: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('description'),
  min_answers_count: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('min_answers_count'),
  max_answers_count: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('max_answers_count'),
  show_when_empty: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('show_when_empty'),
  user_values_allowed: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('user_values_allowed'),
  validation: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('validation'),
  icon: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('icon'),
  sort: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('sort'),
  deleted_at: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.attribute('deleted_at', flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.transformDate),
  all_answers: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.hasMany('all_answers'),
  suggested_answers: flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.hasMany('suggested_answers'),
  required: flarum_utils_computed__WEBPACK_IMPORTED_MODULE_4___default()('min_answers_count', function (min_answers_count) {
    return min_answers_count > 0;
  }),
  multiple: flarum_utils_computed__WEBPACK_IMPORTED_MODULE_4___default()('max_answers_count', function (max_answers_count) {
    return max_answers_count > 1;
  })
}));



/***/ }),

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Component'];

/***/ }),

/***/ "flarum/Model":
/*!**********************************************!*\
  !*** external "flarum.core.compat['Model']" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Model'];

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/CommentPost":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['components/CommentPost']" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/CommentPost'];

/***/ }),

/***/ "flarum/components/DiscussionComposer":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['components/DiscussionComposer']" ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/DiscussionComposer'];

/***/ }),

/***/ "flarum/components/DiscussionHero":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/DiscussionHero']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/DiscussionHero'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/helpers/icon":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['helpers/icon']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/icon'];

/***/ }),

/***/ "flarum/models/Discussion":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['models/Discussion']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['models/Discussion'];

/***/ }),

/***/ "flarum/tags/utils/sortTags":
/*!************************************************************!*\
  !*** external "flarum.core.compat['tags/utils/sortTags']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['tags/utils/sortTags'];

/***/ }),

/***/ "flarum/utils/DiscussionControls":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['utils/DiscussionControls']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/DiscussionControls'];

/***/ }),

/***/ "flarum/utils/ItemList":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['utils/ItemList']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/ItemList'];

/***/ }),

/***/ "flarum/utils/computed":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['utils/computed']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/computed'];

/***/ }),

/***/ "flarum/utils/mixin":
/*!****************************************************!*\
  !*** external "flarum.core.compat['utils/mixin']" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/mixin'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map
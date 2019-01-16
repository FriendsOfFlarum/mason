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
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
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

/***/ "./src/admin/addMasonFieldsPane.js":
/*!*****************************************!*\
  !*** ./src/admin/addMasonFieldsPane.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/AdminNav */ "flarum/components/AdminNav");
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/AdminLinkButton */ "flarum/components/AdminLinkButton");
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _panes_MasonFieldsPane__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./panes/MasonFieldsPane */ "./src/admin/panes/MasonFieldsPane.js");





/* harmony default export */ __webpack_exports__["default"] = (function () {
  // create the route
  flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.routes['flagrow-mason-fields'] = {
    path: '/flagrow/mason',
    component: _panes_MasonFieldsPane__WEBPACK_IMPORTED_MODULE_4__["default"].component()
  }; // bind the route we created to the three dots settings button

  flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.extensionSettings['flagrow-mason'] = function () {
    return m.route(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.route('flagrow-mason-fields'));
  };

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'items', function (items) {
    // add the Image Upload tab to the admin navigation menu
    items.add('flagrow-mason-fields', flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      href: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.route('flagrow-mason-fields'),
      icon: 'check-square',
      children: 'Mason',
      description: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.menu.description')
    }));
  });
});

/***/ }),

/***/ "./src/admin/addPermissions.js":
/*!*************************************!*\
  !*** ./src/admin/addPermissions.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/PermissionGrid */ "flarum/components/PermissionGrid");
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'viewItems', function (items) {
    items.add('flagrow-mason-update-own-fields', {
      icon: 'check-square',
      label: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.permissions.update-own-fields'),
      permission: 'flagrow.mason.update-own-fields'
    });
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'viewItems', function (items) {
    items.add('flagrow-mason-update-other-fields', {
      icon: 'check-square',
      label: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.permissions.update-other-fields'),
      permission: 'flagrow.mason.update-other-fields',
      allowGuest: true
    });
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'viewItems', function (items) {
    items.add('flagrow-mason-skip-required-fields', {
      icon: 'check-square',
      label: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.permissions.skip-required-fields'),
      permission: 'flagrow.mason.skip-required-fields'
    });
  });
});

/***/ }),

/***/ "./src/admin/components/AnswerEdit.js":
/*!********************************************!*\
  !*** ./src/admin/components/AnswerEdit.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FieldEdit; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5__);







var FieldEdit =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FieldEdit, _Component);

  function FieldEdit() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FieldEdit.prototype;

  _proto.init = function init() {
    this.answer = this.props.answer;
    this.dirty = false;
    this.processing = false;
  };

  _proto.view = function view() {
    var _this = this;

    return m('form.Mason-Box', [// Only suggested answers can be reordered
    this.answer.is_suggested() ? [m('span.fa.fa-arrows.Mason-Box--handle.js-answer-handle'), ' '] : null, m('span', {
      onclick: function onclick() {
        var newContent = prompt('Edit content', _this.answer.content());

        if (newContent) {
          _this.updateAttribute('content', newContent);
        }
      }
    }, [this.answer.content(), ' ', flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()('pencil')]), flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default.a.component({
      state: this.answer.is_suggested(),
      onchange: function onchange(value) {
        _this.updateAttribute('is_suggested', value); // Save right away, because updating the model with immediately trigger a redraw of the UI
        // And the unsaved state won't be preserved because the AnswerEdit component changes its place


        _this.saveAnswer();
      },
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.is_suggested')
    }), m('.ButtonGroup', [flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      type: 'submit',
      className: 'Button Button--primary',
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.buttons.save-answer'),
      loading: this.processing,
      disabled: !this.readyToSave(),
      onclick: this.saveAnswer.bind(this)
    }), flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      type: 'submit',
      className: 'Button Button--danger',
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.buttons.delete-answer'),
      loading: this.processing,
      onclick: this.deleteAnswer.bind(this)
    })])]);
  };

  _proto.updateAttribute = function updateAttribute(attribute, value) {
    var _this$answer$pushAttr;

    this.answer.pushAttributes((_this$answer$pushAttr = {}, _this$answer$pushAttr[attribute] = value, _this$answer$pushAttr));
    this.dirty = true;
  };

  _proto.readyToSave = function readyToSave() {
    return this.dirty;
  };

  _proto.saveAnswer = function saveAnswer() {
    var _this2 = this;

    this.processing = true;
    this.answer.save(this.answer.data.attributes).then(function () {
      _this2.processing = false;
      _this2.dirty = false;
      m.redraw();
    }).catch(function (err) {
      _this2.processing = false;
      throw err;
    });
  };

  _proto.deleteAnswer = function deleteAnswer() {
    var _this3 = this;

    if (!confirm(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.messages.delete-answer-confirmation', {
      content: this.answer.content()
    }))) {
      return;
    }

    this.processing = true;
    this.answer.delete().then(function () {
      _this3.processing = false;
      m.redraw();
    }).catch(function (err) {
      _this3.processing = false;
      throw err;
    });
  };

  return FieldEdit;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "./src/admin/components/FieldAnswersEdit.js":
/*!**************************************************!*\
  !*** ./src/admin/components/FieldAnswersEdit.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FieldAnswersEdit; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _AnswerEdit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AnswerEdit */ "./src/admin/components/AnswerEdit.js");
/* harmony import */ var _lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../lib/helpers/sortByAttribute */ "./src/lib/helpers/sortByAttribute.js");








var FieldAnswersEdit =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FieldAnswersEdit, _Component);

  function FieldAnswersEdit() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FieldAnswersEdit.prototype;

  _proto.init = function init() {
    this.field = this.props.field;
    this.processing = false;
    this.new_content = '';
    this.showUserAnswers = false;
  };

  _proto.config = function config() {
    var _this = this;

    this.$('.js-answers-container').sortable({
      handle: '.js-answer-handle'
    }).on('sortupdate', function () {
      var sorting = _this.$('.js-answer-data').map(function () {
        return $(this).data('id');
      }).get();

      _this.updateSort(sorting);
    });
  };

  _proto.view = function view() {
    var _this2 = this;

    if (!this.field.exists) {
      return m('div', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.save-field-for-answers'));
    }

    var suggestedAnswers = [];
    var userAnswers = [];
    this.field.all_answers().forEach(function (answer) {
      // When answers are deleted via store.delete() they stay as an "undefined" relationship
      // We ignore these deleted answers
      if (typeof answer === 'undefined') {
        return;
      }

      if (answer.is_suggested()) {
        suggestedAnswers.push(answer);
      } else {
        userAnswers.push(answer);
      }
    });
    return m('div', [m('.Mason-Container.js-answers-container', Object(_lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_6__["default"])(suggestedAnswers).map(function (answer) {
      return m('.js-answer-data', {
        key: answer.id(),
        'data-id': answer.id()
      }, _AnswerEdit__WEBPACK_IMPORTED_MODULE_5__["default"].component({
        answer: answer
      }));
    })), userAnswers.length ? [m('.Button.Button--block.Mason-Box-Header', {
      onclick: function onclick() {
        _this2.showUserAnswers = !_this2.showUserAnswers;
      }
    }, [m('.Mason-Box-Header-Title', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.buttons.show-user-answers', {
      count: userAnswers.length
    })), m('div', [flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()(this.showUserAnswers ? 'chevron-up' : 'chevron-down')])]), // The list of user answers can't be re-ordered
    this.showUserAnswers ? m('.Mason-Container', Object(_lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_6__["default"])(userAnswers, 'content').map(function (answer) {
      return m('div', {
        key: answer.id()
      }, _AnswerEdit__WEBPACK_IMPORTED_MODULE_5__["default"].component({
        answer: answer
      }));
    })) : null] : null, m('form', [m('.Form-group', [m('label', 'New answer'), m('input.FormControl', {
      value: this.new_content,
      oninput: m.withAttr('value', function (value) {
        _this2.new_content = value;
      }),
      placeholder: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.new-answer-placeholder')
    })]), m('.Form-group', [flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      type: 'submit',
      className: 'Button Button--primary',
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.buttons.add-answer'),
      loading: this.processing,
      disabled: !this.new_content,
      onclick: this.saveField.bind(this)
    })])])]);
  };

  _proto.saveField = function saveField() {
    var _this3 = this;

    this.processing = true;
    flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.request({
      method: 'POST',
      url: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('apiUrl') + this.field.apiEndpoint() + '/answers',
      data: {
        data: {
          attributes: {
            content: this.new_content,
            is_suggested: true
          }
        }
      }
    }).then(function (result) {
      flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.pushPayload(result);
      _this3.new_content = '';
      _this3.processing = false;
      m.redraw();
    });
  };

  _proto.updateSort = function updateSort(sorting) {
    flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.request({
      method: 'POST',
      url: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('apiUrl') + this.field.apiEndpoint() + '/answers/order',
      data: {
        sort: sorting
      }
    }).then(function (result) {
      // Update sort attributes
      flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.pushPayload(result);
      m.redraw();
    });
  };

  return FieldAnswersEdit;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "./src/admin/components/FieldEdit.js":
/*!*******************************************!*\
  !*** ./src/admin/components/FieldEdit.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FieldEdit; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _FieldAnswersEdit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FieldAnswersEdit */ "./src/admin/components/FieldAnswersEdit.js");








var FieldEdit =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FieldEdit, _Component);

  function FieldEdit() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FieldEdit.prototype;

  _proto.init = function init() {
    this.field = this.props.field;
    this.dirty = false;
    this.processing = false;
    this.toggleFields = false;

    if (this.field === null) {
      this.initNewField();
    }
  };

  _proto.initNewField = function initNewField() {
    this.field = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.createRecord('flagrow-mason-field', {
      attributes: {
        name: '',
        description: '',
        min_answers_count: 0,
        max_answers_count: 1,
        user_values_allowed: false,
        show_when_empty: false,
        validation: '',
        icon: ''
      }
    });
  };

  _proto.boxTitle = function boxTitle() {
    if (this.field.exists) {
      return this.field.name();
    }

    return flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.buttons.new-field');
  };

  _proto.view = function view() {
    var _this = this;

    return m('.Mason-Box', [this.field.exists ? m('span.fa.fa-arrows.Mason-Box--handle.js-field-handle') : null, m('.Button.Button--block.Mason-Box-Header', {
      onclick: function onclick() {
        _this.toggleFields = !_this.toggleFields;
      }
    }, [m('.Mason-Box-Header-Title', this.boxTitle()), m('div', [this.field.exists ? [flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.buttons.edit-field'), ' '] : null, flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()(this.toggleFields ? 'chevron-up' : 'chevron-down')])]), this.toggleFields ? this.viewFields() : null]);
  };

  _proto.viewFields = function viewFields() {
    var _this2 = this;

    return m('form', [m('.Mason-Box--row', [m('.Mason-Box--column', [m('h4', 'Field settings'), m('.Form-group', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.name')), m('input.FormControl', {
      value: this.field.name(),
      oninput: m.withAttr('value', this.updateAttribute.bind(this, 'name'))
    }), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.name-help'))]), m('.Form-group', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.description')), m('input.FormControl', {
      value: this.field.description(),
      oninput: m.withAttr('value', this.updateAttribute.bind(this, 'description'))
    }), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.description-help'))]), m('.Form-group', [m('label', [// TODO: while multiple answers are still in the work, show the "min answers" field as a checkbox
    flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default.a.component({
      state: this.field.min_answers_count() === 1,
      onchange: function onchange(value) {
        _this2.updateAttribute('min_answers_count', value ? 1 : 0);
      },
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.required')
    })])]),
    /*m('.Form-group', [
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
    ]),*/
    m('.Form-group', [m('label', [flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default.a.component({
      state: this.field.show_when_empty(),
      onchange: this.updateAttribute.bind(this, 'show_when_empty'),
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.show_when_empty')
    })]), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.show_when_empty-help'))]), m('.Form-group', [m('label', [flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default.a.component({
      state: this.field.user_values_allowed(),
      onchange: this.updateAttribute.bind(this, 'user_values_allowed'),
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.user_values_allowed')
    })]), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.user_values_allowed-help'))]), m('.Form-group', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.validation')), m('input.FormControl', {
      disabled: !this.field.user_values_allowed(),
      placeholder: this.field.user_values_allowed() ? '' : flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.enable-user-values-for-validation'),
      value: this.field.validation(),
      oninput: m.withAttr('value', this.updateAttribute.bind(this, 'validation'))
    }), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.validation-help', {
      a: m('a[href=https://laravel.com/docs/5.1/validation#available-validation-rules][_target=blank]')
    }))]), m('.Form-group', [m('label', [flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.icon'), this.iconPreview(this.field.icon())]), m('input.FormControl', {
      value: this.field.icon(),
      oninput: m.withAttr('value', this.updateAttribute.bind(this, 'icon'))
    }), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.icon-help', {
      a: m('a[href=http://fontawesome.io/icons/][_target=blank]')
    }))])]), m('.Mason-Box--column', [m('h4', 'Field answers'), m('.Form-group', _FieldAnswersEdit__WEBPACK_IMPORTED_MODULE_6__["default"].component({
      field: this.field
    }))])]), m('li.ButtonGroup', [flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      type: 'submit',
      className: 'Button Button--primary',
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.buttons.' + (this.field.exists ? 'save' : 'add') + '-field'),
      loading: this.processing,
      disabled: !this.readyToSave(),
      onclick: this.saveField.bind(this)
    }), this.field.exists ? flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      type: 'submit',
      className: 'Button Button--danger',
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.buttons.delete-field'),
      loading: this.processing,
      onclick: this.deleteField.bind(this)
    }) : ''])]);
  };

  _proto.updateAttribute = function updateAttribute(attribute, value) {
    var _this$field$pushAttri;

    this.field.pushAttributes((_this$field$pushAttri = {}, _this$field$pushAttri[attribute] = value, _this$field$pushAttri));
    this.dirty = true;
  };

  _proto.readyToSave = function readyToSave() {
    // TODO: check required fields
    return this.dirty;
  };

  _proto.saveField = function saveField() {
    var _this3 = this;

    this.processing = true;
    var createNewRecord = !this.field.exists;
    this.field.save(this.field.data.attributes).then(function () {
      if (createNewRecord) {
        _this3.initNewField();

        _this3.toggleFields = false;
      }

      _this3.processing = false;
      _this3.dirty = false;
      m.redraw();
    }).catch(function (err) {
      _this3.processing = false;
      throw err;
    });
  };

  _proto.deleteField = function deleteField() {
    var _this4 = this;

    if (!confirm(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.messages.delete-field-confirmation', {
      name: this.field.name()
    }))) {
      return;
    }

    this.processing = true;
    this.field.delete().then(function () {
      _this4.processing = false;
      m.redraw();
    }).catch(function (err) {
      _this4.processing = false;
      throw err;
    });
  };

  _proto.iconPreview = function iconPreview(value) {
    if (!value) {
      return '';
    }

    return [' (', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.fields.icon-preview', {
      preview: flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()(value)
    }), ')'];
  };

  return FieldEdit;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "./src/admin/components/MasonSettings.js":
/*!***********************************************!*\
  !*** ./src/admin/components/MasonSettings.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MasonSettings; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Select */ "flarum/components/Select");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Select__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5__);







var MasonSettings =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(MasonSettings, _Component);

  function MasonSettings() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MasonSettings.prototype;

  _proto.init = function init() {
    this.fieldsSectionTitle = m.prop(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.mason.fields-section-title'] || '');
    this.columnCount = m.prop(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.mason.column-count'] || 1);
    this.labelsAsPlaceholders = m.prop(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.mason.labels-as-placeholders'] > 0);
    this.fieldsInHero = m.prop(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.mason.fields-in-hero'] > 0);
    this.hideEmptyFieldsSection = m.prop(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.mason.hide-empty-fields-section'] > 0);
    this.tagsAsFields = m.prop(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.mason.tags-as-fields'] > 0);
    this.tagsFieldName = m.prop(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.data.settings['flagrow.mason.tags-field-name'] || '');
    this.columnOptions = {};

    for (var i = 1; i <= 3; i++) {
      this.columnOptions[i] = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.n-columns', {
        count: i
      });
    }
  };

  _proto.view = function view() {
    return m('.Mason-Container', [m('.Form-group', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.fields-section-title')), m('input.FormControl', {
      value: this.fieldsSectionTitle(),
      placeholder: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.fields-section-title-placeholder'),
      onchange: m.withAttr('value', this.updateSetting.bind(this, this.fieldsSectionTitle, 'flagrow.mason.fields-section-title'))
    }), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.fields-section-title-help'))]), m('.Form-group', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.column-count')), flarum_components_Select__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      options: this.columnOptions,
      value: this.columnCount(),
      onchange: this.updateSetting.bind(this, this.columnCount, 'flagrow.mason.column-count')
    })]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default.a.component({
      state: this.labelsAsPlaceholders(),
      onchange: this.updateSetting.bind(this, this.labelsAsPlaceholders, 'flagrow.mason.labels-as-placeholders'),
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.labels-as-placeholders')
    })), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.labels-as-placeholders-help'))]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default.a.component({
      state: this.fieldsInHero(),
      onchange: this.updateSetting.bind(this, this.fieldsInHero, 'flagrow.mason.fields-in-hero'),
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.fields-in-hero')
    }))]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default.a.component({
      state: this.hideEmptyFieldsSection(),
      onchange: this.updateSetting.bind(this, this.hideEmptyFieldsSection, 'flagrow.mason.hide-empty-fields-section'),
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.hide-empty-fields-section')
    })), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.hide-empty-fields-section-help'))]), m('.Form-group', [m('label', flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default.a.component({
      state: this.tagsAsFields(),
      onchange: this.updateSetting.bind(this, this.tagsAsFields, 'flagrow.mason.tags-as-fields'),
      children: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.tags-as-field')
    })), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.tags-as-field-help'))]), this.tagsAsFields() ? m('.Form-group', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.tags-field-name')), m('input.FormControl', {
      value: this.tagsFieldName(),
      placeholder: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.settings.tags-field-name-placeholder'),
      onchange: m.withAttr('value', this.updateSetting.bind(this, this.tagsFieldName, 'flagrow.mason.tags-field-name'))
    })]) : null]);
  };
  /**
   * Updates setting in database.
   * @param prop
   * @param setting
   * @param value
   */


  _proto.updateSetting = function updateSetting(prop, setting, value) {
    var _saveSettings;

    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_2___default()((_saveSettings = {}, _saveSettings[setting] = value, _saveSettings));
    prop(value);
  };

  return MasonSettings;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_models_Answer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../lib/models/Answer */ "./src/lib/models/Answer.js");
/* harmony import */ var _lib_models_Field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../lib/models/Field */ "./src/lib/models/Field.js");
/* harmony import */ var _addMasonFieldsPane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addMasonFieldsPane */ "./src/admin/addMasonFieldsPane.js");
/* harmony import */ var _addPermissions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addPermissions */ "./src/admin/addPermissions.js");





flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializers.add('flagrow-mason', function (app) {
  app.store.models['flagrow-mason-field'] = _lib_models_Field__WEBPACK_IMPORTED_MODULE_2__["default"];
  app.store.models['flagrow-mason-answer'] = _lib_models_Answer__WEBPACK_IMPORTED_MODULE_1__["default"];
  Object(_addMasonFieldsPane__WEBPACK_IMPORTED_MODULE_3__["default"])();
  Object(_addPermissions__WEBPACK_IMPORTED_MODULE_4__["default"])();
});

/***/ }),

/***/ "./src/admin/panes/MasonFieldsPane.js":
/*!********************************************!*\
  !*** ./src/admin/panes/MasonFieldsPane.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MasonFieldsPane; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_FieldEdit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../components/FieldEdit */ "./src/admin/components/FieldEdit.js");
/* harmony import */ var _lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../lib/helpers/sortByAttribute */ "./src/lib/helpers/sortByAttribute.js");
/* harmony import */ var _components_MasonSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../components/MasonSettings */ "./src/admin/components/MasonSettings.js");







var MasonFieldsPane =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(MasonFieldsPane, _Component);

  function MasonFieldsPane() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MasonFieldsPane.prototype;

  _proto.init = function init() {
    flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.request({
      method: 'GET',
      url: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('apiUrl') + '/flagrow/mason/fields'
    }).then(function (result) {
      flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.pushPayload(result);
      m.redraw();
    });
  };

  _proto.config = function config() {
    var _this = this;

    this.$('.js-fields-container').sortable({
      handle: '.js-field-handle'
    }).on('sortupdate', function () {
      var sorting = _this.$('.js-field-data').map(function () {
        return $(this).data('id');
      }).get();

      _this.updateSort(sorting);
    });
  };

  _proto.view = function view() {
    var fields = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.all('flagrow-mason-field');
    var fieldsList = [];
    Object(_lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_4__["default"])(fields).forEach(function (field) {
      // Build array of fields to show.
      fieldsList.push(m('.js-field-data', {
        key: field.id(),
        'data-id': field.id()
      }, _components_FieldEdit__WEBPACK_IMPORTED_MODULE_3__["default"].component({
        field: field
      })));
    });
    return m('.container', [m('h2', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.titles.fields')), m('.Mason-Container', [m('.js-fields-container', fieldsList), _components_FieldEdit__WEBPACK_IMPORTED_MODULE_3__["default"].component({
      key: 'new',
      field: null
    })]), m('h2', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.titles.settings')), _components_MasonSettings__WEBPACK_IMPORTED_MODULE_5__["default"].component()]);
  };

  _proto.updateSort = function updateSort(sorting) {
    flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.request({
      method: 'POST',
      url: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('apiUrl') + '/flagrow/mason/fields/order',
      data: {
        sort: sorting
      }
    }).then(function (result) {
      // Update sort attributes
      flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.pushPayload(result);
      m.redraw();
    });
  };

  return MasonFieldsPane;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_2___default.a);



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

/***/ "flarum/components/AdminLinkButton":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['components/AdminLinkButton']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/AdminLinkButton'];

/***/ }),

/***/ "flarum/components/AdminNav":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/AdminNav']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/AdminNav'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/PermissionGrid":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/PermissionGrid']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/PermissionGrid'];

/***/ }),

/***/ "flarum/components/Select":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Select']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Select'];

/***/ }),

/***/ "flarum/components/Switch":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Switch']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Switch'];

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

/***/ }),

/***/ "flarum/utils/saveSettings":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['utils/saveSettings']" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/saveSettings'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map
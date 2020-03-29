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

/***/ "./node_modules/html5sortable/dist/html5sortable.es.js":
/*!*************************************************************!*\
  !*** ./node_modules/html5sortable/dist/html5sortable.es.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * HTML5Sortable package
 * https://github.com/lukasoppermann/html5sortable
 *
 * Maintained by Lukas Oppermann <lukas@vea.re>
 *
 * Released under the MIT license.
 */
/**
 * Get or set data on element
 * @param {HTMLElement} element
 * @param {string} key
 * @param {any} value
 * @return {*}
 */
function addData(element, key, value) {
    if (value === undefined) {
        return element && element.h5s && element.h5s.data && element.h5s.data[key];
    }
    else {
        element.h5s = element.h5s || {};
        element.h5s.data = element.h5s.data || {};
        element.h5s.data[key] = value;
    }
}
/**
 * Remove data from element
 * @param {HTMLElement} element
 */
function removeData(element) {
    if (element.h5s) {
        delete element.h5s.data;
    }
}

/* eslint-env browser */
/**
 * Filter only wanted nodes
 * @param {NodeList|HTMLCollection|Array} nodes
 * @param {String} selector
 * @returns {Array}
 */
var _filter = (function (nodes, selector) {
    if (!(nodes instanceof NodeList || nodes instanceof HTMLCollection || nodes instanceof Array)) {
        throw new Error('You must provide a nodeList/HTMLCollection/Array of elements to be filtered.');
    }
    if (typeof selector !== 'string') {
        return Array.from(nodes);
    }
    return Array.from(nodes).filter(function (item) { return item.nodeType === 1 && item.matches(selector); });
});

/* eslint-env browser */
var stores = new Map();
/**
 * Stores data & configurations per Sortable
 * @param {Object} config
 */
var Store = /** @class */ (function () {
    function Store() {
        this._config = new Map(); // eslint-disable-line no-undef
        this._placeholder = undefined; // eslint-disable-line no-undef
        this._data = new Map(); // eslint-disable-line no-undef
    }
    Object.defineProperty(Store.prototype, "config", {
        /**
         * get the configuration map of a class instance
         * @method config
         * @return {object}
         */
        get: function () {
            // transform Map to object
            var config = {};
            this._config.forEach(function (value, key) {
                config[key] = value;
            });
            // return object
            return config;
        },
        /**
         * set the configuration of a class instance
         * @method config
         * @param {object} config object of configurations
         */
        set: function (config) {
            if (typeof config !== 'object') {
                throw new Error('You must provide a valid configuration object to the config setter.');
            }
            // combine config with default
            var mergedConfig = Object.assign({}, config);
            // add config to map
            this._config = new Map(Object.entries(mergedConfig));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * set individual configuration of a class instance
     * @method setConfig
     * @param  key valid configuration key
     * @param  value any value
     * @return void
     */
    Store.prototype.setConfig = function (key, value) {
        if (!this._config.has(key)) {
            throw new Error("Trying to set invalid configuration item: " + key);
        }
        // set config
        this._config.set(key, value);
    };
    /**
     * get an individual configuration of a class instance
     * @method getConfig
     * @param  key valid configuration key
     * @return any configuration value
     */
    Store.prototype.getConfig = function (key) {
        if (!this._config.has(key)) {
            throw new Error("Invalid configuration item requested: " + key);
        }
        return this._config.get(key);
    };
    Object.defineProperty(Store.prototype, "placeholder", {
        /**
         * get the placeholder for a class instance
         * @method placeholder
         * @return {HTMLElement|null}
         */
        get: function () {
            return this._placeholder;
        },
        /**
         * set the placeholder for a class instance
         * @method placeholder
         * @param {HTMLElement} placeholder
         * @return {void}
         */
        set: function (placeholder) {
            if (!(placeholder instanceof HTMLElement) && placeholder !== null) {
                throw new Error('A placeholder must be an html element or null.');
            }
            this._placeholder = placeholder;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * set an data entry
     * @method setData
     * @param {string} key
     * @param {any} value
     * @return {void}
     */
    Store.prototype.setData = function (key, value) {
        if (typeof key !== 'string') {
            throw new Error('The key must be a string.');
        }
        this._data.set(key, value);
    };
    /**
     * get an data entry
     * @method getData
     * @param {string} key an existing key
     * @return {any}
     */
    Store.prototype.getData = function (key) {
        if (typeof key !== 'string') {
            throw new Error('The key must be a string.');
        }
        return this._data.get(key);
    };
    /**
     * delete an data entry
     * @method deleteData
     * @param {string} key an existing key
     * @return {boolean}
     */
    Store.prototype.deleteData = function (key) {
        if (typeof key !== 'string') {
            throw new Error('The key must be a string.');
        }
        return this._data.delete(key);
    };
    return Store;
}());
/**
 * @param {HTMLElement} sortableElement
 * @returns {Class: Store}
 */
var store = (function (sortableElement) {
    // if sortableElement is wrong type
    if (!(sortableElement instanceof HTMLElement)) {
        throw new Error('Please provide a sortable to the store function.');
    }
    // create new instance if not avilable
    if (!stores.has(sortableElement)) {
        stores.set(sortableElement, new Store());
    }
    // return instance
    return stores.get(sortableElement);
});

/**
 * @param {Array|HTMLElement} element
 * @param {Function} callback
 * @param {string} event
 */
function addEventListener(element, eventName, callback) {
    if (element instanceof Array) {
        for (var i = 0; i < element.length; ++i) {
            addEventListener(element[i], eventName, callback);
        }
        return;
    }
    element.addEventListener(eventName, callback);
    store(element).setData("event" + eventName, callback);
}
/**
 * @param {Array<HTMLElement>|HTMLElement} element
 * @param {string} eventName
 */
function removeEventListener(element, eventName) {
    if (element instanceof Array) {
        for (var i = 0; i < element.length; ++i) {
            removeEventListener(element[i], eventName);
        }
        return;
    }
    element.removeEventListener(eventName, store(element).getData("event" + eventName));
    store(element).deleteData("event" + eventName);
}

/**
 * @param {Array<HTMLElement>|HTMLElement} element
 * @param {string} attribute
 * @param {string} value
 */
function addAttribute(element, attribute, value) {
    if (element instanceof Array) {
        for (var i = 0; i < element.length; ++i) {
            addAttribute(element[i], attribute, value);
        }
        return;
    }
    element.setAttribute(attribute, value);
}
/**
 * @param {Array|HTMLElement} element
 * @param {string} attribute
 */
function removeAttribute(element, attribute) {
    if (element instanceof Array) {
        for (var i = 0; i < element.length; ++i) {
            removeAttribute(element[i], attribute);
        }
        return;
    }
    element.removeAttribute(attribute);
}

/**
 * @param {HTMLElement} element
 * @returns {Object}
 */
var _offset = (function (element) {
    if (!element.parentElement || element.getClientRects().length === 0) {
        throw new Error('target element must be part of the dom');
    }
    var rect = element.getClientRects()[0];
    return {
        left: rect.left + window.pageXOffset,
        right: rect.right + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        bottom: rect.bottom + window.pageYOffset
    };
});

/**
 * Creates and returns a new debounced version of the passed function which will postpone its execution until after wait milliseconds have elapsed
 * @param {Function} func to debounce
 * @param {number} time to wait before calling function with latest arguments, 0 - no debounce
 * @returns {function} - debounced function
 */
var _debounce = (function (func, wait) {
    if (wait === void 0) { wait = 0; }
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(void 0, args);
        }, wait);
    };
});

/* eslint-env browser */
/**
 * Get position of the element relatively to its sibling elements
 * @param {HTMLElement} element
 * @returns {number}
 */
var _index = (function (element, elementList) {
    if (!(element instanceof HTMLElement) || !(elementList instanceof NodeList || elementList instanceof HTMLCollection || elementList instanceof Array)) {
        throw new Error('You must provide an element and a list of elements.');
    }
    return Array.from(elementList).indexOf(element);
});

/* eslint-env browser */
/**
 * Test whether element is in DOM
 * @param {HTMLElement} element
 * @returns {boolean}
 */
var isInDom = (function (element) {
    if (!(element instanceof HTMLElement)) {
        throw new Error('Element is not a node element.');
    }
    return element.parentNode !== null;
});

/* eslint-env browser */
/**
 * Insert node before or after target
 * @param {HTMLElement} referenceNode - reference element
 * @param {HTMLElement} newElement - element to be inserted
 * @param {String} position - insert before or after reference element
 */
var insertNode = function (referenceNode, newElement, position) {
    if (!(referenceNode instanceof HTMLElement) || !(referenceNode.parentElement instanceof HTMLElement)) {
        throw new Error('target and element must be a node');
    }
    referenceNode.parentElement.insertBefore(newElement, (position === 'before' ? referenceNode : referenceNode.nextElementSibling));
};
/**
 * Insert before target
 * @param {HTMLElement} target
 * @param {HTMLElement} element
 */
var insertBefore = function (target, element) { return insertNode(target, element, 'before'); };
/**
 * Insert after target
 * @param {HTMLElement} target
 * @param {HTMLElement} element
 */
var insertAfter = function (target, element) { return insertNode(target, element, 'after'); };

/* eslint-env browser */
/**
 * Filter only wanted nodes
 * @param {HTMLElement} sortableContainer
 * @param {Function} customSerializer
 * @returns {Array}
 */
var _serialize = (function (sortableContainer, customItemSerializer, customContainerSerializer) {
    if (customItemSerializer === void 0) { customItemSerializer = function (serializedItem, sortableContainer) { return serializedItem; }; }
    if (customContainerSerializer === void 0) { customContainerSerializer = function (serializedContainer) { return serializedContainer; }; }
    // check for valid sortableContainer
    if (!(sortableContainer instanceof HTMLElement) || !sortableContainer.isSortable === true) {
        throw new Error('You need to provide a sortableContainer to be serialized.');
    }
    // check for valid serializers
    if (typeof customItemSerializer !== 'function' || typeof customContainerSerializer !== 'function') {
        throw new Error('You need to provide a valid serializer for items and the container.');
    }
    // get options
    var options = addData(sortableContainer, 'opts');
    var item = options.items;
    // serialize container
    var items = _filter(sortableContainer.children, item);
    var serializedItems = items.map(function (item) {
        return {
            parent: sortableContainer,
            node: item,
            html: item.outerHTML,
            index: _index(item, items)
        };
    });
    // serialize container
    var container = {
        node: sortableContainer,
        itemCount: serializedItems.length
    };
    return {
        container: customContainerSerializer(container),
        items: serializedItems.map(function (item) { return customItemSerializer(item, sortableContainer); })
    };
});

/* eslint-env browser */
/**
 * create a placeholder element
 * @param {HTMLElement} sortableElement a single sortable
 * @param {string|undefined} placeholder a string representing an html element
 * @param {string} placeholderClasses a string representing the classes that should be added to the placeholder
 */
var _makePlaceholder = (function (sortableElement, placeholder, placeholderClass) {
    var _a;
    if (placeholderClass === void 0) { placeholderClass = 'sortable-placeholder'; }
    if (!(sortableElement instanceof HTMLElement)) {
        throw new Error('You must provide a valid element as a sortable.');
    }
    // if placeholder is not an element
    if (!(placeholder instanceof HTMLElement) && placeholder !== undefined) {
        throw new Error('You must provide a valid element as a placeholder or set ot to undefined.');
    }
    // if no placeholder element is given
    if (placeholder === undefined) {
        if (['UL', 'OL'].includes(sortableElement.tagName)) {
            placeholder = document.createElement('li');
        }
        else if (['TABLE', 'TBODY'].includes(sortableElement.tagName)) {
            placeholder = document.createElement('tr');
            // set colspan to always all rows, otherwise the item can only be dropped in first column
            placeholder.innerHTML = '<td colspan="100"></td>';
        }
        else {
            placeholder = document.createElement('div');
        }
    }
    // add classes to placeholder
    if (typeof placeholderClass === 'string') {
        (_a = placeholder.classList).add.apply(_a, placeholderClass.split(' '));
    }
    return placeholder;
});

/* eslint-env browser */
/**
 * Get height of an element including padding
 * @param {HTMLElement} element an dom element
 */
var _getElementHeight = (function (element) {
    if (!(element instanceof HTMLElement)) {
        throw new Error('You must provide a valid dom element');
    }
    // get calculated style of element
    var style = window.getComputedStyle(element);
    // pick applicable properties, convert to int and reduce by adding
    return ['height', 'padding-top', 'padding-bottom']
        .map(function (key) {
        var int = parseInt(style.getPropertyValue(key), 10);
        return isNaN(int) ? 0 : int;
    })
        .reduce(function (sum, value) { return sum + value; });
});

/* eslint-env browser */
/**
 * Get width of an element including padding
 * @param {HTMLElement} element an dom element
 */
var _getElementWidth = (function (element) {
    if (!(element instanceof HTMLElement)) {
        throw new Error('You must provide a valid dom element');
    }
    // get calculated style of element
    var style = window.getComputedStyle(element);
    // pick applicable properties, convert to int and reduce by adding
    return ['width', 'padding-left', 'padding-right']
        .map(function (key) {
        var int = parseInt(style.getPropertyValue(key), 10);
        return isNaN(int) ? 0 : int;
    })
        .reduce(function (sum, value) { return sum + value; });
});

/* eslint-env browser */
/**
 * get handle or return item
 * @param {Array<HTMLElement>} items
 * @param {string} selector
 */
var _getHandles = (function (items, selector) {
    if (!(items instanceof Array)) {
        throw new Error('You must provide a Array of HTMLElements to be filtered.');
    }
    if (typeof selector !== 'string') {
        return items;
    }
    return items
        // remove items without handle from array
        .filter(function (item) {
        return item.querySelector(selector) instanceof HTMLElement ||
            (item.shadowRoot && item.shadowRoot.querySelector(selector) instanceof HTMLElement);
    })
        // replace item with handle in array
        .map(function (item) {
        return item.querySelector(selector) || (item.shadowRoot && item.shadowRoot.querySelector(selector));
    });
});

/**
 * @param {Event} event
 * @returns {HTMLElement}
 */
var getEventTarget = (function (event) {
    return (event.composedPath && event.composedPath()[0]) || event.target;
});

/* eslint-env browser */
/**
 * defaultDragImage returns the current item as dragged image
 * @param {HTMLElement} draggedElement - the item that the user drags
 * @param {object} elementOffset - an object with the offsets top, left, right & bottom
 * @param {Event} event - the original drag event object
 * @return {object} with element, posX and posY properties
 */
var defaultDragImage = function (draggedElement, elementOffset, event) {
    return {
        element: draggedElement,
        posX: event.pageX - elementOffset.left,
        posY: event.pageY - elementOffset.top
    };
};
/**
 * attaches an element as the drag image to an event
 * @param {Event} event - the original drag event object
 * @param {HTMLElement} draggedElement - the item that the user drags
 * @param {Function} customDragImage - function to create a custom dragImage
 * @return void
 */
var setDragImage = (function (event, draggedElement, customDragImage) {
    // check if event is provided
    if (!(event instanceof Event)) {
        throw new Error('setDragImage requires a DragEvent as the first argument.');
    }
    // check if draggedElement is provided
    if (!(draggedElement instanceof HTMLElement)) {
        throw new Error('setDragImage requires the dragged element as the second argument.');
    }
    // set default function of none provided
    if (!customDragImage) {
        customDragImage = defaultDragImage;
    }
    // check if setDragImage method is available
    if (event.dataTransfer && event.dataTransfer.setDragImage) {
        // get the elements offset
        var elementOffset = _offset(draggedElement);
        // get the dragImage
        var dragImage = customDragImage(draggedElement, elementOffset, event);
        // check if custom function returns correct values
        if (!(dragImage.element instanceof HTMLElement) || typeof dragImage.posX !== 'number' || typeof dragImage.posY !== 'number') {
            throw new Error('The customDragImage function you provided must return and object with the properties element[string], posX[integer], posY[integer].');
        }
        // needs to be set for HTML5 drag & drop to work
        event.dataTransfer.effectAllowed = 'copyMove';
        // Firefox requires it to use the event target's id for the data
        event.dataTransfer.setData('text/plain', getEventTarget(event).id);
        // set the drag image on the event
        event.dataTransfer.setDragImage(dragImage.element, dragImage.posX, dragImage.posY);
    }
});

/**
 * Check if curList accepts items from destList
 * @param {sortable} destination the container an item is move to
 * @param {sortable} origin the container an item comes from
 */
var _listsConnected = (function (destination, origin) {
    // check if valid sortable
    if (destination.isSortable === true) {
        var acceptFrom = store(destination).getConfig('acceptFrom');
        // check if acceptFrom is valid
        if (acceptFrom !== null && acceptFrom !== false && typeof acceptFrom !== 'string') {
            throw new Error('HTML5Sortable: Wrong argument, "acceptFrom" must be "null", "false", or a valid selector string.');
        }
        if (acceptFrom !== null) {
            return acceptFrom !== false && acceptFrom.split(',').filter(function (sel) {
                return sel.length > 0 && origin.matches(sel);
            }).length > 0;
        }
        // drop in same list
        if (destination === origin) {
            return true;
        }
        // check if lists are connected with connectWith
        if (store(destination).getConfig('connectWith') !== undefined && store(destination).getConfig('connectWith') !== null) {
            return store(destination).getConfig('connectWith') === store(origin).getConfig('connectWith');
        }
    }
    return false;
});

/**
 * default configurations
 */
var defaultConfiguration = {
    items: null,
    // deprecated
    connectWith: null,
    // deprecated
    disableIEFix: null,
    acceptFrom: null,
    copy: false,
    placeholder: null,
    placeholderClass: 'sortable-placeholder',
    draggingClass: 'sortable-dragging',
    hoverClass: false,
    debounce: 0,
    throttleTime: 100,
    maxItems: 0,
    itemSerializer: undefined,
    containerSerializer: undefined,
    customDragImage: null,
    orientation: 'vertical'
};

/**
 * make sure a function is only called once within the given amount of time
 * @param {Function} fn the function to throttle
 * @param {number} threshold time limit for throttling
 */
// must use function to keep this context
function _throttle (fn, threshold) {
    var _this = this;
    if (threshold === void 0) { threshold = 250; }
    // check function
    if (typeof fn !== 'function') {
        throw new Error('You must provide a function as the first argument for throttle.');
    }
    // check threshold
    if (typeof threshold !== 'number') {
        throw new Error('You must provide a number as the second argument for throttle.');
    }
    var lastEventTimestamp = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = Date.now();
        if (lastEventTimestamp === null || now - lastEventTimestamp >= threshold) {
            lastEventTimestamp = now;
            fn.apply(_this, args);
        }
    };
}

/* eslint-env browser */
/**
 * enable or disable hoverClass on mouseenter/leave if container Items
 * @param {sortable} sortableContainer a valid sortableContainer
 * @param {boolean} enable enable or disable event
 */
// export default (sortableContainer: sortable, enable: boolean) => {
var enableHoverClass = (function (sortableContainer, enable) {
    if (typeof store(sortableContainer).getConfig('hoverClass') === 'string') {
        var hoverClasses_1 = store(sortableContainer).getConfig('hoverClass').split(' ');
        // add class on hover
        if (enable === true) {
            addEventListener(sortableContainer, 'mousemove', _throttle(function (event) {
                // check of no mouse button was pressed when mousemove started == no drag
                if (event.buttons === 0) {
                    _filter(sortableContainer.children, store(sortableContainer).getConfig('items')).forEach(function (item) {
                        var _a, _b;
                        if (item !== event.target) {
                            (_a = item.classList).remove.apply(_a, hoverClasses_1);
                        }
                        else {
                            (_b = item.classList).add.apply(_b, hoverClasses_1);
                        }
                    });
                }
            }, store(sortableContainer).getConfig('throttleTime')));
            // remove class on leave
            addEventListener(sortableContainer, 'mouseleave', function () {
                _filter(sortableContainer.children, store(sortableContainer).getConfig('items')).forEach(function (item) {
                    var _a;
                    (_a = item.classList).remove.apply(_a, hoverClasses_1);
                });
            });
            // remove events
        }
        else {
            removeEventListener(sortableContainer, 'mousemove');
            removeEventListener(sortableContainer, 'mouseleave');
        }
    }
});

/* eslint-env browser */
/*
 * variables global to the plugin
 */
var dragging;
var draggingHeight;
var draggingWidth;
/*
 * Keeps track of the initialy selected list, where 'dragstart' event was triggered
 * It allows us to move the data in between individual Sortable List instances
 */
// Origin List - data from before any item was changed
var originContainer;
var originIndex;
var originElementIndex;
var originItemsBeforeUpdate;
// Previous Sortable Container - we dispatch as sortenter event when a
// dragged item enters a sortableContainer for the first time
var previousContainer;
// Destination List - data from before any item was changed
var destinationItemsBeforeUpdate;
/**
 * remove event handlers from items
 * @param {Array|NodeList} items
 */
var _removeItemEvents = function (items) {
    removeEventListener(items, 'dragstart');
    removeEventListener(items, 'dragend');
    removeEventListener(items, 'dragover');
    removeEventListener(items, 'dragenter');
    removeEventListener(items, 'drop');
    removeEventListener(items, 'mouseenter');
    removeEventListener(items, 'mouseleave');
};
/**
 * _getDragging returns the current element to drag or
 * a copy of the element.
 * Is Copy Active for sortable
 * @param {HTMLElement} draggedItem - the item that the user drags
 * @param {HTMLElement} sortable a single sortable
 */
var _getDragging = function (draggedItem, sortable) {
    var ditem = draggedItem;
    if (store(sortable).getConfig('copy') === true) {
        ditem = draggedItem.cloneNode(true);
        addAttribute(ditem, 'aria-copied', 'true');
        draggedItem.parentElement.appendChild(ditem);
        ditem.style.display = 'none';
        ditem.oldDisplay = draggedItem.style.display;
    }
    return ditem;
};
/**
 * Remove data from sortable
 * @param {HTMLElement} sortable a single sortable
 */
var _removeSortableData = function (sortable) {
    removeData(sortable);
    removeAttribute(sortable, 'aria-dropeffect');
};
/**
 * Remove data from items
 * @param {Array<HTMLElement>|HTMLElement} items
 */
var _removeItemData = function (items) {
    removeAttribute(items, 'aria-grabbed');
    removeAttribute(items, 'aria-copied');
    removeAttribute(items, 'draggable');
    removeAttribute(items, 'role');
};
/**
 * find sortable from element. travels up parent element until found or null.
 * @param {HTMLElement} element a single sortable
 * @param {Event} event - the current event. We need to pass it to be able to
 * find Sortable whith shadowRoot (document fragment has no parent)
 */
function findSortable(element, event) {
    if (event.composedPath) {
        return event.composedPath().find(function (el) { return el.isSortable; });
    }
    while (element.isSortable !== true) {
        element = element.parentElement;
    }
    return element;
}
/**
 * Dragging event is on the sortable element. finds the top child that
 * contains the element.
 * @param {HTMLElement} sortableElement a single sortable
 * @param {HTMLElement} element is that being dragged
 */
function findDragElement(sortableElement, element) {
    var options = addData(sortableElement, 'opts');
    var items = _filter(sortableElement.children, options.items);
    var itemlist = items.filter(function (ele) {
        return ele.contains(element) || (ele.shadowRoot && ele.shadowRoot.contains(element));
    });
    return itemlist.length > 0 ? itemlist[0] : element;
}
/**
 * Destroy the sortable
 * @param {HTMLElement} sortableElement a single sortable
 */
var _destroySortable = function (sortableElement) {
    var opts = addData(sortableElement, 'opts') || {};
    var items = _filter(sortableElement.children, opts.items);
    var handles = _getHandles(items, opts.handle);
    // remove event handlers & data from sortable
    removeEventListener(sortableElement, 'dragover');
    removeEventListener(sortableElement, 'dragenter');
    removeEventListener(sortableElement, 'dragstart');
    removeEventListener(sortableElement, 'dragend');
    removeEventListener(sortableElement, 'drop');
    // remove event data from sortable
    _removeSortableData(sortableElement);
    // remove event handlers & data from items
    removeEventListener(handles, 'mousedown');
    _removeItemEvents(items);
    _removeItemData(items);
    // clear sortable flag
    sortableElement.isSortable = false;
};
/**
 * Enable the sortable
 * @param {HTMLElement} sortableElement a single sortable
 */
var _enableSortable = function (sortableElement) {
    var opts = addData(sortableElement, 'opts');
    var items = _filter(sortableElement.children, opts.items);
    var handles = _getHandles(items, opts.handle);
    addAttribute(sortableElement, 'aria-dropeffect', 'move');
    addData(sortableElement, '_disabled', 'false');
    addAttribute(handles, 'draggable', 'true');
    // @todo: remove this fix
    // IE FIX for ghost
    // can be disabled as it has the side effect that other events
    // (e.g. click) will be ignored
    if (opts.disableIEFix === false) {
        var spanEl = (document || window.document).createElement('span');
        if (typeof spanEl.dragDrop === 'function') {
            addEventListener(handles, 'mousedown', function () {
                if (items.indexOf(this) !== -1) {
                    this.dragDrop();
                }
                else {
                    var parent = this.parentElement;
                    while (items.indexOf(parent) === -1) {
                        parent = parent.parentElement;
                    }
                    parent.dragDrop();
                }
            });
        }
    }
};
/**
 * Disable the sortable
 * @param {HTMLElement} sortableElement a single sortable
 */
var _disableSortable = function (sortableElement) {
    var opts = addData(sortableElement, 'opts');
    var items = _filter(sortableElement.children, opts.items);
    var handles = _getHandles(items, opts.handle);
    addAttribute(sortableElement, 'aria-dropeffect', 'none');
    addData(sortableElement, '_disabled', 'true');
    addAttribute(handles, 'draggable', 'false');
    removeEventListener(handles, 'mousedown');
};
/**
 * Reload the sortable
 * @param {HTMLElement} sortableElement a single sortable
 * @description events need to be removed to not be double bound
 */
var _reloadSortable = function (sortableElement) {
    var opts = addData(sortableElement, 'opts');
    var items = _filter(sortableElement.children, opts.items);
    var handles = _getHandles(items, opts.handle);
    addData(sortableElement, '_disabled', 'false');
    // remove event handlers from items
    _removeItemEvents(items);
    removeEventListener(handles, 'mousedown');
    // remove event handlers from sortable
    removeEventListener(sortableElement, 'dragover');
    removeEventListener(sortableElement, 'dragenter');
    removeEventListener(sortableElement, 'drop');
};
/**
 * Public sortable object
 * @param {Array|NodeList} sortableElements
 * @param {object|string} options|method
 */
function sortable(sortableElements, options) {
    // get method string to see if a method is called
    var method = String(options);
    options = options || {};
    // check if the user provided a selector instead of an element
    if (typeof sortableElements === 'string') {
        sortableElements = document.querySelectorAll(sortableElements);
    }
    // if the user provided an element, return it in an array to keep the return value consistant
    if (sortableElements instanceof HTMLElement) {
        sortableElements = [sortableElements];
    }
    sortableElements = Array.prototype.slice.call(sortableElements);
    if (/serialize/.test(method)) {
        return sortableElements.map(function (sortableContainer) {
            var opts = addData(sortableContainer, 'opts');
            return _serialize(sortableContainer, opts.itemSerializer, opts.containerSerializer);
        });
    }
    sortableElements.forEach(function (sortableElement) {
        if (/enable|disable|destroy/.test(method)) {
            return sortable[method](sortableElement);
        }
        // log deprecation
        ['connectWith', 'disableIEFix'].forEach(function (configKey) {
            if (Object.prototype.hasOwnProperty.call(options, configKey) && options[configKey] !== null) {
                console.warn("HTML5Sortable: You are using the deprecated configuration \"" + configKey + "\". This will be removed in an upcoming version, make sure to migrate to the new options when updating.");
            }
        });
        // merge options with default options
        options = Object.assign({}, defaultConfiguration, store(sortableElement).config, options);
        // init data store for sortable
        store(sortableElement).config = options;
        // set options on sortable
        addData(sortableElement, 'opts', options);
        // property to define as sortable
        sortableElement.isSortable = true;
        // reset sortable
        _reloadSortable(sortableElement);
        // initialize
        var listItems = _filter(sortableElement.children, options.items);
        // create element if user defined a placeholder element as a string
        var customPlaceholder;
        if (options.placeholder !== null && options.placeholder !== undefined) {
            var tempContainer = document.createElement(sortableElement.tagName);
            if (options.placeholder instanceof HTMLElement) {
                tempContainer.appendChild(options.placeholder);
            }
            else {
                tempContainer.innerHTML = options.placeholder;
            }
            customPlaceholder = tempContainer.children[0];
        }
        // add placeholder
        store(sortableElement).placeholder = _makePlaceholder(sortableElement, customPlaceholder, options.placeholderClass);
        addData(sortableElement, 'items', options.items);
        if (options.acceptFrom) {
            addData(sortableElement, 'acceptFrom', options.acceptFrom);
        }
        else if (options.connectWith) {
            addData(sortableElement, 'connectWith', options.connectWith);
        }
        _enableSortable(sortableElement);
        addAttribute(listItems, 'role', 'option');
        addAttribute(listItems, 'aria-grabbed', 'false');
        // enable hover class
        enableHoverClass(sortableElement, true);
        /*
         Handle drag events on draggable items
         Handle is set at the sortableElement level as it will bubble up
         from the item
         */
        addEventListener(sortableElement, 'dragstart', function (e) {
            // ignore dragstart events
            var target = getEventTarget(e);
            if (target.isSortable === true) {
                return;
            }
            e.stopImmediatePropagation();
            if ((options.handle && !target.matches(options.handle)) || target.getAttribute('draggable') === 'false') {
                return;
            }
            var sortableContainer = findSortable(target, e);
            var dragItem = findDragElement(sortableContainer, target);
            // grab values
            originItemsBeforeUpdate = _filter(sortableContainer.children, options.items);
            originIndex = originItemsBeforeUpdate.indexOf(dragItem);
            originElementIndex = _index(dragItem, sortableContainer.children);
            originContainer = sortableContainer;
            // add transparent clone or other ghost to cursor
            setDragImage(e, dragItem, options.customDragImage);
            // cache selsection & add attr for dragging
            draggingHeight = _getElementHeight(dragItem);
            draggingWidth = _getElementWidth(dragItem);
            dragItem.classList.add(options.draggingClass);
            dragging = _getDragging(dragItem, sortableContainer);
            addAttribute(dragging, 'aria-grabbed', 'true');
            // dispatch sortstart event on each element in group
            sortableContainer.dispatchEvent(new CustomEvent('sortstart', {
                detail: {
                    origin: {
                        elementIndex: originElementIndex,
                        index: originIndex,
                        container: originContainer
                    },
                    item: dragging,
                    originalTarget: target
                }
            }));
        });
        /*
         We are capturing targetSortable before modifications with 'dragenter' event
        */
        addEventListener(sortableElement, 'dragenter', function (e) {
            var target = getEventTarget(e);
            var sortableContainer = findSortable(target, e);
            if (sortableContainer && sortableContainer !== previousContainer) {
                destinationItemsBeforeUpdate = _filter(sortableContainer.children, addData(sortableContainer, 'items'))
                    .filter(function (item) { return item !== store(sortableElement).placeholder; });
                sortableContainer.dispatchEvent(new CustomEvent('sortenter', {
                    detail: {
                        origin: {
                            elementIndex: originElementIndex,
                            index: originIndex,
                            container: originContainer
                        },
                        destination: {
                            container: sortableContainer,
                            itemsBeforeUpdate: destinationItemsBeforeUpdate
                        },
                        item: dragging,
                        originalTarget: target
                    }
                }));
            }
            previousContainer = sortableContainer;
        });
        /*
         * Dragend Event - https://developer.mozilla.org/en-US/docs/Web/Events/dragend
         * Fires each time dragEvent end, or ESC pressed
         * We are using it to clean up any draggable elements and placeholders
         */
        addEventListener(sortableElement, 'dragend', function (e) {
            if (!dragging) {
                return;
            }
            dragging.classList.remove(options.draggingClass);
            addAttribute(dragging, 'aria-grabbed', 'false');
            if (dragging.getAttribute('aria-copied') === 'true' && addData(dragging, 'dropped') !== 'true') {
                dragging.remove();
            }
            dragging.style.display = dragging.oldDisplay;
            delete dragging.oldDisplay;
            var visiblePlaceholder = Array.from(stores.values()).map(function (data) { return data.placeholder; })
                .filter(function (placeholder) { return placeholder instanceof HTMLElement; })
                .filter(isInDom)[0];
            if (visiblePlaceholder) {
                visiblePlaceholder.remove();
            }
            // dispatch sortstart event on each element in group
            sortableElement.dispatchEvent(new CustomEvent('sortstop', {
                detail: {
                    origin: {
                        elementIndex: originElementIndex,
                        index: originIndex,
                        container: originContainer
                    },
                    item: dragging
                }
            }));
            previousContainer = null;
            dragging = null;
            draggingHeight = null;
            draggingWidth = null;
        });
        /*
         * Drop Event - https://developer.mozilla.org/en-US/docs/Web/Events/drop
         * Fires when valid drop target area is hit
         */
        addEventListener(sortableElement, 'drop', function (e) {
            if (!_listsConnected(sortableElement, dragging.parentElement)) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            addData(dragging, 'dropped', 'true');
            // get the one placeholder that is currently visible
            var visiblePlaceholder = Array.from(stores.values()).map(function (data) {
                return data.placeholder;
            })
                // filter only HTMLElements
                .filter(function (placeholder) { return placeholder instanceof HTMLElement; })
                // filter only elements in DOM
                .filter(isInDom)[0];
            // attach element after placeholder
            insertAfter(visiblePlaceholder, dragging);
            // remove placeholder from dom
            visiblePlaceholder.remove();
            /*
             * Fires Custom Event - 'sortstop'
             */
            sortableElement.dispatchEvent(new CustomEvent('sortstop', {
                detail: {
                    origin: {
                        elementIndex: originElementIndex,
                        index: originIndex,
                        container: originContainer
                    },
                    item: dragging
                }
            }));
            var placeholder = store(sortableElement).placeholder;
            var originItems = _filter(originContainer.children, options.items)
                .filter(function (item) { return item !== placeholder; });
            var destinationContainer = this.isSortable === true ? this : this.parentElement;
            var destinationItems = _filter(destinationContainer.children, addData(destinationContainer, 'items'))
                .filter(function (item) { return item !== placeholder; });
            var destinationElementIndex = _index(dragging, Array.from(dragging.parentElement.children)
                .filter(function (item) { return item !== placeholder; }));
            var destinationIndex = _index(dragging, destinationItems);
            /*
             * When a list item changed container lists or index within a list
             * Fires Custom Event - 'sortupdate'
             */
            if (originElementIndex !== destinationElementIndex || originContainer !== destinationContainer) {
                sortableElement.dispatchEvent(new CustomEvent('sortupdate', {
                    detail: {
                        origin: {
                            elementIndex: originElementIndex,
                            index: originIndex,
                            container: originContainer,
                            itemsBeforeUpdate: originItemsBeforeUpdate,
                            items: originItems
                        },
                        destination: {
                            index: destinationIndex,
                            elementIndex: destinationElementIndex,
                            container: destinationContainer,
                            itemsBeforeUpdate: destinationItemsBeforeUpdate,
                            items: destinationItems
                        },
                        item: dragging
                    }
                }));
            }
        });
        var debouncedDragOverEnter = _debounce(function (sortableElement, element, pageX, pageY) {
            if (!dragging) {
                return;
            }
            // set placeholder height if forcePlaceholderSize option is set
            if (options.forcePlaceholderSize) {
                store(sortableElement).placeholder.style.height = draggingHeight + 'px';
                store(sortableElement).placeholder.style.width = draggingWidth + 'px';
            }
            // if element the draggedItem is dragged onto is within the array of all elements in list
            // (not only items, but also disabled, etc.)
            if (Array.from(sortableElement.children).indexOf(element) > -1) {
                var thisHeight = _getElementHeight(element);
                var thisWidth = _getElementWidth(element);
                var placeholderIndex = _index(store(sortableElement).placeholder, element.parentElement.children);
                var thisIndex = _index(element, element.parentElement.children);
                // Check if `element` is bigger than the draggable. If it is, we have to define a dead zone to prevent flickering
                if (thisHeight > draggingHeight || thisWidth > draggingWidth) {
                    // Dead zone?
                    var deadZoneVertical = thisHeight - draggingHeight;
                    var deadZoneHorizontal = thisWidth - draggingWidth;
                    var offsetTop = _offset(element).top;
                    var offsetLeft = _offset(element).left;
                    if (placeholderIndex < thisIndex &&
                        ((options.orientation === 'vertical' && pageY < offsetTop) ||
                            (options.orientation === 'horizontal' && pageX < offsetLeft))) {
                        return;
                    }
                    if (placeholderIndex > thisIndex &&
                        ((options.orientation === 'vertical' && pageY > offsetTop + thisHeight - deadZoneVertical) ||
                            (options.orientation === 'horizontal' && pageX > offsetLeft + thisWidth - deadZoneHorizontal))) {
                        return;
                    }
                }
                if (dragging.oldDisplay === undefined) {
                    dragging.oldDisplay = dragging.style.display;
                }
                if (dragging.style.display !== 'none') {
                    dragging.style.display = 'none';
                }
                // To avoid flicker, determine where to position the placeholder
                // based on where the mouse pointer is relative to the elements
                // vertical center.
                var placeAfter = false;
                try {
                    var elementMiddleVertical = _offset(element).top + element.offsetHeight / 2;
                    var elementMiddleHorizontal = _offset(element).left + element.offsetWidth / 2;
                    placeAfter = (options.orientation === 'vertical' && (pageY >= elementMiddleVertical)) ||
                        (options.orientation === 'horizontal' && (pageX >= elementMiddleHorizontal));
                }
                catch (e) {
                    placeAfter = placeholderIndex < thisIndex;
                }
                if (placeAfter) {
                    insertAfter(element, store(sortableElement).placeholder);
                }
                else {
                    insertBefore(element, store(sortableElement).placeholder);
                }
                // get placeholders from all stores & remove all but current one
                Array.from(stores.values())
                    // remove empty values
                    .filter(function (data) { return data.placeholder !== undefined; })
                    // foreach placeholder in array if outside of current sorableContainer -> remove from DOM
                    .forEach(function (data) {
                    if (data.placeholder !== store(sortableElement).placeholder) {
                        data.placeholder.remove();
                    }
                });
            }
            else {
                // get all placeholders from store
                var placeholders = Array.from(stores.values())
                    .filter(function (data) { return data.placeholder !== undefined; })
                    .map(function (data) {
                    return data.placeholder;
                });
                // check if element is not in placeholders
                if (placeholders.indexOf(element) === -1 && sortableElement === element && !_filter(element.children, options.items).length) {
                    placeholders.forEach(function (element) { return element.remove(); });
                    element.appendChild(store(sortableElement).placeholder);
                }
            }
        }, options.debounce);
        // Handle dragover and dragenter events on draggable items
        var onDragOverEnter = function (e) {
            var element = e.target;
            var sortableElement = element.isSortable === true ? element : findSortable(element, e);
            element = findDragElement(sortableElement, element);
            if (!dragging || !_listsConnected(sortableElement, dragging.parentElement) || addData(sortableElement, '_disabled') === 'true') {
                return;
            }
            var options = addData(sortableElement, 'opts');
            if (parseInt(options.maxItems) && _filter(sortableElement.children, addData(sortableElement, 'items')).length >= parseInt(options.maxItems) && dragging.parentElement !== sortableElement) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            e.dataTransfer.dropEffect = store(sortableElement).getConfig('copy') === true ? 'copy' : 'move';
            debouncedDragOverEnter(sortableElement, element, e.pageX, e.pageY);
        };
        addEventListener(listItems.concat(sortableElement), 'dragover', onDragOverEnter);
        addEventListener(listItems.concat(sortableElement), 'dragenter', onDragOverEnter);
    });
    return sortableElements;
}
sortable.destroy = function (sortableElement) {
    _destroySortable(sortableElement);
};
sortable.enable = function (sortableElement) {
    _enableSortable(sortableElement);
};
sortable.disable = function (sortableElement) {
    _disableSortable(sortableElement);
};
/* START.TESTS_ONLY */
sortable.__testing = {
    // add internal methods here for testing purposes
    _data: addData,
    _removeItemEvents: _removeItemEvents,
    _removeItemData: _removeItemData,
    _removeSortableData: _removeSortableData
};

/* harmony default export */ __webpack_exports__["default"] = (sortable);


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
    path: '/mason',
    component: _panes_MasonFieldsPane__WEBPACK_IMPORTED_MODULE_4__["default"].component()
  }; // bind the route we created to the three dots settings button

  flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.extensionSettings['flagrow-mason'] = function () {
    return m.route(flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.route('flagrow-mason-fields'));
  };

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'items', function (items) {
    // add the Image Upload tab to the admin navigation menu
    items.add('flagrow-mason-fields', flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      href: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.route('flagrow-mason-fields'),
      icon: 'fas fa-dungeon',
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
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/utils/ItemList */ "flarum/utils/ItemList");
/* harmony import */ var flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/PermissionGrid */ "flarum/components/PermissionGrid");
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'permissionItems', function (groups) {
    var items = new flarum_utils_ItemList__WEBPACK_IMPORTED_MODULE_2___default.a();
    items.add('see-own-fields', {
      icon: 'fas fa-eye',
      label: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.permissions.see-own-fields'),
      permission: 'flagrow.mason.see-own-fields'
    });
    items.add('see-other-fields', {
      icon: 'fas fa-eye',
      label: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.permissions.see-other-fields'),
      permission: 'flagrow.mason.see-other-fields',
      allowGuest: true
    });
    items.add('fill-fields', {
      icon: 'fas fa-tasks',
      label: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.permissions.fill-fields'),
      permission: 'flagrow.mason.fill-fields'
    });
    items.add('update-own-fields', {
      icon: 'fas fa-edit',
      label: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.permissions.update-own-fields'),
      permission: 'flagrow.mason.update-own-fields'
    });
    items.add('update-other-fields', {
      icon: 'fas fa-edit',
      label: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.permissions.update-other-fields'),
      permission: 'flagrow.mason.update-other-fields',
      allowGuest: true
    });
    items.add('skip-required-fields', {
      icon: 'fas fa-forward',
      label: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.permissions.skip-required-fields'),
      permission: 'flagrow.mason.skip-required-fields'
    });
    groups.add('flagrow-mason', {
      label: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.permissions.mason-heading'),
      children: items.toArray()
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
    this.answer.is_suggested() ? [m('span.fa.fa-arrows-alt-v.Mason-Box--handle.js-answer-handle'), ' '] : null, m('span', {
      onclick: function onclick() {
        var newContent = prompt('Edit content', _this.answer.content());

        if (newContent) {
          _this.updateAttribute('content', newContent);
        }
      }
    }, [this.answer.content(), ' ', flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()('fas fa-pen')]), flarum_components_Switch__WEBPACK_IMPORTED_MODULE_5___default.a.component({
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
    })["catch"](function (err) {
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
    this.answer["delete"]().then(function () {
      _this3.processing = false;
      m.redraw();
    })["catch"](function (err) {
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
/* harmony import */ var html5sortable_dist_html5sortable_es_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! html5sortable/dist/html5sortable.es.js */ "./node_modules/html5sortable/dist/html5sortable.es.js");
/* harmony import */ var _lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../lib/helpers/sortByAttribute */ "./src/lib/helpers/sortByAttribute.js");









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
    Object(html5sortable_dist_html5sortable_es_js__WEBPACK_IMPORTED_MODULE_6__["default"])('.js-answers-container', {
      handle: '.js-answers-handle',
      items: '.js-answers-data'
    }).forEach(function (el) {
      $(el).off('sortupdate').on('sortupdate', function (e) {
        var sorting = e.detail.destination.items.map(function (item) {
          return $(item).data('id');
        });
        self.updateSort(sorting);
      });
    });
  };

  _proto.view = function view() {
    var _this = this;

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
    return m('div', [m('.Mason-Container.js-answers-container', Object(_lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_7__["default"])(suggestedAnswers).map(function (answer) {
      return m('.js-answer-data', {
        key: answer.id(),
        'data-id': answer.id()
      }, _AnswerEdit__WEBPACK_IMPORTED_MODULE_5__["default"].component({
        answer: answer
      }));
    })), userAnswers.length ? [m('.Button.Button--block.Mason-Box-Header', {
      onclick: function onclick() {
        _this.showUserAnswers = !_this.showUserAnswers;
      }
    }, [m('.Mason-Box-Header-Title', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.buttons.show-user-answers', {
      count: userAnswers.length
    })), m('div', [flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()('fas fa-chevron-' + (this.showUserAnswers ? 'up' : 'down'))])]), // The list of user answers can't be re-ordered
    this.showUserAnswers ? m('.Mason-Container', Object(_lib_helpers_sortByAttribute__WEBPACK_IMPORTED_MODULE_7__["default"])(userAnswers, 'content').map(function (answer) {
      return m('div', {
        key: answer.id()
      }, _AnswerEdit__WEBPACK_IMPORTED_MODULE_5__["default"].component({
        answer: answer
      }));
    })) : null] : null, m('form', [m('.Form-group', [m('label', 'New answer'), m('input.FormControl', {
      value: this.new_content,
      oninput: m.withAttr('value', function (value) {
        _this.new_content = value;
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
    var _this2 = this;

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
      _this2.new_content = '';
      _this2.processing = false;
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

    return m('.Mason-Box', [this.field.exists ? m('span.fa.fa-arrows-alt-v.Mason-Box--handle.js-field-handle') : null, m('.Button.Button--block.Mason-Box-Header', {
      onclick: function onclick() {
        _this.toggleFields = !_this.toggleFields;
      }
    }, [m('.Mason-Box-Header-Title', this.boxTitle()), m('div', [this.field.exists ? [flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.buttons.edit-field'), ' '] : null, flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()('fas fa-chevron-' + (this.toggleFields ? 'up' : 'down'))])]), this.toggleFields ? this.viewFields() : null]);
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
      a: m('a[href=https://fontawesome.com/icons?m=free][_target=blank]')
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
    })["catch"](function (err) {
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
    this.field["delete"]().then(function () {
      _this4.processing = false;
      m.redraw();
    })["catch"](function (err) {
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
  }
  /**
   * Updates setting in database.
   * @param prop
   * @param setting
   * @param value
   */
  ;

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
/* harmony import */ var html5sortable_dist_html5sortable_es_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! html5sortable/dist/html5sortable.es.js */ "./node_modules/html5sortable/dist/html5sortable.es.js");
/* harmony import */ var _components_MasonSettings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../components/MasonSettings */ "./src/admin/components/MasonSettings.js");








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
    var self = this;
    Object(html5sortable_dist_html5sortable_es_js__WEBPACK_IMPORTED_MODULE_5__["default"])('.js-fields-container', {
      handle: '.js-field-handle',
      items: '.js-field-data'
    }).forEach(function (el) {
      $(el).off('sortupdate').on('sortupdate', function (e) {
        var sorting = e.detail.destination.items.map(function (item) {
          return $(item).data('id');
        });
        self.updateSort(sorting);
      });
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
    })]), m('h2', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-mason.admin.titles.settings')), _components_MasonSettings__WEBPACK_IMPORTED_MODULE_6__["default"].component()]);
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
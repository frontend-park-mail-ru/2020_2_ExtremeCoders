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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === 'function') {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
___CSS_LOADER_EXPORT___.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ":root {\n  --font-1: \"Roboto\", sans-serif;\n  --font-2: \"Inter\", sans-serif;\n  --font-mono: Consolas, \"Andale Mono\", Courier, \"Courier New\", monospace; }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/font.css"],"names":[],"mappings":"AACA;EACE,8BAA8B;EAC9B,6BAA6B;EAC7B,uEAAuE,EAAE","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap\");\n:root {\n  --font-1: \"Roboto\", sans-serif;\n  --font-2: \"Inter\", sans-serif;\n  --font-mono: Consolas, \"Andale Mono\", Courier, \"Courier New\", monospace; }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ":root {\n  --color-1: hsla(222, 83%, 27%, 1);\n  --color-2: hsla(356, 74%, 52%, 1);\n  --color-3: hsla(170, 100%, 35%, 1);\n  --color-1-lighter: hsla(222, 83%, 47%, 1);\n  --color-1-light: hsla(222, 83%, 37%, 1);\n  --color-1-dark: hsla(222, 83%, 17%, 1);\n  --color-1-darker: hsla(222, 83%, 10%, 1);\n  --color-2-lighter: hsla(356, 74%, 72%, 1);\n  --color-2-light: hsla(356, 74%, 62%, 1);\n  --color-2-dark: hsla(356, 74%, 42%, 1);\n  --color-2-darker: hsla(356, 74%, 32%, 1);\n  --color-error: hsla(359, 100%, 91%, 1);\n  --color-success: hsla(76, 69%, 68%, 1);\n  --color-info: hsla(205, 82%, 91%, 1);\n  --color-notice: hsla(51, 100%, 80%, 1);\n  --color-error-content: hsla(359, 50%, 50%, 1);\n  --color-success-content: hsla(76, 29%, 28%, 1);\n  --color-info-content: hsla(205, 32%, 31%, 1);\n  --color-notice-content: hsla(51, 30%, 30%, 1);\n  --color-black: #000000;\n  --color-gray-19: #0a0a0a;\n  --color-gray-18: #141414;\n  --color-gray-17: #1e1e1e;\n  --color-gray-16: #282828;\n  --color-gray-15: #333333;\n  --color-gray-14: #3d3d3d;\n  --color-gray-13: #474747;\n  --color-gray-12: #515151;\n  --color-gray-11: #5b5b5b;\n  --color-gray-10: #656565;\n  --color-gray-9: #747474;\n  --color-gray-8: #848484;\n  --color-gray-7: #939393;\n  --color-gray-6: #a3a3a3;\n  --color-gray-5: #b2b2b2;\n  --color-gray-4: #c1c1c1;\n  --color-gray-3: #d1d1d1;\n  --color-gray-2: #e0e0e0;\n  --color-gray-1: #f0f0f0;\n  --color-white: #ffffff;\n  --color-text: var(--color-gray-18);\n  --color-text-dark: var(--color-black);\n  --color-text-light: var(--color-gray-8);\n  --color-placeholder: var(--color-gray-8);\n  --color-btn: var(--color-gray-3);\n  --color-btn-text: var(--color-black);\n  --color-btn-hover: var(--color-1);\n  --color-btn-hover-text: var(--color-white);\n  --color-btn-primary: var(--color-black);\n  --color-btn-primary-text: var(--color-white);\n  --color-btn-primary-hover: var(--color-1);\n  --color-btn-primary-hover-text: var(--color-white);\n  --color-btn-stroke: var(--color-black);\n  --color-btn-stroke-text: var(--color-black);\n  --color-btn-stroke-hover: var(--color-1);\n  --color-btn-stroke-hover-text: var(--color-white);\n  --color-white-bg: white;\n  --color-body: #f5f5f5;\n  --color-border: var(--color-gray-2); }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/color.css"],"names":[],"mappings":"AAAA;EACE,iCAAiC;EACjC,iCAAiC;EACjC,kCAAkC;EAClC,yCAAyC;EACzC,uCAAuC;EACvC,sCAAsC;EACtC,wCAAwC;EACxC,yCAAyC;EACzC,uCAAuC;EACvC,sCAAsC;EACtC,wCAAwC;EACxC,sCAAsC;EACtC,sCAAsC;EACtC,oCAAoC;EACpC,sCAAsC;EACtC,6CAA6C;EAC7C,8CAA8C;EAC9C,4CAA4C;EAC5C,6CAA6C;EAC7C,sBAAsB;EACtB,wBAAwB;EACxB,wBAAwB;EACxB,wBAAwB;EACxB,wBAAwB;EACxB,wBAAwB;EACxB,wBAAwB;EACxB,wBAAwB;EACxB,wBAAwB;EACxB,wBAAwB;EACxB,wBAAwB;EACxB,uBAAuB;EACvB,uBAAuB;EACvB,uBAAuB;EACvB,uBAAuB;EACvB,uBAAuB;EACvB,uBAAuB;EACvB,uBAAuB;EACvB,uBAAuB;EACvB,uBAAuB;EACvB,sBAAsB;EACtB,kCAAkC;EAClC,qCAAqC;EACrC,uCAAuC;EACvC,wCAAwC;EACxC,gCAAgC;EAChC,oCAAoC;EACpC,iCAAiC;EACjC,0CAA0C;EAC1C,uCAAuC;EACvC,4CAA4C;EAC5C,yCAAyC;EACzC,kDAAkD;EAClD,sCAAsC;EACtC,2CAA2C;EAC3C,wCAAwC;EACxC,iDAAiD;EACjD,uBAAuB;EACvB,qBAAqB;EACrB,mCAAmC,EAAE","sourcesContent":[":root {\n  --color-1: hsla(222, 83%, 27%, 1);\n  --color-2: hsla(356, 74%, 52%, 1);\n  --color-3: hsla(170, 100%, 35%, 1);\n  --color-1-lighter: hsla(222, 83%, 47%, 1);\n  --color-1-light: hsla(222, 83%, 37%, 1);\n  --color-1-dark: hsla(222, 83%, 17%, 1);\n  --color-1-darker: hsla(222, 83%, 10%, 1);\n  --color-2-lighter: hsla(356, 74%, 72%, 1);\n  --color-2-light: hsla(356, 74%, 62%, 1);\n  --color-2-dark: hsla(356, 74%, 42%, 1);\n  --color-2-darker: hsla(356, 74%, 32%, 1);\n  --color-error: hsla(359, 100%, 91%, 1);\n  --color-success: hsla(76, 69%, 68%, 1);\n  --color-info: hsla(205, 82%, 91%, 1);\n  --color-notice: hsla(51, 100%, 80%, 1);\n  --color-error-content: hsla(359, 50%, 50%, 1);\n  --color-success-content: hsla(76, 29%, 28%, 1);\n  --color-info-content: hsla(205, 32%, 31%, 1);\n  --color-notice-content: hsla(51, 30%, 30%, 1);\n  --color-black: #000000;\n  --color-gray-19: #0a0a0a;\n  --color-gray-18: #141414;\n  --color-gray-17: #1e1e1e;\n  --color-gray-16: #282828;\n  --color-gray-15: #333333;\n  --color-gray-14: #3d3d3d;\n  --color-gray-13: #474747;\n  --color-gray-12: #515151;\n  --color-gray-11: #5b5b5b;\n  --color-gray-10: #656565;\n  --color-gray-9: #747474;\n  --color-gray-8: #848484;\n  --color-gray-7: #939393;\n  --color-gray-6: #a3a3a3;\n  --color-gray-5: #b2b2b2;\n  --color-gray-4: #c1c1c1;\n  --color-gray-3: #d1d1d1;\n  --color-gray-2: #e0e0e0;\n  --color-gray-1: #f0f0f0;\n  --color-white: #ffffff;\n  --color-text: var(--color-gray-18);\n  --color-text-dark: var(--color-black);\n  --color-text-light: var(--color-gray-8);\n  --color-placeholder: var(--color-gray-8);\n  --color-btn: var(--color-gray-3);\n  --color-btn-text: var(--color-black);\n  --color-btn-hover: var(--color-1);\n  --color-btn-hover-text: var(--color-white);\n  --color-btn-primary: var(--color-black);\n  --color-btn-primary-text: var(--color-white);\n  --color-btn-primary-hover: var(--color-1);\n  --color-btn-primary-hover-text: var(--color-white);\n  --color-btn-stroke: var(--color-black);\n  --color-btn-stroke-text: var(--color-black);\n  --color-btn-stroke-hover: var(--color-1);\n  --color-btn-stroke-hover-text: var(--color-white);\n  --color-white-bg: white;\n  --color-body: #f5f5f5;\n  --color-border: var(--color-gray-2); }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ":root {\n  --base-size: 62.5%;\n  --base-font-size: 1.8rem;\n  --space: 3.2rem;\n  --vspace-0_125: calc(0.25 * var(--space));\n  --vspace-0_25: calc(0.25 * var(--space));\n  --vspace-0_5: calc(0.5 * var(--space));\n  --vspace-0_75: calc(0.75 * var(--space));\n  --vspace-0_875: calc(0.875 * var(--space));\n  --vspace-1: calc(var(--space));\n  --vspace-1_25: calc(1.25 * var(--space));\n  --vspace-1_5: calc(1.5 * var(--space));\n  --vspace-1_75: calc(1.75 * var(--space));\n  --vspace-2: calc(2 * var(--space));\n  --vspace-2_5: calc(2.5 * var(--space));\n  --vspace-3: calc(3 * var(--space));\n  --vspace-3_5: calc(3.5 * var(--space));\n  --vspace-4: calc(4 * var(--space));\n  --vspace-4_5: calc(4.5 * var(--space));\n  --vspace-5: calc(5 * var(--space));\n  --topspace: calc(var(--vspace-0_125) + 40px);\n  --text-scale-ratio: 1.2;\n  --text-size: var(--base-font-size);\n  --text-xs: calc((var(--text-size) / var(--text-scale-ratio)) / var(--text-scale-ratio));\n  --text-sm: calc(var(--text-xs) * var(--text-scale-ratio));\n  --text-md: calc(var(--text-sm) * var(--text-scale-ratio) * var(--text-scale-ratio));\n  --text-lg: calc(var(--text-md) * var(--text-scale-ratio));\n  --text-xl: calc(var(--text-lg) * var(--text-scale-ratio));\n  --text-xxl: calc(var(--text-xl) * var(--text-scale-ratio));\n  --text-xxxl: calc(var(--text-xxl) * var(--text-scale-ratio));\n  --text-display-1: calc(var(--text-xxxl) * var(--text-scale-ratio));\n  --text-display-2: calc(var(--text-display-1) * var(--text-scale-ratio));\n  --text-display-3: calc(var(--text-display-2) * var(--text-scale-ratio));\n  --vspace-btn: var(--vspace-2); }\n\n@media screen and (max-width: 600px) {\n  :root {\n    --base-font-size: 1.6rem;\n    --space: 2.8rem; } }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/spacing.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,wBAAwB;EACxB,eAAe;EACf,yCAAyC;EACzC,wCAAwC;EACxC,sCAAsC;EACtC,wCAAwC;EACxC,0CAA0C;EAC1C,8BAA8B;EAC9B,wCAAwC;EACxC,sCAAsC;EACtC,wCAAwC;EACxC,kCAAkC;EAClC,sCAAsC;EACtC,kCAAkC;EAClC,sCAAsC;EACtC,kCAAkC;EAClC,sCAAsC;EACtC,kCAAkC;EAClC,4CAA4C;EAC5C,uBAAuB;EACvB,kCAAkC;EAClC,uFAAuF;EACvF,yDAAyD;EACzD,mFAAmF;EACnF,yDAAyD;EACzD,yDAAyD;EACzD,0DAA0D;EAC1D,4DAA4D;EAC5D,kEAAkE;EAClE,uEAAuE;EACvE,uEAAuE;EACvE,6BAA6B,EAAE;;AAEjC;EACE;IACE,wBAAwB;IACxB,eAAe,EAAE,EAAE","sourcesContent":[":root {\n  --base-size: 62.5%;\n  --base-font-size: 1.8rem;\n  --space: 3.2rem;\n  --vspace-0_125: calc(0.25 * var(--space));\n  --vspace-0_25: calc(0.25 * var(--space));\n  --vspace-0_5: calc(0.5 * var(--space));\n  --vspace-0_75: calc(0.75 * var(--space));\n  --vspace-0_875: calc(0.875 * var(--space));\n  --vspace-1: calc(var(--space));\n  --vspace-1_25: calc(1.25 * var(--space));\n  --vspace-1_5: calc(1.5 * var(--space));\n  --vspace-1_75: calc(1.75 * var(--space));\n  --vspace-2: calc(2 * var(--space));\n  --vspace-2_5: calc(2.5 * var(--space));\n  --vspace-3: calc(3 * var(--space));\n  --vspace-3_5: calc(3.5 * var(--space));\n  --vspace-4: calc(4 * var(--space));\n  --vspace-4_5: calc(4.5 * var(--space));\n  --vspace-5: calc(5 * var(--space));\n  --topspace: calc(var(--vspace-0_125) + 40px);\n  --text-scale-ratio: 1.2;\n  --text-size: var(--base-font-size);\n  --text-xs: calc((var(--text-size) / var(--text-scale-ratio)) / var(--text-scale-ratio));\n  --text-sm: calc(var(--text-xs) * var(--text-scale-ratio));\n  --text-md: calc(var(--text-sm) * var(--text-scale-ratio) * var(--text-scale-ratio));\n  --text-lg: calc(var(--text-md) * var(--text-scale-ratio));\n  --text-xl: calc(var(--text-lg) * var(--text-scale-ratio));\n  --text-xxl: calc(var(--text-xl) * var(--text-scale-ratio));\n  --text-xxxl: calc(var(--text-xxl) * var(--text-scale-ratio));\n  --text-display-1: calc(var(--text-xxxl) * var(--text-scale-ratio));\n  --text-display-2: calc(var(--text-display-1) * var(--text-scale-ratio));\n  --text-display-3: calc(var(--text-display-2) * var(--text-scale-ratio));\n  --vspace-btn: var(--vspace-2); }\n\n@media screen and (max-width: 600px) {\n  :root {\n    --base-font-size: 1.6rem;\n    --space: 2.8rem; } }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ":root {\n  --width-full: 100%;\n  --width-max: 1200px;\n  --width-wide: 1400px;\n  --width-wider: 1600px;\n  --width-widest: 1800px;\n  --width-narrow: 1000px;\n  --width-narrower: 900px;\n  --width-grid-max: var(--width-max);\n  --gutter-lg: 2rem;\n  --gutter-md: 1.8rem;\n  --gutter-mob: 1rem; }\n\n.row {\n  width: 92%;\n  margin: 0 auto;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n  -ms-flex-flow: row wrap;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  flex-flow: row wrap; }\n  .row .row {\n    width: auto;\n    max-width: none;\n    margin-left: calc(var(--gutter-lg) * -1);\n    margin-right: calc(var(--gutter-lg) * -1); }\n  .row .row-wrap {\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap; }\n  .row .row-nowrap {\n    -ms-flex-wrap: none;\n    flex-wrap: nowrap; }\n  .row .row-y-top {\n    -ms-flex-align: start;\n    -webkit-box-align: start;\n    align-items: flex-start; }\n  .row .row-y-bottom {\n    -ms-flex-align: end;\n    -webkit-box-align: end;\n    align-items: flex-end; }\n  .row .row-y-center {\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center; }\n  .row .row-stretch {\n    -ms-flex-align: stretch;\n    -webkit-box-align: stretch;\n    align-items: stretch; }\n  .row .row-baseline {\n    -ms-flex-align: baseline;\n    -webkit-box-align: baseline;\n    align-items: baseline; }\n  .row .row-x-left {\n    -ms-flex-pack: start;\n    -webkit-box-pack: start;\n    justify-content: flex-start; }\n  .row .row-x-right {\n    -ms-flex-pack: end;\n    -webkit-box-pack: end;\n    justify-content: flex-end; }\n  .row .row-x-center {\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center; }\n\n.column {\n  -ms-flex: 1 1 0%;\n  -webkit-box-flex: 1;\n  flex: 1 1 0%;\n  padding: 0 var(--gutter-lg); }\n\n.collapse > .column, .column.collapse {\n  padding: 0; }\n\n.large-1 {\n  -ms-flex: 0 0 8.33333%;\n  -webkit-box-flex: 0;\n  flex: 0 0 8.33333%;\n  max-width: 8.33333%; }\n\n.large-2 {\n  -ms-flex: 0 0 16.66667%;\n  -webkit-box-flex: 0;\n  flex: 0 0 16.66667%;\n  max-width: 16.66667%; }\n\n.large-3 {\n  -ms-flex: 0 0 25%;\n  -webkit-box-flex: 0;\n  flex: 0 0 25%;\n  max-width: 25%; }\n\n.large-4 {\n  -ms-flex: 0 0 33.33333%;\n  -webkit-box-flex: 0;\n  flex: 0 0 33.33333%;\n  max-width: 33.33333%; }\n\n.large-5 {\n  -ms-flex: 0 0 41.66667%;\n  -webkit-box-flex: 0;\n  flex: 0 0 41.66667%;\n  max-width: 41.66667%; }\n\n.large-6 {\n  -ms-flex: 0 0 50%;\n  -webkit-box-flex: 0;\n  flex: 0 0 50%;\n  max-width: 50%; }\n\n.large-7 {\n  -ms-flex: 0 0 58.33333%;\n  -webkit-box-flex: 0;\n  flex: 0 0 58.33333%;\n  max-width: 58.33333%; }\n\n.large-8 {\n  -ms-flex: 0 0 66.66667%;\n  -webkit-box-flex: 0;\n  flex: 0 0 66.66667%;\n  max-width: 66.66667%; }\n\n.large-9 {\n  -ms-flex: 0 0 75%;\n  -webkit-box-flex: 0;\n  flex: 0 0 75%;\n  max-width: 75%; }\n\n.large-10 {\n  -ms-flex: 0 0 83.33333%;\n  -webkit-box-flex: 0;\n  flex: 0 0 83.33333%;\n  max-width: 83.33333%; }\n\n.large-11 {\n  -ms-flex: 0 0 91.66667%;\n  -webkit-box-flex: 0;\n  flex: 0 0 91.66667%;\n  max-width: 91.66667%; }\n\n.large-12 {\n  -ms-flex: 0 0 100%;\n  -webkit-box-flex: 0;\n  flex: 0 0 100%;\n  max-width: 100%; }\n\n@media screen and (max-width: 1200px) {\n  .row .row {\n    margin-left: calc(var(--gutter-md) * -1);\n    margin-right: calc(var(--gutter-md) * -1); }\n  .column {\n    padding: 0 var(--gutter-md); }\n  .medium-1 {\n    -ms-flex: 0 0 8.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .medium-2 {\n    -ms-flex: 0 0 16.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .medium-3 {\n    -ms-flex: 0 0 25%;\n    -webkit-box-flex: 0;\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .medium-4 {\n    -ms-flex: 0 0 33.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .medium-5 {\n    -ms-flex: 0 0 41.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .medium-6 {\n    -ms-flex: 0 0 50%;\n    -webkit-box-flex: 0;\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .medium-7 {\n    -ms-flex: 0 0 58.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .medium-8 {\n    -ms-flex: 0 0 66.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .medium-9 {\n    -ms-flex: 0 0 75%;\n    -webkit-box-flex: 0;\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .medium-10 {\n    -ms-flex: 0 0 83.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .medium-11 {\n    -ms-flex: 0 0 91.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .medium-12 {\n    -ms-flex: 0 0 100%;\n    -webkit-box-flex: 0;\n    flex: 0 0 100%;\n    max-width: 100%; } }\n\n@media screen and (max-width: 800px) {\n  .row {\n    width: 90%; }\n  .tab-1 {\n    -ms-flex: 0 0 8.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .tab-2 {\n    -ms-flex: 0 0 16.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .tab-3 {\n    -ms-flex: 0 0 25%;\n    -webkit-box-flex: 0;\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .tab-4 {\n    -ms-flex: 0 0 33.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .tab-5 {\n    -ms-flex: 0 0 41.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .tab-6 {\n    -ms-flex: 0 0 50%;\n    -webkit-box-flex: 0;\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .tab-7 {\n    -ms-flex: 0 0 58.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .tab-8 {\n    -ms-flex: 0 0 66.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .tab-9 {\n    -ms-flex: 0 0 75%;\n    -webkit-box-flex: 0;\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .tab-10 {\n    -ms-flex: 0 0 83.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .tab-11 {\n    -ms-flex: 0 0 91.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .tab-12 {\n    -ms-flex: 0 0 100%;\n    -webkit-box-flex: 0;\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .hide-on-tablet {\n    display: none; } }\n\n@media screen and (max-width: 600px) {\n  .row {\n    width: 100%;\n    padding-left: 6vw;\n    padding-right: 6vw; }\n    .row .row {\n      margin-left: calc(var(--gutter-mob) * -1);\n      margin-right: calc(var(--gutter-mob) * -1);\n      padding-left: 0;\n      padding-right: 0; }\n  .column {\n    padding: 0 var(--gutter-mob); }\n  .mob-1 {\n    -ms-flex: 0 0 8.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .mob-2 {\n    -ms-flex: 0 0 16.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .mob-3 {\n    -ms-flex: 0 0 25%;\n    -webkit-box-flex: 0;\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .mob-4 {\n    -ms-flex: 0 0 33.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .mob-5 {\n    -ms-flex: 0 0 41.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .mob-6 {\n    -ms-flex: 0 0 50%;\n    -webkit-box-flex: 0;\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .mob-7 {\n    -ms-flex: 0 0 58.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .mob-8 {\n    -ms-flex: 0 0 66.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .mob-9 {\n    -ms-flex: 0 0 75%;\n    -webkit-box-flex: 0;\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .mob-10 {\n    -ms-flex: 0 0 83.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .mob-11 {\n    -ms-flex: 0 0 91.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .mob-12 {\n    -ms-flex: 0 0 100%;\n    -webkit-box-flex: 0;\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .hide-on-mobile {\n    display: none; } }\n\n@media screen and (max-width: 400px) {\n  .row .row {\n    margin-left: 0;\n    margin-right: 0; }\n  .column {\n    -ms-flex: 0 0 100%;\n    -webkit-box-flex: 0;\n    flex: 0 0 100%;\n    max-width: 100%;\n    margin-left: 0;\n    margin-right: 0;\n    padding: 0; } }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/grid.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,oBAAoB;EACpB,qBAAqB;EACrB,sBAAsB;EACtB,sBAAsB;EACtB,uBAAuB;EACvB,kCAAkC;EAClC,iBAAiB;EACjB,mBAAmB;EACnB,kBAAkB,EAAE;;AAEtB;EACE,UAAU;EACV,cAAc;EACd,oBAAoB;EACpB,oBAAoB;EACpB,aAAa;EACb,uBAAuB;EACvB,8BAA8B;EAC9B,6BAA6B;EAC7B,mBAAmB,EAAE;EACrB;IACE,WAAW;IACX,eAAe;IACf,wCAAwC;IACxC,yCAAyC,EAAE;EAC7C;IACE,mBAAmB;IACnB,eAAe,EAAE;EACnB;IACE,mBAAmB;IACnB,iBAAiB,EAAE;EACrB;IACE,qBAAqB;IACrB,wBAAwB;IACxB,uBAAuB,EAAE;EAC3B;IACE,mBAAmB;IACnB,sBAAsB;IACtB,qBAAqB,EAAE;EACzB;IACE,sBAAsB;IACtB,yBAAyB;IACzB,mBAAmB,EAAE;EACvB;IACE,uBAAuB;IACvB,0BAA0B;IAC1B,oBAAoB,EAAE;EACxB;IACE,wBAAwB;IACxB,2BAA2B;IAC3B,qBAAqB,EAAE;EACzB;IACE,oBAAoB;IACpB,uBAAuB;IACvB,2BAA2B,EAAE;EAC/B;IACE,kBAAkB;IAClB,qBAAqB;IACrB,yBAAyB,EAAE;EAC7B;IACE,qBAAqB;IACrB,wBAAwB;IACxB,uBAAuB,EAAE;;AAE7B;EACE,gBAAgB;EAChB,mBAAmB;EACnB,YAAY;EACZ,2BAA2B,EAAE;;AAE/B;EACE,UAAU,EAAE;;AAEd;EACE,sBAAsB;EACtB,mBAAmB;EACnB,kBAAkB;EAClB,mBAAmB,EAAE;;AAEvB;EACE,uBAAuB;EACvB,mBAAmB;EACnB,mBAAmB;EACnB,oBAAoB,EAAE;;AAExB;EACE,iBAAiB;EACjB,mBAAmB;EACnB,aAAa;EACb,cAAc,EAAE;;AAElB;EACE,uBAAuB;EACvB,mBAAmB;EACnB,mBAAmB;EACnB,oBAAoB,EAAE;;AAExB;EACE,uBAAuB;EACvB,mBAAmB;EACnB,mBAAmB;EACnB,oBAAoB,EAAE;;AAExB;EACE,iBAAiB;EACjB,mBAAmB;EACnB,aAAa;EACb,cAAc,EAAE;;AAElB;EACE,uBAAuB;EACvB,mBAAmB;EACnB,mBAAmB;EACnB,oBAAoB,EAAE;;AAExB;EACE,uBAAuB;EACvB,mBAAmB;EACnB,mBAAmB;EACnB,oBAAoB,EAAE;;AAExB;EACE,iBAAiB;EACjB,mBAAmB;EACnB,aAAa;EACb,cAAc,EAAE;;AAElB;EACE,uBAAuB;EACvB,mBAAmB;EACnB,mBAAmB;EACnB,oBAAoB,EAAE;;AAExB;EACE,uBAAuB;EACvB,mBAAmB;EACnB,mBAAmB;EACnB,oBAAoB,EAAE;;AAExB;EACE,kBAAkB;EAClB,mBAAmB;EACnB,cAAc;EACd,eAAe,EAAE;;AAEnB;EACE;IACE,wCAAwC;IACxC,yCAAyC,EAAE;EAC7C;IACE,2BAA2B,EAAE;EAC/B;IACE,sBAAsB;IACtB,mBAAmB;IACnB,kBAAkB;IAClB,mBAAmB,EAAE;EACvB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,iBAAiB;IACjB,mBAAmB;IACnB,aAAa;IACb,cAAc,EAAE;EAClB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,iBAAiB;IACjB,mBAAmB;IACnB,aAAa;IACb,cAAc,EAAE;EAClB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,iBAAiB;IACjB,mBAAmB;IACnB,aAAa;IACb,cAAc,EAAE;EAClB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,kBAAkB;IAClB,mBAAmB;IACnB,cAAc;IACd,eAAe,EAAE,EAAE;;AAEvB;EACE;IACE,UAAU,EAAE;EACd;IACE,sBAAsB;IACtB,mBAAmB;IACnB,kBAAkB;IAClB,mBAAmB,EAAE;EACvB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,iBAAiB;IACjB,mBAAmB;IACnB,aAAa;IACb,cAAc,EAAE;EAClB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,iBAAiB;IACjB,mBAAmB;IACnB,aAAa;IACb,cAAc,EAAE;EAClB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,iBAAiB;IACjB,mBAAmB;IACnB,aAAa;IACb,cAAc,EAAE;EAClB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,kBAAkB;IAClB,mBAAmB;IACnB,cAAc;IACd,eAAe,EAAE;EACnB;IACE,aAAa,EAAE,EAAE;;AAErB;EACE;IACE,WAAW;IACX,iBAAiB;IACjB,kBAAkB,EAAE;IACpB;MACE,yCAAyC;MACzC,0CAA0C;MAC1C,eAAe;MACf,gBAAgB,EAAE;EACtB;IACE,4BAA4B,EAAE;EAChC;IACE,sBAAsB;IACtB,mBAAmB;IACnB,kBAAkB;IAClB,mBAAmB,EAAE;EACvB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,iBAAiB;IACjB,mBAAmB;IACnB,aAAa;IACb,cAAc,EAAE;EAClB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,iBAAiB;IACjB,mBAAmB;IACnB,aAAa;IACb,cAAc,EAAE;EAClB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,iBAAiB;IACjB,mBAAmB;IACnB,aAAa;IACb,cAAc,EAAE;EAClB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB,EAAE;EACxB;IACE,kBAAkB;IAClB,mBAAmB;IACnB,cAAc;IACd,eAAe,EAAE;EACnB;IACE,aAAa,EAAE,EAAE;;AAErB;EACE;IACE,cAAc;IACd,eAAe,EAAE;EACnB;IACE,kBAAkB;IAClB,mBAAmB;IACnB,cAAc;IACd,eAAe;IACf,cAAc;IACd,eAAe;IACf,UAAU,EAAE,EAAE","sourcesContent":[":root {\n  --width-full: 100%;\n  --width-max: 1200px;\n  --width-wide: 1400px;\n  --width-wider: 1600px;\n  --width-widest: 1800px;\n  --width-narrow: 1000px;\n  --width-narrower: 900px;\n  --width-grid-max: var(--width-max);\n  --gutter-lg: 2rem;\n  --gutter-md: 1.8rem;\n  --gutter-mob: 1rem; }\n\n.row {\n  width: 92%;\n  margin: 0 auto;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n  -ms-flex-flow: row wrap;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  flex-flow: row wrap; }\n  .row .row {\n    width: auto;\n    max-width: none;\n    margin-left: calc(var(--gutter-lg) * -1);\n    margin-right: calc(var(--gutter-lg) * -1); }\n  .row .row-wrap {\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap; }\n  .row .row-nowrap {\n    -ms-flex-wrap: none;\n    flex-wrap: nowrap; }\n  .row .row-y-top {\n    -ms-flex-align: start;\n    -webkit-box-align: start;\n    align-items: flex-start; }\n  .row .row-y-bottom {\n    -ms-flex-align: end;\n    -webkit-box-align: end;\n    align-items: flex-end; }\n  .row .row-y-center {\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center; }\n  .row .row-stretch {\n    -ms-flex-align: stretch;\n    -webkit-box-align: stretch;\n    align-items: stretch; }\n  .row .row-baseline {\n    -ms-flex-align: baseline;\n    -webkit-box-align: baseline;\n    align-items: baseline; }\n  .row .row-x-left {\n    -ms-flex-pack: start;\n    -webkit-box-pack: start;\n    justify-content: flex-start; }\n  .row .row-x-right {\n    -ms-flex-pack: end;\n    -webkit-box-pack: end;\n    justify-content: flex-end; }\n  .row .row-x-center {\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center; }\n\n.column {\n  -ms-flex: 1 1 0%;\n  -webkit-box-flex: 1;\n  flex: 1 1 0%;\n  padding: 0 var(--gutter-lg); }\n\n.collapse > .column, .column.collapse {\n  padding: 0; }\n\n.large-1 {\n  -ms-flex: 0 0 8.33333%;\n  -webkit-box-flex: 0;\n  flex: 0 0 8.33333%;\n  max-width: 8.33333%; }\n\n.large-2 {\n  -ms-flex: 0 0 16.66667%;\n  -webkit-box-flex: 0;\n  flex: 0 0 16.66667%;\n  max-width: 16.66667%; }\n\n.large-3 {\n  -ms-flex: 0 0 25%;\n  -webkit-box-flex: 0;\n  flex: 0 0 25%;\n  max-width: 25%; }\n\n.large-4 {\n  -ms-flex: 0 0 33.33333%;\n  -webkit-box-flex: 0;\n  flex: 0 0 33.33333%;\n  max-width: 33.33333%; }\n\n.large-5 {\n  -ms-flex: 0 0 41.66667%;\n  -webkit-box-flex: 0;\n  flex: 0 0 41.66667%;\n  max-width: 41.66667%; }\n\n.large-6 {\n  -ms-flex: 0 0 50%;\n  -webkit-box-flex: 0;\n  flex: 0 0 50%;\n  max-width: 50%; }\n\n.large-7 {\n  -ms-flex: 0 0 58.33333%;\n  -webkit-box-flex: 0;\n  flex: 0 0 58.33333%;\n  max-width: 58.33333%; }\n\n.large-8 {\n  -ms-flex: 0 0 66.66667%;\n  -webkit-box-flex: 0;\n  flex: 0 0 66.66667%;\n  max-width: 66.66667%; }\n\n.large-9 {\n  -ms-flex: 0 0 75%;\n  -webkit-box-flex: 0;\n  flex: 0 0 75%;\n  max-width: 75%; }\n\n.large-10 {\n  -ms-flex: 0 0 83.33333%;\n  -webkit-box-flex: 0;\n  flex: 0 0 83.33333%;\n  max-width: 83.33333%; }\n\n.large-11 {\n  -ms-flex: 0 0 91.66667%;\n  -webkit-box-flex: 0;\n  flex: 0 0 91.66667%;\n  max-width: 91.66667%; }\n\n.large-12 {\n  -ms-flex: 0 0 100%;\n  -webkit-box-flex: 0;\n  flex: 0 0 100%;\n  max-width: 100%; }\n\n@media screen and (max-width: 1200px) {\n  .row .row {\n    margin-left: calc(var(--gutter-md) * -1);\n    margin-right: calc(var(--gutter-md) * -1); }\n  .column {\n    padding: 0 var(--gutter-md); }\n  .medium-1 {\n    -ms-flex: 0 0 8.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .medium-2 {\n    -ms-flex: 0 0 16.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .medium-3 {\n    -ms-flex: 0 0 25%;\n    -webkit-box-flex: 0;\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .medium-4 {\n    -ms-flex: 0 0 33.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .medium-5 {\n    -ms-flex: 0 0 41.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .medium-6 {\n    -ms-flex: 0 0 50%;\n    -webkit-box-flex: 0;\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .medium-7 {\n    -ms-flex: 0 0 58.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .medium-8 {\n    -ms-flex: 0 0 66.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .medium-9 {\n    -ms-flex: 0 0 75%;\n    -webkit-box-flex: 0;\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .medium-10 {\n    -ms-flex: 0 0 83.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .medium-11 {\n    -ms-flex: 0 0 91.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .medium-12 {\n    -ms-flex: 0 0 100%;\n    -webkit-box-flex: 0;\n    flex: 0 0 100%;\n    max-width: 100%; } }\n\n@media screen and (max-width: 800px) {\n  .row {\n    width: 90%; }\n  .tab-1 {\n    -ms-flex: 0 0 8.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .tab-2 {\n    -ms-flex: 0 0 16.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .tab-3 {\n    -ms-flex: 0 0 25%;\n    -webkit-box-flex: 0;\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .tab-4 {\n    -ms-flex: 0 0 33.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .tab-5 {\n    -ms-flex: 0 0 41.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .tab-6 {\n    -ms-flex: 0 0 50%;\n    -webkit-box-flex: 0;\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .tab-7 {\n    -ms-flex: 0 0 58.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .tab-8 {\n    -ms-flex: 0 0 66.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .tab-9 {\n    -ms-flex: 0 0 75%;\n    -webkit-box-flex: 0;\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .tab-10 {\n    -ms-flex: 0 0 83.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .tab-11 {\n    -ms-flex: 0 0 91.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .tab-12 {\n    -ms-flex: 0 0 100%;\n    -webkit-box-flex: 0;\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .hide-on-tablet {\n    display: none; } }\n\n@media screen and (max-width: 600px) {\n  .row {\n    width: 100%;\n    padding-left: 6vw;\n    padding-right: 6vw; }\n    .row .row {\n      margin-left: calc(var(--gutter-mob) * -1);\n      margin-right: calc(var(--gutter-mob) * -1);\n      padding-left: 0;\n      padding-right: 0; }\n  .column {\n    padding: 0 var(--gutter-mob); }\n  .mob-1 {\n    -ms-flex: 0 0 8.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .mob-2 {\n    -ms-flex: 0 0 16.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .mob-3 {\n    -ms-flex: 0 0 25%;\n    -webkit-box-flex: 0;\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .mob-4 {\n    -ms-flex: 0 0 33.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .mob-5 {\n    -ms-flex: 0 0 41.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .mob-6 {\n    -ms-flex: 0 0 50%;\n    -webkit-box-flex: 0;\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .mob-7 {\n    -ms-flex: 0 0 58.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .mob-8 {\n    -ms-flex: 0 0 66.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .mob-9 {\n    -ms-flex: 0 0 75%;\n    -webkit-box-flex: 0;\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .mob-10 {\n    -ms-flex: 0 0 83.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .mob-11 {\n    -ms-flex: 0 0 91.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .mob-12 {\n    -ms-flex: 0 0 100%;\n    -webkit-box-flex: 0;\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .hide-on-mobile {\n    display: none; } }\n\n@media screen and (max-width: 400px) {\n  .row .row {\n    margin-left: 0;\n    margin-right: 0; }\n  .column {\n    -ms-flex: 0 0 100%;\n    -webkit-box-flex: 0;\n    flex: 0 0 100%;\n    max-width: 100%;\n    margin-left: 0;\n    margin-right: 0;\n    padding: 0; } }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".h-group:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.is-hidden {\n  display: none; }\n\n.is-invisible {\n  visibility: hidden; }\n\n.h-antialiased {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.h-overflow-hidden {\n  overflow: hidden; }\n\n.h-remove-top {\n  margin-top: 0; }\n\n.h-remove-bottom {\n  margin-bottom: 0; }\n\n.h-add-half-bottom {\n  margin-bottom: var(--vspace-0_5) !important; }\n\n.h-add-bottom {\n  margin-bottom: var(--vspace-1) !important; }\n\n.h-no-border {\n  border: none; }\n\n.h-full-width {\n  width: 100%; }\n\n.h-text-center {\n  text-align: center; }\n\n.h-text-left {\n  text-align: left; }\n\n.h-text-right {\n  text-align: right; }\n\n.h-pull-left {\n  float: left; }\n\n.h-pull-right {\n  float: right; }\n\n.btn.h-full-width, button.h-full-width {\n  width: 100%;\n  margin-right: 0; }\n\n.btn--small, button.btn--small {\n  --btn-height: calc(var(--vspace-btn) - 1.6rem); }\n\n.btn--medium, button.btn--medium {\n  --btn-height: calc(var(--vspace-btn) + .8rem); }\n\n.btn--large, button.btn--large {\n  --btn-height: calc(var(--vspace-btn) + 1.6rem); }\n\n.btn--stroke, button.btn--stroke {\n  background: transparent !important;\n  border: 0.2rem solid var(--color-btn-stroke);\n  color: var(--color-btn-stroke-text); }\n\n.btn--stroke:hover, button.btn--stroke:hover {\n  background: var(--color-btn-stroke-hover) !important;\n  border: 0.2rem solid var(--color-btn-stroke-hover);\n  color: var(--color-btn-stroke-hover-text); }\n\n.btn--pill, button.btn--pill {\n  padding-left: 3.2rem !important;\n  padding-right: 3.2rem !important;\n  border-radius: 1000px !important; }\n\nbutton::-moz-focus-inner, input::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/properties.css"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX,cAAc;EACd,WAAW,EAAE;;AAEf;EACE,aAAa,EAAE;;AAEjB;EACE,kBAAkB,EAAE;;AAEtB;EACE,mCAAmC;EACnC,kCAAkC,EAAE;;AAEtC;EACE,gBAAgB,EAAE;;AAEpB;EACE,aAAa,EAAE;;AAEjB;EACE,gBAAgB,EAAE;;AAEpB;EACE,2CAA2C,EAAE;;AAE/C;EACE,yCAAyC,EAAE;;AAE7C;EACE,YAAY,EAAE;;AAEhB;EACE,WAAW,EAAE;;AAEf;EACE,kBAAkB,EAAE;;AAEtB;EACE,gBAAgB,EAAE;;AAEpB;EACE,iBAAiB,EAAE;;AAErB;EACE,WAAW,EAAE;;AAEf;EACE,YAAY,EAAE;;AAEhB;EACE,WAAW;EACX,eAAe,EAAE;;AAEnB;EACE,8CAA8C,EAAE;;AAElD;EACE,6CAA6C,EAAE;;AAEjD;EACE,8CAA8C,EAAE;;AAElD;EACE,kCAAkC;EAClC,4CAA4C;EAC5C,mCAAmC,EAAE;;AAEvC;EACE,oDAAoD;EACpD,kDAAkD;EAClD,yCAAyC,EAAE;;AAE7C;EACE,+BAA+B;EAC/B,gCAAgC;EAChC,gCAAgC,EAAE;;AAEpC;EACE,SAAS;EACT,UAAU,EAAE","sourcesContent":[".h-group:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.is-hidden {\n  display: none; }\n\n.is-invisible {\n  visibility: hidden; }\n\n.h-antialiased {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.h-overflow-hidden {\n  overflow: hidden; }\n\n.h-remove-top {\n  margin-top: 0; }\n\n.h-remove-bottom {\n  margin-bottom: 0; }\n\n.h-add-half-bottom {\n  margin-bottom: var(--vspace-0_5) !important; }\n\n.h-add-bottom {\n  margin-bottom: var(--vspace-1) !important; }\n\n.h-no-border {\n  border: none; }\n\n.h-full-width {\n  width: 100%; }\n\n.h-text-center {\n  text-align: center; }\n\n.h-text-left {\n  text-align: left; }\n\n.h-text-right {\n  text-align: right; }\n\n.h-pull-left {\n  float: left; }\n\n.h-pull-right {\n  float: right; }\n\n.btn.h-full-width, button.h-full-width {\n  width: 100%;\n  margin-right: 0; }\n\n.btn--small, button.btn--small {\n  --btn-height: calc(var(--vspace-btn) - 1.6rem); }\n\n.btn--medium, button.btn--medium {\n  --btn-height: calc(var(--vspace-btn) + .8rem); }\n\n.btn--large, button.btn--large {\n  --btn-height: calc(var(--vspace-btn) + 1.6rem); }\n\n.btn--stroke, button.btn--stroke {\n  background: transparent !important;\n  border: 0.2rem solid var(--color-btn-stroke);\n  color: var(--color-btn-stroke-text); }\n\n.btn--stroke:hover, button.btn--stroke:hover {\n  background: var(--color-btn-stroke-hover) !important;\n  border: 0.2rem solid var(--color-btn-stroke-hover);\n  color: var(--color-btn-stroke-hover-text); }\n\n.btn--pill, button.btn--pill {\n  padding-left: 3.2rem !important;\n  padding-right: 3.2rem !important;\n  border-radius: 1000px !important; }\n\nbutton::-moz-focus-inner, input::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "html {\n  line-height: 1.15;\n  -webkit-text-size-adjust: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  font-size: var(--base-size); }\n\nbody {\n  margin: 0;\n  font-weight: normal;\n  word-wrap: break-word;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  -webkit-overflow-scrolling: touch;\n  -webkit-text-size-adjust: none;\n  background: var(--color-body);\n  font-family: var(--font-1);\n  font-size: var(--text-size);\n  font-style: normal;\n  font-weight: normal;\n  line-height: var(--vspace-1);\n  color: var(--color-text);\n  margin: 0;\n  padding: 0; }\n\nhtml, body {\n  height: 100%; }\n\na {\n  background-color: transparent;\n  text-decoration: none;\n  line-height: inherit;\n  color: var(--color-1);\n  -webkit-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out; }\n\nimg {\n  border-style: none; }\n\n*, *::before, *::after {\n  -webkit-box-sizing: inherit;\n  box-sizing: inherit; }\n\nsvg, img {\n  max-width: 100%;\n  height: auto; }\n\ndiv, ul, li, h1, h2, h3, h4, h5, h6, form, p {\n  margin: 0;\n  padding: 0; }\n\np {\n  font-size: inherit;\n  text-rendering: optimizeLegibility; }\n\nul {\n  list-style: none; }\n\nli {\n  display: block; }\n\na img {\n  border: none; }\n\na:hover, a:focus, a:active {\n  color: var(--color-2);\n  cursor: pointer; }\n\na:hover, a:active {\n  outline: 0; }\n\nbutton,\n.btn {\n  margin-bottom: var(--vspace-0_5); }\n\ninput,\ntextarea,\nselect,\npre,\nblockquote,\nfigure,\nfigcaption,\ntable,\np,\nul,\nol,\ndl,\nform,\nimg,\n.video-container,\n.ss-custom-select {\n  margin-bottom: var(--vspace-1); }\n\narticle:hover {\n  cursor: pointer; }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/blocks.css"],"names":[],"mappings":"AAAA;EACE,iBAAiB;EACjB,8BAA8B;EAC9B,8BAA8B;EAC9B,sBAAsB;EACtB,2BAA2B,EAAE;;AAE/B;EACE,SAAS;EACT,mBAAmB;EACnB,qBAAqB;EACrB,kCAAkC;EAClC,mCAAmC;EACnC,iCAAiC;EACjC,8BAA8B;EAC9B,6BAA6B;EAC7B,0BAA0B;EAC1B,2BAA2B;EAC3B,kBAAkB;EAClB,mBAAmB;EACnB,4BAA4B;EAC5B,wBAAwB;EACxB,SAAS;EACT,UAAU,EAAE;;AAEd;EACE,YAAY,EAAE;;AAEhB;EACE,6BAA6B;EAC7B,qBAAqB;EACrB,oBAAoB;EACpB,qBAAqB;EACrB,wCAAwC;EACxC,gCAAgC,EAAE;;AAEpC;EACE,kBAAkB,EAAE;;AAEtB;EACE,2BAA2B;EAC3B,mBAAmB,EAAE;;AAEvB;EACE,eAAe;EACf,YAAY,EAAE;;AAEhB;EACE,SAAS;EACT,UAAU,EAAE;;AAEd;EACE,kBAAkB;EAClB,kCAAkC,EAAE;;AAEtC;EACE,gBAAgB,EAAE;;AAEpB;EACE,cAAc,EAAE;;AAElB;EACE,YAAY,EAAE;;AAEhB;EACE,qBAAqB;EACrB,eAAe,EAAE;;AAEnB;EACE,UAAU,EAAE;;AAEd;;EAEE,gCAAgC,EAAE;;AAEpC;;;;;;;;;;;;;;;;EAgBE,8BAA8B,EAAE;;AAElC;EACE,eAAe,EAAE","sourcesContent":["html {\n  line-height: 1.15;\n  -webkit-text-size-adjust: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  font-size: var(--base-size); }\n\nbody {\n  margin: 0;\n  font-weight: normal;\n  word-wrap: break-word;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  -webkit-overflow-scrolling: touch;\n  -webkit-text-size-adjust: none;\n  background: var(--color-body);\n  font-family: var(--font-1);\n  font-size: var(--text-size);\n  font-style: normal;\n  font-weight: normal;\n  line-height: var(--vspace-1);\n  color: var(--color-text);\n  margin: 0;\n  padding: 0; }\n\nhtml, body {\n  height: 100%; }\n\na {\n  background-color: transparent;\n  text-decoration: none;\n  line-height: inherit;\n  color: var(--color-1);\n  -webkit-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out; }\n\nimg {\n  border-style: none; }\n\n*, *::before, *::after {\n  -webkit-box-sizing: inherit;\n  box-sizing: inherit; }\n\nsvg, img {\n  max-width: 100%;\n  height: auto; }\n\ndiv, ul, li, h1, h2, h3, h4, h5, h6, form, p {\n  margin: 0;\n  padding: 0; }\n\np {\n  font-size: inherit;\n  text-rendering: optimizeLegibility; }\n\nul {\n  list-style: none; }\n\nli {\n  display: block; }\n\na img {\n  border: none; }\n\na:hover, a:focus, a:active {\n  color: var(--color-2);\n  cursor: pointer; }\n\na:hover, a:active {\n  outline: 0; }\n\nbutton,\n.btn {\n  margin-bottom: var(--vspace-0_5); }\n\ninput,\ntextarea,\nselect,\npre,\nblockquote,\nfigure,\nfigcaption,\ntable,\np,\nul,\nol,\ndl,\nform,\nimg,\n.video-container,\n.ss-custom-select {\n  margin-bottom: var(--vspace-1); }\n\narticle:hover {\n  cursor: pointer; }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "input[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n\ntextarea {\n  overflow: auto; }\n\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea,\nselect {\n  --input-height: var(--vspace-2);\n  --input-line-height: var(--vspace-1);\n  --input-vpadding: calc(((var(--input-height) - var(--input-line-height)) / 2) - .1rem);\n  display: block;\n  height: var(--input-height);\n  padding: var(--input-vpadding) calc(2.4rem - .1rem);\n  border: 0;\n  outline: none;\n  color: var(--color-placeholder);\n  font-family: var(--font-1);\n  font-size: var(--text-sm);\n  line-height: var(--input-line-height);\n  max-width: 100%;\n  background-color: rgba(0, 0, 0, 0.07);\n  border: 1px solid transparent;\n  -webkit-transition: all .3s ease-in-out;\n  transition: all .3s ease-in-out; }\n\ntextarea {\n  min-height: calc(7 * var(--space)); }\n\ninput[type=\"email\"]:focus,\ninput[type=\"number\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"text\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"password\"]:focus,\ninput[type=\"file\"]:focus,\ntextarea:focus,\nselect:focus {\n  color: white;\n  background-color: var(--color-gray-16);\n  border: 1px solid var(--color-gray-16); }\n\nlabel, legend {\n  font-family: var(--font-1);\n  font-weight: 600;\n  font-size: var(--text-sm);\n  line-height: var(--vspace-0_5);\n  margin-bottom: var(--vspace-0_5);\n  color: var(--color-text-dark);\n  display: block; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  display: inline; }\n\nlabel > .label-text {\n  display: inline-block;\n  margin-left: 1rem;\n  font-family: var(--font-1);\n  line-height: inherit; }\n\nlabel > input[type=\"checkbox\"], label > input[type=\"radio\"] {\n  margin: 0;\n  position: relative;\n  top: .2rem; }\n\n::-webkit-input-placeholder {\n  color: var(--color-placeholder); }\n\n:-ms-input-placeholder {\n  color: var(--color-placeholder); }\n\n::-ms-input-placeholder {\n  color: var(--color-placeholder); }\n\n::placeholder {\n  color: var(--color-placeholder); }\n\n.placeholder {\n  color: var(--color-placeholder) !important; }\n\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus input:-webkit-autofill,\ntextarea:-webkit-autofill,\ntextarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,\nselect:-webkit-autofill,\nselect:-webkit-autofill:hover,\nselect:-webkit-autofill:focus {\n  -webkit-text-fill-color: var(--color-1);\n  -webkit-transition: background-color 5000s ease-in-out 0s;\n  transition: background-color 5000s ease-in-out 0s; }\n\n.btn,\nbutton,\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"button\"] {\n  --btn-height: var(--vspace-btn);\n  display: inline-block;\n  font-family: var(--font-2);\n  font-weight: 600;\n  font-size: var(--text-xs);\n  text-transform: uppercase;\n  letter-spacing: .4em;\n  height: var(--btn-height);\n  line-height: calc(var(--btn-height) - .4rem);\n  padding: 0 3.2rem;\n  margin: 0 .4rem 1.6rem 0;\n  color: var(--color-btn-text);\n  text-decoration: none;\n  text-align: center;\n  white-space: nowrap;\n  cursor: pointer;\n  -webkit-transition: all .3s;\n  transition: all .3s;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background-color: var(--color-btn);\n  border: 0.2rem solid var(--color-btn); }\n\n.btn:hover,\nbutton:hover,\ninput[type=\"submit\"]:hover,\ninput[type=\"reset\"]:hover,\ninput[type=\"button\"]:hover,\n.btn:focus, button:focus,\ninput[type=\"submit\"]:focus,\ninput[type=\"reset\"]:focus,\ninput[type=\"button\"]:focus {\n  background-color: var(--color-btn-hover);\n  border-color: var(--color-btn-hover);\n  color: var(--color-btn-hover-text);\n  outline: 0; }\n\n.btn.btn--primary,\nbutton.btn--primary,\ninput[type=\"submit\"].btn--primary,\ninput[type=\"reset\"].btn--primary,\ninput[type=\"button\"].btn--primary {\n  background: var(--color-btn-primary);\n  border-color: var(--color-btn-primary);\n  color: var(--color-btn-primary-text); }\n\n.btn.btn--primary:hover,\nbutton.btn--primary:hover,\ninput[type=\"submit\"].btn--primary:hover,\ninput[type=\"reset\"].btn--primary:hover,\ninput[type=\"button\"].btn--primary:hover,\n.btn.btn--primary:focus,\nbutton.btn--primary:focus,\ninput[type=\"submit\"].btn--primary:focus,\ninput[type=\"reset\"].btn--primary:focus,\ninput[type=\"button\"].btn--primary:focus {\n  background: var(--color-btn-primary-hover);\n  border-color: var(--color-btn-primary-hover);\n  color: var(--color-btn-primary-hover-text); }\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 0; }\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px; }\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-input-placeholder {\n  color: var(--color-placeholder); }\n\n:-ms-input-placeholder {\n  color: var(--color-placeholder); }\n\n::-ms-input-placeholder {\n  color: var(--color-placeholder); }\n\n::placeholder {\n  color: var(--color-placeholder); }\n\n.placeholder {\n  color: var(--color-placeholder) !important; }\n\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n\nfieldset,\nbutton,\n.btn {\n  margin-bottom: var(--vspace-0_5); }\n\ninput,\ntextarea,\nselect,\npre,\nblockquote,\nfigure,\nfigcaption,\ntable,\np,\nul,\nol,\ndl,\nform,\nimg,\n.video-container,\n.ss-custom-select {\n  margin-bottom: var(--vspace-1); }\n\n.folders {\n  padding: 0;\n  margin: 0; }\n\n.form-field {\n  display: flex;\n  flex-direction: row; }\n\nfieldset {\n  border: none; }\n\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea,\nselect {\n  --input-height: var(--vspace-2);\n  --input-line-height: var(--vspace-1);\n  --input-vpadding: calc(((var(--input-height) - var(--input-line-height)) / 2) - .1rem);\n  display: block;\n  height: var(--input-height);\n  padding: var(--input-vpadding) calc(2.4rem - .1rem);\n  border: 0;\n  outline: none;\n  color: var(--color-placeholder);\n  font-family: var(--font-1);\n  font-size: var(--text-sm);\n  line-height: var(--input-line-height);\n  max-width: 100%;\n  background-color: rgba(0, 0, 0, 0.07);\n  border: 1px solid transparent;\n  -webkit-transition: all .3s ease-in-out;\n  transition: all .3s ease-in-out; }\n\ntextarea {\n  min-height: calc(7 * var(--space)); }\n\ninput[type=\"email\"]:focus,\ninput[type=\"number\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"text\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"password\"]:focus,\ninput[type=\"file\"]:focus,\ntextarea:focus,\nselect:focus {\n  color: white;\n  background-color: var(--color-gray-16);\n  border: 1px solid var(--color-gray-16); }\n\nlabel, legend {\n  font-family: var(--font-1);\n  font-weight: 600;\n  font-size: var(--text-sm);\n  line-height: var(--vspace-0_5);\n  margin-bottom: var(--vspace-0_5);\n  color: var(--color-text-dark);\n  display: block; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  display: inline; }\n\nlabel > .label-text {\n  display: inline-block;\n  margin-left: 1rem;\n  font-family: var(--font-1);\n  line-height: inherit; }\n\nlabel > input[type=\"checkbox\"], label > input[type=\"radio\"] {\n  margin: 0;\n  position: relative;\n  top: .2rem; }\n\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus input:-webkit-autofill,\ntextarea:-webkit-autofill,\ntextarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,\nselect:-webkit-autofill,\nselect:-webkit-autofill:hover,\nselect:-webkit-autofill:focus {\n  -webkit-text-fill-color: var(--color-1);\n  -webkit-transition: background-color 5000s ease-in-out 0s;\n  transition: background-color 5000s ease-in-out 0s; }\n\n.btn,\nbutton,\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"button\"] {\n  --btn-height: var(--vspace-btn);\n  display: inline-block;\n  font-family: var(--font-2);\n  font-weight: 600;\n  font-size: var(--text-xs);\n  text-transform: uppercase;\n  letter-spacing: .4em;\n  height: var(--btn-height);\n  line-height: calc(var(--btn-height) - .4rem);\n  padding: 0 3.2rem;\n  margin: 0 .4rem 1.6rem 0;\n  color: var(--color-btn-text);\n  text-decoration: none;\n  text-align: center;\n  white-space: nowrap;\n  cursor: pointer;\n  -webkit-transition: all .3s;\n  transition: all .3s;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background-color: var(--color-btn);\n  border: 0.2rem solid var(--color-btn); }\n\n.btn:hover,\nbutton:hover,\ninput[type=\"submit\"]:hover,\ninput[type=\"reset\"]:hover,\ninput[type=\"button\"]:hover,\n.btn:focus, button:focus,\ninput[type=\"submit\"]:focus,\ninput[type=\"reset\"]:focus,\ninput[type=\"button\"]:focus {\n  background-color: var(--color-btn-hover);\n  border-color: var(--color-btn-hover);\n  color: var(--color-btn-hover-text);\n  outline: 0; }\n\n.btn.btn--primary,\nbutton.btn--primary,\ninput[type=\"submit\"].btn--primary,\ninput[type=\"reset\"].btn--primary,\ninput[type=\"button\"].btn--primary {\n  background: var(--color-btn-primary);\n  border-color: var(--color-btn-primary);\n  color: var(--color-btn-primary-text); }\n\n.btn.btn--primary:hover,\nbutton.btn--primary:hover,\ninput[type=\"submit\"].btn--primary:hover,\ninput[type=\"reset\"].btn--primary:hover,\ninput[type=\"button\"].btn--primary:hover,\n.btn.btn--primary:focus,\nbutton.btn--primary:focus,\ninput[type=\"submit\"].btn--primary:focus,\ninput[type=\"reset\"].btn--primary:focus,\ninput[type=\"button\"].btn--primary:focus {\n  background: var(--color-btn-primary-hover);\n  border-color: var(--color-btn-primary-hover);\n  color: var(--color-btn-primary-hover-text); }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/components/input.css"],"names":[],"mappings":"AAAA;;;;;;;;;EASE,wBAAwB;EACxB,qBAAqB;EACrB,gBAAgB,EAAE;;AAEpB;EACE,cAAc,EAAE;;AAElB;;;;;;;;;;EAUE,+BAA+B;EAC/B,oCAAoC;EACpC,sFAAsF;EACtF,cAAc;EACd,2BAA2B;EAC3B,mDAAmD;EACnD,SAAS;EACT,aAAa;EACb,+BAA+B;EAC/B,0BAA0B;EAC1B,yBAAyB;EACzB,qCAAqC;EACrC,eAAe;EACf,qCAAqC;EACrC,6BAA6B;EAC7B,uCAAuC;EACvC,+BAA+B,EAAE;;AAEnC;EACE,kCAAkC,EAAE;;AAEtC;;;;;;;;;;EAUE,YAAY;EACZ,sCAAsC;EACtC,sCAAsC,EAAE;;AAE1C;EACE,0BAA0B;EAC1B,gBAAgB;EAChB,yBAAyB;EACzB,8BAA8B;EAC9B,gCAAgC;EAChC,6BAA6B;EAC7B,cAAc,EAAE;;AAElB;;EAEE,eAAe,EAAE;;AAEnB;EACE,qBAAqB;EACrB,iBAAiB;EACjB,0BAA0B;EAC1B,oBAAoB,EAAE;;AAExB;EACE,SAAS;EACT,kBAAkB;EAClB,UAAU,EAAE;;AAEd;EACE,+BAA+B,EAAE;;AAEnC;EACE,+BAA+B,EAAE;;AAEnC;EACE,+BAA+B,EAAE;;AAEnC;EACE,+BAA+B,EAAE;;AAEnC;EACE,0CAA0C,EAAE;;AAE9C;;;;;;;;EAQE,uCAAuC;EACvC,yDAAyD;EACzD,iDAAiD,EAAE;;AAErD;;;;;EAKE,+BAA+B;EAC/B,qBAAqB;EACrB,0BAA0B;EAC1B,gBAAgB;EAChB,yBAAyB;EACzB,yBAAyB;EACzB,oBAAoB;EACpB,yBAAyB;EACzB,4CAA4C;EAC5C,iBAAiB;EACjB,wBAAwB;EACxB,4BAA4B;EAC5B,qBAAqB;EACrB,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;EACf,2BAA2B;EAC3B,mBAAmB;EACnB,mCAAmC;EACnC,kCAAkC;EAClC,kCAAkC;EAClC,qCAAqC,EAAE;;AAEzC;;;;;;;;;EASE,wCAAwC;EACxC,oCAAoC;EACpC,kCAAkC;EAClC,UAAU,EAAE;;AAEd;;;;;EAKE,oCAAoC;EACpC,sCAAsC;EACtC,oCAAoC,EAAE;;AAExC;;;;;;;;;;EAUE,0CAA0C;EAC1C,4CAA4C;EAC5C,0CAA0C,EAAE;;AAE9C;EACE,8BAA8B;EAC9B,sBAAsB;EACtB,UAAU,EAAE;;AAEd;EACE,YAAY,EAAE;;AAEhB;EACE,6BAA6B;EAC7B,oBAAoB,EAAE;;AAExB;EACE,wBAAwB,EAAE;;AAE5B;EACE,+BAA+B,EAAE;;AAEnC;EACE,+BAA+B,EAAE;;AAEnC;EACE,+BAA+B,EAAE;;AAEnC;EACE,+BAA+B,EAAE;;AAEnC;EACE,0CAA0C,EAAE;;AAE9C;;;;;;;;;EASE,wBAAwB;EACxB,qBAAqB;EACrB,gBAAgB,EAAE;;AAEpB;;;EAGE,gCAAgC,EAAE;;AAEpC;;;;;;;;;;;;;;;;EAgBE,8BAA8B,EAAE;;AAElC;EACE,UAAU;EACV,SAAS,EAAE;;AAEb;EACE,aAAa;EACb,mBAAmB,EAAE;;AAEvB;EACE,YAAY,EAAE;;AAEhB;;;;;;;;;;EAUE,+BAA+B;EAC/B,oCAAoC;EACpC,sFAAsF;EACtF,cAAc;EACd,2BAA2B;EAC3B,mDAAmD;EACnD,SAAS;EACT,aAAa;EACb,+BAA+B;EAC/B,0BAA0B;EAC1B,yBAAyB;EACzB,qCAAqC;EACrC,eAAe;EACf,qCAAqC;EACrC,6BAA6B;EAC7B,uCAAuC;EACvC,+BAA+B,EAAE;;AAEnC;EACE,kCAAkC,EAAE;;AAEtC;;;;;;;;;;EAUE,YAAY;EACZ,sCAAsC;EACtC,sCAAsC,EAAE;;AAE1C;EACE,0BAA0B;EAC1B,gBAAgB;EAChB,yBAAyB;EACzB,8BAA8B;EAC9B,gCAAgC;EAChC,6BAA6B;EAC7B,cAAc,EAAE;;AAElB;;EAEE,eAAe,EAAE;;AAEnB;EACE,qBAAqB;EACrB,iBAAiB;EACjB,0BAA0B;EAC1B,oBAAoB,EAAE;;AAExB;EACE,SAAS;EACT,kBAAkB;EAClB,UAAU,EAAE;;AAEd;;;;;;;;EAQE,uCAAuC;EACvC,yDAAyD;EACzD,iDAAiD,EAAE;;AAErD;;;;;EAKE,+BAA+B;EAC/B,qBAAqB;EACrB,0BAA0B;EAC1B,gBAAgB;EAChB,yBAAyB;EACzB,yBAAyB;EACzB,oBAAoB;EACpB,yBAAyB;EACzB,4CAA4C;EAC5C,iBAAiB;EACjB,wBAAwB;EACxB,4BAA4B;EAC5B,qBAAqB;EACrB,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;EACf,2BAA2B;EAC3B,mBAAmB;EACnB,mCAAmC;EACnC,kCAAkC;EAClC,kCAAkC;EAClC,qCAAqC,EAAE;;AAEzC;;;;;;;;;EASE,wCAAwC;EACxC,oCAAoC;EACpC,kCAAkC;EAClC,UAAU,EAAE;;AAEd;;;;;EAKE,oCAAoC;EACpC,sCAAsC;EACtC,oCAAoC,EAAE;;AAExC;;;;;;;;;;EAUE,0CAA0C;EAC1C,4CAA4C;EAC5C,0CAA0C,EAAE","sourcesContent":["input[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n\ntextarea {\n  overflow: auto; }\n\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea,\nselect {\n  --input-height: var(--vspace-2);\n  --input-line-height: var(--vspace-1);\n  --input-vpadding: calc(((var(--input-height) - var(--input-line-height)) / 2) - .1rem);\n  display: block;\n  height: var(--input-height);\n  padding: var(--input-vpadding) calc(2.4rem - .1rem);\n  border: 0;\n  outline: none;\n  color: var(--color-placeholder);\n  font-family: var(--font-1);\n  font-size: var(--text-sm);\n  line-height: var(--input-line-height);\n  max-width: 100%;\n  background-color: rgba(0, 0, 0, 0.07);\n  border: 1px solid transparent;\n  -webkit-transition: all .3s ease-in-out;\n  transition: all .3s ease-in-out; }\n\ntextarea {\n  min-height: calc(7 * var(--space)); }\n\ninput[type=\"email\"]:focus,\ninput[type=\"number\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"text\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"password\"]:focus,\ninput[type=\"file\"]:focus,\ntextarea:focus,\nselect:focus {\n  color: white;\n  background-color: var(--color-gray-16);\n  border: 1px solid var(--color-gray-16); }\n\nlabel, legend {\n  font-family: var(--font-1);\n  font-weight: 600;\n  font-size: var(--text-sm);\n  line-height: var(--vspace-0_5);\n  margin-bottom: var(--vspace-0_5);\n  color: var(--color-text-dark);\n  display: block; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  display: inline; }\n\nlabel > .label-text {\n  display: inline-block;\n  margin-left: 1rem;\n  font-family: var(--font-1);\n  line-height: inherit; }\n\nlabel > input[type=\"checkbox\"], label > input[type=\"radio\"] {\n  margin: 0;\n  position: relative;\n  top: .2rem; }\n\n::-webkit-input-placeholder {\n  color: var(--color-placeholder); }\n\n:-ms-input-placeholder {\n  color: var(--color-placeholder); }\n\n::-ms-input-placeholder {\n  color: var(--color-placeholder); }\n\n::placeholder {\n  color: var(--color-placeholder); }\n\n.placeholder {\n  color: var(--color-placeholder) !important; }\n\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus input:-webkit-autofill,\ntextarea:-webkit-autofill,\ntextarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,\nselect:-webkit-autofill,\nselect:-webkit-autofill:hover,\nselect:-webkit-autofill:focus {\n  -webkit-text-fill-color: var(--color-1);\n  -webkit-transition: background-color 5000s ease-in-out 0s;\n  transition: background-color 5000s ease-in-out 0s; }\n\n.btn,\nbutton,\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"button\"] {\n  --btn-height: var(--vspace-btn);\n  display: inline-block;\n  font-family: var(--font-2);\n  font-weight: 600;\n  font-size: var(--text-xs);\n  text-transform: uppercase;\n  letter-spacing: .4em;\n  height: var(--btn-height);\n  line-height: calc(var(--btn-height) - .4rem);\n  padding: 0 3.2rem;\n  margin: 0 .4rem 1.6rem 0;\n  color: var(--color-btn-text);\n  text-decoration: none;\n  text-align: center;\n  white-space: nowrap;\n  cursor: pointer;\n  -webkit-transition: all .3s;\n  transition: all .3s;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background-color: var(--color-btn);\n  border: 0.2rem solid var(--color-btn); }\n\n.btn:hover,\nbutton:hover,\ninput[type=\"submit\"]:hover,\ninput[type=\"reset\"]:hover,\ninput[type=\"button\"]:hover,\n.btn:focus, button:focus,\ninput[type=\"submit\"]:focus,\ninput[type=\"reset\"]:focus,\ninput[type=\"button\"]:focus {\n  background-color: var(--color-btn-hover);\n  border-color: var(--color-btn-hover);\n  color: var(--color-btn-hover-text);\n  outline: 0; }\n\n.btn.btn--primary,\nbutton.btn--primary,\ninput[type=\"submit\"].btn--primary,\ninput[type=\"reset\"].btn--primary,\ninput[type=\"button\"].btn--primary {\n  background: var(--color-btn-primary);\n  border-color: var(--color-btn-primary);\n  color: var(--color-btn-primary-text); }\n\n.btn.btn--primary:hover,\nbutton.btn--primary:hover,\ninput[type=\"submit\"].btn--primary:hover,\ninput[type=\"reset\"].btn--primary:hover,\ninput[type=\"button\"].btn--primary:hover,\n.btn.btn--primary:focus,\nbutton.btn--primary:focus,\ninput[type=\"submit\"].btn--primary:focus,\ninput[type=\"reset\"].btn--primary:focus,\ninput[type=\"button\"].btn--primary:focus {\n  background: var(--color-btn-primary-hover);\n  border-color: var(--color-btn-primary-hover);\n  color: var(--color-btn-primary-hover-text); }\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 0; }\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px; }\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-input-placeholder {\n  color: var(--color-placeholder); }\n\n:-ms-input-placeholder {\n  color: var(--color-placeholder); }\n\n::-ms-input-placeholder {\n  color: var(--color-placeholder); }\n\n::placeholder {\n  color: var(--color-placeholder); }\n\n.placeholder {\n  color: var(--color-placeholder) !important; }\n\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n\nfieldset,\nbutton,\n.btn {\n  margin-bottom: var(--vspace-0_5); }\n\ninput,\ntextarea,\nselect,\npre,\nblockquote,\nfigure,\nfigcaption,\ntable,\np,\nul,\nol,\ndl,\nform,\nimg,\n.video-container,\n.ss-custom-select {\n  margin-bottom: var(--vspace-1); }\n\n.folders {\n  padding: 0;\n  margin: 0; }\n\n.form-field {\n  display: flex;\n  flex-direction: row; }\n\nfieldset {\n  border: none; }\n\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea,\nselect {\n  --input-height: var(--vspace-2);\n  --input-line-height: var(--vspace-1);\n  --input-vpadding: calc(((var(--input-height) - var(--input-line-height)) / 2) - .1rem);\n  display: block;\n  height: var(--input-height);\n  padding: var(--input-vpadding) calc(2.4rem - .1rem);\n  border: 0;\n  outline: none;\n  color: var(--color-placeholder);\n  font-family: var(--font-1);\n  font-size: var(--text-sm);\n  line-height: var(--input-line-height);\n  max-width: 100%;\n  background-color: rgba(0, 0, 0, 0.07);\n  border: 1px solid transparent;\n  -webkit-transition: all .3s ease-in-out;\n  transition: all .3s ease-in-out; }\n\ntextarea {\n  min-height: calc(7 * var(--space)); }\n\ninput[type=\"email\"]:focus,\ninput[type=\"number\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"text\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"password\"]:focus,\ninput[type=\"file\"]:focus,\ntextarea:focus,\nselect:focus {\n  color: white;\n  background-color: var(--color-gray-16);\n  border: 1px solid var(--color-gray-16); }\n\nlabel, legend {\n  font-family: var(--font-1);\n  font-weight: 600;\n  font-size: var(--text-sm);\n  line-height: var(--vspace-0_5);\n  margin-bottom: var(--vspace-0_5);\n  color: var(--color-text-dark);\n  display: block; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  display: inline; }\n\nlabel > .label-text {\n  display: inline-block;\n  margin-left: 1rem;\n  font-family: var(--font-1);\n  line-height: inherit; }\n\nlabel > input[type=\"checkbox\"], label > input[type=\"radio\"] {\n  margin: 0;\n  position: relative;\n  top: .2rem; }\n\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus input:-webkit-autofill,\ntextarea:-webkit-autofill,\ntextarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,\nselect:-webkit-autofill,\nselect:-webkit-autofill:hover,\nselect:-webkit-autofill:focus {\n  -webkit-text-fill-color: var(--color-1);\n  -webkit-transition: background-color 5000s ease-in-out 0s;\n  transition: background-color 5000s ease-in-out 0s; }\n\n.btn,\nbutton,\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"button\"] {\n  --btn-height: var(--vspace-btn);\n  display: inline-block;\n  font-family: var(--font-2);\n  font-weight: 600;\n  font-size: var(--text-xs);\n  text-transform: uppercase;\n  letter-spacing: .4em;\n  height: var(--btn-height);\n  line-height: calc(var(--btn-height) - .4rem);\n  padding: 0 3.2rem;\n  margin: 0 .4rem 1.6rem 0;\n  color: var(--color-btn-text);\n  text-decoration: none;\n  text-align: center;\n  white-space: nowrap;\n  cursor: pointer;\n  -webkit-transition: all .3s;\n  transition: all .3s;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background-color: var(--color-btn);\n  border: 0.2rem solid var(--color-btn); }\n\n.btn:hover,\nbutton:hover,\ninput[type=\"submit\"]:hover,\ninput[type=\"reset\"]:hover,\ninput[type=\"button\"]:hover,\n.btn:focus, button:focus,\ninput[type=\"submit\"]:focus,\ninput[type=\"reset\"]:focus,\ninput[type=\"button\"]:focus {\n  background-color: var(--color-btn-hover);\n  border-color: var(--color-btn-hover);\n  color: var(--color-btn-hover-text);\n  outline: 0; }\n\n.btn.btn--primary,\nbutton.btn--primary,\ninput[type=\"submit\"].btn--primary,\ninput[type=\"reset\"].btn--primary,\ninput[type=\"button\"].btn--primary {\n  background: var(--color-btn-primary);\n  border-color: var(--color-btn-primary);\n  color: var(--color-btn-primary-text); }\n\n.btn.btn--primary:hover,\nbutton.btn--primary:hover,\ninput[type=\"submit\"].btn--primary:hover,\ninput[type=\"reset\"].btn--primary:hover,\ninput[type=\"button\"].btn--primary:hover,\n.btn.btn--primary:focus,\nbutton.btn--primary:focus,\ninput[type=\"submit\"].btn--primary:focus,\ninput[type=\"reset\"].btn--primary:focus,\ninput[type=\"button\"].btn--primary:focus {\n  background: var(--color-btn-primary-hover);\n  border-color: var(--color-btn-primary-hover);\n  color: var(--color-btn-primary-hover-text); }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "h1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nh1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {\n  font-family: var(--font-2);\n  font-weight: 600;\n  font-style: normal;\n  color: var(--color-text-dark);\n  -webkit-font-variant-ligatures: common-ligatures;\n  font-variant-ligatures: common-ligatures;\n  text-rendering: optimizeLegibility; }\n\nh1, .h1 {\n  margin-top: var(--vspace-0_125);\n  margin-bottom: var(--vspace-0_125); }\n\nh2, .h2, h3, .h3, h4, .h4 {\n  margin-top: var(--vspace-0_125);\n  margin-bottom: var(--vspace-0_125); }\n\nh5, .h5, h6, .h6 {\n  margin-top: var(--vspace-1_5);\n  margin-bottom: var(--vspace-0_5); }\n\nh1, .h1 {\n  font-size: var(--text-display-1);\n  line-height: var(--vspace-2);\n  letter-spacing: -.015em; }\n\n@media screen and (max-width: 600px) {\n  h1, .h1 {\n    margin-top: var(--vspace-0_125);\n    margin-bottom: var(--vspace-0_125); } }\n\nh2, .h2 {\n  font-size: var(--text-xxl);\n  line-height: var(--vspace-1_5); }\n\nh3, .h3 {\n  font-size: var(--text-xl);\n  line-height: var(--vspace-1_25); }\n\nh4, .h4 {\n  font-size: var(--text-lg);\n  line-height: var(--vspace-1); }\n\nh5, .h5 {\n  font-size: var(--text-md);\n  line-height: var(--vspace-0_875); }\n\nh6, .h6 {\n  font-size: calc(var(--text-size) * 0.8889);\n  font-weight: 700;\n  line-height: var(--vspace-0_75);\n  text-transform: uppercase;\n  letter-spacing: .25em; }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/components/title.css"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,gBAAgB,EAAE;;AAEpB;EACE,0BAA0B;EAC1B,gBAAgB;EAChB,kBAAkB;EAClB,6BAA6B;EAC7B,gDAAgD;EAChD,wCAAwC;EACxC,kCAAkC,EAAE;;AAEtC;EACE,+BAA+B;EAC/B,kCAAkC,EAAE;;AAEtC;EACE,+BAA+B;EAC/B,kCAAkC,EAAE;;AAEtC;EACE,6BAA6B;EAC7B,gCAAgC,EAAE;;AAEpC;EACE,gCAAgC;EAChC,4BAA4B;EAC5B,uBAAuB,EAAE;;AAE3B;EACE;IACE,+BAA+B;IAC/B,kCAAkC,EAAE,EAAE;;AAE1C;EACE,0BAA0B;EAC1B,8BAA8B,EAAE;;AAElC;EACE,yBAAyB;EACzB,+BAA+B,EAAE;;AAEnC;EACE,yBAAyB;EACzB,4BAA4B,EAAE;;AAEhC;EACE,yBAAyB;EACzB,gCAAgC,EAAE;;AAEpC;EACE,0CAA0C;EAC1C,gBAAgB;EAChB,+BAA+B;EAC/B,yBAAyB;EACzB,qBAAqB,EAAE","sourcesContent":["h1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nh1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {\n  font-family: var(--font-2);\n  font-weight: 600;\n  font-style: normal;\n  color: var(--color-text-dark);\n  -webkit-font-variant-ligatures: common-ligatures;\n  font-variant-ligatures: common-ligatures;\n  text-rendering: optimizeLegibility; }\n\nh1, .h1 {\n  margin-top: var(--vspace-0_125);\n  margin-bottom: var(--vspace-0_125); }\n\nh2, .h2, h3, .h3, h4, .h4 {\n  margin-top: var(--vspace-0_125);\n  margin-bottom: var(--vspace-0_125); }\n\nh5, .h5, h6, .h6 {\n  margin-top: var(--vspace-1_5);\n  margin-bottom: var(--vspace-0_5); }\n\nh1, .h1 {\n  font-size: var(--text-display-1);\n  line-height: var(--vspace-2);\n  letter-spacing: -.015em; }\n\n@media screen and (max-width: 600px) {\n  h1, .h1 {\n    margin-top: var(--vspace-0_125);\n    margin-bottom: var(--vspace-0_125); } }\n\nh2, .h2 {\n  font-size: var(--text-xxl);\n  line-height: var(--vspace-1_5); }\n\nh3, .h3 {\n  font-size: var(--text-xl);\n  line-height: var(--vspace-1_25); }\n\nh4, .h4 {\n  font-size: var(--text-lg);\n  line-height: var(--vspace-1); }\n\nh5, .h5 {\n  font-size: var(--text-md);\n  line-height: var(--vspace-0_875); }\n\nh6, .h6 {\n  font-size: calc(var(--text-size) * 0.8889);\n  font-weight: 700;\n  line-height: var(--vspace-0_75);\n  text-transform: uppercase;\n  letter-spacing: .25em; }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".project_scroll::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  background-color: #F5F5F5; }\n\n.project_scroll::-webkit-scrollbar {\n  width: 6px;\n  background-color: #F5F5F5; }\n\n.project_scroll::-webkit-scrollbar-thumb {\n  background-color: #000000; }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/components/scroll.css"],"names":[],"mappings":"AAAA;EACE,oDAAoD;EACpD,yBAAyB,EAAE;;AAE7B;EACE,UAAU;EACV,yBAAyB,EAAE;;AAE7B;EACE,yBAAyB,EAAE","sourcesContent":[".project_scroll::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  background-color: #F5F5F5; }\n\n.project_scroll::-webkit-scrollbar {\n  width: 6px;\n  background-color: #F5F5F5; }\n\n.project_scroll::-webkit-scrollbar-thumb {\n  background-color: #000000; }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "button, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0; }\n\nbutton, input {\n  overflow: visible; }\n\nbutton, select {\n  text-transform: none; }\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit; }\n\n.plus {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff), #000;\n  background-position: center;\n  background-size: 50% 2px,2px 50%;\n  background-repeat: no-repeat;\n  margin-bottom: 10px; }\n\n.small-plus {\n  width: 20px;\n  height: 20px;\n  background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff), #000;\n  background-position: center;\n  background-size: 50% 2px,2px 50%;\n  background-repeat: no-repeat;\n  margin-left: 5px; }\n\n.radius {\n  border-radius: 50%; }\n\n.cross {\n  transform: rotate(-45deg); }\n\n.cross-modal {\n  margin-left: 20px; }\n\n.edit-button {\n  width: 20px;\n  height: 20px;\n  background: #000;\n  padding-left: 4px;\n  padding-top: 5px; }\n\n.delete-letter-button {\n  position: relative;\n  width: 20px;\n  height: 20px;\n  background: #000; }\n\n.block-update {\n  display: flex;\n  justify-content: center; }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/components/button.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;EACpB,eAAe;EACf,iBAAiB;EACjB,SAAS,EAAE;;AAEb;EACE,iBAAiB,EAAE;;AAErB;EACE,oBAAoB,EAAE;;AAExB;EACE,0BAA0B,EAAE;;AAE9B;EACE,kBAAkB;EAClB,UAAU,EAAE;;AAEd;EACE,8BAA8B,EAAE;;AAElC;EACE,0BAA0B;EAC1B,aAAa,EAAE;;AAEjB;EACE,qBAAqB;EACrB,WAAW;EACX,YAAY;EACZ,0EAA0E;EAC1E,2BAA2B;EAC3B,gCAAgC;EAChC,4BAA4B;EAC5B,mBAAmB,EAAE;;AAEvB;EACE,WAAW;EACX,YAAY;EACZ,0EAA0E;EAC1E,2BAA2B;EAC3B,gCAAgC;EAChC,4BAA4B;EAC5B,gBAAgB,EAAE;;AAEpB;EACE,kBAAkB,EAAE;;AAEtB;EACE,yBAAyB,EAAE;;AAE7B;EACE,iBAAiB,EAAE;;AAErB;EACE,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,iBAAiB;EACjB,gBAAgB,EAAE;;AAEpB;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,gBAAgB,EAAE;;AAEpB;EACE,aAAa;EACb,uBAAuB,EAAE","sourcesContent":["button, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0; }\n\nbutton, input {\n  overflow: visible; }\n\nbutton, select {\n  text-transform: none; }\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit; }\n\n.plus {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff), #000;\n  background-position: center;\n  background-size: 50% 2px,2px 50%;\n  background-repeat: no-repeat;\n  margin-bottom: 10px; }\n\n.small-plus {\n  width: 20px;\n  height: 20px;\n  background: linear-gradient(#fff, #fff), linear-gradient(#fff, #fff), #000;\n  background-position: center;\n  background-size: 50% 2px,2px 50%;\n  background-repeat: no-repeat;\n  margin-left: 5px; }\n\n.radius {\n  border-radius: 50%; }\n\n.cross {\n  transform: rotate(-45deg); }\n\n.cross-modal {\n  margin-left: 20px; }\n\n.edit-button {\n  width: 20px;\n  height: 20px;\n  background: #000;\n  padding-left: 4px;\n  padding-top: 5px; }\n\n.delete-letter-button {\n  position: relative;\n  width: 20px;\n  height: 20px;\n  background: #000; }\n\n.block-update {\n  display: flex;\n  justify-content: center; }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".triangle-right {\n  width: 0;\n  height: 0;\n  border-top: 6px solid transparent;\n  border-left: 12px solid black;\n  border-bottom: 6px solid transparent;\n  display: inline-block;\n  margin-right: 5px; }\n\n.triangle-down {\n  width: 0;\n  height: 0;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  border-top: 12px solid black;\n  display: inline-block;\n  margin-right: 5px; }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/components/triangle.css"],"names":[],"mappings":"AAAA;EACE,QAAQ;EACR,SAAS;EACT,iCAAiC;EACjC,6BAA6B;EAC7B,oCAAoC;EACpC,qBAAqB;EACrB,iBAAiB,EAAE;;AAErB;EACE,QAAQ;EACR,SAAS;EACT,kCAAkC;EAClC,mCAAmC;EACnC,4BAA4B;EAC5B,qBAAqB;EACrB,iBAAiB,EAAE","sourcesContent":[".triangle-right {\n  width: 0;\n  height: 0;\n  border-top: 6px solid transparent;\n  border-left: 12px solid black;\n  border-bottom: 6px solid transparent;\n  display: inline-block;\n  margin-right: 5px; }\n\n.triangle-down {\n  width: 0;\n  height: 0;\n  border-left: 6px solid transparent;\n  border-right: 6px solid transparent;\n  border-top: 12px solid black;\n  display: inline-block;\n  margin-right: 5px; }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".s-header {\n  z-index: 100;\n  width: 100%;\n  background-color: #f0efef;\n  background-image: url(\"data:image/svg+xml,%3Csvg width='40' height='1' viewBox='0 0 40 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v1H0z' fill='%23151515' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E\");\n  height: 60px;\n  -webkit-box-shadow: 0px 1px 0px rgba(17, 17, 26, 0.03), 0px 8px 16px rgba(17, 17, 26, 0.04);\n  box-shadow: 0px 1px 0px rgba(17, 17, 26, 0.03), 0px 8px 16px rgba(17, 17, 26, 0.04);\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n  -ms-flex-align: center;\n  -webkit-box-align: center;\n  align-items: center;\n  position: fixed; }\n\n.s-header__content {\n  width: 100%;\n  height: auto;\n  -ms-flex-align: center;\n  -webkit-box-align: center;\n  align-items: center;\n  position: relative; }\n\n.s-header__logo {\n  z-index: 101;\n  margin: 0;\n  padding-left: var(--gutter-lg);\n  position: relative; }\n  .s-header__logo a {\n    display: block;\n    margin: 0;\n    padding: 0;\n    outline: 0;\n    border: none;\n    -webkit-transition: all .3s;\n    transition: all .3s; }\n  .s-header__logo img {\n    width: 5.8rem;\n    height: 5.8rem;\n    margin: 0;\n    vertical-align: bottom; }\n\n.s-header__nav-wrap {\n  margin-left: auto;\n  margin-right: 8.8rem; }\n  .s-header__nav-wrap .s-header__nav-heading {\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: var(--text-sm);\n    margin-top: var(--vspace-3);\n    text-align: center;\n    display: none; }\n  .s-header__nav-wrap .close-mobile-menu {\n    display: none; }\n\n.s-header__nav {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  font-family: var(--font-2);\n  font-weight: 500;\n  font-size: 1.6rem; }\n  .s-header__nav li {\n    display: inline-block;\n    position: relative;\n    padding: 0 1rem; }\n    .s-header__nav li a {\n      display: block;\n      color: rgba(0, 0, 0, 0.5);\n      line-height: 5.2rem;\n      position: relative; }\n  .s-header__nav li.has-children {\n    padding-right: 2rem; }\n  .s-header__nav li.has-children > a::after {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.5);\n    border-right: 1px solid rgba(0, 0, 0, 0.5);\n    content: '';\n    display: block;\n    height: 5px;\n    width: 5px;\n    margin-top: -4px;\n    pointer-events: none;\n    -webkit-transform-origin: 66% 66%;\n    transform-origin: 66% 66%;\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n    -webkit-transition: all .3s;\n    transition: all .3s;\n    position: absolute;\n    right: -1.2rem;\n    top: calc(50% + 2px); }\n  .s-header__nav li:hover > a, .s-header__nav li:focus > a {\n    color: black; }\n  .s-header__nav li:hover li, .s-header__nav li:focus li {\n    background: transparent; }\n  .s-header__nav li.current > a {\n    color: black; }\n  .s-header__nav li.current > a::before {\n    content: \"\";\n    display: block;\n    height: 2px;\n    width: 100%;\n    background-color: black;\n    position: absolute;\n    left: 0;\n    bottom: 0; }\n  .s-header__nav li ul {\n    z-index: 200;\n    font-size: 1.5rem;\n    font-weight: 400;\n    margin: 0;\n    padding: 1.8rem 0;\n    background: #f4f4f4;\n    border-radius: 0 0 4px 4px;\n    -webkit-box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);\n    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);\n    -webkit-transform: translate3d(0, 15px, 0);\n    transform: translate3d(0, 15px, 0);\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transition: all .5s;\n    transition: all .5s;\n    position: absolute;\n    top: 100%;\n    left: 0; }\n  .s-header__nav li ul ul {\n    position: absolute;\n    top: 0;\n    left: 100%;\n    left: calc(100% + 1px);\n    border-radius: 0 0 4px 4px;\n    padding-top: 1.2rem; }\n  .s-header__nav li ul li {\n    display: block;\n    text-align: left;\n    padding: 0;\n    margin: 0;\n    min-height: 3.2rem;\n    width: 100%; }\n  .s-header__nav li ul li a {\n    display: block;\n    white-space: nowrap;\n    padding: .7rem 3rem .7rem 2rem;\n    font-family: var(--font-1);\n    line-height: 1.8rem;\n    color: rgba(0, 0, 0, 0.6); }\n  .s-header__nav li ul li a:hover, .s-header__nav li ul li a:focus {\n    color: black; }\n  .s-header__nav li:hover > ul {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n\n.s-header__toggle-menu {\n  display: none;\n  width: 48px;\n  height: 48px;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  position: absolute;\n  right: 4rem;\n  top: 50%; }\n  .s-header__toggle-menu span {\n    display: block;\n    width: 28px;\n    height: 3px;\n    margin-top: -1.5px;\n    position: absolute;\n    right: 10px;\n    top: 50%;\n    bottom: auto;\n    left: auto;\n    background-color: black;\n    font: 0/0 a;\n    text-shadow: none;\n    color: transparent; }\n  .s-header__toggle-menu span::before, .s-header__toggle-menu span::after {\n    content: '';\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    background-color: inherit;\n    left: 0; }\n  .s-header__toggle-menu span::before {\n    top: -10px; }\n  .s-header__toggle-menu span::after {\n    bottom: -10px; }\n\n.s-header__search {\n  z-index: 300;\n  display: block;\n  text-align: center;\n  background: white;\n  opacity: 0;\n  visibility: hidden;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: all .3s;\n  transition: all .3s; }\n\n.s-header__search-form {\n  width: 100%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  position: absolute;\n  top: 50%; }\n  .s-header__search-form label {\n    color: black; }\n  .s-header__search-form input[type=\"search\"] {\n    background-color: transparent;\n    color: black;\n    height: auto;\n    width: 100%;\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: 6rem;\n    line-height: 1.5;\n    border: none;\n    border-bottom: 1px solid var(--color-border) !important;\n    max-width: 680px;\n    padding-top: .8rem !important;\n    padding-bottom: .8rem !important;\n    margin: 0 auto;\n    text-align: center; }\n  .s-header__search-form input[type=\"search\"]::-webkit-input-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1; }\n  .s-header__search-form input[type=\"search\"]:-moz-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1; }\n  .s-header__search-form input[type=\"search\"]:-ms-input-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1; }\n  .s-header__search-form input[type=\"search\"].placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1; }\n  .s-header__search-form input[type=\"search\"]:focus {\n    outline: none; }\n  .s-header__search-form input[type=\"submit\"] {\n    display: none; }\n\n.s-header__search-form::after {\n  content: \"Press Enter to begin your search.\";\n  display: block;\n  letter-spacing: 0.6px;\n  font-size: 1.6rem;\n  margin-top: var(--vspace-1);\n  text-align: center;\n  color: rgba(0, 0, 0, 0.5); }\n\n.s-header__search-form input[type=\"search\"]::-webkit-search-decoration,\n.s-header__search-form input[type=\"search\"]::-webkit-search-cancel-button,\n.s-header__search-form input[type=\"search\"]::-webkit-search-results-button,\n.s-header__search-form input[type=\"search\"]::-webkit-search-results-decoration {\n  -webkit-appearance: none; }\n\nbody.search-is-visible {\n  overflow: hidden; }\n\n.search-is-visible .s-header__search {\n  opacity: 1;\n  visibility: visible; }\n\n.s-header__search-trigger {\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n  -ms-flex-align: center;\n  -webkit-box-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  -webkit-box-pack: center;\n  justify-content: center;\n  width: 4rem;\n  height: 4rem;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  position: absolute;\n  top: 50%;\n  right: var(--gutter-lg); }\n  .s-header__search-trigger svg {\n    height: 2.2rem;\n    width: 2.2rem; }\n  .s-header__search-trigger svg path {\n    fill: black; }\n\n@media screen and (max-width: 1240px) {\n  .s-header__logo {\n    padding-left: 4.4rem; }\n  .s-header__search-trigger {\n    right: 4rem; } }\n\n@media screen and (min-width: 801px) {\n  .s-header__nav li.has-children:hover > a::after, .s-header__nav li.has-children:focus > a::after {\n    -webkit-transform: rotate(225deg);\n    transform: rotate(225deg); }\n  .s-header__nav li ul {\n    display: block !important; } }\n\n@media screen and (max-width: 800px) {\n  .s-header__logo {\n    padding-left: 4rem; }\n    .s-header__logo img {\n      width: 5.6rem;\n      height: 5.6rem; }\n  .s-header__nav-wrap {\n    --color-border: var(--color-gray-1);\n    z-index: 300;\n    background-color: white;\n    opacity: 0;\n    visibility: hidden;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    border: none;\n    overflow-y: auto; }\n    .s-header__nav-wrap .s-header__nav-heading, .s-header__nav-wrap .close-mobile-menu {\n      display: block; }\n  .s-header__nav {\n    font-weight: 600;\n    font-size: var(--text-size);\n    margin: var(--vspace-2_5) 6rem var(--vspace-1);\n    border-bottom: 1px solid var(--color-border); }\n    .s-header__nav li {\n      display: block;\n      padding: 0;\n      text-align: left; }\n    .s-header__nav li ul {\n      display: none;\n      position: static;\n      -webkit-box-shadow: none;\n      box-shadow: none;\n      -webkit-transform: translate3d(0, 0, 0);\n      transform: translate3d(0, 0, 0);\n      opacity: 1;\n      visibility: visible;\n      background-color: transparent;\n      padding: 0 0 1.8rem 0;\n      -webkit-transition: none !important;\n      transition: none !important; }\n    .s-header__nav li.has-children > a::after {\n      top: 27px; }\n    .s-header__nav li.has-children > a.sub-menu-is-open::after {\n      -webkit-transform: rotate(225deg);\n      transform: rotate(225deg); }\n    .s-header__nav li ul li a {\n      padding: .8rem 1.6rem .8rem; }\n    .s-header__nav li.current a::before {\n      display: none; }\n  .s-header__nav > li {\n    border-top: 1px solid var(--color-border); }\n  .s-header__nav > li a {\n    line-height: 5.6rem; }\n  .s-header__toggle-menu {\n    display: block; }\n  .s-header__search-trigger {\n    top: calc(50% + 2px);\n    right: calc(4rem + 5rem); }\n    .s-header__search-trigger svg {\n      height: 3.2rem;\n      width: 3.2rem; }\n  body.nav-wrap-is-visible {\n    overflow: hidden; }\n  .nav-wrap-is-visible .s-header__nav-wrap {\n    opacity: 1;\n    visibility: visible; }\n  .s-header__search-form::after {\n    font-size: var(--text-sm); }\n  .s-header__search-form input[type=\"search\"] {\n    max-width: none;\n    width: 80%;\n    font-size: 4.2rem; } }\n\n@media screen and (max-width: 600px) {\n  .s-header {\n    height: 60px; }\n  .s-header__toggle-menu {\n    right: 3.2rem; }\n  .s-header__search-trigger {\n    right: calc(3.2rem + 5rem); }\n  .s-header__logo {\n    padding-left: var(--gutter-mob); }\n  .s-header__search-form input[type=\"search\"] {\n    font-size: 3.4rem; } }\n\n@media screen and (max-width: 500px) {\n  .s-header__search-form input[type=\"search\"] {\n    font-size: 3rem; } }\n\n@media screen and (max-width: 400px) {\n  .s-header {\n    height: 60px; }\n  .s-header__logo {\n    padding-left: .2rem; }\n    .s-header__logo img {\n      width: 4.8rem;\n      height: 4.8rem; }\n  .s-header__nav {\n    margin: 4.2rem 3.2rem 3.2rem; }\n  .s-header__toggle-menu {\n    right: 2rem; }\n  .s-header__search-trigger {\n    right: calc(2rem + 4.8rem); }\n  .s-header__search-form input[type=\"search\"] {\n    font-size: 2.4rem; } }\n\n.s-header__overlay-close {\n  text-shadow: none;\n  color: transparent;\n  display: block;\n  width: 46px;\n  height: 46px;\n  margin-left: -23px;\n  position: absolute;\n  top: var(--vspace-1);\n  left: 50%; }\n\n.s-header__overlay-close::before,\n.s-header__overlay-close::after {\n  content: '';\n  display: inline-block;\n  width: 2px;\n  height: 20px;\n  top: 12px;\n  left: 22px;\n  background-color: black;\n  position: absolute; }\n\n.s-header__overlay-close::before {\n  -webkit-transform: rotate(45deg);\n  transform: rotate(45deg); }\n\n.s-header__overlay-close::after {\n  -webkit-transform: rotate(-45deg);\n  transform: rotate(-45deg); }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/components/header.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,WAAW;EACX,yBAAyB;EACzB,gOAAgO;EAChO,YAAY;EACZ,2FAA2F;EAC3F,mFAAmF;EACnF,oBAAoB;EACpB,oBAAoB;EACpB,aAAa;EACb,sBAAsB;EACtB,yBAAyB;EACzB,mBAAmB;EACnB,eAAe,EAAE;;AAEnB;EACE,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,yBAAyB;EACzB,mBAAmB;EACnB,kBAAkB,EAAE;;AAEtB;EACE,YAAY;EACZ,SAAS;EACT,8BAA8B;EAC9B,kBAAkB,EAAE;EACpB;IACE,cAAc;IACd,SAAS;IACT,UAAU;IACV,UAAU;IACV,YAAY;IACZ,2BAA2B;IAC3B,mBAAmB,EAAE;EACvB;IACE,aAAa;IACb,cAAc;IACd,SAAS;IACT,sBAAsB,EAAE;;AAE5B;EACE,iBAAiB;EACjB,oBAAoB,EAAE;EACtB;IACE,0BAA0B;IAC1B,gBAAgB;IAChB,yBAAyB;IACzB,2BAA2B;IAC3B,kBAAkB;IAClB,aAAa,EAAE;EACjB;IACE,aAAa,EAAE;;AAEnB;EACE,gBAAgB;EAChB,SAAS;EACT,UAAU;EACV,0BAA0B;EAC1B,gBAAgB;EAChB,iBAAiB,EAAE;EACnB;IACE,qBAAqB;IACrB,kBAAkB;IAClB,eAAe,EAAE;IACjB;MACE,cAAc;MACd,yBAAyB;MACzB,mBAAmB;MACnB,kBAAkB,EAAE;EACxB;IACE,mBAAmB,EAAE;EACvB;IACE,2CAA2C;IAC3C,0CAA0C;IAC1C,WAAW;IACX,cAAc;IACd,WAAW;IACX,UAAU;IACV,gBAAgB;IAChB,oBAAoB;IACpB,iCAAiC;IACjC,yBAAyB;IACzB,gCAAgC;IAChC,wBAAwB;IACxB,2BAA2B;IAC3B,mBAAmB;IACnB,kBAAkB;IAClB,cAAc;IACd,oBAAoB,EAAE;EACxB;IACE,YAAY,EAAE;EAChB;IACE,uBAAuB,EAAE;EAC3B;IACE,YAAY,EAAE;EAChB;IACE,WAAW;IACX,cAAc;IACd,WAAW;IACX,WAAW;IACX,uBAAuB;IACvB,kBAAkB;IAClB,OAAO;IACP,SAAS,EAAE;EACb;IACE,YAAY;IACZ,iBAAiB;IACjB,gBAAgB;IAChB,SAAS;IACT,iBAAiB;IACjB,mBAAmB;IACnB,0BAA0B;IAC1B,oDAAoD;IACpD,4CAA4C;IAC5C,0CAA0C;IAC1C,kCAAkC;IAClC,UAAU;IACV,kBAAkB;IAClB,2BAA2B;IAC3B,mBAAmB;IACnB,kBAAkB;IAClB,SAAS;IACT,OAAO,EAAE;EACX;IACE,kBAAkB;IAClB,MAAM;IACN,UAAU;IACV,sBAAsB;IACtB,0BAA0B;IAC1B,mBAAmB,EAAE;EACvB;IACE,cAAc;IACd,gBAAgB;IAChB,UAAU;IACV,SAAS;IACT,kBAAkB;IAClB,WAAW,EAAE;EACf;IACE,cAAc;IACd,mBAAmB;IACnB,8BAA8B;IAC9B,0BAA0B;IAC1B,mBAAmB;IACnB,yBAAyB,EAAE;EAC7B;IACE,YAAY,EAAE;EAChB;IACE,UAAU;IACV,mBAAmB;IACnB,uCAAuC;IACvC,+BAA+B,EAAE;;AAErC;EACE,aAAa;EACb,WAAW;EACX,YAAY;EACZ,mCAAmC;EACnC,2BAA2B;EAC3B,kBAAkB;EAClB,WAAW;EACX,QAAQ,EAAE;EACV;IACE,cAAc;IACd,WAAW;IACX,WAAW;IACX,kBAAkB;IAClB,kBAAkB;IAClB,WAAW;IACX,QAAQ;IACR,YAAY;IACZ,UAAU;IACV,uBAAuB;IACvB,WAAW;IACX,iBAAiB;IACjB,kBAAkB,EAAE;EACtB;IACE,WAAW;IACX,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,yBAAyB;IACzB,OAAO,EAAE;EACX;IACE,UAAU,EAAE;EACd;IACE,aAAa,EAAE;;AAEnB;EACE,YAAY;EACZ,cAAc;EACd,kBAAkB;EAClB,iBAAiB;EACjB,UAAU;EACV,kBAAkB;EAClB,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,WAAW;EACX,YAAY;EACZ,2BAA2B;EAC3B,mBAAmB,EAAE;;AAEvB;EACE,WAAW;EACX,mCAAmC;EACnC,2BAA2B;EAC3B,kBAAkB;EAClB,QAAQ,EAAE;EACV;IACE,YAAY,EAAE;EAChB;IACE,6BAA6B;IAC7B,YAAY;IACZ,YAAY;IACZ,WAAW;IACX,0BAA0B;IAC1B,gBAAgB;IAChB,eAAe;IACf,gBAAgB;IAChB,YAAY;IACZ,uDAAuD;IACvD,gBAAgB;IAChB,6BAA6B;IAC7B,gCAAgC;IAChC,cAAc;IACd,kBAAkB,EAAE;EACtB;IACE,YAAY;IACZ,6BAA6B;IAC7B,UAAU,EAAE;EACd;IACE,YAAY;IACZ,6BAA6B;IAC7B,UAAU,EAAE;EACd;IACE,YAAY;IACZ,6BAA6B;IAC7B,UAAU,EAAE;EACd;IACE,YAAY;IACZ,6BAA6B;IAC7B,UAAU,EAAE;EACd;IACE,aAAa,EAAE;EACjB;IACE,aAAa,EAAE;;AAEnB;EACE,4CAA4C;EAC5C,cAAc;EACd,qBAAqB;EACrB,iBAAiB;EACjB,2BAA2B;EAC3B,kBAAkB;EAClB,yBAAyB,EAAE;;AAE7B;;;;EAIE,wBAAwB,EAAE;;AAE5B;EACE,gBAAgB,EAAE;;AAEpB;EACE,UAAU;EACV,mBAAmB,EAAE;;AAEvB;EACE,oBAAoB;EACpB,oBAAoB;EACpB,aAAa;EACb,sBAAsB;EACtB,yBAAyB;EACzB,mBAAmB;EACnB,qBAAqB;EACrB,wBAAwB;EACxB,uBAAuB;EACvB,WAAW;EACX,YAAY;EACZ,mCAAmC;EACnC,2BAA2B;EAC3B,kBAAkB;EAClB,QAAQ;EACR,uBAAuB,EAAE;EACzB;IACE,cAAc;IACd,aAAa,EAAE;EACjB;IACE,WAAW,EAAE;;AAEjB;EACE;IACE,oBAAoB,EAAE;EACxB;IACE,WAAW,EAAE,EAAE;;AAEnB;EACE;IACE,iCAAiC;IACjC,yBAAyB,EAAE;EAC7B;IACE,yBAAyB,EAAE,EAAE;;AAEjC;EACE;IACE,kBAAkB,EAAE;IACpB;MACE,aAAa;MACb,cAAc,EAAE;EACpB;IACE,mCAAmC;IACnC,YAAY;IACZ,uBAAuB;IACvB,UAAU;IACV,kBAAkB;IAClB,eAAe;IACf,MAAM;IACN,OAAO;IACP,QAAQ;IACR,SAAS;IACT,WAAW;IACX,YAAY;IACZ,SAAS;IACT,YAAY;IACZ,gBAAgB,EAAE;IAClB;MACE,cAAc,EAAE;EACpB;IACE,gBAAgB;IAChB,2BAA2B;IAC3B,8CAA8C;IAC9C,4CAA4C,EAAE;IAC9C;MACE,cAAc;MACd,UAAU;MACV,gBAAgB,EAAE;IACpB;MACE,aAAa;MACb,gBAAgB;MAChB,wBAAwB;MACxB,gBAAgB;MAChB,uCAAuC;MACvC,+BAA+B;MAC/B,UAAU;MACV,mBAAmB;MACnB,6BAA6B;MAC7B,qBAAqB;MACrB,mCAAmC;MACnC,2BAA2B,EAAE;IAC/B;MACE,SAAS,EAAE;IACb;MACE,iCAAiC;MACjC,yBAAyB,EAAE;IAC7B;MACE,2BAA2B,EAAE;IAC/B;MACE,aAAa,EAAE;EACnB;IACE,yCAAyC,EAAE;EAC7C;IACE,mBAAmB,EAAE;EACvB;IACE,cAAc,EAAE;EAClB;IACE,oBAAoB;IACpB,wBAAwB,EAAE;IAC1B;MACE,cAAc;MACd,aAAa,EAAE;EACnB;IACE,gBAAgB,EAAE;EACpB;IACE,UAAU;IACV,mBAAmB,EAAE;EACvB;IACE,yBAAyB,EAAE;EAC7B;IACE,eAAe;IACf,UAAU;IACV,iBAAiB,EAAE,EAAE;;AAEzB;EACE;IACE,YAAY,EAAE;EAChB;IACE,aAAa,EAAE;EACjB;IACE,0BAA0B,EAAE;EAC9B;IACE,+BAA+B,EAAE;EACnC;IACE,iBAAiB,EAAE,EAAE;;AAEzB;EACE;IACE,eAAe,EAAE,EAAE;;AAEvB;EACE;IACE,YAAY,EAAE;EAChB;IACE,mBAAmB,EAAE;IACrB;MACE,aAAa;MACb,cAAc,EAAE;EACpB;IACE,4BAA4B,EAAE;EAChC;IACE,WAAW,EAAE;EACf;IACE,0BAA0B,EAAE;EAC9B;IACE,iBAAiB,EAAE,EAAE;;AAEzB;EACE,iBAAiB;EACjB,kBAAkB;EAClB,cAAc;EACd,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,kBAAkB;EAClB,oBAAoB;EACpB,SAAS,EAAE;;AAEb;;EAEE,WAAW;EACX,qBAAqB;EACrB,UAAU;EACV,YAAY;EACZ,SAAS;EACT,UAAU;EACV,uBAAuB;EACvB,kBAAkB,EAAE;;AAEtB;EACE,gCAAgC;EAChC,wBAAwB,EAAE;;AAE5B;EACE,iCAAiC;EACjC,yBAAyB,EAAE","sourcesContent":[".s-header {\n  z-index: 100;\n  width: 100%;\n  background-color: #f0efef;\n  background-image: url(\"data:image/svg+xml,%3Csvg width='40' height='1' viewBox='0 0 40 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v1H0z' fill='%23151515' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E\");\n  height: 60px;\n  -webkit-box-shadow: 0px 1px 0px rgba(17, 17, 26, 0.03), 0px 8px 16px rgba(17, 17, 26, 0.04);\n  box-shadow: 0px 1px 0px rgba(17, 17, 26, 0.03), 0px 8px 16px rgba(17, 17, 26, 0.04);\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n  -ms-flex-align: center;\n  -webkit-box-align: center;\n  align-items: center;\n  position: fixed; }\n\n.s-header__content {\n  width: 100%;\n  height: auto;\n  -ms-flex-align: center;\n  -webkit-box-align: center;\n  align-items: center;\n  position: relative; }\n\n.s-header__logo {\n  z-index: 101;\n  margin: 0;\n  padding-left: var(--gutter-lg);\n  position: relative; }\n  .s-header__logo a {\n    display: block;\n    margin: 0;\n    padding: 0;\n    outline: 0;\n    border: none;\n    -webkit-transition: all .3s;\n    transition: all .3s; }\n  .s-header__logo img {\n    width: 5.8rem;\n    height: 5.8rem;\n    margin: 0;\n    vertical-align: bottom; }\n\n.s-header__nav-wrap {\n  margin-left: auto;\n  margin-right: 8.8rem; }\n  .s-header__nav-wrap .s-header__nav-heading {\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: var(--text-sm);\n    margin-top: var(--vspace-3);\n    text-align: center;\n    display: none; }\n  .s-header__nav-wrap .close-mobile-menu {\n    display: none; }\n\n.s-header__nav {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  font-family: var(--font-2);\n  font-weight: 500;\n  font-size: 1.6rem; }\n  .s-header__nav li {\n    display: inline-block;\n    position: relative;\n    padding: 0 1rem; }\n    .s-header__nav li a {\n      display: block;\n      color: rgba(0, 0, 0, 0.5);\n      line-height: 5.2rem;\n      position: relative; }\n  .s-header__nav li.has-children {\n    padding-right: 2rem; }\n  .s-header__nav li.has-children > a::after {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.5);\n    border-right: 1px solid rgba(0, 0, 0, 0.5);\n    content: '';\n    display: block;\n    height: 5px;\n    width: 5px;\n    margin-top: -4px;\n    pointer-events: none;\n    -webkit-transform-origin: 66% 66%;\n    transform-origin: 66% 66%;\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n    -webkit-transition: all .3s;\n    transition: all .3s;\n    position: absolute;\n    right: -1.2rem;\n    top: calc(50% + 2px); }\n  .s-header__nav li:hover > a, .s-header__nav li:focus > a {\n    color: black; }\n  .s-header__nav li:hover li, .s-header__nav li:focus li {\n    background: transparent; }\n  .s-header__nav li.current > a {\n    color: black; }\n  .s-header__nav li.current > a::before {\n    content: \"\";\n    display: block;\n    height: 2px;\n    width: 100%;\n    background-color: black;\n    position: absolute;\n    left: 0;\n    bottom: 0; }\n  .s-header__nav li ul {\n    z-index: 200;\n    font-size: 1.5rem;\n    font-weight: 400;\n    margin: 0;\n    padding: 1.8rem 0;\n    background: #f4f4f4;\n    border-radius: 0 0 4px 4px;\n    -webkit-box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);\n    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);\n    -webkit-transform: translate3d(0, 15px, 0);\n    transform: translate3d(0, 15px, 0);\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transition: all .5s;\n    transition: all .5s;\n    position: absolute;\n    top: 100%;\n    left: 0; }\n  .s-header__nav li ul ul {\n    position: absolute;\n    top: 0;\n    left: 100%;\n    left: calc(100% + 1px);\n    border-radius: 0 0 4px 4px;\n    padding-top: 1.2rem; }\n  .s-header__nav li ul li {\n    display: block;\n    text-align: left;\n    padding: 0;\n    margin: 0;\n    min-height: 3.2rem;\n    width: 100%; }\n  .s-header__nav li ul li a {\n    display: block;\n    white-space: nowrap;\n    padding: .7rem 3rem .7rem 2rem;\n    font-family: var(--font-1);\n    line-height: 1.8rem;\n    color: rgba(0, 0, 0, 0.6); }\n  .s-header__nav li ul li a:hover, .s-header__nav li ul li a:focus {\n    color: black; }\n  .s-header__nav li:hover > ul {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n\n.s-header__toggle-menu {\n  display: none;\n  width: 48px;\n  height: 48px;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  position: absolute;\n  right: 4rem;\n  top: 50%; }\n  .s-header__toggle-menu span {\n    display: block;\n    width: 28px;\n    height: 3px;\n    margin-top: -1.5px;\n    position: absolute;\n    right: 10px;\n    top: 50%;\n    bottom: auto;\n    left: auto;\n    background-color: black;\n    font: 0/0 a;\n    text-shadow: none;\n    color: transparent; }\n  .s-header__toggle-menu span::before, .s-header__toggle-menu span::after {\n    content: '';\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    background-color: inherit;\n    left: 0; }\n  .s-header__toggle-menu span::before {\n    top: -10px; }\n  .s-header__toggle-menu span::after {\n    bottom: -10px; }\n\n.s-header__search {\n  z-index: 300;\n  display: block;\n  text-align: center;\n  background: white;\n  opacity: 0;\n  visibility: hidden;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: all .3s;\n  transition: all .3s; }\n\n.s-header__search-form {\n  width: 100%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  position: absolute;\n  top: 50%; }\n  .s-header__search-form label {\n    color: black; }\n  .s-header__search-form input[type=\"search\"] {\n    background-color: transparent;\n    color: black;\n    height: auto;\n    width: 100%;\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: 6rem;\n    line-height: 1.5;\n    border: none;\n    border-bottom: 1px solid var(--color-border) !important;\n    max-width: 680px;\n    padding-top: .8rem !important;\n    padding-bottom: .8rem !important;\n    margin: 0 auto;\n    text-align: center; }\n  .s-header__search-form input[type=\"search\"]::-webkit-input-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1; }\n  .s-header__search-form input[type=\"search\"]:-moz-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1; }\n  .s-header__search-form input[type=\"search\"]:-ms-input-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1; }\n  .s-header__search-form input[type=\"search\"].placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1; }\n  .s-header__search-form input[type=\"search\"]:focus {\n    outline: none; }\n  .s-header__search-form input[type=\"submit\"] {\n    display: none; }\n\n.s-header__search-form::after {\n  content: \"Press Enter to begin your search.\";\n  display: block;\n  letter-spacing: 0.6px;\n  font-size: 1.6rem;\n  margin-top: var(--vspace-1);\n  text-align: center;\n  color: rgba(0, 0, 0, 0.5); }\n\n.s-header__search-form input[type=\"search\"]::-webkit-search-decoration,\n.s-header__search-form input[type=\"search\"]::-webkit-search-cancel-button,\n.s-header__search-form input[type=\"search\"]::-webkit-search-results-button,\n.s-header__search-form input[type=\"search\"]::-webkit-search-results-decoration {\n  -webkit-appearance: none; }\n\nbody.search-is-visible {\n  overflow: hidden; }\n\n.search-is-visible .s-header__search {\n  opacity: 1;\n  visibility: visible; }\n\n.s-header__search-trigger {\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n  -ms-flex-align: center;\n  -webkit-box-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  -webkit-box-pack: center;\n  justify-content: center;\n  width: 4rem;\n  height: 4rem;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  position: absolute;\n  top: 50%;\n  right: var(--gutter-lg); }\n  .s-header__search-trigger svg {\n    height: 2.2rem;\n    width: 2.2rem; }\n  .s-header__search-trigger svg path {\n    fill: black; }\n\n@media screen and (max-width: 1240px) {\n  .s-header__logo {\n    padding-left: 4.4rem; }\n  .s-header__search-trigger {\n    right: 4rem; } }\n\n@media screen and (min-width: 801px) {\n  .s-header__nav li.has-children:hover > a::after, .s-header__nav li.has-children:focus > a::after {\n    -webkit-transform: rotate(225deg);\n    transform: rotate(225deg); }\n  .s-header__nav li ul {\n    display: block !important; } }\n\n@media screen and (max-width: 800px) {\n  .s-header__logo {\n    padding-left: 4rem; }\n    .s-header__logo img {\n      width: 5.6rem;\n      height: 5.6rem; }\n  .s-header__nav-wrap {\n    --color-border: var(--color-gray-1);\n    z-index: 300;\n    background-color: white;\n    opacity: 0;\n    visibility: hidden;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    border: none;\n    overflow-y: auto; }\n    .s-header__nav-wrap .s-header__nav-heading, .s-header__nav-wrap .close-mobile-menu {\n      display: block; }\n  .s-header__nav {\n    font-weight: 600;\n    font-size: var(--text-size);\n    margin: var(--vspace-2_5) 6rem var(--vspace-1);\n    border-bottom: 1px solid var(--color-border); }\n    .s-header__nav li {\n      display: block;\n      padding: 0;\n      text-align: left; }\n    .s-header__nav li ul {\n      display: none;\n      position: static;\n      -webkit-box-shadow: none;\n      box-shadow: none;\n      -webkit-transform: translate3d(0, 0, 0);\n      transform: translate3d(0, 0, 0);\n      opacity: 1;\n      visibility: visible;\n      background-color: transparent;\n      padding: 0 0 1.8rem 0;\n      -webkit-transition: none !important;\n      transition: none !important; }\n    .s-header__nav li.has-children > a::after {\n      top: 27px; }\n    .s-header__nav li.has-children > a.sub-menu-is-open::after {\n      -webkit-transform: rotate(225deg);\n      transform: rotate(225deg); }\n    .s-header__nav li ul li a {\n      padding: .8rem 1.6rem .8rem; }\n    .s-header__nav li.current a::before {\n      display: none; }\n  .s-header__nav > li {\n    border-top: 1px solid var(--color-border); }\n  .s-header__nav > li a {\n    line-height: 5.6rem; }\n  .s-header__toggle-menu {\n    display: block; }\n  .s-header__search-trigger {\n    top: calc(50% + 2px);\n    right: calc(4rem + 5rem); }\n    .s-header__search-trigger svg {\n      height: 3.2rem;\n      width: 3.2rem; }\n  body.nav-wrap-is-visible {\n    overflow: hidden; }\n  .nav-wrap-is-visible .s-header__nav-wrap {\n    opacity: 1;\n    visibility: visible; }\n  .s-header__search-form::after {\n    font-size: var(--text-sm); }\n  .s-header__search-form input[type=\"search\"] {\n    max-width: none;\n    width: 80%;\n    font-size: 4.2rem; } }\n\n@media screen and (max-width: 600px) {\n  .s-header {\n    height: 60px; }\n  .s-header__toggle-menu {\n    right: 3.2rem; }\n  .s-header__search-trigger {\n    right: calc(3.2rem + 5rem); }\n  .s-header__logo {\n    padding-left: var(--gutter-mob); }\n  .s-header__search-form input[type=\"search\"] {\n    font-size: 3.4rem; } }\n\n@media screen and (max-width: 500px) {\n  .s-header__search-form input[type=\"search\"] {\n    font-size: 3rem; } }\n\n@media screen and (max-width: 400px) {\n  .s-header {\n    height: 60px; }\n  .s-header__logo {\n    padding-left: .2rem; }\n    .s-header__logo img {\n      width: 4.8rem;\n      height: 4.8rem; }\n  .s-header__nav {\n    margin: 4.2rem 3.2rem 3.2rem; }\n  .s-header__toggle-menu {\n    right: 2rem; }\n  .s-header__search-trigger {\n    right: calc(2rem + 4.8rem); }\n  .s-header__search-form input[type=\"search\"] {\n    font-size: 2.4rem; } }\n\n.s-header__overlay-close {\n  text-shadow: none;\n  color: transparent;\n  display: block;\n  width: 46px;\n  height: 46px;\n  margin-left: -23px;\n  position: absolute;\n  top: var(--vspace-1);\n  left: 50%; }\n\n.s-header__overlay-close::before,\n.s-header__overlay-close::after {\n  content: '';\n  display: inline-block;\n  width: 2px;\n  height: 20px;\n  top: 12px;\n  left: 22px;\n  background-color: black;\n  position: absolute; }\n\n.s-header__overlay-close::before {\n  -webkit-transform: rotate(45deg);\n  transform: rotate(45deg); }\n\n.s-header__overlay-close::after {\n  -webkit-transform: rotate(-45deg);\n  transform: rotate(-45deg); }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".search-back {\n  background: var(--color-white);\n  border: 2px solid var(--color-info);\n  position: absolute;\n  width: 100%; }\n  .search-back div {\n    padding: 3px; }\n  .search-back div:hover {\n    background: var(--color-info); }\n\n.search-input {\n  margin-bottom: 0; }\n\n.search-block {\n  position: relative; }\n\n.search-title {\n  padding: 0 3px 0 3px;\n  font-size: 10px; }\n\n.search-title-no {\n  padding: 3px; }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/components/search.css"],"names":[],"mappings":"AAAA;EACE,8BAA8B;EAC9B,mCAAmC;EACnC,kBAAkB;EAClB,WAAW,EAAE;EACb;IACE,YAAY,EAAE;EAChB;IACE,6BAA6B,EAAE;;AAEnC;EACE,gBAAgB,EAAE;;AAEpB;EACE,kBAAkB,EAAE;;AAEtB;EACE,oBAAoB;EACpB,eAAe,EAAE;;AAEnB;EACE,YAAY,EAAE","sourcesContent":[".search-back {\n  background: var(--color-white);\n  border: 2px solid var(--color-info);\n  position: absolute;\n  width: 100%; }\n  .search-back div {\n    padding: 3px; }\n  .search-back div:hover {\n    background: var(--color-info); }\n\n.search-input {\n  margin-bottom: 0; }\n\n.search-block {\n  position: relative; }\n\n.search-title {\n  padding: 0 3px 0 3px;\n  font-size: 10px; }\n\n.search-title-no {\n  padding: 3px; }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "input[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n\nfieldset,\nbutton,\n.btn {\n  margin-bottom: var(--vspace-0_5); }\n\ninput,\ntextarea,\nselect,\npre,\nblockquote,\nfigure,\nfigcaption,\ntable,\np,\nul,\nol,\ndl,\nform,\nimg,\n.video-container,\n.ss-custom-select {\n  margin-bottom: var(--vspace-1); }\n\n.folders {\n  padding: 0;\n  margin: 0; }\n\n.form-field {\n  display: flex;\n  flex-direction: row; }\n\nfieldset {\n  border: none; }\n\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea,\nselect {\n  --input-height: var(--vspace-2);\n  --input-line-height: var(--vspace-1);\n  --input-vpadding: calc(((var(--input-height) - var(--input-line-height)) / 2) - .1rem);\n  display: block;\n  height: var(--input-height);\n  padding: var(--input-vpadding) calc(2.4rem - .1rem);\n  border: 0;\n  outline: none;\n  color: var(--color-placeholder);\n  font-family: var(--font-1);\n  font-size: var(--text-sm);\n  line-height: var(--input-line-height);\n  max-width: 100%;\n  background-color: rgba(0, 0, 0, 0.07);\n  border: 1px solid transparent;\n  -webkit-transition: all .3s ease-in-out;\n  transition: all .3s ease-in-out; }\n\ntextarea {\n  min-height: calc(7 * var(--space)); }\n\ninput[type=\"email\"]:focus,\ninput[type=\"number\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"text\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"password\"]:focus,\ninput[type=\"file\"]:focus,\ntextarea:focus,\nselect:focus {\n  color: white;\n  background-color: var(--color-gray-16);\n  border: 1px solid var(--color-gray-16); }\n\nlabel, legend {\n  font-family: var(--font-1);\n  font-weight: 600;\n  font-size: var(--text-sm);\n  line-height: var(--vspace-0_5);\n  margin-bottom: var(--vspace-0_5);\n  color: var(--color-text-dark);\n  display: block; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  display: inline; }\n\nlabel > .label-text {\n  display: inline-block;\n  margin-left: 1rem;\n  font-family: var(--font-1);\n  line-height: inherit; }\n\nlabel > input[type=\"checkbox\"], label > input[type=\"radio\"] {\n  margin: 0;\n  position: relative;\n  top: .2rem; }\n\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus input:-webkit-autofill,\ntextarea:-webkit-autofill,\ntextarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,\nselect:-webkit-autofill,\nselect:-webkit-autofill:hover,\nselect:-webkit-autofill:focus {\n  -webkit-text-fill-color: var(--color-1);\n  -webkit-transition: background-color 5000s ease-in-out 0s;\n  transition: background-color 5000s ease-in-out 0s; }\n\n.btn,\nbutton,\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"button\"] {\n  --btn-height: var(--vspace-btn);\n  display: inline-block;\n  font-family: var(--font-2);\n  font-weight: 600;\n  font-size: var(--text-xs);\n  text-transform: uppercase;\n  letter-spacing: .4em;\n  height: var(--btn-height);\n  line-height: calc(var(--btn-height) - .4rem);\n  padding: 0 3.2rem;\n  margin: 0 .4rem 1.6rem 0;\n  color: var(--color-btn-text);\n  text-decoration: none;\n  text-align: center;\n  white-space: nowrap;\n  cursor: pointer;\n  -webkit-transition: all .3s;\n  transition: all .3s;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background-color: var(--color-btn);\n  border: 0.2rem solid var(--color-btn); }\n\n.btn:hover,\nbutton:hover,\ninput[type=\"submit\"]:hover,\ninput[type=\"reset\"]:hover,\ninput[type=\"button\"]:hover,\n.btn:focus, button:focus,\ninput[type=\"submit\"]:focus,\ninput[type=\"reset\"]:focus,\ninput[type=\"button\"]:focus {\n  background-color: var(--color-btn-hover);\n  border-color: var(--color-btn-hover);\n  color: var(--color-btn-hover-text);\n  outline: 0; }\n\n.btn.btn--primary,\nbutton.btn--primary,\ninput[type=\"submit\"].btn--primary,\ninput[type=\"reset\"].btn--primary,\ninput[type=\"button\"].btn--primary {\n  background: var(--color-btn-primary);\n  border-color: var(--color-btn-primary);\n  color: var(--color-btn-primary-text); }\n\n.btn.btn--primary:hover,\nbutton.btn--primary:hover,\ninput[type=\"submit\"].btn--primary:hover,\ninput[type=\"reset\"].btn--primary:hover,\ninput[type=\"button\"].btn--primary:hover,\n.btn.btn--primary:focus,\nbutton.btn--primary:focus,\ninput[type=\"submit\"].btn--primary:focus,\ninput[type=\"reset\"].btn--primary:focus,\ninput[type=\"button\"].btn--primary:focus {\n  background: var(--color-btn-primary-hover);\n  border-color: var(--color-btn-primary-hover);\n  color: var(--color-btn-primary-hover-text); }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/base.css"],"names":[],"mappings":"AAAA;;;;;;;;;EASE,wBAAwB;EACxB,qBAAqB;EACrB,gBAAgB,EAAE;;AAEpB;;;EAGE,gCAAgC,EAAE;;AAEpC;;;;;;;;;;;;;;;;EAgBE,8BAA8B,EAAE;;AAElC;EACE,UAAU;EACV,SAAS,EAAE;;AAEb;EACE,aAAa;EACb,mBAAmB,EAAE;;AAEvB;EACE,YAAY,EAAE;;AAEhB;;;;;;;;;;EAUE,+BAA+B;EAC/B,oCAAoC;EACpC,sFAAsF;EACtF,cAAc;EACd,2BAA2B;EAC3B,mDAAmD;EACnD,SAAS;EACT,aAAa;EACb,+BAA+B;EAC/B,0BAA0B;EAC1B,yBAAyB;EACzB,qCAAqC;EACrC,eAAe;EACf,qCAAqC;EACrC,6BAA6B;EAC7B,uCAAuC;EACvC,+BAA+B,EAAE;;AAEnC;EACE,kCAAkC,EAAE;;AAEtC;;;;;;;;;;EAUE,YAAY;EACZ,sCAAsC;EACtC,sCAAsC,EAAE;;AAE1C;EACE,0BAA0B;EAC1B,gBAAgB;EAChB,yBAAyB;EACzB,8BAA8B;EAC9B,gCAAgC;EAChC,6BAA6B;EAC7B,cAAc,EAAE;;AAElB;;EAEE,eAAe,EAAE;;AAEnB;EACE,qBAAqB;EACrB,iBAAiB;EACjB,0BAA0B;EAC1B,oBAAoB,EAAE;;AAExB;EACE,SAAS;EACT,kBAAkB;EAClB,UAAU,EAAE;;AAEd;;;;;;;;EAQE,uCAAuC;EACvC,yDAAyD;EACzD,iDAAiD,EAAE;;AAErD;;;;;EAKE,+BAA+B;EAC/B,qBAAqB;EACrB,0BAA0B;EAC1B,gBAAgB;EAChB,yBAAyB;EACzB,yBAAyB;EACzB,oBAAoB;EACpB,yBAAyB;EACzB,4CAA4C;EAC5C,iBAAiB;EACjB,wBAAwB;EACxB,4BAA4B;EAC5B,qBAAqB;EACrB,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;EACf,2BAA2B;EAC3B,mBAAmB;EACnB,mCAAmC;EACnC,kCAAkC;EAClC,kCAAkC;EAClC,qCAAqC,EAAE;;AAEzC;;;;;;;;;EASE,wCAAwC;EACxC,oCAAoC;EACpC,kCAAkC;EAClC,UAAU,EAAE;;AAEd;;;;;EAKE,oCAAoC;EACpC,sCAAsC;EACtC,oCAAoC,EAAE;;AAExC;;;;;;;;;;EAUE,0CAA0C;EAC1C,4CAA4C;EAC5C,0CAA0C,EAAE","sourcesContent":["input[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n\nfieldset,\nbutton,\n.btn {\n  margin-bottom: var(--vspace-0_5); }\n\ninput,\ntextarea,\nselect,\npre,\nblockquote,\nfigure,\nfigcaption,\ntable,\np,\nul,\nol,\ndl,\nform,\nimg,\n.video-container,\n.ss-custom-select {\n  margin-bottom: var(--vspace-1); }\n\n.folders {\n  padding: 0;\n  margin: 0; }\n\n.form-field {\n  display: flex;\n  flex-direction: row; }\n\nfieldset {\n  border: none; }\n\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea,\nselect {\n  --input-height: var(--vspace-2);\n  --input-line-height: var(--vspace-1);\n  --input-vpadding: calc(((var(--input-height) - var(--input-line-height)) / 2) - .1rem);\n  display: block;\n  height: var(--input-height);\n  padding: var(--input-vpadding) calc(2.4rem - .1rem);\n  border: 0;\n  outline: none;\n  color: var(--color-placeholder);\n  font-family: var(--font-1);\n  font-size: var(--text-sm);\n  line-height: var(--input-line-height);\n  max-width: 100%;\n  background-color: rgba(0, 0, 0, 0.07);\n  border: 1px solid transparent;\n  -webkit-transition: all .3s ease-in-out;\n  transition: all .3s ease-in-out; }\n\ntextarea {\n  min-height: calc(7 * var(--space)); }\n\ninput[type=\"email\"]:focus,\ninput[type=\"number\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"text\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"password\"]:focus,\ninput[type=\"file\"]:focus,\ntextarea:focus,\nselect:focus {\n  color: white;\n  background-color: var(--color-gray-16);\n  border: 1px solid var(--color-gray-16); }\n\nlabel, legend {\n  font-family: var(--font-1);\n  font-weight: 600;\n  font-size: var(--text-sm);\n  line-height: var(--vspace-0_5);\n  margin-bottom: var(--vspace-0_5);\n  color: var(--color-text-dark);\n  display: block; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  display: inline; }\n\nlabel > .label-text {\n  display: inline-block;\n  margin-left: 1rem;\n  font-family: var(--font-1);\n  line-height: inherit; }\n\nlabel > input[type=\"checkbox\"], label > input[type=\"radio\"] {\n  margin: 0;\n  position: relative;\n  top: .2rem; }\n\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus input:-webkit-autofill,\ntextarea:-webkit-autofill,\ntextarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,\nselect:-webkit-autofill,\nselect:-webkit-autofill:hover,\nselect:-webkit-autofill:focus {\n  -webkit-text-fill-color: var(--color-1);\n  -webkit-transition: background-color 5000s ease-in-out 0s;\n  transition: background-color 5000s ease-in-out 0s; }\n\n.btn,\nbutton,\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"button\"] {\n  --btn-height: var(--vspace-btn);\n  display: inline-block;\n  font-family: var(--font-2);\n  font-weight: 600;\n  font-size: var(--text-xs);\n  text-transform: uppercase;\n  letter-spacing: .4em;\n  height: var(--btn-height);\n  line-height: calc(var(--btn-height) - .4rem);\n  padding: 0 3.2rem;\n  margin: 0 .4rem 1.6rem 0;\n  color: var(--color-btn-text);\n  text-decoration: none;\n  text-align: center;\n  white-space: nowrap;\n  cursor: pointer;\n  -webkit-transition: all .3s;\n  transition: all .3s;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background-color: var(--color-btn);\n  border: 0.2rem solid var(--color-btn); }\n\n.btn:hover,\nbutton:hover,\ninput[type=\"submit\"]:hover,\ninput[type=\"reset\"]:hover,\ninput[type=\"button\"]:hover,\n.btn:focus, button:focus,\ninput[type=\"submit\"]:focus,\ninput[type=\"reset\"]:focus,\ninput[type=\"button\"]:focus {\n  background-color: var(--color-btn-hover);\n  border-color: var(--color-btn-hover);\n  color: var(--color-btn-hover-text);\n  outline: 0; }\n\n.btn.btn--primary,\nbutton.btn--primary,\ninput[type=\"submit\"].btn--primary,\ninput[type=\"reset\"].btn--primary,\ninput[type=\"button\"].btn--primary {\n  background: var(--color-btn-primary);\n  border-color: var(--color-btn-primary);\n  color: var(--color-btn-primary-text); }\n\n.btn.btn--primary:hover,\nbutton.btn--primary:hover,\ninput[type=\"submit\"].btn--primary:hover,\ninput[type=\"reset\"].btn--primary:hover,\ninput[type=\"button\"].btn--primary:hover,\n.btn.btn--primary:focus,\nbutton.btn--primary:focus,\ninput[type=\"submit\"].btn--primary:focus,\ninput[type=\"reset\"].btn--primary:focus,\ninput[type=\"button\"].btn--primary:focus {\n  background: var(--color-btn-primary-hover);\n  border-color: var(--color-btn-primary-hover);\n  color: var(--color-btn-primary-hover-text); }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".bricks-wrapper .entry {\n  margin-bottom: 1rem; }\n\n.bricks-wrapper .entry__thumb, .bricks-wrapper .entry__text {\n  -webkit-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05); }\n\n.bricks-wrapper .entry__thumb {\n  overflow: hidden;\n  position: relative; }\n\n.bricks-wrapper .entry__thumb img {\n  vertical-align: bottom;\n  -webkit-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n  margin: 0; }\n\n.bricks-wrapper .entry__thumb .thumb-link::before {\n  z-index: 1;\n  content: \"\";\n  display: block;\n  background: rgba(0, 0, 0, 0.8);\n  opacity: 0;\n  visibility: hidden;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.bricks-wrapper .entry__thumb .thumb-link::after {\n  z-index: 1;\n  display: block;\n  content: \"...\";\n  font-family: georgia, serif;\n  font-size: 3.2rem;\n  height: 90px;\n  width: 90px;\n  letter-spacing: .2rem;\n  line-height: 90px;\n  margin-left: -45px;\n  margin-top: -45px;\n  text-align: center;\n  color: white;\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(0.5);\n  transform: scale(0.5);\n  -webkit-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n  position: absolute;\n  left: 50%;\n  top: 50%; }\n\n.bricks-wrapper .entry__thumb:hover .thumb-link::before {\n  opacity: 1;\n  visibility: visible; }\n\n.bricks-wrapper .entry__thumb:hover .thumb-link::after {\n  opacity: 1;\n  visibility: visible;\n  -webkit-transform: scale(1);\n  transform: scale(1); }\n\n.bricks-wrapper .entry__thumb:hover .thumb-link img {\n  -webkit-transform: scale(1.05);\n  transform: scale(1.05); }\n\n.bricks-wrapper .entry__text {\n  padding-left: 2rem;\n  padding-right: 2rem;\n  padding-bottom: 1rem;\n  padding-top: 1rem;\n  background-color: white; }\n\n.bricks-wrapper .entry__text:hover {\n  background-color: var(--color-gray-1); }\n\n.bricks-wrapper .entry__title {\n  font-size: var(--text-lg);\n  font-weight: 500;\n  line-height: var(--vspace-1);\n  margin-top: 0;\n  margin-bottom: var(--vspace-0_5); }\n\n.bricks-wrapper .entry__title a, .bricks-wrapper .entry__title a:visited {\n  color: black; }\n\n.bricks-wrapper .entry__meta {\n  font-family: var(--font-1);\n  font-size: var(--text-sm);\n  margin-bottom: calc(0.125 * var(--space)); }\n\n.bricks-wrapper .entry__meta a, .bricks-wrapper .entry__meta a:visited {\n  color: black; }\n\n.bricks-wrapper .entry__cat-links a::after {\n  content: \", \"; }\n\n.bricks-wrapper .entry__cat-links a:last-child::after {\n  display: none; }\n\n.bricks-wrapper .entry__excerpt {\n  font-size: 1.5rem;\n  line-height: 1.733;\n  color: var(--color-text-light); }\n\n.bricks-wrapper .entry__excerpt p {\n  margin-bottom: 0; }\n\n@media screen and (max-width: 1400px) {\n  .bricks-wrapper .entry {\n    margin-bottom: 1rem; }\n  .bricks-wrapper .entry__title,\n  .format-quote blockquote p,\n  .format-link .link-wrap p {\n    font-size: var(--text-md);\n    line-height: calc(0.875 * var(--space)); } }\n\n@media screen and (max-width: 980px) {\n  .bricks-wrapper .entry__title,\n  .format-quote blockquote p,\n  .format-link .link-wrap p {\n    font-size: var(--text-lg);\n    line-height: var(--vspace-1); } }\n\n@media screen and (max-width: 800px) {\n  .bricks-wrapper .entry {\n    margin-bottom: 1rem; } }\n\n@media screen and (max-width: 700px) {\n  .bricks-wrapper .entry {\n    margin-bottom: 1rem; }\n  .bricks-wrapper .entry__title,\n  .format-quote blockquote p,\n  .format-link .link-wrap p {\n    font-size: var(--text-md);\n    line-height: calc(0.875 * var(--space)); } }\n\n@media screen and (max-width: 600px) {\n  .bricks-wrapper .entry {\n    margin-bottom: 1rem; }\n  .bricks-wrapper .entry__title,\n  .format-quote blockquote p,\n  .format-link .link-wrap p {\n    font-size: var(--text-lg);\n    line-height: var(--vspace-1); } }\n\n@media screen and (max-width: 400px) {\n  .bricks-wrapper .entry {\n    margin-bottom: 1rem; } }\n\n.s-content {\n  --row-max-width: 1080px;\n  padding-top: var(--topspace);\n  padding-bottom: var(--vspace-0_125); }\n  .s-content .row {\n    max-width: var(--row-max-width); }\n  .s-content row.wide {\n    max-width: 1400px; }\n  .s-content .row.narrow {\n    max-width: 800px; }\n\n.s-content--single {\n  padding-bottom: var(--vspace-0_125); }\n\n.s-content__media {\n  position: relative;\n  margin-bottom: var(--vspace-2_5); }\n\n.s-content__media img {\n  vertical-align: bottom;\n  margin-bottom: 0; }\n\n.s-content__primary {\n  padding-top: var(--topspace);\n  padding-left: 20rem;\n  padding-right: 20rem; }\n\n.s-content__primary img {\n  max-width: calc(var(--row-max-width) - var(--gutter-lg) * 2);\n  margin: var(--vspace-1) 0 var(--vspace-1) -8rem; }\n\n.s-content__title {\n  text-align: center; }\n\n.s-content__title--post {\n  margin-bottom: var(--vspace-0_25); }\n\n.s-content__blocks h4 {\n  margin-top: 0; }\n\n.s-content__form {\n  margin-top: var(--vspace-2); }\n\n@media screen and (max-width: 1200px) {\n  .s-content {\n    --row-max-width: 1000px; }\n  .s-content__primary {\n    padding-left: 4.8rem;\n    padding-right: 4.8rem; }\n    .s-content__primary img {\n      max-width: calc(var(--row-max-width) - var(--gutter-md) * 2);\n      margin: var(--vspace-1) 0 var(--vspace-1) -4.8rem; } }\n\n@media screen and (max-width: 1100px) {\n  .s-content {\n    --row-max-width: 920px; }\n  .s-content__primary {\n    padding-left: 4rem;\n    padding-right: 4rem; }\n    .s-content__primary img {\n      margin: var(--vspace-1) 0 var(--vspace-1) -4rem; } }\n\n@media screen and (max-width: 1020px) {\n  .s-content__primary {\n    padding-left: 3.2rem;\n    padding-right: 3.2rem; }\n    .s-content__primary img {\n      max-width: 100%;\n      margin: var(--vspace-1) 0; } }\n\n@media screen and (max-width: 800px) {\n  .s-content {\n    padding-top: var(--topspace); }\n  .s-content__primary {\n    padding-left: 0;\n    padding-right: 0; }\n  .s-content__media {\n    margin-bottom: var(--vspace-2); } }\n\n@media screen and (max-width: 600px) {\n  .s-content {\n    padding-top: var(--topspace); }\n  .s-content__media {\n    margin-bottom: var(--vspace-1_5); } }\n\n@media screen and (max-width: 400px) {\n  .s-content__title {\n    font-size: var(--text-xxl);\n    line-height: var(--vspace-1_5); } }\n\n.s-bricks {\n  padding-top: 4.2rem; }\n  .s-bricks .with-top-sep {\n    position: relative; }\n  .s-bricks .with-top-sep::before {\n    content: \"\";\n    display: block;\n    position: absolute;\n    left: 50%;\n    top: 0;\n    margin-left: -100px;\n    width: 200px;\n    height: 1px;\n    background-color: var(--color-border); }\n  .s-bricks .masonry {\n    max-width: 1440px;\n    width: 94%;\n    margin: 0 auto var(--vspace-1); }\n  .s-bricks .pagination {\n    margin-top: 6rem; }\n\n.bricks-wrapper .grid-sizer, .bricks-wrapper .brick {\n  width: 100%; }\n\n.bricks-wrapper .brick {\n  padding: 0; }\n\n.bricks-wrapper .featured-grid {\n  width: 100%; }\n\n.bricks-wrapper .featured-grid .entry-content {\n  width: 100%;\n  background: #151515; }\n\n@media screen and (max-width: 1440px) {\n  .s-bricks .masonry {\n    width: 98%; } }\n\n@media screen and (max-width: 1400px) {\n  .s-bricks .masonry {\n    max-width: var(--width-max);\n    width: 94%; }\n  .bricks-wrapper .grid-sizer, .bricks-wrapper .brick {\n    width: 100%; }\n  .bricks-wrapper .brick {\n    padding: 0; }\n  .bricks-wrapper .featured-grid {\n    width: 100%; } }\n\n@media screen and (max-width: 980px) {\n  .s-bricks .masonry {\n    max-width: 780px;\n    width: 96%; }\n  .bricks-wrapper .grid-sizer, .bricks-wrapper .brick {\n    width: 100%; }\n  .bricks-wrapper .featured-grid {\n    width: 100%; } }\n\n@media screen and (max-width: 800px) {\n  .bricks-wrapper .brick {\n    padding: 0; } }\n\n@media screen and (max-width: 700px) {\n  .bricks-wrapper .brick {\n    padding: 0; } }\n\n@media screen and (max-width: 600px) {\n  .s-bricks .masonry {\n    max-width: 480px;\n    width: 100%;\n    padding-left: 6vw;\n    padding-right: 6vw; }\n  .bricks-wrapper .grid-sizer,\n  .bricks-wrapper .brick {\n    float: none;\n    width: 100%;\n    padding: 0 var(--gutter-mob);\n    clear: both; } }\n\n@media screen and (max-width: 400px) {\n  .bricks-wrapper .brick {\n    margin-left: 0;\n    margin-right: 0;\n    padding: 0; } }\n\n.not-watched {\n  background: var(--color-1-lighter);\n  height: 6px; }\n\n.hide {\n  display: none; }\n\n.titles-category {\n  margin-bottom: 0; }\n\n.horizontal {\n  background: var(--color-1);\n  height: 2px;\n  margin-top: 3px;\n  margin-bottom: 3px; }\n\n.block {\n  display: block; }\n\n.empty-space {\n  height: 95.994px; }\n\nform {\n  display: inline; }\n\n.main-page {\n  padding-top: var(--vspace-3);\n  padding-bottom: var(--vspace-0_125); }\n\n.form-add-folder-up {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%); }\n\n.blur {\n  filter: blur(10px); }\n\n.folder-names {\n  display: inline-block;\n  background: none;\n  width: 65%;\n  border: var(--color-body) solid;\n  border-radius: 5px;\n  margin-top: 3px;\n  margin-bottom: 3px; }\n\n.folder-names:hover {\n  color: var(--color-2);\n  cursor: pointer;\n  background: var(--color-info);\n  border: var(--color-info) solid;\n  border-radius: 5px; }\n\n.folder-names-focus {\n  border-radius: 5px; }\n\n.max-ch {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n\n.main-columns {\n  height: 100%;\n  overflow-y: scroll;\n  overflow-x: hidden; }\n\n.main-container {\n  overflow: hidden;\n  height: calc(100vh - 105px);\n  position: relative;\n  width: 100%; }\n\n.letter-board {\n  position: fixed;\n  background: var(--color-body);\n  width: 47.5%;\n  height: 25px;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end; }\n\n@media screen and (max-width: 800px) {\n  .letter-board {\n    position: fixed;\n    background: var(--color-body);\n    width: 90%;\n    height: 25px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between; }\n  .letter-board-small {\n    display: flex;\n    flex-direction: row; } }\n\n.letter-board-last-element {\n  margin-right: 20px; }\n\n.icon-group {\n  display: flex;\n  flex-direction: row;\n  margin-right: 5px; }\n\n.input-group {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start; }\n\n.letter-container {\n  margin-top: 30px; }\n\n.icon-trash {\n  display: block;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%); }\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/wrapper.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB,EAAE;;AAEvB;EACE,iDAAiD;EACjD,yCAAyC,EAAE;;AAE7C;EACE,gBAAgB;EAChB,kBAAkB,EAAE;;AAEtB;EACE,sBAAsB;EACtB,wCAAwC;EACxC,gCAAgC;EAChC,SAAS,EAAE;;AAEb;EACE,UAAU;EACV,WAAW;EACX,cAAc;EACd,8BAA8B;EAC9B,UAAU;EACV,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,wCAAwC;EACxC,gCAAgC;EAChC,kBAAkB;EAClB,MAAM;EACN,OAAO,EAAE;;AAEX;EACE,UAAU;EACV,cAAc;EACd,cAAc;EACd,2BAA2B;EAC3B,iBAAiB;EACjB,YAAY;EACZ,WAAW;EACX,qBAAqB;EACrB,iBAAiB;EACjB,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;EAClB,YAAY;EACZ,UAAU;EACV,kBAAkB;EAClB,6BAA6B;EAC7B,qBAAqB;EACrB,wCAAwC;EACxC,gCAAgC;EAChC,kBAAkB;EAClB,SAAS;EACT,QAAQ,EAAE;;AAEZ;EACE,UAAU;EACV,mBAAmB,EAAE;;AAEvB;EACE,UAAU;EACV,mBAAmB;EACnB,2BAA2B;EAC3B,mBAAmB,EAAE;;AAEvB;EACE,8BAA8B;EAC9B,sBAAsB,EAAE;;AAE1B;EACE,kBAAkB;EAClB,mBAAmB;EACnB,oBAAoB;EACpB,iBAAiB;EACjB,uBAAuB,EAAE;;AAE3B;EACE,qCAAqC,EAAE;;AAEzC;EACE,yBAAyB;EACzB,gBAAgB;EAChB,4BAA4B;EAC5B,aAAa;EACb,gCAAgC,EAAE;;AAEpC;EACE,YAAY,EAAE;;AAEhB;EACE,0BAA0B;EAC1B,yBAAyB;EACzB,yCAAyC,EAAE;;AAE7C;EACE,YAAY,EAAE;;AAEhB;EACE,aAAa,EAAE;;AAEjB;EACE,aAAa,EAAE;;AAEjB;EACE,iBAAiB;EACjB,kBAAkB;EAClB,8BAA8B,EAAE;;AAElC;EACE,gBAAgB,EAAE;;AAEpB;EACE;IACE,mBAAmB,EAAE;EACvB;;;IAGE,yBAAyB;IACzB,uCAAuC,EAAE,EAAE;;AAE/C;EACE;;;IAGE,yBAAyB;IACzB,4BAA4B,EAAE,EAAE;;AAEpC;EACE;IACE,mBAAmB,EAAE,EAAE;;AAE3B;EACE;IACE,mBAAmB,EAAE;EACvB;;;IAGE,yBAAyB;IACzB,uCAAuC,EAAE,EAAE;;AAE/C;EACE;IACE,mBAAmB,EAAE;EACvB;;;IAGE,yBAAyB;IACzB,4BAA4B,EAAE,EAAE;;AAEpC;EACE;IACE,mBAAmB,EAAE,EAAE;;AAE3B;EACE,uBAAuB;EACvB,4BAA4B;EAC5B,mCAAmC,EAAE;EACrC;IACE,+BAA+B,EAAE;EACnC;IACE,iBAAiB,EAAE;EACrB;IACE,gBAAgB,EAAE;;AAEtB;EACE,mCAAmC,EAAE;;AAEvC;EACE,kBAAkB;EAClB,gCAAgC,EAAE;;AAEpC;EACE,sBAAsB;EACtB,gBAAgB,EAAE;;AAEpB;EACE,4BAA4B;EAC5B,mBAAmB;EACnB,oBAAoB,EAAE;;AAExB;EACE,4DAA4D;EAC5D,+CAA+C,EAAE;;AAEnD;EACE,kBAAkB,EAAE;;AAEtB;EACE,iCAAiC,EAAE;;AAErC;EACE,aAAa,EAAE;;AAEjB;EACE,2BAA2B,EAAE;;AAE/B;EACE;IACE,uBAAuB,EAAE;EAC3B;IACE,oBAAoB;IACpB,qBAAqB,EAAE;IACvB;MACE,4DAA4D;MAC5D,iDAAiD,EAAE,EAAE;;AAE3D;EACE;IACE,sBAAsB,EAAE;EAC1B;IACE,kBAAkB;IAClB,mBAAmB,EAAE;IACrB;MACE,+CAA+C,EAAE,EAAE;;AAEzD;EACE;IACE,oBAAoB;IACpB,qBAAqB,EAAE;IACvB;MACE,eAAe;MACf,yBAAyB,EAAE,EAAE;;AAEnC;EACE;IACE,4BAA4B,EAAE;EAChC;IACE,eAAe;IACf,gBAAgB,EAAE;EACpB;IACE,8BAA8B,EAAE,EAAE;;AAEtC;EACE;IACE,4BAA4B,EAAE;EAChC;IACE,gCAAgC,EAAE,EAAE;;AAExC;EACE;IACE,0BAA0B;IAC1B,8BAA8B,EAAE,EAAE;;AAEtC;EACE,mBAAmB,EAAE;EACrB;IACE,kBAAkB,EAAE;EACtB;IACE,WAAW;IACX,cAAc;IACd,kBAAkB;IAClB,SAAS;IACT,MAAM;IACN,mBAAmB;IACnB,YAAY;IACZ,WAAW;IACX,qCAAqC,EAAE;EACzC;IACE,iBAAiB;IACjB,UAAU;IACV,8BAA8B,EAAE;EAClC;IACE,gBAAgB,EAAE;;AAEtB;EACE,WAAW,EAAE;;AAEf;EACE,UAAU,EAAE;;AAEd;EACE,WAAW,EAAE;;AAEf;EACE,WAAW;EACX,mBAAmB,EAAE;;AAEvB;EACE;IACE,UAAU,EAAE,EAAE;;AAElB;EACE;IACE,2BAA2B;IAC3B,UAAU,EAAE;EACd;IACE,WAAW,EAAE;EACf;IACE,UAAU,EAAE;EACd;IACE,WAAW,EAAE,EAAE;;AAEnB;EACE;IACE,gBAAgB;IAChB,UAAU,EAAE;EACd;IACE,WAAW,EAAE;EACf;IACE,WAAW,EAAE,EAAE;;AAEnB;EACE;IACE,UAAU,EAAE,EAAE;;AAElB;EACE;IACE,UAAU,EAAE,EAAE;;AAElB;EACE;IACE,gBAAgB;IAChB,WAAW;IACX,iBAAiB;IACjB,kBAAkB,EAAE;EACtB;;IAEE,WAAW;IACX,WAAW;IACX,4BAA4B;IAC5B,WAAW,EAAE,EAAE;;AAEnB;EACE;IACE,cAAc;IACd,eAAe;IACf,UAAU,EAAE,EAAE;;AAElB;EACE,kCAAkC;EAClC,WAAW,EAAE;;AAEf;EACE,aAAa,EAAE;;AAEjB;EACE,gBAAgB,EAAE;;AAEpB;EACE,0BAA0B;EAC1B,WAAW;EACX,eAAe;EACf,kBAAkB,EAAE;;AAEtB;EACE,cAAc,EAAE;;AAElB;EACE,gBAAgB,EAAE;;AAEpB;EACE,eAAe,EAAE;;AAEnB;EACE,4BAA4B;EAC5B,mCAAmC,EAAE;;AAEvC;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC,EAAE;;AAEpC;EACE,kBAAkB,EAAE;;AAEtB;EACE,qBAAqB;EACrB,gBAAgB;EAChB,UAAU;EACV,+BAA+B;EAC/B,kBAAkB;EAClB,eAAe;EACf,kBAAkB,EAAE;;AAEtB;EACE,qBAAqB;EACrB,eAAe;EACf,6BAA6B;EAC7B,+BAA+B;EAC/B,kBAAkB,EAAE;;AAEtB;EACE,kBAAkB,EAAE;;AAEtB;EACE,mBAAmB;EACnB,gBAAgB;EAChB,uBAAuB,EAAE;;AAE3B;EACE,YAAY;EACZ,kBAAkB;EAClB,kBAAkB,EAAE;;AAEtB;EACE,gBAAgB;EAChB,2BAA2B;EAC3B,kBAAkB;EAClB,WAAW,EAAE;;AAEf;EACE,eAAe;EACf,6BAA6B;EAC7B,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,yBAAyB,EAAE;;AAE7B;EACE;IACE,eAAe;IACf,6BAA6B;IAC7B,UAAU;IACV,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,8BAA8B,EAAE;EAClC;IACE,aAAa;IACb,mBAAmB,EAAE,EAAE;;AAE3B;EACE,kBAAkB,EAAE;;AAEtB;EACE,aAAa;EACb,mBAAmB;EACnB,iBAAiB,EAAE;;AAErB;EACE,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,2BAA2B,EAAE;;AAE/B;EACE,gBAAgB,EAAE;;AAEpB;EACE,cAAc;EACd,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC,EAAE","sourcesContent":[".bricks-wrapper .entry {\n  margin-bottom: 1rem; }\n\n.bricks-wrapper .entry__thumb, .bricks-wrapper .entry__text {\n  -webkit-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05); }\n\n.bricks-wrapper .entry__thumb {\n  overflow: hidden;\n  position: relative; }\n\n.bricks-wrapper .entry__thumb img {\n  vertical-align: bottom;\n  -webkit-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n  margin: 0; }\n\n.bricks-wrapper .entry__thumb .thumb-link::before {\n  z-index: 1;\n  content: \"\";\n  display: block;\n  background: rgba(0, 0, 0, 0.8);\n  opacity: 0;\n  visibility: hidden;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.bricks-wrapper .entry__thumb .thumb-link::after {\n  z-index: 1;\n  display: block;\n  content: \"...\";\n  font-family: georgia, serif;\n  font-size: 3.2rem;\n  height: 90px;\n  width: 90px;\n  letter-spacing: .2rem;\n  line-height: 90px;\n  margin-left: -45px;\n  margin-top: -45px;\n  text-align: center;\n  color: white;\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(0.5);\n  transform: scale(0.5);\n  -webkit-transition: all 0.3s ease-in-out;\n  transition: all 0.3s ease-in-out;\n  position: absolute;\n  left: 50%;\n  top: 50%; }\n\n.bricks-wrapper .entry__thumb:hover .thumb-link::before {\n  opacity: 1;\n  visibility: visible; }\n\n.bricks-wrapper .entry__thumb:hover .thumb-link::after {\n  opacity: 1;\n  visibility: visible;\n  -webkit-transform: scale(1);\n  transform: scale(1); }\n\n.bricks-wrapper .entry__thumb:hover .thumb-link img {\n  -webkit-transform: scale(1.05);\n  transform: scale(1.05); }\n\n.bricks-wrapper .entry__text {\n  padding-left: 2rem;\n  padding-right: 2rem;\n  padding-bottom: 1rem;\n  padding-top: 1rem;\n  background-color: white; }\n\n.bricks-wrapper .entry__text:hover {\n  background-color: var(--color-gray-1); }\n\n.bricks-wrapper .entry__title {\n  font-size: var(--text-lg);\n  font-weight: 500;\n  line-height: var(--vspace-1);\n  margin-top: 0;\n  margin-bottom: var(--vspace-0_5); }\n\n.bricks-wrapper .entry__title a, .bricks-wrapper .entry__title a:visited {\n  color: black; }\n\n.bricks-wrapper .entry__meta {\n  font-family: var(--font-1);\n  font-size: var(--text-sm);\n  margin-bottom: calc(0.125 * var(--space)); }\n\n.bricks-wrapper .entry__meta a, .bricks-wrapper .entry__meta a:visited {\n  color: black; }\n\n.bricks-wrapper .entry__cat-links a::after {\n  content: \", \"; }\n\n.bricks-wrapper .entry__cat-links a:last-child::after {\n  display: none; }\n\n.bricks-wrapper .entry__excerpt {\n  font-size: 1.5rem;\n  line-height: 1.733;\n  color: var(--color-text-light); }\n\n.bricks-wrapper .entry__excerpt p {\n  margin-bottom: 0; }\n\n@media screen and (max-width: 1400px) {\n  .bricks-wrapper .entry {\n    margin-bottom: 1rem; }\n  .bricks-wrapper .entry__title,\n  .format-quote blockquote p,\n  .format-link .link-wrap p {\n    font-size: var(--text-md);\n    line-height: calc(0.875 * var(--space)); } }\n\n@media screen and (max-width: 980px) {\n  .bricks-wrapper .entry__title,\n  .format-quote blockquote p,\n  .format-link .link-wrap p {\n    font-size: var(--text-lg);\n    line-height: var(--vspace-1); } }\n\n@media screen and (max-width: 800px) {\n  .bricks-wrapper .entry {\n    margin-bottom: 1rem; } }\n\n@media screen and (max-width: 700px) {\n  .bricks-wrapper .entry {\n    margin-bottom: 1rem; }\n  .bricks-wrapper .entry__title,\n  .format-quote blockquote p,\n  .format-link .link-wrap p {\n    font-size: var(--text-md);\n    line-height: calc(0.875 * var(--space)); } }\n\n@media screen and (max-width: 600px) {\n  .bricks-wrapper .entry {\n    margin-bottom: 1rem; }\n  .bricks-wrapper .entry__title,\n  .format-quote blockquote p,\n  .format-link .link-wrap p {\n    font-size: var(--text-lg);\n    line-height: var(--vspace-1); } }\n\n@media screen and (max-width: 400px) {\n  .bricks-wrapper .entry {\n    margin-bottom: 1rem; } }\n\n.s-content {\n  --row-max-width: 1080px;\n  padding-top: var(--topspace);\n  padding-bottom: var(--vspace-0_125); }\n  .s-content .row {\n    max-width: var(--row-max-width); }\n  .s-content row.wide {\n    max-width: 1400px; }\n  .s-content .row.narrow {\n    max-width: 800px; }\n\n.s-content--single {\n  padding-bottom: var(--vspace-0_125); }\n\n.s-content__media {\n  position: relative;\n  margin-bottom: var(--vspace-2_5); }\n\n.s-content__media img {\n  vertical-align: bottom;\n  margin-bottom: 0; }\n\n.s-content__primary {\n  padding-top: var(--topspace);\n  padding-left: 20rem;\n  padding-right: 20rem; }\n\n.s-content__primary img {\n  max-width: calc(var(--row-max-width) - var(--gutter-lg) * 2);\n  margin: var(--vspace-1) 0 var(--vspace-1) -8rem; }\n\n.s-content__title {\n  text-align: center; }\n\n.s-content__title--post {\n  margin-bottom: var(--vspace-0_25); }\n\n.s-content__blocks h4 {\n  margin-top: 0; }\n\n.s-content__form {\n  margin-top: var(--vspace-2); }\n\n@media screen and (max-width: 1200px) {\n  .s-content {\n    --row-max-width: 1000px; }\n  .s-content__primary {\n    padding-left: 4.8rem;\n    padding-right: 4.8rem; }\n    .s-content__primary img {\n      max-width: calc(var(--row-max-width) - var(--gutter-md) * 2);\n      margin: var(--vspace-1) 0 var(--vspace-1) -4.8rem; } }\n\n@media screen and (max-width: 1100px) {\n  .s-content {\n    --row-max-width: 920px; }\n  .s-content__primary {\n    padding-left: 4rem;\n    padding-right: 4rem; }\n    .s-content__primary img {\n      margin: var(--vspace-1) 0 var(--vspace-1) -4rem; } }\n\n@media screen and (max-width: 1020px) {\n  .s-content__primary {\n    padding-left: 3.2rem;\n    padding-right: 3.2rem; }\n    .s-content__primary img {\n      max-width: 100%;\n      margin: var(--vspace-1) 0; } }\n\n@media screen and (max-width: 800px) {\n  .s-content {\n    padding-top: var(--topspace); }\n  .s-content__primary {\n    padding-left: 0;\n    padding-right: 0; }\n  .s-content__media {\n    margin-bottom: var(--vspace-2); } }\n\n@media screen and (max-width: 600px) {\n  .s-content {\n    padding-top: var(--topspace); }\n  .s-content__media {\n    margin-bottom: var(--vspace-1_5); } }\n\n@media screen and (max-width: 400px) {\n  .s-content__title {\n    font-size: var(--text-xxl);\n    line-height: var(--vspace-1_5); } }\n\n.s-bricks {\n  padding-top: 4.2rem; }\n  .s-bricks .with-top-sep {\n    position: relative; }\n  .s-bricks .with-top-sep::before {\n    content: \"\";\n    display: block;\n    position: absolute;\n    left: 50%;\n    top: 0;\n    margin-left: -100px;\n    width: 200px;\n    height: 1px;\n    background-color: var(--color-border); }\n  .s-bricks .masonry {\n    max-width: 1440px;\n    width: 94%;\n    margin: 0 auto var(--vspace-1); }\n  .s-bricks .pagination {\n    margin-top: 6rem; }\n\n.bricks-wrapper .grid-sizer, .bricks-wrapper .brick {\n  width: 100%; }\n\n.bricks-wrapper .brick {\n  padding: 0; }\n\n.bricks-wrapper .featured-grid {\n  width: 100%; }\n\n.bricks-wrapper .featured-grid .entry-content {\n  width: 100%;\n  background: #151515; }\n\n@media screen and (max-width: 1440px) {\n  .s-bricks .masonry {\n    width: 98%; } }\n\n@media screen and (max-width: 1400px) {\n  .s-bricks .masonry {\n    max-width: var(--width-max);\n    width: 94%; }\n  .bricks-wrapper .grid-sizer, .bricks-wrapper .brick {\n    width: 100%; }\n  .bricks-wrapper .brick {\n    padding: 0; }\n  .bricks-wrapper .featured-grid {\n    width: 100%; } }\n\n@media screen and (max-width: 980px) {\n  .s-bricks .masonry {\n    max-width: 780px;\n    width: 96%; }\n  .bricks-wrapper .grid-sizer, .bricks-wrapper .brick {\n    width: 100%; }\n  .bricks-wrapper .featured-grid {\n    width: 100%; } }\n\n@media screen and (max-width: 800px) {\n  .bricks-wrapper .brick {\n    padding: 0; } }\n\n@media screen and (max-width: 700px) {\n  .bricks-wrapper .brick {\n    padding: 0; } }\n\n@media screen and (max-width: 600px) {\n  .s-bricks .masonry {\n    max-width: 480px;\n    width: 100%;\n    padding-left: 6vw;\n    padding-right: 6vw; }\n  .bricks-wrapper .grid-sizer,\n  .bricks-wrapper .brick {\n    float: none;\n    width: 100%;\n    padding: 0 var(--gutter-mob);\n    clear: both; } }\n\n@media screen and (max-width: 400px) {\n  .bricks-wrapper .brick {\n    margin-left: 0;\n    margin-right: 0;\n    padding: 0; } }\n\n.not-watched {\n  background: var(--color-1-lighter);\n  height: 6px; }\n\n.hide {\n  display: none; }\n\n.titles-category {\n  margin-bottom: 0; }\n\n.horizontal {\n  background: var(--color-1);\n  height: 2px;\n  margin-top: 3px;\n  margin-bottom: 3px; }\n\n.block {\n  display: block; }\n\n.empty-space {\n  height: 95.994px; }\n\nform {\n  display: inline; }\n\n.main-page {\n  padding-top: var(--vspace-3);\n  padding-bottom: var(--vspace-0_125); }\n\n.form-add-folder-up {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%); }\n\n.blur {\n  filter: blur(10px); }\n\n.folder-names {\n  display: inline-block;\n  background: none;\n  width: 65%;\n  border: var(--color-body) solid;\n  border-radius: 5px;\n  margin-top: 3px;\n  margin-bottom: 3px; }\n\n.folder-names:hover {\n  color: var(--color-2);\n  cursor: pointer;\n  background: var(--color-info);\n  border: var(--color-info) solid;\n  border-radius: 5px; }\n\n.folder-names-focus {\n  border-radius: 5px; }\n\n.max-ch {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n\n.main-columns {\n  height: 100%;\n  overflow-y: scroll;\n  overflow-x: hidden; }\n\n.main-container {\n  overflow: hidden;\n  height: calc(100vh - 105px);\n  position: relative;\n  width: 100%; }\n\n.letter-board {\n  position: fixed;\n  background: var(--color-body);\n  width: 47.5%;\n  height: 25px;\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end; }\n\n@media screen and (max-width: 800px) {\n  .letter-board {\n    position: fixed;\n    background: var(--color-body);\n    width: 90%;\n    height: 25px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between; }\n  .letter-board-small {\n    display: flex;\n    flex-direction: row; } }\n\n.letter-board-last-element {\n  margin-right: 20px; }\n\n.icon-group {\n  display: flex;\n  flex-direction: row;\n  margin-right: 5px; }\n\n.input-group {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start; }\n\n.letter-container {\n  margin-top: 30px; }\n\n.icon-trash {\n  display: block;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%); }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(0);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/font.css
var font = __webpack_require__(4);

// CONCATENATED MODULE: ./src/Views/public/css/font.css

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(font["a" /* default */], options);



/* harmony default export */ var css_font = (font["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/color.css
var color = __webpack_require__(5);

// CONCATENATED MODULE: ./src/Views/public/css/color.css

            

var color_options = {};

color_options.insert = "head";
color_options.singleton = false;

var color_update = injectStylesIntoStyleTag_default()(color["a" /* default */], color_options);



/* harmony default export */ var css_color = (color["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/spacing.css
var spacing = __webpack_require__(6);

// CONCATENATED MODULE: ./src/Views/public/css/spacing.css

            

var spacing_options = {};

spacing_options.insert = "head";
spacing_options.singleton = false;

var spacing_update = injectStylesIntoStyleTag_default()(spacing["a" /* default */], spacing_options);



/* harmony default export */ var css_spacing = (spacing["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/grid.css
var grid = __webpack_require__(7);

// CONCATENATED MODULE: ./src/Views/public/css/grid.css

            

var grid_options = {};

grid_options.insert = "head";
grid_options.singleton = false;

var grid_update = injectStylesIntoStyleTag_default()(grid["a" /* default */], grid_options);



/* harmony default export */ var css_grid = (grid["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/properties.css
var properties = __webpack_require__(8);

// CONCATENATED MODULE: ./src/Views/public/css/properties.css

            

var properties_options = {};

properties_options.insert = "head";
properties_options.singleton = false;

var properties_update = injectStylesIntoStyleTag_default()(properties["a" /* default */], properties_options);



/* harmony default export */ var css_properties = (properties["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/blocks.css
var blocks = __webpack_require__(9);

// CONCATENATED MODULE: ./src/Views/public/css/blocks.css

            

var blocks_options = {};

blocks_options.insert = "head";
blocks_options.singleton = false;

var blocks_update = injectStylesIntoStyleTag_default()(blocks["a" /* default */], blocks_options);



/* harmony default export */ var css_blocks = (blocks["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/components/input.css
var input = __webpack_require__(10);

// CONCATENATED MODULE: ./src/Views/public/css/components/input.css

            

var input_options = {};

input_options.insert = "head";
input_options.singleton = false;

var input_update = injectStylesIntoStyleTag_default()(input["a" /* default */], input_options);



/* harmony default export */ var components_input = (input["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/components/title.css
var title = __webpack_require__(11);

// CONCATENATED MODULE: ./src/Views/public/css/components/title.css

            

var title_options = {};

title_options.insert = "head";
title_options.singleton = false;

var title_update = injectStylesIntoStyleTag_default()(title["a" /* default */], title_options);



/* harmony default export */ var components_title = (title["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/components/scroll.css
var components_scroll = __webpack_require__(12);

// CONCATENATED MODULE: ./src/Views/public/css/components/scroll.css

            

var scroll_options = {};

scroll_options.insert = "head";
scroll_options.singleton = false;

var scroll_update = injectStylesIntoStyleTag_default()(components_scroll["a" /* default */], scroll_options);



/* harmony default export */ var css_components_scroll = (components_scroll["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/components/button.css
var components_button = __webpack_require__(13);

// CONCATENATED MODULE: ./src/Views/public/css/components/button.css

            

var button_options = {};

button_options.insert = "head";
button_options.singleton = false;

var button_update = injectStylesIntoStyleTag_default()(components_button["a" /* default */], button_options);



/* harmony default export */ var css_components_button = (components_button["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/components/triangle.css
var triangle = __webpack_require__(14);

// CONCATENATED MODULE: ./src/Views/public/css/components/triangle.css

            

var triangle_options = {};

triangle_options.insert = "head";
triangle_options.singleton = false;

var triangle_update = injectStylesIntoStyleTag_default()(triangle["a" /* default */], triangle_options);



/* harmony default export */ var components_triangle = (triangle["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/components/header.css
var header = __webpack_require__(15);

// CONCATENATED MODULE: ./src/Views/public/css/components/header.css

            

var header_options = {};

header_options.insert = "head";
header_options.singleton = false;

var header_update = injectStylesIntoStyleTag_default()(header["a" /* default */], header_options);



/* harmony default export */ var components_header = (header["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/components/search.css
var search = __webpack_require__(16);

// CONCATENATED MODULE: ./src/Views/public/css/components/search.css

            

var search_options = {};

search_options.insert = "head";
search_options.singleton = false;

var search_update = injectStylesIntoStyleTag_default()(search["a" /* default */], search_options);



/* harmony default export */ var components_search = (search["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/base.css
var base = __webpack_require__(17);

// CONCATENATED MODULE: ./src/Views/public/css/base.css

            

var base_options = {};

base_options.insert = "head";
base_options.singleton = false;

var base_update = injectStylesIntoStyleTag_default()(base["a" /* default */], base_options);



/* harmony default export */ var css_base = (base["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/wrapper.css
var wrapper = __webpack_require__(18);

// CONCATENATED MODULE: ./src/Views/public/css/wrapper.css

            

var wrapper_options = {};

wrapper_options.insert = "head";
wrapper_options.singleton = false;

var wrapper_update = injectStylesIntoStyleTag_default()(wrapper["a" /* default */], wrapper_options);



/* harmony default export */ var css_wrapper = (wrapper["a" /* default */].locals || {});
// CONCATENATED MODULE: ./src/Constants.js
var Events = {
  global: {
    goBack: 'goBack',
    redirect: 'redirect',
    logout: 'logout'
  },
  signInViewEvents: {
    submit: 'SignIn-submit',
    errors: 'SignIn-errors'
  },
  signUpViewEvents: {
    submit: 'SignUp-submit',
    errors: 'SignUp-errors'
  },
  profileEditViewEvents: {
    submit: 'ProfileEdit-submit',
    errors: 'ProfileEdit-errors',
    needUserData: 'ProfileEditView-needUserData'
  },
  profileViewEvents: {
    needUserData: 'ProfileView-needUserData'
  },
  mainPageView: {
    needData: 'mainPageView-needData',
    recivedFolder: 'mainPageView-recivedFolder',
    sendedFolder: 'mainPageView-sendedFolder',
    selectFolder: 'mainPageView-selectFolder',
    selectLetter: 'mainPageView-selectLetter',
    recivedUn: 'mainPageView-recivedUn',
    sendedUn: 'mainPageView-sendedUn',
    addFolderRecived: 'mainPageView-addFolderRecived',
    addFolderSended: 'mainPageView-addFolderSended',
    sendWrittenLetter: 'mainPageView-sendWrittenLetter',
    inFolder: 'mainPageView-inFolder',
    renameFolder: 'mainPageView-renameFolder',
    deleteFolder: 'mainPageView-deleteFolder',
    deleteLetter: 'mainPageView-deleteLetter',
    backToFolders: 'mainPageView-backToFolders',
    backToLetters: 'mainPageView-backToLetters',
    startSearch: 'mainPageView-startSearch',
    resultSearch: 'mainPageView-resultSearch'
  },
  mainPageController: {
    needGetFolderList: 'mainPageController-needGetFolderList',
    needGetLetterList: 'mainPageController-needGetLetterList',
    needGetLetter: 'mainPageController-needGetLetter',
    recivedFolder: 'mainPageController-recivedFolder',
    sendedFolder: 'mainPageController-sendedFolder',
    selectFolder: 'mainPageController-selectFolder',
    selectLetter: 'mainPageController-selectLetter',
    recivedUn: 'mainPageController-recivedUn',
    sendedUn: 'mainPageController-sendedUn',
    addFolderRecived: 'mainPageController-addFolderRecived',
    addFolderSended: 'mainPageController-addFolderSended',
    sendWrittenLetter: 'mainPageController-sendWrittenLetter',
    inFolder: 'mainPageController-inFolder',
    renameFolder: 'mainPageController-renameFolder',
    deleteFolder: 'mainPageController-deleteFolder',
    deleteLetter: 'mainPageController-deleteLetter',
    backToFolders: 'mainPageController-backToFolders',
    backToLetters: 'mainPageController-backToLetters',
    startSearch: 'mainPageController-startSearch',
    resultSearch: 'mainPageController-resultSearch'
  },
  sendLetterView: {
    sendLetter: 'sendLetterView-sendLetter'
  },
  navbarView: {
    needData: 'navbar-needData'
  },
  letterModelEvents: {
    getLetter: {
      success: 'letterModelEvents-getLetter-success',
      fail: 'letterModelEvents-getLetter-fail'
    },
    getLetterList: {
      success: 'letterModelEvents-getLetterList-success',
      fail: 'letterModelEvents-getLetterList-fail'
    },
    getFolderList: {
      success: 'letterModelEvents-getFolderList-success',
      fail: 'letterModelEvents-getFolderList-fail'
    },
    sendLetter: {
      success: 'letterModelEvents-sendLetter-success',
      fail: 'letterModelEvents-sendLetter-fail'
    },
    recivedFolder: {
      success: 'letterModelEvents-recivedFolder-success',
      fail: 'letterModelEvents-recivedFolder-fail'
    },
    sendedFolder: {
      success: 'letterModelEvents-sendedFolder-success',
      fail: 'letterModelEvents-sendedFolder-fail'
    },
    selectFolder: {
      success: 'letterModelEvents-selectFolder-success',
      fail: 'letterModelEvents-selectFolder-fail'
    },
    recivedUn: {
      success: 'letterModelEvents-recivedUn-success',
      fail: 'letterModelEvents-recivedUn-fail'
    },
    sendedUn: {
      success: 'letterModelEvents-sendedUn-success',
      fail: 'letterModelEvents-sendedUn-fail'
    },
    addFolderRecived: {
      success: 'letterModelEvents-addFolderRecived-success',
      fail: 'letterModelEvents-addFolderRecived-fail'
    },
    addFolderSended: {
      success: 'letterModelEvents-addFolderSended-success',
      fail: 'letterModelEvents-addFolderSended-fail'
    },
    sendWrittenLetter: {
      success: 'letterModelEvents-sendWrittenLetter-success',
      fail: 'letterModelEvents-sendWrittenLetter-fail'
    },
    inFolder: {
      success: 'letterModelEvents-inFolder-success',
      fail: 'letterModelEvents-inFolder-fail'
    },
    renameFolder: {
      success: 'letterModelEvents-renameFolder-success',
      fail: 'letterModelEvents-renameFolder-fail'
    },
    deleteFolder: {
      success: 'letterModelEvents-deleteFolder-success',
      fail: 'letterModelEvents-deleteFolder-fail'
    },
    deleteLetter: {
      success: 'letterModelEvents-deleteLetter-success',
      fail: 'letterModelEvents-deleteLetter-fail'
    },
    backToFolders: {
      success: 'letterModelEvents-backToFolders-success',
      fail: 'letterModelEvents-backToFolders-fail'
    },
    backToLetters: {
      success: 'letterModelEvents-backToLetters-success',
      fail: 'letterModelEvents-backToLetters-fail'
    },
    startSearch: {
      success: 'letterModelEvents-startSearch-success',
      fail: 'letterModelEvents-startSearch-fail'
    },
    resultSearch: {
      success: 'letterModelEvents-resultSearch-success',
      fail: 'letterModelEvents-resultSearch-fail'
    }
  },
  userModelEvents: {
    signIn: {
      success: 'UserModel-authorizationSuccess',
      fail: 'UserModel-authorizationFail'
    },
    signUp: {
      success: 'UserModel-signupSuccess',
      fail: 'UserModel-signupFail'
    },
    profileEdit: {
      success: 'UserModel-profileEditSuccess',
      fail: 'UserModel-profileEditFail'
    },
    profileGetData: {
      success: 'profile-successGetData',
      fail: 'fail-getData'
    }
  }
};
var Paths = {
  baseUrl: 'http://localhost:8080',
  mainPage: '/letters',
  signInPage: '/signin',
  signUpPage: '/signup',
  profilePage: '/profile',
  profileEditPage: '/profileEdit',
  sendLetterPage: '/sendLetter',
  logout: '/logout',
  signInServ: '/session',
  logoutServ: '/session',
  signUpServ: '/user',
  editUserServ: '/user',
  sendMessageToServ: '/letter',
  getUserData: '/user',
  getAvatar: '/user/avatar',
  getReceivedLetters: '/user/letter/received',
  getSendedLetters: '/user/letter/sent',
  getRecivedFolder: '/user/folders/recived',
  getSendedFolder: '/user/folders/sended',
  getSelectFolder: '/user/foders',
  addFolderRecived: '/user/folders/recived/folderName',
  addFolderSended: '/user/folders/sended/folderName',
  sendWrittenLetter: '/watch/letter',
  inFolder: '/user/folders/',
  renameFolder: '/user/folders/recived/folderName',
  deleteFolder: '/user/folders/recived/folderName',
  deleteLetter: '/letter',
  startSearch: '/letter/',
  resultSearch: '/letter/by/'
}; // логин post /session
// логаут delete /session
// регистрация post /user
// редактирование профиля put/user
// получене аватарки get /user/avatar
// получение данных юзера get /user
// получение отправленных писем get /receivedLetters
// получение полученных писем get /sendedLetters
// отправка письма post /letter


// CONCATENATED MODULE: ./src/EventBus.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventBus = /*#__PURE__*/function () {
  function EventBus() {
    _classCallCheck(this, EventBus);
  }

  _createClass(EventBus, [{
    key: "on",

    /* eslint no-underscore-dangle: 0 */

    /**
     * Подписаться на событие, использование:
     * menu.on('select', function(item) { ... }
     */
    value: function on(eventName, handler) {
      if (!this._eventHandlers) this._eventHandlers = {};

      if (!this._eventHandlers[eventName]) {
        this._eventHandlers[eventName] = [];
      }

      this._eventHandlers[eventName].push(handler);

      return this;
    }
    /**
     * Отменить подписку, использование:
     * menu.off('select', handler)
     */

  }, {
    key: "off",
    value: function off(eventName, handler) {
      var _this$_eventHandlers;

      var handlers = (_this$_eventHandlers = this._eventHandlers) === null || _this$_eventHandlers === void 0 ? void 0 : _this$_eventHandlers[eventName].filter(function (value) {
        return value !== handler;
      });
      this._eventHandlers[eventName] = handlers;
    }
    /**
     * Сгенерировать событие с указанным именем и данными
     * this.emit('select', data1, data2);
     */

  }, {
    key: "emit",
    value: function emit(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!this._eventHandlers || !this._eventHandlers[eventName]) {
        return;
      }

      this._eventHandlers[eventName].forEach(function (handler) {
        return handler.apply(void 0, args);
      });
    }
  }]);

  return EventBus;
}();

/* harmony default export */ var src_EventBus = (new EventBus());
// CONCATENATED MODULE: ./src/Views/Router.js
function Router_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Router_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Router_createClass(Constructor, protoProps, staticProps) { if (protoProps) Router_defineProperties(Constructor.prototype, protoProps); if (staticProps) Router_defineProperties(Constructor, staticProps); return Constructor; }




var Router_Router = /*#__PURE__*/function () {
  function Router() {
    var _this = this;

    Router_classCallCheck(this, Router);

    this.registeredPathes = {};

    window.onpopstate = function (event) {
      event.preventDefault();

      try {
        _this.registeredPathes[event.state.path].render(event.state.data);
      } catch (err) {
        window.location = window.location.href;
      }
    };

    src_EventBus.on(Events.global.redirect, this.go.bind(this));
    src_EventBus.on(Events.global.goBack, this.back.bind(this));
  }

  Router_createClass(Router, [{
    key: "register",
    value: function register(path, view) {
      this.registeredPathes[path] = view;
    } // запустить роутер

  }, {
    key: "start",
    value: function start(path, data) {
      window.history.pushState({
        path: path,
        data: data || 1
      }, 'Start', path);
      this.registeredPathes[path].render(data);
    }
  }, {
    key: "go",
    value: function go(event) {
      if (event) {
        if (event.path === '/letters') {
          var letterData = {
            folderColumn: true,
            letterColumn: false,
            oneLetterColumn: false
          };
          event.data = letterData;
        }

        this.registeredPathes[event.path].render(event.data || 0);
        window.history.pushState({
          path: event.path,
          data: event.data || 0
        }, event.path, event.path);
      }
    }
  }, {
    key: "back",
    value: function back() {
      window.history.back();
      this.registeredPathes[window.location.pathname].render();
    }
  }]);

  return Router;
}();


// CONCATENATED MODULE: ./src/Views/PugTemplates/SignInForm.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function pug_attr(t, e, n, r) {
  if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
  if (!0 === e) return " " + (r ? t : t + '="' + t + '"');

  var f = _typeof(e);

  return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'";
}

function pug_escape(e) {
  var a = "" + e,
      t = pug_match_html.exec(a);
  if (!t) return e;
  var r,
      c,
      n,
      s = "";

  for (r = t.index, c = 0; r < a.length; r++) {
    switch (a.charCodeAt(r)) {
      case 34:
        n = "&quot;";
        break;

      case 38:
        n = "&amp;";
        break;

      case 60:
        n = "&lt;";
        break;

      case 62:
        n = "&gt;";
        break;

      default:
        continue;
    }

    c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
  }

  return c !== r ? s + a.substring(c, r) : s;
}

var pug_match_html = /["&<>]/;

function pug_rethrow(n, e, r, t) {
  if (!(n instanceof Error)) throw n;
  if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;

  try {
    t = t || __webpack_require__(3).readFileSync(e, "utf8");
  } catch (e) {
    pug_rethrow(n, null, r);
  }

  var i = 3,
      a = t.split("\n"),
      o = Math.max(r - i, 0),
      h = Math.min(a.length, r + i),
      i = a.slice(o, h).map(function (n, e) {
    var t = e + o + 1;
    return (t == r ? "  > " : "    ") + t + "| " + n;
  }).join("\n");
  throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n;
}

function template(locals) {
  var pug_html = "",
      pug_mixins = {},
      pug_interp;
  var pug_debug_filename, pug_debug_line;

  try {
    var pug_debug_sources = {
      "./src/Views/PugTemplates/SignInForm.pug": "section(class=\"s-content site-page\")\n    div(class=\"row\")\n        div(class=\"column large-12\")\n            section\n                div(class=\"s-content__primary\")\n                    h1(class=\"s-content__title\") Вход\n                    form(class=\"s-content__form\")\n                        fieldset\n                            div(class=\"form-field\")\n                                input(name=\"email\" type=\"text\" class=\"h-full-width\" placeholder=\"Email\" value=\"\" autocomplete=\"off\" required)\n                                input(type=\"text\" class=\"h-full-width\" placeholder=\"@mailer.ru.com\" disabled)\n\n                            div(class=\"form-field\")\n                                input(name=\"password\" type=\"password\" class=\"h-full-width\" placeholder=\"Пароль\" value=\"\" autocomplete=\"off\" required)\n\n                            div(class=\"row\")\n                                div(class=\"column large-8\")\n                                    button(type=\"button\" name=\"signup\" class=\"submit btn btn--medium h-full-width\") Зарегистрироваться\n                                div(class=\"column large-4\")\n                                    button(type=\"submit\" name=\"submit\" class=\"submit btn btn--primary btn--medium h-full-width\") Войти\n\n"
    };
    ;
    pug_debug_line = 1;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<section class=\"s-content site-page\">";
    ;
    pug_debug_line = 2;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<div class=\"row\">";
    ;
    pug_debug_line = 3;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<div class=\"column large-12\">";
    ;
    pug_debug_line = 4;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<section>";
    ;
    pug_debug_line = 5;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<div class=\"s-content__primary\">";
    ;
    pug_debug_line = 6;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<h1 class=\"s-content__title\">";
    ;
    pug_debug_line = 6;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "\u0412\u0445\u043E\u0434</h1>";
    ;
    pug_debug_line = 7;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<form class=\"s-content__form\">";
    ;
    pug_debug_line = 8;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<fieldset>";
    ;
    pug_debug_line = 9;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 10;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"email\" type=\"text\" placeholder=\"Email\" value=\"\" autocomplete=\"off\"" + pug_attr("required", true, true, false)) + "/>";
    ;
    pug_debug_line = 11;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " type=\"text\" placeholder=\"@mailer.ru.com\"" + pug_attr("disabled", true, true, false)) + "/></div>";
    ;
    pug_debug_line = 13;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 14;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"password\" type=\"password\" placeholder=\"Пароль\" value=\"\" autocomplete=\"off\"" + pug_attr("required", true, true, false)) + "/></div>";
    ;
    pug_debug_line = 16;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<div class=\"row\">";
    ;
    pug_debug_line = 17;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<div class=\"column large-8\">";
    ;
    pug_debug_line = 18;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<button class=\"submit btn btn--medium h-full-width\" type=\"button\" name=\"signup\">";
    ;
    pug_debug_line = 18;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F</button></div>";
    ;
    pug_debug_line = 19;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<div class=\"column large-4\">";
    ;
    pug_debug_line = 20;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "<button class=\"submit btn btn--primary btn--medium h-full-width\" type=\"submit\" name=\"submit\">";
    ;
    pug_debug_line = 20;
    pug_debug_filename = "./src/Views/PugTemplates/SignInForm.pug";
    pug_html = pug_html + "\u0412\u043E\u0439\u0442\u0438</button></div></div></fieldset></form></div></section></div></div></section>";
  } catch (err) {
    pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
  }

  ;
  return pug_html;
}


// CONCATENATED MODULE: ./src/Views/SignInView.js
function SignInView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SignInView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SignInView_createClass(Constructor, protoProps, staticProps) { if (protoProps) SignInView_defineProperties(Constructor.prototype, protoProps); if (staticProps) SignInView_defineProperties(Constructor, staticProps); return Constructor; }





var SignInView_SignInView = /*#__PURE__*/function () {
  function SignInView(element) {
    SignInView_classCallCheck(this, SignInView);

    this.element = element;
    src_EventBus.on(Events.userModelEvents.signIn.fail, SignInView.showErrors.bind(this));
  }

  SignInView_createClass(SignInView, [{
    key: "render",
    value: function render() {
      this.element.innerHTML = template();
      var form = document.getElementsByTagName('form')[0];
      var signUpButton = document.getElementsByName('signup')[0];
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var formData = new FormData(form);
        src_EventBus.emit(Events.signInViewEvents.submit, {
          target: 'SignInView',
          data: formData
        });
      });
      signUpButton.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.global.redirect, {
          path: Paths.signUpPage
        });
      });
    }
  }, {
    key: "createError",
    value: function createError(input, msgBoxName, text) {
      var msgElem = document.getElementById(msgBoxName);

      if (msgElem) {
        msgElem.innerHTML = text;
      }

      if (!msgElem) {
        var _msgElem = document.createElement('span');

        _msgElem.id = msgBoxName;
        _msgElem.innerHTML = text;
        input.parentNode.appendChild(_msgElem);
      }
    }
  }], [{
    key: "showErrors",
    value: function showErrors(errors) {
      var passwordField = document.getElementsByName('password')[0];
      var emailField = document.getElementsByName('email')[0];

      if (errors.password) {
        this.createError(passwordField, 'passwordError', errors.password);
      }

      if (errors.email) {
        this.createError(emailField, 'emailError', errors.email);
      }
    }
  }]);

  return SignInView;
}();


// CONCATENATED MODULE: ./src/Views/PugTemplates/SignUpForm.js
function SignUpForm_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SignUpForm_typeof = function _typeof(obj) { return typeof obj; }; } else { SignUpForm_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SignUpForm_typeof(obj); }

function SignUpForm_pug_attr(t, e, n, r) {
  if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
  if (!0 === e) return " " + (r ? t : t + '="' + t + '"');

  var f = SignUpForm_typeof(e);

  return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = SignUpForm_pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'";
}

function SignUpForm_pug_escape(e) {
  var a = "" + e,
      t = SignUpForm_pug_match_html.exec(a);
  if (!t) return e;
  var r,
      c,
      n,
      s = "";

  for (r = t.index, c = 0; r < a.length; r++) {
    switch (a.charCodeAt(r)) {
      case 34:
        n = "&quot;";
        break;

      case 38:
        n = "&amp;";
        break;

      case 60:
        n = "&lt;";
        break;

      case 62:
        n = "&gt;";
        break;

      default:
        continue;
    }

    c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
  }

  return c !== r ? s + a.substring(c, r) : s;
}

var SignUpForm_pug_match_html = /["&<>]/;

function SignUpForm_pug_rethrow(n, e, r, t) {
  if (!(n instanceof Error)) throw n;
  if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;

  try {
    t = t || __webpack_require__(3).readFileSync(e, "utf8");
  } catch (e) {
    SignUpForm_pug_rethrow(n, null, r);
  }

  var i = 3,
      a = t.split("\n"),
      o = Math.max(r - i, 0),
      h = Math.min(a.length, r + i),
      i = a.slice(o, h).map(function (n, e) {
    var t = e + o + 1;
    return (t == r ? "  > " : "    ") + t + "| " + n;
  }).join("\n");
  throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n;
}

function SignUpForm_template(locals) {
  var pug_html = "",
      pug_mixins = {},
      pug_interp;
  var pug_debug_filename, pug_debug_line;

  try {
    var pug_debug_sources = {
      "./src/Views/PugTemplates/SignUpForm.pug": "section(class=\"s-content site-page\")\n    div(class=\"row\")\n        div(class=\"column large-12\")\n            section\n                div(class=\"s-content__primary\")\n                    h1(class=\"s-content__title\") \u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F\n                    form(class=\"s-content__form\")\n                        fieldset\n                            div(class=\"form-field\")\n                                input(name=\"email\" type=\"text\" class=\"h-full-width\" placeholder=\"Email\" value=\"\" autocomplete=\"off\" required)\n                                input(type=\"text\" class=\"h-full-width\" placeholder=\"@mailer.ru.com\" disabled)\n\n                            div(class=\"form-field\")\n                                input(name=\"password1\" type=\"password\" class=\"h-full-width\" placeholder=\"\u041F\u0430\u0440\u043E\u043B\u044C\" value=\"\" autocomplete=\"off\" required)\n\n                            div(class=\"form-field\")\n                                input(name=\"password2\" type=\"password\" class=\"h-full-width\" placeholder=\"\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C\" value=\"\" autocomplete=\"off\" required)\n\n                            div(class=\"form-field\")\n                                input(name=\"name\" type=\"text\" class=\"h-full-width\" placeholder=\"\u0418\u043C\u044F\" value=\"\" autocomplete=\"off\" required)\n\n                            div(class=\"form-field\")\n                                input(name=\"surname\" type=\"text\" class=\"h-full-width\" placeholder=\"\u0424\u0430\u043C\u0438\u043B\u044F\" value=\"\" autocomplete=\"off\" required)\n\n                            div(class=\"form-field\")\n                                input(name=\"avatar\" id=\"file\" type=\"file\" class=\"h-full-width\" placeholder=\"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0430\u0432\u0430\u0442\u0430\u0440\" accept=\"image/jpeg, image/png, image/jpg\" value=\"\" autocomplete=\"off\")\n\n                            div(class=\"row\")\n                                div(class=\"column large-4\")\n                                    button(type=\"submit\" name=\"back\" class=\"submit btn btn--medium h-full-width\") \u0412\u043E\u0439\u0442\u0438\n                                div(class=\"column large-8\")\n                                    button(type=\"submit\" name=\"submit\" class=\"submit btn btn--primary btn--medium h-full-width\") \u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F\n"
    };
    ;
    pug_debug_line = 1;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<section class=\"s-content site-page\">";
    ;
    pug_debug_line = 2;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<div class=\"row\">";
    ;
    pug_debug_line = 3;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<div class=\"column large-12\">";
    ;
    pug_debug_line = 4;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<section>";
    ;
    pug_debug_line = 5;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<div class=\"s-content__primary\">";
    ;
    pug_debug_line = 6;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<h1 class=\"s-content__title\">";
    ;
    pug_debug_line = 6;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F</h1>";
    ;
    pug_debug_line = 7;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<form class=\"s-content__form\">";
    ;
    pug_debug_line = 8;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<fieldset>";
    ;
    pug_debug_line = 9;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 10;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"email\" type=\"text\" placeholder=\"Email\" value=\"\" autocomplete=\"off\"" + SignUpForm_pug_attr("required", true, true, false)) + "/>";
    ;
    pug_debug_line = 11;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " type=\"text\" placeholder=\"@mailer.ru.com\"" + SignUpForm_pug_attr("disabled", true, true, false)) + "/></div>";
    ;
    pug_debug_line = 13;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 14;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"password1\" type=\"password\" placeholder=\"Пароль\" value=\"\" autocomplete=\"off\"" + SignUpForm_pug_attr("required", true, true, false)) + "/></div>";
    ;
    pug_debug_line = 16;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 17;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"password2\" type=\"password\" placeholder=\"Повторите пароль\" value=\"\" autocomplete=\"off\"" + SignUpForm_pug_attr("required", true, true, false)) + "/></div>";
    ;
    pug_debug_line = 19;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 20;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"name\" type=\"text\" placeholder=\"Имя\" value=\"\" autocomplete=\"off\"" + SignUpForm_pug_attr("required", true, true, false)) + "/></div>";
    ;
    pug_debug_line = 22;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 23;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"surname\" type=\"text\" placeholder=\"Фамиля\" value=\"\" autocomplete=\"off\"" + SignUpForm_pug_attr("required", true, true, false)) + "/></div>";
    ;
    pug_debug_line = 25;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 26;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<input class=\"h-full-width\" name=\"avatar\" id=\"file\" type=\"file\" placeholder=\"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0430\u0432\u0430\u0442\u0430\u0440\" accept=\"image/jpeg, image/png, image/jpg\" value=\"\" autocomplete=\"off\"/></div>";
    ;
    pug_debug_line = 28;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<div class=\"row\">";
    ;
    pug_debug_line = 29;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<div class=\"column large-4\">";
    ;
    pug_debug_line = 30;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<button class=\"submit btn btn--medium h-full-width\" type=\"submit\" name=\"back\">";
    ;
    pug_debug_line = 30;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "\u0412\u043E\u0439\u0442\u0438</button></div>";
    ;
    pug_debug_line = 31;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<div class=\"column large-8\">";
    ;
    pug_debug_line = 32;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "<button class=\"submit btn btn--primary btn--medium h-full-width\" type=\"submit\" name=\"submit\">";
    ;
    pug_debug_line = 32;
    pug_debug_filename = "./src/Views/PugTemplates/SignUpForm.pug";
    pug_html = pug_html + "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F</button></div></div></fieldset></form></div></section></div></div></section>";
  } catch (err) {
    SignUpForm_pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
  }

  ;
  return pug_html;
}


// CONCATENATED MODULE: ./src/Views/SignUpView.js
function SignUpView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SignUpView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SignUpView_createClass(Constructor, protoProps, staticProps) { if (protoProps) SignUpView_defineProperties(Constructor.prototype, protoProps); if (staticProps) SignUpView_defineProperties(Constructor, staticProps); return Constructor; }





var SignUpView_SignUpView = /*#__PURE__*/function () {
  function SignUpView(element) {
    SignUpView_classCallCheck(this, SignUpView);

    this.element = element;
    src_EventBus.on(Events.userModelEvents.signUp.fail, SignUpView.showErrors.bind(this));
  }

  SignUpView_createClass(SignUpView, [{
    key: "render",
    value: function render() {
      this.element.innerHTML = SignUpForm_template();
      var form = document.getElementsByTagName('form')[0];
      var backButton = document.getElementsByName('back')[0];
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.signUpViewEvents.submit, {
          target: 'SignUpView',
          data: new FormData(form)
        });
      });
      backButton.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.global.redirect, {
          path: Paths.signInPage
        });
      });
    }
  }], [{
    key: "showErrors",
    value: function showErrors(errors) {
      SignUpView.clearErrors();
      var emailField = document.getElementsByName('email')[0];
      var passwordField1 = document.getElementsByName('password1')[0];
      var passwordField2 = document.getElementsByName('password2')[0];
      var nameField = document.getElementsByName('name')[0];
      var surnameField = document.getElementsByName('surname')[0];

      if (errors.password1) {
        SignUpView.createError(passwordField1, 'passwordField1Error', errors.password1);
      } else if (errors.password2) {
        SignUpView.createError(passwordField2, 'passwordField2Error', errors.password2);
      }

      if (errors.email) {
        SignUpView.createError(emailField, 'emailError', errors.email);
      }

      if (errors.name) {
        SignUpView.createError(nameField, 'nameError', errors.name);
      }

      if (errors.surname) {
        SignUpView.createError(surnameField, 'surnameError', errors.surname);
      }
    }
  }, {
    key: "createError",
    value: function createError(input, msgBoxName, text) {
      var msgElem = document.getElementById(msgBoxName);

      if (msgElem) {
        msgElem.innerHTML = text;
      }

      if (!msgElem) {
        var _msgElem = document.createElement('label');

        _msgElem.id = msgBoxName;
        _msgElem.innerHTML = text;
        input.parentNode.before(_msgElem);
      }
    }
  }, {
    key: "clearErrors",
    value: function clearErrors() {
      var names = ['passwordField1Error', 'passwordField2Error', 'emailError', 'nameError', 'surnameError'];
      names.forEach(function (el) {
        var msgElem = document.getElementById(el);

        if (msgElem) {
          msgElem.innerHTML = '';
        }
      });
    }
  }]);

  return SignUpView;
}();


// CONCATENATED MODULE: ./src/Models/Validator.js
function Validator_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Validator_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Validator_createClass(Constructor, protoProps, staticProps) { if (protoProps) Validator_defineProperties(Constructor.prototype, protoProps); if (staticProps) Validator_defineProperties(Constructor, staticProps); return Constructor; }

var Validator = /*#__PURE__*/function () {
  function Validator() {
    Validator_classCallCheck(this, Validator);
  }

  Validator_createClass(Validator, null, [{
    key: "_checkEmail",
    // static _checkEmail(email) {
    //   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   return re.test(email);
    // }
    value: function _checkEmail(email) {
      var re = /[0-9a-z]+/i;
      return re.test(email);
    }
  }, {
    key: "_checkName",
    value: function _checkName(name) {
      var re = /[0-9a-zа-я]+/i;
      return re.test(name);
    }
  }, {
    key: "_checkSurname",
    value: function _checkSurname(surname) {
      var re = /[0-9a-zа-я]+/i;
      return re.test(surname);
    }
  }, {
    key: "_checkPassword",
    value: function _checkPassword(pass) {
      return pass.length > 3;
    }
  }, {
    key: "_checkPasswordEqual",
    value: function _checkPasswordEqual(pass1, pass2) {
      return pass1 === pass2;
    }
    /**
       * check that data in signInFrom is valid
       * @param {FormData} formData
       * @return {errors} in format {email:'errorDescription', password: 'errorDescription'}
       */

  }, {
    key: "checkSignInForm",
    value: function checkSignInForm(formData) {
      var errors = {};

      if (!Validator._checkEmail(formData.get('email'))) {
        errors.email = 'Некорректный email';
      }

      if (!Validator._checkPassword(formData.get('password'))) {
        errors.password = 'слишком короткий пароль';
      }

      return errors;
    }
  }, {
    key: "checkSignUpForm",
    value: function checkSignUpForm(formData) {
      var errors = {};

      if (!Validator._checkEmail(formData.get('email'))) {
        errors.email = 'Некорректный email';
      }

      if (!Validator._checkPassword(formData.get('password1'))) {
        errors.password1 = 'слишком короткий пароль';
      } else if (!Validator._checkPasswordEqual(formData.get('password1'), formData.get('password2'))) {
        errors.password2 = 'Пароли не совпадают';
      }

      if (!Validator._checkName(formData.get('name'))) {
        errors.name = 'Некорректное имя';
      }

      if (!Validator._checkSurname(formData.get('surname'))) {
        errors.surname = 'Некорректная фамилия';
      }

      return errors;
    }
  }, {
    key: "checkLetterForm",
    value: function checkLetterForm(formData) {
      var errors = {};

      if (!Validator._checkEmail(formData.get('to'))) {
        errors.to = 'Некорректный email получателя';
      }

      if (!Validator._checkName(formData.get('theme'))) {
        errors.theme = 'Не корректная тема сообщения';
      }

      if (!Validator._checkName(formData.get('text'))) {
        errors.text = 'Не корректная текст сообщения';
      }

      return errors;
    }
  }]);

  return Validator;
}();


// CONCATENATED MODULE: ./src/Models/myFetch.js

function myFetch(url, method, body) {
  var token = document.cookie.match(/token=([\w-]+)/);

  if (token === null) {
    token = '';
  } else {
    token = String(token[0] || token[1]);
    token = token.replace('token=', '');
  }

  return fetch(Paths.baseUrl + url, {
    method: method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      csrf_token: token
    },
    body: body
  });
}
// CONCATENATED MODULE: ./src/Models/UserModel.js
function UserModel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function UserModel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function UserModel_createClass(Constructor, protoProps, staticProps) { if (protoProps) UserModel_defineProperties(Constructor.prototype, protoProps); if (staticProps) UserModel_defineProperties(Constructor, staticProps); return Constructor; }






var UserModel_UserModel = /*#__PURE__*/function () {
  function UserModel(url) {
    UserModel_classCallCheck(this, UserModel);

    this.baseUrl = url;
    this.user = {};
    src_EventBus.on(Events.signInViewEvents.submit, this.signIn.bind(this));
    src_EventBus.on(Events.signUpViewEvents.submit, this.signUp.bind(this));
    src_EventBus.on(Events.profileEditViewEvents.submit, this.editUser.bind(this));
    src_EventBus.on(Events.profileViewEvents.needUserData, this.getUserData.bind(this));
    src_EventBus.on(Events.global.logout, this.logout.bind(this));
  }

  UserModel_createClass(UserModel, [{
    key: "setUrl",
    value: function setUrl(url) {
      this.baseUrl = url;
    }
  }, {
    key: "signIn",
    value: function signIn(data) {
      var _this = this;

      var errors = Validator.checkSignInForm(data.data);

      if (Object.keys(errors).length !== 0) {
        src_EventBus.emit(Events.userModelEvents.signIn.fail, errors);
        return;
      }

      var shortLogin = data.data.get('email');
      shortLogin += '@mailer.ru.com';
      data.data.set('email', shortLogin);
      myFetch(Paths.signInServ, 'POST', data.data).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          var h = function h() {
            src_EventBus.off(Events.userModelEvents.profileGetData.success, h);
            src_EventBus.emit(Events.userModelEvents.signIn.success);
          };

          src_EventBus.on(Events.userModelEvents.profileGetData.success, h);

          _this.getUserData();
        } else if (response.Code === 401) {
          src_EventBus.emit(Events.userModelEvents.signIn.fail, {
            password: response.Description
          });
        } else if (response.Code === 404) {
          src_EventBus.emit(Events.userModelEvents.signIn.fail, {
            email: response.Description
          });
        } else {
          src_EventBus.emit(Events.userModelEvents.signIn.fail, {
            unknowError: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
      });
    }
  }, {
    key: "signUp",
    value: function signUp(data) {
      var _this2 = this;

      var errors = Validator.checkSignUpForm(data.data);

      if (Object.keys(errors).length !== 0) {
        src_EventBus.emit(Events.userModelEvents.signUp.fail, errors);
        return;
      }

      var shortEmail = data.data.get('email');
      shortEmail += '@mailer.ru.com';
      data.data.set('email', shortEmail);
      myFetch(Paths.signUpServ, 'POST', data.data).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          var h = function h() {
            src_EventBus.off(Events.userModelEvents.profileGetData.success, h);
            src_EventBus.emit(Events.userModelEvents.signUp.success);
          };

          src_EventBus.on(Events.userModelEvents.profileGetData.success, h);

          _this2.getUserData();
        } else {
          src_EventBus.emit(Events.userModelEvents.signUp.fail, {
            email: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
      });
    }
  }, {
    key: "editUser",
    value: function editUser(data) {
      var _this3 = this;

      var name = data.data.get('profile_firstName');

      if (name === '') {
        data.data.set('profile_firstName', data.tmpData.name);
      }

      var surname = data.data.get('profile_lastName');

      if (surname === '') {
        data.data.set('profile_lastName', data.tmpData.name);
      }

      var avatar = data.data.get('avatar');

      if (avatar.name === '') {
        data.data["delete"]('avatar');
      }

      myFetch(Paths.editUserServ, 'PUT', data.data).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          _this3.getUserData(Events.userModelEvents.profileEdit);

          var h1 = function h1() {
            src_EventBus.off(Events.userModelEvents.profileGetData.success, h1);
            src_EventBus.emit(Events.userModelEvents.profileEdit.success);
          };

          src_EventBus.on(Events.userModelEvents.profileGetData.success, h1);
        } else {
          src_EventBus.emit(Events.userModelEvents.profileEdit.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
      });
    }
  }, {
    key: "getUserData",
    value: function getUserData() {
      var _this4 = this;

      var p1 = myFetch(Paths.getUserData, 'GET').then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          _this4.user.name = response.User.Name;
          _this4.user.email = response.User.Email;
          _this4.user.surname = response.User.Surname;
          _this4.user.avatar = '';
        } else {
          throw new Error(response.Description);
        }
      });
      var p2 = myFetch(Paths.getAvatar, 'GET').then(function (response) {
        return response.blob();
      }).then(function (myBlob) {
        _this4.user.avatar = URL.createObjectURL(myBlob);
      }); // function p2() {
      //   console.log('Мок аватарки');
      // }

      Promise.all([p1, p2]).then(function () {
        src_EventBus.emit(Events.userModelEvents.profileGetData.success, _this4.user);
      }, function (error) {
        src_EventBus.emit(Events.userModelEvents.profileGetData.fail, {
          errors: error.message
        });
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      src_EventBus.emit(Events.global.redirect, {
        path: Paths.signInPage
      });
      this.user = {};
      myFetch(Paths.logoutServ, 'DELETE');
    }
  }]);

  return UserModel;
}();

/* harmony default export */ var Models_UserModel = (new UserModel_UserModel('http://localhost:8080'));
// CONCATENATED MODULE: ./src/Models/LetterModel.js
function LetterModel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function LetterModel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function LetterModel_createClass(Constructor, protoProps, staticProps) { if (protoProps) LetterModel_defineProperties(Constructor.prototype, protoProps); if (staticProps) LetterModel_defineProperties(Constructor, staticProps); return Constructor; }






var LetterModel_LetterModel = /*#__PURE__*/function () {
  function LetterModel() {
    LetterModel_classCallCheck(this, LetterModel);

    this.Letters = new Map();
    this.folders = {};
    src_EventBus.on(Events.mainPageController.needGetLetter, this.getLetter.bind(this));
    src_EventBus.on(Events.mainPageController.needGetLetterList, this.getLetterList.bind(this));
    src_EventBus.on(Events.mainPageController.needGetFolderList, LetterModel.getFolders.bind(this));
    src_EventBus.on(Events.sendLetterView.sendLetter, LetterModel.sendLetter.bind(this));
    src_EventBus.on(Events.global.logout, this.logout.bind(this));
    src_EventBus.on(Events.mainPageController.recivedFolder, this.recivedFolder.bind(this));
    src_EventBus.on(Events.mainPageController.sendedFolder, this.sendedFolder.bind(this));
    src_EventBus.on(Events.mainPageController.selectFolder, this.selectFolder.bind(this));
    src_EventBus.on(Events.mainPageController.recivedUn, this.recivedUn.bind(this));
    src_EventBus.on(Events.mainPageController.sendedUn, this.sendedUn.bind(this));
    src_EventBus.on(Events.mainPageController.addFolderRecived, this.addFolderRecived.bind(this));
    src_EventBus.on(Events.mainPageController.addFolderSended, this.addFolderSended.bind(this));
    src_EventBus.on(Events.mainPageController.sendWrittenLetter, this.sendWrittenLetter.bind(this));
    src_EventBus.on(Events.mainPageController.inFolder, this.inFolder.bind(this));
    src_EventBus.on(Events.mainPageController.renameFolder, this.renameFolder.bind(this));
    src_EventBus.on(Events.mainPageController.deleteFolder, this.deleteFolder.bind(this));
    src_EventBus.on(Events.mainPageController.deleteLetter, this.deleteLetter.bind(this));
    src_EventBus.on(Events.mainPageController.startSearch, this.startSearch.bind(this));
    src_EventBus.on(Events.mainPageController.resultSearch, this.resultSearch.bind(this));
  }

  LetterModel_createClass(LetterModel, [{
    key: "getLetter",
    value: function getLetter(letterId) {
      src_EventBus.emit(Events.letterModelEvents.getLetter.success, this.Letters[letterId]);
    }
  }, {
    key: "getLetterList",
    value: function getLetterList(folder) {
      var _this = this;

      var path = '';

      if (folder === 'Входящие') {
        path = Paths.getReceivedLetters;
      } else {
        path = Paths.getSendedLetters;
      }

      myFetch(path, 'GET').then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          _this.Letters = new Map();

          if (response.Letters) {
            response.Letters.reverse();
            response.Letters.forEach(function (letter) {
              _this.Letters[letter.Id] = letter;
            });
          }

          src_EventBus.emit(Events.letterModelEvents.getLetterList.success, _this.Letters);
        } else {
          src_EventBus.emit(Events.letterModelEvents.getLetterList.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('Fetch error', error);
        src_EventBus.emit(Events.letterModelEvents.getLetterList.fail, {
          error: error
        });
      });
    }
  }, {
    key: "recivedFolder",
    value: function recivedFolder() {
      var _this2 = this;

      myFetch(Paths.getRecivedFolder, 'GET').then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          _this2.recivedFolders = new Map();

          if (response.Folders) {
            response.Folders.forEach(function (folder) {
              _this2.recivedFolders[folder.Name] = folder;
            });
          }

          src_EventBus.emit(Events.letterModelEvents.recivedFolder.success, _this2.recivedFolders);
        } else {
          src_EventBus.emit(Events.letterModelEvents.recivedFolder.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        src_EventBus.emit(Events.letterModelEvents.recivedFolder.fail, {
          error: error
        });
      });
    }
  }, {
    key: "sendedFolder",
    value: function sendedFolder() {
      var _this3 = this;

      myFetch(Paths.getSendedFolder, 'GET').then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          _this3.sendedFolders = new Map();

          if (response.Folders) {
            response.Folders.forEach(function (folder) {
              _this3.sendedFolders[folder.Name] = folder;
            });
          }

          src_EventBus.emit(Events.letterModelEvents.sendedFolder.success, _this3.sendedFolders);
        } else {
          src_EventBus.emit(Events.letterModelEvents.sendedFolder.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        src_EventBus.emit(Events.letterModelEvents.sendedFolder.fail, {
          error: error
        });
      });
    }
  }, {
    key: "selectFolder",
    value: function selectFolder(folder, type) {
      var _this4 = this;

      myFetch(Paths.getSelectFolder + '/' + type + '/' + folder, 'GET').then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          _this4.selectFolder = new Map();

          if (response.Letter) {
            response.Letter = response.Letter.reverse();
            response.Letter.forEach(function (letter) {
              _this4.selectFolder[letter.Id] = letter;
            });
          }

          src_EventBus.emit(Events.letterModelEvents.selectFolder.success, _this4.selectFolder);
        } else {
          src_EventBus.emit(Events.letterModelEvents.selectFolder.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        src_EventBus.emit(Events.letterModelEvents.selectFolder.fail, {
          error: error
        });
      });
    }
  }, {
    key: "recivedUn",
    value: function recivedUn() {
      var _this5 = this;

      myFetch(Paths.getReceivedLetters, 'GET').then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          _this5.selectFolder = new Map();

          if (response.Letters) {
            response.Letters = response.Letters.reverse();
            response.Letters.forEach(function (letter) {
              _this5.selectFolder[letter.Id] = letter;
            });
          }

          src_EventBus.emit(Events.letterModelEvents.recivedUn.success, _this5.selectFolder);
        } else {
          src_EventBus.emit(Events.letterModelEvents.recivedUn.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        src_EventBus.emit(Events.letterModelEvents.recivedUn.fail, {
          error: error
        });
      });
    }
  }, {
    key: "sendedUn",
    value: function sendedUn() {
      var _this6 = this;

      myFetch(Paths.getSendedLetters, 'GET').then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          _this6.selectFolder = new Map();

          if (response.Letters) {
            var letters = response.Letters.reverse();
            response.Letters.forEach(function (letter) {
              _this6.selectFolder[letter.Id] = letter;
            });
          }

          src_EventBus.emit(Events.letterModelEvents.sendedUn.success, _this6.selectFolder);
        } else {
          src_EventBus.emit(Events.letterModelEvents.sendedUn.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        src_EventBus.emit(Events.letterModelEvents.sendedUn.fail, {
          error: error
        });
      });
    }
  }, {
    key: "addFolderRecived",
    value: function addFolderRecived(name) {
      myFetch(Paths.addFolderRecived, 'POST', name).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          src_EventBus.emit(Events.letterModelEvents.addFolderRecived.success);
        } else {
          src_EventBus.emit(Events.letterModelEvents.addFolderRecived.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('Fetch error', error);
      });
    }
  }, {
    key: "addFolderSended",
    value: function addFolderSended(name) {
      myFetch(Paths.addFolderSended, 'POST', name).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          src_EventBus.emit(Events.letterModelEvents.addFolderSended.success);
        } else {
          src_EventBus.emit(Events.letterModelEvents.addFolderSended.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('Fetch error', error);
      });
    }
  }, {
    key: "sendWrittenLetter",
    value: function sendWrittenLetter(letterId) {
      myFetch(Paths.sendWrittenLetter, 'PUT', letterId).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          src_EventBus.emit(Events.letterModelEvents.sendWrittenLetter.success);
        } else {
          src_EventBus.emit(Events.letterModelEvents.sendWrittenLetter.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('Fetch error', error);
      });
    }
  }, {
    key: "inFolder",
    value: function inFolder(method, folder, type) {
      myFetch(Paths.inFolder + type + '/folderName/letter', method, folder).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          src_EventBus.emit(Events.letterModelEvents.sendWrittenLetter.success);
        } else {
          src_EventBus.emit(Events.letterModelEvents.sendWrittenLetter.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('Fetch error', error);
      });
    }
  }, {
    key: "renameFolder",
    value: function renameFolder(newName) {
      myFetch(Paths.renameFolder, 'PUT', newName).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          src_EventBus.emit(Events.letterModelEvents.renameFolder.success);
        } else {
          src_EventBus.emit(Events.letterModelEvents.renameFolder.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('Fetch error', error);
      });
    }
  }, {
    key: "deleteFolder",
    value: function deleteFolder(deleteName) {
      myFetch(Paths.deleteFolder, 'DELETE', deleteName).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          src_EventBus.emit(Events.letterModelEvents.deleteFolder.success);
        } else {
          src_EventBus.emit(Events.letterModelEvents.deleteFolder.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('Fetch error', error);
      });
    }
  }, {
    key: "deleteLetter",
    value: function deleteLetter(deleteName) {
      myFetch(Paths.deleteLetter, 'DELETE', deleteName).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          src_EventBus.emit(Events.letterModelEvents.deleteLetter.success);
        } else {
          src_EventBus.emit(Events.letterModelEvents.deleteLetter.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('Fetch error', error);
      });
    }
  }, {
    key: "startSearch",
    value: function startSearch(similar) {
      var _this7 = this;

      myFetch(Paths.startSearch + similar, 'GET').then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response) {
          _this7.searchResult = {};
          _this7.searchResult.res = true;
          _this7.searchResult.is = true;

          if (response.Senders) {
            _this7.searchResult.Senders = response.Senders;
          }

          if (response.Receivers) {
            _this7.searchResult.Receivers = response.Receivers;
          }

          if (response.Themes) {
            _this7.searchResult.Receivers = response.Themes;
          }

          if (response.Texts) {
            _this7.searchResult.Receivers = response.Texts;
          }

          if (!response.Senders && !response.Receivers && !response.Themes && !response.Texts) {
            _this7.searchResult.is = false;
          }

          src_EventBus.emit(Events.letterModelEvents.startSearch.success, _this7.searchResult);
        } else {
          src_EventBus.emit(Events.letterModelEvents.sendedUn.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        src_EventBus.emit(Events.letterModelEvents.sendedUn.fail, {
          error: error
        });
      });
    }
  }, {
    key: "resultSearch",
    value: function resultSearch(what, value) {
      myFetch(Paths.resultSearch + what + '/' + value, 'GET').then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response) {
          console.log(response); //обратка результата запроса
          // globalEventBus.emit(Events.letterModelEvents.startSearch.success, this.searchResult);
        } else {
          src_EventBus.emit(Events.letterModelEvents.sendedUn.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        src_EventBus.emit(Events.letterModelEvents.sendedUn.fail, {
          error: error
        });
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      this.Letters = new Map();
      this.folders = {};
    }
  }], [{
    key: "sendLetter",
    value: function sendLetter(data) {
      var errors = Validator.checkLetterForm(data);

      if (Object.keys(errors).length !== 0) {
        src_EventBus.emit(Events.letterModelEvents.sendLetter.fail, errors);
        return;
      }

      myFetch(Paths.sendMessageToServ, 'POST', data).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.Code === 200) {
          src_EventBus.emit(Events.letterModelEvents.sendLetter.success);
        } else {
          src_EventBus.emit(Events.letterModelEvents.sendLetter.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('Fetch error', error);
      });
    }
  }, {
    key: "getFolders",
    value: function getFolders() {
      // Пока адекватной работы с папками нет, поэтому тут и такая кривоватая заглушка
      src_EventBus.emit(Events.letterModelEvents.getFolderList.success, ['Входящие', 'Исходящие']);
    }
  }]);

  return LetterModel;
}();


// CONCATENATED MODULE: ./src/Views/PugTemplates/ProfilePage.js
function ProfilePage_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ProfilePage_typeof = function _typeof(obj) { return typeof obj; }; } else { ProfilePage_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ProfilePage_typeof(obj); }

function ProfilePage_pug_attr(t, e, n, r) {
  if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
  if (!0 === e) return " " + (r ? t : t + '="' + t + '"');

  var f = ProfilePage_typeof(e);

  return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = ProfilePage_pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'";
}

function ProfilePage_pug_escape(e) {
  var a = "" + e,
      t = ProfilePage_pug_match_html.exec(a);
  if (!t) return e;
  var r,
      c,
      n,
      s = "";

  for (r = t.index, c = 0; r < a.length; r++) {
    switch (a.charCodeAt(r)) {
      case 34:
        n = "&quot;";
        break;

      case 38:
        n = "&amp;";
        break;

      case 60:
        n = "&lt;";
        break;

      case 62:
        n = "&gt;";
        break;

      default:
        continue;
    }

    c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
  }

  return c !== r ? s + a.substring(c, r) : s;
}

var pug_has_own_property = Object.prototype.hasOwnProperty;
var ProfilePage_pug_match_html = /["&<>]/;

function ProfilePage_pug_rethrow(n, e, r, t) {
  if (!(n instanceof Error)) throw n;
  if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;

  try {
    t = t || __webpack_require__(3).readFileSync(e, "utf8");
  } catch (e) {
    ProfilePage_pug_rethrow(n, null, r);
  }

  var i = 3,
      a = t.split("\n"),
      o = Math.max(r - i, 0),
      h = Math.min(a.length, r + i),
      i = a.slice(o, h).map(function (n, e) {
    var t = e + o + 1;
    return (t == r ? "  > " : "    ") + t + "| " + n;
  }).join("\n");
  throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n;
}

function pug_style(r) {
  if (!r) return "";

  if ("object" == ProfilePage_typeof(r)) {
    var t = "";

    for (var e in r) {
      pug_has_own_property.call(r, e) && (t = t + e + ":" + r[e] + ";");
    }

    return t;
  }

  return r + "";
}

function ProfilePage_template(locals) {
  var pug_html = "",
      pug_mixins = {},
      pug_interp;
  var pug_debug_filename, pug_debug_line;

  try {
    var pug_debug_sources = {
      "./src/Views/PugTemplates/ProfilePage.pug": "- var avatarUrl = \"background: url(\" + locals.avatar + \") no-repeat center center; background-size: cover; height: 310px;\"\n\nsection(class=\"s-content__primary site-page\")\n    div(class=\"row\")\n        div(class=\"column large-12 tab-12\")\n            h2 Профиль\n\n    div(class=\"row\")\n        div(class=\"column large-6 tab-12\")\n            h3 Аватар\n            div(style=avatarUrl)\n            div(class=\"empty-space\")\n\n        div(class=\"column large-6 tab-12\")\n            h3 Имя\n            div(class=\"form-field\")\n                p #{locals.name}\n            h3 Фамилия\n            div(class=\"form-field\")\n                p #{locals.surname}\n            h3 Email\n            div(class=\"form-field\")\n                p #{locals.email}\n\n    div(class=\"row\")\n        div(class=\"column large-6\")\n            button(name=\"back\" class=\"submit btn btn--medium h-full-width\") Назад\n\n        div(class=\"column large-6\")\n            button(name=\"editButton\" class=\"submit btn btn--primary btn--medium h-full-width\") Редактировать\n\n"
    };
    ;
    pug_debug_line = 1;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    var avatarUrl = "background: url(" + locals.avatar + ") no-repeat center center; background-size: cover; height: 310px;";
    pug_debug_line = 3;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<section class=\"s-content__primary site-page\">";
    ;
    pug_debug_line = 4;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<div class=\"row\">";
    ;
    pug_debug_line = 5;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<div class=\"column large-12 tab-12\">";
    ;
    pug_debug_line = 6;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<h2>";
    ;
    pug_debug_line = 6;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "\u041F\u0440\u043E\u0444\u0438\u043B\u044C</h2></div></div>";
    ;
    pug_debug_line = 8;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<div class=\"row\">";
    ;
    pug_debug_line = 9;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<div class=\"column large-6 tab-12\">";
    ;
    pug_debug_line = 10;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<h3>";
    ;
    pug_debug_line = 10;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "\u0410\u0432\u0430\u0442\u0430\u0440</h3>";
    ;
    pug_debug_line = 11;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<div" + ProfilePage_pug_attr("style", pug_style(avatarUrl), true, false) + "></div>";
    ;
    pug_debug_line = 12;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<div class=\"empty-space\"></div></div>";
    ;
    pug_debug_line = 14;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<div class=\"column large-6 tab-12\">";
    ;
    pug_debug_line = 15;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<h3>";
    ;
    pug_debug_line = 15;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "\u0418\u043C\u044F</h3>";
    ;
    pug_debug_line = 16;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 17;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<p>";
    ;
    pug_debug_line = 17;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + ProfilePage_pug_escape(null == (pug_interp = locals.name) ? "" : pug_interp) + "</p></div>";
    ;
    pug_debug_line = 18;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<h3>";
    ;
    pug_debug_line = 18;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "\u0424\u0430\u043C\u0438\u043B\u0438\u044F</h3>";
    ;
    pug_debug_line = 19;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 20;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<p>";
    ;
    pug_debug_line = 20;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + ProfilePage_pug_escape(null == (pug_interp = locals.surname) ? "" : pug_interp) + "</p></div>";
    ;
    pug_debug_line = 21;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<h3>";
    ;
    pug_debug_line = 21;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "Email</h3>";
    ;
    pug_debug_line = 22;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 23;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<p>";
    ;
    pug_debug_line = 23;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + ProfilePage_pug_escape(null == (pug_interp = locals.email) ? "" : pug_interp) + "</p></div></div></div>";
    ;
    pug_debug_line = 25;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<div class=\"row\">";
    ;
    pug_debug_line = 26;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<div class=\"column large-6\">";
    ;
    pug_debug_line = 27;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<button class=\"submit btn btn--medium h-full-width\" name=\"back\">";
    ;
    pug_debug_line = 27;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "\u041D\u0430\u0437\u0430\u0434</button></div>";
    ;
    pug_debug_line = 29;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<div class=\"column large-6\">";
    ;
    pug_debug_line = 30;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "<button class=\"submit btn btn--primary btn--medium h-full-width\" name=\"editButton\">";
    ;
    pug_debug_line = 30;
    pug_debug_filename = "./src/Views/PugTemplates/ProfilePage.pug";
    pug_html = pug_html + "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button></div></div></section>";
  } catch (err) {
    ProfilePage_pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
  }

  ;
  return pug_html;
}


// CONCATENATED MODULE: ./src/Views/PugTemplates/BaseComponents/navbar.js
function navbar_pug_rethrow(n, e, r, t) {
  if (!(n instanceof Error)) throw n;
  if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;

  try {
    t = t || __webpack_require__(3).readFileSync(e, "utf8");
  } catch (e) {
    navbar_pug_rethrow(n, null, r);
  }

  var i = 3,
      a = t.split("\n"),
      o = Math.max(r - i, 0),
      h = Math.min(a.length, r + i),
      i = a.slice(o, h).map(function (n, e) {
    var t = e + o + 1;
    return (t == r ? "  > " : "    ") + t + "| " + n;
  }).join("\n");
  throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n;
}

function navbar_template(locals) {
  var pug_html = "",
      pug_mixins = {},
      pug_interp;
  var pug_debug_filename, pug_debug_line;

  try {
    var pug_debug_sources = {
      "./src/Views/PugTemplates/BaseComponents/navbar.pug": "header(class=\"s-header\")\n    div(class=\"row s-header__content\")\n        nav(class=\"s-header__nav-wrap\")\n            h2(class=\"s-header__nav-heading h6\") Навигация\n\n            ul(class=\"s-header__nav\")\n                li\n                    a(name=\"navbar-letters\") Письма\n                li\n                    a(name=\"navbar-send\") Написать\n                li\n                    a(name=\"navbar-profile\") Профиль\n                li\n                    a(name=\"navbar-exit\") Выйти\n\n                a(title=\"Close Menu\" class=\"s-header__overlay-close close-mobile-menu\") Выйти\n\n        a(class=\"s-header__toggle-menu\" title=\"Menu\")\n            span Навигация\n"
    };
    ;
    pug_debug_line = 1;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<header class=\"s-header\">";
    ;
    pug_debug_line = 2;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<div class=\"row s-header__content\">";
    ;
    pug_debug_line = 3;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<nav class=\"s-header__nav-wrap\">";
    ;
    pug_debug_line = 4;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<h2 class=\"s-header__nav-heading h6\">";
    ;
    pug_debug_line = 4;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F</h2>";
    ;
    pug_debug_line = 6;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<ul class=\"s-header__nav\">";
    ;
    pug_debug_line = 7;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<li>";
    ;
    pug_debug_line = 8;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<a name=\"navbar-letters\">";
    ;
    pug_debug_line = 8;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "\u041F\u0438\u0441\u044C\u043C\u0430</a></li>";
    ;
    pug_debug_line = 9;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<li>";
    ;
    pug_debug_line = 10;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<a name=\"navbar-send\">";
    ;
    pug_debug_line = 10;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C</a></li>";
    ;
    pug_debug_line = 11;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<li>";
    ;
    pug_debug_line = 12;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<a name=\"navbar-profile\">";
    ;
    pug_debug_line = 12;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "\u041F\u0440\u043E\u0444\u0438\u043B\u044C</a></li>";
    ;
    pug_debug_line = 13;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<li>";
    ;
    pug_debug_line = 14;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<a name=\"navbar-exit\">";
    ;
    pug_debug_line = 14;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "\u0412\u044B\u0439\u0442\u0438</a></li>";
    ;
    pug_debug_line = 16;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<a class=\"s-header__overlay-close close-mobile-menu\" title=\"Close Menu\">";
    ;
    pug_debug_line = 16;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "\u0412\u044B\u0439\u0442\u0438</a></ul></nav>";
    ;
    pug_debug_line = 18;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<a class=\"s-header__toggle-menu\" title=\"Menu\">";
    ;
    pug_debug_line = 19;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "<span>";
    ;
    pug_debug_line = 19;
    pug_debug_filename = "./src/Views/PugTemplates/BaseComponents/navbar.pug";
    pug_html = pug_html + "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F</span></a></div></header>";
  } catch (err) {
    navbar_pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
  }

  ;
  return pug_html;
}


// CONCATENATED MODULE: ./src/Views/NavbarView.js
function NavbarView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function NavbarView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function NavbarView_createClass(Constructor, protoProps, staticProps) { if (protoProps) NavbarView_defineProperties(Constructor.prototype, protoProps); if (staticProps) NavbarView_defineProperties(Constructor, staticProps); return Constructor; }





var NavbarView_NavbarView = /*#__PURE__*/function () {
  function NavbarView() {
    NavbarView_classCallCheck(this, NavbarView);

    this.element = document.body;
  }

  NavbarView_createClass(NavbarView, [{
    key: "render",
    value: function render(data) {
      if (!data) {
        src_EventBus.emit(Events.navbarView.needData);
        return;
      }

      this.element.innerHTML = '';
      var navDiv = document.getElementById('navbar') || document.createElement('div');
      navDiv.id = 'navbar';
      navDiv.innerHTML = navbar_template(data);
      this.element.insertAdjacentHTML('beforeend', navDiv.innerHTML);
      var sendLetterHref = document.getElementsByName('navbar-send')[0];
      var profileHref = document.getElementsByName('navbar-profile')[0];
      var logoutHref = document.getElementsByName('navbar-exit')[0];
      var lettersHref = document.getElementsByName('navbar-letters')[0];
      sendLetterHref.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.global.redirect, {
          path: Paths.sendLetterPage
        });
      });
      profileHref.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.global.redirect, {
          path: Paths.profilePage
        });
      });
      logoutHref.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.global.logout);
      });
      lettersHref.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.global.redirect, {
          path: Paths.mainPage
        });
      });
      var navWrap = document.querySelector('.s-header__nav-wrap');
      var menuToggle = document.querySelector('.s-header__toggle-menu');
      var siteBody = document.querySelector('body');
      var closeNavWrap = navWrap.querySelector('.s-header__overlay-close');
      menuToggle.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        siteBody.classList.add('nav-wrap-is-visible');
      });
      closeNavWrap.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (siteBody.classList.contains('nav-wrap-is-visible')) {
          siteBody.classList.remove('nav-wrap-is-visible');
        }
      });
    }
  }], [{
    key: "hide",
    value: function hide() {
      document.getElementById('navbar').innerHTML = '';
    }
  }]);

  return NavbarView;
}();

/* harmony default export */ var Views_NavbarView = (new NavbarView_NavbarView());
// CONCATENATED MODULE: ./src/Views/ProfileView.js
function ProfileView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ProfileView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ProfileView_createClass(Constructor, protoProps, staticProps) { if (protoProps) ProfileView_defineProperties(Constructor.prototype, protoProps); if (staticProps) ProfileView_defineProperties(Constructor, staticProps); return Constructor; }






var ProfileView_ProfileView = /*#__PURE__*/function () {
  function ProfileView(element) {
    ProfileView_classCallCheck(this, ProfileView);

    this.element = element; // globalEventBus.on(Events.userModelEvents.profileGetData.success, this.render.bind(this));
    // globalEventBus.on(Events.userModelEvents.profileGetData.fail, this.showErrors.bind(this));
  }
  /**
     * Creates form with profile.css-related data and returns it as an objct
     * @param {string} data - profile.css data in JSON format
     */


  ProfileView_createClass(ProfileView, [{
    key: "render",
    value: function render(data) {
      if (!data) {
        src_EventBus.emit(Events.profileViewEvents.needUserData);
        return;
      }

      this.element.innerHTM = '';
      Views_NavbarView.render();
      this.element.insertAdjacentHTML('beforeend', ProfilePage_template(data));
      var edit = document.getElementsByName('editButton')[0];
      var backButton = document.getElementsByName('back')[0];
      edit.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.global.redirect, {
          path: Paths.profileEditPage,
          data: data
        });
      });
      backButton.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.global.goBack);
      });
    }
  }], [{
    key: "showErrors",
    value: function showErrors(errors) {
      console.log('SHow Errors', errors);
    }
  }]);

  return ProfileView;
}();


// CONCATENATED MODULE: ./src/Views/PugTemplates/ProfileEditForm.js
function ProfileEditForm_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ProfileEditForm_typeof = function _typeof(obj) { return typeof obj; }; } else { ProfileEditForm_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ProfileEditForm_typeof(obj); }

function ProfileEditForm_pug_attr(t, e, n, r) {
  if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
  if (!0 === e) return " " + (r ? t : t + '="' + t + '"');

  var f = ProfileEditForm_typeof(e);

  return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = ProfileEditForm_pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'";
}

function ProfileEditForm_pug_escape(e) {
  var a = "" + e,
      t = ProfileEditForm_pug_match_html.exec(a);
  if (!t) return e;
  var r,
      c,
      n,
      s = "";

  for (r = t.index, c = 0; r < a.length; r++) {
    switch (a.charCodeAt(r)) {
      case 34:
        n = "&quot;";
        break;

      case 38:
        n = "&amp;";
        break;

      case 60:
        n = "&lt;";
        break;

      case 62:
        n = "&gt;";
        break;

      default:
        continue;
    }

    c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
  }

  return c !== r ? s + a.substring(c, r) : s;
}

var ProfileEditForm_pug_has_own_property = Object.prototype.hasOwnProperty;
var ProfileEditForm_pug_match_html = /["&<>]/;

function ProfileEditForm_pug_rethrow(n, e, r, t) {
  if (!(n instanceof Error)) throw n;
  if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;

  try {
    t = t || __webpack_require__(3).readFileSync(e, "utf8");
  } catch (e) {
    ProfileEditForm_pug_rethrow(n, null, r);
  }

  var i = 3,
      a = t.split("\n"),
      o = Math.max(r - i, 0),
      h = Math.min(a.length, r + i),
      i = a.slice(o, h).map(function (n, e) {
    var t = e + o + 1;
    return (t == r ? "  > " : "    ") + t + "| " + n;
  }).join("\n");
  throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n;
}

function ProfileEditForm_pug_style(r) {
  if (!r) return "";

  if ("object" == ProfileEditForm_typeof(r)) {
    var t = "";

    for (var e in r) {
      ProfileEditForm_pug_has_own_property.call(r, e) && (t = t + e + ":" + r[e] + ";");
    }

    return t;
  }

  return r + "";
}

function ProfileEditForm_template(locals) {
  var pug_html = "",
      pug_mixins = {},
      pug_interp;
  var pug_debug_filename, pug_debug_line;

  try {
    var pug_debug_sources = {
      "./src/Views/PugTemplates/ProfileEditForm.pug": "- var avatarUrl = \"background: url(\" + locals.avatar + \") no-repeat center center; background-size: cover; height: 310px;\"\n\nsection(class=\"s-content__primary site-page\")\n    div(class=\"row\")\n        div(class=\"column large-12 tab-12\")\n            h2 \u041F\u0440\u043E\u0444\u0438\u043B\u044C\n\n    form\n        div(class=\"row\")\n            div(class=\"column large-6 tab-12\")\n                h3 \u0410\u0432\u0430\u0442\u0430\u0440\n                div(style=avatarUrl)\n                div(class=\"form-field\")\n                    input(name=\"avatar\" type=\"file\" id=\"file\" class=\"h-full-width\" placeholder=\"\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0430\u0432\u0430\u0442\u0430\u0440\" accept=\"image/jpeg, image/png, image/jpg\" value=\"\" autocomplete=\"off\")\n\n            div(class=\"column large-6 tab-12\")\n                h3 \u0418\u043C\u044F\n                div(class=\"form-field\")\n                    input(name=\"profile_firstName\" type=\"text\" class=\"h-full-width\" placeholder=locals.name autocomplete=\"off\")\n\n                h3 \u0424\u0430\u043C\u0438\u043B\u0438\u044F\n                div(class=\"form-field\")\n                    input(name=\"profile_lastName\" type=\"text\" class=\"h-full-width\" placeholder=locals.surname autocomplete=\"off\")\n\n        div(class=\"row\")\n            div(class=\"column large-6\")\n                button(name=\"back\" class=\"submit btn btn--medium h-full-width\") \u041D\u0430\u0437\u0430\u0434\n\n            div(class=\"column large-6\")\n                button(name=\"editButton\" class=\"submit btn btn--primary btn--medium h-full-width\") \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\n\n\n\n"
    };
    ;
    pug_debug_line = 1;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    var avatarUrl = "background: url(" + locals.avatar + ") no-repeat center center; background-size: cover; height: 310px;";
    pug_debug_line = 3;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<section class=\"s-content__primary site-page\">";
    ;
    pug_debug_line = 4;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<div class=\"row\">";
    ;
    pug_debug_line = 5;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<div class=\"column large-12 tab-12\">";
    ;
    pug_debug_line = 6;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<h2>";
    ;
    pug_debug_line = 6;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "\u041F\u0440\u043E\u0444\u0438\u043B\u044C</h2></div></div>";
    ;
    pug_debug_line = 8;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<form>";
    ;
    pug_debug_line = 9;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<div class=\"row\">";
    ;
    pug_debug_line = 10;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<div class=\"column large-6 tab-12\">";
    ;
    pug_debug_line = 11;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<h3>";
    ;
    pug_debug_line = 11;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "\u0410\u0432\u0430\u0442\u0430\u0440</h3>";
    ;
    pug_debug_line = 12;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<div" + ProfileEditForm_pug_attr("style", ProfileEditForm_pug_style(avatarUrl), true, false) + "></div>";
    ;
    pug_debug_line = 13;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 14;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<input class=\"h-full-width\" name=\"avatar\" type=\"file\" id=\"file\" placeholder=\"\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0430\u0432\u0430\u0442\u0430\u0440\" accept=\"image/jpeg, image/png, image/jpg\" value=\"\" autocomplete=\"off\"/></div></div>";
    ;
    pug_debug_line = 16;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<div class=\"column large-6 tab-12\">";
    ;
    pug_debug_line = 17;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<h3>";
    ;
    pug_debug_line = 17;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "\u0418\u043C\u044F</h3>";
    ;
    pug_debug_line = 18;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 19;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"profile_firstName\" type=\"text\"" + ProfileEditForm_pug_attr("placeholder", locals.name, true, false) + " autocomplete=\"off\"") + "/></div>";
    ;
    pug_debug_line = 21;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<h3>";
    ;
    pug_debug_line = 21;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "\u0424\u0430\u043C\u0438\u043B\u0438\u044F</h3>";
    ;
    pug_debug_line = 22;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 23;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"profile_lastName\" type=\"text\"" + ProfileEditForm_pug_attr("placeholder", locals.surname, true, false) + " autocomplete=\"off\"") + "/></div></div></div>";
    ;
    pug_debug_line = 25;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<div class=\"row\">";
    ;
    pug_debug_line = 26;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<div class=\"column large-6\">";
    ;
    pug_debug_line = 27;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<button class=\"submit btn btn--medium h-full-width\" name=\"back\">";
    ;
    pug_debug_line = 27;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "\u041D\u0430\u0437\u0430\u0434</button></div>";
    ;
    pug_debug_line = 29;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<div class=\"column large-6\">";
    ;
    pug_debug_line = 30;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "<button class=\"submit btn btn--primary btn--medium h-full-width\" name=\"editButton\">";
    ;
    pug_debug_line = 30;
    pug_debug_filename = "./src/Views/PugTemplates/ProfileEditForm.pug";
    pug_html = pug_html + "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C</button></div></div></form></section>";
  } catch (err) {
    ProfileEditForm_pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
  }

  ;
  return pug_html;
}


// CONCATENATED MODULE: ./src/Views/ProfileEditView.js
function ProfileEditView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ProfileEditView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ProfileEditView_createClass(Constructor, protoProps, staticProps) { if (protoProps) ProfileEditView_defineProperties(Constructor.prototype, protoProps); if (staticProps) ProfileEditView_defineProperties(Constructor, staticProps); return Constructor; }






var ProfileEditView_ProfileEditView = /*#__PURE__*/function () {
  function ProfileEditView(element) {
    ProfileEditView_classCallCheck(this, ProfileEditView);

    this.element = element;
    src_EventBus.on(Events.userModelEvents.profileEdit.fail, ProfileEditView.showErrors.bind(this));
  }
  /**
   * Creates form for profile.css editing and returns it as an object
   * @param {string} data - profile.css data in JSON format
   */


  ProfileEditView_createClass(ProfileEditView, [{
    key: "render",
    value: function render(data) {
      if (!data) {
        src_EventBus.emit(Events.profileEditViewEvents.needUserData);
        return;
      }

      this.element.innerHTML = '';
      Views_NavbarView.render();
      this.element.insertAdjacentHTML('beforeend', ProfileEditForm_template(data));
      var form = document.getElementsByTagName('form')[0];
      var backButton = document.getElementsByName('back')[0];
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.profileEditViewEvents.submit, {
          target: 'ProfileEditView',
          data: new FormData(form),
          tmpData: data
        });
      });
      backButton.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.global.goBack);
      });
    }
  }], [{
    key: "showErrors",
    value: function showErrors(errors) {
      console.log('PROFILE EDIT Errors', errors);
    }
  }]);

  return ProfileEditView;
}();


// CONCATENATED MODULE: ./src/Controllers/ProfileEditController.js
function ProfileEditController_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ProfileEditController_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ProfileEditController_createClass(Constructor, protoProps, staticProps) { if (protoProps) ProfileEditController_defineProperties(Constructor.prototype, protoProps); if (staticProps) ProfileEditController_defineProperties(Constructor, staticProps); return Constructor; }




var ProfileEditController_ProfileEditController = /*#__PURE__*/function () {
  function ProfileEditController(profileEditView, userModel) {
    var _this = this;

    ProfileEditController_classCallCheck(this, ProfileEditController);

    this.view = profileEditView;
    this.model = userModel;
    src_EventBus.on(Events.userModelEvents.profileEdit.success, function (user) {
      src_EventBus.emit(Events.global.redirect, {
        path: Paths.profilePage,
        data: user
      });
    });
    src_EventBus.on(Events.profileEditViewEvents.needUserData, function () {
      _this.view.render(_this.model.user);
    });
  }

  ProfileEditController_createClass(ProfileEditController, [{
    key: "setView",
    value: function setView(view) {
      this.view = view;
    }
  }, {
    key: "setModel",
    value: function setModel(model) {
      this.model = model;
    }
  }]);

  return ProfileEditController;
}();

/* harmony default export */ var Controllers_ProfileEditController = (new ProfileEditController_ProfileEditController());
// CONCATENATED MODULE: ./src/Views/PugTemplates/mainPage.js
function mainPage_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { mainPage_typeof = function _typeof(obj) { return typeof obj; }; } else { mainPage_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return mainPage_typeof(obj); }

function mainPage_pug_attr(t, e, n, r) {
  if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
  if (!0 === e) return " " + (r ? t : t + '="' + t + '"');

  var f = mainPage_typeof(e);

  return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = mainPage_pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'";
}

function mainPage_pug_escape(e) {
  var a = "" + e,
      t = mainPage_pug_match_html.exec(a);
  if (!t) return e;
  var r,
      c,
      n,
      s = "";

  for (r = t.index, c = 0; r < a.length; r++) {
    switch (a.charCodeAt(r)) {
      case 34:
        n = "&quot;";
        break;

      case 38:
        n = "&amp;";
        break;

      case 60:
        n = "&lt;";
        break;

      case 62:
        n = "&gt;";
        break;

      default:
        continue;
    }

    c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
  }

  return c !== r ? s + a.substring(c, r) : s;
}

var mainPage_pug_match_html = /["&<>]/;

function mainPage_pug_rethrow(n, e, r, t) {
  if (!(n instanceof Error)) throw n;
  if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;

  try {
    t = t || __webpack_require__(3).readFileSync(e, "utf8");
  } catch (e) {
    mainPage_pug_rethrow(n, null, r);
  }

  var i = 3,
      a = t.split("\n"),
      o = Math.max(r - i, 0),
      h = Math.min(a.length, r + i),
      i = a.slice(o, h).map(function (n, e) {
    var t = e + o + 1;
    return (t == r ? "  > " : "    ") + t + "| " + n;
  }).join("\n");
  throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n;
}

function mainPage_template(locals) {
  var pug_html = "",
      pug_mixins = {},
      pug_interp;
  var pug_debug_filename, pug_debug_line;

  try {
    var pug_debug_sources = {
      "./src/Views/PugTemplates/mainPage.pug": "if(locals.screenWidth > 800)\n    div(class=\"main-page mainPage\")\n        div(class=\"row\" style=\"margin-left: 0; margin-right: 0; width: 100vw;\")\n\n            div(class=\"column large-2 tab-12 mob-12 main-container\")\n                div(class=\"main-columns project_scroll\")\n                    div(id=\"add-folder-recived\" class=\"block plus radius\")\n\n                    if(locals.recivedFolderRecived)\n                        div(id=\"summary-recived\" class=\"triangle-down\")\n                    else\n                        div(id=\"summary-recived\" class=\"triangle-right\")\n                    a(id=\"recivedUn\" class=\"titles-category\") \u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435\n\n                    if(locals.recivedFolderRecived)\n                        div(id=\"recived\")\n                            if(locals.recivedFolder)\n                                each folder in locals.recivedFolder\n                                    div(class=\"input-group\")\n                                        div\n                                            input(class=\"folder-names\" readonly value=folder.Name id=folder.Name)\n                                        div(class=\"icon-group\" id=\"icon-group\")\n                                            div(class=\"edit-button radius\" id=folder.Name name=\"edit-folder\")\n                                                svg(id=folder.Name name=\"edit-folder\" class=\"block\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\")\n                                                    g(id=folder.Name name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\")\n                                                        path(id=folder.Name name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\")\n                                                        g(id=folder.Name name=\"edit-folder\" fill=\"#ffffff\")\n                                                            path(id=folder.Name name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\")\n\n                                            div(class=\"small-plus radius cross\" id=folder.Name name=\"delete-folder\")\n\n                    div(class=\"horizontal\")\n\n                    a(id=\"sendedUn\" class=\"block titles-category\") \u0418\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435\n\n            div(class=\"column large-4 tab-12 mob-12 main-container\")\n                div(class=\"bricks-wrapper h-group main-columns project_scroll\" name=\"letters\")\n                    if(locals.selectFolder)\n\n                      div(name=\"search-group\" class=\"search-block\")\n                          button(name=\"search-group\" class=\"btn btn--medium btn--primary h-full-width\" id=\"search-button\") \u0418\u0441\u043A\u0430\u0442\u044C\n                          input(id=\"search-input\" name=\"search-group\" type=\"text\" class=\"h-full-width search-input\" placeholder=\"\u041F\u043E\u0438\u0441\u043A\" value=\"\" autocomplete=\"off\" required)\n\n                          if(locals.searchResult.res)\n                              div(name=\"search-group\" class=\"search-back\" id=\"search-result-list\")\n\n                                  if(locals.searchResult.is)\n                                      if(locals.searchResult.Senders)\n                                          span(name=\"search-group\" class=\"search-title\") \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u0438\n                                          each result in locals.searchResult.Senders\n                                              div(name=\"search-target\" role=\"Senders\" id=result) #{result}\n\n                                      if(locals.searchResult.Receivers)\n                                          span(name=\"search-group\" class=\"search-title\") \u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u0438\n                                          each result in locals.searchResult.Receivers\n                                              div(name=\"search-target\" role=\"Receivers\" id=result) #{result}\n\n                                      if(locals.searchResult.Themes)\n                                          span(name=\"search-group\" class=\"search-title\") \u0422\u0435\u043C\u044B\n                                          each result in locals.searchResult.Themes\n                                              div(name=\"search-target\" role=\"Themes\" id=result) #{result}\n\n                                      if(locals.searchResult.Texts)\n                                          span(name=\"search-group\" class=\"search-title\") \u0422\u0435\u043A\u0441\u0442\u044B\n                                          each result in locals.searchResult.Texts\n                                              div(name=\"search-target\" role=\"Texts\" id=result) #{result}\n\n                                  else\n                                      span(name=\"search-group\" class=\"search-title-no\")  \u041D\u0435\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432\n\n\n                      each letter in locals.selectFolder\n                        article(id=letter.Id class=\"brick entry format-standard\")\n                            div(id=letter.Id class=\"entry__text\")\n                                div(id=letter.Id class=\"entry__header\")\n                                    h1(id=letter.Id class=\"entry__title max-ch\") #{letter.Theme}\n\n                                if(!letter.IsWatched)\n                                    div(id=letter.Id class=\"h-full-width not-watched\")\n                                div(id=letter.Id class=\"entry__excerpt\")\n                                    p(id=letter.Id class=\"max-ch\") \u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C: #{letter.Receiver}\n                                div(id=letter.Id class=\"entry__excerpt\")\n                                    p(id=letter.Id class=\"max-ch\") \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044C: #{letter.Sender}\n                                div(id=letter.Id class=\"entry__excerpt\")\n                                    p(id=letter.Id class=\"max-ch\") #{letter.Text}\n\n                      div(class=\"block-update\")\n                        div(class=\"small-plus radius\")\n\n\n            div(class=\"column large-6 tab-12 mob-12 main-container\")\n                div(class=\"main-columns project_scroll\")\n                    if(locals.buttonPlus && letter.Id !== undefined)\n                        div(class=\"letter-board\")\n                            div(id=\"button-remove-letter\" class=\"delete-letter-button radius\")\n                                img(class=\"icon-trash\" height=\"12px\" width=\"12px\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAmklEQVRIie2VMQoCMRBF/1c8hFcUwc5C8ABewMstbGVhZy0Iz2YDIbvuxjWyTX41mWT+G4aBSBMC9kBLXzfgCHjKY8x8N2Cc6vALoOlMTsAmyq+Bc3fXjHk4KmJ2J0PGtiVpVdJ0EfU2oMCotrbv4fD3ES0LCJuQG38NKKEKqIAKqICZgGcI4r8hJ07rPwEu6aNMvSRdbT/i5BtRtIPz+Hl+WgAAAABJRU5ErkJggg==\")\n                            div(id=\"button-form-add-letter-folder\" class=\"small-plus radius\")\n                            div(id=\"delete-folder\" class=\"small-plus radius cross letter-board-last-element\")\n\n                    div(class=\"letter-container\")\n                        h3(id=letter.Id name=\"title-of-current\") #{letter.Theme}\n                        p(class=\"lead\") #{letter.Receiver}\n                        p(class=\"lead\") #{letter.Sender}\n                        p(class=\"lead\") #{letter.Text}\n\n\n    //\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F\n    div(class=\"form-add-folder-up hide\")\n        div(id=\"remove-folder-recived\" class=\"plus radius cross cross-modal\")\n        form(name=\"button-of-recived-folder\")\n            div(class=\"row\")\n                input(name=\"folderName\" type=\"text\" class=\"h-full-width\" placeholder=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0430\u043F\u043A\u0443\" value=\"\" autocomplete=\"off\" required)\n                button(type=\"submit\" class=\"btn btn--medium btn--primary h-full-width\") \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C\n\n    //\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0432 \u043F\u0430\u043F\u043A\u0443\n    div(class=\"hide form-add-folder-up\")\n        div(id=\"remove-form-add-folder-up\" class=\"plus radius cross cross-modal\")\n        form(id=\"choose-folder\")\n            div(class=\"row\")\n                select(name=\"inFolderName\" class=\"h-full-width\")\n                    if(locals.recivedFolder)\n                        each folder in locals.recivedFolder\n                            option(value=folder.Name) #{folder.Name}\n\n\n            div(class=\"row\")\n                button(type=\"submit\" class=\"btn h-full-width\") \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C\n\n\nelse\n    div(class=\"main-page mainPage\")\n        div(class=\"row\" style=\"margin-left: 0; margin-right: 0; width: 100vw;\")\n\n            if(locals.folderColumn)\n                div(class=\"column large-2 tab-12 mob-12 main-container\")\n                    div(class=\"main-columns project_scroll\")\n                        div(id=\"add-folder-recived\" class=\"block plus radius\")\n\n                        if(locals.recivedFolderRecived)\n                            div(id=\"summary-recived\" class=\"triangle-down\")\n                        else\n                            div(id=\"summary-recived\" class=\"triangle-right\")\n                        a(id=\"recivedUn\" class=\"titles-category\") \u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435\n\n                        if(locals.recivedFolderRecived)\n                            div(id=\"recived\")\n                                if(locals.recivedFolder)\n                                  each folder in locals.recivedFolder\n                                      div(class=\"input-group\")\n                                          div\n                                              input(class=\"folder-names\" readonly value=folder.Name id=folder.Name)\n                                          div(class=\"icon-group\" id=\"icon-group\")\n                                              div(class=\"edit-button radius\" id=folder.Name name=\"edit-folder\")\n                                                  svg(id=folder.Name name=\"edit-folder\" class=\"block\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\")\n                                                      g(id=folder.Name name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\")\n                                                          path(id=folder.Name name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\")\n                                                          g(id=folder.Name name=\"edit-folder\" fill=\"#ffffff\")\n                                                              path(id=folder.Name name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\")\n\n                                              div(class=\"small-plus radius cross\" id=folder.Name name=\"delete-folder\")\n\n                        div(class=\"horizontal\")\n\n                        a(id=\"sendedUn\" class=\"block titles-category\") \u0418\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435\n\n            if(locals.letterColumn)\n                div(class=\"column large-4 tab-12 mob-12 main-container\")\n\n                    a(id=\"back-to-folders\") < \u041F\u0430\u043F\u043A\u0438\n\n                    div(class=\"bricks-wrapper h-group main-columns project_scroll\" name=\"letters\")\n                        if(locals.selectFolder)\n                          each letter in locals.selectFolder\n                              article(id=letter.Id class=\"brick entry format-standard\")\n                                  div(id=letter.Id class=\"entry__text\")\n                                      div(id=letter.Id class=\"entry__header\")\n                                          h1(id=letter.Id class=\"entry__title max-ch\") #{letter.Theme}\n\n                                      if(!letter.IsWatched)\n                                          div(id=letter.Id class=\"h-full-width not-watched\")\n                                      div(id=letter.Id class=\"entry__excerpt\")\n                                          p(id=letter.Id class=\"max-ch\") \u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C: #{letter.Receiver}\n                                      div(id=letter.Id class=\"entry__excerpt\")\n                                          p(id=letter.Id class=\"max-ch\") \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044C: #{letter.Sender}\n                                      div(id=letter.Id class=\"entry__excerpt\")\n                                          p(id=letter.Id class=\"max-ch\") #{letter.Text}\n\n            if(locals.oneLetterColumn)\n                div(class=\"column large-6 tab-12 mob-12 main-container\")\n                    div(class=\"main-columns project_scroll\")\n                        if(locals.buttonPlus && letter.Id !== undefined)\n                            div(class=\"letter-board\")\n                                a(id=\"back-to-letters\") < \u041A \u043F\u0430\u043F\u043A\u0430\u043C\n                                div(class=\"letter-board-small\")\n                                    div(id=\"button-remove-letter\" class=\"delete-letter-button radius\")\n                                        img(class=\"icon-trash\" height=\"12px\" width=\"12px\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAmklEQVRIie2VMQoCMRBF/1c8hFcUwc5C8ABewMstbGVhZy0Iz2YDIbvuxjWyTX41mWT+G4aBSBMC9kBLXzfgCHjKY8x8N2Cc6vALoOlMTsAmyq+Bc3fXjHk4KmJ2J0PGtiVpVdJ0EfU2oMCotrbv4fD3ES0LCJuQG38NKKEKqIAKqICZgGcI4r8hJ07rPwEu6aNMvSRdbT/i5BtRtIPz+Hl+WgAAAABJRU5ErkJggg==\")\n                                    div(id=\"button-form-add-letter-folder\" class=\"small-plus radius\")\n                                    div(id=\"delete-folder\" class=\"small-plus radius cross letter-board-last-element\")\n\n                        div(class=\"letter-container\")\n                            h3(id=letter.Id name=\"title-of-current\") #{letter.Theme}\n                            p(class=\"lead\") #{letter.Receiver}\n                            p(class=\"lead\") #{letter.Sender}\n                            p(class=\"lead\") #{letter.Text}\n\n\n    //\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F\n    div(class=\"form-add-folder-up hide\")\n        div(id=\"remove-folder-recived\" class=\"plus radius cross cross-modal\")\n        form(name=\"button-of-recived-folder\")\n            div(class=\"row\")\n                input(name=\"folderName\" type=\"text\" class=\"h-full-width\" placeholder=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0430\u043F\u043A\u0443\" value=\"\" autocomplete=\"off\" required)\n                button(type=\"submit\" class=\"btn btn--medium btn--primary h-full-width\") \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C\n\n    //\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0432 \u043F\u0430\u043F\u043A\u0443\n    div(class=\"hide form-add-folder-up\")\n        div(id=\"remove-form-add-folder-up\" class=\"plus radius cross cross-modal\")\n        form(id=\"choose-folder\")\n            div(class=\"row\")\n                select(name=\"inFolderName\" class=\"h-full-width\")\n                    if(locals.recivedFolder)\n                      each folder in locals.recivedFolder\n                          option(value=folder.Name) #{folder.Name}\n\n\n            div(class=\"row\")\n                button(type=\"submit\" class=\"btn h-full-width\") \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C\n"
    };
    ;
    var locals_for_with = locals || {};
    (function (letter) {
      ;
      pug_debug_line = 1;
      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

      if (locals.screenWidth > 800) {
        ;
        pug_debug_line = 2;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"main-page mainPage\">";
        ;
        pug_debug_line = 3;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\" style=\"margin-left: 0; margin-right: 0; width: 100vw;\">";
        ;
        pug_debug_line = 5;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"column large-2 tab-12 mob-12 main-container\">";
        ;
        pug_debug_line = 6;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"main-columns project_scroll\">";
        ;
        pug_debug_line = 7;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"block plus radius\" id=\"add-folder-recived\"></div>";
        ;
        pug_debug_line = 9;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.recivedFolderRecived) {
          ;
          pug_debug_line = 10;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"triangle-down\" id=\"summary-recived\"></div>";
        } else {
          ;
          pug_debug_line = 12;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"triangle-right\" id=\"summary-recived\"></div>";
        }

        ;
        pug_debug_line = 13;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<a class=\"titles-category\" id=\"recivedUn\">";
        ;
        pug_debug_line = 13;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435</a>";
        ;
        pug_debug_line = 15;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.recivedFolderRecived) {
          ;
          pug_debug_line = 16;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div id=\"recived\">";
          ;
          pug_debug_line = 17;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

          if (locals.recivedFolder) {
            ;
            pug_debug_line = 18;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.recivedFolder

            ;
            (function () {
              var $$obj = locals.recivedFolder;

              if ('number' == typeof $$obj.length) {
                for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
                  var folder = $$obj[pug_index0];
                  ;
                  pug_debug_line = 19;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div class=\"input-group\">";
                  ;
                  pug_debug_line = 20;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div>";
                  ;
                  pug_debug_line = 21;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<input" + (" class=\"folder-names\"" + mainPage_pug_attr("readonly", true, true, false) + mainPage_pug_attr("value", folder.Name, true, false) + mainPage_pug_attr("id", folder.Name, true, false)) + "/></div>";
                  ;
                  pug_debug_line = 22;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div class=\"icon-group\" id=\"icon-group\">";
                  ;
                  pug_debug_line = 23;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"edit-button radius\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\"") + ">";
                  ;
                  pug_debug_line = 24;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<svg" + (" class=\"block\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\"") + ">";
                  ;
                  pug_debug_line = 25;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<g" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"") + ">";
                  ;
                  pug_debug_line = 26;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<path" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\"") + "></path>";
                  ;
                  pug_debug_line = 27;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<g" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" fill=\"#ffffff\"") + ">";
                  ;
                  pug_debug_line = 28;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<path" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\"") + "></path></g></g></svg></div>";
                  ;
                  pug_debug_line = 30;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"small-plus radius cross\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"delete-folder\"") + "></div></div></div>";
                }
              } else {
                var $$l = 0;

                for (var pug_index0 in $$obj) {
                  $$l++;
                  var folder = $$obj[pug_index0];
                  ;
                  pug_debug_line = 19;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div class=\"input-group\">";
                  ;
                  pug_debug_line = 20;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div>";
                  ;
                  pug_debug_line = 21;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<input" + (" class=\"folder-names\"" + mainPage_pug_attr("readonly", true, true, false) + mainPage_pug_attr("value", folder.Name, true, false) + mainPage_pug_attr("id", folder.Name, true, false)) + "/></div>";
                  ;
                  pug_debug_line = 22;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div class=\"icon-group\" id=\"icon-group\">";
                  ;
                  pug_debug_line = 23;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"edit-button radius\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\"") + ">";
                  ;
                  pug_debug_line = 24;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<svg" + (" class=\"block\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\"") + ">";
                  ;
                  pug_debug_line = 25;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<g" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"") + ">";
                  ;
                  pug_debug_line = 26;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<path" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\"") + "></path>";
                  ;
                  pug_debug_line = 27;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<g" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" fill=\"#ffffff\"") + ">";
                  ;
                  pug_debug_line = 28;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<path" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\"") + "></path></g></g></svg></div>";
                  ;
                  pug_debug_line = 30;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"small-plus radius cross\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"delete-folder\"") + "></div></div></div>";
                }
              }
            }).call(this);
          }

          pug_html = pug_html + "</div>";
        }

        ;
        pug_debug_line = 32;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"horizontal\"></div>";
        ;
        pug_debug_line = 34;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<a class=\"block titles-category\" id=\"sendedUn\">";
        ;
        pug_debug_line = 34;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "\u0418\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435</a></div></div>";
        ;
        pug_debug_line = 36;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"column large-4 tab-12 mob-12 main-container\">";
        ;
        pug_debug_line = 37;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"bricks-wrapper h-group main-columns project_scroll\" name=\"letters\">";
        ;
        pug_debug_line = 38;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.selectFolder) {
          ;
          pug_debug_line = 40;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"search-block\" name=\"search-group\">";
          ;
          pug_debug_line = 41;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<button class=\"btn btn--medium btn--primary h-full-width\" name=\"search-group\" id=\"search-button\">";
          ;
          pug_debug_line = 41;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "\u0418\u0441\u043A\u0430\u0442\u044C</button>";
          ;
          pug_debug_line = 42;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<input" + (" class=\"h-full-width search-input\"" + " id=\"search-input\" name=\"search-group\" type=\"text\" placeholder=\"Поиск\" value=\"\" autocomplete=\"off\"" + mainPage_pug_attr("required", true, true, false)) + "/>";
          ;
          pug_debug_line = 44;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

          if (locals.searchResult.res) {
            ;
            pug_debug_line = 45;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"search-back\" name=\"search-group\" id=\"search-result-list\">";
            ;
            pug_debug_line = 47;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

            if (locals.searchResult.is) {
              ;
              pug_debug_line = 48;
              pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

              if (locals.searchResult.Senders) {
                ;
                pug_debug_line = 49;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<span class=\"search-title\" name=\"search-group\">";
                ;
                pug_debug_line = 49;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u0438</span>";
                ;
                pug_debug_line = 50;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.searchResult.Senders

                ;
                (function () {
                  var $$obj = locals.searchResult.Senders;

                  if ('number' == typeof $$obj.length) {
                    for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
                      var result = $$obj[pug_index1];
                      ;
                      pug_debug_line = 51;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + "<div" + (" name=\"search-target\" role=\"Senders\"" + mainPage_pug_attr("id", result, true, false)) + ">";
                      ;
                      pug_debug_line = 51;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = result) ? "" : pug_interp) + "</div>";
                    }
                  } else {
                    var $$l = 0;

                    for (var pug_index1 in $$obj) {
                      $$l++;
                      var result = $$obj[pug_index1];
                      ;
                      pug_debug_line = 51;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + "<div" + (" name=\"search-target\" role=\"Senders\"" + mainPage_pug_attr("id", result, true, false)) + ">";
                      ;
                      pug_debug_line = 51;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = result) ? "" : pug_interp) + "</div>";
                    }
                  }
                }).call(this);
              }

              ;
              pug_debug_line = 53;
              pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

              if (locals.searchResult.Receivers) {
                ;
                pug_debug_line = 54;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<span class=\"search-title\" name=\"search-group\">";
                ;
                pug_debug_line = 54;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "\u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u0438</span>";
                ;
                pug_debug_line = 55;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.searchResult.Receivers

                ;
                (function () {
                  var $$obj = locals.searchResult.Receivers;

                  if ('number' == typeof $$obj.length) {
                    for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
                      var result = $$obj[pug_index2];
                      ;
                      pug_debug_line = 56;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + "<div" + (" name=\"search-target\" role=\"Receivers\"" + mainPage_pug_attr("id", result, true, false)) + ">";
                      ;
                      pug_debug_line = 56;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = result) ? "" : pug_interp) + "</div>";
                    }
                  } else {
                    var $$l = 0;

                    for (var pug_index2 in $$obj) {
                      $$l++;
                      var result = $$obj[pug_index2];
                      ;
                      pug_debug_line = 56;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + "<div" + (" name=\"search-target\" role=\"Receivers\"" + mainPage_pug_attr("id", result, true, false)) + ">";
                      ;
                      pug_debug_line = 56;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = result) ? "" : pug_interp) + "</div>";
                    }
                  }
                }).call(this);
              }

              ;
              pug_debug_line = 58;
              pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

              if (locals.searchResult.Themes) {
                ;
                pug_debug_line = 59;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<span class=\"search-title\" name=\"search-group\">";
                ;
                pug_debug_line = 59;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "\u0422\u0435\u043C\u044B</span>";
                ;
                pug_debug_line = 60;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.searchResult.Themes

                ;
                (function () {
                  var $$obj = locals.searchResult.Themes;

                  if ('number' == typeof $$obj.length) {
                    for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
                      var result = $$obj[pug_index3];
                      ;
                      pug_debug_line = 61;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + "<div" + (" name=\"search-target\" role=\"Themes\"" + mainPage_pug_attr("id", result, true, false)) + ">";
                      ;
                      pug_debug_line = 61;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = result) ? "" : pug_interp) + "</div>";
                    }
                  } else {
                    var $$l = 0;

                    for (var pug_index3 in $$obj) {
                      $$l++;
                      var result = $$obj[pug_index3];
                      ;
                      pug_debug_line = 61;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + "<div" + (" name=\"search-target\" role=\"Themes\"" + mainPage_pug_attr("id", result, true, false)) + ">";
                      ;
                      pug_debug_line = 61;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = result) ? "" : pug_interp) + "</div>";
                    }
                  }
                }).call(this);
              }

              ;
              pug_debug_line = 63;
              pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

              if (locals.searchResult.Texts) {
                ;
                pug_debug_line = 64;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<span class=\"search-title\" name=\"search-group\">";
                ;
                pug_debug_line = 64;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "\u0422\u0435\u043A\u0441\u0442\u044B</span>";
                ;
                pug_debug_line = 65;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.searchResult.Texts

                ;
                (function () {
                  var $$obj = locals.searchResult.Texts;

                  if ('number' == typeof $$obj.length) {
                    for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
                      var result = $$obj[pug_index4];
                      ;
                      pug_debug_line = 66;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + "<div" + (" name=\"search-target\" role=\"Texts\"" + mainPage_pug_attr("id", result, true, false)) + ">";
                      ;
                      pug_debug_line = 66;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = result) ? "" : pug_interp) + "</div>";
                    }
                  } else {
                    var $$l = 0;

                    for (var pug_index4 in $$obj) {
                      $$l++;
                      var result = $$obj[pug_index4];
                      ;
                      pug_debug_line = 66;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + "<div" + (" name=\"search-target\" role=\"Texts\"" + mainPage_pug_attr("id", result, true, false)) + ">";
                      ;
                      pug_debug_line = 66;
                      pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                      pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = result) ? "" : pug_interp) + "</div>";
                    }
                  }
                }).call(this);
              }
            } else {
              ;
              pug_debug_line = 69;
              pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
              pug_html = pug_html + "<span class=\"search-title-no\" name=\"search-group\">";
              ;
              pug_debug_line = 69;
              pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
              pug_html = pug_html + " \u041D\u0435\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432</span>";
            }

            pug_html = pug_html + "</div>";
          }

          pug_html = pug_html + "</div>";
          ;
          pug_debug_line = 72;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.selectFolder

          ;
          (function () {
            var $$obj = locals.selectFolder;

            if ('number' == typeof $$obj.length) {
              for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
                var letter = $$obj[pug_index5];
                ;
                pug_debug_line = 73;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<article" + (" class=\"brick entry format-standard\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 74;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__text\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 75;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__header\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 76;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<h1" + (" class=\"entry__title max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 76;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp) + "</h1></div>";
                ;
                pug_debug_line = 78;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

                if (!letter.IsWatched) {
                  ;
                  pug_debug_line = 79;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"h-full-width not-watched\"" + mainPage_pug_attr("id", letter.Id, true, false)) + "></div>";
                }

                ;
                pug_debug_line = 80;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 81;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 81;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "Получатель: ";
                ;
                pug_debug_line = 81;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp) + "</p></div>";
                ;
                pug_debug_line = 82;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 83;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 83;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "Отправитель: ";
                ;
                pug_debug_line = 83;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp) + "</p></div>";
                ;
                pug_debug_line = 84;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 85;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 85;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp) + "</p></div></div></article>";
              }
            } else {
              var $$l = 0;

              for (var pug_index5 in $$obj) {
                $$l++;
                var letter = $$obj[pug_index5];
                ;
                pug_debug_line = 73;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<article" + (" class=\"brick entry format-standard\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 74;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__text\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 75;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__header\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 76;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<h1" + (" class=\"entry__title max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 76;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp) + "</h1></div>";
                ;
                pug_debug_line = 78;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

                if (!letter.IsWatched) {
                  ;
                  pug_debug_line = 79;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"h-full-width not-watched\"" + mainPage_pug_attr("id", letter.Id, true, false)) + "></div>";
                }

                ;
                pug_debug_line = 80;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 81;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 81;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "Получатель: ";
                ;
                pug_debug_line = 81;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp) + "</p></div>";
                ;
                pug_debug_line = 82;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 83;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 83;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "Отправитель: ";
                ;
                pug_debug_line = 83;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp) + "</p></div>";
                ;
                pug_debug_line = 84;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 85;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 85;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp) + "</p></div></div></article>";
              }
            }
          }).call(this);
          ;
          pug_debug_line = 87;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"block-update\">";
          ;
          pug_debug_line = 88;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"small-plus radius\"></div></div>";
        }

        pug_html = pug_html + "</div></div>";
        ;
        pug_debug_line = 91;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"column large-6 tab-12 mob-12 main-container\">";
        ;
        pug_debug_line = 92;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"main-columns project_scroll\">";
        ;
        pug_debug_line = 93;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.buttonPlus && letter.Id !== undefined) {
          ;
          pug_debug_line = 94;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"letter-board\">";
          ;
          pug_debug_line = 95;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"delete-letter-button radius\" id=\"button-remove-letter\">";
          ;
          pug_debug_line = 96;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<img class=\"icon-trash\" height=\"12px\" width=\"12px\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAmklEQVRIie2VMQoCMRBF/1c8hFcUwc5C8ABewMstbGVhZy0Iz2YDIbvuxjWyTX41mWT+G4aBSBMC9kBLXzfgCHjKY8x8N2Cc6vALoOlMTsAmyq+Bc3fXjHk4KmJ2J0PGtiVpVdJ0EfU2oMCotrbv4fD3ES0LCJuQG38NKKEKqIAKqICZgGcI4r8hJ07rPwEu6aNMvSRdbT/i5BtRtIPz+Hl+WgAAAABJRU5ErkJggg==\"/></div>";
          ;
          pug_debug_line = 97;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"small-plus radius\" id=\"button-form-add-letter-folder\"></div>";
          ;
          pug_debug_line = 98;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"small-plus radius cross letter-board-last-element\" id=\"delete-folder\"></div></div>";
        }

        ;
        pug_debug_line = 100;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"letter-container\">";
        ;
        pug_debug_line = 101;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<h3" + (mainPage_pug_attr("id", letter.Id, true, false) + " name=\"title-of-current\"") + ">";
        ;
        pug_debug_line = 101;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp) + "</h3>";
        ;
        pug_debug_line = 102;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<p class=\"lead\">";
        ;
        pug_debug_line = 102;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp) + "</p>";
        ;
        pug_debug_line = 103;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<p class=\"lead\">";
        ;
        pug_debug_line = 103;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp) + "</p>";
        ;
        pug_debug_line = 104;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<p class=\"lead\">";
        ;
        pug_debug_line = 104;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp) + "</p></div></div></div></div></div>";
        ;
        pug_debug_line = 107;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<!--\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F-->";
        ;
        pug_debug_line = 108;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"form-add-folder-up hide\">";
        ;
        pug_debug_line = 109;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"plus radius cross cross-modal\" id=\"remove-folder-recived\"></div>";
        ;
        pug_debug_line = 110;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<form name=\"button-of-recived-folder\">";
        ;
        pug_debug_line = 111;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\">";
        ;
        pug_debug_line = 112;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"folderName\" type=\"text\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\"" + mainPage_pug_attr("required", true, true, false)) + "/>";
        ;
        pug_debug_line = 113;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<button class=\"btn btn--medium btn--primary h-full-width\" type=\"submit\">";
        ;
        pug_debug_line = 113;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button></div></form></div>";
        ;
        pug_debug_line = 115;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<!--\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0432 \u043F\u0430\u043F\u043A\u0443-->";
        ;
        pug_debug_line = 116;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"hide form-add-folder-up\">";
        ;
        pug_debug_line = 117;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"plus radius cross cross-modal\" id=\"remove-form-add-folder-up\"></div>";
        ;
        pug_debug_line = 118;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<form id=\"choose-folder\">";
        ;
        pug_debug_line = 119;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\">";
        ;
        pug_debug_line = 120;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<select class=\"h-full-width\" name=\"inFolderName\">";
        ;
        pug_debug_line = 121;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.recivedFolder) {
          ;
          pug_debug_line = 122;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.recivedFolder

          ;
          (function () {
            var $$obj = locals.recivedFolder;

            if ('number' == typeof $$obj.length) {
              for (var pug_index6 = 0, $$l = $$obj.length; pug_index6 < $$l; pug_index6++) {
                var folder = $$obj[pug_index6];
                ;
                pug_debug_line = 123;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<option" + mainPage_pug_attr("value", folder.Name, true, false) + ">";
                ;
                pug_debug_line = 123;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = folder.Name) ? "" : pug_interp) + "</option>";
              }
            } else {
              var $$l = 0;

              for (var pug_index6 in $$obj) {
                $$l++;
                var folder = $$obj[pug_index6];
                ;
                pug_debug_line = 123;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<option" + mainPage_pug_attr("value", folder.Name, true, false) + ">";
                ;
                pug_debug_line = 123;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = folder.Name) ? "" : pug_interp) + "</option>";
              }
            }
          }).call(this);
        }

        pug_html = pug_html + "</select></div>";
        ;
        pug_debug_line = 126;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\">";
        ;
        pug_debug_line = 127;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<button class=\"btn h-full-width\" type=\"submit\">";
        ;
        pug_debug_line = 127;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button></div></form></div>";
      } else {
        ;
        pug_debug_line = 131;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"main-page mainPage\">";
        ;
        pug_debug_line = 132;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\" style=\"margin-left: 0; margin-right: 0; width: 100vw;\">";
        ;
        pug_debug_line = 134;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.folderColumn) {
          ;
          pug_debug_line = 135;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"column large-2 tab-12 mob-12 main-container\">";
          ;
          pug_debug_line = 136;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"main-columns project_scroll\">";
          ;
          pug_debug_line = 137;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"block plus radius\" id=\"add-folder-recived\"></div>";
          ;
          pug_debug_line = 139;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

          if (locals.recivedFolderRecived) {
            ;
            pug_debug_line = 140;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"triangle-down\" id=\"summary-recived\"></div>";
          } else {
            ;
            pug_debug_line = 142;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"triangle-right\" id=\"summary-recived\"></div>";
          }

          ;
          pug_debug_line = 143;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<a class=\"titles-category\" id=\"recivedUn\">";
          ;
          pug_debug_line = 143;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435</a>";
          ;
          pug_debug_line = 145;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

          if (locals.recivedFolderRecived) {
            ;
            pug_debug_line = 146;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div id=\"recived\">";
            ;
            pug_debug_line = 147;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

            if (locals.recivedFolder) {
              ;
              pug_debug_line = 148;
              pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.recivedFolder

              ;
              (function () {
                var $$obj = locals.recivedFolder;

                if ('number' == typeof $$obj.length) {
                  for (var pug_index7 = 0, $$l = $$obj.length; pug_index7 < $$l; pug_index7++) {
                    var folder = $$obj[pug_index7];
                    ;
                    pug_debug_line = 149;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div class=\"input-group\">";
                    ;
                    pug_debug_line = 150;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div>";
                    ;
                    pug_debug_line = 151;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<input" + (" class=\"folder-names\"" + mainPage_pug_attr("readonly", true, true, false) + mainPage_pug_attr("value", folder.Name, true, false) + mainPage_pug_attr("id", folder.Name, true, false)) + "/></div>";
                    ;
                    pug_debug_line = 152;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div class=\"icon-group\" id=\"icon-group\">";
                    ;
                    pug_debug_line = 153;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div" + (" class=\"edit-button radius\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\"") + ">";
                    ;
                    pug_debug_line = 154;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<svg" + (" class=\"block\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\"") + ">";
                    ;
                    pug_debug_line = 155;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<g" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"") + ">";
                    ;
                    pug_debug_line = 156;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<path" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\"") + "></path>";
                    ;
                    pug_debug_line = 157;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<g" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" fill=\"#ffffff\"") + ">";
                    ;
                    pug_debug_line = 158;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<path" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\"") + "></path></g></g></svg></div>";
                    ;
                    pug_debug_line = 160;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div" + (" class=\"small-plus radius cross\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"delete-folder\"") + "></div></div></div>";
                  }
                } else {
                  var $$l = 0;

                  for (var pug_index7 in $$obj) {
                    $$l++;
                    var folder = $$obj[pug_index7];
                    ;
                    pug_debug_line = 149;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div class=\"input-group\">";
                    ;
                    pug_debug_line = 150;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div>";
                    ;
                    pug_debug_line = 151;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<input" + (" class=\"folder-names\"" + mainPage_pug_attr("readonly", true, true, false) + mainPage_pug_attr("value", folder.Name, true, false) + mainPage_pug_attr("id", folder.Name, true, false)) + "/></div>";
                    ;
                    pug_debug_line = 152;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div class=\"icon-group\" id=\"icon-group\">";
                    ;
                    pug_debug_line = 153;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div" + (" class=\"edit-button radius\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\"") + ">";
                    ;
                    pug_debug_line = 154;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<svg" + (" class=\"block\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\"") + ">";
                    ;
                    pug_debug_line = 155;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<g" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"") + ">";
                    ;
                    pug_debug_line = 156;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<path" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\"") + "></path>";
                    ;
                    pug_debug_line = 157;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<g" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" fill=\"#ffffff\"") + ">";
                    ;
                    pug_debug_line = 158;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<path" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\"") + "></path></g></g></svg></div>";
                    ;
                    pug_debug_line = 160;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div" + (" class=\"small-plus radius cross\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"delete-folder\"") + "></div></div></div>";
                  }
                }
              }).call(this);
            }

            pug_html = pug_html + "</div>";
          }

          ;
          pug_debug_line = 162;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"horizontal\"></div>";
          ;
          pug_debug_line = 164;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<a class=\"block titles-category\" id=\"sendedUn\">";
          ;
          pug_debug_line = 164;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "\u0418\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435</a></div></div>";
        }

        ;
        pug_debug_line = 166;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.letterColumn) {
          ;
          pug_debug_line = 167;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"column large-4 tab-12 mob-12 main-container\">";
          ;
          pug_debug_line = 169;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<a id=\"back-to-folders\">";
          ;
          pug_debug_line = 169;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "< \u041F\u0430\u043F\u043A\u0438</a>";
          ;
          pug_debug_line = 171;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"bricks-wrapper h-group main-columns project_scroll\" name=\"letters\">";
          ;
          pug_debug_line = 172;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

          if (locals.selectFolder) {
            ;
            pug_debug_line = 173;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.selectFolder

            ;
            (function () {
              var $$obj = locals.selectFolder;

              if ('number' == typeof $$obj.length) {
                for (var pug_index8 = 0, $$l = $$obj.length; pug_index8 < $$l; pug_index8++) {
                  var letter = $$obj[pug_index8];
                  ;
                  pug_debug_line = 174;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<article" + (" class=\"brick entry format-standard\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 175;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__text\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 176;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__header\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 177;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<h1" + (" class=\"entry__title max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 177;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp) + "</h1></div>";
                  ;
                  pug_debug_line = 179;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

                  if (!letter.IsWatched) {
                    ;
                    pug_debug_line = 180;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div" + (" class=\"h-full-width not-watched\"" + mainPage_pug_attr("id", letter.Id, true, false)) + "></div>";
                  }

                  ;
                  pug_debug_line = 181;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 182;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 182;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "Получатель: ";
                  ;
                  pug_debug_line = 182;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp) + "</p></div>";
                  ;
                  pug_debug_line = 183;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 184;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 184;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "Отправитель: ";
                  ;
                  pug_debug_line = 184;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp) + "</p></div>";
                  ;
                  pug_debug_line = 185;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 186;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 186;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp) + "</p></div></div></article>";
                }
              } else {
                var $$l = 0;

                for (var pug_index8 in $$obj) {
                  $$l++;
                  var letter = $$obj[pug_index8];
                  ;
                  pug_debug_line = 174;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<article" + (" class=\"brick entry format-standard\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 175;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__text\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 176;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__header\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 177;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<h1" + (" class=\"entry__title max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 177;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp) + "</h1></div>";
                  ;
                  pug_debug_line = 179;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

                  if (!letter.IsWatched) {
                    ;
                    pug_debug_line = 180;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div" + (" class=\"h-full-width not-watched\"" + mainPage_pug_attr("id", letter.Id, true, false)) + "></div>";
                  }

                  ;
                  pug_debug_line = 181;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 182;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 182;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "Получатель: ";
                  ;
                  pug_debug_line = 182;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp) + "</p></div>";
                  ;
                  pug_debug_line = 183;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 184;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 184;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "Отправитель: ";
                  ;
                  pug_debug_line = 184;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp) + "</p></div>";
                  ;
                  pug_debug_line = 185;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 186;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 186;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp) + "</p></div></div></article>";
                }
              }
            }).call(this);
          }

          pug_html = pug_html + "</div></div>";
        }

        ;
        pug_debug_line = 188;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.oneLetterColumn) {
          ;
          pug_debug_line = 189;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"column large-6 tab-12 mob-12 main-container\">";
          ;
          pug_debug_line = 190;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"main-columns project_scroll\">";
          ;
          pug_debug_line = 191;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

          if (locals.buttonPlus && letter.Id !== undefined) {
            ;
            pug_debug_line = 192;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"letter-board\">";
            ;
            pug_debug_line = 193;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<a id=\"back-to-letters\">";
            ;
            pug_debug_line = 193;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "< \u041A \u043F\u0430\u043F\u043A\u0430\u043C</a>";
            ;
            pug_debug_line = 194;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"letter-board-small\">";
            ;
            pug_debug_line = 195;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"delete-letter-button radius\" id=\"button-remove-letter\">";
            ;
            pug_debug_line = 196;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<img class=\"icon-trash\" height=\"12px\" width=\"12px\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAmklEQVRIie2VMQoCMRBF/1c8hFcUwc5C8ABewMstbGVhZy0Iz2YDIbvuxjWyTX41mWT+G4aBSBMC9kBLXzfgCHjKY8x8N2Cc6vALoOlMTsAmyq+Bc3fXjHk4KmJ2J0PGtiVpVdJ0EfU2oMCotrbv4fD3ES0LCJuQG38NKKEKqIAKqICZgGcI4r8hJ07rPwEu6aNMvSRdbT/i5BtRtIPz+Hl+WgAAAABJRU5ErkJggg==\"/></div>";
            ;
            pug_debug_line = 197;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"small-plus radius\" id=\"button-form-add-letter-folder\"></div>";
            ;
            pug_debug_line = 198;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"small-plus radius cross letter-board-last-element\" id=\"delete-folder\"></div></div></div>";
          }

          ;
          pug_debug_line = 200;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"letter-container\">";
          ;
          pug_debug_line = 201;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<h3" + (mainPage_pug_attr("id", letter.Id, true, false) + " name=\"title-of-current\"") + ">";
          ;
          pug_debug_line = 201;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp) + "</h3>";
          ;
          pug_debug_line = 202;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<p class=\"lead\">";
          ;
          pug_debug_line = 202;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp) + "</p>";
          ;
          pug_debug_line = 203;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<p class=\"lead\">";
          ;
          pug_debug_line = 203;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp) + "</p>";
          ;
          pug_debug_line = 204;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<p class=\"lead\">";
          ;
          pug_debug_line = 204;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp) + "</p></div></div></div>";
        }

        pug_html = pug_html + "</div></div>";
        ;
        pug_debug_line = 207;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<!--\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F-->";
        ;
        pug_debug_line = 208;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"form-add-folder-up hide\">";
        ;
        pug_debug_line = 209;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"plus radius cross cross-modal\" id=\"remove-folder-recived\"></div>";
        ;
        pug_debug_line = 210;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<form name=\"button-of-recived-folder\">";
        ;
        pug_debug_line = 211;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\">";
        ;
        pug_debug_line = 212;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"folderName\" type=\"text\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\"" + mainPage_pug_attr("required", true, true, false)) + "/>";
        ;
        pug_debug_line = 213;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<button class=\"btn btn--medium btn--primary h-full-width\" type=\"submit\">";
        ;
        pug_debug_line = 213;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button></div></form></div>";
        ;
        pug_debug_line = 215;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<!--\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0432 \u043F\u0430\u043F\u043A\u0443-->";
        ;
        pug_debug_line = 216;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"hide form-add-folder-up\">";
        ;
        pug_debug_line = 217;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"plus radius cross cross-modal\" id=\"remove-form-add-folder-up\"></div>";
        ;
        pug_debug_line = 218;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<form id=\"choose-folder\">";
        ;
        pug_debug_line = 219;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\">";
        ;
        pug_debug_line = 220;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<select class=\"h-full-width\" name=\"inFolderName\">";
        ;
        pug_debug_line = 221;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.recivedFolder) {
          ;
          pug_debug_line = 222;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.recivedFolder

          ;
          (function () {
            var $$obj = locals.recivedFolder;

            if ('number' == typeof $$obj.length) {
              for (var pug_index9 = 0, $$l = $$obj.length; pug_index9 < $$l; pug_index9++) {
                var folder = $$obj[pug_index9];
                ;
                pug_debug_line = 223;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<option" + mainPage_pug_attr("value", folder.Name, true, false) + ">";
                ;
                pug_debug_line = 223;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = folder.Name) ? "" : pug_interp) + "</option>";
              }
            } else {
              var $$l = 0;

              for (var pug_index9 in $$obj) {
                $$l++;
                var folder = $$obj[pug_index9];
                ;
                pug_debug_line = 223;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<option" + mainPage_pug_attr("value", folder.Name, true, false) + ">";
                ;
                pug_debug_line = 223;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = folder.Name) ? "" : pug_interp) + "</option>";
              }
            }
          }).call(this);
        }

        pug_html = pug_html + "</select></div>";
        ;
        pug_debug_line = 226;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\">";
        ;
        pug_debug_line = 227;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<button class=\"btn h-full-width\" type=\"submit\">";
        ;
        pug_debug_line = 227;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button></div></form></div>";
      }
    }).call(this, "letter" in locals_for_with ? locals_for_with.letter : typeof letter !== "undefined" ? letter : undefined);
  } catch (err) {
    mainPage_pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
  }

  ;
  return pug_html;
}


// CONCATENATED MODULE: ./src/Views/MainPageView.js
function MainPageView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MainPageView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MainPageView_createClass(Constructor, protoProps, staticProps) { if (protoProps) MainPageView_defineProperties(Constructor.prototype, protoProps); if (staticProps) MainPageView_defineProperties(Constructor, staticProps); return Constructor; }






var MainPageView_MainPageView = /*#__PURE__*/function () {
  function MainPageView(element) {
    MainPageView_classCallCheck(this, MainPageView);

    this.element = element;
  }

  MainPageView_createClass(MainPageView, [{
    key: "render",
    value: function render(data) {
      var _document, _document2, _document3, _document4, _document5, _document6, _document7, _document8, _document9, _document10, _document11, _document12, _document13, _document14, _document15, _document16, _document19, _document20, _document22, _document23, _document24, _document25, _document26;

      if (!data || !data.letterList || !data.folderList) {
        src_EventBus.emit(Events.mainPageView.needData, 'Входящие');
        src_EventBus.emit(Events.mainPageView.recivedFolder);
        return;
      }

      this.element.innerHTML = '';
      Views_NavbarView.render();
      this.element.insertAdjacentHTML('beforeend', mainPage_template(data));
      var addFolderRecived = (_document = document) === null || _document === void 0 ? void 0 : _document.getElementById('add-folder-recived');
      var buttonOfRecivedFolder = (_document2 = document) === null || _document2 === void 0 ? void 0 : _document2.getElementsByClassName('form-add-folder-up')[0];
      var page = (_document3 = document) === null || _document3 === void 0 ? void 0 : _document3.getElementsByClassName('main-page')[0];
      addFolderRecived === null || addFolderRecived === void 0 ? void 0 : addFolderRecived.addEventListener('click', function (event) {
        event.preventDefault();
        addFolderRecived.classList.toggle('hide');
        buttonOfRecivedFolder.classList.toggle('hide');
        page.classList.toggle('blur');
      });
      var removeFolderRecived = (_document4 = document) === null || _document4 === void 0 ? void 0 : _document4.getElementById('remove-folder-recived');
      var form = (_document5 = document) === null || _document5 === void 0 ? void 0 : _document5.getElementsByClassName('form-add-folder-up')[0];
      var pageBlock = (_document6 = document) === null || _document6 === void 0 ? void 0 : _document6.getElementsByClassName('main-page')[0];
      removeFolderRecived.addEventListener('click', function (event) {
        event.preventDefault();
        form.classList.toggle('hide');
        pageBlock.classList.toggle('blur');
        addFolderRecived.classList.toggle('hide');
      });
      var addFolderForm = (_document7 = document) === null || _document7 === void 0 ? void 0 : _document7.getElementById('button-form-add-letter-folder');
      var buttonFolder = (_document8 = document) === null || _document8 === void 0 ? void 0 : _document8.getElementsByClassName('form-add-folder-up')[1];
      addFolderForm === null || addFolderForm === void 0 ? void 0 : addFolderForm.addEventListener('click', function (event) {
        event.preventDefault();
        buttonFolder.classList.toggle('hide');
        page.classList.toggle('blur');
      });
      var removeFolderForm = (_document9 = document) === null || _document9 === void 0 ? void 0 : _document9.getElementById('remove-form-add-folder-up');
      removeFolderForm.addEventListener('click', function (event) {
        event.preventDefault();
        buttonFolder.classList.toggle('hide');
        page.classList.toggle('blur');
      });
      var summaryRecived = (_document10 = document) === null || _document10 === void 0 ? void 0 : _document10.getElementById('summary-recived');
      summaryRecived === null || summaryRecived === void 0 ? void 0 : summaryRecived.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.mainPageView.recivedFolder);
      });
      var folderRecivedChoose = (_document11 = document) === null || _document11 === void 0 ? void 0 : _document11.getElementById('recived');
      folderRecivedChoose === null || folderRecivedChoose === void 0 ? void 0 : folderRecivedChoose.addEventListener('click', function (event) {
        var current = folderRecivedChoose.querySelector("input#".concat(event.target.id));

        if (event.target.getAttribute('name') === 'delete-folder') {
          var deleteName = new FormData();
          deleteName.append('folderName', event.target.id);
          src_EventBus.emit(Events.mainPageView.deleteFolder, deleteName);
          src_EventBus.emit(Events.mainPageView.recivedFolder);
        }

        if (event.target.getAttribute('name') === 'edit-folder') {
          current.removeAttribute('readonly');
          current.classList.toggle('folder-names-focus');
          current.addEventListener('change', function () {
            var newTitle = current.value.trim();
            var newName = new FormData();
            newName.append('oldName', current.id);
            newName.append('newName', newTitle);
            current.setAttribute('readonly', 'readonly');
            current.id = newTitle;
            current.value = newTitle;
            src_EventBus.emit(Events.mainPageView.renameFolder, newName);
          });
        }

        if (event.target.tagName === 'INPUT' && current.hasAttribute('readonly')) {
          src_EventBus.emit(Events.mainPageView.recivedFolder);
          src_EventBus.emit(Events.mainPageView.selectFolder, event.target.id, 'recived');
        }
      });
      var letters = (_document12 = document) === null || _document12 === void 0 ? void 0 : _document12.getElementsByName('letters')[0];
      letters === null || letters === void 0 ? void 0 : letters.addEventListener('click', function (event) {
        if (event.target.getAttribute('name') === 'letters') {
          return;
        }

        if (event.target.getAttribute('name') === 'search-group') {
          return;
        }

        if (event.target.getAttribute('name') === 'search-target') {
          return;
        }

        src_EventBus.emit(Events.mainPageView.selectLetter, event.target.id);
        var id = new FormData();
        id.append('id', event.target.id);
        src_EventBus.emit(Events.mainPageView.sendWrittenLetter, id);
      });
      var recivedUn = (_document13 = document) === null || _document13 === void 0 ? void 0 : _document13.getElementById('recivedUn');
      recivedUn === null || recivedUn === void 0 ? void 0 : recivedUn.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.mainPageView.recivedUn);
      });
      var sendedUn = (_document14 = document) === null || _document14 === void 0 ? void 0 : _document14.getElementById('sendedUn');
      sendedUn === null || sendedUn === void 0 ? void 0 : sendedUn.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.mainPageView.sendedUn);
      });
      var addFolderButton = (_document15 = document) === null || _document15 === void 0 ? void 0 : _document15.getElementsByName('button-of-recived-folder')[0];
      addFolderButton.addEventListener('submit', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.mainPageView.addFolderRecived, new FormData(addFolderButton));
      });
      var chooseFolder = (_document16 = document) === null || _document16 === void 0 ? void 0 : _document16.getElementById('choose-folder');
      chooseFolder.addEventListener('submit', function (event) {
        var _document17, _document18;

        event.preventDefault();
        var folderName = (_document17 = document) === null || _document17 === void 0 ? void 0 : _document17.getElementsByName('inFolderName')[0];
        var currentName = (_document18 = document) === null || _document18 === void 0 ? void 0 : _document18.getElementsByName('title-of-current')[0];
        var folder = folderName.value;
        var current = currentName.id;
        var chooseFolderData = new FormData();
        chooseFolderData.append('letterId', current);
        chooseFolderData.append('folderName', folder);
        var type = 'recived';
        var method = 'PUT';
        src_EventBus.emit(Events.mainPageView.inFolder, method, chooseFolderData, type);
      });
      var deleteFolder = (_document19 = document) === null || _document19 === void 0 ? void 0 : _document19.getElementById('delete-folder');
      deleteFolder === null || deleteFolder === void 0 ? void 0 : deleteFolder.addEventListener('click', function (event) {
        event.preventDefault();
        var currentName = document.getElementsByName('title-of-current')[0];
        var current = currentName.id;
        var chooseFolderData = new FormData();
        chooseFolderData.append('letterId', current);
        var type = 'recived';
        var method = 'DELETE';
        src_EventBus.emit(Events.mainPageView.inFolder, method, chooseFolderData, type);
      });
      var deleteLetter = (_document20 = document) === null || _document20 === void 0 ? void 0 : _document20.getElementById('button-remove-letter');
      deleteLetter === null || deleteLetter === void 0 ? void 0 : deleteLetter.addEventListener('click', function (event) {
        var _document21;

        event.preventDefault();
        var currentName = (_document21 = document) === null || _document21 === void 0 ? void 0 : _document21.getElementsByName('title-of-current')[0];
        var current = currentName.id;
        var chooseFolderData = new FormData();
        chooseFolderData.append('id', current);
        src_EventBus.emit(Events.mainPageView.deleteLetter, chooseFolderData);
      });
      var backToFolders = (_document22 = document) === null || _document22 === void 0 ? void 0 : _document22.getElementById('back-to-folders');
      backToFolders === null || backToFolders === void 0 ? void 0 : backToFolders.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.mainPageView.backToFolders);
      });
      var backToLetters = (_document23 = document) === null || _document23 === void 0 ? void 0 : _document23.getElementById('back-to-letters');
      backToLetters === null || backToLetters === void 0 ? void 0 : backToLetters.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.mainPageView.backToLetters);
      });
      var searchButton = (_document24 = document) === null || _document24 === void 0 ? void 0 : _document24.getElementById('search-button');
      var searchInput = (_document25 = document) === null || _document25 === void 0 ? void 0 : _document25.getElementById('search-input');
      searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener('click', function (event) {
        event.preventDefault();
        var similar = searchInput.value.trim();
        src_EventBus.emit(Events.mainPageView.startSearch, similar);
      });
      var searchResultList = (_document26 = document) === null || _document26 === void 0 ? void 0 : _document26.getElementById('search-result-list');
      searchResultList === null || searchResultList === void 0 ? void 0 : searchResultList.addEventListener('click', function (event) {
        event.preventDefault();

        if (event.target.getAttribute('name') === 'search-target') {
          var what = event.target.getAttribute('role');
          var value = event.target.id;
          src_EventBus.emit(Events.mainPageView.resultSearch, what, value);
        }
      });
    }
  }]);

  return MainPageView;
}();


// CONCATENATED MODULE: ./src/Controllers/MainPageController.js
function MainPageController_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MainPageController_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MainPageController_createClass(Constructor, protoProps, staticProps) { if (protoProps) MainPageController_defineProperties(Constructor.prototype, protoProps); if (staticProps) MainPageController_defineProperties(Constructor, staticProps); return Constructor; }




var MainPageController_MainPageController = /*#__PURE__*/function () {
  function MainPageController(MainPageView) {
    var _this = this;

    MainPageController_classCallCheck(this, MainPageController);

    this.mainPageView = MainPageView;
    this.data = {};
    this.data.searchResult = {};
    this.data.screenWidth = window.innerWidth;
    this.data.folderColumn = true;
    this.data.letterColumn = false;
    this.data.oneLetterColumn = false;
    src_EventBus.on(Events.letterModelEvents.getLetter.success, function (data) {
      _this.data.letter = data;
    });
    src_EventBus.on(Events.letterModelEvents.getLetterList.success, function (data) {
      _this.data.letterList = data;
    });
    src_EventBus.on(Events.letterModelEvents.getFolderList.success, function (data) {
      _this.data.folderList = data;
    });
    src_EventBus.on(Events.mainPageView.needData, function () {
      _this.data.letter = {};

      var h1 = function h1(data) {
        _this.data.selectFolder = data;

        _this.mainPageView.render(_this.data);

        src_EventBus.off(Events.letterModelEvents.getLetterList.success, h1);
      };

      src_EventBus.emit(Events.mainPageController.needGetFolderList);
      src_EventBus.emit(Events.mainPageController.needGetLetterList, 'Входящие');
      src_EventBus.on(Events.letterModelEvents.getLetterList.success, h1);
    });
    src_EventBus.on(Events.mainPageView.selectLetter, function (letterId) {
      _this.data.letter = _this.data.selectFolder[letterId];
      _this.data.buttonPlus = true;
      _this.data.folderColumn = false;
      _this.data.letterColumn = false;
      _this.data.oneLetterColumn = true;

      _this.mainPageView.render(_this.data);
    });
    src_EventBus.on(Events.letterModelEvents.sendLetter.success, function () {
      src_EventBus.emit(Events.global.redirect, {
        path: Paths.mainPage
      });
    });
    src_EventBus.on(Events.mainPageView.recivedFolder, function () {
      src_EventBus.emit(Events.mainPageController.recivedFolder);

      var h = function h(data) {
        src_EventBus.off(Events.letterModelEvents.recivedFolder.success, h);
        _this.data.recivedFolder = data;
        _this.data.recivedFolderRecived = true;
        _this.data.folderColumn = true;
        _this.data.letterColumn = false;
        _this.data.oneLetterColumn = false;

        _this.mainPageView.render(_this.data);
      };

      src_EventBus.on(Events.letterModelEvents.recivedFolder.success, h);
    });
    src_EventBus.on(Events.mainPageView.selectFolder, function (folder, type) {
      src_EventBus.emit(Events.mainPageController.selectFolder, folder, type);

      var h = function h(data) {
        src_EventBus.off(Events.letterModelEvents.selectFolder.success, h);
        _this.data.selectFolder = data;
        _this.data.folderColumn = false;
        _this.data.letterColumn = true;
        _this.data.oneLetterColumn = false;

        _this.mainPageView.render(_this.data);
      };

      var h2 = function h2() {
        src_EventBus.off(Events.letterModelEvents.selectFolder.fail, h2);
        _this.data.selectFolder = new Map();
        _this.data.folderColumn = false;
        _this.data.letterColumn = true;
        _this.data.oneLetterColumn = false;

        _this.mainPageView.render(_this.data);
      };

      src_EventBus.on(Events.letterModelEvents.selectFolder.success, h);
      src_EventBus.on(Events.letterModelEvents.selectFolder.fail, h2);
    });
    src_EventBus.on(Events.mainPageView.recivedUn, function () {
      src_EventBus.emit(Events.mainPageController.recivedUn);

      var h = function h(data) {
        src_EventBus.off(Events.letterModelEvents.recivedUn.success, h);
        _this.data.selectFolder = data;
        _this.data.folderColumn = false;
        _this.data.letterColumn = true;
        _this.data.oneLetterColumn = false;

        _this.mainPageView.render(_this.data);
      };

      src_EventBus.on(Events.letterModelEvents.recivedUn.success, h);
    });
    src_EventBus.on(Events.mainPageView.sendedUn, function () {
      src_EventBus.emit(Events.mainPageController.sendedUn);

      var h = function h(data) {
        src_EventBus.off(Events.letterModelEvents.sendedUn.success, h);
        _this.data.selectFolder = data;
        _this.data.folderColumn = false;
        _this.data.letterColumn = true;
        _this.data.oneLetterColumn = false;

        _this.mainPageView.render(_this.data);
      };

      src_EventBus.on(Events.letterModelEvents.sendedUn.success, h);
    });
    src_EventBus.on(Events.mainPageView.addFolderRecived, function (nameOfFolder) {
      src_EventBus.emit(Events.mainPageController.addFolderRecived, nameOfFolder);

      var h = function h() {
        src_EventBus.off(Events.letterModelEvents.addFolderRecived.success, h);
        src_EventBus.emit(Events.mainPageView.recivedFolder);
      };

      src_EventBus.on(Events.letterModelEvents.addFolderRecived.success, h);
    });
    src_EventBus.on(Events.mainPageView.addFolderSended, function (nameOfFolder) {
      src_EventBus.emit(Events.mainPageController.addFolderSended, nameOfFolder);

      var h = function h() {
        src_EventBus.off(Events.letterModelEvents.addFolderSended.success, h);
        src_EventBus.emit(Events.mainPageView.sendedFolder);
      };

      src_EventBus.on(Events.letterModelEvents.addFolderSended.success, h);
    });
    src_EventBus.on(Events.mainPageView.sendWrittenLetter, function (id) {
      src_EventBus.emit(Events.mainPageController.sendWrittenLetter, id);

      var h = function h(data) {
        src_EventBus.off(Events.letterModelEvents.sendWrittenLetter.success, h);
        _this.data.selectFolder = data;

        _this.mainPageView.render(_this.data);
      };

      src_EventBus.on(Events.letterModelEvents.sendWrittenLetter.success, h);
    });
    src_EventBus.on(Events.mainPageView.inFolder, function (method, folder, type) {
      src_EventBus.emit(Events.mainPageController.inFolder, method, folder, type);

      var h = function h() {
        src_EventBus.off(Events.letterModelEvents.inFolder.success, h);
      };

      src_EventBus.on(Events.letterModelEvents.inFolder.success, h);
    });
    src_EventBus.on(Events.mainPageView.renameFolder, function (newName) {
      src_EventBus.emit(Events.mainPageController.renameFolder, newName);

      var h = function h() {
        src_EventBus.off(Events.letterModelEvents.renameFolder.success, h);
        src_EventBus.emit(Events.mainPageView.recivedFolder);
      };

      src_EventBus.on(Events.letterModelEvents.renameFolder.success, h);
      src_EventBus.on(Events.letterModelEvents.renameFolder.fail, h);
    });
    src_EventBus.on(Events.mainPageView.deleteFolder, function (deleteName) {
      src_EventBus.emit(Events.mainPageController.deleteFolder, deleteName);

      var h = function h() {
        src_EventBus.off(Events.letterModelEvents.deleteFolder.success, h);
        src_EventBus.emit(Events.mainPageView.recivedFolder);
      };

      src_EventBus.on(Events.letterModelEvents.deleteFolder.success, h);
      src_EventBus.on(Events.letterModelEvents.deleteFolder.fail, h);
    });
    src_EventBus.on(Events.mainPageView.deleteLetter, function (deleteName) {
      src_EventBus.emit(Events.mainPageController.deleteLetter, deleteName);

      var h = function h() {
        src_EventBus.off(Events.letterModelEvents.deleteLetter.success, h);
        _this.data.letter = null;

        _this.mainPageView.render(_this.data);
      };

      src_EventBus.on(Events.letterModelEvents.deleteLetter.success, h);
      src_EventBus.on(Events.letterModelEvents.deleteLetter.fail, h);
    });
    src_EventBus.on(Events.mainPageView.backToFolders, function () {
      _this.data.folderColumn = true;
      _this.data.letterColumn = false;
      _this.data.oneLetterColumn = false;

      _this.mainPageView.render(_this.data);
    });
    src_EventBus.on(Events.mainPageView.backToLetters, function () {
      _this.data.folderColumn = false;
      _this.data.letterColumn = true;
      _this.data.oneLetterColumn = false;

      _this.mainPageView.render(_this.data);
    });
    src_EventBus.on(Events.mainPageView.startSearch, function (similar) {
      src_EventBus.emit(Events.mainPageController.startSearch, similar);

      var h = function h(data) {
        src_EventBus.off(Events.letterModelEvents.startSearch.success, h);
        _this.data.searchResult = data;

        _this.mainPageView.render(_this.data);
      };

      src_EventBus.on(Events.letterModelEvents.startSearch.success, h);
    });
    src_EventBus.on(Events.mainPageView.resultSearch, function (what, value) {
      src_EventBus.emit(Events.mainPageController.resultSearch, what, value);

      var h = function h() {
        src_EventBus.off(Events.letterModelEvents.resultSearch.success, h); // рендер
        // this.mainPageView.render(this.data);
      };

      src_EventBus.on(Events.letterModelEvents.resultSearch.success, h);
    });
  }

  MainPageController_createClass(MainPageController, [{
    key: "setView",
    value: function setView(profileView) {
      this.mainPageView = profileView;
    }
  }, {
    key: "setModel",
    value: function setModel(model) {
      this.model = model;
    }
  }]);

  return MainPageController;
}();

/* harmony default export */ var Controllers_MainPageController = (new MainPageController_MainPageController());
// CONCATENATED MODULE: ./src/Views/PugTemplates/SendLetterForm.js
function SendLetterForm_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SendLetterForm_typeof = function _typeof(obj) { return typeof obj; }; } else { SendLetterForm_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SendLetterForm_typeof(obj); }

function SendLetterForm_pug_attr(t, e, n, r) {
  if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
  if (!0 === e) return " " + (r ? t : t + '="' + t + '"');

  var f = SendLetterForm_typeof(e);

  return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = SendLetterForm_pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'";
}

function SendLetterForm_pug_escape(e) {
  var a = "" + e,
      t = SendLetterForm_pug_match_html.exec(a);
  if (!t) return e;
  var r,
      c,
      n,
      s = "";

  for (r = t.index, c = 0; r < a.length; r++) {
    switch (a.charCodeAt(r)) {
      case 34:
        n = "&quot;";
        break;

      case 38:
        n = "&amp;";
        break;

      case 60:
        n = "&lt;";
        break;

      case 62:
        n = "&gt;";
        break;

      default:
        continue;
    }

    c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
  }

  return c !== r ? s + a.substring(c, r) : s;
}

var SendLetterForm_pug_match_html = /["&<>]/;

function SendLetterForm_pug_rethrow(n, e, r, t) {
  if (!(n instanceof Error)) throw n;
  if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;

  try {
    t = t || __webpack_require__(3).readFileSync(e, "utf8");
  } catch (e) {
    SendLetterForm_pug_rethrow(n, null, r);
  }

  var i = 3,
      a = t.split("\n"),
      o = Math.max(r - i, 0),
      h = Math.min(a.length, r + i),
      i = a.slice(o, h).map(function (n, e) {
    var t = e + o + 1;
    return (t == r ? "  > " : "    ") + t + "| " + n;
  }).join("\n");
  throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n;
}

function SendLetterForm_template(locals) {
  var pug_html = "",
      pug_mixins = {},
      pug_interp;
  var pug_debug_filename, pug_debug_line;

  try {
    var pug_debug_sources = {
      "./src/Views/PugTemplates/SendLetterForm.pug": "section(class=\"s-content__primary site-page\")\n    div(class=\"row\")\n        div(class=\"column large-12\")\n            div\n                h1(class=\"s-content__title\") Написать\n                form(class=\"s-content__form\")\n                    div(class=\"form-field\")\n                        input(name=\"to\" type=\"text\" class=\"h-full-width\" placeholder=\"Кому\" value=\"\" autocomplete=\"off\" required)\n                    div(class=\"form-field\")\n                        input(name=\"theme\" type=\"text\" class=\"h-full-width\" placeholder=\"Тема\" value=\"\" autocomplete=\"off\" required)\n\n                    div(class=\"message form-field\")\n                        textarea(name=\"text\" type=\"text\" class=\"h-full-width\" placeholder=\"Текст письма\" autocomplete=\"off\" required)\n\n                    div(class=\"row\")\n                        div(class=\"column large-6\")\n                            button(name=\"back\" class=\"submit btn btn--primary btn--medium h-full-width\") Назад\n                        div(class=\"column large-6\")\n                            button(type=\"submit\" class=\"submit btn btn--primary btn--medium h-full-width\") Отправить\n\n\n"
    };
    ;
    pug_debug_line = 1;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<section class=\"s-content__primary site-page\">";
    ;
    pug_debug_line = 2;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"row\">";
    ;
    pug_debug_line = 3;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"column large-12\">";
    ;
    pug_debug_line = 4;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div>";
    ;
    pug_debug_line = 5;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<h1 class=\"s-content__title\">";
    ;
    pug_debug_line = 5;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C</h1>";
    ;
    pug_debug_line = 6;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<form class=\"s-content__form\">";
    ;
    pug_debug_line = 7;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 8;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"to\" type=\"text\" placeholder=\"Кому\" value=\"\" autocomplete=\"off\"" + SendLetterForm_pug_attr("required", true, true, false)) + "/></div>";
    ;
    pug_debug_line = 9;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 10;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"theme\" type=\"text\" placeholder=\"Тема\" value=\"\" autocomplete=\"off\"" + SendLetterForm_pug_attr("required", true, true, false)) + "/></div>";
    ;
    pug_debug_line = 12;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"message form-field\">";
    ;
    pug_debug_line = 13;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<textarea" + (" class=\"h-full-width\"" + " name=\"text\" type=\"text\" placeholder=\"Текст письма\" autocomplete=\"off\"" + SendLetterForm_pug_attr("required", true, true, false)) + "></textarea></div>";
    ;
    pug_debug_line = 15;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"row\">";
    ;
    pug_debug_line = 16;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"column large-6\">";
    ;
    pug_debug_line = 17;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<button class=\"submit btn btn--primary btn--medium h-full-width\" name=\"back\">";
    ;
    pug_debug_line = 17;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "\u041D\u0430\u0437\u0430\u0434</button></div>";
    ;
    pug_debug_line = 18;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"column large-6\">";
    ;
    pug_debug_line = 19;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<button class=\"submit btn btn--primary btn--medium h-full-width\" type=\"submit\">";
    ;
    pug_debug_line = 19;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C</button></div></div></form></div></div></div></section>";
  } catch (err) {
    SendLetterForm_pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
  }

  ;
  return pug_html;
}


// CONCATENATED MODULE: ./src/Views/SendLetterView.js
function SendLetterView_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SendLetterView_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SendLetterView_createClass(Constructor, protoProps, staticProps) { if (protoProps) SendLetterView_defineProperties(Constructor.prototype, protoProps); if (staticProps) SendLetterView_defineProperties(Constructor, staticProps); return Constructor; }






var SendLetterView_SendLetterView = /*#__PURE__*/function () {
  function SendLetterView(element) {
    SendLetterView_classCallCheck(this, SendLetterView);

    this.element = element;
    src_EventBus.on(Events.letterModelEvents.sendLetter.fail, SendLetterView.showErrors.bind(this));
  }

  SendLetterView_createClass(SendLetterView, [{
    key: "render",
    value: function render(data) {
      var newdata = data || {};
      this.element.innerHTML = '';
      Views_NavbarView.render();
      this.element.insertAdjacentHTML('beforeend', SendLetterForm_template(newdata));
      var form = document.getElementsByTagName('FORM')[0];
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.sendLetterView.sendLetter, new FormData(form));
      });
      var backButton = document.getElementsByName('back')[0];
      backButton.addEventListener('click', function (event) {
        event.preventDefault();
        src_EventBus.emit(Events.global.goBack);
      });
    }
  }], [{
    key: "showErrors",
    value: function showErrors(errors) {
      var reciever = document.getElementsByName('to')[0];
      var theme = document.getElementsByName('theme')[0];
      var text = document.getElementsByName('text')[0];

      if (errors.to) {
        reciever.value = '';
        reciever.placeholder = errors.to;
      }

      if (errors.theme) {
        theme.value = '';
        theme.placeholder = errors.theme;
      }

      if (errors.text) {
        text.value = '';
        text.placeholder = errors.text;
      }
    }
  }]);

  return SendLetterView;
}();


// CONCATENATED MODULE: ./src/Controllers/NavbarController.js
function NavbarController_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function NavbarController_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function NavbarController_createClass(Constructor, protoProps, staticProps) { if (protoProps) NavbarController_defineProperties(Constructor.prototype, protoProps); if (staticProps) NavbarController_defineProperties(Constructor, staticProps); return Constructor; }




var NavbarController_NavbarController = /*#__PURE__*/function () {
  function NavbarController() {
    var _this = this;

    NavbarController_classCallCheck(this, NavbarController);

    src_EventBus.on(Events.navbarView.needData, function () {
      _this.navbarView.render({
        avatar: _this.userModel.user.avatar
      });
    });
  }

  NavbarController_createClass(NavbarController, [{
    key: "setNavbarView",
    value: function setNavbarView(navbarView) {
      this.navbarView = navbarView;
    }
  }, {
    key: "setUserModel",
    value: function setUserModel(userModel) {
      this.userModel = userModel;
    }
  }]);

  return NavbarController;
}();

/* harmony default export */ var Controllers_NavbarController = (new NavbarController_NavbarController());
// CONCATENATED MODULE: ./src/Controllers/ProfileController.js
function ProfileController_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ProfileController_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ProfileController_createClass(Constructor, protoProps, staticProps) { if (protoProps) ProfileController_defineProperties(Constructor.prototype, protoProps); if (staticProps) ProfileController_defineProperties(Constructor, staticProps); return Constructor; }




var ProfileController_ProfileController = /*#__PURE__*/function () {
  function ProfileController() {
    var _this = this;

    ProfileController_classCallCheck(this, ProfileController);

    src_EventBus.on(Events.profileViewEvents.needUserData, function () {
      _this.profileView.render(_this.model.user);
    });
  }

  ProfileController_createClass(ProfileController, [{
    key: "setView",
    value: function setView(profileView) {
      this.profileView = profileView;
    }
  }, {
    key: "setModel",
    value: function setModel(model) {
      this.model = model;
    }
  }]);

  return ProfileController;
}();

/* harmony default export */ var Controllers_ProfileController = (new ProfileController_ProfileController());
// CONCATENATED MODULE: ./src/Controllers/SignInController.js
function SignInController_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var SignInController_SignInController = function SignInController() {
  SignInController_classCallCheck(this, SignInController);

  src_EventBus.on(Events.userModelEvents.signIn.success, function () {
    src_EventBus.emit(Events.global.redirect, {
      path: Paths.mainPage
    });
  });
};

/* harmony default export */ var Controllers_SignInController = (new SignInController_SignInController());
// CONCATENATED MODULE: ./src/Controllers/SignUpController.js
function SignUpController_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var SignUpController_SignUpController = function SignUpController() {
  SignUpController_classCallCheck(this, SignUpController);

  src_EventBus.on(Events.userModelEvents.signUp.success, function (user) {
    src_EventBus.emit(Events.global.redirect, {
      path: Paths.mainPage,
      data: user
    });
  });
};

/* harmony default export */ var Controllers_SignUpController = (new SignUpController_SignUpController());
// CONCATENATED MODULE: ./src/main.js

































var router = new Router_Router();
var signInView = new SignInView_SignInView(document.body);
var signUpView = new SignUpView_SignUpView(document.body);
var profileView = new ProfileView_ProfileView(document.body);
var main_profileEditView = new ProfileEditView_ProfileEditView(document.body);
var mainPageView = new MainPageView_MainPageView(document.body);
var sendLetterView = new SendLetterView_SendLetterView(document.body);
Models_UserModel.setUrl('http://localhost:8080');
var letterModel = new LetterModel_LetterModel('http://localhost:8080');
Controllers_MainPageController.setView(mainPageView);
Controllers_NavbarController.setNavbarView(Views_NavbarView);
Controllers_NavbarController.setUserModel(Models_UserModel);
Controllers_ProfileEditController.setView(main_profileEditView);
Controllers_ProfileEditController.setModel(Models_UserModel);
Controllers_ProfileController.setView(profileView);
Controllers_ProfileController.setModel(Models_UserModel);
router.register(Paths.signInPage, signInView);
router.register(Paths.signUpPage, signUpView);
router.register(Paths.profilePage, profileView);
router.register(Paths.profileEditPage, main_profileEditView);
router.register(Paths.mainPage, mainPageView);
router.register(Paths.sendLetterPage, sendLetterView);

function initModels() {
  Models_UserModel.getUserData();

  var h1 = function h1() {
    src_EventBus.off(Events.userModelEvents.profileGetData.success, h1);
    LetterModel_LetterModel.getFolders();
  };

  src_EventBus.on(Events.userModelEvents.profileGetData.success, h1);

  var h2 = function h2() {
    src_EventBus.off(Events.letterModelEvents.getFolderList.success, h2);
    letterModel.getLetterList('Входящие');
  };

  src_EventBus.on(Events.letterModelEvents.getFolderList.success, h2);

  var h3 = function h3() {
    src_EventBus.off(Events.letterModelEvents.getLetterList.success, h3);

    try {
      router.start(window.location.pathname);
    } catch (err) {
      router.start(Paths.signInPage);
    }
  };

  src_EventBus.on(Events.letterModelEvents.getLetterList.success, h3);

  var h4 = function h4() {
    src_EventBus.off(Events.userModelEvents.profileGetData.fail, h4);
    router.start(Paths.signInPage);
  };

  src_EventBus.on(Events.userModelEvents.profileGetData.fail, h4);
}

initModels();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
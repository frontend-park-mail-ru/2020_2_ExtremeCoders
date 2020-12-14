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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".project_scroll::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n    background-color: #F5F5F5;\n}\n\n.project_scroll::-webkit-scrollbar {\n    width: 6px;\n    background-color: #F5F5F5;\n}\n\n.project_scroll::-webkit-scrollbar-thumb {\n    background-color: #000000;\n}\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/components/scroll.css"],"names":[],"mappings":"AAAA;IACI,iDAAiD;IACjD,yBAAyB;AAC7B;;AAEA;IACI,UAAU;IACV,yBAAyB;AAC7B;;AAEA;IACI,yBAAyB;AAC7B","sourcesContent":[".project_scroll::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n    background-color: #F5F5F5;\n}\n\n.project_scroll::-webkit-scrollbar {\n    width: 6px;\n    background-color: #F5F5F5;\n}\n\n.project_scroll::-webkit-scrollbar-thumb {\n    background-color: #000000;\n}\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.i, ".plus {\n    display: inline-block;\n    width: 40px;\n    height: 40px;\n\n    background:\n            linear-gradient(#fff,#fff),\n            linear-gradient(#fff,#fff),\n            #000;\n    background-position: center;\n    background-size: 50% 2px,2px 50%;\n    background-repeat: no-repeat;\n\n    margin-bottom: 10px;\n}\n\n.small-plus {\n    width: 20px;\n    height: 20px;\n\n    background:\n            linear-gradient(#fff,#fff),\n            linear-gradient(#fff,#fff),\n            #000;\n    background-position: center;\n    background-size: 50% 2px,2px 50%;\n    background-repeat: no-repeat;\n\n    margin-left: 5px;\n}\n\n.radius {\n    border-radius:50%;\n}\n\n.cross {\n    transform: rotate(-45deg);\n}\n.cross-modal {\n    margin-left: 20px;\n}\n\n.edit-button {\n    width: 20px;\n    height: 20px;\n    background: #000;\n    padding-left: 4px;\n    padding-top: 5px;\n}\n\n.delete-letter-button {\n    position: relative;\n    width: 20px;\n    height: 20px;\n    background: #000;\n}\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/components/button.css"],"names":[],"mappings":"AAAA;IACI,qBAAqB;IACrB,WAAW;IACX,YAAY;;IAEZ;;;gBAGY;IACZ,2BAA2B;IAC3B,gCAAgC;IAChC,4BAA4B;;IAE5B,mBAAmB;AACvB;;AAEA;IACI,WAAW;IACX,YAAY;;IAEZ;;;gBAGY;IACZ,2BAA2B;IAC3B,gCAAgC;IAChC,4BAA4B;;IAE5B,gBAAgB;AACpB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,yBAAyB;AAC7B;AACA;IACI,iBAAiB;AACrB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,gBAAgB;IAChB,iBAAiB;IACjB,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,gBAAgB;AACpB","sourcesContent":[".plus {\n    display: inline-block;\n    width: 40px;\n    height: 40px;\n\n    background:\n            linear-gradient(#fff,#fff),\n            linear-gradient(#fff,#fff),\n            #000;\n    background-position: center;\n    background-size: 50% 2px,2px 50%;\n    background-repeat: no-repeat;\n\n    margin-bottom: 10px;\n}\n\n.small-plus {\n    width: 20px;\n    height: 20px;\n\n    background:\n            linear-gradient(#fff,#fff),\n            linear-gradient(#fff,#fff),\n            #000;\n    background-position: center;\n    background-size: 50% 2px,2px 50%;\n    background-repeat: no-repeat;\n\n    margin-left: 5px;\n}\n\n.radius {\n    border-radius:50%;\n}\n\n.cross {\n    transform: rotate(-45deg);\n}\n.cross-modal {\n    margin-left: 20px;\n}\n\n.edit-button {\n    width: 20px;\n    height: 20px;\n    background: #000;\n    padding-left: 4px;\n    padding-top: 5px;\n}\n\n.delete-letter-button {\n    position: relative;\n    width: 20px;\n    height: 20px;\n    background: #000;\n}\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.i, ".triangle-right {\n    width: 0;\n    height: 0;\n    border-top: 6px solid transparent;\n    border-left: 12px solid black;\n    border-bottom: 6px solid transparent;\n    display: inline-block;\n    margin-right: 5px;\n}\n\n.triangle-down {\n    width: 0;\n    height: 0;\n    border-left: 6px solid transparent;\n    border-right: 6px solid transparent;\n    border-top: 12px solid black;\n    display: inline-block;\n    margin-right: 5px;\n}\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/components/triangle.css"],"names":[],"mappings":"AAAA;IACI,QAAQ;IACR,SAAS;IACT,iCAAiC;IACjC,6BAA6B;IAC7B,oCAAoC;IACpC,qBAAqB;IACrB,iBAAiB;AACrB;;AAEA;IACI,QAAQ;IACR,SAAS;IACT,kCAAkC;IAClC,mCAAmC;IACnC,4BAA4B;IAC5B,qBAAqB;IACrB,iBAAiB;AACrB","sourcesContent":[".triangle-right {\n    width: 0;\n    height: 0;\n    border-top: 6px solid transparent;\n    border-left: 12px solid black;\n    border-bottom: 6px solid transparent;\n    display: inline-block;\n    margin-right: 5px;\n}\n\n.triangle-down {\n    width: 0;\n    height: 0;\n    border-left: 6px solid transparent;\n    border-right: 6px solid transparent;\n    border-top: 12px solid black;\n    display: inline-block;\n    margin-right: 5px;\n}\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.i, ".s-header {\n    z-index: 100;\n    width: 100%;\n    background-color: #f0efef;\n    background-image: url(\"data:image/svg+xml,%3Csvg width='40' height='1' viewBox='0 0 40 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v1H0z' fill='%23151515' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E\");\n    height: 60px;\n    -webkit-box-shadow: 0px 1px 0px rgba(17, 17, 26, 0.03), 0px 8px 16px rgba(17, 17, 26, 0.04);\n    box-shadow: 0px 1px 0px rgba(17, 17, 26, 0.03), 0px 8px 16px rgba(17, 17, 26, 0.04);\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n\n    position: fixed;\n}\n\n.s-header__content {\n    width: 100%;\n    height: auto;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n    position: relative;\n}\n\n.s-header__logo {\n    z-index: 101;\n    margin: 0;\n    padding-left: var(--gutter-lg);\n    position: relative;\n}\n\n.s-header__logo a {\n    display: block;\n    margin: 0;\n    padding: 0;\n    outline: 0;\n    border: none;\n    -webkit-transition: all .3s;\n    transition: all .3s;\n}\n\n.s-header__logo img {\n    width: 5.8rem;\n    height: 5.8rem;\n    margin: 0;\n    vertical-align: bottom;\n}\n\n.s-header__nav-wrap {\n    margin-left: auto;\n    margin-right: 8.8rem;\n}\n\n.s-header__nav-wrap .s-header__nav-heading {\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: var(--text-sm);\n    margin-top: var(--vspace-3);\n    text-align: center;\n}\n\n.s-header__nav-wrap .s-header__nav-heading,\n.s-header__nav-wrap .close-mobile-menu {\n    display: none;\n}\n\n.s-header__nav {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    font-family: var(--font-2);\n    font-weight: 500;\n    font-size: 1.6rem;\n}\n\n.s-header__nav li {\n    display: inline-block;\n    position: relative;\n    padding: 0 1rem;\n}\n\n.s-header__nav li.has-children {\n    padding-right: 2rem;\n}\n\n.s-header__nav li a {\n    display: block;\n    color: rgba(0, 0, 0, 0.5);\n    line-height: 5.2rem;\n    position: relative;\n}\n\n.s-header__nav li.has-children>a::after {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.5);\n    border-right: 1px solid rgba(0, 0, 0, 0.5);\n    content: '';\n    display: block;\n    height: 5px;\n    width: 5px;\n    margin-top: -4px;\n    pointer-events: none;\n    -webkit-transform-origin: 66% 66%;\n    transform-origin: 66% 66%;\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n    -webkit-transition: all .3s;\n    transition: all .3s;\n    position: absolute;\n    right: -1.2rem;\n    top: calc(50% + 2px);\n}\n\n.s-header__nav li:hover>a,\n.s-header__nav li:focus>a {\n    color: black;\n}\n\n.s-header__nav li:hover li,\n.s-header__nav li:focus li {\n    background: transparent;\n}\n\n.s-header__nav li.current>a {\n    color: black;\n}\n\n.s-header__nav li.current>a::before {\n    content: \"\";\n    display: block;\n    height: 2px;\n    width: 100%;\n    background-color: black;\n    position: absolute;\n    left: 0;\n    bottom: 0;\n}\n\n.s-header__nav li ul {\n    z-index: 200;\n    font-size: 1.5rem;\n    font-weight: 400;\n    margin: 0;\n    padding: 1.8rem 0;\n    background: #f4f4f4;\n    border-radius: 0 0 4px 4px;\n    -webkit-box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);\n    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);\n    -webkit-transform: translate3d(0, 15px, 0);\n    transform: translate3d(0, 15px, 0);\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transition: all .5s;\n    transition: all .5s;\n    position: absolute;\n    top: 100%;\n    left: 0;\n}\n\n.s-header__nav li ul ul {\n    position: absolute;\n    top: 0;\n    left: 100%;\n    left: calc(100% + 1px);\n    border-radius: 0 0 4px 4px;\n    padding-top: 1.2rem;\n}\n\n.s-header__nav li ul li {\n    display: block;\n    text-align: left;\n    padding: 0;\n    margin: 0;\n    min-height: 3.2rem;\n    width: 100%;\n}\n\n.s-header__nav li ul li a {\n    display: block;\n    white-space: nowrap;\n    padding: .7rem 3rem .7rem 2rem;\n    font-family: var(--font-1);\n    line-height: 1.8rem;\n    color: rgba(0, 0, 0, 0.6);\n}\n\n.s-header__nav li ul li a:hover,\n.s-header__nav li ul li a:focus {\n    color: black;\n}\n\n.s-header__nav li:hover>ul {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n}\n\n/* -------------------------------------------------------------------\n * ## header-toggle\n * ------------------------------------------------------------------- */\n.s-header__toggle-menu {\n    display: none;\n    width: 48px;\n    height: 48px;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    position: absolute;\n    right: 4rem;\n    top: 50%;\n}\n\n.s-header__toggle-menu span {\n    display: block;\n    width: 28px;\n    height: 3px;\n    margin-top: -1.5px;\n    position: absolute;\n    right: 10px;\n    top: 50%;\n    bottom: auto;\n    left: auto;\n    background-color: black;\n    font: 0/0 a;\n    text-shadow: none;\n    color: transparent;\n}\n\n.s-header__toggle-menu span::before,\n.s-header__toggle-menu span::after {\n    content: '';\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    background-color: inherit;\n    left: 0;\n}\n\n.s-header__toggle-menu span::before {\n    top: -10px;\n}\n\n.s-header__toggle-menu span::after {\n    bottom: -10px;\n}\n\n/* -------------------------------------------------------------------\n * ## header-search\n * ------------------------------------------------------------------- */\n.s-header__search {\n    z-index: 300;\n    display: block;\n    text-align: center;\n    background: white;\n    opacity: 0;\n    visibility: hidden;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    -webkit-transition: all .3s;\n    transition: all .3s;\n}\n\n.s-header__search-form {\n    width: 100%;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    position: absolute;\n    top: 50%;\n}\n\n.s-header__search-form label {\n    color: black;\n}\n\n.s-header__search-form::after {\n    content: \"Press Enter to begin your search.\";\n    display: block;\n    letter-spacing: 0.6px;\n    font-size: 1.6rem;\n    margin-top: var(--vspace-1);\n    text-align: center;\n    color: rgba(0, 0, 0, 0.5);\n}\n\n.s-header__search-form input[type=\"search\"] {\n    background-color: transparent;\n    color: black;\n    height: auto;\n    width: 100%;\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: 6rem;\n    line-height: 1.5;\n    border: none;\n    border-bottom: 1px solid var(--color-border) !important;\n    max-width: 680px;\n    padding-top: .8rem !important;\n    padding-bottom: .8rem !important;\n    margin: 0 auto;\n    text-align: center;\n}\n\n.s-header__search-form input[type=\"search\"]::-webkit-search-decoration,\n.s-header__search-form input[type=\"search\"]::-webkit-search-cancel-button,\n.s-header__search-form input[type=\"search\"]::-webkit-search-results-button,\n.s-header__search-form input[type=\"search\"]::-webkit-search-results-decoration {\n    -webkit-appearance: none;\n}\n\n.s-header__search-form input[type=\"search\"]::-webkit-input-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1;\n}\n\n.s-header__search-form input[type=\"search\"]:-moz-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1;\n}\n\n.s-header__search-form input[type=\"search\"]::-moz-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1;\n}\n\n.s-header__search-form input[type=\"search\"]:-ms-input-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1;\n}\n\n.s-header__search-form input[type=\"search\"].placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1;\n}\n\n.s-header__search-form input[type=\"search\"]:focus {\n    outline: none;\n}\n\n.s-header__search-form input[type=\"submit\"] {\n    display: none;\n}\n\nbody.search-is-visible {\n    overflow: hidden;\n}\n\n.search-is-visible .s-header__search {\n    opacity: 1;\n    visibility: visible;\n}\n\n/* -------------------------------------------------------------------\n * ## search triggers\n * ------------------------------------------------------------------- */\n.s-header__search-trigger {\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n    width: 4rem;\n    height: 4rem;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    position: absolute;\n    top: 50%;\n    right: var(--gutter-lg);\n}\n\n.s-header__search-trigger svg {\n    height: 2.2rem;\n    width: 2.2rem;\n}\n\n.s-header__search-trigger svg path {\n    fill: black;\n}\n\n/* -------------------------------------------------------------------\n * responsive:\n * header\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1240px) {\n    .s-header__logo {\n        padding-left: 4.4rem;\n    }\n    .s-header__search-trigger {\n        right: 4rem;\n    }\n}\n\n@media screen and (min-width: 801px) {\n    .s-header__nav li.has-children:hover>a::after,\n    .s-header__nav li.has-children:focus>a::after {\n        -webkit-transform: rotate(225deg);\n        transform: rotate(225deg);\n    }\n    .s-header__nav li ul {\n        display: block !important;\n    }\n}\n\n@media screen and (max-width: 800px) {\n    .s-header__logo {\n        padding-left: 4rem;\n    }\n    .s-header__logo img {\n        width: 5.6rem;\n        height: 5.6rem;\n    }\n    .s-header__nav-wrap {\n        --color-border: var(--color-gray-1);\n        z-index: 300;\n        background-color: white;\n        opacity: 0;\n        visibility: hidden;\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        width: 100%;\n        height: 100%;\n        margin: 0;\n        border: none;\n        overflow-y: auto;\n    }\n    .s-header__nav-wrap .s-header__nav-heading,\n    .s-header__nav-wrap .close-mobile-menu {\n        display: block;\n    }\n    .s-header__nav {\n        font-weight: 600;\n        font-size: var(--text-size);\n        margin: var(--vspace-2_5) 6rem var(--vspace-1);\n        border-bottom: 1px solid var(--color-border);\n    }\n    .s-header__nav li {\n        display: block;\n        padding: 0;\n        text-align: left;\n    }\n    .s-header__nav li ul {\n        display: none;\n        position: static;\n        -webkit-box-shadow: none;\n        box-shadow: none;\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n        opacity: 1;\n        visibility: visible;\n        background-color: transparent;\n        padding: 0 0 1.8rem 0;\n        -webkit-transition: none !important;\n        transition: none !important;\n    }\n    .s-header__nav li.has-children>a::after {\n        top: 27px;\n    }\n    .s-header__nav li.has-children>a.sub-menu-is-open::after {\n        -webkit-transform: rotate(225deg);\n        transform: rotate(225deg);\n    }\n    .s-header__nav li ul li a {\n        padding: .8rem 1.6rem .8rem;\n    }\n    .s-header__nav li.current a::before {\n        display: none;\n    }\n    .s-header__nav>li {\n        border-top: 1px solid var(--color-border);\n    }\n    .s-header__nav>li a {\n        line-height: 5.6rem;\n    }\n    .s-header__toggle-menu {\n        display: block;\n    }\n    .s-header__search-trigger {\n        top: calc(50% + 2px);\n        right: calc(4rem + 5rem);\n    }\n    .s-header__search-trigger svg {\n        height: 3.2rem;\n        width: 3.2rem;\n    }\n    body.nav-wrap-is-visible {\n        overflow: hidden;\n    }\n    .nav-wrap-is-visible .s-header__nav-wrap {\n        opacity: 1;\n        visibility: visible;\n    }\n    .s-header__search-form::after {\n        font-size: var(--text-sm);\n    }\n    .s-header__search-form input[type=\"search\"] {\n        max-width: none;\n        width: 80%;\n        font-size: 4.2rem;\n    }\n}\n\n@media screen and (max-width: 600px) {\n    .s-header {\n        height: 60px;\n    }\n    .s-header__toggle-menu {\n        right: 3.2rem;\n    }\n    .s-header__search-trigger {\n        right: calc(3.2rem + 5rem);\n    }\n    .s-header__logo {\n        padding-left: var(--gutter-mob);\n    }\n    .s-header__search-form input[type=\"search\"] {\n        font-size: 3.4rem;\n    }\n}\n\n@media screen and (max-width: 500px) {\n    .s-header__search-form input[type=\"search\"] {\n        font-size: 3rem;\n    }\n}\n\n@media screen and (max-width: 400px) {\n    .s-header {\n        height: 60px;\n    }\n    .s-header__logo {\n        padding-left: .2rem;\n    }\n    .s-header__logo img {\n        width: 4.8rem;\n        height: 4.8rem;\n    }\n    .s-header__nav {\n        margin: 4.2rem 3.2rem 3.2rem;\n    }\n    .s-header__toggle-menu {\n        right: 2rem;\n    }\n    .s-header__search-trigger {\n        right: calc(2rem + 4.8rem);\n    }\n    .s-header__search-form input[type=\"search\"] {\n        font-size: 2.4rem;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## close button for search and mobile navigation\n * ------------------------------------------------------------------- */\n.s-header__overlay-close {\n    text-shadow: none;\n    color: transparent;\n    display: block;\n    width: 46px;\n    height: 46px;\n    margin-left: -23px;\n    position: absolute;\n    top: var(--vspace-1);\n    left: 50%;\n}\n\n.s-header__overlay-close::before,\n.s-header__overlay-close::after {\n    content: '';\n    display: inline-block;\n    width: 2px;\n    height: 20px;\n    top: 12px;\n    left: 22px;\n    background-color: black;\n    position: absolute;\n}\n\n.s-header__overlay-close::before {\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n}\n\n.s-header__overlay-close::after {\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n}\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/components/header.css"],"names":[],"mappings":"AAAA;IACI,YAAY;IACZ,WAAW;IACX,yBAAyB;IACzB,gOAAgO;IAChO,YAAY;IACZ,2FAA2F;IAC3F,mFAAmF;IACnF,oBAAoB;IACpB,oBAAoB;IACpB,aAAa;IACb,sBAAsB;IACtB,yBAAyB;IACzB,mBAAmB;;IAEnB,eAAe;AACnB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,sBAAsB;IACtB,yBAAyB;IACzB,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,YAAY;IACZ,SAAS;IACT,8BAA8B;IAC9B,kBAAkB;AACtB;;AAEA;IACI,cAAc;IACd,SAAS;IACT,UAAU;IACV,UAAU;IACV,YAAY;IACZ,2BAA2B;IAC3B,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,cAAc;IACd,SAAS;IACT,sBAAsB;AAC1B;;AAEA;IACI,iBAAiB;IACjB,oBAAoB;AACxB;;AAEA;IACI,0BAA0B;IAC1B,gBAAgB;IAChB,yBAAyB;IACzB,2BAA2B;IAC3B,kBAAkB;AACtB;;AAEA;;IAEI,aAAa;AACjB;;AAEA;IACI,gBAAgB;IAChB,SAAS;IACT,UAAU;IACV,0BAA0B;IAC1B,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,qBAAqB;IACrB,kBAAkB;IAClB,eAAe;AACnB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,cAAc;IACd,yBAAyB;IACzB,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,2CAA2C;IAC3C,0CAA0C;IAC1C,WAAW;IACX,cAAc;IACd,WAAW;IACX,UAAU;IACV,gBAAgB;IAChB,oBAAoB;IACpB,iCAAiC;IACjC,yBAAyB;IACzB,gCAAgC;IAChC,wBAAwB;IACxB,2BAA2B;IAC3B,mBAAmB;IACnB,kBAAkB;IAClB,cAAc;IACd,oBAAoB;AACxB;;AAEA;;IAEI,YAAY;AAChB;;AAEA;;IAEI,uBAAuB;AAC3B;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,WAAW;IACX,cAAc;IACd,WAAW;IACX,WAAW;IACX,uBAAuB;IACvB,kBAAkB;IAClB,OAAO;IACP,SAAS;AACb;;AAEA;IACI,YAAY;IACZ,iBAAiB;IACjB,gBAAgB;IAChB,SAAS;IACT,iBAAiB;IACjB,mBAAmB;IACnB,0BAA0B;IAC1B,oDAAoD;IACpD,4CAA4C;IAC5C,0CAA0C;IAC1C,kCAAkC;IAClC,UAAU;IACV,kBAAkB;IAClB,2BAA2B;IAC3B,mBAAmB;IACnB,kBAAkB;IAClB,SAAS;IACT,OAAO;AACX;;AAEA;IACI,kBAAkB;IAClB,MAAM;IACN,UAAU;IACV,sBAAsB;IACtB,0BAA0B;IAC1B,mBAAmB;AACvB;;AAEA;IACI,cAAc;IACd,gBAAgB;IAChB,UAAU;IACV,SAAS;IACT,kBAAkB;IAClB,WAAW;AACf;;AAEA;IACI,cAAc;IACd,mBAAmB;IACnB,8BAA8B;IAC9B,0BAA0B;IAC1B,mBAAmB;IACnB,yBAAyB;AAC7B;;AAEA;;IAEI,YAAY;AAChB;;AAEA;IACI,UAAU;IACV,mBAAmB;IACnB,uCAAuC;IACvC,+BAA+B;AACnC;;AAEA;;wEAEwE;AACxE;IACI,aAAa;IACb,WAAW;IACX,YAAY;IACZ,mCAAmC;IACnC,2BAA2B;IAC3B,kBAAkB;IAClB,WAAW;IACX,QAAQ;AACZ;;AAEA;IACI,cAAc;IACd,WAAW;IACX,WAAW;IACX,kBAAkB;IAClB,kBAAkB;IAClB,WAAW;IACX,QAAQ;IACR,YAAY;IACZ,UAAU;IACV,uBAAuB;IACvB,WAAW;IACX,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;;IAEI,WAAW;IACX,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,yBAAyB;IACzB,OAAO;AACX;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,aAAa;AACjB;;AAEA;;wEAEwE;AACxE;IACI,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,UAAU;IACV,kBAAkB;IAClB,eAAe;IACf,MAAM;IACN,OAAO;IACP,QAAQ;IACR,SAAS;IACT,WAAW;IACX,YAAY;IACZ,2BAA2B;IAC3B,mBAAmB;AACvB;;AAEA;IACI,WAAW;IACX,mCAAmC;IACnC,2BAA2B;IAC3B,kBAAkB;IAClB,QAAQ;AACZ;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,4CAA4C;IAC5C,cAAc;IACd,qBAAqB;IACrB,iBAAiB;IACjB,2BAA2B;IAC3B,kBAAkB;IAClB,yBAAyB;AAC7B;;AAEA;IACI,6BAA6B;IAC7B,YAAY;IACZ,YAAY;IACZ,WAAW;IACX,0BAA0B;IAC1B,gBAAgB;IAChB,eAAe;IACf,gBAAgB;IAChB,YAAY;IACZ,uDAAuD;IACvD,gBAAgB;IAChB,6BAA6B;IAC7B,gCAAgC;IAChC,cAAc;IACd,kBAAkB;AACtB;;AAEA;;;;IAII,wBAAwB;AAC5B;;AAEA;IACI,YAAY;IACZ,6BAA6B;IAC7B,UAAU;AACd;;AAEA;IACI,YAAY;IACZ,6BAA6B;IAC7B,UAAU;AACd;;AAEA;IACI,YAAY;IACZ,6BAA6B;IAC7B,UAAU;AACd;;AAEA;IACI,YAAY;IACZ,6BAA6B;IAC7B,UAAU;AACd;;AAEA;IACI,YAAY;IACZ,6BAA6B;IAC7B,UAAU;AACd;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,UAAU;IACV,mBAAmB;AACvB;;AAEA;;wEAEwE;AACxE;IACI,oBAAoB;IACpB,oBAAoB;IACpB,aAAa;IACb,sBAAsB;IACtB,yBAAyB;IACzB,mBAAmB;IACnB,qBAAqB;IACrB,wBAAwB;IACxB,uBAAuB;IACvB,WAAW;IACX,YAAY;IACZ,mCAAmC;IACnC,2BAA2B;IAC3B,kBAAkB;IAClB,QAAQ;IACR,uBAAuB;AAC3B;;AAEA;IACI,cAAc;IACd,aAAa;AACjB;;AAEA;IACI,WAAW;AACf;;AAEA;;;wEAGwE;AACxE;IACI;QACI,oBAAoB;IACxB;IACA;QACI,WAAW;IACf;AACJ;;AAEA;IACI;;QAEI,iCAAiC;QACjC,yBAAyB;IAC7B;IACA;QACI,yBAAyB;IAC7B;AACJ;;AAEA;IACI;QACI,kBAAkB;IACtB;IACA;QACI,aAAa;QACb,cAAc;IAClB;IACA;QACI,mCAAmC;QACnC,YAAY;QACZ,uBAAuB;QACvB,UAAU;QACV,kBAAkB;QAClB,eAAe;QACf,MAAM;QACN,OAAO;QACP,QAAQ;QACR,SAAS;QACT,WAAW;QACX,YAAY;QACZ,SAAS;QACT,YAAY;QACZ,gBAAgB;IACpB;IACA;;QAEI,cAAc;IAClB;IACA;QACI,gBAAgB;QAChB,2BAA2B;QAC3B,8CAA8C;QAC9C,4CAA4C;IAChD;IACA;QACI,cAAc;QACd,UAAU;QACV,gBAAgB;IACpB;IACA;QACI,aAAa;QACb,gBAAgB;QAChB,wBAAwB;QACxB,gBAAgB;QAChB,uCAAuC;QACvC,+BAA+B;QAC/B,UAAU;QACV,mBAAmB;QACnB,6BAA6B;QAC7B,qBAAqB;QACrB,mCAAmC;QACnC,2BAA2B;IAC/B;IACA;QACI,SAAS;IACb;IACA;QACI,iCAAiC;QACjC,yBAAyB;IAC7B;IACA;QACI,2BAA2B;IAC/B;IACA;QACI,aAAa;IACjB;IACA;QACI,yCAAyC;IAC7C;IACA;QACI,mBAAmB;IACvB;IACA;QACI,cAAc;IAClB;IACA;QACI,oBAAoB;QACpB,wBAAwB;IAC5B;IACA;QACI,cAAc;QACd,aAAa;IACjB;IACA;QACI,gBAAgB;IACpB;IACA;QACI,UAAU;QACV,mBAAmB;IACvB;IACA;QACI,yBAAyB;IAC7B;IACA;QACI,eAAe;QACf,UAAU;QACV,iBAAiB;IACrB;AACJ;;AAEA;IACI;QACI,YAAY;IAChB;IACA;QACI,aAAa;IACjB;IACA;QACI,0BAA0B;IAC9B;IACA;QACI,+BAA+B;IACnC;IACA;QACI,iBAAiB;IACrB;AACJ;;AAEA;IACI;QACI,eAAe;IACnB;AACJ;;AAEA;IACI;QACI,YAAY;IAChB;IACA;QACI,mBAAmB;IACvB;IACA;QACI,aAAa;QACb,cAAc;IAClB;IACA;QACI,4BAA4B;IAChC;IACA;QACI,WAAW;IACf;IACA;QACI,0BAA0B;IAC9B;IACA;QACI,iBAAiB;IACrB;AACJ;;AAEA;;wEAEwE;AACxE;IACI,iBAAiB;IACjB,kBAAkB;IAClB,cAAc;IACd,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,kBAAkB;IAClB,oBAAoB;IACpB,SAAS;AACb;;AAEA;;IAEI,WAAW;IACX,qBAAqB;IACrB,UAAU;IACV,YAAY;IACZ,SAAS;IACT,UAAU;IACV,uBAAuB;IACvB,kBAAkB;AACtB;;AAEA;IACI,gCAAgC;IAChC,wBAAwB;AAC5B;;AAEA;IACI,iCAAiC;IACjC,yBAAyB;AAC7B","sourcesContent":[".s-header {\n    z-index: 100;\n    width: 100%;\n    background-color: #f0efef;\n    background-image: url(\"data:image/svg+xml,%3Csvg width='40' height='1' viewBox='0 0 40 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v1H0z' fill='%23151515' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E\");\n    height: 60px;\n    -webkit-box-shadow: 0px 1px 0px rgba(17, 17, 26, 0.03), 0px 8px 16px rgba(17, 17, 26, 0.04);\n    box-shadow: 0px 1px 0px rgba(17, 17, 26, 0.03), 0px 8px 16px rgba(17, 17, 26, 0.04);\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n\n    position: fixed;\n}\n\n.s-header__content {\n    width: 100%;\n    height: auto;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n    position: relative;\n}\n\n.s-header__logo {\n    z-index: 101;\n    margin: 0;\n    padding-left: var(--gutter-lg);\n    position: relative;\n}\n\n.s-header__logo a {\n    display: block;\n    margin: 0;\n    padding: 0;\n    outline: 0;\n    border: none;\n    -webkit-transition: all .3s;\n    transition: all .3s;\n}\n\n.s-header__logo img {\n    width: 5.8rem;\n    height: 5.8rem;\n    margin: 0;\n    vertical-align: bottom;\n}\n\n.s-header__nav-wrap {\n    margin-left: auto;\n    margin-right: 8.8rem;\n}\n\n.s-header__nav-wrap .s-header__nav-heading {\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: var(--text-sm);\n    margin-top: var(--vspace-3);\n    text-align: center;\n}\n\n.s-header__nav-wrap .s-header__nav-heading,\n.s-header__nav-wrap .close-mobile-menu {\n    display: none;\n}\n\n.s-header__nav {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    font-family: var(--font-2);\n    font-weight: 500;\n    font-size: 1.6rem;\n}\n\n.s-header__nav li {\n    display: inline-block;\n    position: relative;\n    padding: 0 1rem;\n}\n\n.s-header__nav li.has-children {\n    padding-right: 2rem;\n}\n\n.s-header__nav li a {\n    display: block;\n    color: rgba(0, 0, 0, 0.5);\n    line-height: 5.2rem;\n    position: relative;\n}\n\n.s-header__nav li.has-children>a::after {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.5);\n    border-right: 1px solid rgba(0, 0, 0, 0.5);\n    content: '';\n    display: block;\n    height: 5px;\n    width: 5px;\n    margin-top: -4px;\n    pointer-events: none;\n    -webkit-transform-origin: 66% 66%;\n    transform-origin: 66% 66%;\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n    -webkit-transition: all .3s;\n    transition: all .3s;\n    position: absolute;\n    right: -1.2rem;\n    top: calc(50% + 2px);\n}\n\n.s-header__nav li:hover>a,\n.s-header__nav li:focus>a {\n    color: black;\n}\n\n.s-header__nav li:hover li,\n.s-header__nav li:focus li {\n    background: transparent;\n}\n\n.s-header__nav li.current>a {\n    color: black;\n}\n\n.s-header__nav li.current>a::before {\n    content: \"\";\n    display: block;\n    height: 2px;\n    width: 100%;\n    background-color: black;\n    position: absolute;\n    left: 0;\n    bottom: 0;\n}\n\n.s-header__nav li ul {\n    z-index: 200;\n    font-size: 1.5rem;\n    font-weight: 400;\n    margin: 0;\n    padding: 1.8rem 0;\n    background: #f4f4f4;\n    border-radius: 0 0 4px 4px;\n    -webkit-box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);\n    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);\n    -webkit-transform: translate3d(0, 15px, 0);\n    transform: translate3d(0, 15px, 0);\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transition: all .5s;\n    transition: all .5s;\n    position: absolute;\n    top: 100%;\n    left: 0;\n}\n\n.s-header__nav li ul ul {\n    position: absolute;\n    top: 0;\n    left: 100%;\n    left: calc(100% + 1px);\n    border-radius: 0 0 4px 4px;\n    padding-top: 1.2rem;\n}\n\n.s-header__nav li ul li {\n    display: block;\n    text-align: left;\n    padding: 0;\n    margin: 0;\n    min-height: 3.2rem;\n    width: 100%;\n}\n\n.s-header__nav li ul li a {\n    display: block;\n    white-space: nowrap;\n    padding: .7rem 3rem .7rem 2rem;\n    font-family: var(--font-1);\n    line-height: 1.8rem;\n    color: rgba(0, 0, 0, 0.6);\n}\n\n.s-header__nav li ul li a:hover,\n.s-header__nav li ul li a:focus {\n    color: black;\n}\n\n.s-header__nav li:hover>ul {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n}\n\n/* -------------------------------------------------------------------\n * ## header-toggle\n * ------------------------------------------------------------------- */\n.s-header__toggle-menu {\n    display: none;\n    width: 48px;\n    height: 48px;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    position: absolute;\n    right: 4rem;\n    top: 50%;\n}\n\n.s-header__toggle-menu span {\n    display: block;\n    width: 28px;\n    height: 3px;\n    margin-top: -1.5px;\n    position: absolute;\n    right: 10px;\n    top: 50%;\n    bottom: auto;\n    left: auto;\n    background-color: black;\n    font: 0/0 a;\n    text-shadow: none;\n    color: transparent;\n}\n\n.s-header__toggle-menu span::before,\n.s-header__toggle-menu span::after {\n    content: '';\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    background-color: inherit;\n    left: 0;\n}\n\n.s-header__toggle-menu span::before {\n    top: -10px;\n}\n\n.s-header__toggle-menu span::after {\n    bottom: -10px;\n}\n\n/* -------------------------------------------------------------------\n * ## header-search\n * ------------------------------------------------------------------- */\n.s-header__search {\n    z-index: 300;\n    display: block;\n    text-align: center;\n    background: white;\n    opacity: 0;\n    visibility: hidden;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    -webkit-transition: all .3s;\n    transition: all .3s;\n}\n\n.s-header__search-form {\n    width: 100%;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    position: absolute;\n    top: 50%;\n}\n\n.s-header__search-form label {\n    color: black;\n}\n\n.s-header__search-form::after {\n    content: \"Press Enter to begin your search.\";\n    display: block;\n    letter-spacing: 0.6px;\n    font-size: 1.6rem;\n    margin-top: var(--vspace-1);\n    text-align: center;\n    color: rgba(0, 0, 0, 0.5);\n}\n\n.s-header__search-form input[type=\"search\"] {\n    background-color: transparent;\n    color: black;\n    height: auto;\n    width: 100%;\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: 6rem;\n    line-height: 1.5;\n    border: none;\n    border-bottom: 1px solid var(--color-border) !important;\n    max-width: 680px;\n    padding-top: .8rem !important;\n    padding-bottom: .8rem !important;\n    margin: 0 auto;\n    text-align: center;\n}\n\n.s-header__search-form input[type=\"search\"]::-webkit-search-decoration,\n.s-header__search-form input[type=\"search\"]::-webkit-search-cancel-button,\n.s-header__search-form input[type=\"search\"]::-webkit-search-results-button,\n.s-header__search-form input[type=\"search\"]::-webkit-search-results-decoration {\n    -webkit-appearance: none;\n}\n\n.s-header__search-form input[type=\"search\"]::-webkit-input-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1;\n}\n\n.s-header__search-form input[type=\"search\"]:-moz-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1;\n}\n\n.s-header__search-form input[type=\"search\"]::-moz-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1;\n}\n\n.s-header__search-form input[type=\"search\"]:-ms-input-placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1;\n}\n\n.s-header__search-form input[type=\"search\"].placeholder {\n    color: black;\n    text-align: center !important;\n    opacity: 1;\n}\n\n.s-header__search-form input[type=\"search\"]:focus {\n    outline: none;\n}\n\n.s-header__search-form input[type=\"submit\"] {\n    display: none;\n}\n\nbody.search-is-visible {\n    overflow: hidden;\n}\n\n.search-is-visible .s-header__search {\n    opacity: 1;\n    visibility: visible;\n}\n\n/* -------------------------------------------------------------------\n * ## search triggers\n * ------------------------------------------------------------------- */\n.s-header__search-trigger {\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n    width: 4rem;\n    height: 4rem;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    position: absolute;\n    top: 50%;\n    right: var(--gutter-lg);\n}\n\n.s-header__search-trigger svg {\n    height: 2.2rem;\n    width: 2.2rem;\n}\n\n.s-header__search-trigger svg path {\n    fill: black;\n}\n\n/* -------------------------------------------------------------------\n * responsive:\n * header\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1240px) {\n    .s-header__logo {\n        padding-left: 4.4rem;\n    }\n    .s-header__search-trigger {\n        right: 4rem;\n    }\n}\n\n@media screen and (min-width: 801px) {\n    .s-header__nav li.has-children:hover>a::after,\n    .s-header__nav li.has-children:focus>a::after {\n        -webkit-transform: rotate(225deg);\n        transform: rotate(225deg);\n    }\n    .s-header__nav li ul {\n        display: block !important;\n    }\n}\n\n@media screen and (max-width: 800px) {\n    .s-header__logo {\n        padding-left: 4rem;\n    }\n    .s-header__logo img {\n        width: 5.6rem;\n        height: 5.6rem;\n    }\n    .s-header__nav-wrap {\n        --color-border: var(--color-gray-1);\n        z-index: 300;\n        background-color: white;\n        opacity: 0;\n        visibility: hidden;\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        width: 100%;\n        height: 100%;\n        margin: 0;\n        border: none;\n        overflow-y: auto;\n    }\n    .s-header__nav-wrap .s-header__nav-heading,\n    .s-header__nav-wrap .close-mobile-menu {\n        display: block;\n    }\n    .s-header__nav {\n        font-weight: 600;\n        font-size: var(--text-size);\n        margin: var(--vspace-2_5) 6rem var(--vspace-1);\n        border-bottom: 1px solid var(--color-border);\n    }\n    .s-header__nav li {\n        display: block;\n        padding: 0;\n        text-align: left;\n    }\n    .s-header__nav li ul {\n        display: none;\n        position: static;\n        -webkit-box-shadow: none;\n        box-shadow: none;\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n        opacity: 1;\n        visibility: visible;\n        background-color: transparent;\n        padding: 0 0 1.8rem 0;\n        -webkit-transition: none !important;\n        transition: none !important;\n    }\n    .s-header__nav li.has-children>a::after {\n        top: 27px;\n    }\n    .s-header__nav li.has-children>a.sub-menu-is-open::after {\n        -webkit-transform: rotate(225deg);\n        transform: rotate(225deg);\n    }\n    .s-header__nav li ul li a {\n        padding: .8rem 1.6rem .8rem;\n    }\n    .s-header__nav li.current a::before {\n        display: none;\n    }\n    .s-header__nav>li {\n        border-top: 1px solid var(--color-border);\n    }\n    .s-header__nav>li a {\n        line-height: 5.6rem;\n    }\n    .s-header__toggle-menu {\n        display: block;\n    }\n    .s-header__search-trigger {\n        top: calc(50% + 2px);\n        right: calc(4rem + 5rem);\n    }\n    .s-header__search-trigger svg {\n        height: 3.2rem;\n        width: 3.2rem;\n    }\n    body.nav-wrap-is-visible {\n        overflow: hidden;\n    }\n    .nav-wrap-is-visible .s-header__nav-wrap {\n        opacity: 1;\n        visibility: visible;\n    }\n    .s-header__search-form::after {\n        font-size: var(--text-sm);\n    }\n    .s-header__search-form input[type=\"search\"] {\n        max-width: none;\n        width: 80%;\n        font-size: 4.2rem;\n    }\n}\n\n@media screen and (max-width: 600px) {\n    .s-header {\n        height: 60px;\n    }\n    .s-header__toggle-menu {\n        right: 3.2rem;\n    }\n    .s-header__search-trigger {\n        right: calc(3.2rem + 5rem);\n    }\n    .s-header__logo {\n        padding-left: var(--gutter-mob);\n    }\n    .s-header__search-form input[type=\"search\"] {\n        font-size: 3.4rem;\n    }\n}\n\n@media screen and (max-width: 500px) {\n    .s-header__search-form input[type=\"search\"] {\n        font-size: 3rem;\n    }\n}\n\n@media screen and (max-width: 400px) {\n    .s-header {\n        height: 60px;\n    }\n    .s-header__logo {\n        padding-left: .2rem;\n    }\n    .s-header__logo img {\n        width: 4.8rem;\n        height: 4.8rem;\n    }\n    .s-header__nav {\n        margin: 4.2rem 3.2rem 3.2rem;\n    }\n    .s-header__toggle-menu {\n        right: 2rem;\n    }\n    .s-header__search-trigger {\n        right: calc(2rem + 4.8rem);\n    }\n    .s-header__search-form input[type=\"search\"] {\n        font-size: 2.4rem;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## close button for search and mobile navigation\n * ------------------------------------------------------------------- */\n.s-header__overlay-close {\n    text-shadow: none;\n    color: transparent;\n    display: block;\n    width: 46px;\n    height: 46px;\n    margin-left: -23px;\n    position: absolute;\n    top: var(--vspace-1);\n    left: 50%;\n}\n\n.s-header__overlay-close::before,\n.s-header__overlay-close::after {\n    content: '';\n    display: inline-block;\n    width: 2px;\n    height: 20px;\n    top: 12px;\n    left: 22px;\n    background-color: black;\n    position: absolute;\n}\n\n.s-header__overlay-close::before {\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n}\n\n.s-header__overlay-close::after {\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n}\n"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* -------------------------------------------------------------------\n * ## fonts\n * ------------------------------------------------------------------- */\n:root {\n    --font-1: \"Roboto\", sans-serif;\n    --font-2: \"Inter\", sans-serif;\n\n    /* monospace\n     */\n    --font-mono: Consolas, \"Andale Mono\", Courier, \"Courier New\", monospace;\n}\n\n/* -------------------------------------------------------------------\n * ## colors\n * ------------------------------------------------------------------- */\n:root {\n    --color-1: hsla(222, 83%, 27%, 1);\n    --color-2: hsla(356, 74%, 52%, 1);\n    --color-3: hsla(170, 100%, 35%, 1);\n\n    --color-1-lighter: hsla(222, 83%, 47%, 1);\n    --color-1-light  : hsla(222, 83%, 37%, 1);\n    --color-1-dark   : hsla(222, 83%, 17%, 1);\n    --color-1-darker : hsla(222, 83%, 10%, 1);\n    --color-2-lighter: hsla(356, 74%, 72%, 1);\n    --color-2-light  : hsla(356, 74%, 62%, 1);\n    --color-2-dark   : hsla(356, 74%, 42%, 1);\n    --color-2-darker : hsla(356, 74%, 32%, 1);\n\n    --color-error          : hsla(359, 100%, 91%, 1);\n    --color-success        : hsla(76, 69%, 68%, 1);\n    --color-info           : hsla(205, 82%, 91%, 1);\n    --color-notice         : hsla(51, 100%, 80%, 1);\n    --color-error-content  : hsla(359, 50%, 50%, 1);\n    --color-success-content: hsla(76, 29%, 28%, 1);\n    --color-info-content   : hsla(205, 32%, 31%, 1);\n    --color-notice-content : hsla(51, 30%, 30%, 1);\n\n    --color-black  : #000000;\n    --color-gray-19: #0a0a0a;\n    --color-gray-18: #141414;\n    --color-gray-17: #1e1e1e;\n    --color-gray-16: #282828;\n    --color-gray-15: #333333;\n    --color-gray-14: #3d3d3d;\n    --color-gray-13: #474747;\n    --color-gray-12: #515151;\n    --color-gray-11: #5b5b5b;\n    --color-gray-10: #656565;\n    --color-gray-9 : #747474;\n    --color-gray-8 : #848484;\n    --color-gray-7 : #939393;\n    --color-gray-6 : #a3a3a3;\n    --color-gray-5 : #b2b2b2;\n    --color-gray-4 : #c1c1c1;\n    --color-gray-3 : #d1d1d1;\n    --color-gray-2 : #e0e0e0;\n    --color-gray-1 : #f0f0f0;\n    --color-white  : #ffffff;\n\n    --color-text       : var(--color-gray-18);\n    --color-text-dark  : var(--color-black);\n    --color-text-light : var(--color-gray-8);\n    --color-placeholder: var(--color-gray-8);\n\n    --color-btn                   : var(--color-gray-3);\n    --color-btn-text              : var(--color-black);\n    --color-btn-hover             : var(--color-1);\n    --color-btn-hover-text        : var(--color-white);\n    --color-btn-primary           : var(--color-black);\n    --color-btn-primary-text      : var(--color-white);\n    --color-btn-primary-hover     : var(--color-1);\n    --color-btn-primary-hover-text: var(--color-white);\n    --color-btn-stroke            : var(--color-black);\n    --color-btn-stroke-text       : var(--color-black);\n    --color-btn-stroke-hover      : var(--color-1);\n    --color-btn-stroke-hover-text : var(--color-white);\n\n    /* others\n     */\n    --color-white-bg: white;\n    --color-body    : #f5f5f5;\n    --color-border  : var(--color-gray-2);\n}\n\n/* -------------------------------------------------------------------\n * ## vertical spacing and typescale\n * ------------------------------------------------------------------- */\n:root {\n\n    /* spacing\n     * base font size: 18px\n     * vertical space unit : 32px\n     */\n    --base-size     : 62.5%;\n    --base-font-size: 1.8rem;\n    --space         : 3.2rem;\n\n    /* vertical spacing\n     */\n    --vspace-0_125: calc(0.25 * var(--space));\n    --vspace-0_25 : calc(0.25 * var(--space));\n    --vspace-0_5  : calc(0.5 * var(--space));\n    --vspace-0_75 : calc(0.75 * var(--space));\n    --vspace-0_875: calc(0.875 * var(--space));\n    --vspace-1    : calc(var(--space));\n    --vspace-1_25 : calc(1.25 * var(--space));\n    --vspace-1_5  : calc(1.5 * var(--space));\n    --vspace-1_75 : calc(1.75 * var(--space));\n    --vspace-2    : calc(2 * var(--space));\n    --vspace-2_5  : calc(2.5 * var(--space));\n    --vspace-3    : calc(3 * var(--space));\n    --vspace-3_5  : calc(3.5 * var(--space));\n    --vspace-4    : calc(4 * var(--space));\n    --vspace-4_5  : calc(4.5 * var(--space));\n    --vspace-5    : calc(5 * var(--space));\n\n    --topspace: calc(var(--vspace-0_125) + 40px);\n\n    --text-scale-ratio: 1.2;\n    --text-size       : var(--base-font-size);\n    --text-xs         : calc((var(--text-size) / var(--text-scale-ratio)) / var(--text-scale-ratio));\n    --text-sm         : calc(var(--text-xs) * var(--text-scale-ratio));\n    --text-md         : calc(var(--text-sm) * var(--text-scale-ratio) * var(--text-scale-ratio));\n    --text-lg         : calc(var(--text-md) * var(--text-scale-ratio));\n    --text-xl         : calc(var(--text-lg) * var(--text-scale-ratio));\n    --text-xxl        : calc(var(--text-xl) * var(--text-scale-ratio));\n    --text-xxxl       : calc(var(--text-xxl) * var(--text-scale-ratio));\n    --text-display-1  : calc(var(--text-xxxl) * var(--text-scale-ratio));\n    --text-display-2  : calc(var(--text-display-1) * var(--text-scale-ratio));\n    --text-display-3  : calc(var(--text-display-2) * var(--text-scale-ratio));\n\n    /* default button height\n     */\n    --vspace-btn: var(--vspace-2);\n\n}\n\n/* on mobile devices below 600px\n */\n@media screen and (max-width: 600px) {\n    :root {\n        --base-font-size: 1.6rem;\n        --space: 2.8rem;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## grid variables\n * ------------------------------------------------------------------- */\n:root {\n\n    /* widths for rows and containers\n     */\n    --width-full    : 100%;\n    --width-max     : 1200px;\n    --width-wide    : 1400px;\n    --width-wider   : 1600px;\n    --width-widest  : 1800px;\n    --width-narrow  : 1000px;\n    --width-narrower: 900px;\n    --width-grid-max: var(--width-max);\n\n    /* gutters\n     */\n    --gutter-lg : 2rem;\n    --gutter-md : 1.8rem;\n    --gutter-mob: 1rem;\n}\n\n\n\n/* ==========================================================================\n * # normalize\n * normalize.css v8.0.1 | MIT License |\n * github.com/necolas/normalize.css\n *\n * -------------------------------------------------------------------------- */\n\n/* -------------------------------------------------------------------\n * ## document\n * ------------------------------------------------------------------- */\n\n/* 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.*/\n\nhtml {\n    line-height: 1.15;\n    /* 1 */\n    -webkit-text-size-adjust: 100%;\n    /* 2 */\n}\n\n/* -------------------------------------------------------------------\n * ## sections\n * ------------------------------------------------------------------- */\n\n/* Remove the margin in all browsers. */\n\nbody {\n    margin: 0;\n}\n\n/* Render the `main` element consistently in IE. */\n\nmain {\n    display: block;\n}\n\n/* Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari. */\n\nh1 {\n    font-size: 2em;\n    margin: 0.67em 0;\n}\n\n/* -------------------------------------------------------------------\n * ## grouping\n * ------------------------------------------------------------------- */\n\n/* 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE. */\n\nhr {\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n    /* 1 */\n    height: 0;\n    /* 1 */\n    overflow: visible;\n    /* 2 */\n}\n\n/* 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers. */\n\npre {\n    font-family: monospace, monospace;\n    /* 1 */\n    font-size: 1em;\n    /* 2 */\n}\n\n/* -------------------------------------------------------------------\n * ## text-level semantics\n * ------------------------------------------------------------------- */\n\n/* Remove the gray background on active links in IE 10. */\n\na {\n    background-color: transparent;\n}\n\n/* 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari. */\n\nabbr[title] {\n    border-bottom: none;\n    /* 1 */\n    text-decoration: underline;\n    /* 2 */\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n    /* 2 */\n}\n\n/* Add the correct font weight in Chrome, Edge, and Safari. */\n\nb, strong {\n    font-weight: bolder;\n}\n\n/* 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers. */\n\ncode, kbd, samp {\n    font-family: monospace, monospace;\n    /* 1 */\n    font-size: 1em;\n    /* 2 */\n}\n\n/* Add the correct font size in all browsers. */\n\nsmall {\n    font-size: 80%;\n}\n\n/* Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers. */\n\nsub, sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n}\n\nsub {\n    bottom: -0.25em;\n}\n\nsup {\n    top: -0.5em;\n}\n\n/* -------------------------------------------------------------------\n * ## embedded content\n * ------------------------------------------------------------------- */\n\n/* Remove the border on images inside links in IE 10. */\n\nimg {\n    border-style: none;\n}\n\n/* -------------------------------------------------------------------\n * ## forms\n * ------------------------------------------------------------------- */\n\n/* 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari. */\n\nbutton, input, optgroup, select, textarea {\n    font-family: inherit;\n    /* 1 */\n    font-size: 100%;\n    /* 1 */\n    line-height: 1.15;\n    /* 1 */\n    margin: 0;\n    /* 2 */\n}\n\n/* Show the overflow in IE.\n * 1. Show the overflow in Edge. */\n\nbutton, input {\n    /* 1 */\n    overflow: visible;\n}\n\n/* Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox. */\n\nbutton, select {\n    /* 1 */\n    text-transform: none;\n}\n\n/* Correct the inability to style clickable types in iOS and Safari. */\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n    -webkit-appearance: button;\n}\n\n/* Remove the inner border and padding in Firefox. */\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n    border-style: none;\n    padding: 0;\n}\n\n/* Restore the focus styles unset by the previous rule. */\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n    outline: 1px dotted ButtonText;\n}\n\n/* Correct the padding in Firefox. */\n\nfieldset {\n    padding: 0.35em 0.75em 0.625em;\n}\n\n/* 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers. */\n\nlegend {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    /* 1 */\n    color: inherit;\n    /* 2 */\n    display: table;\n    /* 1 */\n    max-width: 100%;\n    /* 1 */\n    padding: 0;\n    /* 3 */\n    white-space: normal;\n    /* 1 */\n}\n\n/* Add the correct vertical alignment in Chrome, Firefox, and Opera. */\n\nprogress {\n    vertical-align: baseline;\n}\n\n/* Remove the default vertical scrollbar in IE 10+. */\n\ntextarea {\n    overflow: auto;\n}\n\n/* 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10. */\n\n[type=\"checkbox\"], [type=\"radio\"] {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    /* 1 */\n    padding: 0;\n    /* 2 */\n}\n\n/* Correct the cursor style of increment and decrement buttons in Chrome. */\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n    height: auto;\n}\n\n/* 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari. */\n\n[type=\"search\"] {\n    -webkit-appearance: textfield;\n    /* 1 */\n    outline-offset: -2px;\n    /* 2 */\n}\n\n/* Remove the inner padding in Chrome and Safari on macOS. */\n\n[type=\"search\"]::-webkit-search-decoration {\n    -webkit-appearance: none;\n}\n\n/* 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari. */\n\n::-webkit-file-upload-button {\n    -webkit-appearance: button;\n    /* 1 */\n    font: inherit;\n    /* 2 */\n}\n\n/* -------------------------------------------------------------------\n * ## interactive\n * ------------------------------------------------------------------- */\n\n/* Add the correct display in Edge, IE 10+, and Firefox. */\n\ndetails {\n    display: block;\n}\n\n/* Add the correct display in all browsers. */\n\nsummary {\n    display: list-item;\n}\n\n/* -------------------------------------------------------------------\n * ## misc\n * ------------------------------------------------------------------- */\n\n/* Add the correct display in IE 10+. */\n\ntemplate {\n    display: none;\n}\n\n/* Add the correct display in IE 10. */\n\n[hidden] {\n    display: none;\n}\n\n\n\n/* ===================================================================\n * # basic/base setup styles\n *\n * ------------------------------------------------------------------- */\nhtml {\n    font-size: 62.5%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n*, *::before, *::after {\n    -webkit-box-sizing: inherit;\n    box-sizing: inherit;\n}\n\nbody {\n    font-weight: normal;\n    line-height: 1;\n    word-wrap: break-word;\n    -moz-font-smoothing: grayscale;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    -webkit-overflow-scrolling: touch;\n    -webkit-text-size-adjust: none;\n}\n\n/* -------------------------------------------------------------------\n * ## media\n * ------------------------------------------------------------------- */\nsvg, img, video embed, iframe, object {\n    max-width: 100%;\n    height: auto;\n}\n\n/* -------------------------------------------------------------------\n * ## typography resets\n * ------------------------------------------------------------------- */\ndiv, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, p, blockquote, th, td {\n    margin: 0;\n    padding: 0;\n}\n\np {\n    font-size: inherit;\n    text-rendering: optimizeLegibility;\n}\n\nem, i {\n    font-style: italic;\n    line-height: inherit;\n}\n\nstrong, b {\n    font-weight: bold;\n    line-height: inherit;\n}\n\nsmall {\n    font-size: 60%;\n    line-height: inherit;\n}\n\nol, ul {\n    list-style: none;\n}\n\nli {\n    display: block;\n}\n\n/* -------------------------------------------------------------------\n * ## links\n * ------------------------------------------------------------------- */\na {\n    text-decoration: none;\n    line-height: inherit;\n}\n\na img {\n    border: none;\n}\n\n/* -------------------------------------------------------------------\n * ## inputs\n * ------------------------------------------------------------------- */\nfieldset {\n    margin: 0;\n    padding: 0;\n}\n\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n}\n\n\n\n/* ===================================================================\n * # Grid v3.0.0 - (_grid.scss)\n *\n *   -----------------------------------------------------------------\n * - Grid breakpoints are based on MAXIMUM WIDTH media queries,\n *   meaning they apply to that one breakpoint and ALL THOSE BELOW IT.\n * - Grid columns without a specified width will automatically layout\n *   as equal width columns.\n * ------------------------------------------------------------------- */\n\n/* rows\n * ------------------------------------- */\n.row {\n    width: 92%;\n    /*max-width: var(--width-grid-max);*/\n    margin: 0 auto;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -ms-flex-flow: row wrap;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    flex-flow: row wrap;\n}\n\n.row .row {\n    width: auto;\n    max-width: none;\n    margin-left: calc(var(--gutter-lg) * -1);\n    margin-right: calc(var(--gutter-lg) * -1);\n}\n\n/* columns\n * -------------------------------------- */\n.column {\n    -ms-flex: 1 1 0%;\n    -webkit-box-flex: 1;\n    flex: 1 1 0%;\n    padding: 0 var(--gutter-lg);\n}\n\n.collapse>.column, .column.collapse {\n    padding: 0;\n}\n\n/* flex row containers utility classes\n */\n.row.row-wrap {\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n}\n\n.row.row-nowrap {\n    -ms-flex-wrap: none;\n    flex-wrap: nowrap;\n}\n\n.row.row-y-top {\n    -ms-flex-align: start;\n    -webkit-box-align: start;\n    align-items: flex-start;\n}\n\n.row.row-y-bottom {\n    -ms-flex-align: end;\n    -webkit-box-align: end;\n    align-items: flex-end;\n}\n\n.row.row-y-center {\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n}\n\n.row.row-stretch {\n    -ms-flex-align: stretch;\n    -webkit-box-align: stretch;\n    align-items: stretch;\n}\n\n.row.row-baseline {\n    -ms-flex-align: baseline;\n    -webkit-box-align: baseline;\n    align-items: baseline;\n}\n\n.row.row-x-left {\n    -ms-flex-pack: start;\n    -webkit-box-pack: start;\n    justify-content: flex-start;\n}\n\n.row.row-x-right {\n    -ms-flex-pack: end;\n    -webkit-box-pack: end;\n    justify-content: flex-end;\n}\n\n.row.row-x-center {\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n}\n\n/* flex item utility alignment classes\n */\n.align-center {\n    margin: auto;\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    -ms-grid-row-align: center;\n    align-self: center;\n}\n\n.align-left {\n    margin-right: auto;\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    -ms-grid-row-align: center;\n    align-self: center;\n}\n\n.align-right {\n    margin-left: auto;\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    -ms-grid-row-align: center;\n    align-self: center;\n}\n\n.align-x-center {\n    margin-right: auto;\n    margin-left: auto;\n}\n\n.align-x-left {\n    margin-right: auto;\n}\n\n.align-x-right {\n    margin-left: auto;\n}\n\n.align-y-center {\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    -ms-grid-row-align: center;\n    align-self: center;\n}\n\n.align-y-top {\n    -webkit-align-self: flex-start;\n    -ms-flex-item-align: start;\n    align-self: flex-start;\n}\n\n.align-y-bottom {\n    -webkit-align-self: flex-end;\n    -ms-flex-item-align: end;\n    align-self: flex-end;\n}\n\n/* large screen column widths\n */\n.large-1 {\n    -ms-flex: 0 0 8.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%;\n}\n\n.large-2 {\n    -ms-flex: 0 0 16.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%;\n}\n\n.large-3 {\n    -ms-flex: 0 0 25%;\n    -webkit-box-flex: 0;\n    flex: 0 0 25%;\n    max-width: 25%;\n}\n\n.large-4 {\n    -ms-flex: 0 0 33.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%;\n}\n\n.large-5 {\n    -ms-flex: 0 0 41.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%;\n}\n\n.large-6 {\n    -ms-flex: 0 0 50%;\n    -webkit-box-flex: 0;\n    flex: 0 0 50%;\n    max-width: 50%;\n}\n\n.large-7 {\n    -ms-flex: 0 0 58.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%;\n}\n\n.large-8 {\n    -ms-flex: 0 0 66.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%;\n}\n\n.large-9 {\n    -ms-flex: 0 0 75%;\n    -webkit-box-flex: 0;\n    flex: 0 0 75%;\n    max-width: 75%;\n}\n\n.large-10 {\n    -ms-flex: 0 0 83.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%;\n}\n\n.large-11 {\n    -ms-flex: 0 0 91.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%;\n}\n\n.large-12 {\n    -ms-flex: 0 0 100%;\n    -webkit-box-flex: 0;\n    flex: 0 0 100%;\n    max-width: 100%;\n}\n\n/* -------------------------------------------------------------------\n * ## medium screen devices\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1200px) {\n    .row .row {\n        margin-left: calc(var(--gutter-md) * -1);\n        margin-right: calc(var(--gutter-md) * -1);\n    }\n    .column {\n        padding: 0 var(--gutter-md);\n    }\n    .medium-1 {\n        -ms-flex: 0 0 8.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 8.33333%;\n        max-width: 8.33333%;\n    }\n    .medium-2 {\n        -ms-flex: 0 0 16.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 16.66667%;\n        max-width: 16.66667%;\n    }\n    .medium-3 {\n        -ms-flex: 0 0 25%;\n        -webkit-box-flex: 0;\n        flex: 0 0 25%;\n        max-width: 25%;\n    }\n    .medium-4 {\n        -ms-flex: 0 0 33.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 33.33333%;\n        max-width: 33.33333%;\n    }\n    .medium-5 {\n        -ms-flex: 0 0 41.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 41.66667%;\n        max-width: 41.66667%;\n    }\n    .medium-6 {\n        -ms-flex: 0 0 50%;\n        -webkit-box-flex: 0;\n        flex: 0 0 50%;\n        max-width: 50%;\n    }\n    .medium-7 {\n        -ms-flex: 0 0 58.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 58.33333%;\n        max-width: 58.33333%;\n    }\n    .medium-8 {\n        -ms-flex: 0 0 66.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 66.66667%;\n        max-width: 66.66667%;\n    }\n    .medium-9 {\n        -ms-flex: 0 0 75%;\n        -webkit-box-flex: 0;\n        flex: 0 0 75%;\n        max-width: 75%;\n    }\n    .medium-10 {\n        -ms-flex: 0 0 83.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 83.33333%;\n        max-width: 83.33333%;\n    }\n    .medium-11 {\n        -ms-flex: 0 0 91.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 91.66667%;\n        max-width: 91.66667%;\n    }\n    .medium-12 {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## tablets\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 800px) {\n    .row {\n        width: 90%;\n    }\n    .tab-1 {\n        -ms-flex: 0 0 8.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 8.33333%;\n        max-width: 8.33333%;\n    }\n    .tab-2 {\n        -ms-flex: 0 0 16.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 16.66667%;\n        max-width: 16.66667%;\n    }\n    .tab-3 {\n        -ms-flex: 0 0 25%;\n        -webkit-box-flex: 0;\n        flex: 0 0 25%;\n        max-width: 25%;\n    }\n    .tab-4 {\n        -ms-flex: 0 0 33.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 33.33333%;\n        max-width: 33.33333%;\n    }\n    .tab-5 {\n        -ms-flex: 0 0 41.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 41.66667%;\n        max-width: 41.66667%;\n    }\n    .tab-6 {\n        -ms-flex: 0 0 50%;\n        -webkit-box-flex: 0;\n        flex: 0 0 50%;\n        max-width: 50%;\n    }\n    .tab-7 {\n        -ms-flex: 0 0 58.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 58.33333%;\n        max-width: 58.33333%;\n    }\n    .tab-8 {\n        -ms-flex: 0 0 66.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 66.66667%;\n        max-width: 66.66667%;\n    }\n    .tab-9 {\n        -ms-flex: 0 0 75%;\n        -webkit-box-flex: 0;\n        flex: 0 0 75%;\n        max-width: 75%;\n    }\n    .tab-10 {\n        -ms-flex: 0 0 83.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 83.33333%;\n        max-width: 83.33333%;\n    }\n    .tab-11 {\n        -ms-flex: 0 0 91.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 91.66667%;\n        max-width: 91.66667%;\n    }\n    .tab-12 {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n    .hide-on-tablet {\n        display: none;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## mobile devices\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 600px) {\n    .row {\n        width: 100%;\n        padding-left: 6vw;\n        padding-right: 6vw;\n    }\n    .row .row {\n        margin-left: calc(var(--gutter-mob) * -1);\n        margin-right: calc(var(--gutter-mob) * -1);\n        padding-left: 0;\n        padding-right: 0;\n    }\n    .column {\n        padding: 0 var(--gutter-mob);\n    }\n    .mob-1 {\n        -ms-flex: 0 0 8.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 8.33333%;\n        max-width: 8.33333%;\n    }\n    .mob-2 {\n        -ms-flex: 0 0 16.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 16.66667%;\n        max-width: 16.66667%;\n    }\n    .mob-3 {\n        -ms-flex: 0 0 25%;\n        -webkit-box-flex: 0;\n        flex: 0 0 25%;\n        max-width: 25%;\n    }\n    .mob-4 {\n        -ms-flex: 0 0 33.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 33.33333%;\n        max-width: 33.33333%;\n    }\n    .mob-5 {\n        -ms-flex: 0 0 41.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 41.66667%;\n        max-width: 41.66667%;\n    }\n    .mob-6 {\n        -ms-flex: 0 0 50%;\n        -webkit-box-flex: 0;\n        flex: 0 0 50%;\n        max-width: 50%;\n    }\n    .mob-7 {\n        -ms-flex: 0 0 58.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 58.33333%;\n        max-width: 58.33333%;\n    }\n    .mob-8 {\n        -ms-flex: 0 0 66.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 66.66667%;\n        max-width: 66.66667%;\n    }\n    .mob-9 {\n        -ms-flex: 0 0 75%;\n        -webkit-box-flex: 0;\n        flex: 0 0 75%;\n        max-width: 75%;\n    }\n    .mob-10 {\n        -ms-flex: 0 0 83.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 83.33333%;\n        max-width: 83.33333%;\n    }\n    .mob-11 {\n        -ms-flex: 0 0 91.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 91.66667%;\n        max-width: 91.66667%;\n    }\n    .mob-12 {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n    .hide-on-mobile {\n        display: none;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## small mobile devices <= 400px\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 400px) {\n    .row .row {\n        margin-left: 0;\n        margin-right: 0;\n    }\n    .column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n        margin-left: 0;\n        margin-right: 0;\n        padding: 0;\n    }\n}\n\n\n\n/* ===================================================================\n * # block grids\n *\n * -------------------------------------------------------------------\n * Equally-sized columns define at parent/row level.\n * ------------------------------------------------------------------- */\n\n.block-large-1-8>.column {\n    -ms-flex: 0 0 12.5%;\n    -webkit-box-flex: 0;\n    flex: 0 0 12.5%;\n    max-width: 12.5%;\n}\n\n.block-large-1-6>.column {\n    -ms-flex: 0 0 16.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%;\n}\n\n.block-large-1-5>.column {\n    -ms-flex: 0 0 20%;\n    -webkit-box-flex: 0;\n    flex: 0 0 20%;\n    max-width: 20%;\n}\n\n.block-large-1-4>.column {\n    -ms-flex: 0 0 25%;\n    -webkit-box-flex: 0;\n    flex: 0 0 25%;\n    max-width: 25%;\n}\n\n.block-large-1-3>.column {\n    -ms-flex: 0 0 33.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%;\n}\n\n.block-large-1-2>.column {\n    -ms-flex: 0 0 50%;\n    -webkit-box-flex: 0;\n    flex: 0 0 50%;\n    max-width: 50%;\n}\n\n.block-large-full>.column {\n    -ms-flex: 0 0 100%;\n    -webkit-box-flex: 0;\n    flex: 0 0 100%;\n    max-width: 100%;\n}\n\n/* -------------------------------------------------------------------\n * ## block grids - medium screen devices\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1200px) {\n    .block-medium-1-8>.column {\n        -ms-flex: 0 0 12.5%;\n        -webkit-box-flex: 0;\n        flex: 0 0 12.5%;\n        max-width: 12.5%;\n    }\n    .block-medium-1-6>.column {\n        -ms-flex: 0 0 16.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 16.66667%;\n        max-width: 16.66667%;\n    }\n    .block-medium-1-5>.column {\n        -ms-flex: 0 0 20%;\n        -webkit-box-flex: 0;\n        flex: 0 0 20%;\n        max-width: 20%;\n    }\n    .block-medium-1-4>.column {\n        -ms-flex: 0 0 25%;\n        -webkit-box-flex: 0;\n        flex: 0 0 25%;\n        max-width: 25%;\n    }\n    .block-medium-1-3>.column {\n        -ms-flex: 0 0 33.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 33.33333%;\n        max-width: 33.33333%;\n    }\n    .block-medium-1-2>.column {\n        -ms-flex: 0 0 50%;\n        -webkit-box-flex: 0;\n        flex: 0 0 50%;\n        max-width: 50%;\n    }\n    .block-medium-full>.column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## block grids - tablets\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 800px) {\n    .block-tab-1-8>.column {\n        -ms-flex: 0 0 12.5%;\n        -webkit-box-flex: 0;\n        flex: 0 0 12.5%;\n        max-width: 12.5%;\n    }\n    .block-tab-1-6>.column {\n        -ms-flex: 0 0 16.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 16.66667%;\n        max-width: 16.66667%;\n    }\n    .block-tab-1-5>.column {\n        -ms-flex: 0 0 20%;\n        -webkit-box-flex: 0;\n        flex: 0 0 20%;\n        max-width: 20%;\n    }\n    .block-tab-1-4>.column {\n        -ms-flex: 0 0 25%;\n        -webkit-box-flex: 0;\n        flex: 0 0 25%;\n        max-width: 25%;\n    }\n    .block-tab-1-3>.column {\n        -ms-flex: 0 0 33.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 33.33333%;\n        max-width: 33.33333%;\n    }\n    .block-tab-1-2>.column {\n        -ms-flex: 0 0 50%;\n        -webkit-box-flex: 0;\n        flex: 0 0 50%;\n        max-width: 50%;\n    }\n    .block-tab-full>.column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## block grids - mobile devices\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 600px) {\n    .block-mob-1-8>.column {\n        -ms-flex: 0 0 12.5%;\n        -webkit-box-flex: 0;\n        flex: 0 0 12.5%;\n        max-width: 12.5%;\n    }\n    .block-mob-1-6>.column {\n        -ms-flex: 0 0 16.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 16.66667%;\n        max-width: 16.66667%;\n    }\n    .block-mob-1-5>.column {\n        -ms-flex: 0 0 20%;\n        -webkit-box-flex: 0;\n        flex: 0 0 20%;\n        max-width: 20%;\n    }\n    .block-mob-1-4>.column {\n        -ms-flex: 0 0 25%;\n        -webkit-box-flex: 0;\n        flex: 0 0 25%;\n        max-width: 25%;\n    }\n    .block-mob-1-3>.column {\n        -ms-flex: 0 0 33.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 33.33333%;\n        max-width: 33.33333%;\n    }\n    .block-mob-1-2>.column {\n        -ms-flex: 0 0 50%;\n        -webkit-box-flex: 0;\n        flex: 0 0 50%;\n        max-width: 50%;\n    }\n    .block-mob-full>.column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## block grids - small mobile devices <= 400px\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 400px) {\n    .stack>.column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n        margin-left: 0;\n        margin-right: 0;\n        padding: 0;\n    }\n}\n\n\n\n/* ===================================================================\n * # MISC\n *\n * ------------------------------------------------------------------- */\n.h-group:after {\n    content: \"\";\n    display: table;\n    clear: both;\n}\n\n/* misc helper classes\n */\n.is-hidden {\n    display: none;\n}\n.is-invisible {\n    visibility: hidden;\n}\n.h-antialiased {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.h-overflow-hidden {\n    overflow: hidden;\n}\n.h-remove-top {\n    margin-top: 0;\n}\n.h-remove-bottom {\n    margin-bottom: 0;\n}\n.h-add-half-bottom {\n    margin-bottom: var(--vspace-0_5) !important;\n}\n.h-add-bottom {\n    margin-bottom: var(--vspace-1) !important;\n}\n.h-no-border {\n    border: none;\n}\n.h-full-width {\n    width: 100%;\n}\n.h-text-center {\n    text-align: center;\n}\n.h-text-left {\n    text-align: left;\n}\n.h-text-right {\n    text-align: right;\n}\n.h-pull-left {\n    float: left;\n}\n.h-pull-right {\n    float: right;\n}\n\n\n\n/* ===================================================================\n * # custom grid, block grid STACK breakpoints\n *\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1000px) {\n    .w-1000-stack,\n    .block-1000-stack > .column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n@media screen and (max-width: 700px) {\n    .w-700-stack,\n    .block-700-stack > .column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n@media screen and (max-width: 500px) {\n    .w-500-stack,\n    .block-500-stack > .column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n\n\n/* ===================================================================\n * # base style overrides\n *\n * ------------------------------------------------------------------- */\nhtml {\n    font-size: var(--base-size);\n}\n\nhtml, body {\n    height: 100%;\n}\n\nbody {\n    background: var(--color-body);\n    font-family: var(--font-1);\n    font-size: var(--text-size);\n    font-style: normal;\n    font-weight: normal;\n    line-height: var(--vspace-1);\n    color: var(--color-text);\n    margin: 0;\n    padding: 0;\n}\n\n/* -------------------------------------------------------------------\n * ## links\n * ------------------------------------------------------------------- */\na {\n    color: var(--color-1);\n    -webkit-transition: all 0.3s ease-in-out;\n    transition: all 0.3s ease-in-out;\n}\n\na:hover, a:focus, a:active {\n    color: var(--color-2);\n    cursor: pointer;\n}\n\na:hover, a:active {\n    outline: 0;\n}\n\n\n\n/* ===================================================================\n * # typography & general theme styles\n *\n * ------------------------------------------------------------------- */\n\n/* type scale - ratio 1:2 | base: 18px\n * -------------------------------------------------------------------\n * --text-display-3 = (77.40px)\n * --text-display-2 = (64.50px)\n * --text-display-1 = (53.75px)\n * --text-xxxl      = (44.79px)\n * --text-xxl       = (37.32px)\n * --text-xl        = (31.10px)\n * --text-lg        = (25.92px)\n * --text-md        = (21.60px)\n * --text-size      = (18.00px) BASE\n * --text-sm        = (15.00px)\n * --text-xs        = (12.50px)\n * -------------------------------------------------------------------- */\nh1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-style: normal;\n    color: var(--color-text-dark);\n    -webkit-font-variant-ligatures: common-ligatures;\n    font-variant-ligatures: common-ligatures;\n    text-rendering: optimizeLegibility;\n}\n\nh1, .h1 {\n    margin-top: var(--vspace-0_125);\n    margin-bottom: var(--vspace-0_125);\n}\n\nh2, .h2, h3, .h3, h4, .h4 {\n    margin-top: var(--vspace-0_125);\n    margin-bottom: var(--vspace-0_125);\n}\n\nh5, .h5, h6, .h6 {\n    margin-top: var(--vspace-1_5);\n    margin-bottom: var(--vspace-0_5);\n}\n\nh1, .h1 {\n    font-size: var(--text-display-1);\n    line-height: var(--vspace-2);\n    letter-spacing: -.015em;\n}\n\n@media screen and (max-width: 600px) {\n    h1, .h1 {\n        margin-top: var(--vspace-0_125);\n        margin-bottom: var(--vspace-0_125);\n    }\n}\n\nh2, .h2 {\n    font-size: var(--text-xxl);\n    line-height: var(--vspace-1_5);\n}\n\nh3, .h3 {\n    font-size: var(--text-xl);\n    line-height: var(--vspace-1_25);\n}\n\nh4, .h4 {\n    font-size: var(--text-lg);\n    line-height: var(--vspace-1);\n}\n\nh5, .h5 {\n    font-size: var(--text-md);\n    line-height: var(--vspace-0_875);\n}\n\nh6, .h6 {\n    font-size: calc(var(--text-size) * 0.8889);\n    font-weight: 700;\n    line-height: var(--vspace-0_75);\n    text-transform: uppercase;\n    letter-spacing: .25em;\n}\n\n.lead, .attention-getter {\n    font-family: var(--font-2);\n    font-weight: 300;\n    font-size: var(--text-md);\n    line-height: calc(1.125 * var(--space));\n    color: var(--color-text-dark);\n}\n\n@media screen and (max-width: 400px) {\n    .lead, .attention-getter {\n        font-size: calc(var(--text-size) * 1.0556);\n    }\n}\n\nfigure img, p img {\n    margin: 0;\n    vertical-align: bottom;\n}\n\nem, i, strong, b {\n    font-size: inherit;\n    line-height: inherit;\n}\n\nem, i {\n    font-family: var(--font-1);\n    font-style: italic;\n}\n\nstrong, b {\n    font-family: var(--font-1);\n    font-weight: 600;\n    color: var(--color-text-dark);\n}\n\nsmall {\n    font-size: var(--text-sm);\n    font-weight: 500;\n    line-height: var(--vspace-0_5);\n}\n\nblockquote {\n    margin: 0 0 var(--vspace-1) 0;\n    padding: var(--vspace-1) var(--vspace-1_5);\n    border-left: 4px solid black;\n    position: relative;\n}\n\n@media screen and (max-width: 400px) {\n    blockquote {\n        padding: var(--vspace-0_75) var(--vspace-0_75);\n    }\n}\n\nblockquote p {\n    font-family: var(--font-1);\n    font-size: var(--text-lg);\n    font-weight: 400;\n    font-style: normal;\n    line-height: var(--vspace-1_25);\n    color: var(--color-text-dark);\n    padding: 0;\n}\n\nblockquote cite {\n    display: block;\n    font-family: var(--font-1);\n    font-weight: 400;\n    font-size: var(--text-sm);\n    line-height: var(--vspace-0_75);\n    font-style: normal;\n}\n\nblockquote cite:before {\n    content: \"\\2014 \\0020\";\n}\n\nblockquote cite,\nblockquote cite a,\nblockquote cite a:visited {\n    color: var(--color-text-light);\n    border: none;\n}\n\nfigure {\n    display: block;\n    margin-left: 0;\n    margin-right: 0;\n}\n\nfigure img+figcaption {\n    margin-top: var(--vspace-1);\n}\n\nfigcaption {\n    font-size: var(--text-sm);\n    text-align: center;\n    margin-bottom: 0;\n}\n\nvar, kbd, samp, code, pre {\n    font-family: var(--font-mono);\n}\n\npre {\n    padding: var(--vspace-0_75) var(--vspace-1) var(--vspace-1);\n    background: var(--color-gray-1);\n    overflow-x: auto;\n}\n\ncode {\n    font-size: var(--text-sm);\n    line-height: 1.6rem;\n    margin: 0 .2rem;\n    padding: calc(((var(--vspace-1) - 1.6rem) / 2) - .1rem) calc(.8rem - .1rem);\n    white-space: nowrap;\n    background: var(--color-gray-1);\n    border: 1px solid var(--color-gray-3);\n    color: var(--color-text);\n    border-radius: 3px;\n}\n\npre>code {\n    display: block;\n    white-space: pre;\n    line-height: var(--vspace-1);\n    padding: 0;\n    margin: 0;\n    border: none;\n}\n\ndel {\n    text-decoration: line-through;\n}\n\nabbr {\n    font-family: var(--font-1);\n    font-weight: 400;\n    font-variant: small-caps;\n    text-transform: lowercase;\n    letter-spacing: .1em;\n}\n\nabbr[title], dfn[title] {\n    border-bottom: 1px dotted;\n    cursor: help;\n    text-decoration: none;\n}\n\nmark {\n    background: var(--color-notice);\n    color: var(--color-black);\n}\n\nhr {\n    border: solid var(--color-border);\n    border-width: .1rem 0 0;\n    clear: both;\n    margin: var(--vspace-2) 0 calc(var(--vspace-2) - .1rem);\n    height: 0;\n}\n\nhr.fancy {\n    border: none;\n    margin: var(--vspace-2) 0;\n    height: var(--vspace-1);\n    text-align: center;\n}\n\nhr.fancy::before {\n    content: \"*****\";\n    letter-spacing: .3em;\n}\n\n\n/* -------------------------------------------------------------------\n * ## lists\n * ------------------------------------------------------------------- */\nol {\n    list-style: decimal;\n}\n\nul {\n    list-style: disc;\n}\n\nli {\n    display: list-item;\n}\n\nol, ul {\n    margin-left: 1.6rem;\n}\n\nul li {\n    padding-left: .4rem;\n}\n\nul ul, ul ol, ol ol, ol ul {\n    margin: 1.6rem 0 1.6rem 1.6rem;\n}\n\nul.disc li {\n    display: list-item;\n    list-style: none;\n    padding: 0 0 0 .8rem;\n    position: relative;\n}\n\nul.disc li::before {\n    content: \"\";\n    display: inline-block;\n    width: var(--vspace-0_25);\n    height: var(--vspace-0_25);\n    border-radius: 50%;\n    background: var(--color-1-dark);\n    position: absolute;\n    left: -.9em;\n    top: .65em;\n    vertical-align: middle;\n}\n\ndt {\n    margin: 0;\n    color: var(--color-1);\n}\n\ndd {\n    margin: 0 0 0 2rem;\n}\n\n/* -------------------------------------------------------------------\n * ## responsive video container\n * ------------------------------------------------------------------- */\n.video-container {\n    position: relative;\n    padding-bottom: 56.25%;\n    height: 0;\n    overflow: hidden;\n}\n\n.video-container iframe,\n.video-container object,\n.video-container embed,\n.video-container video {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n\n/* -------------------------------------------------------------------\n * ## floated image\n * ------------------------------------------------------------------- */\n\nimg.h-pull-right {\n    margin: var(--vspace-0_5) 0 var(--vspace-0_5) 2.8rem;\n}\n\nimg.h-pull-left {\n    margin: var(--vspace-0_5) 2.8rem var(--vspace-0_5) 0;\n}\n\n/* -------------------------------------------------------------------\n * ## tables\n * ------------------------------------------------------------------- */\ntable {\n    border-width: 0;\n    width: 100%;\n    max-width: 100%;\n    font-family: var(--font-1);\n    border-collapse: collapse;\n}\n\nth, td {\n    padding: var(--vspace-0_5) 3.2rem calc(var(--vspace-0_5) - .1rem);\n    text-align: left;\n    border-bottom: 1px solid var(--color-border);\n}\n\nth {\n    padding: var(--vspace-0_5) 3.2rem;\n    color: var(--color-text-dark);\n    font-family: var(--font-2);\n    font-weight: 600;\n}\n\nth:first-child, td:first-child {\n    padding-left: 0;\n}\n\nth:last-child, td:last-child {\n    padding-right: 0;\n}\n\n.table-responsive {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n}\n\n/* -------------------------------------------------------------------\n * ## spacing\n * ------------------------------------------------------------------- */\nfieldset,\nbutton,\n.btn {\n    margin-bottom: var(--vspace-0_5);\n}\n\ninput,\ntextarea,\nselect,\npre,\nblockquote,\nfigure,\nfigcaption,\ntable,\np,\nul,\nol,\ndl,\nform,\nimg,\n.video-container,\n.ss-custom-select {\n    margin-bottom: var(--vspace-1);\n}\n\n.folders {\n    padding: 0;\n    margin: 0;\n}\n\n\n/* ===================================================================\n * # preloader\n *\n * ------------------------------------------------------------------- */\n#preloader {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -ms-flex-flow: row wrap;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    flex-flow: row wrap;\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    background: white;\n    z-index: 500;\n    height: 100vh;\n    width: 100%;\n    opacity: 1;\n}\n\n.no-js #preloader, .oldie #preloader {\n    display: none;\n}\n\n#loader {\n    width: var(--vspace-1_5);\n    height: var(--vspace-1_5);\n    padding: 0;\n    opacity: 1;\n}\n\n#loader:before {\n    content: \"\";\n    border-top: 6px solid rgba(0, 0, 0, 0.2);\n    border-right: 6px solid rgba(0, 0, 0, 0.2);\n    border-bottom: 6px solid rgba(0, 0, 0, 0.2);\n    border-left: 6px solid black;\n    -webkit-animation: load 1.1s infinite linear;\n    animation: load 1.1s infinite linear;\n    display: block;\n    border-radius: 50%;\n    width: var(--vspace-1_5);\n    height: var(--vspace-1_5);\n}\n\n@-webkit-keyframes load {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(360deg);\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes load {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(360deg);\n        transform: rotate(360deg);\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## page loaded\n * ------------------------------------------------------------------- */\n.ss-loaded #preloader {\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transition: all .6s .9s ease-in-out;\n    transition: all .6s .9s ease-in-out;\n}\n\n.ss-loaded #preloader #loader {\n    opacity: 0;\n    -webkit-transition: opacity .6s ease-in-out;\n    transition: opacity .6s ease-in-out;\n}\n\n\n\n/* ===================================================================\n * # forms\n *\n * ------------------------------------------------------------------- */\n.form-field {\n    display: flex;\n    flex-direction: row;\n}\n\nfieldset {\n    border: none;\n}\n\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea,\nselect {\n    --input-height: var(--vspace-2);\n    --input-line-height: var(--vspace-1);\n    --input-vpadding: calc(((var(--input-height) - var(--input-line-height)) / 2) - .1rem);\n    display: block;\n    height: var(--input-height);\n    padding: var(--input-vpadding) calc(2.4rem - .1rem);\n    border: 0;\n    outline: none;\n    color: var(--color-placeholder);\n    font-family: var(--font-1);\n    font-size: var(--text-sm);\n    line-height: var(--input-line-height);\n    max-width: 100%;\n    background-color: rgba(0, 0, 0, 0.07);\n    border: 1px solid transparent;\n    -webkit-transition: all .3s ease-in-out;\n    transition: all .3s ease-in-out;\n}\n\n.ss-custom-select {\n    position: relative;\n    padding: 0;\n}\n\n.ss-custom-select select {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    text-indent: 0.01px;\n    text-overflow: '';\n    margin: 0;\n    vertical-align: middle;\n}\n\n.ss-custom-select select option {\n    padding-left: 2rem;\n    padding-right: 2rem;\n}\n\n.ss-custom-select select::-ms-expand {\n    display: none;\n}\n\n.ss-custom-select::after {\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    content: '';\n    display: block;\n    height: 8px;\n    width: 8px;\n    margin-top: -7px;\n    pointer-events: none;\n    position: absolute;\n    right: 2.4rem;\n    top: 50%;\n    -webkit-transition: all 0.15s ease-in-out;\n    transition: all 0.15s ease-in-out;\n    -webkit-transform-origin: 66% 66%;\n    transform-origin: 66% 66%;\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n}\n\ntextarea {\n    min-height: calc(7 * var(--space));\n}\n\ninput[type=\"email\"]:focus,\ninput[type=\"number\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"text\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"password\"]:focus,\ninput[type=\"file\"]:focus,\ntextarea:focus,\nselect:focus {\n    color: white;\n    background-color: var(--color-gray-16);\n    border: 1px solid var(--color-gray-16);\n}\n\nlabel, legend {\n    font-family: var(--font-1);\n    font-weight: 600;\n    font-size: var(--text-sm);\n    line-height: var(--vspace-0_5);\n    margin-bottom: var(--vspace-0_5);\n    color: var(--color-text-dark);\n    display: block;\n}\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n    display: inline;\n}\n\nlabel>.label-text {\n    display: inline-block;\n    margin-left: 1rem;\n    font-family: var(--font-1);\n    line-height: inherit;\n}\n\nlabel>input[type=\"checkbox\"], label>input[type=\"radio\"] {\n    margin: 0;\n    position: relative;\n    top: .2rem;\n}\n\n/* -------------------------------------------------------------------\n * ## style placeholder text\n * ------------------------------------------------------------------- */\n::-webkit-input-placeholder {\n    /* WebKit, Blink, Edge */\n    color: var(--color-placeholder);\n}\n\n:-ms-input-placeholder {\n    /* Internet Explorer 10-11 */\n    color: var(--color-placeholder);\n}\n\n::-ms-input-placeholder {\n    /* Microsoft Edge */\n    color: var(--color-placeholder);\n}\n\n::placeholder {\n    /* Most modern browsers support this now. */\n    color: var(--color-placeholder);\n}\n\n.placeholder {\n    color: var(--color-placeholder) !important;\n}\n\n/* -------------------------------------------------------------------\n * ## change autocomplete styles in Chrome\n * ------------------------------------------------------------------- */\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus input:-webkit-autofill,\ntextarea:-webkit-autofill,\ntextarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,\nselect:-webkit-autofill,\nselect:-webkit-autofill:hover,\nselect:-webkit-autofill:focus {\n    -webkit-text-fill-color: var(--color-1);\n    -webkit-transition: background-color 5000s ease-in-out 0s;\n    transition: background-color 5000s ease-in-out 0s;\n}\n\n\n\n/* ===================================================================\n * # buttons\n *\n * ------------------------------------------------------------------- */\n.btn,\nbutton,\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"button\"] {\n    --btn-height: var(--vspace-btn);\n    display: inline-block;\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: var(--text-xs);\n    text-transform: uppercase;\n    letter-spacing: .4em;\n    height: var(--btn-height);\n    line-height: calc(var(--btn-height) - .4rem);\n    padding: 0 3.2rem;\n    margin: 0 .4rem 1.6rem 0;\n    color: var(--color-btn-text);\n    text-decoration: none;\n    text-align: center;\n    white-space: nowrap;\n    cursor: pointer;\n    -webkit-transition: all .3s;\n    transition: all .3s;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    background-color: var(--color-btn);\n    border: 0.2rem solid var(--color-btn);\n}\n\n.btn:hover,\nbutton:hover,\ninput[type=\"submit\"]:hover,\ninput[type=\"reset\"]:hover,\ninput[type=\"button\"]:hover,\n.btn:focus, button:focus,\ninput[type=\"submit\"]:focus,\ninput[type=\"reset\"]:focus,\ninput[type=\"button\"]:focus {\n    background-color: var(--color-btn-hover);\n    border-color: var(--color-btn-hover);\n    color: var(--color-btn-hover-text);\n    outline: 0;\n}\n\n/* button primary\n * ------------------------------------------------- */\n.btn.btn--primary,\nbutton.btn--primary,\ninput[type=\"submit\"].btn--primary,\ninput[type=\"reset\"].btn--primary,\ninput[type=\"button\"].btn--primary {\n    background: var(--color-btn-primary);\n    border-color: var(--color-btn-primary);\n    color: var(--color-btn-primary-text);\n}\n\n.btn.btn--primary:hover,\nbutton.btn--primary:hover,\ninput[type=\"submit\"].btn--primary:hover,\ninput[type=\"reset\"].btn--primary:hover,\ninput[type=\"button\"].btn--primary:hover,\n.btn.btn--primary:focus,\nbutton.btn--primary:focus,\ninput[type=\"submit\"].btn--primary:focus,\ninput[type=\"reset\"].btn--primary:focus,\ninput[type=\"button\"].btn--primary:focus {\n    background: var(--color-btn-primary-hover);\n    border-color: var(--color-btn-primary-hover);\n    color: var(--color-btn-primary-hover-text);\n}\n\n/* button modifiers\n * ------------------------------------------------- */\n.btn.h-full-width, button.h-full-width {\n    width: 100%;\n    margin-right: 0;\n}\n\n.btn--small, button.btn--small {\n    --btn-height: calc(var(--vspace-btn) - 1.6rem);\n}\n\n.btn--medium, button.btn--medium {\n    --btn-height: calc(var(--vspace-btn) + .8rem);\n}\n\n.btn--large, button.btn--large {\n    --btn-height: calc(var(--vspace-btn) + 1.6rem);\n}\n\n.btn--stroke, button.btn--stroke {\n    background: transparent !important;\n    border: 0.2rem solid var(--color-btn-stroke);\n    color: var(--color-btn-stroke-text);\n}\n\n.btn--stroke:hover, button.btn--stroke:hover {\n    background: var(--color-btn-stroke-hover) !important;\n    border: 0.2rem solid var(--color-btn-stroke-hover);\n    color: var(--color-btn-stroke-hover-text);\n}\n\n.btn--pill, button.btn--pill {\n    padding-left: 3.2rem !important;\n    padding-right: 3.2rem !important;\n    border-radius: 1000px !important;\n}\n\nbutton::-moz-focus-inner, input::-moz-focus-inner {\n    border: 0;\n    padding: 0;\n}\n\n\n\n/* ===================================================================\n * # additional components\n *\n * ------------------------------------------------------------------- */\n\n/* -------------------------------------------------------------------\n * ## additional typo styles\n * ------------------------------------------------------------------- */\n.drop-cap:first-letter {\n    float: left;\n    font-family: var(--font-2);\n    font-weight: 700;\n    font-size: calc(3 * var(--space));\n    line-height: 1;\n    padding: 0 0.125em 0 0;\n    text-transform: uppercase;\n    background: transparent;\n    color: var(--color-text-dark);\n}\n\n/* line definition style\n * ----------------------------------------------- */\n.lining dt, .lining dd {\n    display: inline;\n    margin: 0;\n}\n\n.lining dt+dt:before, .lining dd+dt:before {\n    content: \"\\A\";\n    white-space: pre;\n}\n\n.lining dd+dd:before {\n    content: \", \";\n}\n\n.lining dd+dd:before {\n    content: \", \";\n}\n\n.lining dd:before {\n    content: \": \";\n    margin-left: -0.2em;\n}\n\n/* dictionary definition style\n * ----------------------------------------------- */\n.dictionary-style dt {\n    display: inline;\n    counter-reset: definitions;\n}\n\n.dictionary-style dt+dt:before {\n    content: \", \";\n    margin-left: -0.2em;\n}\n\n.dictionary-style dd {\n    display: block;\n    counter-increment: definitions;\n}\n\n.dictionary-style dd:before {\n    content: counter(definitions, decimal) \". \";\n}\n\n/**\n * Pull Quotes\n * -----------\n * markup:\n *\n * <figure class=\"pull-quote\">\n *\t\t<blockquote>\n *\t\t\t<p></p>\n *\t\t</blockquote>\n * </figure>\n *\n * --------------------------------------------------------------------- */\n.pull-quote {\n    position: relative;\n    padding: 0;\n    margin-top: 0;\n    text-align: center;\n}\n\n.pull-quote blockquote {\n    border: none;\n    margin: 0 auto;\n    max-width: 62rem;\n    padding-top: var(--vspace-2_5);\n    position: relative;\n}\n\n.pull-quote blockquote p {\n    font-weight: 400;\n    color: var(--color-text-dark);\n}\n\n.pull-quote blockquote:before {\n    content: \"\";\n    display: block;\n    height: var(--vspace-1);\n    width: var(--vspace-1);\n    background-repeat: no-repeat;\n    background: center center;\n    background-size: contain;\n    /*background-image: url(../images/icons/icon-quote.svg);*/\n    -webkit-transform: translate3d(-50%, 0, 0);\n    transform: translate3d(-50%, 0, 0);\n    position: absolute;\n    top: var(--vspace-1);\n    left: 50%;\n}\n\n/**\n * Stats Tab\n * ---------\n * markup:\n *\n * <ul class=\"stats-tabs\">\n *\t\t<li><a href=\"#\">[value]<em>[name]</em></a></li>\n *\t</ul>\n *\n * Extend this object into your markup.\n *\n * --------------------------------------------------------------------- */\n.stats-tabs {\n    padding: 0;\n    margin: var(--vspace-1) 0;\n}\n\n.stats-tabs li {\n    display: inline-block;\n    margin: 0 1.6rem var(--vspace-0_5) 0;\n    padding: 0 1.5rem 0 0;\n    border-right: 1px solid var(--color-border);\n}\n\n.stats-tabs li:last-child {\n    margin: 0;\n    padding: 0;\n    border: none;\n}\n\n.stats-tabs li a {\n    display: inline-block;\n    font-size: var(--text-lg);\n    font-family: var(--font-2);\n    font-weight: 600;\n    line-height: var(--vspace-1_5);\n    border: none;\n    color: var(--color-black);\n}\n\n.stats-tabs li a:hover {\n    color: var(--color-1);\n}\n\n.stats-tabs li a em {\n    display: block;\n    margin: 0;\n    font-family: var(--font-1);\n    font-size: var(--text-sm);\n    line-height: var(--vspace-0_5);\n    font-weight: normal;\n    font-style: normal;\n    color: var(--color-text-light);\n}\n\n/* -------------------------------------------------------------------\n * ## skillbars\n * ------------------------------------------------------------------- */\n.skill-bars {\n    list-style: none;\n    margin: var(--vspace-2) 0 var(--vspace-1);\n}\n\n.skill-bars li {\n    height: .4rem;\n    background: var(--color-gray-3);\n    width: 100%;\n    margin-bottom: calc(var(--vspace-2) - .4rem);\n    padding: 0;\n    position: relative;\n}\n\n.skill-bars li strong {\n    position: absolute;\n    left: 0;\n    top: calc((var(--vspace-1) * 1.25) * -1);\n    font-family: var(--font-2);\n    font-weight: 500;\n    color: white;\n    text-transform: uppercase;\n    letter-spacing: .2em;\n    font-size: calc(var(--text-size) * 0.7778);\n    line-height: calc(0.75 * var(--space));\n}\n\n.skill-bars li .progress {\n    background: var(--color-black);\n    position: relative;\n    height: 100%;\n}\n\n.skill-bars li .progress span {\n    position: absolute;\n    right: 0;\n    top: calc((var(--vspace-1) + .8rem)* -1);\n    display: block;\n    font-family: var(--font-2);\n    color: white;\n    font-size: 1rem;\n    line-height: 1;\n    background: var(--color-black);\n    padding: calc(0.25 * var(--space)) calc(0.25 * var(--space));\n    border-radius: 4px;\n}\n\n.skill-bars li .progress span::after {\n    position: absolute;\n    left: 50%;\n    bottom: -10px;\n    margin-left: -5px;\n    width: 0;\n    height: 0;\n    border: 5px solid transparent;\n    border-top-color: var(--color-black, var(--color-black));\n    content: \"\";\n}\n\n.skill-bars li .percent5 {\n    width: 5%;\n}\n\n.skill-bars li .percent10 {\n    width: 10%;\n}\n\n.skill-bars li .percent15 {\n    width: 15%;\n}\n\n.skill-bars li .percent20 {\n    width: 20%;\n}\n\n.skill-bars li .percent25 {\n    width: 25%;\n}\n\n.skill-bars li .percent30 {\n    width: 30%;\n}\n\n.skill-bars li .percent35 {\n    width: 35%;\n}\n\n.skill-bars li .percent40 {\n    width: 40%;\n}\n\n.skill-bars li .percent45 {\n    width: 45%;\n}\n\n.skill-bars li .percent50 {\n    width: 50%;\n}\n\n.skill-bars li .percent55 {\n    width: 55%;\n}\n\n.skill-bars li .percent60 {\n    width: 60%;\n}\n\n.skill-bars li .percent65 {\n    width: 65%;\n}\n\n.skill-bars li .percent70 {\n    width: 70%;\n}\n\n.skill-bars li .percent75 {\n    width: 75%;\n}\n\n.skill-bars li .percent80 {\n    width: 80%;\n}\n\n.skill-bars li .percent85 {\n    width: 85%;\n}\n\n.skill-bars li .percent90 {\n    width: 90%;\n}\n\n.skill-bars li .percent95 {\n    width: 95%;\n}\n\n.skill-bars li .percent100 {\n    width: 100%;\n}\n\n/* -------------------------------------------------------------------\n * ## alert box\n * ------------------------------------------------------------------- */\n.alert-box {\n    padding: var(--vspace-0_75) 4rem var(--vspace-0_75) 3.2rem;\n    margin-bottom: var(--vspace-1);\n    border-radius: 4px;\n    font-family: var(--font-1);\n    font-weight: 500;\n    font-size: var(--text-sm);\n    line-height: var(--vspace-0_75);\n    opacity: 1;\n    visibility: visible;\n    position: relative;\n}\n\n.alert-box__close {\n    position: absolute;\n    display: block;\n    right: 1.6rem;\n    top: 1.6rem;\n    cursor: pointer;\n    width: 12px;\n    height: 12px;\n}\n\n.alert-box__close::before, .alert-box__close::after {\n    content: '';\n    position: absolute;\n    display: inline-block;\n    width: 2px;\n    height: 12px;\n    top: 0;\n    left: 5px;\n}\n\n.alert-box__close::before {\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n}\n\n.alert-box__close::after {\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n}\n\n.alert-box--error {\n    background-color: var(--color-error);\n    color: var(--color-error-content);\n}\n\n.alert-box--error .alert-box__close::before,\n.alert-box--error .alert-box__close::after {\n    background-color: var(--color-error-content);\n}\n\n.alert-box--success {\n    background-color: var(--color-success);\n    color: var(--color-success-content);\n}\n\n.alert-box--success .alert-box__close::before,\n.alert-box--success .alert-box__close::after {\n    background-color: var(--color-success-content);\n}\n\n.alert-box--info {\n    background-color: var(--color-info);\n    color: var(--color-info-content);\n}\n\n.alert-box--info .alert-box__close::before,\n.alert-box--info .alert-box__close::after {\n    background-color: var(--color-info-content);\n}\n\n.alert-box--notice {\n    background-color: var(--color-notice);\n    color: var(--color-notice-content);\n}\n\n.alert-box--notice .alert-box__close::before,\n.alert-box--notice .alert-box__close::after {\n    background-color: var(--color-notice-content);\n}\n\n.alert-box.hideit {\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transition: all .5s;\n    transition: all .5s;\n}\n\n/* -------------------------------------------------------------------\n * ## pagination\n * ------------------------------------------------------------------- */\n.pgn {\n    --pgn-num-height: calc(var(--vspace-1) + .4rem);\n    margin: var(--vspace-1) auto var(--vspace-1);\n    text-align: center;\n}\n\n.pgn ul {\n    display: inline-block;\n    list-style: none;\n    margin-left: 0;\n    position: relative;\n    padding: 0 6rem;\n}\n\n.pgn ul li {\n    display: inline-block;\n    margin: 0;\n    padding: 0;\n}\n\n.pgn__num {\n    display: inline-block;\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: var(--text-size);\n    line-height: var(--vspace-1);\n    padding: .2rem 1.2rem;\n    height: var(--pgn-num-height);\n    margin: .2rem .2rem;\n    color: var(--color-text-dark);\n    border-radius: 4px;\n    -webkit-transition: all, .3s, ease-in-out;\n    transition: all, .3s, ease-in-out;\n}\n\n.pgn__num:hover {\n    background: var(--color-gray-18);\n    color: var(--color-white);\n}\n\n.pgn .current, .pgn .current:hover {\n    background-color: var(--color-gray-18);\n    color: var(--color-white);\n}\n\n.pgn .inactive, .pgn .inactive:hover {\n    opacity: 0.4;\n    cursor: default;\n}\n\n.pgn__prev, .pgn__next {\n    display: -ms-inline-flexbox;\n    display: -webkit-inline-box;\n    display: inline-flex;\n    -ms-flex-flow: row wrap;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    flex-flow: row wrap;\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n    height: var(--pgn-num-height);\n    width: 4.8rem;\n    line-height: var(--vspace-1);\n    border-radius: 4px;\n    padding: 0;\n    margin: 0;\n    opacity: 1;\n    font: 0/0 a;\n    text-shadow: none;\n    color: transparent;\n    -webkit-transition: all, .3s, ease-in-out;\n    transition: all, .3s, ease-in-out;\n    position: absolute;\n    top: 50%;\n    -webkit-transform: translate3d(0, -50%, 0);\n    transform: translate3d(0, -50%, 0);\n}\n\n.pgn__prev:hover, .pgn__next:hover {\n    background-color: var(--color-gray-18);\n}\n\n.pgn__prev svg, .pgn__next svg {\n    height: 2.4rem;\n    width: 2.4rem;\n    -webkit-transition: all, .3s, ease-in-out;\n    transition: all, .3s, ease-in-out;\n}\n\n.pgn__prev svg path, .pgn__next svg path {\n    fill: var(--color-text-dark);\n}\n\n.pgn__prev:hover svg path,\n.pgn__prev:focus svg path,\n.pgn__next:hover svg path,\n.pgn__next:focus svg path {\n    fill: white;\n}\n\n.pgn__prev {\n    left: 0;\n}\n\n.pgn__next {\n    right: 0;\n}\n\n.pgn__prev.inactive,\n.pgn__next.inactive {\n    opacity: 0.4;\n    cursor: default;\n}\n\n.pgn__prev.inactive:hover,\n.pgn__next.inactive:hover {\n    background-color: transparent;\n}\n\n/* -------------------------------------------------------------------\n * responsive:\n * pagination\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 600px) {\n    .pgn ul {\n        padding: 0 5.2rem;\n    }\n}\n\n\n\n/* ===================================================================\n * # common and reusable styles\n *\n * ------------------------------------------------------------------- */\n.wide {\n    max-width: var(--width-wide);\n}\n\n.wider {\n    max-width: var(--width-wider);\n}\n\n.narrow {\n    max-width: var(--width-narrow);\n}\n\n.narrower {\n    max-width: var(--width-narrower);\n}\n\n/* -------------------------------------------------------------------\n * ## animation stuff\n * ------------------------------------------------------------------- */\n.animate-this {\n    opacity: 0;\n    visibility: hidden;\n}\n\n.no-js .animate-this, .no-cssanimations .animate-this {\n    opacity: 1;\n    visibility: visible;\n}\n\n.animated {\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-fill-mode: both;\n    animation-fill-mode: both;\n    -webkit-animation-name: fadeInUp;\n    animation-name: fadeInUp;\n}\n\n/* fade in */\n@-webkit-keyframes fadeInUp {\n    from {\n        opacity: 0;\n        visibility: hidden;\n        -webkit-transform: translate3d(0, 150%, 0);\n        transform: translate3d(0, 150%, 0);\n    }\n    to {\n        opacity: 1;\n        visibility: visible;\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n    }\n}\n\n@keyframes fadeInUp {\n    from {\n        opacity: 0;\n        visibility: hidden;\n        -webkit-transform: translate3d(0, 150%, 0);\n        transform: translate3d(0, 150%, 0);\n    }\n    to {\n        opacity: 1;\n        visibility: visible;\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n    }\n}\n\n\n/* -------------------------------------------------------------------\n * ## slick slider\n * ------------------------------------------------------------------- */\n.slick-slider .slick-slide {\n    outline: none;\n}\n\n.slick-slider .slick-dots {\n    display: block;\n    list-style: none;\n    width: 100%;\n    padding: 0;\n    margin: var(--vspace-1) 0 0 0;\n    text-align: center;\n    position: absolute;\n    top: 100%;\n    left: 0;\n}\n\n.slick-slider .slick-dots li {\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    margin: 0;\n    padding: 5px;\n    cursor: pointer;\n}\n\n.slick-slider .slick-dots li button {\n    display: block;\n    width: 10px;\n    height: 10px;\n    line-height: 10px;\n    border-radius: 50%;\n    background: rgba(255, 255, 255, 0.6);\n    border: none;\n    padding: 0;\n    margin: 0;\n    cursor: pointer;\n    font: 0/0 a;\n    text-shadow: none;\n    color: transparent;\n}\n\n.slick-slider .slick-dots li button:hover,\n.slick-slider .slick-dots li button:focus {\n    outline: none;\n}\n\n.slick-slider .slick-dots li.slick-active button,\n.slick-slider .slick-dots li:hover button {\n    background: white;\n}\n\n/* -------------------------------------------------------------------\n * ## masonry entries\n * ------------------------------------------------------------------- */\n.bricks-wrapper .entry {\n    margin-bottom: 1rem;\n}\n\n.bricks-wrapper .entry__thumb,\n.bricks-wrapper .entry__text {\n    -webkit-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);\n    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);\n}\n\n.bricks-wrapper .entry__thumb {\n    overflow: hidden;\n    position: relative;\n}\n\n.bricks-wrapper .entry__thumb img {\n    vertical-align: bottom;\n    -webkit-transition: all 0.3s ease-in-out;\n    transition: all 0.3s ease-in-out;\n    margin: 0;\n}\n\n.bricks-wrapper .entry__thumb .thumb-link::before {\n    z-index: 1;\n    content: \"\";\n    display: block;\n    background: rgba(0, 0, 0, 0.8);\n    opacity: 0;\n    visibility: hidden;\n    width: 100%;\n    height: 100%;\n    -webkit-transition: all 0.3s ease-in-out;\n    transition: all 0.3s ease-in-out;\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n\n.bricks-wrapper .entry__thumb .thumb-link::after {\n    z-index: 1;\n    display: block;\n    content: \"...\";\n    font-family: georgia, serif;\n    font-size: 3.2rem;\n    height: 90px;\n    width: 90px;\n    letter-spacing: .2rem;\n    line-height: 90px;\n    margin-left: -45px;\n    margin-top: -45px;\n    text-align: center;\n    color: white;\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5);\n    -webkit-transition: all 0.3s ease-in-out;\n    transition: all 0.3s ease-in-out;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n}\n\n.bricks-wrapper .entry__thumb:hover .thumb-link::before {\n    opacity: 1;\n    visibility: visible;\n}\n\n.bricks-wrapper .entry__thumb:hover .thumb-link::after {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: scale(1);\n    transform: scale(1);\n}\n\n.bricks-wrapper .entry__thumb:hover .thumb-link img {\n    -webkit-transform: scale(1.05);\n    transform: scale(1.05);\n}\n\n.bricks-wrapper .entry__text {\n    padding-left: 2rem;\n    padding-right: 2rem;\n    padding-bottom: 1rem;\n    padding-top: 1rem;\n    background-color: white;\n}\n\n.bricks-wrapper .entry__title {\n    font-size: var(--text-lg);\n    font-weight: 500;\n    line-height: var(--vspace-1);\n    margin-top: 0;\n    margin-bottom: var(--vspace-0_5);\n}\n\n.bricks-wrapper .entry__title a,\n.bricks-wrapper .entry__title a:visited {\n    color: black;\n}\n\n.bricks-wrapper .entry__meta {\n    font-family: var(--font-1);\n    font-size: var(--text-sm);\n    margin-bottom: calc(0.125 * var(--space));\n}\n\n.bricks-wrapper .entry__meta a,\n.bricks-wrapper .entry__meta a:visited {\n    color: black;\n}\n\n.bricks-wrapper .entry__cat-links a::after {\n    content: \", \";\n}\n\n.bricks-wrapper .entry__cat-links a:last-child::after {\n    display: none;\n}\n\n.bricks-wrapper .entry__excerpt {\n    font-size: 1.5rem;\n    line-height: 1.733;\n    color: var(--color-text-light);\n}\n\n.bricks-wrapper .entry__excerpt p {\n    margin-bottom: 0;\n}\n\n/* featured post slider\n * ------------------------------------------------------------------- */\n.featured-grid .entry__content {\n    position: relative;\n}\n\n.featured-grid .entry__content:hover .f-slide__overlay {\n    background-color: rgba(0, 0, 0, 0.5);\n}\n\n.f-slide {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n    height: 600px;\n    width: 100%;\n    background-color: white;\n    padding: var(--vspace-2) 15% var(--vspace-1);\n    text-align: center;\n    position: relative;\n}\n\n.f-slide__background {\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n}\n\n.f-slide__overlay {\n    background-color: rgba(0, 0, 0, 0.3);\n    -webkit-transition: all 0.3s ease-in-out;\n    transition: all 0.3s ease-in-out;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n}\n\n.f-slide__content {\n    position: relative;\n}\n\n.f-slide__meta {\n    font-family: var(--font-1);\n    font-size: set-text-size(0.8888);\n    margin: -3.2rem 0 0.8rem 0;\n    color: rgba(255, 255, 255, 0.6);\n    line-height: 1.5;\n}\n\n.f-slide__meta li {\n    display: inline-block;\n    margin: 0 3px;\n    padding: 0;\n}\n\n.f-slide__meta li a {\n    color: rgba(255, 255, 255, 0.6);\n}\n\n.f-slide__meta li a:hover,\n.f-slide__meta li a:focus {\n    color: white;\n    border-color: rgba(255, 255, 255, 0.2);\n}\n\n.f-slide__title {\n    font-family: var(--font-2);\n    font-weight: 500;\n    font-size: var(--text-xxl);\n    line-height: 1.286;\n    margin-top: 0;\n    margin-bottom: var(--vspace-1);\n    color: white;\n}\n\n.f-slide__title a {\n    color: white;\n    border-bottom: 1px solid transparent;\n}\n\n.f-slide__title a:hover, .f-slide__title a:focus {\n    color: white;\n    border-color: rgba(255, 255, 255, 0.1);\n}\n\n/* featured-post-slider direction nav\n * --------------------------------------------------------- */\n.featured-post-nav button {\n    z-index: 2;\n    background-color: black;\n    border: black;\n    padding: 0;\n    margin: 0;\n    height: 6rem;\n    width: 6rem;\n    cursor: pointer;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    position: absolute;\n    top: 50%;\n}\n\n.featured-post-nav button svg {\n    height: 2rem;\n    width: 2rem;\n}\n\n.featured-post-nav button svg path {\n    fill: rgba(255, 255, 255, 0.5);\n    -webkit-transition: all .3s;\n    transition: all .3s;\n}\n\n.featured-post-nav button:hover svg path,\n.featured-post-nav button:focus svg path {\n    fill: white;\n}\n\n.featured-post-nav__prev {\n    left: 0;\n}\n\n.featured-post-nav__next {\n    right: 0;\n}\n\n/*  post formats - masonry view\n * ------------------------------------------------------------------- */\n\n/* format quote & format link\n * --------------------------------------- */\n.format-quote, .format-link {\n    text-align: center;\n}\n\n.format-quote .entry__thumb,\n.format-link .entry__thumb {\n    display: table;\n    background: white;\n    padding: 2.4rem 3rem 4.8rem;\n    min-height: 320px;\n    width: 100%;\n    position: relative;\n}\n\n.format-quote .entry__thumb::before,\n.format-link .entry__thumb::before {\n    content: \"\";\n    display: block;\n    height: 3.6rem;\n    width: 3.6rem;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-size: contain;\n    margin-bottom: 1.5rem;\n    position: absolute;\n    top: var(--vspace-1_25);\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n    transform: translateX(-50%);\n}\n\n.format-quote blockquote::before {\n    display: none;\n}\n\n.format-quote blockquote,\n.format-link .link-wrap {\n    display: table-cell;\n    margin: 0;\n    padding: 0;\n    vertical-align: middle;\n    border: none;\n}\n\n.format-quote blockquote p,\n.format-link .link-wrap p {\n    font-family: var(--font-2);\n    font-weight: 500;\n    font-size: var(--text-lg);\n    line-height: var(--vspace-1);\n    color: black;\n    padding: 7.8rem 0 0 0;\n    margin-bottom: var(--vspace-1);\n}\n\n.format-quote cite, .format-link cite {\n    display: block;\n    font-family: var(--font-1);\n    font-size: 1.5rem;\n    font-style: normal;\n    line-height: 1.6;\n    color: var(--color-text-light);\n}\n\n.format-quote cite::before,\n.format-link cite::before {\n    display: none;\n}\n\n.format-quote cite a,\n.format-quote cite a:visited {\n    color: var(--color-text-light);\n    border: none;\n}\n\n.format-quote .entry__thumb::before {\n    /*background-image: url(../images/icons/icon-quote.svg);*/\n}\n\n.format-link .entry__thumb::before {\n    /*background-image: url(../images/icons/icon-link.svg);*/\n    width: 3.2rem;\n    height: 3.2rem;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 3rem 3rem;\n}\n\n.format-link .link-wrap cite:before {\n    display: none;\n}\n\n.format-link .link-wrap cite a,\n.format-link .link-wrap cite a:visited {\n    color: var(--color-text-light);\n    display: inline-block;\n    padding-bottom: .4rem;\n}\n\n.format-link .link-wrap cite a:hover,\n.format-link .link-wrap cite a:focus {\n    color: black;\n}\n\n/* format video & format audio\n * --------------------------------------- */\n.format-video .entry__thumb::after,\n.format-audio .entry__thumb::after {\n    content: \"\";\n    display: block;\n    height: 5.6rem;\n    width: 5.6rem;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-color: rgba(0, 0, 0, 0.3);\n    border-radius: 50%;\n    position: absolute;\n    top: 2.4rem;\n    left: 2.4rem;\n}\n\n.format-video .thumb-link::before,\n.format-video .thumb-link::after,\n.format-audio .thumb-link::before,\n.format-audio .thumb-link::after {\n    display: none !important;\n}\n\n.format-video .entry__thumb::after {\n    cursor: -webkit-zoom-in;\n    cursor: zoom-in;\n    /*background-image: url(../images/icons/icon-video.svg);*/\n    background-size: 2.8rem 2.8rem;\n}\n\n.format-video .entry__thumb-link {\n    cursor: -webkit-zoom-in;\n    cursor: zoom-in;\n}\n\n.format-audio .entry__thumb::after {\n    /*background-image: url(../images/icons/icon-audio.svg);*/\n    background-size: 2.8rem 2.8rem;\n}\n\n/* -------------------------------------------------------------------\n * ## format gallery\n * ------------------------------------------------------------------- */\n.format-gallery .entry__thumb {\n    overflow: hidden;\n}\n\n.format-gallery .slider {\n    overflow: hidden;\n}\n\n.format-gallery .slick-dots {\n    text-align: right;\n    margin: 0;\n    padding: 0 2.4rem 0 2rem;\n    position: absolute;\n    top: auto;\n    bottom: var(--vspace-0_75);\n    right: 0;\n}\n\n.format-gallery .slider__slides {\n    cursor: pointer;\n    overflow: hidden;\n    opacity: 0;\n    visibility: hidden;\n}\n\n.format-gallery .slider__slides.slick-initialized {\n    opacity: 1;\n    visibility: visible;\n}\n\n/* responsive:\n/* common and reusable styles\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1400px) {\n    .bricks-wrapper .entry {\n        margin-bottom: 1rem;\n    }\n}\n\n@media screen and (max-width: 1040px) {\n    .bricks-wrapper .entry__title,\n    .format-quote blockquote p,\n    .format-link .link-wrap p {\n        font-size: var(--text-md);\n        line-height: calc(0.875 * var(--space));\n    }\n}\n\n@media screen and (max-width: 980px) {\n    .bricks-wrapper .entry__title,\n    .format-quote blockquote p,\n    .format-link .link-wrap p {\n        font-size: var(--text-lg);\n        line-height: var(--vspace-1);\n    }\n}\n\n@media screen and (max-width: 800px) {\n    .bricks-wrapper .entry {\n        margin-bottom: 1rem;\n    }\n}\n\n@media screen and (max-width: 700px) {\n    .bricks-wrapper .entry {\n        margin-bottom: 1rem;\n    }\n    .bricks-wrapper .entry__title,\n    .format-quote blockquote p,\n    .format-link .link-wrap p {\n        font-size: var(--text-md);\n        line-height: calc(0.875 * var(--space));\n    }\n}\n\n@media screen and (max-width: 600px) {\n    .bricks-wrapper .entry {\n        margin-bottom: 1rem;\n    }\n    .bricks-wrapper .entry__title,\n    .format-quote blockquote p,\n    .format-link .link-wrap p {\n        font-size: var(--text-lg);\n        line-height: var(--vspace-1);\n    }\n    .f-slide {\n        height: 552px;\n    }\n    .f-slide__meta {\n        font-size: var(--text-sm);\n    }\n    .f-slide__title {\n        font-size: var(--text-xl);\n    }\n    .featured-post-nav button {\n        height: 5.2rem;\n        width: 5.2rem;\n        -webkit-transform: translateY(0);\n        transform: translateY(0);\n        top: auto;\n        bottom: 0;\n    }\n    .featured-post-nav button svg {\n        height: 1.6rem;\n        width: 1.6rem;\n    }\n}\n\n@media screen and (max-width: 400px) {\n    .bricks-wrapper .entry {\n        margin-bottom: 1rem;\n    }\n    .f-slide {\n        height: 440px;\n    }\n    .featured-post-nav button {\n        height: 4.4rem;\n        width: 4.4rem;\n    }\n    .featured-post-nav button svg {\n        height: 1.4rem;\n        width: 1.4rem;\n    }\n}\n\n\n\n\n\n\n\n/* ===================================================================\n * # pageheader\n *\n * ------------------------------------------------------------------- */\n.s-pageheader {\n    padding: var(--vspace-1_5) 0 0 0;\n    text-align: center;\n}\n\n.s-pageheader .row {\n    max-width: 900px;\n}\n\n.s-pageheader h1 {\n    margin-top: 0;\n    margin-bottom: var(--vspace-1);\n}\n\n\n\n/* ===================================================================\n * # content wrap\n *\n * ------------------------------------------------------------------- */\n.s-content {\n    --row-max-width: 1080px;\n    padding-top: var(--topspace);\n    padding-bottom: var(--vspace-0_125);\n}\n\n.s-content--single {\n    padding-bottom: var(--vspace-0_125);\n}\n\n.s-content .row {\n    max-width: var(--row-max-width);\n}\n\n.s-content .row.wide {\n    max-width: 1400px;\n}\n\n.s-content .row.narrow {\n    max-width: 800px;\n}\n\n.s-content__media {\n    position: relative;\n    margin-bottom: var(--vspace-2_5);\n}\n\n.s-content__media img {\n    vertical-align: bottom;\n    margin-bottom: 0;\n}\n\n.s-content__primary {\n    padding-left: 20rem;\n    padding-right: 20rem;\n}\n\n.s-content__primary img {\n    max-width: calc(var(--row-max-width) - var(--gutter-lg) * 2);\n    margin: var(--vspace-1) 0 var(--vspace-1) -8rem;\n}\n\n.s-content__title {\n    text-align: center;\n}\n\n.s-content__title--post {\n    margin-bottom: var(--vspace-0_25);\n}\n\n.s-content__blocks h4 {\n    margin-top: 0;\n}\n\n.s-content__form {\n    margin-top: var(--vspace-2);\n}\n\n/* responsive:\n * content wrap\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1200px) {\n    .s-content {\n        --row-max-width: 1000px;\n    }\n    .s-content__primary {\n        padding-left: 4.8rem;\n        padding-right: 4.8rem;\n    }\n    .s-content__primary img {\n        max-width: calc(var(--row-max-width) - var(--gutter-md) * 2);\n        margin: var(--vspace-1) 0 var(--vspace-1) -4.8rem;\n    }\n}\n\n@media screen and (max-width: 1100px) {\n    .s-content {\n        --row-max-width: 920px;\n    }\n    .s-content__primary {\n        padding-left: 4rem;\n        padding-right: 4rem;\n    }\n    .s-content__primary img {\n        margin: var(--vspace-1) 0 var(--vspace-1) -4rem;\n    }\n}\n\n@media screen and (max-width: 1020px) {\n    .s-content__primary {\n        padding-left: 3.2rem;\n        padding-right: 3.2rem;\n    }\n    .s-content__primary img {\n        max-width: 100%;\n        margin: var(--vspace-1) 0;\n    }\n}\n\n@media screen and (max-width: 800px) {\n    .s-content {\n        padding-top: var(--topspace);\n    }\n    .s-content__primary {\n        padding-left: 0;\n        padding-right: 0;\n    }\n    .s-content__media {\n        margin-bottom: var(--vspace-2);\n    }\n}\n\n@media screen and (max-width: 600px) {\n    .s-content {\n        padding-top: var(--topspace);\n    }\n    .s-content__media {\n        margin-bottom: var(--vspace-1_5);\n    }\n}\n\n@media screen and (max-width: 400px) {\n    .s-content__title {\n        font-size: var(--text-xxl);\n        line-height: var(--vspace-1_5);\n    }\n}\n\n\n\n/* ===================================================================\n * # bricks masonry\n *\n * ------------------------------------------------------------------- */\n.s-bricks {\n    padding-top: 4.2rem;\n}\n\n.s-bricks.with-top-sep {\n    position: relative;\n}\n\n.s-bricks.with-top-sep::before {\n    content: \"\";\n    display: block;\n    position: absolute;\n    left: 50%;\n    top: 0;\n    margin-left: -100px;\n    width: 200px;\n    height: 1px;\n    background-color: var(--color-border);\n}\n\n.s-bricks .masonry {\n    max-width: 1440px;\n    width: 94%;\n    margin: 0 auto var(--vspace-1);\n}\n\n.s-bricks .pagination {\n    margin-top: 6rem;\n}\n\n.bricks-wrapper .grid-sizer,\n.bricks-wrapper .brick {\n    width: 100%;\n}\n\n.bricks-wrapper .brick {\n    padding: 0;\n}\n\n.bricks-wrapper .featured-grid {\n    width: 100%;\n}\n\n.bricks-wrapper .featured-grid .entry-content {\n    width: 100%;\n    background: #151515;\n}\n\n/* responsive:\n/* bricks masonry\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1440px) {\n    .s-bricks .masonry {\n        width: 98%;\n    }\n}\n\n@media screen and (max-width: 1400px) {\n    .s-bricks .masonry {\n        max-width: var(--width-max);\n        width: 94%;\n    }\n    .bricks-wrapper .grid-sizer,\n    .bricks-wrapper .brick {\n        width: 100%;\n    }\n    .bricks-wrapper .brick {\n        padding: 0;\n    }\n    .bricks-wrapper .featured-grid {\n        width: 100%;\n    }\n}\n\n@media screen and (max-width: 980px) {\n    .s-bricks .masonry {\n        max-width: 780px;\n        width: 96%;\n    }\n    .bricks-wrapper .grid-sizer,\n    .bricks-wrapper .brick {\n        width: 100%;\n    }\n    .bricks-wrapper .featured-grid {\n        width: 100%;\n    }\n}\n\n@media screen and (max-width: 800px) {\n    .bricks-wrapper .brick {\n        padding: 0;\n    }\n}\n\n@media screen and (max-width: 700px) {\n    .bricks-wrapper .brick {\n        padding: 0;\n    }\n}\n\n@media screen and (max-width: 600px) {\n    .s-bricks .masonry {\n        max-width: 480px;\n        width: 100%;\n        padding-left: 6vw;\n        padding-right: 6vw;\n    }\n    .bricks-wrapper .grid-sizer,\n    .bricks-wrapper .brick {\n        float: none;\n        width: 100%;\n        padding: 0 var(--gutter-mob);\n        clear: both;\n    }\n}\n\n@media screen and (max-width: 400px) {\n    .bricks-wrapper .brick {\n        margin-left: 0;\n        margin-right: 0;\n        padding: 0;\n    }\n}\n\n\n\n/* ===================================================================\n * # footer\n *\n * ------------------------------------------------------------------- */\n.s-footer {\n    padding-top: var(--vspace-2_5);\n    padding-bottom: var(--vspace-2);\n    font-size: 1.6rem;\n    line-height: 2.8rem;\n    color: var(--color-text-light);\n}\n\n.s-footer .row {\n    max-width: 1240px;\n}\n\n.s-footer [class*=\"column\"] {\n    margin-bottom: var(--vspace-0_5);\n}\n\n.s-footer a {\n    color: black;\n}\n\n.s-footer h5 {\n    font-size: var(--text-size);\n    font-weight: 500;\n    padding-bottom: var(--vspace-0_75);\n    margin-bottom: var(--vspace-0_75);\n    margin-top: 0;\n    border-bottom: 1px solid var(--color-border);\n}\n\n.s-footer ul {\n    margin-left: 0;\n}\n\n.s-footer li {\n    padding-left: 0;\n}\n\n/* -------------------------------------------------------------------\n * ## footer main\n * ------------------------------------------------------------------- */\n.s-footer__main {\n    padding-bottom: var(--vspace-0_5);\n}\n\n.s-footer__main ul li {\n    list-style: none;\n}\n\n.s-footer__main ul a {\n    color: var(--color-text-light);\n}\n\n.s-footer__main ul a:hover, .s-footer__main ul a:focus {\n    color: black;\n}\n\n/* footer subscribe\n * -------------------------------------- */\n.s-footer__subscribe p {\n    margin-bottom: var(--vspace-0_5);\n}\n\n.s-footer__subscribe .subscribe-form #mc-form {\n    padding: 0;\n}\n\n.s-footer__subscribe .subscribe-form input[type=\"email\"] {\n    padding: .8rem 2rem;\n    border: none;\n    width: 100%;\n    margin-bottom: var(--vspace-0_5);\n}\n\n.s-footer__subscribe .subscribe-form input[type=\"submit\"] {\n    display: none;\n}\n\n.s-footer__subscribe .subscribe-form .subscribe-message {\n    font-family: var(--font-1);\n    font-size: var(--text-sm);\n    color: black;\n}\n\n.s-footer__subscribe .subscribe-form .subscribe-message i {\n    color: black;\n    margin-right: .4rem;\n}\n\n/* -------------------------------------------------------------------\n * ## footer bottom\n * ------------------------------------------------------------------- */\n.s-footer__bottom {\n    margin-top: var(--vspace-0_5);\n    text-align: center;\n}\n\n/* copyright\n * -------------------------------------- */\n.ss-copyright span {\n    display: inline-block;\n    font-size: var(--text-sm);\n    line-height: 2.4rem;\n}\n\n.ss-copyright span::after {\n    content: \"|\";\n    display: inline-block;\n    padding: 0 1rem 0 1.2rem;\n    color: rgba(0, 0, 0, 0.2);\n}\n\n.ss-copyright span:last-child::after {\n    display: none;\n}\n\n/* -------------------------------------------------------------------\n * ## go top\n * ------------------------------------------------------------------- */\n.ss-go-top {\n    z-index: 2;\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transform: translate3d(0, 200%, 0);\n    transform: translate3d(0, 200%, 0);\n    -webkit-transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);\n    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);\n    position: fixed;\n    bottom: 6.4rem;\n    right: 6.4rem;\n}\n\n.ss-go-top a {\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n    text-decoration: none;\n    border: none;\n    height: 6.4rem;\n    width: 6.4rem;\n    border-radius: 50%;\n    background-color: var(--color-gray-3);\n    -webkit-transition: all .3s;\n    transition: all .3s;\n    position: relative;\n}\n\n.ss-go-top a:hover, .ss-go-top a:focus {\n    background-color: black;\n}\n\n.ss-go-top a:hover svg path, .ss-go-top a:focus svg path {\n    fill: white;\n}\n\n.ss-go-top svg {\n    height: 2.4rem;\n    width: 2.4rem;\n}\n\n.ss-go-top svg path {\n    fill: black;\n}\n\n.ss-go-top.link-is-visible {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n}\n\n/* responsive:\n * footer\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 800px) {\n    .s-footer {\n        padding-bottom: var(--vspace-1_5);\n    }\n    .ss-go-top {\n        right: 3.6rem;\n        bottom: 4.8rem;\n    }\n    .ss-go-top a {\n        height: 5.2rem;\n        width: 5.2rem;\n    }\n    .ss-go-top svg {\n        height: 2rem;\n        width: 2rem;\n    }\n}\n\n@media screen and (max-width: 600px) {\n    .s-footer__bottom {\n        padding-bottom: .8rem;\n    }\n    .ss-copyright span {\n        display: block;\n    }\n    .ss-copyright span::after {\n        display: none;\n    }\n    .ss-go-top {\n        right: 2.4rem;\n        bottom: 4rem;\n    }\n}\n\n\n\n/* ===================================================================\n * # blog styles and blog components\n *\n * ------------------------------------------------------------------- */\n\n/* -------------------------------------------------------------------\n * ## single post meta\n * ------------------------------------------------------------------- */\n.s-content__post-meta {\n    font-family: var(--font-1);\n    font-size: calc(var(--text-size) * 0.944);\n    list-style: none;\n    text-align: center;\n    margin-left: 0;\n    margin-bottom: var(--vspace-1_75);\n    color: var(--color-text-light);\n}\n\n.s-content__post-meta a {\n    color: black;\n}\n\n.s-content__post-meta li {\n    display: inline-block;\n    padding-left: 0;\n    margin: 0 .8rem;\n}\n\n.s-content__post-meta .cat a {\n    margin-right: .6rem;\n}\n\n.s-content__post-meta .cat a:last-child {\n    margin-right: 0;\n}\n\n.s-content__post-meta .cat a:last-child::after {\n    content: none;\n}\n\n.s-content__post-meta .cat a::after {\n    content: \",\";\n}\n\n/* -------------------------------------------------------------------\n * ## single post tags\n * ------------------------------------------------------------------- */\n.s-content__post-tags {\n    margin: var(--vspace-2) 0 var(--vspace-1_25);\n}\n\n.s-content__post-tags span {\n    color: black;\n    margin-right: 1rem;\n    font-weight: 600;\n}\n\n.s-content__post-tags a {\n    color: var(--color-text-light);\n    margin-right: 1rem;\n}\n\n/* -------------------------------------------------------------------\n * ## author profile\n * ------------------------------------------------------------------- */\n.s-content__author {\n    margin-top: var(--vspace-2_5);\n    padding-top: var(--vspace-0_25);\n    padding-left: 9.6rem;\n    position: relative;\n}\n\n.s-content__author a {\n    color: black;\n}\n\n.s-content__author h5 {\n    margin-top: 0;\n}\n\n.s-content__author img {\n    margin: .6rem 0 0 0 !important;\n    width: 6.4rem;\n    height: 6.4rem;\n    border-radius: 50%;\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n\n.s-content__author p {\n    margin-bottom: var(--vspace-0_5);\n}\n\n.s-content__author .author-social {\n    list-style: none;\n    margin-left: 0;\n    font-size: var(--text-xs);\n    text-transform: uppercase;\n    letter-spacing: .2em;\n}\n\n.s-content__author .author-social li {\n    display: inline-block;\n    margin-right: 0.8rem;\n    padding-left: 0;\n}\n\n.s-content__author .author-social a {\n    color: var(--color-text-light);\n}\n\n/* -------------------------------------------------------------------\n * ## single post page nav\n * ------------------------------------------------------------------- */\n.s-content__pagenav {\n    padding-top: var(--vspace-0_5);\n    margin: 12rem 0;\n    border-top: 1px solid var(--color-border);\n}\n\n.s-content__pagenav div {\n    float: left;\n    width: 50%;\n    padding-top: var(--vspace-0_5);\n    padding-right: var(--gutter-lg);\n}\n\n.s-content__pagenav a {\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: var(--text-lg);\n    line-height: var(--vspace-1);\n    border: none;\n    color: black;\n}\n\n.s-content__pagenav a span {\n    display: block;\n    font-family: var(--font-1);\n    font-weight: 400;\n    font-size: var(--text-sm);\n    line-height: var(--vspace-1);\n    margin-bottom: var(--vspace-0_5);\n    color: var(--color-text-light);\n    -webkit-transition: all 0.3s ease-in-out;\n    transition: all 0.3s ease-in-out;\n}\n\n.s-content__pagenav a:hover span {\n    color: black;\n}\n\n/* -------------------------------------------------------------------\n * responsive:\n * blog styles and blog components\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 800px) {\n    .s-content__author {\n        padding-left: 0;\n        text-align: center;\n    }\n    .s-content__author img {\n        position: static;\n        width: 6.6rem;\n        height: 6.6rem;\n        margin: 0 0 0.8rem 0 !important;\n    }\n}\n\n@media screen and (max-width: 640px) {\n    .s-content__pagenav {\n        text-align: center;\n    }\n    .s-content__pagenav div {\n        float: none;\n        width: 100%;\n        padding-right: 0;\n    }\n    .s-content__pagenav div:first-child {\n        margin-bottom: var(--vspace-0_5);\n    }\n}\n\n\n/* -------------------------------------------------------------------\n * ## comments\n * ------------------------------------------------------------------- */\n.comments-wrap {\n    margin-top: var(--vspace-3);\n    padding: var(--vspace-3_5) 0 var(--vspace-3_5);\n    background-color: var(--color-gray-1);\n}\n\n.comments-wrap .column {\n    padding: 0 calc(8rem + var(--gutter-lg));\n}\n\n.comments-wrap h3 {\n    margin-top: 0;\n    margin-bottom: var(--vspace-0_5);\n}\n\n.comments-wrap h3 span {\n    display: block;\n    font-family: var(--font-1);\n    font-weight: 400;\n    font-size: calc(var(--text-size) * 0.8889);\n    line-height: var(--vspace-0_75);\n    color: var(--color-text-light);\n    margin-top: calc(0.125 * var(--space));\n}\n\n/* comments\n * -------------------------------------------------- */\n#comments {\n    padding-top: var(--vspace-0_5);\n    padding-bottom: var(--vspace-0_5);\n}\n\n#comments ol, #comments ul {\n    list-style: none;\n}\n\n.commentlist {\n    margin: var(--vspace-2) 0 var(--vspace-1_5);\n    padding: 0;\n}\n\n.commentlist>.comment {\n    position: relative;\n    list-style: none;\n    margin: 0;\n    padding: 2rem 0 0 0;\n    padding-left: 14%;\n}\n\n.comment__avatar {\n    position: absolute;\n    left: 0;\n    display: block;\n}\n\n.comment__avatar img {\n    height: var(--vspace-2);\n    width: var(--vspace-2);\n    border-radius: 100%;\n    vertical-align: bottom;\n}\n\n.comment__info {\n    position: relative;\n}\n\n.comment__info .comment__author {\n    font-weight: 600;\n    font-size: var(--text-size);\n    line-height: var(--vspace-1);\n    font-style: normal;\n    color: black;\n}\n\n.comment__meta {\n    display: block;\n    font-style: normal;\n    line-height: var(--vspace-0_75);\n    color: var(--color-text-light);\n    text-align: right;\n    width: 150px;\n    position: absolute;\n    top: 0;\n    right: 0;\n}\n\n.comment__meta .comment__time {\n    font-size: calc(var(--text-size) * 0.7778);\n    text-transform: uppercase;\n    letter-spacing: .1rem;\n    color: var(--color-text-light);\n}\n\n.comment__meta .comment__reply a {\n    font-size: var(--text-xs);\n    font-family: var(--font-1);\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: .2rem;\n    color: black;\n}\n\n.comment__text {\n    clear: both;\n    margin: var(--vspace-0_5) 0 0 0;\n    padding: 0 175px 0 0;\n}\n\n.comment ul.children {\n    margin: 0;\n    padding: 0;\n}\n\n.comment ul.children li {\n    padding-left: 5%;\n    margin-top: calc(var(--vspace-1) + 2rem);\n    border-left: 1px solid var(--color-border);\n}\n\n/* comments form\n * ---------------------------- */\n.comments-wrap .comment-respond {\n    margin-top: var(--vspace-2);\n}\n\n.comment-respond form {\n    padding-top: var(--vspace-1_75);\n}\n\n/* -------------------------------------------------------------------\n * responsive:\n * comments\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1200px) {\n    .comments-wrap .column {\n        padding: 0 calc(4.8rem + var(--gutter-md));\n    }\n}\n\n@media screen and (max-width: 1100px) {\n    .comments-wrap .column {\n        padding: 0 calc(4rem + var(--gutter-md));\n    }\n}\n\n@media screen and (max-width: 1020px) {\n    .comments-wrap .column {\n        padding: 0 calc(3.2rem + var(--gutter-md));\n    }\n}\n\n@media screen and (max-width: 1000px) {\n    .comment__avatar img {\n        height: var(--vspace-1_75);\n        width: var(--vspace-1_75);\n    }\n    .comment__meta {\n        text-align: left;\n        width: auto;\n        position: static;\n    }\n    .comment__meta .comment__time, .comment__meta .comment__reply {\n        display: inline-block;\n    }\n    .comment__meta .comment__time {\n        margin-right: 12px;\n    }\n    .comment__text {\n        padding: 0;\n    }\n    .comments-wrap .comment-respond {\n        margin-top: var(--vspace-1_5);\n    }\n}\n\n@media screen and (max-width: 800px) {\n    .comments-wrap {\n        padding: var(--vspace-2) 0 var(--vspace-1);\n    }\n    .comments-wrap .column {\n        padding: 0 var(--gutter-md);\n    }\n    .comment__avatar img {\n        margin-top: 0;\n        height: var(--vspace-1_5);\n        width: var(--vspace-1_5);\n    }\n}\n\n@media screen and (max-width: 600px) {\n    .comments-wrap h3 {\n        text-align: center;\n    }\n    .comments-wrap .column {\n        padding: 0 var(--gutter-mob);\n    }\n    .commentlist>.comment {\n        padding-top: 0;\n        padding-left: 0;\n    }\n    .comment__avatar {\n        display: none;\n    }\n    .comment ul.children li {\n        margin-top: calc(var(--vspace-1) + 0rem);\n    }\n}\n\n@media screen and (max-width: 500px) {\n    .comment ul.children li {\n        border-left: none;\n    }\n}\n\n@media screen and (max-width: 400px) {\n    .comments-wrap .column {\n        padding: 0;\n    }\n    .comment-respond form {\n        padding-top: var(--vspace-1);\n    }\n}\n\n.receive-send {\n    display: flex;\n    justify-content: space-between;\n}\n\n.receive-send a {\n    display: block;\n    color: var(--color-gray-9);\n}\n\n@media screen and (max-width: 800px) {\n    .letter-menu {\n        margin-top: 60px;\n        display: none;\n    }\n}\n\n@media screen and (min-width: 801px) {\n    .tool-letter-menu {\n        display: none;\n    }\n}\n\n.letter__toggle-menu span {\n    display: block;\n    width: 28px;\n    height: 3px;\n    margin-top: -1.5px;\n    position: absolute;\n    right: auto;\n    bottom: auto;\n    left: 50px;\n    background-color: black;\n    text-shadow: none;\n    color: transparent;\n}\n\n.letter__toggle-menu span::before,\n.letter__toggle-menu span::after {\n    content: '';\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    background-color: inherit;\n    left: 0;\n}\n\n.letter__toggle-menu span::before {\n    top: -10px;\n}\n\n.letter__toggle-menu span::after {\n    bottom: -10px;\n}\n\n.letter__overlay-close {\n    display: none;\n    text-shadow: none;\n    color: transparent;\n    width: 46px;\n    height: 46px;\n    margin-left: -23px;\n    position: absolute;\n    top: 160px;\n    left: 50%;\n}\n\n.letter__overlay-close::before,\n.letter__overlay-close::after {\n    content: '';\n    display: inline-block;\n    width: 2px;\n    height: 20px;\n    top: 12px;\n    left: 22px;\n    background-color: black;\n    position: absolute;\n}\n\n.letter__overlay-close::before {\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n}\n\n.letter__overlay-close::after {\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n}\n\n\n/* */\ndetails {\n    border: 1px solid #aaa;\n    border-radius: 4px;\n    padding: .5em .5em 0;\n}\n\nsummary {\n    font-weight: bold;\n    margin: -.5em -.5em 0;\n    padding: .5em;\n}\n\ndetails[open] {\n    padding: .5em;\n}\n\ndetails[open] summary {\n    border-bottom: 1px solid #aaa;\n    margin-bottom: .5em;\n}\n\n.not-watched {\n    background: var(--color-1-lighter);\n    height: 6px;\n}\n\n.hide {\n    display: none;\n}\n\n.titles-category {\n    margin-bottom: 0;\n}\n\n.horizontal {\n    background: var(--color-1);\n    height: 2px;\n    margin-top: 3px;\n    margin-bottom: 3px;\n}\n\n\n/* toogle */\n\n.toggle-button-cover\n{\n    display: table-cell;\n    position: relative;\n    width: 200px;\n    height: 140px;\n    box-sizing: border-box;\n}\n\n.button-cover\n{\n    height: 100px;\n    margin: 20px;\n    background-color: #fff;\n    box-shadow: 0 10px 20px -8px #c5d6d6;\n    border-radius: 4px;\n}\n\n.button-cover:before\n{\n    counter-increment: button-counter;\n    content: counter(button-counter);\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    color: #d7e3e3;\n    font-size: 12px;\n    line-height: 1;\n    padding: 5px;\n}\n\n.button-cover, .knobs, .layer\n{\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n}\n\n.button\n{\n    position: relative;\n    top: 50%;\n    width: 86px;\n    height: 36px;\n    margin: -20px auto 0 auto;\n    overflow: hidden;\n}\n\n.button.r, .button.r .layer\n{\n    border-radius: 100px;\n}\n\n.checkbox\n{\n    position: relative;\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    margin: 0;\n    opacity: 0;\n    cursor: pointer;\n    z-index: 3;\n}\n\n.knobs\n{\n    z-index: 2;\n}\n\n.layer\n{\n    width: 100%;\n    background-color: #ebf7fc;\n    transition: 0.3s ease all;\n    z-index: 1;\n}\n\n/* Button 1 */\n#button-1 .knobs:before\n{\n    content: 'От';\n    position: absolute;\n    top: 4px;\n    left: 4px;\n    width: 40px;\n    height: 26px;\n    color: #fff;\n    font-size: 10px;\n    font-weight: bold;\n    text-align: center;\n    line-height: 1;\n    padding: 9px 4px;\n    background-color: hsla(356, 74%, 72%, 1);\n    border-radius: 50%;\n    transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;\n}\n\n#button-1 .checkbox:checked + .knobs:before\n{\n    content: 'Мне';\n    left: 42px;\n    background-color: hsla(76, 69%, 68%, 1);\n}\n\n#button-1 .checkbox:checked ~ .layer\n{\n    background-color: #fcebeb;\n}\n\n#button-1 .knobs, #button-1 .knobs:before, #button-1 .layer\n{\n    transition: 0.3s ease all;\n}\n\n.block {\n    display: block;\n}\n\n.empty-space {\n    height: 95.994px;\n}\n\nform {\n    display: inline;\n}\n\n.main-page {\n    padding-top: var(--vspace-3);\n    padding-bottom: var(--vspace-0_125);\n}\n\n.form-add-folder-up {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.blur {\n    filter: blur(10px);\n}\n\n.folder-names {\n    display: inline-block;\n    background: none;\n    width: 65%;\n    border: var(--color-body) solid;\n    border-radius: 5px;\n\n    margin-top: 3px;\n    margin-bottom: 3px;\n}\n\n.folder-names:hover {\n    color: var(--color-2);\n    cursor: pointer;\n    background: var(--color-info);\n    border: var(--color-info) solid;\n    border-radius: 5px;\n}\n\n.folder-names-focus {\n    border-radius: 5px;\n}\n\n.max-ch {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.main-columns {\n    height: 100%;\n    overflow-y: scroll;\n    overflow-x: hidden;\n}\n\n.main-container {\n    overflow: hidden;\n    height: calc(100vh - 105px);\n    position: relative;\n    width: 100%;\n}\n\n.letter-board {\n    position: fixed;\n    background: var(--color-body);\n    width: 47.5%;\n    height: 25px;\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-end;\n}\n\n@media screen and (max-width: 800px) {\n    .letter-board {\n        position: fixed;\n        background: var(--color-body);\n        width: 90%;\n        height: 25px;\n        display: flex;\n        flex-direction: row;\n        justify-content: space-between;\n    }\n\n    .letter-board-small {\n        display: flex;\n        flex-direction: row;\n    }\n}\n\n.letter-board-last-element {\n    margin-right: 20px;\n}\n\n.icon-group {\n    display: flex;\n    flex-direction: row;\n    margin-right: 5px;\n}\n\n.input-group {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n}\n\n.letter-container {\n    margin-top: 30px;\n}\n\n.icon-trash {\n    display: block;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n", "",{"version":3,"sources":["webpack://./src/Views/public/css/all_styles_v2.css"],"names":[],"mappings":"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B;AACxB;;AAEA;IACI,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB;AACxB;;AAEA;IACI,iBAAiB;IACjB,mBAAmB;IACnB,aAAa;IACb,cAAc;AAClB;;AAEA;IACI,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB;AACxB;;AAEA;IACI,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB;AACxB;;AAEA;IACI,kBAAkB;IAClB,mBAAmB;IACnB,cAAc;IACd,eAAe;AACnB;;AAEA;;wEAEwE;AACxE;IACI;QACI,wCAAwC;QACxC,yCAAyC;IAC7C;IACA;QACI,2BAA2B;IAC/B;IACA;QACI,sBAAsB;QACtB,mBAAmB;QACnB,kBAAkB;QAClB,mBAAmB;IACvB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,kBAAkB;QAClB,mBAAmB;QACnB,cAAc;QACd,eAAe;IACnB;AACJ;;AAEA;;wEAEwE;AACxE;IACI;QACI,UAAU;IACd;IACA;QACI,sBAAsB;QACtB,mBAAmB;QACnB,kBAAkB;QAClB,mBAAmB;IACvB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,kBAAkB;QAClB,mBAAmB;QACnB,cAAc;QACd,eAAe;IACnB;IACA;QACI,aAAa;IACjB;AACJ;;AAEA;;wEAEwE;AACxE;IACI;QACI,WAAW;QACX,iBAAiB;QACjB,kBAAkB;IACtB;IACA;QACI,yCAAyC;QACzC,0CAA0C;QAC1C,eAAe;QACf,gBAAgB;IACpB;IACA;QACI,4BAA4B;IAChC;IACA;QACI,sBAAsB;QACtB,mBAAmB;QACnB,kBAAkB;QAClB,mBAAmB;IACvB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,kBAAkB;QAClB,mBAAmB;QACnB,cAAc;QACd,eAAe;IACnB;IACA;QACI,aAAa;IACjB;AACJ;;AAEA;;wEAEwE;AACxE;IACI;QACI,cAAc;QACd,eAAe;IACnB;IACA;QACI,kBAAkB;QAClB,mBAAmB;QACnB,cAAc;QACd,eAAe;QACf,cAAc;QACd,eAAe;QACf,UAAU;IACd;AACJ;;;;AAIA;;;;;wEAKwE;;AAExE;IACI,mBAAmB;IACnB,mBAAmB;IACnB,eAAe;IACf,gBAAgB;AACpB;;AAEA;IACI,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB;AACxB;;AAEA;IACI,iBAAiB;IACjB,mBAAmB;IACnB,aAAa;IACb,cAAc;AAClB;;AAEA;IACI,iBAAiB;IACjB,mBAAmB;IACnB,aAAa;IACb,cAAc;AAClB;;AAEA;IACI,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB;AACxB;;AAEA;IACI,iBAAiB;IACjB,mBAAmB;IACnB,aAAa;IACb,cAAc;AAClB;;AAEA;IACI,kBAAkB;IAClB,mBAAmB;IACnB,cAAc;IACd,eAAe;AACnB;;AAEA;;wEAEwE;AACxE;IACI;QACI,mBAAmB;QACnB,mBAAmB;QACnB,eAAe;QACf,gBAAgB;IACpB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,kBAAkB;QAClB,mBAAmB;QACnB,cAAc;QACd,eAAe;IACnB;AACJ;;AAEA;;wEAEwE;AACxE;IACI;QACI,mBAAmB;QACnB,mBAAmB;QACnB,eAAe;QACf,gBAAgB;IACpB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,kBAAkB;QAClB,mBAAmB;QACnB,cAAc;QACd,eAAe;IACnB;AACJ;;AAEA;;wEAEwE;AACxE;IACI;QACI,mBAAmB;QACnB,mBAAmB;QACnB,eAAe;QACf,gBAAgB;IACpB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,uBAAuB;QACvB,mBAAmB;QACnB,mBAAmB;QACnB,oBAAoB;IACxB;IACA;QACI,iBAAiB;QACjB,mBAAmB;QACnB,aAAa;QACb,cAAc;IAClB;IACA;QACI,kBAAkB;QAClB,mBAAmB;QACnB,cAAc;QACd,eAAe;IACnB;AACJ;;AAEA;;wEAEwE;AACxE;IACI;QACI,kBAAkB;QAClB,mBAAmB;QACnB,cAAc;QACd,eAAe;QACf,cAAc;QACd,eAAe;QACf,UAAU;IA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","sourcesContent":["/* -------------------------------------------------------------------\n * ## fonts\n * ------------------------------------------------------------------- */\n@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap\");\n:root {\n    --font-1: \"Roboto\", sans-serif;\n    --font-2: \"Inter\", sans-serif;\n\n    /* monospace\n     */\n    --font-mono: Consolas, \"Andale Mono\", Courier, \"Courier New\", monospace;\n}\n\n/* -------------------------------------------------------------------\n * ## colors\n * ------------------------------------------------------------------- */\n:root {\n    --color-1: hsla(222, 83%, 27%, 1);\n    --color-2: hsla(356, 74%, 52%, 1);\n    --color-3: hsla(170, 100%, 35%, 1);\n\n    --color-1-lighter: hsla(222, 83%, 47%, 1);\n    --color-1-light  : hsla(222, 83%, 37%, 1);\n    --color-1-dark   : hsla(222, 83%, 17%, 1);\n    --color-1-darker : hsla(222, 83%, 10%, 1);\n    --color-2-lighter: hsla(356, 74%, 72%, 1);\n    --color-2-light  : hsla(356, 74%, 62%, 1);\n    --color-2-dark   : hsla(356, 74%, 42%, 1);\n    --color-2-darker : hsla(356, 74%, 32%, 1);\n\n    --color-error          : hsla(359, 100%, 91%, 1);\n    --color-success        : hsla(76, 69%, 68%, 1);\n    --color-info           : hsla(205, 82%, 91%, 1);\n    --color-notice         : hsla(51, 100%, 80%, 1);\n    --color-error-content  : hsla(359, 50%, 50%, 1);\n    --color-success-content: hsla(76, 29%, 28%, 1);\n    --color-info-content   : hsla(205, 32%, 31%, 1);\n    --color-notice-content : hsla(51, 30%, 30%, 1);\n\n    --color-black  : #000000;\n    --color-gray-19: #0a0a0a;\n    --color-gray-18: #141414;\n    --color-gray-17: #1e1e1e;\n    --color-gray-16: #282828;\n    --color-gray-15: #333333;\n    --color-gray-14: #3d3d3d;\n    --color-gray-13: #474747;\n    --color-gray-12: #515151;\n    --color-gray-11: #5b5b5b;\n    --color-gray-10: #656565;\n    --color-gray-9 : #747474;\n    --color-gray-8 : #848484;\n    --color-gray-7 : #939393;\n    --color-gray-6 : #a3a3a3;\n    --color-gray-5 : #b2b2b2;\n    --color-gray-4 : #c1c1c1;\n    --color-gray-3 : #d1d1d1;\n    --color-gray-2 : #e0e0e0;\n    --color-gray-1 : #f0f0f0;\n    --color-white  : #ffffff;\n\n    --color-text       : var(--color-gray-18);\n    --color-text-dark  : var(--color-black);\n    --color-text-light : var(--color-gray-8);\n    --color-placeholder: var(--color-gray-8);\n\n    --color-btn                   : var(--color-gray-3);\n    --color-btn-text              : var(--color-black);\n    --color-btn-hover             : var(--color-1);\n    --color-btn-hover-text        : var(--color-white);\n    --color-btn-primary           : var(--color-black);\n    --color-btn-primary-text      : var(--color-white);\n    --color-btn-primary-hover     : var(--color-1);\n    --color-btn-primary-hover-text: var(--color-white);\n    --color-btn-stroke            : var(--color-black);\n    --color-btn-stroke-text       : var(--color-black);\n    --color-btn-stroke-hover      : var(--color-1);\n    --color-btn-stroke-hover-text : var(--color-white);\n\n    /* others\n     */\n    --color-white-bg: white;\n    --color-body    : #f5f5f5;\n    --color-border  : var(--color-gray-2);\n}\n\n/* -------------------------------------------------------------------\n * ## vertical spacing and typescale\n * ------------------------------------------------------------------- */\n:root {\n\n    /* spacing\n     * base font size: 18px\n     * vertical space unit : 32px\n     */\n    --base-size     : 62.5%;\n    --base-font-size: 1.8rem;\n    --space         : 3.2rem;\n\n    /* vertical spacing\n     */\n    --vspace-0_125: calc(0.25 * var(--space));\n    --vspace-0_25 : calc(0.25 * var(--space));\n    --vspace-0_5  : calc(0.5 * var(--space));\n    --vspace-0_75 : calc(0.75 * var(--space));\n    --vspace-0_875: calc(0.875 * var(--space));\n    --vspace-1    : calc(var(--space));\n    --vspace-1_25 : calc(1.25 * var(--space));\n    --vspace-1_5  : calc(1.5 * var(--space));\n    --vspace-1_75 : calc(1.75 * var(--space));\n    --vspace-2    : calc(2 * var(--space));\n    --vspace-2_5  : calc(2.5 * var(--space));\n    --vspace-3    : calc(3 * var(--space));\n    --vspace-3_5  : calc(3.5 * var(--space));\n    --vspace-4    : calc(4 * var(--space));\n    --vspace-4_5  : calc(4.5 * var(--space));\n    --vspace-5    : calc(5 * var(--space));\n\n    --topspace: calc(var(--vspace-0_125) + 40px);\n\n    --text-scale-ratio: 1.2;\n    --text-size       : var(--base-font-size);\n    --text-xs         : calc((var(--text-size) / var(--text-scale-ratio)) / var(--text-scale-ratio));\n    --text-sm         : calc(var(--text-xs) * var(--text-scale-ratio));\n    --text-md         : calc(var(--text-sm) * var(--text-scale-ratio) * var(--text-scale-ratio));\n    --text-lg         : calc(var(--text-md) * var(--text-scale-ratio));\n    --text-xl         : calc(var(--text-lg) * var(--text-scale-ratio));\n    --text-xxl        : calc(var(--text-xl) * var(--text-scale-ratio));\n    --text-xxxl       : calc(var(--text-xxl) * var(--text-scale-ratio));\n    --text-display-1  : calc(var(--text-xxxl) * var(--text-scale-ratio));\n    --text-display-2  : calc(var(--text-display-1) * var(--text-scale-ratio));\n    --text-display-3  : calc(var(--text-display-2) * var(--text-scale-ratio));\n\n    /* default button height\n     */\n    --vspace-btn: var(--vspace-2);\n\n}\n\n/* on mobile devices below 600px\n */\n@media screen and (max-width: 600px) {\n    :root {\n        --base-font-size: 1.6rem;\n        --space: 2.8rem;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## grid variables\n * ------------------------------------------------------------------- */\n:root {\n\n    /* widths for rows and containers\n     */\n    --width-full    : 100%;\n    --width-max     : 1200px;\n    --width-wide    : 1400px;\n    --width-wider   : 1600px;\n    --width-widest  : 1800px;\n    --width-narrow  : 1000px;\n    --width-narrower: 900px;\n    --width-grid-max: var(--width-max);\n\n    /* gutters\n     */\n    --gutter-lg : 2rem;\n    --gutter-md : 1.8rem;\n    --gutter-mob: 1rem;\n}\n\n\n\n/* ==========================================================================\n * # normalize\n * normalize.css v8.0.1 | MIT License |\n * github.com/necolas/normalize.css\n *\n * -------------------------------------------------------------------------- */\n\n/* -------------------------------------------------------------------\n * ## document\n * ------------------------------------------------------------------- */\n\n/* 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.*/\n\nhtml {\n    line-height: 1.15;\n    /* 1 */\n    -webkit-text-size-adjust: 100%;\n    /* 2 */\n}\n\n/* -------------------------------------------------------------------\n * ## sections\n * ------------------------------------------------------------------- */\n\n/* Remove the margin in all browsers. */\n\nbody {\n    margin: 0;\n}\n\n/* Render the `main` element consistently in IE. */\n\nmain {\n    display: block;\n}\n\n/* Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari. */\n\nh1 {\n    font-size: 2em;\n    margin: 0.67em 0;\n}\n\n/* -------------------------------------------------------------------\n * ## grouping\n * ------------------------------------------------------------------- */\n\n/* 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE. */\n\nhr {\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n    /* 1 */\n    height: 0;\n    /* 1 */\n    overflow: visible;\n    /* 2 */\n}\n\n/* 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers. */\n\npre {\n    font-family: monospace, monospace;\n    /* 1 */\n    font-size: 1em;\n    /* 2 */\n}\n\n/* -------------------------------------------------------------------\n * ## text-level semantics\n * ------------------------------------------------------------------- */\n\n/* Remove the gray background on active links in IE 10. */\n\na {\n    background-color: transparent;\n}\n\n/* 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari. */\n\nabbr[title] {\n    border-bottom: none;\n    /* 1 */\n    text-decoration: underline;\n    /* 2 */\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n    /* 2 */\n}\n\n/* Add the correct font weight in Chrome, Edge, and Safari. */\n\nb, strong {\n    font-weight: bolder;\n}\n\n/* 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers. */\n\ncode, kbd, samp {\n    font-family: monospace, monospace;\n    /* 1 */\n    font-size: 1em;\n    /* 2 */\n}\n\n/* Add the correct font size in all browsers. */\n\nsmall {\n    font-size: 80%;\n}\n\n/* Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers. */\n\nsub, sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n}\n\nsub {\n    bottom: -0.25em;\n}\n\nsup {\n    top: -0.5em;\n}\n\n/* -------------------------------------------------------------------\n * ## embedded content\n * ------------------------------------------------------------------- */\n\n/* Remove the border on images inside links in IE 10. */\n\nimg {\n    border-style: none;\n}\n\n/* -------------------------------------------------------------------\n * ## forms\n * ------------------------------------------------------------------- */\n\n/* 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari. */\n\nbutton, input, optgroup, select, textarea {\n    font-family: inherit;\n    /* 1 */\n    font-size: 100%;\n    /* 1 */\n    line-height: 1.15;\n    /* 1 */\n    margin: 0;\n    /* 2 */\n}\n\n/* Show the overflow in IE.\n * 1. Show the overflow in Edge. */\n\nbutton, input {\n    /* 1 */\n    overflow: visible;\n}\n\n/* Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox. */\n\nbutton, select {\n    /* 1 */\n    text-transform: none;\n}\n\n/* Correct the inability to style clickable types in iOS and Safari. */\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n    -webkit-appearance: button;\n}\n\n/* Remove the inner border and padding in Firefox. */\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n    border-style: none;\n    padding: 0;\n}\n\n/* Restore the focus styles unset by the previous rule. */\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n    outline: 1px dotted ButtonText;\n}\n\n/* Correct the padding in Firefox. */\n\nfieldset {\n    padding: 0.35em 0.75em 0.625em;\n}\n\n/* 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers. */\n\nlegend {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    /* 1 */\n    color: inherit;\n    /* 2 */\n    display: table;\n    /* 1 */\n    max-width: 100%;\n    /* 1 */\n    padding: 0;\n    /* 3 */\n    white-space: normal;\n    /* 1 */\n}\n\n/* Add the correct vertical alignment in Chrome, Firefox, and Opera. */\n\nprogress {\n    vertical-align: baseline;\n}\n\n/* Remove the default vertical scrollbar in IE 10+. */\n\ntextarea {\n    overflow: auto;\n}\n\n/* 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10. */\n\n[type=\"checkbox\"], [type=\"radio\"] {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    /* 1 */\n    padding: 0;\n    /* 2 */\n}\n\n/* Correct the cursor style of increment and decrement buttons in Chrome. */\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n    height: auto;\n}\n\n/* 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari. */\n\n[type=\"search\"] {\n    -webkit-appearance: textfield;\n    /* 1 */\n    outline-offset: -2px;\n    /* 2 */\n}\n\n/* Remove the inner padding in Chrome and Safari on macOS. */\n\n[type=\"search\"]::-webkit-search-decoration {\n    -webkit-appearance: none;\n}\n\n/* 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari. */\n\n::-webkit-file-upload-button {\n    -webkit-appearance: button;\n    /* 1 */\n    font: inherit;\n    /* 2 */\n}\n\n/* -------------------------------------------------------------------\n * ## interactive\n * ------------------------------------------------------------------- */\n\n/* Add the correct display in Edge, IE 10+, and Firefox. */\n\ndetails {\n    display: block;\n}\n\n/* Add the correct display in all browsers. */\n\nsummary {\n    display: list-item;\n}\n\n/* -------------------------------------------------------------------\n * ## misc\n * ------------------------------------------------------------------- */\n\n/* Add the correct display in IE 10+. */\n\ntemplate {\n    display: none;\n}\n\n/* Add the correct display in IE 10. */\n\n[hidden] {\n    display: none;\n}\n\n\n\n/* ===================================================================\n * # basic/base setup styles\n *\n * ------------------------------------------------------------------- */\nhtml {\n    font-size: 62.5%;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n*, *::before, *::after {\n    -webkit-box-sizing: inherit;\n    box-sizing: inherit;\n}\n\nbody {\n    font-weight: normal;\n    line-height: 1;\n    word-wrap: break-word;\n    -moz-font-smoothing: grayscale;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    -webkit-overflow-scrolling: touch;\n    -webkit-text-size-adjust: none;\n}\n\n/* -------------------------------------------------------------------\n * ## media\n * ------------------------------------------------------------------- */\nsvg, img, video embed, iframe, object {\n    max-width: 100%;\n    height: auto;\n}\n\n/* -------------------------------------------------------------------\n * ## typography resets\n * ------------------------------------------------------------------- */\ndiv, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, p, blockquote, th, td {\n    margin: 0;\n    padding: 0;\n}\n\np {\n    font-size: inherit;\n    text-rendering: optimizeLegibility;\n}\n\nem, i {\n    font-style: italic;\n    line-height: inherit;\n}\n\nstrong, b {\n    font-weight: bold;\n    line-height: inherit;\n}\n\nsmall {\n    font-size: 60%;\n    line-height: inherit;\n}\n\nol, ul {\n    list-style: none;\n}\n\nli {\n    display: block;\n}\n\n/* -------------------------------------------------------------------\n * ## links\n * ------------------------------------------------------------------- */\na {\n    text-decoration: none;\n    line-height: inherit;\n}\n\na img {\n    border: none;\n}\n\n/* -------------------------------------------------------------------\n * ## inputs\n * ------------------------------------------------------------------- */\nfieldset {\n    margin: 0;\n    padding: 0;\n}\n\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n}\n\n\n\n/* ===================================================================\n * # Grid v3.0.0 - (_grid.scss)\n *\n *   -----------------------------------------------------------------\n * - Grid breakpoints are based on MAXIMUM WIDTH media queries,\n *   meaning they apply to that one breakpoint and ALL THOSE BELOW IT.\n * - Grid columns without a specified width will automatically layout\n *   as equal width columns.\n * ------------------------------------------------------------------- */\n\n/* rows\n * ------------------------------------- */\n.row {\n    width: 92%;\n    /*max-width: var(--width-grid-max);*/\n    margin: 0 auto;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -ms-flex-flow: row wrap;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    flex-flow: row wrap;\n}\n\n.row .row {\n    width: auto;\n    max-width: none;\n    margin-left: calc(var(--gutter-lg) * -1);\n    margin-right: calc(var(--gutter-lg) * -1);\n}\n\n/* columns\n * -------------------------------------- */\n.column {\n    -ms-flex: 1 1 0%;\n    -webkit-box-flex: 1;\n    flex: 1 1 0%;\n    padding: 0 var(--gutter-lg);\n}\n\n.collapse>.column, .column.collapse {\n    padding: 0;\n}\n\n/* flex row containers utility classes\n */\n.row.row-wrap {\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n}\n\n.row.row-nowrap {\n    -ms-flex-wrap: none;\n    flex-wrap: nowrap;\n}\n\n.row.row-y-top {\n    -ms-flex-align: start;\n    -webkit-box-align: start;\n    align-items: flex-start;\n}\n\n.row.row-y-bottom {\n    -ms-flex-align: end;\n    -webkit-box-align: end;\n    align-items: flex-end;\n}\n\n.row.row-y-center {\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n}\n\n.row.row-stretch {\n    -ms-flex-align: stretch;\n    -webkit-box-align: stretch;\n    align-items: stretch;\n}\n\n.row.row-baseline {\n    -ms-flex-align: baseline;\n    -webkit-box-align: baseline;\n    align-items: baseline;\n}\n\n.row.row-x-left {\n    -ms-flex-pack: start;\n    -webkit-box-pack: start;\n    justify-content: flex-start;\n}\n\n.row.row-x-right {\n    -ms-flex-pack: end;\n    -webkit-box-pack: end;\n    justify-content: flex-end;\n}\n\n.row.row-x-center {\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n}\n\n/* flex item utility alignment classes\n */\n.align-center {\n    margin: auto;\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    -ms-grid-row-align: center;\n    align-self: center;\n}\n\n.align-left {\n    margin-right: auto;\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    -ms-grid-row-align: center;\n    align-self: center;\n}\n\n.align-right {\n    margin-left: auto;\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    -ms-grid-row-align: center;\n    align-self: center;\n}\n\n.align-x-center {\n    margin-right: auto;\n    margin-left: auto;\n}\n\n.align-x-left {\n    margin-right: auto;\n}\n\n.align-x-right {\n    margin-left: auto;\n}\n\n.align-y-center {\n    -webkit-align-self: center;\n    -ms-flex-item-align: center;\n    -ms-grid-row-align: center;\n    align-self: center;\n}\n\n.align-y-top {\n    -webkit-align-self: flex-start;\n    -ms-flex-item-align: start;\n    align-self: flex-start;\n}\n\n.align-y-bottom {\n    -webkit-align-self: flex-end;\n    -ms-flex-item-align: end;\n    align-self: flex-end;\n}\n\n/* large screen column widths\n */\n.large-1 {\n    -ms-flex: 0 0 8.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%;\n}\n\n.large-2 {\n    -ms-flex: 0 0 16.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%;\n}\n\n.large-3 {\n    -ms-flex: 0 0 25%;\n    -webkit-box-flex: 0;\n    flex: 0 0 25%;\n    max-width: 25%;\n}\n\n.large-4 {\n    -ms-flex: 0 0 33.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%;\n}\n\n.large-5 {\n    -ms-flex: 0 0 41.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%;\n}\n\n.large-6 {\n    -ms-flex: 0 0 50%;\n    -webkit-box-flex: 0;\n    flex: 0 0 50%;\n    max-width: 50%;\n}\n\n.large-7 {\n    -ms-flex: 0 0 58.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%;\n}\n\n.large-8 {\n    -ms-flex: 0 0 66.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%;\n}\n\n.large-9 {\n    -ms-flex: 0 0 75%;\n    -webkit-box-flex: 0;\n    flex: 0 0 75%;\n    max-width: 75%;\n}\n\n.large-10 {\n    -ms-flex: 0 0 83.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%;\n}\n\n.large-11 {\n    -ms-flex: 0 0 91.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%;\n}\n\n.large-12 {\n    -ms-flex: 0 0 100%;\n    -webkit-box-flex: 0;\n    flex: 0 0 100%;\n    max-width: 100%;\n}\n\n/* -------------------------------------------------------------------\n * ## medium screen devices\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1200px) {\n    .row .row {\n        margin-left: calc(var(--gutter-md) * -1);\n        margin-right: calc(var(--gutter-md) * -1);\n    }\n    .column {\n        padding: 0 var(--gutter-md);\n    }\n    .medium-1 {\n        -ms-flex: 0 0 8.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 8.33333%;\n        max-width: 8.33333%;\n    }\n    .medium-2 {\n        -ms-flex: 0 0 16.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 16.66667%;\n        max-width: 16.66667%;\n    }\n    .medium-3 {\n        -ms-flex: 0 0 25%;\n        -webkit-box-flex: 0;\n        flex: 0 0 25%;\n        max-width: 25%;\n    }\n    .medium-4 {\n        -ms-flex: 0 0 33.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 33.33333%;\n        max-width: 33.33333%;\n    }\n    .medium-5 {\n        -ms-flex: 0 0 41.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 41.66667%;\n        max-width: 41.66667%;\n    }\n    .medium-6 {\n        -ms-flex: 0 0 50%;\n        -webkit-box-flex: 0;\n        flex: 0 0 50%;\n        max-width: 50%;\n    }\n    .medium-7 {\n        -ms-flex: 0 0 58.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 58.33333%;\n        max-width: 58.33333%;\n    }\n    .medium-8 {\n        -ms-flex: 0 0 66.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 66.66667%;\n        max-width: 66.66667%;\n    }\n    .medium-9 {\n        -ms-flex: 0 0 75%;\n        -webkit-box-flex: 0;\n        flex: 0 0 75%;\n        max-width: 75%;\n    }\n    .medium-10 {\n        -ms-flex: 0 0 83.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 83.33333%;\n        max-width: 83.33333%;\n    }\n    .medium-11 {\n        -ms-flex: 0 0 91.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 91.66667%;\n        max-width: 91.66667%;\n    }\n    .medium-12 {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## tablets\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 800px) {\n    .row {\n        width: 90%;\n    }\n    .tab-1 {\n        -ms-flex: 0 0 8.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 8.33333%;\n        max-width: 8.33333%;\n    }\n    .tab-2 {\n        -ms-flex: 0 0 16.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 16.66667%;\n        max-width: 16.66667%;\n    }\n    .tab-3 {\n        -ms-flex: 0 0 25%;\n        -webkit-box-flex: 0;\n        flex: 0 0 25%;\n        max-width: 25%;\n    }\n    .tab-4 {\n        -ms-flex: 0 0 33.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 33.33333%;\n        max-width: 33.33333%;\n    }\n    .tab-5 {\n        -ms-flex: 0 0 41.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 41.66667%;\n        max-width: 41.66667%;\n    }\n    .tab-6 {\n        -ms-flex: 0 0 50%;\n        -webkit-box-flex: 0;\n        flex: 0 0 50%;\n        max-width: 50%;\n    }\n    .tab-7 {\n        -ms-flex: 0 0 58.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 58.33333%;\n        max-width: 58.33333%;\n    }\n    .tab-8 {\n        -ms-flex: 0 0 66.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 66.66667%;\n        max-width: 66.66667%;\n    }\n    .tab-9 {\n        -ms-flex: 0 0 75%;\n        -webkit-box-flex: 0;\n        flex: 0 0 75%;\n        max-width: 75%;\n    }\n    .tab-10 {\n        -ms-flex: 0 0 83.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 83.33333%;\n        max-width: 83.33333%;\n    }\n    .tab-11 {\n        -ms-flex: 0 0 91.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 91.66667%;\n        max-width: 91.66667%;\n    }\n    .tab-12 {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n    .hide-on-tablet {\n        display: none;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## mobile devices\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 600px) {\n    .row {\n        width: 100%;\n        padding-left: 6vw;\n        padding-right: 6vw;\n    }\n    .row .row {\n        margin-left: calc(var(--gutter-mob) * -1);\n        margin-right: calc(var(--gutter-mob) * -1);\n        padding-left: 0;\n        padding-right: 0;\n    }\n    .column {\n        padding: 0 var(--gutter-mob);\n    }\n    .mob-1 {\n        -ms-flex: 0 0 8.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 8.33333%;\n        max-width: 8.33333%;\n    }\n    .mob-2 {\n        -ms-flex: 0 0 16.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 16.66667%;\n        max-width: 16.66667%;\n    }\n    .mob-3 {\n        -ms-flex: 0 0 25%;\n        -webkit-box-flex: 0;\n        flex: 0 0 25%;\n        max-width: 25%;\n    }\n    .mob-4 {\n        -ms-flex: 0 0 33.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 33.33333%;\n        max-width: 33.33333%;\n    }\n    .mob-5 {\n        -ms-flex: 0 0 41.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 41.66667%;\n        max-width: 41.66667%;\n    }\n    .mob-6 {\n        -ms-flex: 0 0 50%;\n        -webkit-box-flex: 0;\n        flex: 0 0 50%;\n        max-width: 50%;\n    }\n    .mob-7 {\n        -ms-flex: 0 0 58.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 58.33333%;\n        max-width: 58.33333%;\n    }\n    .mob-8 {\n        -ms-flex: 0 0 66.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 66.66667%;\n        max-width: 66.66667%;\n    }\n    .mob-9 {\n        -ms-flex: 0 0 75%;\n        -webkit-box-flex: 0;\n        flex: 0 0 75%;\n        max-width: 75%;\n    }\n    .mob-10 {\n        -ms-flex: 0 0 83.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 83.33333%;\n        max-width: 83.33333%;\n    }\n    .mob-11 {\n        -ms-flex: 0 0 91.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 91.66667%;\n        max-width: 91.66667%;\n    }\n    .mob-12 {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n    .hide-on-mobile {\n        display: none;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## small mobile devices <= 400px\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 400px) {\n    .row .row {\n        margin-left: 0;\n        margin-right: 0;\n    }\n    .column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n        margin-left: 0;\n        margin-right: 0;\n        padding: 0;\n    }\n}\n\n\n\n/* ===================================================================\n * # block grids\n *\n * -------------------------------------------------------------------\n * Equally-sized columns define at parent/row level.\n * ------------------------------------------------------------------- */\n\n.block-large-1-8>.column {\n    -ms-flex: 0 0 12.5%;\n    -webkit-box-flex: 0;\n    flex: 0 0 12.5%;\n    max-width: 12.5%;\n}\n\n.block-large-1-6>.column {\n    -ms-flex: 0 0 16.66667%;\n    -webkit-box-flex: 0;\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%;\n}\n\n.block-large-1-5>.column {\n    -ms-flex: 0 0 20%;\n    -webkit-box-flex: 0;\n    flex: 0 0 20%;\n    max-width: 20%;\n}\n\n.block-large-1-4>.column {\n    -ms-flex: 0 0 25%;\n    -webkit-box-flex: 0;\n    flex: 0 0 25%;\n    max-width: 25%;\n}\n\n.block-large-1-3>.column {\n    -ms-flex: 0 0 33.33333%;\n    -webkit-box-flex: 0;\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%;\n}\n\n.block-large-1-2>.column {\n    -ms-flex: 0 0 50%;\n    -webkit-box-flex: 0;\n    flex: 0 0 50%;\n    max-width: 50%;\n}\n\n.block-large-full>.column {\n    -ms-flex: 0 0 100%;\n    -webkit-box-flex: 0;\n    flex: 0 0 100%;\n    max-width: 100%;\n}\n\n/* -------------------------------------------------------------------\n * ## block grids - medium screen devices\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1200px) {\n    .block-medium-1-8>.column {\n        -ms-flex: 0 0 12.5%;\n        -webkit-box-flex: 0;\n        flex: 0 0 12.5%;\n        max-width: 12.5%;\n    }\n    .block-medium-1-6>.column {\n        -ms-flex: 0 0 16.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 16.66667%;\n        max-width: 16.66667%;\n    }\n    .block-medium-1-5>.column {\n        -ms-flex: 0 0 20%;\n        -webkit-box-flex: 0;\n        flex: 0 0 20%;\n        max-width: 20%;\n    }\n    .block-medium-1-4>.column {\n        -ms-flex: 0 0 25%;\n        -webkit-box-flex: 0;\n        flex: 0 0 25%;\n        max-width: 25%;\n    }\n    .block-medium-1-3>.column {\n        -ms-flex: 0 0 33.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 33.33333%;\n        max-width: 33.33333%;\n    }\n    .block-medium-1-2>.column {\n        -ms-flex: 0 0 50%;\n        -webkit-box-flex: 0;\n        flex: 0 0 50%;\n        max-width: 50%;\n    }\n    .block-medium-full>.column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## block grids - tablets\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 800px) {\n    .block-tab-1-8>.column {\n        -ms-flex: 0 0 12.5%;\n        -webkit-box-flex: 0;\n        flex: 0 0 12.5%;\n        max-width: 12.5%;\n    }\n    .block-tab-1-6>.column {\n        -ms-flex: 0 0 16.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 16.66667%;\n        max-width: 16.66667%;\n    }\n    .block-tab-1-5>.column {\n        -ms-flex: 0 0 20%;\n        -webkit-box-flex: 0;\n        flex: 0 0 20%;\n        max-width: 20%;\n    }\n    .block-tab-1-4>.column {\n        -ms-flex: 0 0 25%;\n        -webkit-box-flex: 0;\n        flex: 0 0 25%;\n        max-width: 25%;\n    }\n    .block-tab-1-3>.column {\n        -ms-flex: 0 0 33.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 33.33333%;\n        max-width: 33.33333%;\n    }\n    .block-tab-1-2>.column {\n        -ms-flex: 0 0 50%;\n        -webkit-box-flex: 0;\n        flex: 0 0 50%;\n        max-width: 50%;\n    }\n    .block-tab-full>.column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## block grids - mobile devices\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 600px) {\n    .block-mob-1-8>.column {\n        -ms-flex: 0 0 12.5%;\n        -webkit-box-flex: 0;\n        flex: 0 0 12.5%;\n        max-width: 12.5%;\n    }\n    .block-mob-1-6>.column {\n        -ms-flex: 0 0 16.66667%;\n        -webkit-box-flex: 0;\n        flex: 0 0 16.66667%;\n        max-width: 16.66667%;\n    }\n    .block-mob-1-5>.column {\n        -ms-flex: 0 0 20%;\n        -webkit-box-flex: 0;\n        flex: 0 0 20%;\n        max-width: 20%;\n    }\n    .block-mob-1-4>.column {\n        -ms-flex: 0 0 25%;\n        -webkit-box-flex: 0;\n        flex: 0 0 25%;\n        max-width: 25%;\n    }\n    .block-mob-1-3>.column {\n        -ms-flex: 0 0 33.33333%;\n        -webkit-box-flex: 0;\n        flex: 0 0 33.33333%;\n        max-width: 33.33333%;\n    }\n    .block-mob-1-2>.column {\n        -ms-flex: 0 0 50%;\n        -webkit-box-flex: 0;\n        flex: 0 0 50%;\n        max-width: 50%;\n    }\n    .block-mob-full>.column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## block grids - small mobile devices <= 400px\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 400px) {\n    .stack>.column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n        margin-left: 0;\n        margin-right: 0;\n        padding: 0;\n    }\n}\n\n\n\n/* ===================================================================\n * # MISC\n *\n * ------------------------------------------------------------------- */\n.h-group:after {\n    content: \"\";\n    display: table;\n    clear: both;\n}\n\n/* misc helper classes\n */\n.is-hidden {\n    display: none;\n}\n.is-invisible {\n    visibility: hidden;\n}\n.h-antialiased {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.h-overflow-hidden {\n    overflow: hidden;\n}\n.h-remove-top {\n    margin-top: 0;\n}\n.h-remove-bottom {\n    margin-bottom: 0;\n}\n.h-add-half-bottom {\n    margin-bottom: var(--vspace-0_5) !important;\n}\n.h-add-bottom {\n    margin-bottom: var(--vspace-1) !important;\n}\n.h-no-border {\n    border: none;\n}\n.h-full-width {\n    width: 100%;\n}\n.h-text-center {\n    text-align: center;\n}\n.h-text-left {\n    text-align: left;\n}\n.h-text-right {\n    text-align: right;\n}\n.h-pull-left {\n    float: left;\n}\n.h-pull-right {\n    float: right;\n}\n\n\n\n/* ===================================================================\n * # custom grid, block grid STACK breakpoints\n *\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1000px) {\n    .w-1000-stack,\n    .block-1000-stack > .column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n@media screen and (max-width: 700px) {\n    .w-700-stack,\n    .block-700-stack > .column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n@media screen and (max-width: 500px) {\n    .w-500-stack,\n    .block-500-stack > .column {\n        -ms-flex: 0 0 100%;\n        -webkit-box-flex: 0;\n        flex: 0 0 100%;\n        max-width: 100%;\n    }\n}\n\n\n\n/* ===================================================================\n * # base style overrides\n *\n * ------------------------------------------------------------------- */\nhtml {\n    font-size: var(--base-size);\n}\n\nhtml, body {\n    height: 100%;\n}\n\nbody {\n    background: var(--color-body);\n    font-family: var(--font-1);\n    font-size: var(--text-size);\n    font-style: normal;\n    font-weight: normal;\n    line-height: var(--vspace-1);\n    color: var(--color-text);\n    margin: 0;\n    padding: 0;\n}\n\n/* -------------------------------------------------------------------\n * ## links\n * ------------------------------------------------------------------- */\na {\n    color: var(--color-1);\n    -webkit-transition: all 0.3s ease-in-out;\n    transition: all 0.3s ease-in-out;\n}\n\na:hover, a:focus, a:active {\n    color: var(--color-2);\n    cursor: pointer;\n}\n\na:hover, a:active {\n    outline: 0;\n}\n\n\n\n/* ===================================================================\n * # typography & general theme styles\n *\n * ------------------------------------------------------------------- */\n\n/* type scale - ratio 1:2 | base: 18px\n * -------------------------------------------------------------------\n * --text-display-3 = (77.40px)\n * --text-display-2 = (64.50px)\n * --text-display-1 = (53.75px)\n * --text-xxxl      = (44.79px)\n * --text-xxl       = (37.32px)\n * --text-xl        = (31.10px)\n * --text-lg        = (25.92px)\n * --text-md        = (21.60px)\n * --text-size      = (18.00px) BASE\n * --text-sm        = (15.00px)\n * --text-xs        = (12.50px)\n * -------------------------------------------------------------------- */\nh1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-style: normal;\n    color: var(--color-text-dark);\n    -webkit-font-variant-ligatures: common-ligatures;\n    font-variant-ligatures: common-ligatures;\n    text-rendering: optimizeLegibility;\n}\n\nh1, .h1 {\n    margin-top: var(--vspace-0_125);\n    margin-bottom: var(--vspace-0_125);\n}\n\nh2, .h2, h3, .h3, h4, .h4 {\n    margin-top: var(--vspace-0_125);\n    margin-bottom: var(--vspace-0_125);\n}\n\nh5, .h5, h6, .h6 {\n    margin-top: var(--vspace-1_5);\n    margin-bottom: var(--vspace-0_5);\n}\n\nh1, .h1 {\n    font-size: var(--text-display-1);\n    line-height: var(--vspace-2);\n    letter-spacing: -.015em;\n}\n\n@media screen and (max-width: 600px) {\n    h1, .h1 {\n        margin-top: var(--vspace-0_125);\n        margin-bottom: var(--vspace-0_125);\n    }\n}\n\nh2, .h2 {\n    font-size: var(--text-xxl);\n    line-height: var(--vspace-1_5);\n}\n\nh3, .h3 {\n    font-size: var(--text-xl);\n    line-height: var(--vspace-1_25);\n}\n\nh4, .h4 {\n    font-size: var(--text-lg);\n    line-height: var(--vspace-1);\n}\n\nh5, .h5 {\n    font-size: var(--text-md);\n    line-height: var(--vspace-0_875);\n}\n\nh6, .h6 {\n    font-size: calc(var(--text-size) * 0.8889);\n    font-weight: 700;\n    line-height: var(--vspace-0_75);\n    text-transform: uppercase;\n    letter-spacing: .25em;\n}\n\n.lead, .attention-getter {\n    font-family: var(--font-2);\n    font-weight: 300;\n    font-size: var(--text-md);\n    line-height: calc(1.125 * var(--space));\n    color: var(--color-text-dark);\n}\n\n@media screen and (max-width: 400px) {\n    .lead, .attention-getter {\n        font-size: calc(var(--text-size) * 1.0556);\n    }\n}\n\nfigure img, p img {\n    margin: 0;\n    vertical-align: bottom;\n}\n\nem, i, strong, b {\n    font-size: inherit;\n    line-height: inherit;\n}\n\nem, i {\n    font-family: var(--font-1);\n    font-style: italic;\n}\n\nstrong, b {\n    font-family: var(--font-1);\n    font-weight: 600;\n    color: var(--color-text-dark);\n}\n\nsmall {\n    font-size: var(--text-sm);\n    font-weight: 500;\n    line-height: var(--vspace-0_5);\n}\n\nblockquote {\n    margin: 0 0 var(--vspace-1) 0;\n    padding: var(--vspace-1) var(--vspace-1_5);\n    border-left: 4px solid black;\n    position: relative;\n}\n\n@media screen and (max-width: 400px) {\n    blockquote {\n        padding: var(--vspace-0_75) var(--vspace-0_75);\n    }\n}\n\nblockquote p {\n    font-family: var(--font-1);\n    font-size: var(--text-lg);\n    font-weight: 400;\n    font-style: normal;\n    line-height: var(--vspace-1_25);\n    color: var(--color-text-dark);\n    padding: 0;\n}\n\nblockquote cite {\n    display: block;\n    font-family: var(--font-1);\n    font-weight: 400;\n    font-size: var(--text-sm);\n    line-height: var(--vspace-0_75);\n    font-style: normal;\n}\n\nblockquote cite:before {\n    content: \"\\2014 \\0020\";\n}\n\nblockquote cite,\nblockquote cite a,\nblockquote cite a:visited {\n    color: var(--color-text-light);\n    border: none;\n}\n\nfigure {\n    display: block;\n    margin-left: 0;\n    margin-right: 0;\n}\n\nfigure img+figcaption {\n    margin-top: var(--vspace-1);\n}\n\nfigcaption {\n    font-size: var(--text-sm);\n    text-align: center;\n    margin-bottom: 0;\n}\n\nvar, kbd, samp, code, pre {\n    font-family: var(--font-mono);\n}\n\npre {\n    padding: var(--vspace-0_75) var(--vspace-1) var(--vspace-1);\n    background: var(--color-gray-1);\n    overflow-x: auto;\n}\n\ncode {\n    font-size: var(--text-sm);\n    line-height: 1.6rem;\n    margin: 0 .2rem;\n    padding: calc(((var(--vspace-1) - 1.6rem) / 2) - .1rem) calc(.8rem - .1rem);\n    white-space: nowrap;\n    background: var(--color-gray-1);\n    border: 1px solid var(--color-gray-3);\n    color: var(--color-text);\n    border-radius: 3px;\n}\n\npre>code {\n    display: block;\n    white-space: pre;\n    line-height: var(--vspace-1);\n    padding: 0;\n    margin: 0;\n    border: none;\n}\n\ndel {\n    text-decoration: line-through;\n}\n\nabbr {\n    font-family: var(--font-1);\n    font-weight: 400;\n    font-variant: small-caps;\n    text-transform: lowercase;\n    letter-spacing: .1em;\n}\n\nabbr[title], dfn[title] {\n    border-bottom: 1px dotted;\n    cursor: help;\n    text-decoration: none;\n}\n\nmark {\n    background: var(--color-notice);\n    color: var(--color-black);\n}\n\nhr {\n    border: solid var(--color-border);\n    border-width: .1rem 0 0;\n    clear: both;\n    margin: var(--vspace-2) 0 calc(var(--vspace-2) - .1rem);\n    height: 0;\n}\n\nhr.fancy {\n    border: none;\n    margin: var(--vspace-2) 0;\n    height: var(--vspace-1);\n    text-align: center;\n}\n\nhr.fancy::before {\n    content: \"*****\";\n    letter-spacing: .3em;\n}\n\n\n/* -------------------------------------------------------------------\n * ## lists\n * ------------------------------------------------------------------- */\nol {\n    list-style: decimal;\n}\n\nul {\n    list-style: disc;\n}\n\nli {\n    display: list-item;\n}\n\nol, ul {\n    margin-left: 1.6rem;\n}\n\nul li {\n    padding-left: .4rem;\n}\n\nul ul, ul ol, ol ol, ol ul {\n    margin: 1.6rem 0 1.6rem 1.6rem;\n}\n\nul.disc li {\n    display: list-item;\n    list-style: none;\n    padding: 0 0 0 .8rem;\n    position: relative;\n}\n\nul.disc li::before {\n    content: \"\";\n    display: inline-block;\n    width: var(--vspace-0_25);\n    height: var(--vspace-0_25);\n    border-radius: 50%;\n    background: var(--color-1-dark);\n    position: absolute;\n    left: -.9em;\n    top: .65em;\n    vertical-align: middle;\n}\n\ndt {\n    margin: 0;\n    color: var(--color-1);\n}\n\ndd {\n    margin: 0 0 0 2rem;\n}\n\n/* -------------------------------------------------------------------\n * ## responsive video container\n * ------------------------------------------------------------------- */\n.video-container {\n    position: relative;\n    padding-bottom: 56.25%;\n    height: 0;\n    overflow: hidden;\n}\n\n.video-container iframe,\n.video-container object,\n.video-container embed,\n.video-container video {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n\n/* -------------------------------------------------------------------\n * ## floated image\n * ------------------------------------------------------------------- */\n\nimg.h-pull-right {\n    margin: var(--vspace-0_5) 0 var(--vspace-0_5) 2.8rem;\n}\n\nimg.h-pull-left {\n    margin: var(--vspace-0_5) 2.8rem var(--vspace-0_5) 0;\n}\n\n/* -------------------------------------------------------------------\n * ## tables\n * ------------------------------------------------------------------- */\ntable {\n    border-width: 0;\n    width: 100%;\n    max-width: 100%;\n    font-family: var(--font-1);\n    border-collapse: collapse;\n}\n\nth, td {\n    padding: var(--vspace-0_5) 3.2rem calc(var(--vspace-0_5) - .1rem);\n    text-align: left;\n    border-bottom: 1px solid var(--color-border);\n}\n\nth {\n    padding: var(--vspace-0_5) 3.2rem;\n    color: var(--color-text-dark);\n    font-family: var(--font-2);\n    font-weight: 600;\n}\n\nth:first-child, td:first-child {\n    padding-left: 0;\n}\n\nth:last-child, td:last-child {\n    padding-right: 0;\n}\n\n.table-responsive {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n}\n\n/* -------------------------------------------------------------------\n * ## spacing\n * ------------------------------------------------------------------- */\nfieldset,\nbutton,\n.btn {\n    margin-bottom: var(--vspace-0_5);\n}\n\ninput,\ntextarea,\nselect,\npre,\nblockquote,\nfigure,\nfigcaption,\ntable,\np,\nul,\nol,\ndl,\nform,\nimg,\n.video-container,\n.ss-custom-select {\n    margin-bottom: var(--vspace-1);\n}\n\n.folders {\n    padding: 0;\n    margin: 0;\n}\n\n\n/* ===================================================================\n * # preloader\n *\n * ------------------------------------------------------------------- */\n#preloader {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -ms-flex-flow: row wrap;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    flex-flow: row wrap;\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    background: white;\n    z-index: 500;\n    height: 100vh;\n    width: 100%;\n    opacity: 1;\n}\n\n.no-js #preloader, .oldie #preloader {\n    display: none;\n}\n\n#loader {\n    width: var(--vspace-1_5);\n    height: var(--vspace-1_5);\n    padding: 0;\n    opacity: 1;\n}\n\n#loader:before {\n    content: \"\";\n    border-top: 6px solid rgba(0, 0, 0, 0.2);\n    border-right: 6px solid rgba(0, 0, 0, 0.2);\n    border-bottom: 6px solid rgba(0, 0, 0, 0.2);\n    border-left: 6px solid black;\n    -webkit-animation: load 1.1s infinite linear;\n    animation: load 1.1s infinite linear;\n    display: block;\n    border-radius: 50%;\n    width: var(--vspace-1_5);\n    height: var(--vspace-1_5);\n}\n\n@-webkit-keyframes load {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(360deg);\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes load {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(360deg);\n        transform: rotate(360deg);\n    }\n}\n\n/* -------------------------------------------------------------------\n * ## page loaded\n * ------------------------------------------------------------------- */\n.ss-loaded #preloader {\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transition: all .6s .9s ease-in-out;\n    transition: all .6s .9s ease-in-out;\n}\n\n.ss-loaded #preloader #loader {\n    opacity: 0;\n    -webkit-transition: opacity .6s ease-in-out;\n    transition: opacity .6s ease-in-out;\n}\n\n\n\n/* ===================================================================\n * # forms\n *\n * ------------------------------------------------------------------- */\n.form-field {\n    display: flex;\n    flex-direction: row;\n}\n\nfieldset {\n    border: none;\n}\n\ninput[type=\"email\"],\ninput[type=\"number\"],\ninput[type=\"search\"],\ninput[type=\"text\"],\ninput[type=\"tel\"],\ninput[type=\"url\"],\ninput[type=\"password\"],\ninput[type=\"file\"],\ntextarea,\nselect {\n    --input-height: var(--vspace-2);\n    --input-line-height: var(--vspace-1);\n    --input-vpadding: calc(((var(--input-height) - var(--input-line-height)) / 2) - .1rem);\n    display: block;\n    height: var(--input-height);\n    padding: var(--input-vpadding) calc(2.4rem - .1rem);\n    border: 0;\n    outline: none;\n    color: var(--color-placeholder);\n    font-family: var(--font-1);\n    font-size: var(--text-sm);\n    line-height: var(--input-line-height);\n    max-width: 100%;\n    background-color: rgba(0, 0, 0, 0.07);\n    border: 1px solid transparent;\n    -webkit-transition: all .3s ease-in-out;\n    transition: all .3s ease-in-out;\n}\n\n.ss-custom-select {\n    position: relative;\n    padding: 0;\n}\n\n.ss-custom-select select {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    text-indent: 0.01px;\n    text-overflow: '';\n    margin: 0;\n    vertical-align: middle;\n}\n\n.ss-custom-select select option {\n    padding-left: 2rem;\n    padding-right: 2rem;\n}\n\n.ss-custom-select select::-ms-expand {\n    display: none;\n}\n\n.ss-custom-select::after {\n    border-bottom: 2px solid black;\n    border-right: 2px solid black;\n    content: '';\n    display: block;\n    height: 8px;\n    width: 8px;\n    margin-top: -7px;\n    pointer-events: none;\n    position: absolute;\n    right: 2.4rem;\n    top: 50%;\n    -webkit-transition: all 0.15s ease-in-out;\n    transition: all 0.15s ease-in-out;\n    -webkit-transform-origin: 66% 66%;\n    transform-origin: 66% 66%;\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n}\n\ntextarea {\n    min-height: calc(7 * var(--space));\n}\n\ninput[type=\"email\"]:focus,\ninput[type=\"number\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"text\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"password\"]:focus,\ninput[type=\"file\"]:focus,\ntextarea:focus,\nselect:focus {\n    color: white;\n    background-color: var(--color-gray-16);\n    border: 1px solid var(--color-gray-16);\n}\n\nlabel, legend {\n    font-family: var(--font-1);\n    font-weight: 600;\n    font-size: var(--text-sm);\n    line-height: var(--vspace-0_5);\n    margin-bottom: var(--vspace-0_5);\n    color: var(--color-text-dark);\n    display: block;\n}\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n    display: inline;\n}\n\nlabel>.label-text {\n    display: inline-block;\n    margin-left: 1rem;\n    font-family: var(--font-1);\n    line-height: inherit;\n}\n\nlabel>input[type=\"checkbox\"], label>input[type=\"radio\"] {\n    margin: 0;\n    position: relative;\n    top: .2rem;\n}\n\n/* -------------------------------------------------------------------\n * ## style placeholder text\n * ------------------------------------------------------------------- */\n::-webkit-input-placeholder {\n    /* WebKit, Blink, Edge */\n    color: var(--color-placeholder);\n}\n\n:-ms-input-placeholder {\n    /* Internet Explorer 10-11 */\n    color: var(--color-placeholder);\n}\n\n::-ms-input-placeholder {\n    /* Microsoft Edge */\n    color: var(--color-placeholder);\n}\n\n::placeholder {\n    /* Most modern browsers support this now. */\n    color: var(--color-placeholder);\n}\n\n.placeholder {\n    color: var(--color-placeholder) !important;\n}\n\n/* -------------------------------------------------------------------\n * ## change autocomplete styles in Chrome\n * ------------------------------------------------------------------- */\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus input:-webkit-autofill,\ntextarea:-webkit-autofill,\ntextarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,\nselect:-webkit-autofill,\nselect:-webkit-autofill:hover,\nselect:-webkit-autofill:focus {\n    -webkit-text-fill-color: var(--color-1);\n    -webkit-transition: background-color 5000s ease-in-out 0s;\n    transition: background-color 5000s ease-in-out 0s;\n}\n\n\n\n/* ===================================================================\n * # buttons\n *\n * ------------------------------------------------------------------- */\n.btn,\nbutton,\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"button\"] {\n    --btn-height: var(--vspace-btn);\n    display: inline-block;\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: var(--text-xs);\n    text-transform: uppercase;\n    letter-spacing: .4em;\n    height: var(--btn-height);\n    line-height: calc(var(--btn-height) - .4rem);\n    padding: 0 3.2rem;\n    margin: 0 .4rem 1.6rem 0;\n    color: var(--color-btn-text);\n    text-decoration: none;\n    text-align: center;\n    white-space: nowrap;\n    cursor: pointer;\n    -webkit-transition: all .3s;\n    transition: all .3s;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    background-color: var(--color-btn);\n    border: 0.2rem solid var(--color-btn);\n}\n\n.btn:hover,\nbutton:hover,\ninput[type=\"submit\"]:hover,\ninput[type=\"reset\"]:hover,\ninput[type=\"button\"]:hover,\n.btn:focus, button:focus,\ninput[type=\"submit\"]:focus,\ninput[type=\"reset\"]:focus,\ninput[type=\"button\"]:focus {\n    background-color: var(--color-btn-hover);\n    border-color: var(--color-btn-hover);\n    color: var(--color-btn-hover-text);\n    outline: 0;\n}\n\n/* button primary\n * ------------------------------------------------- */\n.btn.btn--primary,\nbutton.btn--primary,\ninput[type=\"submit\"].btn--primary,\ninput[type=\"reset\"].btn--primary,\ninput[type=\"button\"].btn--primary {\n    background: var(--color-btn-primary);\n    border-color: var(--color-btn-primary);\n    color: var(--color-btn-primary-text);\n}\n\n.btn.btn--primary:hover,\nbutton.btn--primary:hover,\ninput[type=\"submit\"].btn--primary:hover,\ninput[type=\"reset\"].btn--primary:hover,\ninput[type=\"button\"].btn--primary:hover,\n.btn.btn--primary:focus,\nbutton.btn--primary:focus,\ninput[type=\"submit\"].btn--primary:focus,\ninput[type=\"reset\"].btn--primary:focus,\ninput[type=\"button\"].btn--primary:focus {\n    background: var(--color-btn-primary-hover);\n    border-color: var(--color-btn-primary-hover);\n    color: var(--color-btn-primary-hover-text);\n}\n\n/* button modifiers\n * ------------------------------------------------- */\n.btn.h-full-width, button.h-full-width {\n    width: 100%;\n    margin-right: 0;\n}\n\n.btn--small, button.btn--small {\n    --btn-height: calc(var(--vspace-btn) - 1.6rem);\n}\n\n.btn--medium, button.btn--medium {\n    --btn-height: calc(var(--vspace-btn) + .8rem);\n}\n\n.btn--large, button.btn--large {\n    --btn-height: calc(var(--vspace-btn) + 1.6rem);\n}\n\n.btn--stroke, button.btn--stroke {\n    background: transparent !important;\n    border: 0.2rem solid var(--color-btn-stroke);\n    color: var(--color-btn-stroke-text);\n}\n\n.btn--stroke:hover, button.btn--stroke:hover {\n    background: var(--color-btn-stroke-hover) !important;\n    border: 0.2rem solid var(--color-btn-stroke-hover);\n    color: var(--color-btn-stroke-hover-text);\n}\n\n.btn--pill, button.btn--pill {\n    padding-left: 3.2rem !important;\n    padding-right: 3.2rem !important;\n    border-radius: 1000px !important;\n}\n\nbutton::-moz-focus-inner, input::-moz-focus-inner {\n    border: 0;\n    padding: 0;\n}\n\n\n\n/* ===================================================================\n * # additional components\n *\n * ------------------------------------------------------------------- */\n\n/* -------------------------------------------------------------------\n * ## additional typo styles\n * ------------------------------------------------------------------- */\n.drop-cap:first-letter {\n    float: left;\n    font-family: var(--font-2);\n    font-weight: 700;\n    font-size: calc(3 * var(--space));\n    line-height: 1;\n    padding: 0 0.125em 0 0;\n    text-transform: uppercase;\n    background: transparent;\n    color: var(--color-text-dark);\n}\n\n/* line definition style\n * ----------------------------------------------- */\n.lining dt, .lining dd {\n    display: inline;\n    margin: 0;\n}\n\n.lining dt+dt:before, .lining dd+dt:before {\n    content: \"\\A\";\n    white-space: pre;\n}\n\n.lining dd+dd:before {\n    content: \", \";\n}\n\n.lining dd+dd:before {\n    content: \", \";\n}\n\n.lining dd:before {\n    content: \": \";\n    margin-left: -0.2em;\n}\n\n/* dictionary definition style\n * ----------------------------------------------- */\n.dictionary-style dt {\n    display: inline;\n    counter-reset: definitions;\n}\n\n.dictionary-style dt+dt:before {\n    content: \", \";\n    margin-left: -0.2em;\n}\n\n.dictionary-style dd {\n    display: block;\n    counter-increment: definitions;\n}\n\n.dictionary-style dd:before {\n    content: counter(definitions, decimal) \". \";\n}\n\n/**\n * Pull Quotes\n * -----------\n * markup:\n *\n * <figure class=\"pull-quote\">\n *\t\t<blockquote>\n *\t\t\t<p></p>\n *\t\t</blockquote>\n * </figure>\n *\n * --------------------------------------------------------------------- */\n.pull-quote {\n    position: relative;\n    padding: 0;\n    margin-top: 0;\n    text-align: center;\n}\n\n.pull-quote blockquote {\n    border: none;\n    margin: 0 auto;\n    max-width: 62rem;\n    padding-top: var(--vspace-2_5);\n    position: relative;\n}\n\n.pull-quote blockquote p {\n    font-weight: 400;\n    color: var(--color-text-dark);\n}\n\n.pull-quote blockquote:before {\n    content: \"\";\n    display: block;\n    height: var(--vspace-1);\n    width: var(--vspace-1);\n    background-repeat: no-repeat;\n    background: center center;\n    background-size: contain;\n    /*background-image: url(../images/icons/icon-quote.svg);*/\n    -webkit-transform: translate3d(-50%, 0, 0);\n    transform: translate3d(-50%, 0, 0);\n    position: absolute;\n    top: var(--vspace-1);\n    left: 50%;\n}\n\n/**\n * Stats Tab\n * ---------\n * markup:\n *\n * <ul class=\"stats-tabs\">\n *\t\t<li><a href=\"#\">[value]<em>[name]</em></a></li>\n *\t</ul>\n *\n * Extend this object into your markup.\n *\n * --------------------------------------------------------------------- */\n.stats-tabs {\n    padding: 0;\n    margin: var(--vspace-1) 0;\n}\n\n.stats-tabs li {\n    display: inline-block;\n    margin: 0 1.6rem var(--vspace-0_5) 0;\n    padding: 0 1.5rem 0 0;\n    border-right: 1px solid var(--color-border);\n}\n\n.stats-tabs li:last-child {\n    margin: 0;\n    padding: 0;\n    border: none;\n}\n\n.stats-tabs li a {\n    display: inline-block;\n    font-size: var(--text-lg);\n    font-family: var(--font-2);\n    font-weight: 600;\n    line-height: var(--vspace-1_5);\n    border: none;\n    color: var(--color-black);\n}\n\n.stats-tabs li a:hover {\n    color: var(--color-1);\n}\n\n.stats-tabs li a em {\n    display: block;\n    margin: 0;\n    font-family: var(--font-1);\n    font-size: var(--text-sm);\n    line-height: var(--vspace-0_5);\n    font-weight: normal;\n    font-style: normal;\n    color: var(--color-text-light);\n}\n\n/* -------------------------------------------------------------------\n * ## skillbars\n * ------------------------------------------------------------------- */\n.skill-bars {\n    list-style: none;\n    margin: var(--vspace-2) 0 var(--vspace-1);\n}\n\n.skill-bars li {\n    height: .4rem;\n    background: var(--color-gray-3);\n    width: 100%;\n    margin-bottom: calc(var(--vspace-2) - .4rem);\n    padding: 0;\n    position: relative;\n}\n\n.skill-bars li strong {\n    position: absolute;\n    left: 0;\n    top: calc((var(--vspace-1) * 1.25) * -1);\n    font-family: var(--font-2);\n    font-weight: 500;\n    color: white;\n    text-transform: uppercase;\n    letter-spacing: .2em;\n    font-size: calc(var(--text-size) * 0.7778);\n    line-height: calc(0.75 * var(--space));\n}\n\n.skill-bars li .progress {\n    background: var(--color-black);\n    position: relative;\n    height: 100%;\n}\n\n.skill-bars li .progress span {\n    position: absolute;\n    right: 0;\n    top: calc((var(--vspace-1) + .8rem)* -1);\n    display: block;\n    font-family: var(--font-2);\n    color: white;\n    font-size: 1rem;\n    line-height: 1;\n    background: var(--color-black);\n    padding: calc(0.25 * var(--space)) calc(0.25 * var(--space));\n    border-radius: 4px;\n}\n\n.skill-bars li .progress span::after {\n    position: absolute;\n    left: 50%;\n    bottom: -10px;\n    margin-left: -5px;\n    width: 0;\n    height: 0;\n    border: 5px solid transparent;\n    border-top-color: var(--color-black, var(--color-black));\n    content: \"\";\n}\n\n.skill-bars li .percent5 {\n    width: 5%;\n}\n\n.skill-bars li .percent10 {\n    width: 10%;\n}\n\n.skill-bars li .percent15 {\n    width: 15%;\n}\n\n.skill-bars li .percent20 {\n    width: 20%;\n}\n\n.skill-bars li .percent25 {\n    width: 25%;\n}\n\n.skill-bars li .percent30 {\n    width: 30%;\n}\n\n.skill-bars li .percent35 {\n    width: 35%;\n}\n\n.skill-bars li .percent40 {\n    width: 40%;\n}\n\n.skill-bars li .percent45 {\n    width: 45%;\n}\n\n.skill-bars li .percent50 {\n    width: 50%;\n}\n\n.skill-bars li .percent55 {\n    width: 55%;\n}\n\n.skill-bars li .percent60 {\n    width: 60%;\n}\n\n.skill-bars li .percent65 {\n    width: 65%;\n}\n\n.skill-bars li .percent70 {\n    width: 70%;\n}\n\n.skill-bars li .percent75 {\n    width: 75%;\n}\n\n.skill-bars li .percent80 {\n    width: 80%;\n}\n\n.skill-bars li .percent85 {\n    width: 85%;\n}\n\n.skill-bars li .percent90 {\n    width: 90%;\n}\n\n.skill-bars li .percent95 {\n    width: 95%;\n}\n\n.skill-bars li .percent100 {\n    width: 100%;\n}\n\n/* -------------------------------------------------------------------\n * ## alert box\n * ------------------------------------------------------------------- */\n.alert-box {\n    padding: var(--vspace-0_75) 4rem var(--vspace-0_75) 3.2rem;\n    margin-bottom: var(--vspace-1);\n    border-radius: 4px;\n    font-family: var(--font-1);\n    font-weight: 500;\n    font-size: var(--text-sm);\n    line-height: var(--vspace-0_75);\n    opacity: 1;\n    visibility: visible;\n    position: relative;\n}\n\n.alert-box__close {\n    position: absolute;\n    display: block;\n    right: 1.6rem;\n    top: 1.6rem;\n    cursor: pointer;\n    width: 12px;\n    height: 12px;\n}\n\n.alert-box__close::before, .alert-box__close::after {\n    content: '';\n    position: absolute;\n    display: inline-block;\n    width: 2px;\n    height: 12px;\n    top: 0;\n    left: 5px;\n}\n\n.alert-box__close::before {\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n}\n\n.alert-box__close::after {\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n}\n\n.alert-box--error {\n    background-color: var(--color-error);\n    color: var(--color-error-content);\n}\n\n.alert-box--error .alert-box__close::before,\n.alert-box--error .alert-box__close::after {\n    background-color: var(--color-error-content);\n}\n\n.alert-box--success {\n    background-color: var(--color-success);\n    color: var(--color-success-content);\n}\n\n.alert-box--success .alert-box__close::before,\n.alert-box--success .alert-box__close::after {\n    background-color: var(--color-success-content);\n}\n\n.alert-box--info {\n    background-color: var(--color-info);\n    color: var(--color-info-content);\n}\n\n.alert-box--info .alert-box__close::before,\n.alert-box--info .alert-box__close::after {\n    background-color: var(--color-info-content);\n}\n\n.alert-box--notice {\n    background-color: var(--color-notice);\n    color: var(--color-notice-content);\n}\n\n.alert-box--notice .alert-box__close::before,\n.alert-box--notice .alert-box__close::after {\n    background-color: var(--color-notice-content);\n}\n\n.alert-box.hideit {\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transition: all .5s;\n    transition: all .5s;\n}\n\n/* -------------------------------------------------------------------\n * ## pagination\n * ------------------------------------------------------------------- */\n.pgn {\n    --pgn-num-height: calc(var(--vspace-1) + .4rem);\n    margin: var(--vspace-1) auto var(--vspace-1);\n    text-align: center;\n}\n\n.pgn ul {\n    display: inline-block;\n    list-style: none;\n    margin-left: 0;\n    position: relative;\n    padding: 0 6rem;\n}\n\n.pgn ul li {\n    display: inline-block;\n    margin: 0;\n    padding: 0;\n}\n\n.pgn__num {\n    display: inline-block;\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: var(--text-size);\n    line-height: var(--vspace-1);\n    padding: .2rem 1.2rem;\n    height: var(--pgn-num-height);\n    margin: .2rem .2rem;\n    color: var(--color-text-dark);\n    border-radius: 4px;\n    -webkit-transition: all, .3s, ease-in-out;\n    transition: all, .3s, ease-in-out;\n}\n\n.pgn__num:hover {\n    background: var(--color-gray-18);\n    color: var(--color-white);\n}\n\n.pgn .current, .pgn .current:hover {\n    background-color: var(--color-gray-18);\n    color: var(--color-white);\n}\n\n.pgn .inactive, .pgn .inactive:hover {\n    opacity: 0.4;\n    cursor: default;\n}\n\n.pgn__prev, .pgn__next {\n    display: -ms-inline-flexbox;\n    display: -webkit-inline-box;\n    display: inline-flex;\n    -ms-flex-flow: row wrap;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    flex-flow: row wrap;\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n    height: var(--pgn-num-height);\n    width: 4.8rem;\n    line-height: var(--vspace-1);\n    border-radius: 4px;\n    padding: 0;\n    margin: 0;\n    opacity: 1;\n    font: 0/0 a;\n    text-shadow: none;\n    color: transparent;\n    -webkit-transition: all, .3s, ease-in-out;\n    transition: all, .3s, ease-in-out;\n    position: absolute;\n    top: 50%;\n    -webkit-transform: translate3d(0, -50%, 0);\n    transform: translate3d(0, -50%, 0);\n}\n\n.pgn__prev:hover, .pgn__next:hover {\n    background-color: var(--color-gray-18);\n}\n\n.pgn__prev svg, .pgn__next svg {\n    height: 2.4rem;\n    width: 2.4rem;\n    -webkit-transition: all, .3s, ease-in-out;\n    transition: all, .3s, ease-in-out;\n}\n\n.pgn__prev svg path, .pgn__next svg path {\n    fill: var(--color-text-dark);\n}\n\n.pgn__prev:hover svg path,\n.pgn__prev:focus svg path,\n.pgn__next:hover svg path,\n.pgn__next:focus svg path {\n    fill: white;\n}\n\n.pgn__prev {\n    left: 0;\n}\n\n.pgn__next {\n    right: 0;\n}\n\n.pgn__prev.inactive,\n.pgn__next.inactive {\n    opacity: 0.4;\n    cursor: default;\n}\n\n.pgn__prev.inactive:hover,\n.pgn__next.inactive:hover {\n    background-color: transparent;\n}\n\n/* -------------------------------------------------------------------\n * responsive:\n * pagination\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 600px) {\n    .pgn ul {\n        padding: 0 5.2rem;\n    }\n}\n\n\n\n/* ===================================================================\n * # common and reusable styles\n *\n * ------------------------------------------------------------------- */\n.wide {\n    max-width: var(--width-wide);\n}\n\n.wider {\n    max-width: var(--width-wider);\n}\n\n.narrow {\n    max-width: var(--width-narrow);\n}\n\n.narrower {\n    max-width: var(--width-narrower);\n}\n\n/* -------------------------------------------------------------------\n * ## animation stuff\n * ------------------------------------------------------------------- */\n.animate-this {\n    opacity: 0;\n    visibility: hidden;\n}\n\n.no-js .animate-this, .no-cssanimations .animate-this {\n    opacity: 1;\n    visibility: visible;\n}\n\n.animated {\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-fill-mode: both;\n    animation-fill-mode: both;\n    -webkit-animation-name: fadeInUp;\n    animation-name: fadeInUp;\n}\n\n/* fade in */\n@-webkit-keyframes fadeInUp {\n    from {\n        opacity: 0;\n        visibility: hidden;\n        -webkit-transform: translate3d(0, 150%, 0);\n        transform: translate3d(0, 150%, 0);\n    }\n    to {\n        opacity: 1;\n        visibility: visible;\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n    }\n}\n\n@keyframes fadeInUp {\n    from {\n        opacity: 0;\n        visibility: hidden;\n        -webkit-transform: translate3d(0, 150%, 0);\n        transform: translate3d(0, 150%, 0);\n    }\n    to {\n        opacity: 1;\n        visibility: visible;\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n    }\n}\n\n\n/* -------------------------------------------------------------------\n * ## slick slider\n * ------------------------------------------------------------------- */\n.slick-slider .slick-slide {\n    outline: none;\n}\n\n.slick-slider .slick-dots {\n    display: block;\n    list-style: none;\n    width: 100%;\n    padding: 0;\n    margin: var(--vspace-1) 0 0 0;\n    text-align: center;\n    position: absolute;\n    top: 100%;\n    left: 0;\n}\n\n.slick-slider .slick-dots li {\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    margin: 0;\n    padding: 5px;\n    cursor: pointer;\n}\n\n.slick-slider .slick-dots li button {\n    display: block;\n    width: 10px;\n    height: 10px;\n    line-height: 10px;\n    border-radius: 50%;\n    background: rgba(255, 255, 255, 0.6);\n    border: none;\n    padding: 0;\n    margin: 0;\n    cursor: pointer;\n    font: 0/0 a;\n    text-shadow: none;\n    color: transparent;\n}\n\n.slick-slider .slick-dots li button:hover,\n.slick-slider .slick-dots li button:focus {\n    outline: none;\n}\n\n.slick-slider .slick-dots li.slick-active button,\n.slick-slider .slick-dots li:hover button {\n    background: white;\n}\n\n/* -------------------------------------------------------------------\n * ## masonry entries\n * ------------------------------------------------------------------- */\n.bricks-wrapper .entry {\n    margin-bottom: 1rem;\n}\n\n.bricks-wrapper .entry__thumb,\n.bricks-wrapper .entry__text {\n    -webkit-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);\n    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);\n}\n\n.bricks-wrapper .entry__thumb {\n    overflow: hidden;\n    position: relative;\n}\n\n.bricks-wrapper .entry__thumb img {\n    vertical-align: bottom;\n    -webkit-transition: all 0.3s ease-in-out;\n    transition: all 0.3s ease-in-out;\n    margin: 0;\n}\n\n.bricks-wrapper .entry__thumb .thumb-link::before {\n    z-index: 1;\n    content: \"\";\n    display: block;\n    background: rgba(0, 0, 0, 0.8);\n    opacity: 0;\n    visibility: hidden;\n    width: 100%;\n    height: 100%;\n    -webkit-transition: all 0.3s ease-in-out;\n    transition: all 0.3s ease-in-out;\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n\n.bricks-wrapper .entry__thumb .thumb-link::after {\n    z-index: 1;\n    display: block;\n    content: \"...\";\n    font-family: georgia, serif;\n    font-size: 3.2rem;\n    height: 90px;\n    width: 90px;\n    letter-spacing: .2rem;\n    line-height: 90px;\n    margin-left: -45px;\n    margin-top: -45px;\n    text-align: center;\n    color: white;\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5);\n    -webkit-transition: all 0.3s ease-in-out;\n    transition: all 0.3s ease-in-out;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n}\n\n.bricks-wrapper .entry__thumb:hover .thumb-link::before {\n    opacity: 1;\n    visibility: visible;\n}\n\n.bricks-wrapper .entry__thumb:hover .thumb-link::after {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: scale(1);\n    transform: scale(1);\n}\n\n.bricks-wrapper .entry__thumb:hover .thumb-link img {\n    -webkit-transform: scale(1.05);\n    transform: scale(1.05);\n}\n\n.bricks-wrapper .entry__text {\n    padding-left: 2rem;\n    padding-right: 2rem;\n    padding-bottom: 1rem;\n    padding-top: 1rem;\n    background-color: white;\n}\n\n.bricks-wrapper .entry__title {\n    font-size: var(--text-lg);\n    font-weight: 500;\n    line-height: var(--vspace-1);\n    margin-top: 0;\n    margin-bottom: var(--vspace-0_5);\n}\n\n.bricks-wrapper .entry__title a,\n.bricks-wrapper .entry__title a:visited {\n    color: black;\n}\n\n.bricks-wrapper .entry__meta {\n    font-family: var(--font-1);\n    font-size: var(--text-sm);\n    margin-bottom: calc(0.125 * var(--space));\n}\n\n.bricks-wrapper .entry__meta a,\n.bricks-wrapper .entry__meta a:visited {\n    color: black;\n}\n\n.bricks-wrapper .entry__cat-links a::after {\n    content: \", \";\n}\n\n.bricks-wrapper .entry__cat-links a:last-child::after {\n    display: none;\n}\n\n.bricks-wrapper .entry__excerpt {\n    font-size: 1.5rem;\n    line-height: 1.733;\n    color: var(--color-text-light);\n}\n\n.bricks-wrapper .entry__excerpt p {\n    margin-bottom: 0;\n}\n\n/* featured post slider\n * ------------------------------------------------------------------- */\n.featured-grid .entry__content {\n    position: relative;\n}\n\n.featured-grid .entry__content:hover .f-slide__overlay {\n    background-color: rgba(0, 0, 0, 0.5);\n}\n\n.f-slide {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n    height: 600px;\n    width: 100%;\n    background-color: white;\n    padding: var(--vspace-2) 15% var(--vspace-1);\n    text-align: center;\n    position: relative;\n}\n\n.f-slide__background {\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n}\n\n.f-slide__overlay {\n    background-color: rgba(0, 0, 0, 0.3);\n    -webkit-transition: all 0.3s ease-in-out;\n    transition: all 0.3s ease-in-out;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n}\n\n.f-slide__content {\n    position: relative;\n}\n\n.f-slide__meta {\n    font-family: var(--font-1);\n    font-size: set-text-size(0.8888);\n    margin: -3.2rem 0 0.8rem 0;\n    color: rgba(255, 255, 255, 0.6);\n    line-height: 1.5;\n}\n\n.f-slide__meta li {\n    display: inline-block;\n    margin: 0 3px;\n    padding: 0;\n}\n\n.f-slide__meta li a {\n    color: rgba(255, 255, 255, 0.6);\n}\n\n.f-slide__meta li a:hover,\n.f-slide__meta li a:focus {\n    color: white;\n    border-color: rgba(255, 255, 255, 0.2);\n}\n\n.f-slide__title {\n    font-family: var(--font-2);\n    font-weight: 500;\n    font-size: var(--text-xxl);\n    line-height: 1.286;\n    margin-top: 0;\n    margin-bottom: var(--vspace-1);\n    color: white;\n}\n\n.f-slide__title a {\n    color: white;\n    border-bottom: 1px solid transparent;\n}\n\n.f-slide__title a:hover, .f-slide__title a:focus {\n    color: white;\n    border-color: rgba(255, 255, 255, 0.1);\n}\n\n/* featured-post-slider direction nav\n * --------------------------------------------------------- */\n.featured-post-nav button {\n    z-index: 2;\n    background-color: black;\n    border: black;\n    padding: 0;\n    margin: 0;\n    height: 6rem;\n    width: 6rem;\n    cursor: pointer;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    position: absolute;\n    top: 50%;\n}\n\n.featured-post-nav button svg {\n    height: 2rem;\n    width: 2rem;\n}\n\n.featured-post-nav button svg path {\n    fill: rgba(255, 255, 255, 0.5);\n    -webkit-transition: all .3s;\n    transition: all .3s;\n}\n\n.featured-post-nav button:hover svg path,\n.featured-post-nav button:focus svg path {\n    fill: white;\n}\n\n.featured-post-nav__prev {\n    left: 0;\n}\n\n.featured-post-nav__next {\n    right: 0;\n}\n\n/*  post formats - masonry view\n * ------------------------------------------------------------------- */\n\n/* format quote & format link\n * --------------------------------------- */\n.format-quote, .format-link {\n    text-align: center;\n}\n\n.format-quote .entry__thumb,\n.format-link .entry__thumb {\n    display: table;\n    background: white;\n    padding: 2.4rem 3rem 4.8rem;\n    min-height: 320px;\n    width: 100%;\n    position: relative;\n}\n\n.format-quote .entry__thumb::before,\n.format-link .entry__thumb::before {\n    content: \"\";\n    display: block;\n    height: 3.6rem;\n    width: 3.6rem;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-size: contain;\n    margin-bottom: 1.5rem;\n    position: absolute;\n    top: var(--vspace-1_25);\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n    transform: translateX(-50%);\n}\n\n.format-quote blockquote::before {\n    display: none;\n}\n\n.format-quote blockquote,\n.format-link .link-wrap {\n    display: table-cell;\n    margin: 0;\n    padding: 0;\n    vertical-align: middle;\n    border: none;\n}\n\n.format-quote blockquote p,\n.format-link .link-wrap p {\n    font-family: var(--font-2);\n    font-weight: 500;\n    font-size: var(--text-lg);\n    line-height: var(--vspace-1);\n    color: black;\n    padding: 7.8rem 0 0 0;\n    margin-bottom: var(--vspace-1);\n}\n\n.format-quote cite, .format-link cite {\n    display: block;\n    font-family: var(--font-1);\n    font-size: 1.5rem;\n    font-style: normal;\n    line-height: 1.6;\n    color: var(--color-text-light);\n}\n\n.format-quote cite::before,\n.format-link cite::before {\n    display: none;\n}\n\n.format-quote cite a,\n.format-quote cite a:visited {\n    color: var(--color-text-light);\n    border: none;\n}\n\n.format-quote .entry__thumb::before {\n    /*background-image: url(../images/icons/icon-quote.svg);*/\n}\n\n.format-link .entry__thumb::before {\n    /*background-image: url(../images/icons/icon-link.svg);*/\n    width: 3.2rem;\n    height: 3.2rem;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 3rem 3rem;\n}\n\n.format-link .link-wrap cite:before {\n    display: none;\n}\n\n.format-link .link-wrap cite a,\n.format-link .link-wrap cite a:visited {\n    color: var(--color-text-light);\n    display: inline-block;\n    padding-bottom: .4rem;\n}\n\n.format-link .link-wrap cite a:hover,\n.format-link .link-wrap cite a:focus {\n    color: black;\n}\n\n/* format video & format audio\n * --------------------------------------- */\n.format-video .entry__thumb::after,\n.format-audio .entry__thumb::after {\n    content: \"\";\n    display: block;\n    height: 5.6rem;\n    width: 5.6rem;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-color: rgba(0, 0, 0, 0.3);\n    border-radius: 50%;\n    position: absolute;\n    top: 2.4rem;\n    left: 2.4rem;\n}\n\n.format-video .thumb-link::before,\n.format-video .thumb-link::after,\n.format-audio .thumb-link::before,\n.format-audio .thumb-link::after {\n    display: none !important;\n}\n\n.format-video .entry__thumb::after {\n    cursor: -webkit-zoom-in;\n    cursor: zoom-in;\n    /*background-image: url(../images/icons/icon-video.svg);*/\n    background-size: 2.8rem 2.8rem;\n}\n\n.format-video .entry__thumb-link {\n    cursor: -webkit-zoom-in;\n    cursor: zoom-in;\n}\n\n.format-audio .entry__thumb::after {\n    /*background-image: url(../images/icons/icon-audio.svg);*/\n    background-size: 2.8rem 2.8rem;\n}\n\n/* -------------------------------------------------------------------\n * ## format gallery\n * ------------------------------------------------------------------- */\n.format-gallery .entry__thumb {\n    overflow: hidden;\n}\n\n.format-gallery .slider {\n    overflow: hidden;\n}\n\n.format-gallery .slick-dots {\n    text-align: right;\n    margin: 0;\n    padding: 0 2.4rem 0 2rem;\n    position: absolute;\n    top: auto;\n    bottom: var(--vspace-0_75);\n    right: 0;\n}\n\n.format-gallery .slider__slides {\n    cursor: pointer;\n    overflow: hidden;\n    opacity: 0;\n    visibility: hidden;\n}\n\n.format-gallery .slider__slides.slick-initialized {\n    opacity: 1;\n    visibility: visible;\n}\n\n/* responsive:\n/* common and reusable styles\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1400px) {\n    .bricks-wrapper .entry {\n        margin-bottom: 1rem;\n    }\n}\n\n@media screen and (max-width: 1040px) {\n    .bricks-wrapper .entry__title,\n    .format-quote blockquote p,\n    .format-link .link-wrap p {\n        font-size: var(--text-md);\n        line-height: calc(0.875 * var(--space));\n    }\n}\n\n@media screen and (max-width: 980px) {\n    .bricks-wrapper .entry__title,\n    .format-quote blockquote p,\n    .format-link .link-wrap p {\n        font-size: var(--text-lg);\n        line-height: var(--vspace-1);\n    }\n}\n\n@media screen and (max-width: 800px) {\n    .bricks-wrapper .entry {\n        margin-bottom: 1rem;\n    }\n}\n\n@media screen and (max-width: 700px) {\n    .bricks-wrapper .entry {\n        margin-bottom: 1rem;\n    }\n    .bricks-wrapper .entry__title,\n    .format-quote blockquote p,\n    .format-link .link-wrap p {\n        font-size: var(--text-md);\n        line-height: calc(0.875 * var(--space));\n    }\n}\n\n@media screen and (max-width: 600px) {\n    .bricks-wrapper .entry {\n        margin-bottom: 1rem;\n    }\n    .bricks-wrapper .entry__title,\n    .format-quote blockquote p,\n    .format-link .link-wrap p {\n        font-size: var(--text-lg);\n        line-height: var(--vspace-1);\n    }\n    .f-slide {\n        height: 552px;\n    }\n    .f-slide__meta {\n        font-size: var(--text-sm);\n    }\n    .f-slide__title {\n        font-size: var(--text-xl);\n    }\n    .featured-post-nav button {\n        height: 5.2rem;\n        width: 5.2rem;\n        -webkit-transform: translateY(0);\n        transform: translateY(0);\n        top: auto;\n        bottom: 0;\n    }\n    .featured-post-nav button svg {\n        height: 1.6rem;\n        width: 1.6rem;\n    }\n}\n\n@media screen and (max-width: 400px) {\n    .bricks-wrapper .entry {\n        margin-bottom: 1rem;\n    }\n    .f-slide {\n        height: 440px;\n    }\n    .featured-post-nav button {\n        height: 4.4rem;\n        width: 4.4rem;\n    }\n    .featured-post-nav button svg {\n        height: 1.4rem;\n        width: 1.4rem;\n    }\n}\n\n\n\n\n\n\n\n/* ===================================================================\n * # pageheader\n *\n * ------------------------------------------------------------------- */\n.s-pageheader {\n    padding: var(--vspace-1_5) 0 0 0;\n    text-align: center;\n}\n\n.s-pageheader .row {\n    max-width: 900px;\n}\n\n.s-pageheader h1 {\n    margin-top: 0;\n    margin-bottom: var(--vspace-1);\n}\n\n\n\n/* ===================================================================\n * # content wrap\n *\n * ------------------------------------------------------------------- */\n.s-content {\n    --row-max-width: 1080px;\n    padding-top: var(--topspace);\n    padding-bottom: var(--vspace-0_125);\n}\n\n.s-content--single {\n    padding-bottom: var(--vspace-0_125);\n}\n\n.s-content .row {\n    max-width: var(--row-max-width);\n}\n\n.s-content .row.wide {\n    max-width: 1400px;\n}\n\n.s-content .row.narrow {\n    max-width: 800px;\n}\n\n.s-content__media {\n    position: relative;\n    margin-bottom: var(--vspace-2_5);\n}\n\n.s-content__media img {\n    vertical-align: bottom;\n    margin-bottom: 0;\n}\n\n.s-content__primary {\n    padding-left: 20rem;\n    padding-right: 20rem;\n}\n\n.s-content__primary img {\n    max-width: calc(var(--row-max-width) - var(--gutter-lg) * 2);\n    margin: var(--vspace-1) 0 var(--vspace-1) -8rem;\n}\n\n.s-content__title {\n    text-align: center;\n}\n\n.s-content__title--post {\n    margin-bottom: var(--vspace-0_25);\n}\n\n.s-content__blocks h4 {\n    margin-top: 0;\n}\n\n.s-content__form {\n    margin-top: var(--vspace-2);\n}\n\n/* responsive:\n * content wrap\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1200px) {\n    .s-content {\n        --row-max-width: 1000px;\n    }\n    .s-content__primary {\n        padding-left: 4.8rem;\n        padding-right: 4.8rem;\n    }\n    .s-content__primary img {\n        max-width: calc(var(--row-max-width) - var(--gutter-md) * 2);\n        margin: var(--vspace-1) 0 var(--vspace-1) -4.8rem;\n    }\n}\n\n@media screen and (max-width: 1100px) {\n    .s-content {\n        --row-max-width: 920px;\n    }\n    .s-content__primary {\n        padding-left: 4rem;\n        padding-right: 4rem;\n    }\n    .s-content__primary img {\n        margin: var(--vspace-1) 0 var(--vspace-1) -4rem;\n    }\n}\n\n@media screen and (max-width: 1020px) {\n    .s-content__primary {\n        padding-left: 3.2rem;\n        padding-right: 3.2rem;\n    }\n    .s-content__primary img {\n        max-width: 100%;\n        margin: var(--vspace-1) 0;\n    }\n}\n\n@media screen and (max-width: 800px) {\n    .s-content {\n        padding-top: var(--topspace);\n    }\n    .s-content__primary {\n        padding-left: 0;\n        padding-right: 0;\n    }\n    .s-content__media {\n        margin-bottom: var(--vspace-2);\n    }\n}\n\n@media screen and (max-width: 600px) {\n    .s-content {\n        padding-top: var(--topspace);\n    }\n    .s-content__media {\n        margin-bottom: var(--vspace-1_5);\n    }\n}\n\n@media screen and (max-width: 400px) {\n    .s-content__title {\n        font-size: var(--text-xxl);\n        line-height: var(--vspace-1_5);\n    }\n}\n\n\n\n/* ===================================================================\n * # bricks masonry\n *\n * ------------------------------------------------------------------- */\n.s-bricks {\n    padding-top: 4.2rem;\n}\n\n.s-bricks.with-top-sep {\n    position: relative;\n}\n\n.s-bricks.with-top-sep::before {\n    content: \"\";\n    display: block;\n    position: absolute;\n    left: 50%;\n    top: 0;\n    margin-left: -100px;\n    width: 200px;\n    height: 1px;\n    background-color: var(--color-border);\n}\n\n.s-bricks .masonry {\n    max-width: 1440px;\n    width: 94%;\n    margin: 0 auto var(--vspace-1);\n}\n\n.s-bricks .pagination {\n    margin-top: 6rem;\n}\n\n.bricks-wrapper .grid-sizer,\n.bricks-wrapper .brick {\n    width: 100%;\n}\n\n.bricks-wrapper .brick {\n    padding: 0;\n}\n\n.bricks-wrapper .featured-grid {\n    width: 100%;\n}\n\n.bricks-wrapper .featured-grid .entry-content {\n    width: 100%;\n    background: #151515;\n}\n\n/* responsive:\n/* bricks masonry\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1440px) {\n    .s-bricks .masonry {\n        width: 98%;\n    }\n}\n\n@media screen and (max-width: 1400px) {\n    .s-bricks .masonry {\n        max-width: var(--width-max);\n        width: 94%;\n    }\n    .bricks-wrapper .grid-sizer,\n    .bricks-wrapper .brick {\n        width: 100%;\n    }\n    .bricks-wrapper .brick {\n        padding: 0;\n    }\n    .bricks-wrapper .featured-grid {\n        width: 100%;\n    }\n}\n\n@media screen and (max-width: 980px) {\n    .s-bricks .masonry {\n        max-width: 780px;\n        width: 96%;\n    }\n    .bricks-wrapper .grid-sizer,\n    .bricks-wrapper .brick {\n        width: 100%;\n    }\n    .bricks-wrapper .featured-grid {\n        width: 100%;\n    }\n}\n\n@media screen and (max-width: 800px) {\n    .bricks-wrapper .brick {\n        padding: 0;\n    }\n}\n\n@media screen and (max-width: 700px) {\n    .bricks-wrapper .brick {\n        padding: 0;\n    }\n}\n\n@media screen and (max-width: 600px) {\n    .s-bricks .masonry {\n        max-width: 480px;\n        width: 100%;\n        padding-left: 6vw;\n        padding-right: 6vw;\n    }\n    .bricks-wrapper .grid-sizer,\n    .bricks-wrapper .brick {\n        float: none;\n        width: 100%;\n        padding: 0 var(--gutter-mob);\n        clear: both;\n    }\n}\n\n@media screen and (max-width: 400px) {\n    .bricks-wrapper .brick {\n        margin-left: 0;\n        margin-right: 0;\n        padding: 0;\n    }\n}\n\n\n\n/* ===================================================================\n * # footer\n *\n * ------------------------------------------------------------------- */\n.s-footer {\n    padding-top: var(--vspace-2_5);\n    padding-bottom: var(--vspace-2);\n    font-size: 1.6rem;\n    line-height: 2.8rem;\n    color: var(--color-text-light);\n}\n\n.s-footer .row {\n    max-width: 1240px;\n}\n\n.s-footer [class*=\"column\"] {\n    margin-bottom: var(--vspace-0_5);\n}\n\n.s-footer a {\n    color: black;\n}\n\n.s-footer h5 {\n    font-size: var(--text-size);\n    font-weight: 500;\n    padding-bottom: var(--vspace-0_75);\n    margin-bottom: var(--vspace-0_75);\n    margin-top: 0;\n    border-bottom: 1px solid var(--color-border);\n}\n\n.s-footer ul {\n    margin-left: 0;\n}\n\n.s-footer li {\n    padding-left: 0;\n}\n\n/* -------------------------------------------------------------------\n * ## footer main\n * ------------------------------------------------------------------- */\n.s-footer__main {\n    padding-bottom: var(--vspace-0_5);\n}\n\n.s-footer__main ul li {\n    list-style: none;\n}\n\n.s-footer__main ul a {\n    color: var(--color-text-light);\n}\n\n.s-footer__main ul a:hover, .s-footer__main ul a:focus {\n    color: black;\n}\n\n/* footer subscribe\n * -------------------------------------- */\n.s-footer__subscribe p {\n    margin-bottom: var(--vspace-0_5);\n}\n\n.s-footer__subscribe .subscribe-form #mc-form {\n    padding: 0;\n}\n\n.s-footer__subscribe .subscribe-form input[type=\"email\"] {\n    padding: .8rem 2rem;\n    border: none;\n    width: 100%;\n    margin-bottom: var(--vspace-0_5);\n}\n\n.s-footer__subscribe .subscribe-form input[type=\"submit\"] {\n    display: none;\n}\n\n.s-footer__subscribe .subscribe-form .subscribe-message {\n    font-family: var(--font-1);\n    font-size: var(--text-sm);\n    color: black;\n}\n\n.s-footer__subscribe .subscribe-form .subscribe-message i {\n    color: black;\n    margin-right: .4rem;\n}\n\n/* -------------------------------------------------------------------\n * ## footer bottom\n * ------------------------------------------------------------------- */\n.s-footer__bottom {\n    margin-top: var(--vspace-0_5);\n    text-align: center;\n}\n\n/* copyright\n * -------------------------------------- */\n.ss-copyright span {\n    display: inline-block;\n    font-size: var(--text-sm);\n    line-height: 2.4rem;\n}\n\n.ss-copyright span::after {\n    content: \"|\";\n    display: inline-block;\n    padding: 0 1rem 0 1.2rem;\n    color: rgba(0, 0, 0, 0.2);\n}\n\n.ss-copyright span:last-child::after {\n    display: none;\n}\n\n/* -------------------------------------------------------------------\n * ## go top\n * ------------------------------------------------------------------- */\n.ss-go-top {\n    z-index: 2;\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transform: translate3d(0, 200%, 0);\n    transform: translate3d(0, 200%, 0);\n    -webkit-transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);\n    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);\n    position: fixed;\n    bottom: 6.4rem;\n    right: 6.4rem;\n}\n\n.ss-go-top a {\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: flex;\n    -ms-flex-align: center;\n    -webkit-box-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    -webkit-box-pack: center;\n    justify-content: center;\n    text-decoration: none;\n    border: none;\n    height: 6.4rem;\n    width: 6.4rem;\n    border-radius: 50%;\n    background-color: var(--color-gray-3);\n    -webkit-transition: all .3s;\n    transition: all .3s;\n    position: relative;\n}\n\n.ss-go-top a:hover, .ss-go-top a:focus {\n    background-color: black;\n}\n\n.ss-go-top a:hover svg path, .ss-go-top a:focus svg path {\n    fill: white;\n}\n\n.ss-go-top svg {\n    height: 2.4rem;\n    width: 2.4rem;\n}\n\n.ss-go-top svg path {\n    fill: black;\n}\n\n.ss-go-top.link-is-visible {\n    opacity: 1;\n    visibility: visible;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n}\n\n/* responsive:\n * footer\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 800px) {\n    .s-footer {\n        padding-bottom: var(--vspace-1_5);\n    }\n    .ss-go-top {\n        right: 3.6rem;\n        bottom: 4.8rem;\n    }\n    .ss-go-top a {\n        height: 5.2rem;\n        width: 5.2rem;\n    }\n    .ss-go-top svg {\n        height: 2rem;\n        width: 2rem;\n    }\n}\n\n@media screen and (max-width: 600px) {\n    .s-footer__bottom {\n        padding-bottom: .8rem;\n    }\n    .ss-copyright span {\n        display: block;\n    }\n    .ss-copyright span::after {\n        display: none;\n    }\n    .ss-go-top {\n        right: 2.4rem;\n        bottom: 4rem;\n    }\n}\n\n\n\n/* ===================================================================\n * # blog styles and blog components\n *\n * ------------------------------------------------------------------- */\n\n/* -------------------------------------------------------------------\n * ## single post meta\n * ------------------------------------------------------------------- */\n.s-content__post-meta {\n    font-family: var(--font-1);\n    font-size: calc(var(--text-size) * 0.944);\n    list-style: none;\n    text-align: center;\n    margin-left: 0;\n    margin-bottom: var(--vspace-1_75);\n    color: var(--color-text-light);\n}\n\n.s-content__post-meta a {\n    color: black;\n}\n\n.s-content__post-meta li {\n    display: inline-block;\n    padding-left: 0;\n    margin: 0 .8rem;\n}\n\n.s-content__post-meta .cat a {\n    margin-right: .6rem;\n}\n\n.s-content__post-meta .cat a:last-child {\n    margin-right: 0;\n}\n\n.s-content__post-meta .cat a:last-child::after {\n    content: none;\n}\n\n.s-content__post-meta .cat a::after {\n    content: \",\";\n}\n\n/* -------------------------------------------------------------------\n * ## single post tags\n * ------------------------------------------------------------------- */\n.s-content__post-tags {\n    margin: var(--vspace-2) 0 var(--vspace-1_25);\n}\n\n.s-content__post-tags span {\n    color: black;\n    margin-right: 1rem;\n    font-weight: 600;\n}\n\n.s-content__post-tags a {\n    color: var(--color-text-light);\n    margin-right: 1rem;\n}\n\n/* -------------------------------------------------------------------\n * ## author profile\n * ------------------------------------------------------------------- */\n.s-content__author {\n    margin-top: var(--vspace-2_5);\n    padding-top: var(--vspace-0_25);\n    padding-left: 9.6rem;\n    position: relative;\n}\n\n.s-content__author a {\n    color: black;\n}\n\n.s-content__author h5 {\n    margin-top: 0;\n}\n\n.s-content__author img {\n    margin: .6rem 0 0 0 !important;\n    width: 6.4rem;\n    height: 6.4rem;\n    border-radius: 50%;\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n\n.s-content__author p {\n    margin-bottom: var(--vspace-0_5);\n}\n\n.s-content__author .author-social {\n    list-style: none;\n    margin-left: 0;\n    font-size: var(--text-xs);\n    text-transform: uppercase;\n    letter-spacing: .2em;\n}\n\n.s-content__author .author-social li {\n    display: inline-block;\n    margin-right: 0.8rem;\n    padding-left: 0;\n}\n\n.s-content__author .author-social a {\n    color: var(--color-text-light);\n}\n\n/* -------------------------------------------------------------------\n * ## single post page nav\n * ------------------------------------------------------------------- */\n.s-content__pagenav {\n    padding-top: var(--vspace-0_5);\n    margin: 12rem 0;\n    border-top: 1px solid var(--color-border);\n}\n\n.s-content__pagenav div {\n    float: left;\n    width: 50%;\n    padding-top: var(--vspace-0_5);\n    padding-right: var(--gutter-lg);\n}\n\n.s-content__pagenav a {\n    font-family: var(--font-2);\n    font-weight: 600;\n    font-size: var(--text-lg);\n    line-height: var(--vspace-1);\n    border: none;\n    color: black;\n}\n\n.s-content__pagenav a span {\n    display: block;\n    font-family: var(--font-1);\n    font-weight: 400;\n    font-size: var(--text-sm);\n    line-height: var(--vspace-1);\n    margin-bottom: var(--vspace-0_5);\n    color: var(--color-text-light);\n    -webkit-transition: all 0.3s ease-in-out;\n    transition: all 0.3s ease-in-out;\n}\n\n.s-content__pagenav a:hover span {\n    color: black;\n}\n\n/* -------------------------------------------------------------------\n * responsive:\n * blog styles and blog components\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 800px) {\n    .s-content__author {\n        padding-left: 0;\n        text-align: center;\n    }\n    .s-content__author img {\n        position: static;\n        width: 6.6rem;\n        height: 6.6rem;\n        margin: 0 0 0.8rem 0 !important;\n    }\n}\n\n@media screen and (max-width: 640px) {\n    .s-content__pagenav {\n        text-align: center;\n    }\n    .s-content__pagenav div {\n        float: none;\n        width: 100%;\n        padding-right: 0;\n    }\n    .s-content__pagenav div:first-child {\n        margin-bottom: var(--vspace-0_5);\n    }\n}\n\n\n/* -------------------------------------------------------------------\n * ## comments\n * ------------------------------------------------------------------- */\n.comments-wrap {\n    margin-top: var(--vspace-3);\n    padding: var(--vspace-3_5) 0 var(--vspace-3_5);\n    background-color: var(--color-gray-1);\n}\n\n.comments-wrap .column {\n    padding: 0 calc(8rem + var(--gutter-lg));\n}\n\n.comments-wrap h3 {\n    margin-top: 0;\n    margin-bottom: var(--vspace-0_5);\n}\n\n.comments-wrap h3 span {\n    display: block;\n    font-family: var(--font-1);\n    font-weight: 400;\n    font-size: calc(var(--text-size) * 0.8889);\n    line-height: var(--vspace-0_75);\n    color: var(--color-text-light);\n    margin-top: calc(0.125 * var(--space));\n}\n\n/* comments\n * -------------------------------------------------- */\n#comments {\n    padding-top: var(--vspace-0_5);\n    padding-bottom: var(--vspace-0_5);\n}\n\n#comments ol, #comments ul {\n    list-style: none;\n}\n\n.commentlist {\n    margin: var(--vspace-2) 0 var(--vspace-1_5);\n    padding: 0;\n}\n\n.commentlist>.comment {\n    position: relative;\n    list-style: none;\n    margin: 0;\n    padding: 2rem 0 0 0;\n    padding-left: 14%;\n}\n\n.comment__avatar {\n    position: absolute;\n    left: 0;\n    display: block;\n}\n\n.comment__avatar img {\n    height: var(--vspace-2);\n    width: var(--vspace-2);\n    border-radius: 100%;\n    vertical-align: bottom;\n}\n\n.comment__info {\n    position: relative;\n}\n\n.comment__info .comment__author {\n    font-weight: 600;\n    font-size: var(--text-size);\n    line-height: var(--vspace-1);\n    font-style: normal;\n    color: black;\n}\n\n.comment__meta {\n    display: block;\n    font-style: normal;\n    line-height: var(--vspace-0_75);\n    color: var(--color-text-light);\n    text-align: right;\n    width: 150px;\n    position: absolute;\n    top: 0;\n    right: 0;\n}\n\n.comment__meta .comment__time {\n    font-size: calc(var(--text-size) * 0.7778);\n    text-transform: uppercase;\n    letter-spacing: .1rem;\n    color: var(--color-text-light);\n}\n\n.comment__meta .comment__reply a {\n    font-size: var(--text-xs);\n    font-family: var(--font-1);\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: .2rem;\n    color: black;\n}\n\n.comment__text {\n    clear: both;\n    margin: var(--vspace-0_5) 0 0 0;\n    padding: 0 175px 0 0;\n}\n\n.comment ul.children {\n    margin: 0;\n    padding: 0;\n}\n\n.comment ul.children li {\n    padding-left: 5%;\n    margin-top: calc(var(--vspace-1) + 2rem);\n    border-left: 1px solid var(--color-border);\n}\n\n/* comments form\n * ---------------------------- */\n.comments-wrap .comment-respond {\n    margin-top: var(--vspace-2);\n}\n\n.comment-respond form {\n    padding-top: var(--vspace-1_75);\n}\n\n/* -------------------------------------------------------------------\n * responsive:\n * comments\n * ------------------------------------------------------------------- */\n@media screen and (max-width: 1200px) {\n    .comments-wrap .column {\n        padding: 0 calc(4.8rem + var(--gutter-md));\n    }\n}\n\n@media screen and (max-width: 1100px) {\n    .comments-wrap .column {\n        padding: 0 calc(4rem + var(--gutter-md));\n    }\n}\n\n@media screen and (max-width: 1020px) {\n    .comments-wrap .column {\n        padding: 0 calc(3.2rem + var(--gutter-md));\n    }\n}\n\n@media screen and (max-width: 1000px) {\n    .comment__avatar img {\n        height: var(--vspace-1_75);\n        width: var(--vspace-1_75);\n    }\n    .comment__meta {\n        text-align: left;\n        width: auto;\n        position: static;\n    }\n    .comment__meta .comment__time, .comment__meta .comment__reply {\n        display: inline-block;\n    }\n    .comment__meta .comment__time {\n        margin-right: 12px;\n    }\n    .comment__text {\n        padding: 0;\n    }\n    .comments-wrap .comment-respond {\n        margin-top: var(--vspace-1_5);\n    }\n}\n\n@media screen and (max-width: 800px) {\n    .comments-wrap {\n        padding: var(--vspace-2) 0 var(--vspace-1);\n    }\n    .comments-wrap .column {\n        padding: 0 var(--gutter-md);\n    }\n    .comment__avatar img {\n        margin-top: 0;\n        height: var(--vspace-1_5);\n        width: var(--vspace-1_5);\n    }\n}\n\n@media screen and (max-width: 600px) {\n    .comments-wrap h3 {\n        text-align: center;\n    }\n    .comments-wrap .column {\n        padding: 0 var(--gutter-mob);\n    }\n    .commentlist>.comment {\n        padding-top: 0;\n        padding-left: 0;\n    }\n    .comment__avatar {\n        display: none;\n    }\n    .comment ul.children li {\n        margin-top: calc(var(--vspace-1) + 0rem);\n    }\n}\n\n@media screen and (max-width: 500px) {\n    .comment ul.children li {\n        border-left: none;\n    }\n}\n\n@media screen and (max-width: 400px) {\n    .comments-wrap .column {\n        padding: 0;\n    }\n    .comment-respond form {\n        padding-top: var(--vspace-1);\n    }\n}\n\n.receive-send {\n    display: flex;\n    justify-content: space-between;\n}\n\n.receive-send a {\n    display: block;\n    color: var(--color-gray-9);\n}\n\n@media screen and (max-width: 800px) {\n    .letter-menu {\n        margin-top: 60px;\n        display: none;\n    }\n}\n\n@media screen and (min-width: 801px) {\n    .tool-letter-menu {\n        display: none;\n    }\n}\n\n.letter__toggle-menu span {\n    display: block;\n    width: 28px;\n    height: 3px;\n    margin-top: -1.5px;\n    position: absolute;\n    right: auto;\n    bottom: auto;\n    left: 50px;\n    background-color: black;\n    text-shadow: none;\n    color: transparent;\n}\n\n.letter__toggle-menu span::before,\n.letter__toggle-menu span::after {\n    content: '';\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    background-color: inherit;\n    left: 0;\n}\n\n.letter__toggle-menu span::before {\n    top: -10px;\n}\n\n.letter__toggle-menu span::after {\n    bottom: -10px;\n}\n\n.letter__overlay-close {\n    display: none;\n    text-shadow: none;\n    color: transparent;\n    width: 46px;\n    height: 46px;\n    margin-left: -23px;\n    position: absolute;\n    top: 160px;\n    left: 50%;\n}\n\n.letter__overlay-close::before,\n.letter__overlay-close::after {\n    content: '';\n    display: inline-block;\n    width: 2px;\n    height: 20px;\n    top: 12px;\n    left: 22px;\n    background-color: black;\n    position: absolute;\n}\n\n.letter__overlay-close::before {\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n}\n\n.letter__overlay-close::after {\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n}\n\n\n/* */\ndetails {\n    border: 1px solid #aaa;\n    border-radius: 4px;\n    padding: .5em .5em 0;\n}\n\nsummary {\n    font-weight: bold;\n    margin: -.5em -.5em 0;\n    padding: .5em;\n}\n\ndetails[open] {\n    padding: .5em;\n}\n\ndetails[open] summary {\n    border-bottom: 1px solid #aaa;\n    margin-bottom: .5em;\n}\n\n.not-watched {\n    background: var(--color-1-lighter);\n    height: 6px;\n}\n\n.hide {\n    display: none;\n}\n\n.titles-category {\n    margin-bottom: 0;\n}\n\n.horizontal {\n    background: var(--color-1);\n    height: 2px;\n    margin-top: 3px;\n    margin-bottom: 3px;\n}\n\n\n/* toogle */\n\n.toggle-button-cover\n{\n    display: table-cell;\n    position: relative;\n    width: 200px;\n    height: 140px;\n    box-sizing: border-box;\n}\n\n.button-cover\n{\n    height: 100px;\n    margin: 20px;\n    background-color: #fff;\n    box-shadow: 0 10px 20px -8px #c5d6d6;\n    border-radius: 4px;\n}\n\n.button-cover:before\n{\n    counter-increment: button-counter;\n    content: counter(button-counter);\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    color: #d7e3e3;\n    font-size: 12px;\n    line-height: 1;\n    padding: 5px;\n}\n\n.button-cover, .knobs, .layer\n{\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n}\n\n.button\n{\n    position: relative;\n    top: 50%;\n    width: 86px;\n    height: 36px;\n    margin: -20px auto 0 auto;\n    overflow: hidden;\n}\n\n.button.r, .button.r .layer\n{\n    border-radius: 100px;\n}\n\n.checkbox\n{\n    position: relative;\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    margin: 0;\n    opacity: 0;\n    cursor: pointer;\n    z-index: 3;\n}\n\n.knobs\n{\n    z-index: 2;\n}\n\n.layer\n{\n    width: 100%;\n    background-color: #ebf7fc;\n    transition: 0.3s ease all;\n    z-index: 1;\n}\n\n/* Button 1 */\n#button-1 .knobs:before\n{\n    content: 'От';\n    position: absolute;\n    top: 4px;\n    left: 4px;\n    width: 40px;\n    height: 26px;\n    color: #fff;\n    font-size: 10px;\n    font-weight: bold;\n    text-align: center;\n    line-height: 1;\n    padding: 9px 4px;\n    background-color: hsla(356, 74%, 72%, 1);\n    border-radius: 50%;\n    transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;\n}\n\n#button-1 .checkbox:checked + .knobs:before\n{\n    content: 'Мне';\n    left: 42px;\n    background-color: hsla(76, 69%, 68%, 1);\n}\n\n#button-1 .checkbox:checked ~ .layer\n{\n    background-color: #fcebeb;\n}\n\n#button-1 .knobs, #button-1 .knobs:before, #button-1 .layer\n{\n    transition: 0.3s ease all;\n}\n\n.block {\n    display: block;\n}\n\n.empty-space {\n    height: 95.994px;\n}\n\nform {\n    display: inline;\n}\n\n.main-page {\n    padding-top: var(--vspace-3);\n    padding-bottom: var(--vspace-0_125);\n}\n\n.form-add-folder-up {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.blur {\n    filter: blur(10px);\n}\n\n.folder-names {\n    display: inline-block;\n    background: none;\n    width: 65%;\n    border: var(--color-body) solid;\n    border-radius: 5px;\n\n    margin-top: 3px;\n    margin-bottom: 3px;\n}\n\n.folder-names:hover {\n    color: var(--color-2);\n    cursor: pointer;\n    background: var(--color-info);\n    border: var(--color-info) solid;\n    border-radius: 5px;\n}\n\n.folder-names-focus {\n    border-radius: 5px;\n}\n\n.max-ch {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.main-columns {\n    height: 100%;\n    overflow-y: scroll;\n    overflow-x: hidden;\n}\n\n.main-container {\n    overflow: hidden;\n    height: calc(100vh - 105px);\n    position: relative;\n    width: 100%;\n}\n\n.letter-board {\n    position: fixed;\n    background: var(--color-body);\n    width: 47.5%;\n    height: 25px;\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-end;\n}\n\n@media screen and (max-width: 800px) {\n    .letter-board {\n        position: fixed;\n        background: var(--color-body);\n        width: 90%;\n        height: 25px;\n        display: flex;\n        flex-direction: row;\n        justify-content: space-between;\n    }\n\n    .letter-board-small {\n        display: flex;\n        flex-direction: row;\n    }\n}\n\n.letter-board-last-element {\n    margin-right: 20px;\n}\n\n.icon-group {\n    display: flex;\n    flex-direction: row;\n    margin-right: 5px;\n}\n\n.input-group {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: flex-start;\n}\n\n.letter-container {\n    margin-top: 30px;\n}\n\n.icon-trash {\n    display: block;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["a"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(0);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/components/scroll.css
var components_scroll = __webpack_require__(4);

// CONCATENATED MODULE: ./src/Views/public/css/components/scroll.css

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(components_scroll["a" /* default */], options);



/* harmony default export */ var css_components_scroll = (components_scroll["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/components/button.css
var components_button = __webpack_require__(5);

// CONCATENATED MODULE: ./src/Views/public/css/components/button.css

            

var button_options = {};

button_options.insert = "head";
button_options.singleton = false;

var button_update = injectStylesIntoStyleTag_default()(components_button["a" /* default */], button_options);



/* harmony default export */ var css_components_button = (components_button["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/components/triangle.css
var triangle = __webpack_require__(6);

// CONCATENATED MODULE: ./src/Views/public/css/components/triangle.css

            

var triangle_options = {};

triangle_options.insert = "head";
triangle_options.singleton = false;

var triangle_update = injectStylesIntoStyleTag_default()(triangle["a" /* default */], triangle_options);



/* harmony default export */ var components_triangle = (triangle["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/components/header.css
var header = __webpack_require__(7);

// CONCATENATED MODULE: ./src/Views/public/css/components/header.css

            

var header_options = {};

header_options.insert = "head";
header_options.singleton = false;

var header_update = injectStylesIntoStyleTag_default()(header["a" /* default */], header_options);



/* harmony default export */ var components_header = (header["a" /* default */].locals || {});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/Views/public/css/all_styles_v2.css
var all_styles_v2 = __webpack_require__(8);

// CONCATENATED MODULE: ./src/Views/public/css/all_styles_v2.css

            

var all_styles_v2_options = {};

all_styles_v2_options.insert = "head";
all_styles_v2_options.singleton = false;

var all_styles_v2_update = injectStylesIntoStyleTag_default()(all_styles_v2["a" /* default */], all_styles_v2_options);



/* harmony default export */ var css_all_styles_v2 = (all_styles_v2["a" /* default */].locals || {});
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
    backToLetters: 'mainPageView-backToLetters'
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
    backToLetters: 'mainPageController-backToLetters'
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
  deleteLetter: '/user/letter'
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

      console.log('EMIT', eventName, args);

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
      console.log('HISTORY EVENT', event);

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
      console.log('START PATH', path, 'PREV PAGE', document.referrer);
      window.history.pushState({
        path: path,
        data: data || 1
      }, 'Start', path);
      this.registeredPathes[path].render(data);
    }
  }, {
    key: "go",
    value: function go(event) {
      console.log('GOOO', event);

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
      console.log("I'L BE BACK");
      window.history.back();
      console.log('href', window.location.pathname);
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
        console.log('FORM SUBMIT');
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
      console.log('SIGN IN ERRORS SHOW', errors.errors);
      var passwordField = document.getElementsByName('password')[0];
      var emailField = document.getElementsByName('email')[0];
      console.log(errors.password);

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
      console.log('SIGN UP ERRORS SHOW', errors);
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
        console.log('MESSAGE ELEMT', el, msgElem);

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

    /* eslint no-underscore-dangle: 0 */
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
      console.log('VALIDATOR SIGN UP', formData.get('email'), formData.get('password1'), formData.get('password2'), formData.get('name'), formData.get('surname'));
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
      console.log('VALIDATOR SEND LETTER', formData.get('to'), formData.get('theme'), formData.get('text'));
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

      console.log('SIGN IN');
      var errors = Validator.checkSignInForm(data.data);

      if (Object.keys(errors).length !== 0) {
        console.log('ERRORS IN SIGN IN ', errors);
        src_EventBus.emit(Events.userModelEvents.signIn.fail, errors);
        return;
      }

      var shortLogin = data.data.get('email');
      shortLogin += '@mailer.ru.com';
      data.data.set('email', shortLogin);
      console.log('SIGN IN ', data, this.baseUrl + Paths.signInPage);
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
        console.log('ERRORS IN SIGN UP ', errors);
        src_EventBus.emit(Events.userModelEvents.signUp.fail, errors);
        return;
      }

      var shortEmail = data.data.get('email');
      shortEmail += '@mailer.ru.com';
      data.data.set('email', shortEmail);
      myFetch(Paths.signUpServ, 'POST', data.data).then(function (response) {
        return response.json();
      }).then(function (response) {
        console.log('RESP SIGN UP UP', response.Code, response);

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
        console.log('RESP SIGN UP UP', response.Code, response);

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
        console.log('RESP GET USER DATA', response.status, response);

        if (response.Code === 200) {
          _this4.user.name = response.User.Name;
          _this4.user.email = response.User.Email;
          _this4.user.surname = response.User.Surname;
          _this4.user.avatar = '';
        } else {
          throw new Error(response.Description);
        }
      }); // const p2 = myFetch(Paths.getAvatar, 'GET')
      //   .then((response) => response.blob())
      //   .then((myBlob) => {
      //     console.log('BLOB', myBlob);
      //     this.user.avatar = URL.createObjectURL(myBlob);
      //   });

      function p2() {
        console.log('Мок аватарки');
      }

      Promise.all([p1, p2]).then(function () {
        console.log('УСПЕХ');
        console.log('USER', _this4.user);
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
      console.log('LOGOUT');
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

      console.log('GET LETTER LIST FOLDER ', folder);
      var path = '';

      if (folder === 'Входящие') {
        path = Paths.getReceivedLetters;
      } else {
        path = Paths.getSendedLetters;
      }

      myFetch(path, 'GET').then(function (response) {
        return response.json();
      }).then(function (response) {
        console.log('RESP GET LETTER LIST', response);

        if (response.Code === 200) {
          console.log('SUCCES GET LETTER LETTER LIST');
          _this.Letters = new Map();

          if (response.Letters) {
            response.Letters.reverse();
            response.Letters.forEach(function (letter) {
              _this.Letters[letter.Id] = letter;
            });

            _this.Letters.forEach(function (letter) {
              console.log('LETTTER', letter);
            });
          }

          src_EventBus.emit(Events.letterModelEvents.getLetterList.success, _this.Letters);
        } else {
          src_EventBus.emit(Events.letterModelEvents.getLetterList.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
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
        console.log('7654321 + !!!!!!!!!!!!!!!!! + 999999999999');
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

          console.log('sent letters', _this5.selectFolder);
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
      console.log('addFolderRecived создать папку', name);
      myFetch(Paths.addFolderRecived, 'POST', name).then(function (response) {
        return response.json();
      }).then(function (response) {
        console.log('addFolderRecived создана папка', response.Code);

        if (response.Code === 200) {
          src_EventBus.emit(Events.letterModelEvents.addFolderRecived.success);
        } else {
          src_EventBus.emit(Events.letterModelEvents.addFolderRecived.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
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
        console.log('CAAAAAAAAAAAAAAAATCH', error);
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
        console.log('CAAAAAAAAAAAAAAAATCH', error);
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
        console.log('CAAAAAAAAAAAAAAAATCH', error);
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
        console.log('CAAAAAAAAAAAAAAAATCH', error);
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
        console.log('CAAAAAAAAAAAAAAAATCH', error);
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
        console.log('CAAAAAAAAAAAAAAAATCH', error);
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
        console.log('ERRORS IN SEND LETTER ', errors);
        src_EventBus.emit(Events.letterModelEvents.sendLetter.fail, errors);
        return;
      }

      myFetch(Paths.sendMessageToServ, 'POST', data).then(function (response) {
        return response.json();
      }).then(function (response) {
        console.log('RESP SEND LETTER', response);

        if (response.Code === 200) {
          console.log('SUCCES SEND LETTER');
          src_EventBus.emit(Events.letterModelEvents.sendLetter.success);
        } else {
          src_EventBus.emit(Events.letterModelEvents.sendLetter.fail, {
            error: response.Description
          });
        }
      })["catch"](function (error) {
        console.log('CAAAAAAAAAAAAAAAATCH', error);
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
      console.log('NAVBAR VIEW RENDER', data);
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
        console.log('SUBMIT PROFILE EDIT');
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
      "./src/Views/PugTemplates/mainPage.pug": "if(locals.screenWidth > 800)\n    div(class=\"main-page mainPage\")\n        div(class=\"row\" style=\"margin-left: 0; margin-right: 0; width: 100vw;\")\n\n            div(class=\"column large-2 tab-12 mob-12 main-container\")\n                div(class=\"main-columns project_scroll\")\n                    div(id=\"add-folder-recived\" class=\"block plus radius\")\n\n                    if(locals.recivedFolderRecived)\n                        div(id=\"summary-recived\" class=\"triangle-down\")\n                    else\n                        div(id=\"summary-recived\" class=\"triangle-right\")\n                    a(id=\"recivedUn\" class=\"titles-category\") \u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435\n\n                    if(locals.recivedFolderRecived)\n                        div(id=\"recived\")\n                            if(locals.recivedFolder)\n                                each folder in locals.recivedFolder\n                                    div(class=\"input-group\")\n                                        div\n                                            input(class=\"folder-names\" readonly value=folder.Name id=folder.Name)\n                                        div(class=\"icon-group\" id=\"icon-group\")\n                                            div(class=\"edit-button radius\" id=folder.Name name=\"edit-folder\")\n                                                svg(id=folder.Name name=\"edit-folder\" class=\"block\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\")\n                                                    g(id=folder.Name name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\")\n                                                        path(id=folder.Name name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\")\n                                                        g(id=folder.Name name=\"edit-folder\" fill=\"#ffffff\")\n                                                            path(id=folder.Name name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\")\n\n                                            div(class=\"small-plus radius cross\" id=folder.Name name=\"delete-folder\")\n\n                    div(class=\"horizontal\")\n\n                    a(id=\"sendedUn\" class=\"block titles-category\") \u0418\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435\n\n            div(class=\"column large-4 tab-12 mob-12 main-container\")\n                div(class=\"bricks-wrapper h-group main-columns project_scroll\" name=\"letters\")\n                    if(locals.selectFolder)\n                      each letter in locals.selectFolder\n                        article(id=letter.Id class=\"brick entry format-standard\")\n                            div(id=letter.Id class=\"entry__text\")\n                                div(id=letter.Id class=\"entry__header\")\n                                    h1(id=letter.Id class=\"entry__title max-ch\") #{letter.Theme}\n\n                                if(!letter.IsWatched)\n                                    div(id=letter.Id class=\"h-full-width not-watched\")\n                                div(id=letter.Id class=\"entry__excerpt\")\n                                    p(id=letter.Id class=\"max-ch\") \u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C: #{letter.Receiver}\n                                div(id=letter.Id class=\"entry__excerpt\")\n                                    p(id=letter.Id class=\"max-ch\") \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044C: #{letter.Sender}\n                                div(id=letter.Id class=\"entry__excerpt\")\n                                    p(id=letter.Id class=\"max-ch\") #{letter.Text}\n\n\n            div(class=\"column large-6 tab-12 mob-12 main-container\")\n                div(class=\"main-columns project_scroll\")\n                    if(locals.buttonPlus && letter.Id !== undefined)\n                        div(class=\"letter-board\")\n                            div(id=\"button-remove-letter\" class=\"delete-letter-button radius\")\n                                img(class=\"icon-trash\" height=\"12px\" width=\"12px\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAmklEQVRIie2VMQoCMRBF/1c8hFcUwc5C8ABewMstbGVhZy0Iz2YDIbvuxjWyTX41mWT+G4aBSBMC9kBLXzfgCHjKY8x8N2Cc6vALoOlMTsAmyq+Bc3fXjHk4KmJ2J0PGtiVpVdJ0EfU2oMCotrbv4fD3ES0LCJuQG38NKKEKqIAKqICZgGcI4r8hJ07rPwEu6aNMvSRdbT/i5BtRtIPz+Hl+WgAAAABJRU5ErkJggg==\")\n                            div(id=\"button-form-add-letter-folder\" class=\"small-plus radius\")\n                            div(id=\"delete-folder\" class=\"small-plus radius cross letter-board-last-element\")\n\n                    div(class=\"letter-container\")\n                        h3(id=letter.Id name=\"title-of-current\") #{letter.Theme}\n                        p(class=\"lead\") #{letter.Receiver}\n                        p(class=\"lead\") #{letter.Sender}\n                        p(class=\"lead\") #{letter.Text}\n\n\n    //\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F\n    div(class=\"form-add-folder-up hide\")\n        div(id=\"remove-folder-recived\" class=\"plus radius cross cross-modal\")\n        form(name=\"button-of-recived-folder\")\n            div(class=\"row\")\n                input(name=\"folderName\" type=\"text\" class=\"h-full-width\" placeholder=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0430\u043F\u043A\u0443\" value=\"\" autocomplete=\"off\" required)\n                button(type=\"submit\" class=\"btn btn--medium btn--primary h-full-width\") \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C\n\n    //\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0432 \u043F\u0430\u043F\u043A\u0443\n    div(class=\"hide form-add-folder-up\")\n        div(id=\"remove-form-add-folder-up\" class=\"plus radius cross cross-modal\")\n        form(id=\"choose-folder\")\n            div(class=\"row\")\n                select(name=\"inFolderName\" class=\"h-full-width\")\n                    if(locals.recivedFolder)\n                        each folder in locals.recivedFolder\n                            option(value=folder.Name) #{folder.Name}\n\n\n            div(class=\"row\")\n                button(type=\"submit\" class=\"btn h-full-width\") \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C\n\n\nelse\n    div(class=\"main-page mainPage\")\n        div(class=\"row\" style=\"margin-left: 0; margin-right: 0; width: 100vw;\")\n\n            if(locals.folderColumn)\n                div(class=\"column large-2 tab-12 mob-12 main-container\")\n                    div(class=\"main-columns project_scroll\")\n                        div(id=\"add-folder-recived\" class=\"block plus radius\")\n\n                        if(locals.recivedFolderRecived)\n                            div(id=\"summary-recived\" class=\"triangle-down\")\n                        else\n                            div(id=\"summary-recived\" class=\"triangle-right\")\n                        a(id=\"recivedUn\" class=\"titles-category\") \u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435\n\n                        if(locals.recivedFolderRecived)\n                            div(id=\"recived\")\n                                if(locals.recivedFolder)\n                                  each folder in locals.recivedFolder\n                                      div(class=\"input-group\")\n                                          div\n                                              input(class=\"folder-names\" readonly value=folder.Name id=folder.Name)\n                                          div(class=\"icon-group\" id=\"icon-group\")\n                                              div(class=\"edit-button radius\" id=folder.Name name=\"edit-folder\")\n                                                  svg(id=folder.Name name=\"edit-folder\" class=\"block\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\")\n                                                      g(id=folder.Name name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\")\n                                                          path(id=folder.Name name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\")\n                                                          g(id=folder.Name name=\"edit-folder\" fill=\"#ffffff\")\n                                                              path(id=folder.Name name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\")\n\n                                              div(class=\"small-plus radius cross\" id=folder.Name name=\"delete-folder\")\n\n                        div(class=\"horizontal\")\n\n                        a(id=\"sendedUn\" class=\"block titles-category\") \u0418\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435\n\n            if(locals.letterColumn)\n                div(class=\"column large-4 tab-12 mob-12 main-container\")\n\n                    a(id=\"back-to-folders\") < \u041F\u0430\u043F\u043A\u0438\n\n                    div(class=\"bricks-wrapper h-group main-columns project_scroll\" name=\"letters\")\n                        if(locals.selectFolder)\n                          each letter in locals.selectFolder\n                              article(id=letter.Id class=\"brick entry format-standard\")\n                                  div(id=letter.Id class=\"entry__text\")\n                                      div(id=letter.Id class=\"entry__header\")\n                                          h1(id=letter.Id class=\"entry__title max-ch\") #{letter.Theme}\n\n                                      if(!letter.IsWatched)\n                                          div(id=letter.Id class=\"h-full-width not-watched\")\n                                      div(id=letter.Id class=\"entry__excerpt\")\n                                          p(id=letter.Id class=\"max-ch\") \u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C: #{letter.Receiver}\n                                      div(id=letter.Id class=\"entry__excerpt\")\n                                          p(id=letter.Id class=\"max-ch\") \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044C: #{letter.Sender}\n                                      div(id=letter.Id class=\"entry__excerpt\")\n                                          p(id=letter.Id class=\"max-ch\") #{letter.Text}\n\n            if(locals.oneLetterColumn)\n                div(class=\"column large-6 tab-12 mob-12 main-container\")\n                    div(class=\"main-columns project_scroll\")\n                        if(locals.buttonPlus && letter.Id !== undefined)\n                            div(class=\"letter-board\")\n                                a(id=\"back-to-letters\") < \u041A \u043F\u0430\u043F\u043A\u0430\u043C\n                                div(class=\"letter-board-small\")\n                                    div(id=\"button-remove-letter\" class=\"delete-letter-button radius\")\n                                        img(class=\"icon-trash\" height=\"12px\" width=\"12px\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAmklEQVRIie2VMQoCMRBF/1c8hFcUwc5C8ABewMstbGVhZy0Iz2YDIbvuxjWyTX41mWT+G4aBSBMC9kBLXzfgCHjKY8x8N2Cc6vALoOlMTsAmyq+Bc3fXjHk4KmJ2J0PGtiVpVdJ0EfU2oMCotrbv4fD3ES0LCJuQG38NKKEKqIAKqICZgGcI4r8hJ07rPwEu6aNMvSRdbT/i5BtRtIPz+Hl+WgAAAABJRU5ErkJggg==\")\n                                    div(id=\"button-form-add-letter-folder\" class=\"small-plus radius\")\n                                    div(id=\"delete-folder\" class=\"small-plus radius cross letter-board-last-element\")\n\n                        div(class=\"letter-container\")\n                            h3(id=letter.Id name=\"title-of-current\") #{letter.Theme}\n                            p(class=\"lead\") #{letter.Receiver}\n                            p(class=\"lead\") #{letter.Sender}\n                            p(class=\"lead\") #{letter.Text}\n\n\n    //\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F\n    div(class=\"form-add-folder-up hide\")\n        div(id=\"remove-folder-recived\" class=\"plus radius cross cross-modal\")\n        form(name=\"button-of-recived-folder\")\n            div(class=\"row\")\n                input(name=\"folderName\" type=\"text\" class=\"h-full-width\" placeholder=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0430\u043F\u043A\u0443\" value=\"\" autocomplete=\"off\" required)\n                button(type=\"submit\" class=\"btn btn--medium btn--primary h-full-width\") \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C\n\n    //\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0432 \u043F\u0430\u043F\u043A\u0443\n    div(class=\"hide form-add-folder-up\")\n        div(id=\"remove-form-add-folder-up\" class=\"plus radius cross cross-modal\")\n        form(id=\"choose-folder\")\n            div(class=\"row\")\n                select(name=\"inFolderName\" class=\"h-full-width\")\n                    if(locals.recivedFolder)\n                      each folder in locals.recivedFolder\n                          option(value=folder.Name) #{folder.Name}\n\n\n            div(class=\"row\")\n                button(type=\"submit\" class=\"btn h-full-width\") \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C\n"
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
          pug_debug_line = 39;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.selectFolder

          ;
          (function () {
            var $$obj = locals.selectFolder;

            if ('number' == typeof $$obj.length) {
              for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
                var letter = $$obj[pug_index1];
                ;
                pug_debug_line = 40;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<article" + (" class=\"brick entry format-standard\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 41;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__text\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 42;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__header\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 43;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<h1" + (" class=\"entry__title max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 43;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp) + "</h1></div>";
                ;
                pug_debug_line = 45;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

                if (!letter.IsWatched) {
                  ;
                  pug_debug_line = 46;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"h-full-width not-watched\"" + mainPage_pug_attr("id", letter.Id, true, false)) + "></div>";
                }

                ;
                pug_debug_line = 47;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 48;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 48;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "Получатель: ";
                ;
                pug_debug_line = 48;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp) + "</p></div>";
                ;
                pug_debug_line = 49;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 50;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 50;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "Отправитель: ";
                ;
                pug_debug_line = 50;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp) + "</p></div>";
                ;
                pug_debug_line = 51;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 52;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 52;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp) + "</p></div></div></article>";
              }
            } else {
              var $$l = 0;

              for (var pug_index1 in $$obj) {
                $$l++;
                var letter = $$obj[pug_index1];
                ;
                pug_debug_line = 40;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<article" + (" class=\"brick entry format-standard\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 41;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__text\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 42;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__header\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 43;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<h1" + (" class=\"entry__title max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 43;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp) + "</h1></div>";
                ;
                pug_debug_line = 45;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

                if (!letter.IsWatched) {
                  ;
                  pug_debug_line = 46;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"h-full-width not-watched\"" + mainPage_pug_attr("id", letter.Id, true, false)) + "></div>";
                }

                ;
                pug_debug_line = 47;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 48;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 48;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "Получатель: ";
                ;
                pug_debug_line = 48;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp) + "</p></div>";
                ;
                pug_debug_line = 49;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 50;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 50;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "Отправитель: ";
                ;
                pug_debug_line = 50;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp) + "</p></div>";
                ;
                pug_debug_line = 51;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 52;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                ;
                pug_debug_line = 52;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp) + "</p></div></div></article>";
              }
            }
          }).call(this);
        }

        pug_html = pug_html + "</div></div>";
        ;
        pug_debug_line = 55;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"column large-6 tab-12 mob-12 main-container\">";
        ;
        pug_debug_line = 56;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"main-columns project_scroll\">";
        ;
        pug_debug_line = 57;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.buttonPlus && letter.Id !== undefined) {
          ;
          pug_debug_line = 58;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"letter-board\">";
          ;
          pug_debug_line = 59;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"delete-letter-button radius\" id=\"button-remove-letter\">";
          ;
          pug_debug_line = 60;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<img class=\"icon-trash\" height=\"12px\" width=\"12px\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAmklEQVRIie2VMQoCMRBF/1c8hFcUwc5C8ABewMstbGVhZy0Iz2YDIbvuxjWyTX41mWT+G4aBSBMC9kBLXzfgCHjKY8x8N2Cc6vALoOlMTsAmyq+Bc3fXjHk4KmJ2J0PGtiVpVdJ0EfU2oMCotrbv4fD3ES0LCJuQG38NKKEKqIAKqICZgGcI4r8hJ07rPwEu6aNMvSRdbT/i5BtRtIPz+Hl+WgAAAABJRU5ErkJggg==\"/></div>";
          ;
          pug_debug_line = 61;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"small-plus radius\" id=\"button-form-add-letter-folder\"></div>";
          ;
          pug_debug_line = 62;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"small-plus radius cross letter-board-last-element\" id=\"delete-folder\"></div></div>";
        }

        ;
        pug_debug_line = 64;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"letter-container\">";
        ;
        pug_debug_line = 65;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<h3" + (mainPage_pug_attr("id", letter.Id, true, false) + " name=\"title-of-current\"") + ">";
        ;
        pug_debug_line = 65;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp) + "</h3>";
        ;
        pug_debug_line = 66;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<p class=\"lead\">";
        ;
        pug_debug_line = 66;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp) + "</p>";
        ;
        pug_debug_line = 67;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<p class=\"lead\">";
        ;
        pug_debug_line = 67;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp) + "</p>";
        ;
        pug_debug_line = 68;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<p class=\"lead\">";
        ;
        pug_debug_line = 68;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp) + "</p></div></div></div></div></div>";
        ;
        pug_debug_line = 71;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<!--\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F-->";
        ;
        pug_debug_line = 72;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"form-add-folder-up hide\">";
        ;
        pug_debug_line = 73;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"plus radius cross cross-modal\" id=\"remove-folder-recived\"></div>";
        ;
        pug_debug_line = 74;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<form name=\"button-of-recived-folder\">";
        ;
        pug_debug_line = 75;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\">";
        ;
        pug_debug_line = 76;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"folderName\" type=\"text\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\"" + mainPage_pug_attr("required", true, true, false)) + "/>";
        ;
        pug_debug_line = 77;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<button class=\"btn btn--medium btn--primary h-full-width\" type=\"submit\">";
        ;
        pug_debug_line = 77;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button></div></form></div>";
        ;
        pug_debug_line = 79;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<!--\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0432 \u043F\u0430\u043F\u043A\u0443-->";
        ;
        pug_debug_line = 80;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"hide form-add-folder-up\">";
        ;
        pug_debug_line = 81;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"plus radius cross cross-modal\" id=\"remove-form-add-folder-up\"></div>";
        ;
        pug_debug_line = 82;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<form id=\"choose-folder\">";
        ;
        pug_debug_line = 83;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\">";
        ;
        pug_debug_line = 84;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<select class=\"h-full-width\" name=\"inFolderName\">";
        ;
        pug_debug_line = 85;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.recivedFolder) {
          ;
          pug_debug_line = 86;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.recivedFolder

          ;
          (function () {
            var $$obj = locals.recivedFolder;

            if ('number' == typeof $$obj.length) {
              for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
                var folder = $$obj[pug_index2];
                ;
                pug_debug_line = 87;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<option" + mainPage_pug_attr("value", folder.Name, true, false) + ">";
                ;
                pug_debug_line = 87;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = folder.Name) ? "" : pug_interp) + "</option>";
              }
            } else {
              var $$l = 0;

              for (var pug_index2 in $$obj) {
                $$l++;
                var folder = $$obj[pug_index2];
                ;
                pug_debug_line = 87;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<option" + mainPage_pug_attr("value", folder.Name, true, false) + ">";
                ;
                pug_debug_line = 87;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = folder.Name) ? "" : pug_interp) + "</option>";
              }
            }
          }).call(this);
        }

        pug_html = pug_html + "</select></div>";
        ;
        pug_debug_line = 90;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\">";
        ;
        pug_debug_line = 91;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<button class=\"btn h-full-width\" type=\"submit\">";
        ;
        pug_debug_line = 91;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button></div></form></div>";
      } else {
        ;
        pug_debug_line = 95;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"main-page mainPage\">";
        ;
        pug_debug_line = 96;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\" style=\"margin-left: 0; margin-right: 0; width: 100vw;\">";
        ;
        pug_debug_line = 98;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.folderColumn) {
          ;
          pug_debug_line = 99;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"column large-2 tab-12 mob-12 main-container\">";
          ;
          pug_debug_line = 100;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"main-columns project_scroll\">";
          ;
          pug_debug_line = 101;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"block plus radius\" id=\"add-folder-recived\"></div>";
          ;
          pug_debug_line = 103;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

          if (locals.recivedFolderRecived) {
            ;
            pug_debug_line = 104;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"triangle-down\" id=\"summary-recived\"></div>";
          } else {
            ;
            pug_debug_line = 106;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"triangle-right\" id=\"summary-recived\"></div>";
          }

          ;
          pug_debug_line = 107;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<a class=\"titles-category\" id=\"recivedUn\">";
          ;
          pug_debug_line = 107;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0435</a>";
          ;
          pug_debug_line = 109;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

          if (locals.recivedFolderRecived) {
            ;
            pug_debug_line = 110;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div id=\"recived\">";
            ;
            pug_debug_line = 111;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

            if (locals.recivedFolder) {
              ;
              pug_debug_line = 112;
              pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.recivedFolder

              ;
              (function () {
                var $$obj = locals.recivedFolder;

                if ('number' == typeof $$obj.length) {
                  for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
                    var folder = $$obj[pug_index3];
                    ;
                    pug_debug_line = 113;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div class=\"input-group\">";
                    ;
                    pug_debug_line = 114;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div>";
                    ;
                    pug_debug_line = 115;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<input" + (" class=\"folder-names\"" + mainPage_pug_attr("readonly", true, true, false) + mainPage_pug_attr("value", folder.Name, true, false) + mainPage_pug_attr("id", folder.Name, true, false)) + "/></div>";
                    ;
                    pug_debug_line = 116;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div class=\"icon-group\" id=\"icon-group\">";
                    ;
                    pug_debug_line = 117;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div" + (" class=\"edit-button radius\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\"") + ">";
                    ;
                    pug_debug_line = 118;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<svg" + (" class=\"block\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\"") + ">";
                    ;
                    pug_debug_line = 119;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<g" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"") + ">";
                    ;
                    pug_debug_line = 120;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<path" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\"") + "></path>";
                    ;
                    pug_debug_line = 121;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<g" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" fill=\"#ffffff\"") + ">";
                    ;
                    pug_debug_line = 122;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<path" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\"") + "></path></g></g></svg></div>";
                    ;
                    pug_debug_line = 124;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div" + (" class=\"small-plus radius cross\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"delete-folder\"") + "></div></div></div>";
                  }
                } else {
                  var $$l = 0;

                  for (var pug_index3 in $$obj) {
                    $$l++;
                    var folder = $$obj[pug_index3];
                    ;
                    pug_debug_line = 113;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div class=\"input-group\">";
                    ;
                    pug_debug_line = 114;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div>";
                    ;
                    pug_debug_line = 115;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<input" + (" class=\"folder-names\"" + mainPage_pug_attr("readonly", true, true, false) + mainPage_pug_attr("value", folder.Name, true, false) + mainPage_pug_attr("id", folder.Name, true, false)) + "/></div>";
                    ;
                    pug_debug_line = 116;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div class=\"icon-group\" id=\"icon-group\">";
                    ;
                    pug_debug_line = 117;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div" + (" class=\"edit-button radius\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\"") + ">";
                    ;
                    pug_debug_line = 118;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<svg" + (" class=\"block\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"12\" height=\"12\" viewBox=\"0 0 171 171\" style=\" fill:#000000;\"") + ">";
                    ;
                    pug_debug_line = 119;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<g" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"") + ">";
                    ;
                    pug_debug_line = 120;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<path" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" d=\"M0,171.99852v-171.99852h171.99852v171.99852z\" fill=\"none\"") + "></path>";
                    ;
                    pug_debug_line = 121;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<g" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" fill=\"#ffffff\"") + ">";
                    ;
                    pug_debug_line = 122;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<path" + (mainPage_pug_attr("id", folder.Name, true, false) + " name=\"edit-folder\" d=\"M137.71556,66.0345l8.6925,-8.6925c9.02738,-9.02737 9.02738,-23.71913 0,-32.75006c-4.37119,-4.36762 -10.18162,-6.76875 -16.37681,-6.76875c-6.19519,0 -12.00919,2.40469 -16.37681,6.77231l-8.68894,8.68894zM97.40944,40.8405l-64.37081,64.37081c-1.37156,1.37156 -2.41538,3.06375 -3.021,4.89844l-11.93437,36.05606c-0.63769,1.91662 -0.13538,4.02919 1.29319,5.45775c1.02244,1.01887 2.38331,1.56394 3.77981,1.56394c0.56288,0 1.12931,-0.08906 1.6815,-0.27075l36.04538,-11.93794c1.84181,-0.60563 3.53756,-1.64944 4.90912,-3.02456l64.36725,-64.36725z\"") + "></path></g></g></svg></div>";
                    ;
                    pug_debug_line = 124;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div" + (" class=\"small-plus radius cross\"" + mainPage_pug_attr("id", folder.Name, true, false) + " name=\"delete-folder\"") + "></div></div></div>";
                  }
                }
              }).call(this);
            }

            pug_html = pug_html + "</div>";
          }

          ;
          pug_debug_line = 126;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"horizontal\"></div>";
          ;
          pug_debug_line = 128;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<a class=\"block titles-category\" id=\"sendedUn\">";
          ;
          pug_debug_line = 128;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "\u0418\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0435</a></div></div>";
        }

        ;
        pug_debug_line = 130;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.letterColumn) {
          ;
          pug_debug_line = 131;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"column large-4 tab-12 mob-12 main-container\">";
          ;
          pug_debug_line = 133;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<a id=\"back-to-folders\">";
          ;
          pug_debug_line = 133;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "< \u041F\u0430\u043F\u043A\u0438</a>";
          ;
          pug_debug_line = 135;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"bricks-wrapper h-group main-columns project_scroll\" name=\"letters\">";
          ;
          pug_debug_line = 136;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

          if (locals.selectFolder) {
            ;
            pug_debug_line = 137;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.selectFolder

            ;
            (function () {
              var $$obj = locals.selectFolder;

              if ('number' == typeof $$obj.length) {
                for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
                  var letter = $$obj[pug_index4];
                  ;
                  pug_debug_line = 138;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<article" + (" class=\"brick entry format-standard\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 139;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__text\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 140;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__header\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 141;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<h1" + (" class=\"entry__title max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 141;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp) + "</h1></div>";
                  ;
                  pug_debug_line = 143;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

                  if (!letter.IsWatched) {
                    ;
                    pug_debug_line = 144;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div" + (" class=\"h-full-width not-watched\"" + mainPage_pug_attr("id", letter.Id, true, false)) + "></div>";
                  }

                  ;
                  pug_debug_line = 145;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 146;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 146;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "Получатель: ";
                  ;
                  pug_debug_line = 146;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp) + "</p></div>";
                  ;
                  pug_debug_line = 147;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 148;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 148;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "Отправитель: ";
                  ;
                  pug_debug_line = 148;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp) + "</p></div>";
                  ;
                  pug_debug_line = 149;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 150;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 150;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp) + "</p></div></div></article>";
                }
              } else {
                var $$l = 0;

                for (var pug_index4 in $$obj) {
                  $$l++;
                  var letter = $$obj[pug_index4];
                  ;
                  pug_debug_line = 138;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<article" + (" class=\"brick entry format-standard\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 139;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__text\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 140;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__header\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 141;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<h1" + (" class=\"entry__title max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 141;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp) + "</h1></div>";
                  ;
                  pug_debug_line = 143;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

                  if (!letter.IsWatched) {
                    ;
                    pug_debug_line = 144;
                    pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                    pug_html = pug_html + "<div" + (" class=\"h-full-width not-watched\"" + mainPage_pug_attr("id", letter.Id, true, false)) + "></div>";
                  }

                  ;
                  pug_debug_line = 145;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 146;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 146;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "Получатель: ";
                  ;
                  pug_debug_line = 146;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp) + "</p></div>";
                  ;
                  pug_debug_line = 147;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 148;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 148;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "Отправитель: ";
                  ;
                  pug_debug_line = 148;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp) + "</p></div>";
                  ;
                  pug_debug_line = 149;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<div" + (" class=\"entry__excerpt\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 150;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + "<p" + (" class=\"max-ch\"" + mainPage_pug_attr("id", letter.Id, true, false)) + ">";
                  ;
                  pug_debug_line = 150;
                  pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                  pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp) + "</p></div></div></article>";
                }
              }
            }).call(this);
          }

          pug_html = pug_html + "</div></div>";
        }

        ;
        pug_debug_line = 152;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.oneLetterColumn) {
          ;
          pug_debug_line = 153;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"column large-6 tab-12 mob-12 main-container\">";
          ;
          pug_debug_line = 154;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"main-columns project_scroll\">";
          ;
          pug_debug_line = 155;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

          if (locals.buttonPlus && letter.Id !== undefined) {
            ;
            pug_debug_line = 156;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"letter-board\">";
            ;
            pug_debug_line = 157;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<a id=\"back-to-letters\">";
            ;
            pug_debug_line = 157;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "< \u041A \u043F\u0430\u043F\u043A\u0430\u043C</a>";
            ;
            pug_debug_line = 158;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"letter-board-small\">";
            ;
            pug_debug_line = 159;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"delete-letter-button radius\" id=\"button-remove-letter\">";
            ;
            pug_debug_line = 160;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<img class=\"icon-trash\" height=\"12px\" width=\"12px\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAmklEQVRIie2VMQoCMRBF/1c8hFcUwc5C8ABewMstbGVhZy0Iz2YDIbvuxjWyTX41mWT+G4aBSBMC9kBLXzfgCHjKY8x8N2Cc6vALoOlMTsAmyq+Bc3fXjHk4KmJ2J0PGtiVpVdJ0EfU2oMCotrbv4fD3ES0LCJuQG38NKKEKqIAKqICZgGcI4r8hJ07rPwEu6aNMvSRdbT/i5BtRtIPz+Hl+WgAAAABJRU5ErkJggg==\"/></div>";
            ;
            pug_debug_line = 161;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"small-plus radius\" id=\"button-form-add-letter-folder\"></div>";
            ;
            pug_debug_line = 162;
            pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
            pug_html = pug_html + "<div class=\"small-plus radius cross letter-board-last-element\" id=\"delete-folder\"></div></div></div>";
          }

          ;
          pug_debug_line = 164;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<div class=\"letter-container\">";
          ;
          pug_debug_line = 165;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<h3" + (mainPage_pug_attr("id", letter.Id, true, false) + " name=\"title-of-current\"") + ">";
          ;
          pug_debug_line = 165;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Theme) ? "" : pug_interp) + "</h3>";
          ;
          pug_debug_line = 166;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<p class=\"lead\">";
          ;
          pug_debug_line = 166;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Receiver) ? "" : pug_interp) + "</p>";
          ;
          pug_debug_line = 167;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<p class=\"lead\">";
          ;
          pug_debug_line = 167;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Sender) ? "" : pug_interp) + "</p>";
          ;
          pug_debug_line = 168;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + "<p class=\"lead\">";
          ;
          pug_debug_line = 168;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
          pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = letter.Text) ? "" : pug_interp) + "</p></div></div></div>";
        }

        pug_html = pug_html + "</div></div>";
        ;
        pug_debug_line = 171;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<!--\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F-->";
        ;
        pug_debug_line = 172;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"form-add-folder-up hide\">";
        ;
        pug_debug_line = 173;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"plus radius cross cross-modal\" id=\"remove-folder-recived\"></div>";
        ;
        pug_debug_line = 174;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<form name=\"button-of-recived-folder\">";
        ;
        pug_debug_line = 175;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\">";
        ;
        pug_debug_line = 176;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"folderName\" type=\"text\" placeholder=\"Добавить папку\" value=\"\" autocomplete=\"off\"" + mainPage_pug_attr("required", true, true, false)) + "/>";
        ;
        pug_debug_line = 177;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<button class=\"btn btn--medium btn--primary h-full-width\" type=\"submit\">";
        ;
        pug_debug_line = 177;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button></div></form></div>";
        ;
        pug_debug_line = 179;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<!--\u0444\u043E\u0440\u043C\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0432 \u043F\u0430\u043F\u043A\u0443-->";
        ;
        pug_debug_line = 180;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"hide form-add-folder-up\">";
        ;
        pug_debug_line = 181;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"plus radius cross cross-modal\" id=\"remove-form-add-folder-up\"></div>";
        ;
        pug_debug_line = 182;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<form id=\"choose-folder\">";
        ;
        pug_debug_line = 183;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\">";
        ;
        pug_debug_line = 184;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<select class=\"h-full-width\" name=\"inFolderName\">";
        ;
        pug_debug_line = 185;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";

        if (locals.recivedFolder) {
          ;
          pug_debug_line = 186;
          pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug"; // iterate locals.recivedFolder

          ;
          (function () {
            var $$obj = locals.recivedFolder;

            if ('number' == typeof $$obj.length) {
              for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
                var folder = $$obj[pug_index5];
                ;
                pug_debug_line = 187;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<option" + mainPage_pug_attr("value", folder.Name, true, false) + ">";
                ;
                pug_debug_line = 187;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = folder.Name) ? "" : pug_interp) + "</option>";
              }
            } else {
              var $$l = 0;

              for (var pug_index5 in $$obj) {
                $$l++;
                var folder = $$obj[pug_index5];
                ;
                pug_debug_line = 187;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + "<option" + mainPage_pug_attr("value", folder.Name, true, false) + ">";
                ;
                pug_debug_line = 187;
                pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
                pug_html = pug_html + mainPage_pug_escape(null == (pug_interp = folder.Name) ? "" : pug_interp) + "</option>";
              }
            }
          }).call(this);
        }

        pug_html = pug_html + "</select></div>";
        ;
        pug_debug_line = 190;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<div class=\"row\">";
        ;
        pug_debug_line = 191;
        pug_debug_filename = "./src/Views/PugTemplates/mainPage.pug";
        pug_html = pug_html + "<button class=\"btn h-full-width\" type=\"submit\">";
        ;
        pug_debug_line = 191;
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
      var _document, _document2, _document3, _document4, _document5, _document6, _document7, _document8, _document9, _document10, _document11, _document12, _document13, _document14, _document15, _document16, _document19, _document20, _document22, _document23;

      console.log('RENDER MAIN PAGE DATA, dat', data);

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
        src_EventBus.emit(Events.mainPageView.needData, 'Входящие');
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
      "./src/Views/PugTemplates/SendLetterForm.pug": "section(class=\"s-content site-page\")\n    div(class=\"row\")\n        div(class=\"column large-12\")\n            div(class=\"s-content__primary\")\n                h1(class=\"s-content__title\") \u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C\n                form(class=\"s-content__form\")\n                    //fieldset\n                    div(class=\"form-field\")\n                        input(name=\"to\" type=\"text\" class=\"h-full-width\" placeholder=\"\u041A\u043E\u043C\u0443\" value=\"\" autocomplete=\"off\" required)\n                    div(class=\"form-field\")\n                        input(name=\"theme\" type=\"text\" class=\"h-full-width\" placeholder=\"\u0422\u0435\u043C\u0430\" value=\"\" autocomplete=\"off\" required)\n\n                    div(class=\"message form-field\")\n                        textarea(name=\"text\" type=\"text\" class=\"h-full-width\" placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u043F\u0438\u0441\u044C\u043C\u0430\" autocomplete=\"off\" required)\n\n                    div(class=\"row\")\n                        div(class=\"column large-6\")\n                            button(name=\"back\" class=\"submit btn btn--primary btn--medium h-full-width\") \u041D\u0430\u0437\u0430\u0434\n                        div(class=\"column large-6\")\n                            button(type=\"submit\" class=\"submit btn btn--primary btn--medium h-full-width\") \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C\n\n\n"
    };
    ;
    pug_debug_line = 1;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<section class=\"s-content site-page\">";
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
    pug_html = pug_html + "<div class=\"s-content__primary\">";
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
    pug_html = pug_html + "<!--fieldset-->";
    ;
    pug_debug_line = 8;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 9;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"to\" type=\"text\" placeholder=\"Кому\" value=\"\" autocomplete=\"off\"" + SendLetterForm_pug_attr("required", true, true, false)) + "/></div>";
    ;
    pug_debug_line = 10;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"form-field\">";
    ;
    pug_debug_line = 11;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<input" + (" class=\"h-full-width\"" + " name=\"theme\" type=\"text\" placeholder=\"Тема\" value=\"\" autocomplete=\"off\"" + SendLetterForm_pug_attr("required", true, true, false)) + "/></div>";
    ;
    pug_debug_line = 13;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"message form-field\">";
    ;
    pug_debug_line = 14;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<textarea" + (" class=\"h-full-width\"" + " name=\"text\" type=\"text\" placeholder=\"Текст письма\" autocomplete=\"off\"" + SendLetterForm_pug_attr("required", true, true, false)) + "></textarea></div>";
    ;
    pug_debug_line = 16;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"row\">";
    ;
    pug_debug_line = 17;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"column large-6\">";
    ;
    pug_debug_line = 18;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<button class=\"submit btn btn--primary btn--medium h-full-width\" name=\"back\">";
    ;
    pug_debug_line = 18;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "\u041D\u0430\u0437\u0430\u0434</button></div>";
    ;
    pug_debug_line = 19;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<div class=\"column large-6\">";
    ;
    pug_debug_line = 20;
    pug_debug_filename = "./src/Views/PugTemplates/SendLetterForm.pug";
    pug_html = pug_html + "<button class=\"submit btn btn--primary btn--medium h-full-width\" type=\"submit\">";
    ;
    pug_debug_line = 20;
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
      console.log('SEND LETTER VIEW RENDER');
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
      console.log('SEND LETTER ERRORS SHOW', errors);
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
    console.log('SIGNUP SUCCESS');
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
console.log(window.location.pathname);

function initModels() {
  Models_UserModel.getUserData();

  var h1 = function h1() {
    console.log('h1');
    src_EventBus.off(Events.userModelEvents.profileGetData.success, h1);
    LetterModel_LetterModel.getFolders();
  };

  src_EventBus.on(Events.userModelEvents.profileGetData.success, h1);

  var h2 = function h2() {
    console.log('h2');
    src_EventBus.off(Events.letterModelEvents.getFolderList.success, h2);
    letterModel.getLetterList('Входящие');
  };

  src_EventBus.on(Events.letterModelEvents.getFolderList.success, h2);

  var h3 = function h3() {
    console.log('h3');
    src_EventBus.off(Events.letterModelEvents.getLetterList.success, h3);

    try {
      router.start(window.location.pathname);
    } catch (err) {
      console.log('CATCH PATH, err', err);
      router.start(Paths.signInPage);
    }
  };

  src_EventBus.on(Events.letterModelEvents.getLetterList.success, h3);

  var h4 = function h4() {
    src_EventBus.off(Events.userModelEvents.profileGetData.fail, h4);
    console.log('h4');
    router.start(Paths.signInPage);
  };

  src_EventBus.on(Events.userModelEvents.profileGetData.fail, h4);
}

initModels();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
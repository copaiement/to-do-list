/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n___CSS_LOADER_EXPORT___.push([module.id, \"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap);\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/* Stylesheet for Attask App */\\n\\n:root {\\n  font-family: 'Staatliches', cursive;\\n  font-size: 24px;\\n  /* background colors */\\n  --header-bg: rgb(214, 68, 5);\\n  --toolbar-bg: rgb(131, 131, 245);\\n  --todo-container-bg: rgb(212, 194, 224);\\n\\n  /* icon colors */\\n  --header-icon: rgb(42, 43, 42);\\n  --header-icon-hover: rgb(133, 105, 105);\\n  --toolbar-icon: rgb(71, 56, 56);\\n  --toolbar-icon-hover: rgb(104, 40, 40);\\n  --todo-container-icon: black;\\n\\n  /* tasks colors */\\n  --task-completed: rgb(206, 218, 141);\\n  --task-low: rgb(121, 121, 160);\\n  --task-medium: rgb(226, 169, 84);\\n  --task-high: rgb(235, 112, 112);\\n  \\n  /* projects colors */\\n  --project-completed: rgb(177, 187, 121);\\n  --project-low: rgb(99, 99, 133);\\n  --project-medium: rgb(187, 139, 66);\\n  --project-high: rgb(190, 88, 88);\\n\\n  /* text colors */\\n  --header-text: rgb(245, 253, 255);\\n  --toolbar-text: rgb(71, 56, 56);\\n  --todo-container-text: rgb(182, 182, 182);\\n\\n  /* styling */\\n  --radius: .3rem;\\n}\\n\\nbody {\\n  /* basic styling */\\n  box-sizing: border-box;\\n  margin: 0;\\n  font-family: 'Inter', sans-serif;\\n}\\n\\n#content {\\n  height: 100vh;\\n  display: flex;\\n  flex: 1;\\n  flex-direction: column;\\n}\\n\\n.header {\\n  background-color: var(--header-bg);\\n  font-weight: 900;\\n  text-align: center;\\n  height: 3rem;\\n  padding: .5rem;\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n}\\n\\n.header-left-items .header-icon,\\n.header-right-items .header-icon {\\n  fill: var(--header-icon);\\n  height: 1.5rem;\\n  padding: .5rem;\\n}\\n\\n.header-left-items .header-icon:hover,\\n.header-right-items .header-icon:hover {\\n  fill: var(--header-icon-hover);\\n  cursor: pointer;\\n}\\n\\n.header-center-items {\\n  color: var(--header-text);\\n  fill: var(--header-text);\\n  display: flex;\\n  align-items: center;\\n}\\n\\n.header-center-items .header-icon {\\n  height: 2rem;\\n}\\n\\n.main-container {\\n  height: 100%;\\n  display: flex;\\n}\\n\\n.toolbar {\\n  background-color: var(--toolbar-bg);\\n  color: var(--toolbar-text);\\n  fill: var(--toolbar-icon);\\n  width: 15%;\\n  padding: 1rem;\\n  padding-top: 3rem;\\n  font-size: .75rem;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: left;\\n  gap: 1rem;\\n}\\n\\n.toolbar-icon {\\n  height: 1rem;\\n}\\n\\n.toolbar-item {\\n  display: flex;\\n  align-items: center;\\n  gap: .3rem;\\n}\\n\\n.toolbar-item:hover {\\n  color: var(--toolbar-icon-hover);\\n  fill: var(--toolbar-icon-hover);\\n  cursor: pointer;\\n}\\n\\n.todo-container {\\n  width: 100%;\\n  display: flex;\\n  flex-direction: column;\\n  padding: 1rem;\\n  gap: .5rem;\\n  \\n}\\n\\n.empty-msg {\\n  font-size: .75rem;\\n  color: gray;\\n  height: 100%;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n}\\n\\n.project-container { \\n  display: flex;\\n  flex-direction: column;\\n}\\n\\n.project-header,\\n.task-container {\\n  font-size: .75rem;\\n  padding: .5rem;\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n}\\n\\n.project-header {\\n  font-weight: 900;\\n  background-color: var(--project-medium);\\n  border-radius: var(--radius) var(--radius) 0 0;\\n  border-bottom: 2px solid black;\\n}\\n\\n\\n.task-container {\\n  background-color: var(--task-high);\\n  border-bottom: 2px solid gray;\\n}\\n\\n.icons-left,\\n.icons-right {\\n  align-items: center;\\n}\\n\\nimg {\\n  aspect-ratio: 1;\\n  height: 1rem;\\n}\\n\\n/* dynamic classes */\\n.only {\\n  border-radius: var(--radius);\\n  border-bottom: none;\\n}\\n\\n.last {\\n  border-radius: 0 0 var(--radius) var(--radius);\\n  border-bottom: none;\\n}\\n\\n.hidden {\\n  display: none;\\n}\\n\\n.task-low {\\n  background-color: var(--task-low);\\n}\\n\\n.task-medium {\\n  background-color: var(--task-medium);\\n}\\n\\n.task-high {\\n  background-color: var(--task-high);\\n}\\n\\n.task-completed {\\n  background-color: var(--task-completed);\\n}\\n\\n.project-low {\\n  background-color: var(--project-low);\\n}\\n\\n.project-medium {\\n  background-color: var(--project-medium);\\n}\\n\\n.project-high {\\n  background-color: var(--project-high);\\n}\\n\\n.project-completed {\\n  background-color: var(--project-completed);\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://to-do-list/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://to-do-list/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://to-do-list/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://to-do-list/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://to-do-list/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://to-do-list/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://to-do-list/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://to-do-list/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://to-do-list/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://to-do-list/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n// import stylesheet\n\n\n// initialize\naddEventListeners();\n\n// Add/remove Event Listeners\nfunction addEventListeners() {\n  const addTaskBtns = document.querySelectorAll('.create-task-btn');\n  const addProjBtns = document.querySelectorAll('.create-proj-btn');\n\n  addTaskBtns.forEach(btn => btn.addEventListener('click', showTaskModal));\n  addProjBtns.forEach(btn => btn.addEventListener('click', showProjModal));\n}\n\nfunction removeEventListeners() {\n  const addTaskBtns = document.querySelectorAll('.create-task-btn');\n  const addProjBtns = document.querySelectorAll('.create-proj-btn');\n\n  addTaskBtns.forEach(btn => btn.removeEventListener('click', showTaskModal));\n  addProjBtns.forEach(btn => btn.removeEventListener('click', showProjModal));\n}\n\n// DOM manipulation\nfunction hideTaskModal() {\n  const modal = document.querySelector('.task-modal');\n  modal.classList.add('hidden');\n}\n\nfunction hideProjModal() {\n  const modal = document.querySelector('.project-modal');\n  modal.classList.add('hidden');\n}\n\nfunction showTaskModal() {\n  document.querySelector('.empty-msg').classList.add('hidden');\n  const modal = document.querySelector('.task-modal');\n  modal.classList.remove('hidden');\n  removeEventListeners();\n}\n\nfunction showProjModal() {\n  document.querySelector('.empty-msg').classList.add('hidden');\n  const modal = document.querySelector('.project-modal');\n  modal.classList.remove('hidden');\n  removeEventListeners();\n}\n\nfunction buildProjectList() {\n  let projNamesArray = objectStorage.getProjectNames();\n  const selectProj = document.querySelector('#task-project-input');\n  // remove current project list\n  while (selectProj.firstChild) {\n    selectProj.removeChild(selectProj.firstChild);\n  }\n  // add new project list\n  projNamesArray.forEach(projectName => {\n    let option = document.createElement('option');\n    selectProj.appendChild(option);\n    option.value = `${projectName}`;\n    option.textContent = `${projectName}`;\n  });\n}\n\nfunction buildProject(projectObj) {\n  // create project div and insert\n  const project = document.createElement('div');\n  document.querySelector('.todo-container').appendChild(project);\n  project.classList.add('project-container');\n  project.id = `${projectObj.projectID}`;\n\n  // create project header div (same structure as task)\n  const projectHeader = buildItem(project, projectObj);\n  // create left icons\n  buildLeftIcons(projectHeader, projectObj);\n  // create project header info\n  buildInfo(projectHeader, projectObj);\n  // create right icons\n  buildRightIcons(projectHeader, projectObj);\n  // update CSS classes\n  updateClass(projectHeader, projectObj);\n\n}\n\nfunction buildTask(parentProjName, taskObj) {\n  // find project container\n  const parentProj = document.querySelector(`#${parentProjName}`);\n  // create task container\n  console.log(parentProj);\n  const taskContainer = buildItem(parentProj, taskObj);\n  // create left icons\n  buildLeftIcons(taskContainer, taskObj);\n  // create task info\n  buildInfo(taskContainer, taskObj);\n  // create right icons\n  buildRightIcons(taskContainer, taskObj);\n  // update CSS classes\n  updateClass(taskContainer, taskObj);\n}\n\nfunction buildItem(parent, object) {\n  const item = document.createElement('div');\n  parent.appendChild(item);\n\n  if (object.type === 'project') {\n    item.classList.add('project-header');\n  } else {\n    item.classList.add('task-container');\n  }\n  return item;\n}\n\nfunction updateClass(container, object) {\n  if (object.type === 'project') {\n    // set class to \"last\" for newly added project\n  } else {\n    // get length of array\n\n    \n  }\n}\n\nfunction buildLeftIcons(parent, object) {\n  // create project header icons container, left\n  const IconsLeft = document.createElement('div');\n  parent.appendChild(IconsLeft);\n  IconsLeft.classList.add('icons-left');\n\n  // create project header icons, left\n  const menuDownIcon = document.createElement('img');\n  IconsLeft.appendChild(menuDownIcon);\n  menuDownIcon.src = './images/menu-down.svg';\n  menuDownIcon.alt = 'menu down icon';\n  menuDownIcon.classList.add('hidden');\n  const menuUpIcon = document.createElement('img');\n  IconsLeft.appendChild(menuUpIcon);\n  menuUpIcon.src = './images/menu-up.svg';\n  menuUpIcon.alt = 'menu up icon';\n}\n\nfunction buildInfo(parent, object) {\n  const name = document.createElement('div');\n  parent.appendChild(name);\n  name.classList.add('name');\n  name.textContent = object.name;\n\n  const desc = document.createElement('div');\n  parent.appendChild(desc);\n  desc.classList.add('desc');\n  desc.textContent = object.description;\n\n  const due = document.createElement('div');\n  parent.appendChild(due);\n  due.classList.add('due');\n  due.textContent = object.dueDate;\n\n  const status = document.createElement('div');\n  parent.appendChild(status);\n  status.classList.add('status');\n  status.textContent = object.status;\n\n  // hide either desc or status depending on object type\n  if (object.type === 'project') {\n    desc.classList.add('hidden');\n  } else {\n    status.classList.add('hidden');\n  }\n}\n\nfunction buildRightIcons(parent, object) {\n  // create project header icons container, right\n  const IconsRight = document.createElement('div');\n  parent.appendChild(IconsRight);\n  IconsRight.classList.add('icons-right');\n\n  // create project header icons, right\n  const checkIcon = document.createElement('img');\n  IconsRight.appendChild(checkIcon);\n  checkIcon.src = './images/check-bold.svg';\n  checkIcon.alt = 'check icon';\n  const flagIcon = document.createElement('img');\n  IconsRight.appendChild(flagIcon);\n  flagIcon.src = './images/flag.svg';\n  flagIcon.alt = 'flag icon';\n  const trashIcon = document.createElement('img');\n  IconsRight.appendChild(trashIcon);\n  trashIcon.src = './images/delete.svg';\n  trashIcon.alt = 'trash icon';\n}\n\n// Input handling\nfunction readForm(type1) {\n  // read info from modal form\n\n  // create new object from form information\n  let newItem;\n  if (type === 'task') {\n    newItem = createTaskObj(type, projectID, name, description, dueDate, priority);\n  } else {\n    newItem = createProjectObj(type, projectID, name, description, dueDate, status, tasks);\n  }\n  //return object\n  return newItem;\n}\n// Object creation\n\n// create new task or project object\nfunction createTaskObj(type, projectID, name, description, dueDate, priority) {\n  return {\n    type: type,\n    projectID: projectID,\n    name: name,\n    description: description,\n    dueDate: dueDate,\n    priority: priority,\n  };\n}\n\n// create new task or project object\nfunction createProjectObj(type, projectID, name, description, dueDate, status, tasks) {\n  return {\n    type: type,\n    projectID: projectID,\n    name: name,\n    description: description,\n    dueDate: dueDate,\n    status: status,\n    tasks: [],\n  };\n}\n\nfunction createTask() {\n  // get info from form\n  const task = readForm();\n  console.log(task);\n  // store task\n  objectStorage.storeTask(task);\n  // update DOM\n  buildTask(task.projectID, task);\n}\n\nfunction createProject() {\n  // get info from form\n  const project = readForm();\n  // store project\n  objectStorage.storeProject(project);\n  // update DOM\n  buildProject(project);\n}\n\n// Object Manipulation\n\n// object storage\nconst objectStorage = (() => {\n  // initialize arrays\n  let unsortedTasks = [];\n  let projectList = [];\n\n  // function to store projects\n  function storeProject(project) {\n    // add project header to project list\n    projectList.push(project);\n    console.log('PROJECT LIST');\n    console.log(projectList);\n    // create new array to hold tasks in project\n  }\n\n  // function to store tasks\n  function storeTask(task) {\n    if (task.projectId === 'default') {\n      // if task is not assigned to a project, add to unsortedTasks\n      unsortedTasks.push(task);\n    } else {\n      // find the project in the projectList\n      let projectIndex = projectList.findIndex(project => (project.projectID === task.projectID));\n      // if project does not exist (typo), add task to default\n      if (projectIndex === -1) {\n        unsortedTasks.push(task);\n      } else {\n        projectList[projectIndex].tasks.push(task);\n      }\n    }\n  }\n\n  function getProjectNames() {\n    let projectNames = ['default'];\n    projectList.forEach(project => projectNames.push(project.name));\n    return projectNames;\n  }\n\n  return {\n    storeProject,\n    storeTask,\n    getProjectNames,\n  };\n})();\n\n// // testing\n// function initialize() {\n//   const taskButton = document.querySelector('.test-task');\n//   const projButton = document.querySelector('.test-proj');\n//   taskButton.addEventListener('click', () => {\n//     testTask();\n//   });\n//   projButton.addEventListener('click', () => {\n//     testProj();\n//   });\n// }\n\n// function taskData() {\n//   // read info from modal form\n//   // testing values\n//   const type = 'task';\n//   const projectID = 'TEST';\n//   const name = 'Test 1';\n//   const description = 'desc here';\n//   const dueDate = '6/7';\n//   const status = '';\n//   // create new object from form information\n//   const newItem = createItem(type, projectID, name, description, dueDate, status);\n\n//   // return object\n//   return newItem;\n// }\n\n// function projData() {\n//   // read info from modal form\n//   // testing values\n//   const type = 'project';\n//   const project = 'TEST';\n//   const name = 'Test 1';\n//   const description = 'desc here';\n//   const dueDate = '6/7';\n//   const status = '';\n//   const tasks = [];\n//   // create new object from form information\n//   const newItem = createTestItem(type, project, name, description, dueDate, status, tasks);\n\n//   // return object\n//   return newItem;\n// }\n\n// function testTask() {\n//   // get info from form\n//   const task = taskData();\n//   console.log(task);\n//   // push to addTask\n//   objectStorage.storeTask(task);\n//   // update DOM\n//   buildTask(task.projectID, task);\n// }\n\n// function testProj() {\n//   // get info from form\n//   const project = projData();\n//   console.log(project);\n//   // push to addTask\n//   objectStorage.storeProject(project);\n//   // update DOM\n//   buildProject(project);\n// }\n\n// function createTestItem(type, projectID, name, description, dueDate, status) {\n//   return {\n//     type: type,\n//     projectID: projectID,\n//     name: name,\n//     description: description,\n//     dueDate: dueDate,\n//     status: status,\n//     tasks: [],\n//   };\n// }\n\n// initialize();\n\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
/**
 * rxn-parser - SDF parser
 * @version v0.1.0
 * @link https://github.com/cheminfo-js/rxn-parser
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SDFParser"] = factory();
	else
		root["SDFParser"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function parse(rxn) {
    if (typeof rxn !== 'string') {
        throw new TypeError('Parameter "rxn" must be a string');
    }
    // we will find the delimiter in order to be much faster and not use regular expression
    var header = rxn.substr(0, 1000);
    var crlf = '\n';
    if (header.indexOf('\r\n') > -1) {
        crlf = '\r\n';
    } else if (header.indexOf('\r') > -1) {
        crlf = '\r';
    }

    var rxnParts = rxn.split(crlf + '$MOL' + crlf);

    var reagents = [];
    var products = [];

    var result = {};
    result.reagents = reagents;
    result.products = products;

    // the first part is expected to contain the number of reagents and products

    // First part should start with $RXN
    // and the fifth line should contain the number of reagents and products
    if (rxnParts.length === 0) throw new Error('file looks empty');

    var header = rxnParts[0];
    if (header.indexOf("$RXN") != 0) throw new Error('file does not start with $RXN');

    var lines = header.split(crlf);
    if (lines.length < 5) throw new Error('incorrect number of lines in header');

    var numberReagents = lines[4].substring(0, 3) >> 0;
    var numberProducts = lines[4].substring(3, 6) >> 0;

    // hack for JSME
    var thirdNumber = lines[4].substring(6, 9) >> 0; // for jsme

    if (thirdNumber && rxnParts[1]) {
        var _lines = rxnParts[1].split(crlf);
        if (_lines[0]) {
            numberReagents = _lines[0].trim().replace(/>[^>]*$/, '').split(/[.>]/).length;
        }
    }

    if (numberReagents + numberProducts != rxnParts.length - 1) throw new Error('not the correct number of molecules');

    for (var i = 1; i < rxnParts.length; i++) {
        if (i <= numberReagents) {
            reagents.push(rxnParts[i]);
        } else {
            products.push(rxnParts[i]);
        }
    }
    return result;
}

module.exports = parse;

/***/ })
/******/ ]);
});
//# sourceMappingURL=rxn-parser.js.map
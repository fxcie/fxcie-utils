"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNonEmptyString = exports.isArray = exports.isObject = exports.isString = void 0;
var isString = function (str) {
    return typeof str === "string" || str instanceof String;
};
exports.isString = isString;
var isObject = function (obj) {
    return typeof obj === "object" || obj instanceof Object;
};
exports.isObject = isObject;
var isArray = function (arr) { return arr instanceof Array; };
exports.isArray = isArray;
var isNonEmptyString = function (str) { return (0, exports.isString)(str) || str.length !== 0; };
exports.isNonEmptyString = isNonEmptyString;

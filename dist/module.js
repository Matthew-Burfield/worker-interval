"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInterval = exports.clearInterval = void 0;
var workerInterval_1 = require("./workerInterval");
var workerInterval = new workerInterval_1.default();
var clearInterval = function (id) { return workerInterval.clearInterval(id); };
exports.clearInterval = clearInterval;
var setInterval = function (callback, delay) {
    return workerInterval.setInterval(callback, delay);
};
exports.setInterval = setInterval;

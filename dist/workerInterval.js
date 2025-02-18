"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var WorkerInterval = (function () {
    function WorkerInterval() {
        var _this = this;
        this.works = [];
        var Worker = require("worker-loader!./worker").default;
        this.worker = new Worker();
        this.worker.onmessage = function (data) { return _this.onMessage(data); };
    }
    WorkerInterval.prototype.setInterval = function (callback, delay) {
        var work = {
            id: uuid_1.v4(),
            callback: callback,
        };
        this.works.push(work);
        var intervalWork = {
            name: "setInterval",
            id: work.id,
            delay: delay,
        };
        this.worker.postMessage(intervalWork);
        return work.id;
    };
    WorkerInterval.prototype.clearInterval = function (id) {
        var workIndex = this.works && this.works.findIndex(function (x) { return x.id === id; });
        if (workIndex === null || workIndex < 0) {
            return;
        }
        var intervalWork = {
            name: "clearInterval",
            id: this.works[workIndex].id,
        };
        this.worker.postMessage(intervalWork);
        this.works.splice(workIndex, 1);
    };
    WorkerInterval.prototype.onMessage = function (event) {
        var intervalWork = event.data && event.data;
        if (!intervalWork) {
            return;
        }
        switch (intervalWork.name) {
            case "runCallback": {
                var work = this.works && this.works.find(function (x) { return x.id === intervalWork.id; });
                if (!work) {
                    return;
                }
                work.callback();
                break;
            }
        }
    };
    return WorkerInterval;
}());
exports.default = WorkerInterval;

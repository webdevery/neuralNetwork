"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

var _controller = _interopRequireDefault(require("./components/controller.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _jquery["default"])(document).ready(function () {
  var mainController = new _controller["default"]();
});
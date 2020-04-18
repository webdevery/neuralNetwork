"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _brain = _interopRequireDefault(require("./brain.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BrainController =
/*#__PURE__*/
function () {
  function BrainController() {
    _classCallCheck(this, BrainController);

    this.init();
  }

  _createClass(BrainController, [{
    key: "init",
    value: function init() {
      this.brain = new _brain["default"]({
        layers: [10, 6, 4],
        offset: [1, 1, 0]
      });
      console.log(this.brain);
      console.log('start Neural');
      console.log('____________');

      for (var i = 0; i < 10000; i++) {
        this.brain.learn([1, 3, 4, 1, 2, 3, 4, 2, 5, 2], [0, 0, 0, 1]);
      }

      console.log(this.brain);
      console.log("  ");
      console.log(this.brain.read([1, 3, 4, 1, 2, 3, 4, 2, 5, 2]));
    }
  }, {
    key: "learn",
    value: function learn(data, res) {
      this.brain.learn(data, res);
    }
  }, {
    key: "read",
    value: function read(data) {
      return this.brain.learn(data, res);
    }
  }]);

  return BrainController;
}();

var _default = BrainController;
exports["default"] = _default;
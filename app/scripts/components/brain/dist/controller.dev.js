"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _brain = _interopRequireDefault(require("./brain.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BrainController =
/*#__PURE__*/
function () {
  function BrainController(opts) {
    _classCallCheck(this, BrainController);

    this.opts = _objectSpread({}, opts);
    this.learned = false;
    this.init();
  }

  _createClass(BrainController, [{
    key: "init",
    value: function init() {
      this.brain = new _brain["default"](this.opts);
      console.log(this.brain);
      console.log("start Neural");
      console.log("____________"); // for(let i = 0;i< 10000;i++){
      //   this.brain.learn([1, 3, 4, 1, 2, 3, 4, 2, 5, 2], [-1, -1, -1, 1]);
      // }
      // console.log(this.brain);
      // console.log("  ");
      // console.log(this.brain.read([1, 3, 4, 1, 2, 3, 4, 2, 5, 2]));
    }
  }, {
    key: "learn",
    value: function learn(data, res) {
      var resultLearning = this.brain.learn(data, res);
      return resultLearning;
    }
  }, {
    key: "read",
    value: function read(data) {
      return this.brain.read(data);
    }
  }, {
    key: "save",
    value: function save(btn) {
      var weights = this.brain.weights;
      var countLayers = this.brain.layers;
      var sizes = [];
      this.brain.layers.forEach(function (item) {
        sizes.push(item.lenght);
      });
      var obj = {
        conf: {
          count: countLayers,
          sizes: sizes
        },
        weights: weights
      };
      var json = JSON.stringify(obj);
      var file = new Blob([json], {
        type: "application/json"
      });
      btn.setAttribute("download", "weights-conf.json");
      btn.setAttribute("href", URL.createObjectURL(file));
    }
  }, {
    key: "load",
    value: function load(src, success, error) {
      var _this = this;

      var req = new XMLHttpRequest();
      req.overrideMimeType("application/json");
      req.open("GET", src, true);

      req.onload = function (e) {
        var data = JSON.parse(req.responseText);

        if (_this.checkConfig(data.conf)) {
          _this.brain.weights = data.weights;
          _this.learned = true;
          success();
        } else {
          error();
        }
      };

      req.send(null);
    }
  }, {
    key: "checkConfig",
    value: function checkConfig(conf) {
      var countLayers = this.brain.layers;
      var sizes = [];
      this.brain.layers.forEach(function (item) {
        sizes.push(item.lenght);
      });

      if (conf.count == countLayers) {
        var right = true;
        this.brain.layers.forEach(function (item, key) {
          if (item.lenght != conf.sizes[key]) {
            right = false;
          }
        });
        return right;
      }

      return false;
    }
  }]);

  return BrainController;
}();

var _default = BrainController;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _neuralComponents = require("./neuralComponents.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Learning =
/*#__PURE__*/
function () {
  function Learning(kLearning) {
    _classCallCheck(this, Learning);

    this.kLearning = kLearning;
    this.summError = 0;
  }

  _createClass(Learning, [{
    key: "forWards",
    value: function forWards(li, w, lo) {
      var wt = w.x;
      var ht = w.y;
      var y = 0;

      while (y < ht) {
        lo.neurals[y].val = 0;
        var x = 0;

        while (x < wt) {
          lo.neurals[y].val += li.neurals[x].val * w.base[x][y];
          x++;
        }

        lo.neurals[y].val = this.funcLearn(lo.neurals[y].val);
        y++;
      }
    }
  }, {
    key: "fixOutError",
    value: function fixOutError(lr, N) {
      var wt = lr.length;
      var x = 0;

      while (x < wt) {
        /* if (IDL[x][0] >= 0.8 && N[x] >= 0.8 || IDL[x][0] <= 0.2 && N[x]<=0.2) {
          IDL[x][1] = 0;
        }else{
          IDL[x][1] = N[x] - IDL[x][0];
        } */
        lr.neurals[x].error = N[x] - lr.neurals[x].val;
        x++;
      }
    }
  }, {
    key: "findError",
    value: function findError(li, w, lo) {
      var wt = w.x - 1;
      var ht = w.y;
      var x = 0;

      while (x < wt) {
        li.neurals[x].error = 0;
        var y = 0;

        while (y < ht) {
          li.neurals[x].error += lo.neurals[y].error * w.base[x][y];
          y++;
        }

        this.summError += Math.abs(li.neurals[x].error * li.neurals[x].error) / 2;
        x++;
      }
    }
  }, {
    key: "backWards",
    value: function backWards(li, w, lo, k) {
      var wt = w.x;
      var ht = w.y;
      var y = 0;

      while (y < ht) {
        var x = 0;

        while (x < wt) {
          w.base[x][y] = w.base[x][y] + k * lo.neurals[y].error * this.proizv(lo.neurals[y].val) * li.neurals[x].val;
          x++;
        }

        y++;
      }
    }
  }, {
    key: "funcLearn",
    value: function funcLearn(z) {
      return 2 / (1 + Math.exp(-z)) - 1;
    }
  }, {
    key: "proizv",
    value: function proizv(n) {
      return 0.5 * (1 + n) * (1 - n);
    }
  }]);

  return Learning;
}();

var Brain =
/*#__PURE__*/
function () {
  function Brain(opts) {
    _classCallCheck(this, Brain);

    this.opts = _objectSpread({
      kLearning: 0.5,
      offset: false
    }, opts);
    this.learning = new Learning(this.opts.kLearning);
    this.layers = [];
    this.weights = [];
    this.init();
  }

  _createClass(Brain, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.opts.layers.forEach(function (layer, key) {
        var count = layer;
        var offset = _this.opts.offset ? _this.opts.offset[key] : false;

        _this.layers.push(new _neuralComponents.NeuralsLayer(count, offset));
      });

      for (var i = 1; i < this.layers.length; i++) {
        this.weights.push(new _neuralComponents.Weights(this.layers[i - 1], this.layers[i]));
      }
    }
  }, {
    key: "learn",
    value: function learn(inputData, awaitResult) {
      this.layers[0].setData(inputData);

      for (var i = 1; i < this.layers.length; i++) {
        this.learning.forWards(this.layers[i - 1], this.weights[i - 1], this.layers[i]);
      }

      this.learning.fixOutError(this.layers[this.layers.length - 1], awaitResult);

      for (var _i = this.layers.length - 1; _i > 0; _i--) {
        this.learning.findError(this.layers[_i - 1], this.weights[_i - 1], this.layers[_i]);
      }

      for (var _i2 = this.layers.length - 1; _i2 > 0; _i2--) {
        this.learning.backWards(this.layers[_i2 - 1], this.weights[_i2 - 1], this.layers[_i2], this.learning.kLearning);
      }
    }
  }, {
    key: "read",
    value: function read(inputData) {
      this.layers[0].setData(inputData);

      for (var i = 1; i < this.layers.length; i++) {
        this.learning.forWards(this.layers[i - 1], this.weights[i - 1], this.layers[i]);
      }

      return this.layers[this.layers.length - 1].getData();
    }
  }]);

  return Brain;
}();

var _default = Brain;
exports["default"] = _default;
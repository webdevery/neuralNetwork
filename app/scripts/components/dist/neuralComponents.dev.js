"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Weights = exports.NeuralsLayer = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Neural = function Neural(val) {
  _classCallCheck(this, Neural);

  this.val = val;
  this.error = 0;
};

var NeuralsLayer =
/*#__PURE__*/
function () {
  function NeuralsLayer(count, offset) {
    _classCallCheck(this, NeuralsLayer);

    this.length = count;
    this.offset = offset;
    this.neurals = [];
    this.createNeurals();
  }

  _createClass(NeuralsLayer, [{
    key: "createNeurals",
    value: function createNeurals() {
      for (var i = 0; i < this.length; i++) {
        this.neurals.push(new Neural(0));
      }

      if (this.offset) {
        this.neurals.push(new Neural(1));
        this.length++;
      }
    }
  }, {
    key: "setData",
    value: function setData(inputData) {
      var _this = this;

      inputData.forEach(function (item, key) {
        _this.neurals[key].val = item;
      });
    }
  }, {
    key: "getData",
    value: function getData() {
      var data = [];
      this.neurals.forEach(function (item, key) {
        data[key] = item.val;
      });
      return data;
    }
  }]);

  return NeuralsLayer;
}();

exports.NeuralsLayer = NeuralsLayer;

var Weights =
/*#__PURE__*/
function () {
  function Weights(li, lo) {
    _classCallCheck(this, Weights);

    this.base = [];
    this.li = li;
    this.lo = lo;
    this.x = this.li.length;
    this.y = this.lo.length;
    this.setBase();
  }

  _createClass(Weights, [{
    key: "setBase",
    value: function setBase() {
      for (var i = 0; i < this.li.length; i++) {
        this.base.push([]);

        for (var j = 0; j < this.lo.length; j++) {
          this.base[i].push(this.getRand());
        }
      }
    }
  }, {
    key: "getRand",
    value: function getRand() {
      return Math.random() - 0.5;
    }
  }]);

  return Weights;
}();

exports.Weights = Weights;
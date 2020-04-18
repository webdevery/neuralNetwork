"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Weights = exports.NeuralsLayer = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Neural = function Neural(index, val) {
  _classCallCheck(this, Neural);

  this.index = index;
  this._val = val;
};

var NeuralsLayer =
/*#__PURE__*/
function () {
  function NeuralsLayer(count) {
    _classCallCheck(this, NeuralsLayer);

    this.lenght = count;
    this.neurals = [];
    this.createNeurals();
  }

  _createClass(NeuralsLayer, [{
    key: "createNeurals",
    value: function createNeurals() {
      for (var i = 0; i < this.lenght; i++) {
        this.neurals.push(new Neural(i));
      }
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
    this.setBase();
  }

  _createClass(Weights, [{
    key: "setBase",
    value: function setBase() {
      for (var i = 0; i < this.li.lenght; i++) {
        this.base.push([]);

        for (var j = 0; j < this.lo.lenght; j++) {
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
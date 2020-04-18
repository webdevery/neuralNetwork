"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Neural =
/*#__PURE__*/
function () {
  function Neural() {
    _classCallCheck(this, Neural);

    this.weights = [];
  }

  _createClass(Neural, [{
    key: "linked",
    value: function linked(neuron) {
      neuron.weights.push();
    }
  }, {
    key: "in",
    value: function _in(val) {
      this.val = val;
      return this.out();
    }
  }]);

  return Neural;
}();

var NeuralsLayer = function NeuralsLayer() {
  _classCallCheck(this, NeuralsLayer);
};

var Weights = function Weights(nb, ne, value) {
  _classCallCheck(this, Weights);
};
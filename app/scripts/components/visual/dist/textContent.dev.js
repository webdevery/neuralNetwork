"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TextContent =
/*#__PURE__*/
function () {
  function TextContent(id, opts) {
    _classCallCheck(this, TextContent);

    this.opts = _objectSpread({
      prefix: "",
      around: false
    }, opts);
    this.el = document.getElementById(id);

    if (document.getElementById(id + "-visual")) {
      this.visual = document.getElementById(id + "-visual");
    }
  }

  _createClass(TextContent, [{
    key: "visualUpdate",
    value: function visualUpdate(val) {
      if (this.visual) {
        this.visual.style.width = val + '%';
      }
    }
  }, {
    key: "update",
    value: function update(text) {
      var _this = this;

      var val = "";

      if (Array.isArray(text)) {
        text.forEach(function (item) {
          val += _this.around(item) + " ";
        });
      } else {
        val = this.around(text);
      }

      this.visualUpdate(val);
      val += this.opts.prefix;
      this.el.innerHTML = val;
    }
  }, {
    key: "around",
    value: function around(x) {
      if (this.opts.around) {
        return Math.round(x * 100) / 100;
      } else {
        return x;
      }
    }
  }]);

  return TextContent;
}();

var _default = TextContent;
exports["default"] = _default;
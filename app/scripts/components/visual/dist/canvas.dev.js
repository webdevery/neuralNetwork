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

var Canvas =
/*#__PURE__*/
function () {
  function Canvas(id, w, h, size) {
    _classCallCheck(this, Canvas);

    this.el = document.getElementById(id);
    this.ctx = this.el.getContext("2d");
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
    this.w = this.el.width = w;
    this.h = this.el.height = h;
    this.size = size;
    this.countBlocks = this.w / this.size * (this.h / this.size);
    this.timeOut = false;
    this.x = 0;
    this.y = 0;
    this.tps = 100;
    this.frame = 0;
    this.countBegin = 0;
  }

  _createClass(Canvas, [{
    key: "resize",
    value: function resize(w, h) {
      this.w = this.el.width = w;
      this.h = this.el.height = h;
      this.countBlocks = this.w / this.size * (this.h / this.size);
      this.ctx = this.el.getContext("2d");
    }
  }, {
    key: "drawImg",
    value: function drawImg(src, success, error) {
      var _this = this;

      var image = new Image();

      image.onload = function () {
        _this.resize(image.naturalWidth, image.naturalHeight);

        _this.ctx.drawImage(image, 0, 0);

        success();
      };

      var _src = src.split("?")[0];
      image.src = _src + "?" + new Date().getTime();
      image.setAttribute("crossOrigin", "");

      image.onerror = function (e) {
        error(e);
      };
    }
  }, {
    key: "drawData",
    value: function drawData(data) {
      var _this2 = this;

      var x = 0;
      var y = 0;
      data.forEach(function (item, key) {
        x = key % _this2.size;
        y = parseInt(key / _this2.size);

        _this2.ctx.beginPath();

        _this2.ctx.rect(x * 20, y * 20, 20, 20);

        _this2.ctx.fillStyle = "rgb(" + (1 - item) * 255 + "," + (1 - item) * 255 + "," + (1 - item) * 255 + ")";

        _this2.ctx.fill();
      });
    }
  }, {
    key: "drawLine",
    value: function drawLine(ar, dx, dy, opts) {
      var conf = _objectSpread({
        delta: 1,
        limit: 0.5
      }, opts);

      var col = ar[1] > conf.limit;
      var row = ar[0] > conf.limit;
      this.ctx.beginPath();
      var x = dx * this.size;
      var y = dy * this.size;

      if (row) {
        this.ctx.moveTo(x, y + conf.delta);
        this.ctx.lineTo(x + this.size * conf.delta, y + conf.delta);
      }

      if (col) {
        this.ctx.moveTo(x + conf.delta, y);
        this.ctx.lineTo(x + conf.delta, y + this.size * conf.delta);
      }

      this.ctx.strokeStyle = "#333333";
      this.ctx.strokeWidth = 1;
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ctx.clearRect(0, 0, this.w, this.h);
    }
  }, {
    key: "getData",
    value: function getData() {
      var picture = this.ctx.getImageData(this.x, this.y, this.size, this.size);
      var tempData = [];

      for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
          var index = (j + i * this.size) * 4;
          var R = picture.data[index];
          var G = picture.data[index + 1];
          var B = picture.data[index + 2]; //let rgb = "rgb(" + R + "," + G + "," + B + ")";

          var gray = 0.3 * R + 0.59 * G + 0.11 * B;
          tempData.push((gray - 126) / 126);
        }
      }

      return tempData;
    }
  }, {
    key: "nextPos",
    value: function nextPos() {
      this.y += this.size;

      if (this.y >= this.h) {
        this.x += this.size;
        this.y = 0;
      }

      if (this.x >= this.w) {
        this.x = 0;
        this.y = 0;
        return false;
      }

      return true;
    }
  }, {
    key: "nextRandPos",
    value: function nextRandPos() {
      this.x = this.w * Math.random();
      this.y = this.h * Math.random();
      this.x = this.x - this.x % this.size;
      this.y = this.y - this.y % this.size;
    }
  }, {
    key: "each",
    value: function each(callback, complate) {
      var _this3 = this;

      this.promise = new Promise(function (resolve, reject) {
        if (_this3.pause) {
          _this3.pauseContent = function () {
            resolve(_this3.getData());
          };
        } else {
          resolve(_this3.getData());
        }
      }).then(function (data) {
        var dx = _this3.x / _this3.size;
        var dy = _this3.y / _this3.size;
        var progress = (dx * _this3.h / _this3.size + dy) / _this3.countBlocks * 100;
        callback(data, dx, dy, progress);

        if (_this3.nextPos()) {
          _this3.frame++;

          if (_this3.frame == _this3.tps) {
            _this3.frame = 0;
            setTimeout(function () {
              _this3.each(callback, complate);
            }, 0);
          } else {
            _this3.each(callback, complate);
          }
        } else {
          _this3.x = 0;
          _this3.y = 0;
          complate();
        }
      });
    }
  }, {
    key: "eachRand",
    value: function eachRand(count, callback, complate) {
      var _this4 = this;

      if (this.countBegin < count) {
        this.countBegin = count;
      }

      this.promise = new Promise(function (resolve, reject) {
        if (_this4.pause) {
          _this4.pauseContent = function () {
            resolve(_this4.getData());
          };
        } else {
          resolve(_this4.getData());
        }
      }).then(function (data) {
        var dx = _this4.x / _this4.size;
        var dy = _this4.y / _this4.size;
        var progress = (1 - count / _this4.countBegin) * 100;
        callback(data, dx, dy, progress);

        if (count > 0) {
          _this4.nextRandPos();

          _this4.frame++;

          if (_this4.frame == _this4.tps) {
            _this4.frame = 0;
            setTimeout(function () {
              _this4.eachRand(count - 1, callback, complate);
            }, 0);
          } else {
            _this4.eachRand(count - 1, callback, complate);
          }
        } else {
          complate();
          _this4.countBegin = 0;
          _this4.x = 0;
          _this4.y = _this4.size;
        }
      });
    }
  }]);

  return Canvas;
}();

var _default = Canvas;
exports["default"] = _default;
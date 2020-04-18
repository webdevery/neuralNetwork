"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _controller = _interopRequireDefault(require("./brain/controller.js"));

var _canvas = _interopRequireDefault(require("./visual/canvas.js"));

var _textContent = _interopRequireDefault(require("./visual/textContent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MainController =
/*#__PURE__*/
function () {
  function MainController() {
    _classCallCheck(this, MainController);

    this.opts = {
      sizeBox: 3,
      kSize: 20,
      values: [[1, 0.02], [0.02, 1], [1, 1], [0.02, 0.02]],
      //настройки нейросети
      brain: {
        layers: [9, 36, 18, 2],
        offset: true
      },
      //
      stepEra: 1000 // Кол-во итераций в эре

    };
    this.errorsEra = 0;
    this.iteration = 0;
    this.texts = [];
    this.init();
  }

  _createClass(MainController, [{
    key: "init",
    value: function init() {
      this.NeuralNetwork = new _controller["default"](this.opts.brain);
      this.mainCanvas = new _canvas["default"]("main", 1, 1, this.opts.sizeBox);
      this.previewCanvas = new _canvas["default"]("sub", this.opts.sizeBox * this.opts.kSize, this.opts.sizeBox * this.opts.kSize, this.opts.sizeBox);
      this.resultCanvas = new _canvas["default"]("result", 1, 1, this.opts.sizeBox);
      this.texts["awaitResult"] = new _textContent["default"]("awaitResult", {
        around: true
      });
      this.texts["error"] = new _textContent["default"]("error", {
        around: true
      });
      this.texts["errorsEra"] = new _textContent["default"]("errorsEra", {
        around: true
      });
      this.texts["progress"] = new _textContent["default"]("progress", {
        prefix: "%",
        around: true
      });
      this.start();
    }
  }, {
    key: "start",
    value: function start() {
      this.events(); //this.loadToLearn();
    }
  }, {
    key: "updateScreen",
    value: function updateScreen(data) {
      this.iteration++;
      if (data.res) this.texts["awaitResult"].update(data.res);

      if (data.progress) {
        var progress = data.progress;
        if (progress > 100) progress = 100;
        this.texts["progress"].update(progress);
      }

      if (data.error) {
        this.texts["error"].update(data.error);
        this.errorsEra += data.error;
      }

      if (data.data) this.previewCanvas.drawData(data.data);

      if (this.iteration >= this.opts.stepEra) {
        this.texts["errorsEra"].update(this.errorsEra);
        this.iteration = 0;
        this.errorsEra = 0;
      }
    }
  }, {
    key: "load",
    value: function load(src, handler) {
      var _this = this;

      var type = src.split(".")[src.split(".").length - 1];
      type != "json" ? type = "img" : 1;
      console.log(type);
      this.loader = new Promise(function (resolve, reject) {
        if (type === "json") {
          _this.NeuralNetwork.load(src, resolve, reject);
        } else {
          _this.mainCanvas.drawImg(src, resolve, reject);
        }
      }).then(function () {
        handler();
      })["catch"](function (error) {
        alert("Ошибка загрузки, Это может быть связано с тем, что вы указали неверный URL или у вас нет доступа к ресурсу", error);
      });
    }
    /* 
    LEARNING
    */

  }, {
    key: "startLearn",
    value: function startLearn(count, src) {
      var _this2 = this;

      this.load(src, function () {
        _this2.learning(count);
      });
    }
  }, {
    key: "learning",
    value: function learning(count) {
      var _this3 = this;

      this.proccessBegin();

      var getAwaitResult = function getAwaitResult(x, y) {
        var indexRes = y * (_this3.mainCanvas.w / _this3.opts.sizeBox) + x;
        return _this3.opts.values[indexRes % _this3.opts.values.length];
      };

      this.mainCanvas.eachRand(count, function (data, x, y, progress) {
        var res = getAwaitResult(x, y);

        var error = _this3.NeuralNetwork.learn(data, res);

        _this3.updateScreen({
          data: data,
          res: res,
          progress: progress,
          error: error
        });

        _this3.NeuralNetwork.learned = true;
      }, function () {
        _this3.proccessEnd();

        console.log("COMPLETE LEARN");
        var downloadBtn = document.getElementById("download");

        _this3.NeuralNetwork.save(downloadBtn);
      });
    }
    /* LEARNING  */

    /* 
    READING 
    */

  }, {
    key: "startRead",
    value: function startRead(url, opts) {
      var _this4 = this;

      this.load(url, function () {
        _this4.resultCanvas.resize(_this4.mainCanvas.w, _this4.mainCanvas.h);

        if (!_this4.NeuralNetwork.learned) {
          _this4.load("./data/3-10-2.json", function () {
            _this4.reading(opts);
          });
        } else {
          _this4.reading(opts);
        }
      });
    }
  }, {
    key: "reading",
    value: function reading(opts) {
      var _this5 = this;

      this.proccessBegin();
      this.mainCanvas.timeOut = true;
      this.mainCanvas.each(function (data, x, y, progress) {
        var res = _this5.NeuralNetwork.read(data);

        _this5.updateScreen({
          data: data,
          res: res,
          progress: progress,
          error: 0
        });

        _this5.resultCanvas.drawLine(res, x, y, opts);
      }, function () {
        _this5.proccessEnd();

        console.log("COMPLETE READ");
      });
    }
    /* READING  */

    /* 
    PROCCESS 
    */

  }, {
    key: "proccessBegin",
    value: function proccessBegin() {
      this.NeuralNetwork.procces = true;
      this.mainCanvas.pause = false;
      this.mainCanvas.pauseContent = null;
      (0, _jquery["default"])("#pause").removeClass("disabled");
      (0, _jquery["default"])("#stop").removeClass("disabled");
    }
  }, {
    key: "proccessEnd",
    value: function proccessEnd() {
      this.NeuralNetwork.procces = false;
      this.mainCanvas.pause = false;
      this.mainCanvas.pauseContent = null;
      (0, _jquery["default"])("#pause").addClass("disabled");
      (0, _jquery["default"])("#stop").addClass("disabled");
    }
  }, {
    key: "proccessKill",
    value: function proccessKill() {
      this.proccessEnd();
    }
    /* PROCCESS  */

  }, {
    key: "events",
    value: function events() {
      var _this6 = this;

      (0, _jquery["default"])("#learn").submit(function (e) {
        e.preventDefault();
        var count = (0, _jquery["default"])("#learn").find("[name=count]").val();
        var url_data = (0, _jquery["default"])("#learn").find("[name=url_data]").val();
        count = parseInt(count);

        if (!_this6.NeuralNetwork.procces) {
          _this6.startLearn(count, url_data);
        }
      });
      (0, _jquery["default"])("#read").submit(function (e) {
        e.preventDefault();
        var url = (0, _jquery["default"])("#read").find("[name=url]").val();
        var opts = {
          delta: parseFloat((0, _jquery["default"])("#read").find("[name=delta]").val()),
          limit: parseFloat((0, _jquery["default"])("#read").find("[name=limit]").val()) / 100
        };

        if (!_this6.NeuralNetwork.procces) {
          _this6.startRead(url, opts);
        }
      });
      (0, _jquery["default"])("#pause").click(function (e) {
        if (_this6.mainCanvas.pause) {
          _this6.mainCanvas.pause = false;

          _this6.mainCanvas.pauseContent();

          _this6.mainCanvas.pauseContent = null;
          (0, _jquery["default"])("#pause").text("Приостановить");
        } else {
          _this6.mainCanvas.pause = true;
          (0, _jquery["default"])("#pause").text("Продолжить");
        }
      });
      (0, _jquery["default"])("#stop").click(function (e) {
        _this6.mainCanvas.pause = true;
        setTimeout(function () {
          _this6.mainCanvas.pause = false;
          _this6.mainCanvas.pauseContent = null;

          _this6.proccessKill();
        }, 300);
      });
      (0, _jquery["default"])("[data-read] img").click(function (e) {
        var item = e.target;
        (0, _jquery["default"])("#read").find("[name=url]").val(item.src);
      });
      (0, _jquery["default"])("[data-learn] img").click(function (e) {
        var item = e.target;
        (0, _jquery["default"])("#learn").find("[name=url_data]").val(item.src);
      });
    }
  }]);

  return MainController;
}();

var _default = MainController;
exports["default"] = _default;
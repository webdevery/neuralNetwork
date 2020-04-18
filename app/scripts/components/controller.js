import $ from "jquery";
import BrainController from "./brain/controller.js";
import Canvas from "./visual/canvas.js";
import TextContent from "./visual/textContent.js";

class MainController {
  constructor() {
    this.opts = {
      sizeBox: 3,
      kSize: 20,
      values: [
        [1, 0.02],
        [0.02, 1],
        [1, 1],
        [0.02, 0.02],
      ],

      //настройки нейросети
      brain: {
        layers: [9, 36, 18, 2],
        offset: true,
      },

      //
      stepEra: 1000, // Кол-во итераций в эре
    };
    this.errorsEra = 0;
    this.iteration = 0;

    this.texts = [];
    this.init();
  }
  init() {
    this.NeuralNetwork = new BrainController(this.opts.brain);
    this.mainCanvas = new Canvas("main", 1, 1, this.opts.sizeBox);
    this.previewCanvas = new Canvas(
      "sub",
      this.opts.sizeBox * this.opts.kSize,
      this.opts.sizeBox * this.opts.kSize,
      this.opts.sizeBox
    );
    this.resultCanvas = new Canvas("result", 1, 1, this.opts.sizeBox);

    this.texts["awaitResult"] = new TextContent("awaitResult", {
      around: true,
    });
    this.texts["error"] = new TextContent("error", {
      around: true,
    });
    this.texts["errorsEra"] = new TextContent("errorsEra", {
      around: true,
    });
    this.texts["progress"] = new TextContent("progress", {
      prefix: "%",
      around: true,
    });

    this.start();
  }
  start() {
    this.events();
    //this.loadToLearn();
  }
  updateScreen(data) {
    this.iteration++;
    if (data.res) this.texts["awaitResult"].update(data.res);
    if (data.progress) this.texts["progress"].update(data.progress);
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
  load(src, handler) {
    let type = src.split(".")[src.split(".").length - 1];
    type != "json" ? (type = "img") : 1;
    console.log(type);
    this.loader = new Promise((resolve, reject) => {
      if (type === "json") {
        this.NeuralNetwork.load(src, resolve, reject);
      } else {
        this.mainCanvas.drawImg(src, resolve, reject);
      }
    })
      .then(() => {
        handler();
      })
      .catch((error) => {
        alert(
          "Ошибка загрузки, Это может быть связано с тем, что вы указали неверный URL или у вас нет доступа к ресурсу",
          error
        );
      });
  }

  /* 
  LEARNING
  */
  startLearn(count, src) {
    this.load(src, () => {
      this.learning(count);
    });
  }
  learning(count) {
    this.proccessBegin();
    let getAwaitResult = (x, y) => {
      let indexRes = y * (this.mainCanvas.w / this.opts.sizeBox) + x;
      return this.opts.values[indexRes % this.opts.values.length];
    };

    this.mainCanvas.eachRand(
      count,
      (data, x, y, progress) => {
        let res = getAwaitResult(x, y);
        let error = this.NeuralNetwork.learn(data, res);
        this.updateScreen({
          data: data,
          res: res,
          progress: progress,
          error: error,
        });
        this.NeuralNetwork.learned = true;
      },
      () => {
        this.proccessEnd();
        console.log("COMPLETE LEARN");
        let downloadBtn = document.getElementById("download");
        this.NeuralNetwork.save(downloadBtn);
      }
    );
  }
  /* LEARNING  */

  /* 
  READING 
  */
  startRead(url, opts) {
    this.load(url, () => {
      this.resultCanvas.resize(this.mainCanvas.w, this.mainCanvas.h);
      if (!this.NeuralNetwork.learned) {
        this.load("./data/3-10-2.json", () => {
          this.reading(opts);
        });
      } else {
        this.reading(opts);
      }
    });
  }
  reading(opts) {
    this.proccessBegin();
    this.mainCanvas.timeOut = true;
    this.mainCanvas.each(
      (data, x, y, progress) => {
        let res = this.NeuralNetwork.read(data);
        this.updateScreen({
          data: data,
          res: res,
          progress: progress,
          error: 0,
        });
        this.resultCanvas.drawLine(res, x, y, opts);
      },
      () => {
        this.proccessEnd();
        console.log("COMPLETE READ");
      }
    );
  }
  /* READING  */

  /* 
  PROCCESS 
  */
  proccessBegin() {
    this.NeuralNetwork.procces = true;

    this.mainCanvas.pause = false;
    this.mainCanvas.pauseContent = null;

    $("#pause").removeClass("disabled");
    $("#stop").removeClass("disabled");
  }
  proccessEnd() {
    this.NeuralNetwork.procces = false;

    this.mainCanvas.pause = false;
    this.mainCanvas.pauseContent = null;

    $("#pause").addClass("disabled");
    $("#stop").addClass("disabled");
  }
  proccessKill() {
    this.proccessEnd();
  }
  /* PROCCESS  */

  events() {
    $("#learn").submit((e) => {
      e.preventDefault();
      let count = $("#learn").find("[name=count]").val();
      let url_data = $("#learn").find("[name=url_data]").val();
      count = parseInt(count);
      if (!this.NeuralNetwork.procces) {
        this.startLearn(count, url_data);
      }
    });
    $("#read").submit((e) => {
      e.preventDefault();
      let url = $("#read").find("[name=url]").val();
      let opts = {
        delta: parseFloat($("#read").find("[name=delta]").val()),
        limit: parseFloat($("#read").find("[name=limit]").val()) / 100,
      };
      if (!this.NeuralNetwork.procces) {
        this.startRead(url, opts);
      }
    });
    $("#pause").click((e) => {
      if (this.mainCanvas.pause) {
        this.mainCanvas.pause = false;
        this.mainCanvas.pauseContent();
        this.mainCanvas.pauseContent = null;
        $("#pause").text("Приостановить");
      } else {
        this.mainCanvas.pause = true;
        $("#pause").text("Продолжить");
      }
    });
    $("#stop").click((e) => {
      this.mainCanvas.pause = true;
      setTimeout(() => {
        this.mainCanvas.pause = false;
        this.mainCanvas.pauseContent = null;
        this.proccessKill();
      }, 300);
    });

    $("[data-read] img").click((e) => {
      let item = e.target;
      $("#read").find("[name=url]").val(item.src)
    });
    $("[data-learn] img").click((e) => {
      let item = e.target;
      $("#learn").find("[name=url_data]").val(item.src)
    });
  }
}
export default MainController;

import Brain from "./brain.js";

class BrainController {
  constructor(opts) {
    this.opts = {
      ...opts,
    };
    this.learned = false;
    this.init();
  }
  init() {
    this.brain = new Brain(this.opts);
    console.log(this.brain);
    console.log("start Neural");
    console.log("____________");
    // for(let i = 0;i< 10000;i++){
    //   this.brain.learn([1, 3, 4, 1, 2, 3, 4, 2, 5, 2], [-1, -1, -1, 1]);
    // }
    // console.log(this.brain);
    // console.log("  ");
    // console.log(this.brain.read([1, 3, 4, 1, 2, 3, 4, 2, 5, 2]));
  }
  learn(data, res) {
    let resultLearning = this.brain.learn(data, res)
    
    return resultLearning;
  }
  read(data) {
    return this.brain.read(data);
  }
  save(btn) {
    let weights = this.brain.weights;
    let countLayers = this.brain.layers;
    let sizes = [];
    this.brain.layers.forEach((item) => {
      sizes.push(item.lenght);
    });
    let obj = {
      conf: {
        count: countLayers,
        sizes: sizes,
      },
      weights: weights,
    };
    var json = JSON.stringify(obj);
    let file = new Blob([json], {
      type: "application/json",
    });
    btn.setAttribute("download", "weights-conf.json");
    btn.setAttribute("href", URL.createObjectURL(file));
  }
  load(src, success, error) {
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open("GET", src, true);

    req.onload = (e) => {
      let data = JSON.parse(req.responseText);
      if (this.checkConfig(data.conf)) {
        this.brain.weights = data.weights;
        this.learned = true;
        success();
      } else {
        error();
      }
    };
    req.send(null);
  }
  checkConfig(conf) {
    let countLayers = this.brain.layers;
    let sizes = [];
    this.brain.layers.forEach((item) => {
      sizes.push(item.lenght);
    });
    if (conf.count == countLayers) {
      let right = true;
      this.brain.layers.forEach((item, key) => {
        if (item.lenght != conf.sizes[key]) {
          right = false;
        }
      });
      return right;
    }
    return false;
  }
}

export default BrainController;

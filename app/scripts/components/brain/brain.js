import { NeuralsLayer, Weights } from "./details.js";
class Learning {
  constructor(kLearning) {
    this.kLearning = kLearning;
    this.summError = 0;
  }
  forWards(li, w, lo) {
    let wt = w.x;
    let ht = w.y;
    let y = 0;
    while (y < ht) {
      lo.neurals[y].val = 0;
      let x = 0;
      while (x < wt) {
        lo.neurals[y].val += li.neurals[x].val * w.base[x][y];
        x++;
      }
      lo.neurals[y].val = this.funcLearn(lo.neurals[y].val);
      y++;
    }
  }
  fixOutError(lr, N) {
    let wt = lr.length;
    let x = 0;
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
  findError(li, w, lo) {
    let wt = w.x - 1;
    let ht = w.y;
    let x = 0;
    while (x < wt) {
      li.neurals[x].error = 0;
      let y = 0;
      while (y < ht) {
        li.neurals[x].error += lo.neurals[y].error * w.base[x][y];
        y++;
      }
      this.summError += Math.abs(li.neurals[x].error * li.neurals[x].error) / 2;
      x++;
    }
  }
  backWards(li, w, lo, k) {
    let wt = w.x;
    let ht = w.y;
    let y = 0;
    while (y < ht) {
      let x = 0;
      while (x < wt) {
        w.base[x][y] =
          w.base[x][y] +
          k *
            lo.neurals[y].error *
            this.proizv(lo.neurals[y].val) *
            li.neurals[x].val;
        x++;
      }
      y++;
    }
  }
  getError() {
    let temp = this.summError;
    this.summError = 0;
    return temp;
  }
  funcLearn(z) {
    return 2 / (1 + Math.exp(-z)) - 1;
  }
  proizv(n) {
    return 0.5 * (1 + n) * (1 - n);
  }
}

class Brain {
  constructor(opts) {
    this.opts = {
      kLearning: 0.5,
      offset: false,
      ...opts,
    };
    this.learning = new Learning(this.opts.kLearning);
    this.layers = [];
    this.weights = [];
    this.init();
  }
  init() {
    this.opts.layers.forEach((layer, key) => {
      let count = layer;
      this.layers.push(new NeuralsLayer(count));
    });
    for (let i = 1; i < this.layers.length; i++) {
      this.weights.push(
        new Weights(this.layers[i - 1], this.layers[i], this.opts.offset)
      );
    }
  }

  learn(inputData, awaitResult) {
    this.layers[0].setData(inputData);

    for (let i = 1; i < this.layers.length; i++) {
      this.learning.forWards(
        this.layers[i - 1],
        this.weights[i - 1],
        this.layers[i]
      );
    }
    debugger;
    this.learning.fixOutError(this.layers[this.layers.length - 1], awaitResult);
    for (let i = this.layers.length - 1; i > 0; i--) {
      this.learning.findError(
        this.layers[i - 1],
        this.weights[i - 1],
        this.layers[i]
      );
    }
    for (let i = this.layers.length - 1; i > 0; i--) {
      this.learning.backWards(
        this.layers[i - 1],
        this.weights[i - 1],
        this.layers[i],
        this.learning.kLearning
      );
    }
    return this.learning.getError();
  }
  read(inputData) {
    this.layers[0].setData(inputData);

    for (let i = 1; i < this.layers.length; i++) {
      this.learning.forWards(
        this.layers[i - 1],
        this.weights[i - 1],
        this.layers[i]
      );
    }

    return this.layers[this.layers.length - 1].getData();
  }
  
  load(){
    
  }
}
export default Brain;

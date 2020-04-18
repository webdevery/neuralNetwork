class Neural {
  constructor(val) {
    this.val = val;
    this.error = 0;
  }
}
class NeuralsLayer {
  constructor(count) {
    this.length = count;
    this.neurals = [];
    this.createNeurals();
  }
  createNeurals() {
    for (let i = 0; i < this.length; i++) {
      this.neurals.push(new Neural(0));
    }
  }
  addOffset(){
    this.neurals.push(new Neural(1));
    this.length ++;
  }
  setData(inputData) {
    inputData.forEach((item, key) => {
      this.neurals[key].val = item;
    });
  }
  getData(){
    let data = [];
    this.neurals.forEach((item, key) => {
      data[key] = item.val;
    });
    return data;
  }
}
class Weights {
  constructor(li, lo, offset) {
    this.base = [];
    if(offset){
      li.addOffset();
    }
    this.li = li;
    this.lo = lo;
    this.x = this.li.length;
    this.y = this.lo.length;
    this.setBase();
  }
  setBase() {
    for (let i = 0; i < this.li.length; i++) {
      this.base.push([]);
      for (let j = 0; j < this.lo.length; j++) {
        this.base[i].push(this.getRand());
      }
    }
  }
  getRand() {
    return Math.random() - 0.5;
  }
}
export { NeuralsLayer, Weights };

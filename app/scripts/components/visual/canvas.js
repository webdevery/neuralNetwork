class Canvas {
  constructor(id, w, h, size) {
    this.el = document.getElementById(id);
    this.ctx = this.el.getContext("2d");
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
    this.w = this.el.width = w;
    this.h = this.el.height = h;
    this.size = size;
    this.countBlocks = (this.w / this.size) * (this.h / this.size);
    this.timeOut = false;
    this.x = 0;
    this.y = 0;
    this.tps = 100;
    this.frame = 0;
    this.countBegin = 0;
  }
  resize(w, h) {
    this.w = this.el.width = w;
    this.h = this.el.height = h;
    this.countBlocks = (this.w / this.size) * (this.h / this.size);
    this.ctx = this.el.getContext("2d");
  }

  drawImg(src, success, error) {
    var image = new Image();
    image.onload = () => {
      this.resize(image.naturalWidth, image.naturalHeight);
      this.ctx.drawImage(image, 0, 0);
      success();
    };
    let _src = src.split("?")[0];
    image.src = _src + "?" + new Date().getTime();
    image.setAttribute("crossOrigin", "");
    image.onerror = (e) => {
      error(e);
    };
  }
  drawData(data) {
    let x = 0;
    let y = 0;
    data.forEach((item, key) => {
      x = key % this.size;
      y = parseInt(key / this.size);
      this.ctx.beginPath();
      this.ctx.rect(x * 20, y * 20, 20, 20);
      this.ctx.fillStyle =
        "rgb(" +
        (1 - item) * 255 +
        "," +
        (1 - item) * 255 +
        "," +
        (1 - item) * 255 +
        ")";
      this.ctx.fill();
    });
  }
  drawLine(ar, dx, dy, opts) {
    let conf = {
      delta: 1,
      limit: 0.5,
      ...opts,
    };
    let col = ar[1] > conf.limit;
    let row = ar[0] > conf.limit;

    this.ctx.beginPath();

    let x = dx * this.size;
    let y = dy * this.size;

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
  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }
  getData() {
    let picture = this.ctx.getImageData(this.x, this.y, this.size, this.size);
    let tempData = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let index = (j + i * this.size) * 4;
        let R = picture.data[index];
        let G = picture.data[index + 1];
        let B = picture.data[index + 2];
        //let rgb = "rgb(" + R + "," + G + "," + B + ")";
        let gray = 0.3 * R + 0.59 * G + 0.11 * B;
        tempData.push((gray - 126) / 126);
      }
    }
    return tempData;
  }

  nextPos() {
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
  nextRandPos() {
    this.x = this.w * Math.random();
    this.y = this.h * Math.random();
    this.x = this.x - (this.x % this.size);
    this.y = this.y - (this.y % this.size);
  }
  each(callback, complate) {
    this.promise = new Promise((resolve, reject) => {
      if (this.pause) {
        this.pauseContent = () => {
          resolve(this.getData());
        };
      } else {
        resolve(this.getData());
      }
    }).then((data) => {
      let dx = this.x / this.size;
      let dy = this.y / this.size;
      let progress =
        (((dx * this.h) / this.size + dy) / this.countBlocks) * 100;
      callback(data, dx, dy, progress);
      if (this.nextPos()) {
        this.frame++;
        if (this.frame == this.tps) {
          this.frame = 0;
          setTimeout(() => {
            this.each(callback, complate);
          }, 0);
        } else {
          this.each(callback, complate);
        }
      } else {
        this.x = 0;
        this.y = 0;
        complate();
      }
    });
  }
  eachRand(count, callback, complate) {
    if (this.countBegin < count) {
      this.countBegin = count;
    }
    this.promise = new Promise((resolve, reject) => {
      if (this.pause) {
        this.pauseContent = () => {
          resolve(this.getData());
        };
      } else {
        resolve(this.getData());
      }
    }).then((data) => {
      let dx = this.x / this.size;
      let dy = this.y / this.size;
      let progress = (1 - count / this.countBegin) * 100;
      callback(data, dx, dy, progress);
      if (count > 0) {
        this.nextRandPos();
        this.frame++;
        if (this.frame == this.tps) {
          this.frame = 0;
          setTimeout(() => {
            this.eachRand(count - 1, callback, complate);
          }, 0);
        } else {
          this.eachRand(count - 1, callback, complate);
        }
      } else {
        complate();
        this.countBegin = 0;
        this.x = 0;
        this.y = this.size;
      }
    });
  }
}

export default Canvas;

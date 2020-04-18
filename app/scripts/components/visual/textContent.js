class TextContent {
  constructor(id, opts) {
    this.opts = {
      prefix: "",
      around: false,
      ...opts,
    };
    this.el = document.getElementById(id);
    if (document.getElementById(id + "-visual")) {
      this.visual = document.getElementById(id + "-visual");
    }
  }
  visualUpdate(val){
    if(this.visual){
      this.visual.style.width = val+'%';
    }
  }
  update(text) {
    let val = "";
    if (Array.isArray(text)) {
      text.forEach((item) => {
        val += this.around(item) + " ";
      });
    } else {
      val = this.around(text);
    }
    this.visualUpdate(val);
    val += this.opts.prefix;
    this.el.innerHTML = val;
  }
  around(x) {
    if (this.opts.around) {
      return Math.round(x * 100) / 100;
    } else {
      return x;
    }
  }
}
export default TextContent;

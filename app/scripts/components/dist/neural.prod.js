"use strict";function _defineProperties(e,t){for(var s=0;s<t.length;s++){var r=t[s];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,s){return t&&_defineProperties(e.prototype,t),s&&_defineProperties(e,s),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Weights=exports.NeuralsLayer=void 0;var Neural=function e(t,s){_classCallCheck(this,e),this.index=t,this._val=s},NeuralsLayer=function(){function t(e){_classCallCheck(this,t),this.lenght=e,this.neurals=[],this.createNeurals()}return _createClass(t,[{key:"createNeurals",value:function(){for(var e=0;e<this.lenght;e++)this.neurals.push(new Neural(e))}}]),t}();exports.NeuralsLayer=NeuralsLayer;var Weights=function(){function s(e,t){_classCallCheck(this,s),this.base=[],this.li=e,this.lo=t,this.setBase()}return _createClass(s,[{key:"setBase",value:function(){for(var e=0;e<this.li.lenght;e++){this.base.push([]);for(var t=0;t<this.lo.lenght;t++)this.base[e].push(this.getRand())}}},{key:"getRand",value:function(){return Math.random()-.5}}]),s}();exports.Weights=Weights;
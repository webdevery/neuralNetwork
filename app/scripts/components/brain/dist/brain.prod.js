"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _details=require("./details.js");function ownKeys(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(r);e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})),t.push.apply(t,a)}return t}function _objectSpread(r){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(t,!0).forEach(function(e){_defineProperty(r,e,t[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):ownKeys(t).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(t,e))})}return r}function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var a=r[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),e}var Learning=function(){function r(e){_classCallCheck(this,r),this.kLearning=e,this.summError=0}return _createClass(r,[{key:"forWards",value:function(e,r,t){for(var a=r.x,s=r.y,n=0;n<s;){for(var i=t.neurals[n].val=0;i<a;)t.neurals[n].val+=e.neurals[i].val*r.base[i][n],i++;t.neurals[n].val=this.funcLearn(t.neurals[n].val),n++}}},{key:"fixOutError",value:function(e,r){for(var t=e.length,a=0;a<t;)e.neurals[a].error=r[a]-e.neurals[a].val,a++}},{key:"findError",value:function(e,r,t){for(var a=r.x-1,s=r.y,n=0;n<a;){for(var i=e.neurals[n].error=0;i<s;)e.neurals[n].error+=t.neurals[i].error*r.base[n][i],i++;this.summError+=Math.abs(e.neurals[n].error*e.neurals[n].error)/2,n++}}},{key:"backWards",value:function(e,r,t,a){for(var s=r.x,n=r.y,i=0;i<n;){for(var l=0;l<s;)r.base[l][i]=r.base[l][i]+a*t.neurals[i].error*this.proizv(t.neurals[i].val)*e.neurals[l].val,l++;i++}}},{key:"getError",value:function(){var e=this.summError;return this.summError=0,e}},{key:"funcLearn",value:function(e){return 2/(1+Math.exp(-e))-1}},{key:"proizv",value:function(e){return.5*(1+e)*(1-e)}}]),r}(),Brain=function(){function r(e){_classCallCheck(this,r),this.opts=_objectSpread({kLearning:.5,offset:!1},e),this.learning=new Learning(this.opts.kLearning),this.layers=[],this.weights=[],this.init()}return _createClass(r,[{key:"init",value:function(){var a=this;this.opts.layers.forEach(function(e,r){var t=e;a.layers.push(new _details.NeuralsLayer(t))});for(var e=1;e<this.layers.length;e++)this.weights.push(new _details.Weights(this.layers[e-1],this.layers[e],this.opts.offset))}},{key:"learn",value:function(e,r){this.layers[0].setData(e);for(var t=1;t<this.layers.length;t++)this.learning.forWards(this.layers[t-1],this.weights[t-1],this.layers[t]);this.learning.fixOutError(this.layers[this.layers.length-1],r);for(var a=this.layers.length-1;0<a;a--)this.learning.findError(this.layers[a-1],this.weights[a-1],this.layers[a]);for(var s=this.layers.length-1;0<s;s--)this.learning.backWards(this.layers[s-1],this.weights[s-1],this.layers[s],this.learning.kLearning);return this.learning.getError()}},{key:"read",value:function(e){this.layers[0].setData(e);for(var r=1;r<this.layers.length;r++)this.learning.forWards(this.layers[r-1],this.weights[r-1],this.layers[r]);return this.layers[this.layers.length-1].getData()}},{key:"load",value:function(){}}]),r}(),_default=Brain;exports.default=_default;
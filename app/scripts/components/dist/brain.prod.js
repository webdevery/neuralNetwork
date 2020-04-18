"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _neuralComponents=require("./neuralComponents.js");function ownKeys(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})),t.push.apply(t,n)}return t}function _objectSpread(r){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(t,!0).forEach(function(e){_defineProperty(r,e,t[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):ownKeys(t).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(t,e))})}return r}function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),e}var Learning=function(){function r(e){_classCallCheck(this,r),this.kLearning=e,this.summError=0}return _createClass(r,[{key:"forWards",value:function(e,r,t){for(var n=r.x,a=r.y,s=0;s<a;){for(var i=t.neurals[s].val=0;i<n;)t.neurals[s].val+=e.neurals[i].val*r.base[i][s],i++;t.neurals[s].val=this.funcLearn(t.neurals[s].val),s++}}},{key:"fixOutError",value:function(e,r){for(var t=e.length,n=0;n<t;)e.neurals[n].error=r[n]-e.neurals[n].val,n++}},{key:"findError",value:function(e,r,t){for(var n=r.x-1,a=r.y,s=0;s<n;){for(var i=e.neurals[s].error=0;i<a;)e.neurals[s].error+=t.neurals[i].error*r.base[s][i],i++;this.summError+=Math.abs(e.neurals[s].error*e.neurals[s].error)/2,s++}}},{key:"backWards",value:function(e,r,t,n){for(var a=r.x,s=r.y,i=0;i<s;){for(var l=0;l<a;)r.base[l][i]=r.base[l][i]+n*t.neurals[i].error*this.proizv(t.neurals[i].val)*e.neurals[l].val,l++;i++}}},{key:"funcLearn",value:function(e){return 2/(1+Math.exp(-e))-1}},{key:"proizv",value:function(e){return.5*(1+e)*(1-e)}}]),r}(),Brain=function(){function r(e){_classCallCheck(this,r),this.opts=_objectSpread({kLearning:.5,offset:!1},e),this.learning=new Learning(this.opts.kLearning),this.layers=[],this.weights=[],this.init()}return _createClass(r,[{key:"init",value:function(){var a=this;this.opts.layers.forEach(function(e,r){var t=e,n=!!a.opts.offset&&a.opts.offset[r];a.layers.push(new _neuralComponents.NeuralsLayer(t,n))});for(var e=1;e<this.layers.length;e++)this.weights.push(new _neuralComponents.Weights(this.layers[e-1],this.layers[e]))}},{key:"learn",value:function(e,r){this.layers[0].setData(e);for(var t=1;t<this.layers.length;t++)this.learning.forWards(this.layers[t-1],this.weights[t-1],this.layers[t]);this.learning.fixOutError(this.layers[this.layers.length-1],r);for(var n=this.layers.length-1;0<n;n--)this.learning.findError(this.layers[n-1],this.weights[n-1],this.layers[n]);for(var a=this.layers.length-1;0<a;a--)this.learning.backWards(this.layers[a-1],this.weights[a-1],this.layers[a],this.learning.kLearning)}},{key:"read",value:function(e){this.layers[0].setData(e);for(var r=1;r<this.layers.length;r++)this.learning.forWards(this.layers[r-1],this.weights[r-1],this.layers[r]);return this.layers[this.layers.length-1].getData()}}]),r}(),_default=Brain;exports.default=_default;
"use strict";function ownKeys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(r,!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var TextContent=function(){function r(e,t){_classCallCheck(this,r),this.opts=_objectSpread({prefix:"",around:!1},t),this.el=document.getElementById(e),document.getElementById(e+"-visual")&&(this.visual=document.getElementById(e+"-visual"))}return _createClass(r,[{key:"visualUpdate",value:function(e){this.visual&&(this.visual.style.width=e+"%")}},{key:"update",value:function(e){var t=this,r="";Array.isArray(e)?e.forEach(function(e){r+=t.around(e)+" "}):r=this.around(e),this.visualUpdate(r),r+=this.opts.prefix,this.el.innerHTML=r}},{key:"around",value:function(e){return this.opts.around?Math.round(100*e)/100:e}}]),r}(),_default=TextContent;exports.default=_default;
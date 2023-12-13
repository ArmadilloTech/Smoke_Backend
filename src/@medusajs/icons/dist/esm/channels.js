/**
 * @medusajs/icons v1.0.1 - MIT
 */

import * as React from 'react';

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const Channels = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { color = "currentColor" } = _b, props = __objRest(_b, ["color"]);
    return /* @__PURE__ */ React.createElement(
      "svg",
      __spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: 20,
        height: 20,
        fill: "none",
        ref
      }, props),
      /* @__PURE__ */ React.createElement(
        "path",
        {
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 1.5,
          d: "M14.719 5.875a1.687 1.687 0 1 0 0-3.375 1.687 1.687 0 0 0 0 3.375ZM14.719 11.688a1.687 1.687 0 1 0 0-3.375 1.687 1.687 0 0 0 0 3.374ZM4.594 11.688a1.687 1.687 0 1 0 0-3.375 1.687 1.687 0 0 0 0 3.374ZM14.719 17.5a1.687 1.687 0 1 0 0-3.375 1.687 1.687 0 0 0 0 3.375Z"
        }
      ),
      /* @__PURE__ */ React.createElement(
        "path",
        {
          stroke: color,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 1.5,
          d: "M13.03 4.188h-1.874a1.5 1.5 0 0 0-1.5 1.5v8.625a1.5 1.5 0 0 0 1.5 1.5h1.875M13.03 10H6.28"
        }
      )
    );
  }
);
Channels.displayName = "Channels";

export { Channels as default };
//# sourceMappingURL=channels.js.map

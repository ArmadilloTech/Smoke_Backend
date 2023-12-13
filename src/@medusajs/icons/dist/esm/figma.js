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
const Figma = React.forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ React.createElement(
      "svg",
      __spreadValues({
        xmlns: "http://www.w3.org/2000/svg",
        width: 20,
        height: 20,
        fill: "none",
        ref
      }, props),
      /* @__PURE__ */ React.createElement("g", { clipPath: "url(#a)" }, /* @__PURE__ */ React.createElement(
        "path",
        {
          fill: "#1ABCFE",
          d: "M10 10a2.97 2.97 0 1 1 5.939 0A2.97 2.97 0 0 1 10 10Z"
        }
      ), /* @__PURE__ */ React.createElement(
        "path",
        {
          fill: "#0ACF83",
          d: "M4.061 15.939a2.97 2.97 0 0 1 2.97-2.97H10v2.97a2.97 2.97 0 1 1-5.94 0Z"
        }
      ), /* @__PURE__ */ React.createElement(
        "path",
        {
          fill: "#FF7262",
          d: "M10 1.092V7.03h2.97a2.97 2.97 0 1 0 0-5.94H10Z"
        }
      ), /* @__PURE__ */ React.createElement(
        "path",
        {
          fill: "#F24E1E",
          d: "M4.061 4.061a2.97 2.97 0 0 0 2.97 2.97H10V1.09H7.03a2.97 2.97 0 0 0-2.97 2.97Z"
        }
      ), /* @__PURE__ */ React.createElement(
        "path",
        {
          fill: "#A259FF",
          d: "M4.061 10a2.97 2.97 0 0 0 2.97 2.97H10V7.03H7.03A2.97 2.97 0 0 0 4.06 10Z"
        }
      )),
      /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "a" }, /* @__PURE__ */ React.createElement("path", { fill: "#fff", d: "M4 1h12v18H4z" })))
    );
  }
);
Figma.displayName = "Figma";

export { Figma as default };
//# sourceMappingURL=figma.js.map

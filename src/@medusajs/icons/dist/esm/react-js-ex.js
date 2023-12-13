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
const ReactJsEx = React.forwardRef(
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
          fill: color,
          fillRule: "evenodd",
          d: "M15 1H5a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4Zm-5 10.208a1.208 1.208 0 1 0 0-2.416 1.208 1.208 0 0 0 0 2.416ZM8.065 8.864c.218-.377.444-.738.674-1.08a18.224 18.224 0 0 1 2.545 0 18.235 18.235 0 0 1 1.273 2.204 18.216 18.216 0 0 1-1.273 2.204 18.18 18.18 0 0 1-2.545 0 18.224 18.224 0 0 1-1.272-2.204c.18-.37.38-.747.598-1.124Zm-.866-.5c.086-.15.174-.296.262-.441-.27.04-.532.087-.784.14.08.244.17.494.271.749.081-.15.165-.299.251-.448Zm2.813-1.624a19.6 19.6 0 0 0-.513.007c.17-.215.341-.418.513-.61.171.192.342.395.513.61-.17-.005-.34-.007-.513-.007Zm-1.825.087c.366-.514.745-.986 1.127-1.41a8.816 8.816 0 0 0-.48-.42c-.513-.417-.978-.686-1.366-.811-.387-.126-.641-.092-.805.002-.163.094-.32.298-.404.696-.086.399-.086.936.02 1.59.031.2.073.408.124.624.557-.119 1.156-.21 1.784-.271Zm3.65 0a15.989 15.989 0 0 0-1.127-1.41c.161-.152.321-.292.479-.42.513-.417.979-.686 1.366-.811.388-.126.642-.092.805.002.164.094.32.298.405.696.085.398.085.936-.02 1.589-.032.2-.073.41-.124.625a15.973 15.973 0 0 0-1.784-.271Zm2.896-.196c-.037.23-.085.469-.143.714.242.072.472.15.69.233.684.261 1.272.585 1.699.97.425.384.73.87.73 1.44s-.305 1.056-.73 1.44c-.427.385-1.015.709-1.7.97a9.9 9.9 0 0 1-.689.233c.058.245.106.483.143.714.116.723.13 1.394.01 1.956-.12.56-.389 1.068-.883 1.353-.493.285-1.067.264-1.613.087-.546-.176-1.12-.524-1.689-.986a9.875 9.875 0 0 1-.546-.48 9.813 9.813 0 0 1-.547.48c-.568.462-1.143.81-1.689.986-.546.177-1.119.198-1.613-.087-.494-.285-.762-.792-.882-1.353-.12-.562-.106-1.233.01-1.957.037-.23.084-.468.142-.713a9.842 9.842 0 0 1-.688-.233c-.685-.261-1.273-.585-1.7-.97-.426-.384-.73-.87-.73-1.44s.304-1.056.73-1.44c.427-.385 1.015-.709 1.7-.97.217-.083.447-.161.688-.233a9.846 9.846 0 0 1-.142-.714c-.116-.723-.13-1.395-.01-1.956.12-.561.388-1.068.882-1.353.494-.285 1.067-.264 1.613-.088.546.177 1.12.525 1.69.987.18.147.363.307.546.48.183-.173.365-.333.546-.48.569-.462 1.143-.81 1.69-.987.545-.176 1.119-.197 1.612.088.494.285.763.792.883 1.353.12.561.106 1.233-.01 1.956Zm-2.17 1.292c.27.04.532.087.784.14-.08.244-.171.494-.272.749a19.867 19.867 0 0 0-.513-.89Zm1.756.384a15.975 15.975 0 0 1-.657 1.681c.261.574.481 1.139.657 1.68.212-.063.414-.132.604-.204.618-.236 1.083-.505 1.385-.778.303-.272.401-.51.401-.698 0-.189-.098-.426-.4-.699-.303-.272-.768-.541-1.386-.777a8.818 8.818 0 0 0-.604-.205Zm-1.494 3.305c.086-.15.17-.299.25-.448.1.255.191.505.272.75-.252.052-.514.098-.785.139.089-.145.176-.292.263-.441Zm-.988 1.537c.628-.06 1.226-.152 1.784-.271.05.216.092.424.124.625.105.653.105 1.19.02 1.589-.085.398-.241.601-.405.696-.163.094-.417.127-.805.002-.387-.125-.853-.394-1.366-.811a8.836 8.836 0 0 1-.48-.42c.382-.424.761-.896 1.128-1.41Zm-1.312.08c-.17.215-.342.418-.513.61a14.164 14.164 0 0 1-.513-.61 19.385 19.385 0 0 0 1.026 0Zm-3.326-1.617c.086.15.174.296.262.441-.27-.04-.532-.087-.784-.14.08-.244.17-.494.271-.749.081.15.165.299.25.448Zm.988 1.537a15.974 15.974 0 0 1-1.784-.271c-.051.216-.093.424-.125.625-.104.653-.104 1.19-.02 1.588.086.399.242.602.405.697.164.094.418.127.806.002.387-.125.853-.394 1.366-.811.157-.128.317-.269.479-.42-.382-.424-.76-.896-1.127-1.41ZM5.1 11.464c.19.072.391.14.604.205a15.97 15.97 0 0 1 .656-1.681 15.972 15.972 0 0 1-.656-1.68 8.813 8.813 0 0 0-.604.204c-.618.236-1.083.505-1.385.777-.303.273-.401.51-.401.699 0 .189.098.426.4.698.303.273.768.542 1.386.778Z",
          clipRule: "evenodd"
        }
      )
    );
  }
);
ReactJsEx.displayName = "ReactJsEx";

export { ReactJsEx as default };
//# sourceMappingURL=react-js-ex.js.map

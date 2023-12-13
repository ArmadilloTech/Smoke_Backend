"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kbd = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const clx_1 = require("../../utils/clx");
const Kbd = ({ children, className, ...props }) => {
    return (React.createElement("kbd", { ...props, className: (0, clx_1.clx)("bg-ui-tag-neutral-bg text-ui-tag-neutral-text border-ui-tag-neutral-border min-w-5 inline-flex h-5 w-fit items-center justify-center rounded-md border px-1", "txt-compact-xsmall-plus", className) }, children));
};
exports.Kbd = Kbd;
//# sourceMappingURL=kbd.js.map
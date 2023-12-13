"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioGroup = void 0;
const tslib_1 = require("tslib");
const Primitives = tslib_1.__importStar(require("@radix-ui/react-radio-group"));
const React = tslib_1.__importStar(require("react"));
const clx_1 = require("../../utils/clx");
const Root = React.forwardRef(({ className, ...props }, ref) => {
    return (React.createElement(Primitives.Root, { className: (0, clx_1.clx)("grid gap-2", className), ...props, ref: ref }));
});
Root.displayName = "RadioGroup.Root";
const Item = React.forwardRef(({ className, ...props }, ref) => {
    return (React.createElement(Primitives.Item, { ref: ref, className: (0, clx_1.clx)("group relative flex h-5 w-5 items-center justify-center outline-none", className), ...props },
        React.createElement("div", { className: "shadow-borders-base-with-shadow group-hover:shadow-borders-strong-with-shadow bg-ui-bg-base group-data-[state=checked]:bg-ui-bg-interactive group-data-[state=checked]:shadow-borders-interactive group-focus:!shadow-borders-interactive-with-focus group-disabled:!bg-ui-bg-disabled group-disabled:!shadow-borders-base flex h-[14px] w-[14px] items-center justify-center rounded-full transition-all" },
            React.createElement(Primitives.Indicator, { className: "flex items-center justify-center" },
                React.createElement("div", { className: (0, clx_1.clx)("bg-ui-bg-base shadow-details-contrast-on-bg-interactive group-disabled:bg-ui-fg-disabled h-1.5 w-1.5 rounded-full group-disabled:shadow-none") })))));
});
Item.displayName = "RadioGroup.Item";
const RadioGroup = Object.assign(Root, { Item });
exports.RadioGroup = RadioGroup;
//# sourceMappingURL=radio-group.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const tslib_1 = require("tslib");
const react_slot_1 = require("@radix-ui/react-slot");
const class_variance_authority_1 = require("class-variance-authority");
const React = tslib_1.__importStar(require("react"));
const clx_1 = require("../../utils/clx");
const textVariants = (0, class_variance_authority_1.cva)("", {
    variants: {
        size: {
            xsmall: "txt-compact-xsmall",
            small: "txt-compact-small",
            base: "txt-medium",
            large: "txt-large",
            xlarge: "txt-xlarge",
        },
        weight: {
            regular: "font-normal",
            plus: "font-medium",
        },
        family: {
            sans: "font-sans",
            mono: "font-mono",
        },
    },
    defaultVariants: {
        family: "sans",
        size: "base",
        weight: "regular",
    },
});
const Text = React.forwardRef(({ className, asChild = false, as = "p", size = "base", weight = "regular", family = "sans", children, ...props }, ref) => {
    const Component = asChild ? react_slot_1.Slot : as;
    return (React.createElement(Component, { ref: ref, className: (0, clx_1.clx)(textVariants({ size, weight, family }), className), ...props }, children));
});
exports.Text = Text;
Text.displayName = "Text";
//# sourceMappingURL=text.js.map
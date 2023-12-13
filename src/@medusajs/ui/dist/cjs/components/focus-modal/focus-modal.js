"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FocusModal = void 0;
const tslib_1 = require("tslib");
const icons_1 = require("@medusajs/icons");
const Primitives = tslib_1.__importStar(require("@radix-ui/react-dialog"));
const React = tslib_1.__importStar(require("react"));
const kbd_1 = require("../kbd");
const clx_1 = require("../../utils/clx");
const button_1 = require("../button");
const Root = Primitives.Root;
Root.displayName = "FocusModal.Root";
const Trigger = Primitives.Trigger;
Trigger.displayName = "FocusModal.Trigger";
const Portal = ({ className, ...props }) => {
    return React.createElement(Primitives.DialogPortal, { className: (0, clx_1.clx)(className), ...props });
};
Portal.displayName = "FocusModal.Portal";
const Overlay = React.forwardRef(({ className, ...props }, ref) => {
    return (React.createElement(Primitives.Overlay, { ref: ref, className: (0, clx_1.clx)("fixed inset-0 z-50", 
        // "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",  // Re-enable when Admin UI has been cleaned up
        className), ...props }));
});
Overlay.displayName = "FocusModal.Overlay";
const Content = React.forwardRef(({ className, ...props }, ref) => {
    return (React.createElement(Portal, null,
        React.createElement(Overlay, null),
        React.createElement(Primitives.Content, { ref: ref, className: (0, clx_1.clx)("bg-ui-bg-base shadow-elevation-modal fixed inset-2 z-50 flex flex-col rounded-lg border focus:outline-none", 
            // "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200",  // Re-enable when Admin UI has been cleaned up
            className), ...props })));
});
Content.displayName = "FocusModal.Content";
const Header = ({ children, className, ...props }) => {
    return (React.createElement("div", { className: (0, clx_1.clx)("border-ui-border-base flex items-start justify-between gap-x-4 border-b p-4", className), ...props },
        React.createElement("div", { className: "flex items-center gap-x-2" },
            React.createElement(Primitives.Close, { asChild: true },
                React.createElement(button_1.Button, { variant: "transparent", size: "small", format: "icon" },
                    React.createElement(icons_1.XMark, null))),
            React.createElement(kbd_1.Kbd, null, "esc")),
        React.createElement("div", null, children)));
};
Header.displayName = "FocusModal.Header";
const Body = ({ className, ...props }) => {
    return React.createElement("div", { className: (0, clx_1.clx)("flex-1", className), ...props });
};
Body.displayName = "FocusModal.Body";
const FocusModal = Object.assign(Root, {
    Trigger,
    Content,
    Header,
    Body,
});
exports.FocusModal = FocusModal;
//# sourceMappingURL=focus-modal.js.map
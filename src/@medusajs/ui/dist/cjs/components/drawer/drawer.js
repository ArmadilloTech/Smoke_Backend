"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drawer = void 0;
const tslib_1 = require("tslib");
const icons_1 = require("@medusajs/icons");
const Primitives = tslib_1.__importStar(require("@radix-ui/react-dialog"));
const React = tslib_1.__importStar(require("react"));
const button_1 = require("../button");
const heading_1 = require("../heading");
const clx_1 = require("../../utils/clx");
const kbd_1 = require("../kbd");
const text_1 = require("../text");
const Root = Primitives.Root;
Root.displayName = "Drawer.Root";
const Trigger = Primitives.Trigger;
Trigger.displayName = "Drawer.Trigger";
const Close = Primitives.Close;
Close.displayName = "Drawer.Close";
const Portal = Primitives.Portal;
Portal.displayName = "Drawer.Portal";
const Overlay = React.forwardRef(({ className, ...props }, ref) => {
    return (React.createElement(Primitives.Overlay, { ref: ref, className: (0, clx_1.clx)("fixed inset-0 z-50", className), ...props }));
});
Overlay.displayName = "Drawer.Overlay";
const Content = React.forwardRef(({ className, ...props }, ref) => {
    return (React.createElement(Portal, null,
        React.createElement(Overlay, null),
        React.createElement(Primitives.Content, { ref: ref, className: (0, clx_1.clx)("bg-ui-bg-base shadow-elevation-modal border-ui-border-base fixed inset-y-2 right-2 z-50 flex w-full max-w-[560px] flex-1 flex-col rounded-lg border focus:outline-none", 
            // "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-1/2 data-[state=open]:slide-in-from-right-1/2 duration-200",
            className), ...props })));
});
Content.displayName = "Drawer.Content";
const Header = ({ children, className, ...props }) => {
    return (React.createElement("div", { className: "border-ui-border-base flex items-start justify-between gap-x-4 border-b px-8 py-6", ...props },
        React.createElement("div", { className: (0, clx_1.clx)("flex flex-col gap-y-1", className) }, children),
        React.createElement("div", { className: "flex items-center gap-x-2" },
            React.createElement(kbd_1.Kbd, null, "esc"),
            React.createElement(Close, { asChild: true },
                React.createElement(button_1.Button, { variant: "transparent", size: "small", format: "icon" },
                    React.createElement(icons_1.XMark, null))))));
};
Header.displayName = "Drawer.Header";
const Body = ({ className, ...props }) => {
    return React.createElement("div", { className: (0, clx_1.clx)("flex-1 px-8 pb-16 pt-6", className), ...props });
};
Body.displayName = "Drawer.Body";
const Footer = ({ className, ...props }) => {
    return (React.createElement("div", { className: (0, clx_1.clx)("border-ui-border-base flex items-center justify-end space-x-2 overflow-y-scroll border-t px-8 pb-6 pt-4", className), ...props }));
};
Footer.displayName = "Drawer.Footer";
const Title = React.forwardRef(({ className, children, ...props }, ref) => (React.createElement(Primitives.Title, { ref: ref, className: (0, clx_1.clx)(className), asChild: true, ...props },
    React.createElement(heading_1.Heading, { level: "h1" }, children))));
Title.displayName = "Drawer.Title";
const Description = React.forwardRef(({ className, children, ...props }, ref) => (React.createElement(Primitives.Description, { ref: ref, className: (0, clx_1.clx)(className), asChild: true, ...props },
    React.createElement(text_1.Text, null, children))));
Description.displayName = "Drawer.Description";
exports.Drawer = Object.assign(Root, {
    Body,
    Close,
    Content,
    Description,
    Footer,
    Header,
    Title,
    Trigger,
});
//# sourceMappingURL=drawer.js.map
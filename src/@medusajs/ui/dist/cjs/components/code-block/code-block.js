"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlock = void 0;
const tslib_1 = require("tslib");
const copy_1 = require("../copy");
const clx_1 = require("../../utils/clx");
const prism_react_renderer_1 = require("prism-react-renderer");
const react_1 = tslib_1.__importStar(require("react"));
const CodeBlockContext = (0, react_1.createContext)(null);
const useCodeBlockContext = () => {
    const context = (0, react_1.useContext)(CodeBlockContext);
    if (context === null)
        throw new Error("useCodeBlockContext can only be used within a CodeBlockContext");
    return context;
};
const Root = ({ snippets, className, children, ...props }) => {
    const [active, setActive] = (0, react_1.useState)(snippets[0]);
    return (react_1.default.createElement(CodeBlockContext.Provider, { value: { snippets, active, setActive } },
        react_1.default.createElement("div", { className: (0, clx_1.clx)("border-ui-code-border overflow-hidden rounded-lg border", className), ...props }, children)));
};
const HeaderComponent = ({ children, className, hideLabels = false, ...props }) => {
    const { snippets, active, setActive } = useCodeBlockContext();
    return (react_1.default.createElement("div", { className: (0, clx_1.clx)("border-b-ui-code-border bg-ui-code-bg-header flex items-center gap-2 border-b px-4 py-3", className), ...props },
        !hideLabels &&
            snippets.map((snippet) => (react_1.default.createElement("div", { className: (0, clx_1.clx)("text-ui-code-text-subtle txt-compact-small-plus cursor-pointer rounded-full border border-transparent px-3 py-2 transition-all", {
                    "text-ui-code-text-base border-ui-code-border bg-ui-code-bg-base cursor-default": active.label === snippet.label,
                }), key: snippet.label, onClick: () => setActive(snippet) }, snippet.label))),
        children));
};
const Meta = ({ className, ...props }) => {
    return (react_1.default.createElement("div", { className: (0, clx_1.clx)("text-ui-code-text-subtle ml-auto", className), ...props }));
};
const Header = Object.assign(HeaderComponent, { Meta });
const Body = ({ className, hideLineNumbers = false, ...props }) => {
    const { active } = useCodeBlockContext();
    return (react_1.default.createElement("div", { className: (0, clx_1.clx)("bg-ui-code-bg-base relative p-4", className), ...props },
        react_1.default.createElement(copy_1.Copy, { content: active.code, className: "text-ui-code-icon absolute right-4 top-4" }),
        react_1.default.createElement("div", { className: "max-w-[90%]" },
            react_1.default.createElement(prism_react_renderer_1.Highlight, { theme: {
                    ...prism_react_renderer_1.themes.palenight,
                    plain: {
                        color: "rgba(249, 250, 251, 1)",
                        backgroundColor: "#111827",
                    },
                    styles: [
                        {
                            types: ["keyword"],
                            style: {
                                color: "var(--fg-on-color)",
                            },
                        },
                        {
                            types: ["maybe-class-name"],
                            style: {
                                color: "rgb(255, 203, 107)",
                            },
                        },
                        ...prism_react_renderer_1.themes.palenight.styles,
                    ],
                }, code: active.code, language: active.language }, ({ style, tokens, getLineProps, getTokenProps }) => (react_1.default.createElement("pre", { className: "txt-compact-small whitespace-pre-wrap bg-transparent font-mono", style: {
                    ...style,
                    background: "transparent",
                } }, tokens.map((line, i) => (react_1.default.createElement("div", { key: i, ...getLineProps({ line }), className: "flex" },
                !hideLineNumbers && (react_1.default.createElement("span", { className: "text-ui-code-text-subtle" }, i + 1)),
                react_1.default.createElement("div", { className: "pl-4" }, line.map((token, key) => (react_1.default.createElement("span", { key: key, ...getTokenProps({ token }) })))))))))))));
};
const CodeBlock = Object.assign(Root, { Body, Header, Meta });
exports.CodeBlock = CodeBlock;
//# sourceMappingURL=code-block.js.map
"use client";
import { Copy } from "../copy";
import { clx } from "../../utils/clx";
import { Highlight, themes } from "prism-react-renderer";
import React, { createContext, useContext, useState } from "react";
const CodeBlockContext = createContext(null);
const useCodeBlockContext = () => {
    const context = useContext(CodeBlockContext);
    if (context === null)
        throw new Error("useCodeBlockContext can only be used within a CodeBlockContext");
    return context;
};
const Root = ({ snippets, className, children, ...props }) => {
    const [active, setActive] = useState(snippets[0]);
    return (React.createElement(CodeBlockContext.Provider, { value: { snippets, active, setActive } },
        React.createElement("div", { className: clx("border-ui-code-border overflow-hidden rounded-lg border", className), ...props }, children)));
};
const HeaderComponent = ({ children, className, hideLabels = false, ...props }) => {
    const { snippets, active, setActive } = useCodeBlockContext();
    return (React.createElement("div", { className: clx("border-b-ui-code-border bg-ui-code-bg-header flex items-center gap-2 border-b px-4 py-3", className), ...props },
        !hideLabels &&
            snippets.map((snippet) => (React.createElement("div", { className: clx("text-ui-code-text-subtle txt-compact-small-plus cursor-pointer rounded-full border border-transparent px-3 py-2 transition-all", {
                    "text-ui-code-text-base border-ui-code-border bg-ui-code-bg-base cursor-default": active.label === snippet.label,
                }), key: snippet.label, onClick: () => setActive(snippet) }, snippet.label))),
        children));
};
const Meta = ({ className, ...props }) => {
    return (React.createElement("div", { className: clx("text-ui-code-text-subtle ml-auto", className), ...props }));
};
const Header = Object.assign(HeaderComponent, { Meta });
const Body = ({ className, hideLineNumbers = false, ...props }) => {
    const { active } = useCodeBlockContext();
    return (React.createElement("div", { className: clx("bg-ui-code-bg-base relative p-4", className), ...props },
        React.createElement(Copy, { content: active.code, className: "text-ui-code-icon absolute right-4 top-4" }),
        React.createElement("div", { className: "max-w-[90%]" },
            React.createElement(Highlight, { theme: {
                    ...themes.palenight,
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
                        ...themes.palenight.styles,
                    ],
                }, code: active.code, language: active.language }, ({ style, tokens, getLineProps, getTokenProps }) => (React.createElement("pre", { className: "txt-compact-small whitespace-pre-wrap bg-transparent font-mono", style: {
                    ...style,
                    background: "transparent",
                } }, tokens.map((line, i) => (React.createElement("div", { key: i, ...getLineProps({ line }), className: "flex" },
                !hideLineNumbers && (React.createElement("span", { className: "text-ui-code-text-subtle" }, i + 1)),
                React.createElement("div", { className: "pl-4" }, line.map((token, key) => (React.createElement("span", { key: key, ...getTokenProps({ token }) })))))))))))));
};
const CodeBlock = Object.assign(Root, { Body, Header, Meta });
export { CodeBlock };
//# sourceMappingURL=code-block.js.map
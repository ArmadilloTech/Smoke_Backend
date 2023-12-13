import React from "react";
export type CodeSnippet = {
    label: string;
    language: string;
    code: string;
};
type RootProps = {
    snippets: CodeSnippet[];
};
type HeaderProps = {
    hideLabels?: boolean;
};
type BodyProps = {
    hideLineNumbers?: boolean;
};
declare const CodeBlock: (({ snippets, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & RootProps) => React.JSX.Element) & {
    Body: ({ className, hideLineNumbers, ...props }: React.HTMLAttributes<HTMLDivElement> & BodyProps) => React.JSX.Element;
    Header: (({ children, className, hideLabels, ...props }: React.HTMLAttributes<HTMLDivElement> & HeaderProps) => React.JSX.Element) & {
        Meta: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => React.JSX.Element;
    };
    Meta: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => React.JSX.Element;
};
export { CodeBlock };

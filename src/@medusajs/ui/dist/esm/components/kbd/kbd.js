import * as React from "react";
import { clx } from "../../utils/clx";
const Kbd = ({ children, className, ...props }) => {
    return (React.createElement("kbd", { ...props, className: clx("bg-ui-tag-neutral-bg text-ui-tag-neutral-text border-ui-tag-neutral-border min-w-5 inline-flex h-5 w-fit items-center justify-center rounded-md border px-1", "txt-compact-xsmall-plus", className) }, children));
};
export { Kbd };
//# sourceMappingURL=kbd.js.map
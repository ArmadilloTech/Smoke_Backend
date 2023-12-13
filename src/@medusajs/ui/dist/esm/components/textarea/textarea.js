import * as React from "react";
import { clx } from "../../utils/clx";
import { inputBaseStyles } from "../input";
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (React.createElement("textarea", { ref: ref, className: clx(inputBaseStyles, "txt-medium min-h-[70px] w-full rounded-md border px-3 py-[7px]", className), ...props }));
});
Textarea.displayName = "Textarea";
export { Textarea };
//# sourceMappingURL=textarea.js.map
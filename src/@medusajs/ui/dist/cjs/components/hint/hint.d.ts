import { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const Hint: React.ForwardRefExoticComponent<VariantProps<(props?: ({
    variant?: "info" | "error" | null | undefined;
} & ({
    class: import("clsx").ClassValue;
    className?: undefined;
} | {
    class?: undefined;
    className: import("clsx").ClassValue;
} | {
    class?: undefined;
    className?: undefined;
})) | undefined) => string> & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
export { Hint };

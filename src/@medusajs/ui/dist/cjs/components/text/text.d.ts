import { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const textVariants: (props?: ({
    size?: "base" | "large" | "small" | "xlarge" | "xsmall" | null | undefined;
    weight?: "regular" | "plus" | null | undefined;
    family?: "sans" | "mono" | null | undefined;
} & ({
    class: import("clsx").ClassValue;
    className?: undefined;
} | {
    class?: undefined;
    className: import("clsx").ClassValue;
} | {
    class?: undefined;
    className?: undefined;
})) | undefined) => string;
interface TextProps extends React.ComponentPropsWithoutRef<"p">, VariantProps<typeof textVariants> {
    asChild?: boolean;
    as?: "p" | "span" | "div";
}
declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLParagraphElement>>;
export { Text };

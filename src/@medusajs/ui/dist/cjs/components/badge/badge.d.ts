import { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const badgeVariants: (props?: ({
    type?: "rounded" | "default" | "icon" | null | undefined;
    size?: "base" | "large" | "small" | null | undefined;
    color?: "green" | "red" | "blue" | "orange" | "grey" | "purple" | null | undefined;
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
interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">, VariantProps<typeof badgeVariants> {
    asChild?: boolean;
}
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
export { Badge };

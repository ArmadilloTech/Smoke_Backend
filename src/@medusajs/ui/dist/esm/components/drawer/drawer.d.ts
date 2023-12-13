import * as Primitives from "@radix-ui/react-dialog";
import * as React from "react";
export declare const Drawer: React.FC<Primitives.DialogProps> & {
    Body: {
        ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
        displayName: string;
    };
    Close: React.ForwardRefExoticComponent<Primitives.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
    Content: React.ForwardRefExoticComponent<Omit<Primitives.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Description: React.ForwardRefExoticComponent<Omit<Primitives.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
    Footer: {
        ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
        displayName: string;
    };
    Header: {
        ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
        displayName: string;
    };
    Title: React.ForwardRefExoticComponent<Omit<Primitives.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
    Trigger: React.ForwardRefExoticComponent<Primitives.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
};

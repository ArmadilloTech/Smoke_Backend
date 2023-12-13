import * as Primitives from "@radix-ui/react-dialog";
import * as React from "react";
declare const FocusModal: React.FC<Primitives.DialogProps> & {
    Trigger: React.ForwardRefExoticComponent<Primitives.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
    Content: React.ForwardRefExoticComponent<Omit<Primitives.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Header: {
        ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
        displayName: string;
    };
    Body: {
        ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
        displayName: string;
    };
};
export { FocusModal };

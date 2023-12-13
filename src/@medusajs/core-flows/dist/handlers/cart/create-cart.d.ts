import { CartDTO } from "@medusajs/types";
import { WorkflowArguments } from "@medusajs/workflows-sdk";
declare enum Aliases {
    SalesChannel = "SalesChannel",
    Addresses = "addresses",
    Customer = "customer",
    Region = "region",
    Context = "context"
}
type HandlerInputData = {
    sales_channel: {
        sales_channel_id?: string;
    };
    addresses: {
        shipping_address_id: string;
        billing_address_id: string;
    };
    customer: {
        customer_id?: string;
        email?: string;
    };
    region: {
        region_id: string;
    };
    context: {
        context: Record<any, any>;
    };
};
type HandlerOutputData = {
    cart: CartDTO;
};
export declare function createCart({ container, context, data, }: WorkflowArguments<HandlerInputData>): Promise<HandlerOutputData>;
export declare namespace createCart {
    var aliases: typeof Aliases;
}
export {};

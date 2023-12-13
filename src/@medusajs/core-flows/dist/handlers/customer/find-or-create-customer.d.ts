import { WorkflowArguments } from "@medusajs/workflows-sdk";
type CustomerDTO = {
    customer_id?: string;
    email?: string;
};
type HandlerInputData = {
    customer: {
        customer_id?: string;
        email?: string;
    };
};
declare enum Aliases {
    Customer = "customer"
}
export declare function findOrCreateCustomer({ container, context, data, }: WorkflowArguments<HandlerInputData>): Promise<CustomerDTO>;
export declare namespace findOrCreateCustomer {
    var aliases: typeof Aliases;
}
export {};

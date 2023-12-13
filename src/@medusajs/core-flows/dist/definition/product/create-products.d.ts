import { TransactionStepsDefinition } from "@medusajs/orchestration";
import { ProductTypes, WorkflowTypes } from "@medusajs/types";
export declare enum CreateProductsActions {
    prepare = "prepare",
    createProducts = "createProducts",
    attachToSalesChannel = "attachToSalesChannel",
    attachShippingProfile = "attachShippingProfile",
    createPrices = "createPrices",
    createInventoryItems = "createInventoryItems",
    attachInventoryItems = "attachInventoryItems"
}
export declare const workflowSteps: TransactionStepsDefinition;
export declare const createProducts: <TDataOverride = undefined, TResultOverride = undefined>(container?: import("@medusajs/types").MedusaContainer | {
    __joinerConfig: import("@medusajs/types").ModuleJoinerConfig;
    __definition: import("@medusajs/types").ModuleDefinition;
}[] | undefined) => Omit<import("@medusajs/orchestration").LocalWorkflow, "run"> & {
    run: (args?: import("@medusajs/workflows-sdk").FlowRunOptions<TDataOverride extends undefined ? WorkflowTypes.ProductWorkflow.CreateProductsWorkflowInputDTO : TDataOverride> | undefined) => Promise<import("@medusajs/workflows-sdk").WorkflowResult<TResultOverride extends undefined ? ProductTypes.ProductDTO[] : TResultOverride>>;
};

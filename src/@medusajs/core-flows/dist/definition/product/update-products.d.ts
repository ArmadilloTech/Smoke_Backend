import { ProductTypes, WorkflowTypes } from "@medusajs/types";
import { TransactionStepsDefinition } from "@medusajs/orchestration";
export declare enum UpdateProductsActions {
    prepare = "prepare",
    updateProducts = "updateProducts",
    attachSalesChannels = "attachSalesChannels",
    detachSalesChannels = "detachSalesChannels",
    createInventoryItems = "createInventoryItems",
    attachInventoryItems = "attachInventoryItems",
    detachInventoryItems = "detachInventoryItems",
    removeInventoryItems = "removeInventoryItems"
}
export declare const updateProductsWorkflowSteps: TransactionStepsDefinition;
export declare const updateProducts: <TDataOverride = undefined, TResultOverride = undefined>(container?: import("@medusajs/types").MedusaContainer | {
    __joinerConfig: import("@medusajs/types").ModuleJoinerConfig;
    __definition: import("@medusajs/types").ModuleDefinition;
}[] | undefined) => Omit<import("@medusajs/orchestration").LocalWorkflow, "run"> & {
    run: (args?: import("@medusajs/workflows-sdk").FlowRunOptions<TDataOverride extends undefined ? WorkflowTypes.ProductWorkflow.UpdateProductsWorkflowInputDTO : TDataOverride> | undefined) => Promise<import("@medusajs/workflows-sdk").WorkflowResult<TResultOverride extends undefined ? ProductTypes.ProductDTO[] : TResultOverride>>;
};

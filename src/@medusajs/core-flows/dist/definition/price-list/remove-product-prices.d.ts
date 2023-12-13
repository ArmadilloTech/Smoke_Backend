import { WorkflowTypes } from "@medusajs/types";
export declare enum RemoveProductPricesActions {
    prepare = "prepare",
    removePriceListPriceSetPrices = "removePriceListPriceSetPrices"
}
export declare const removePriceListProductPrices: <TDataOverride = undefined, TResultOverride = undefined>(container?: import("@medusajs/types").MedusaContainer | {
    __joinerConfig: import("@medusajs/types").ModuleJoinerConfig;
    __definition: import("@medusajs/types").ModuleDefinition;
}[] | undefined) => Omit<import("@medusajs/orchestration").LocalWorkflow, "run"> & {
    run: (args?: import("@medusajs/workflows-sdk").FlowRunOptions<TDataOverride extends undefined ? WorkflowTypes.PriceListWorkflow.RemovePriceListProductsWorkflowInputDTO : TDataOverride> | undefined) => Promise<import("@medusajs/workflows-sdk").WorkflowResult<TResultOverride extends undefined ? string[] : TResultOverride>>;
};

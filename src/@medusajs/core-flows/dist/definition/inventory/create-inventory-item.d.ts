import { InventoryTypes, WorkflowTypes } from "@medusajs/types";
export declare enum CreateInventoryItemActions {
    prepare = "prepare",
    createInventoryItems = "createInventoryItems"
}
export declare const createInventoryItems: <TDataOverride = undefined, TResultOverride = undefined>(container?: import("@medusajs/types").MedusaContainer | {
    __joinerConfig: import("@medusajs/types").ModuleJoinerConfig;
    __definition: import("@medusajs/types").ModuleDefinition;
}[] | undefined) => Omit<import("@medusajs/orchestration").LocalWorkflow, "run"> & {
    run: (args?: import("@medusajs/workflows-sdk").FlowRunOptions<TDataOverride extends undefined ? WorkflowTypes.InventoryWorkflow.CreateInventoryItemsWorkflowInputDTO : TDataOverride> | undefined) => Promise<import("@medusajs/workflows-sdk").WorkflowResult<TResultOverride extends undefined ? {
        tag: string;
        inventoryItem: InventoryTypes.InventoryItemDTO;
    }[] : TResultOverride>>;
};

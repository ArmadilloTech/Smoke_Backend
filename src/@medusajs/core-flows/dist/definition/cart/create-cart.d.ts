import { CartWorkflow } from "@medusajs/types";
type CreateCartWorkflowOutput = Record<any, any>;
export declare const createCart: <TDataOverride = undefined, TResultOverride = undefined>(container?: import("@medusajs/types").MedusaContainer | {
    __joinerConfig: import("@medusajs/types").ModuleJoinerConfig;
    __definition: import("@medusajs/types").ModuleDefinition;
}[] | undefined) => Omit<import("@medusajs/orchestration").LocalWorkflow, "run"> & {
    run: (args?: import("@medusajs/workflows-sdk").FlowRunOptions<TDataOverride extends undefined ? CartWorkflow.CreateCartWorkflowInputDTO : TDataOverride> | undefined) => Promise<import("@medusajs/workflows-sdk").WorkflowResult<TResultOverride extends undefined ? CreateCartWorkflowOutput : TResultOverride>>;
};
export {};

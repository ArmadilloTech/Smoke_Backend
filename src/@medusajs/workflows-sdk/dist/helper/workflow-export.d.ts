import { DistributedTransaction, LocalWorkflow, TransactionStepError } from "@medusajs/orchestration";
import { Context, LoadedModule, MedusaContainer } from "@medusajs/types";
export type FlowRunOptions<TData = unknown> = {
    input?: TData;
    context?: Context;
    resultFrom?: string | string[];
    throwOnError?: boolean;
};
export type WorkflowResult<TResult = unknown> = {
    errors: TransactionStepError[];
    transaction: DistributedTransaction;
    result: TResult;
};
export declare const exportWorkflow: <TData = unknown, TResult = unknown>(workflowId: string, defaultResult?: string, dataPreparation?: ((data: TData) => Promise<unknown>) | undefined) => <TDataOverride = undefined, TResultOverride = undefined>(container?: LoadedModule[] | MedusaContainer) => Omit<LocalWorkflow, "run"> & {
    run: (args?: FlowRunOptions<TDataOverride extends undefined ? TData : TDataOverride> | undefined) => Promise<WorkflowResult<TResultOverride extends undefined ? TResult : TResultOverride>>;
};

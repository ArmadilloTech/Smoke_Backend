import { Context, LoadedModule, MedusaContainer } from "@medusajs/types";
import { DistributedTransaction, TransactionStepsDefinition } from "../transaction";
import { OrchestratorBuilder } from "../transaction/orchestrator-builder";
import { WorkflowDefinition, WorkflowStepHandler } from "./workflow-manager";
type StepHandler = {
    invoke: WorkflowStepHandler;
    compensate?: WorkflowStepHandler;
};
export declare class LocalWorkflow {
    protected container: MedusaContainer;
    protected workflowId: string;
    protected flow: OrchestratorBuilder;
    protected workflow: WorkflowDefinition;
    protected handlers: Map<string, StepHandler>;
    constructor(workflowId: string, modulesLoaded?: LoadedModule[] | MedusaContainer);
    protected commit(): void;
    getFlow(): TransactionStepsDefinition;
    run(uniqueTransactionId: string, input?: unknown, context?: Context): Promise<DistributedTransaction>;
    registerStepSuccess(idempotencyKey: string, response?: unknown, context?: Context): Promise<DistributedTransaction>;
    registerStepFailure(idempotencyKey: string, error?: Error | any, context?: Context): Promise<DistributedTransaction>;
    addAction(action: string, handler: StepHandler, options?: Partial<TransactionStepsDefinition>): OrchestratorBuilder;
    replaceAction(existingAction: string, action: string, handler: StepHandler, options?: Partial<TransactionStepsDefinition>): OrchestratorBuilder;
    insertActionBefore(existingAction: string, action: string, handler: StepHandler, options?: Partial<TransactionStepsDefinition>): OrchestratorBuilder;
    insertActionAfter(existingAction: string, action: string, handler: StepHandler, options?: Partial<TransactionStepsDefinition>): OrchestratorBuilder;
    appendAction(action: string, to: string, handler: StepHandler, options?: Partial<TransactionStepsDefinition>): OrchestratorBuilder;
    moveAction(actionToMove: string, targetAction: string): OrchestratorBuilder;
    moveAndMergeNextAction(actionToMove: string, targetAction: string): OrchestratorBuilder;
    mergeActions(where: string, ...actions: string[]): OrchestratorBuilder;
    deleteAction(action: string, parentSteps?: any): OrchestratorBuilder;
    pruneAction(action: string): OrchestratorBuilder;
    protected assertHandler(handler: StepHandler, action: string): void | never;
}
export {};

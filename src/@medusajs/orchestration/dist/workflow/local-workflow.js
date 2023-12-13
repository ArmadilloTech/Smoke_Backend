"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalWorkflow = void 0;
const utils_1 = require("@medusajs/utils");
const awilix_1 = require("awilix");
const transaction_1 = require("../transaction");
const orchestrator_builder_1 = require("../transaction/orchestrator-builder");
const workflow_manager_1 = require("./workflow-manager");
class LocalWorkflow {
    constructor(workflowId, modulesLoaded) {
        const globalWorkflow = workflow_manager_1.WorkflowManager.getWorkflow(workflowId);
        if (!globalWorkflow) {
            throw new Error(`Workflow with id "${workflowId}" not found.`);
        }
        this.flow = new orchestrator_builder_1.OrchestratorBuilder(globalWorkflow.flow_);
        this.workflowId = workflowId;
        this.workflow = globalWorkflow;
        this.handlers = new Map(globalWorkflow.handlers_);
        const container = (0, utils_1.createMedusaContainer)();
        // Medusa container
        if (!Array.isArray(modulesLoaded) && modulesLoaded) {
            const cradle = modulesLoaded.cradle;
            for (const key of Object.keys(cradle ?? {})) {
                container.register(key, (0, awilix_1.asValue)(cradle[key]));
            }
        }
        // Array of modules
        else if (modulesLoaded?.length) {
            for (const mod of modulesLoaded) {
                const registrationName = mod.__definition.registrationName;
                container.register(registrationName, (0, awilix_1.asValue)(mod));
            }
        }
        this.container = container;
    }
    commit() {
        const finalFlow = this.flow.build();
        this.workflow = {
            id: this.workflowId,
            flow_: finalFlow,
            orchestrator: new transaction_1.TransactionOrchestrator(this.workflowId, finalFlow),
            handler: workflow_manager_1.WorkflowManager.buildHandlers(this.handlers),
            handlers_: this.handlers,
        };
    }
    getFlow() {
        if (this.flow.hasChanges) {
            this.commit();
        }
        return this.workflow.flow_;
    }
    async run(uniqueTransactionId, input, context) {
        if (this.flow.hasChanges) {
            this.commit();
        }
        const { handler, orchestrator } = this.workflow;
        const transaction = await orchestrator.beginTransaction(uniqueTransactionId, handler(this.container, context), input);
        await orchestrator.resume(transaction);
        return transaction;
    }
    async registerStepSuccess(idempotencyKey, response, context) {
        const { handler, orchestrator } = this.workflow;
        return await orchestrator.registerStepSuccess(idempotencyKey, handler(this.container, context), undefined, response);
    }
    async registerStepFailure(idempotencyKey, error, context) {
        const { handler, orchestrator } = this.workflow;
        return await orchestrator.registerStepFailure(idempotencyKey, error, handler(this.container, context));
    }
    addAction(action, handler, options = {}) {
        this.assertHandler(handler, action);
        this.handlers.set(action, handler);
        return this.flow.addAction(action, options);
    }
    replaceAction(existingAction, action, handler, options = {}) {
        this.assertHandler(handler, action);
        this.handlers.set(action, handler);
        return this.flow.replaceAction(existingAction, action, options);
    }
    insertActionBefore(existingAction, action, handler, options = {}) {
        this.assertHandler(handler, action);
        this.handlers.set(action, handler);
        return this.flow.insertActionBefore(existingAction, action, options);
    }
    insertActionAfter(existingAction, action, handler, options = {}) {
        this.assertHandler(handler, action);
        this.handlers.set(action, handler);
        return this.flow.insertActionAfter(existingAction, action, options);
    }
    appendAction(action, to, handler, options = {}) {
        this.assertHandler(handler, action);
        this.handlers.set(action, handler);
        return this.flow.appendAction(action, to, options);
    }
    moveAction(actionToMove, targetAction) {
        return this.flow.moveAction(actionToMove, targetAction);
    }
    moveAndMergeNextAction(actionToMove, targetAction) {
        return this.flow.moveAndMergeNextAction(actionToMove, targetAction);
    }
    mergeActions(where, ...actions) {
        return this.flow.mergeActions(where, ...actions);
    }
    deleteAction(action, parentSteps) {
        return this.flow.deleteAction(action, parentSteps);
    }
    pruneAction(action) {
        return this.flow.pruneAction(action);
    }
    assertHandler(handler, action) {
        if (!handler?.invoke) {
            throw new Error(`Handler for action "${action}" is missing invoke function.`);
        }
    }
}
exports.LocalWorkflow = LocalWorkflow;
//# sourceMappingURL=local-workflow.js.map
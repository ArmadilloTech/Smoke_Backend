"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkflow = void 0;
const orchestration_1 = require("@medusajs/orchestration");
const helper_1 = require("../../helper");
const helpers_1 = require("./helpers");
const proxy_1 = require("./helpers/proxy");
global[helpers_1.SymbolMedusaWorkflowComposerContext] = null;
/**
 * This function creates a workflow with the provided name and a constructor function.
 * The constructor function builds the workflow from steps created by the {@link createStep} function.
 * The returned workflow is an exported workflow of type {@link ReturnWorkflow}, meaning it's not executed right away. To execute it,
 * invoke the exported workflow, then run its `run` method.
 *
 * @typeParam TData - The type of the input passed to the composer function.
 * @typeParam TResult - The type of the output returned by the composer function.
 * @typeParam THooks - The type of hooks defined in the workflow.
 *
 * @returns The created workflow. You can later execute the workflow by invoking it, then using its `run` method.
 *
 * @example
 * import { createWorkflow } from "@medusajs/workflows-sdk"
 * import { MedusaRequest, MedusaResponse, Product } from "@medusajs/medusa"
 * import {
 *   createProductStep,
 *   getProductStep,
 *   createPricesStep
 * } from "./steps"
 *
 * interface WorkflowInput {
 *  title: string
 * }
 *
 * const myWorkflow = createWorkflow<
 *     WorkflowInput,
 *     Product
 *   >("my-workflow", (input) => {
 *    // Everything here will be executed and resolved later
 *    // during the execution. Including the data access.
 *
 *     const product = createProductStep(input)
 *     const prices = createPricesStep(product)
 *     return getProductStep(product.id)
 *   }
 * )
 *
 * export async function GET(
 *   req: MedusaRequest,
 *   res: MedusaResponse
 * ) {
 *   const { result: product } = await myWorkflow(req.scope)
 *     .run({
 *       input: {
 *         title: "Shirt"
 *       }
 *     })
 *
 *   res.json({
 *     product
 *   })
 * }
 */
function createWorkflow(
/**
 * The name of the workflow.
 */
name, 
/**
 * The constructor function that is executed when the `run` method in {@link ReturnWorkflow} is used.
 * The function can't be an arrow function or an asynchronus function. It also can't directly manipulate data.
 * You'll have to use the {@link transform} function if you need to directly manipulate data.
 */
composer) {
    const handlers = new Map();
    if (orchestration_1.WorkflowManager.getWorkflow(name)) {
        orchestration_1.WorkflowManager.unregister(name);
    }
    orchestration_1.WorkflowManager.register(name, undefined, handlers);
    const context = {
        workflowId: name,
        flow: orchestration_1.WorkflowManager.getTransactionDefinition(name),
        handlers,
        hooks_: [],
        hooksCallback_: {},
        hookBinder: (name, fn) => {
            context.hooks_.push(name);
            return fn(context);
        },
        stepBinder: (fn) => {
            return fn.bind(context)();
        },
        parallelizeBinder: (fn) => {
            return fn.bind(context)();
        },
    };
    global[helpers_1.SymbolMedusaWorkflowComposerContext] = context;
    const inputPlaceHolder = (0, proxy_1.proxify)({
        __type: helpers_1.SymbolInputReference,
        __step__: "",
    });
    const returnedStep = composer.apply(context, [inputPlaceHolder]);
    delete global[helpers_1.SymbolMedusaWorkflowComposerContext];
    orchestration_1.WorkflowManager.update(name, context.flow, handlers);
    const workflow = (0, helper_1.exportWorkflow)(name);
    const mainFlow = (container) => {
        const workflow_ = workflow(container);
        const originalRun = workflow_.run;
        workflow_.run = (async (args) => {
            args ?? (args = {});
            args.resultFrom ?? (args.resultFrom = returnedStep?.__type === helpers_1.SymbolWorkflowStep
                ? returnedStep.__step__
                : undefined);
            // Forwards the input to the ref object on composer.apply
            const workflowResult = (await originalRun(args));
            workflowResult.result = await (0, helpers_1.resolveValue)(workflowResult.result || returnedStep, workflowResult.transaction.getContext());
            return workflowResult;
        });
        return workflow_;
    };
    let shouldRegisterHookHandler = true;
    for (const hook of context.hooks_) {
        mainFlow[hook] = (fn) => {
            var _a;
            (_a = context.hooksCallback_)[hook] ?? (_a[hook] = []);
            if (!shouldRegisterHookHandler) {
                console.warn(`A hook handler has already been registered for the ${hook} hook. The current handler registration will be skipped.`);
                return;
            }
            context.hooksCallback_[hook].push(fn);
            shouldRegisterHookHandler = false;
        };
    }
    mainFlow.getName = () => name;
    return mainFlow;
}
exports.createWorkflow = createWorkflow;
//# sourceMappingURL=create-workflow.js.map
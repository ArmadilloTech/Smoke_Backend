"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parallelize = void 0;
const helpers_1 = require("./helpers");
/**
 * This function is used to run multiple steps in parallel. The result of each step will be returned as part of the result array.
 *
 * @typeParam TResult - The type of the expected result.
 *
 * @returns The step results. The results are ordered in the array by the order they're passed in the function's parameter.
 *
 * @example
 * ```ts
 * import {
 *   createWorkflow,
 *   parallelize
 * } from "@medusajs/workflows-sdk"
 * import {
 *   createProductStep,
 *   getProductStep,
 *   createPricesStep,
 *   attachProductToSalesChannelStep
 * } from "./steps"
 *
 * interface WorkflowInput {
 *   title: string
 * }
 *
 * const myWorkflow = createWorkflow<
 *   WorkflowInput,
 *   Product
 * >("my-workflow", (input) => {
 *    const product = createProductStep(input)
 *
 *    const [prices, productSalesChannel] = parallelize(
 *      createPricesStep(product),
 *      attachProductToSalesChannelStep(product)
 *    )
 *
 *    const id = product.id
 *    return getProductStep(product.id)
 *  }
 * )
 */
function parallelize(...steps) {
    if (!global[helpers_1.SymbolMedusaWorkflowComposerContext]) {
        throw new Error("parallelize must be used inside a createWorkflow definition");
    }
    const parallelizeBinder = global[helpers_1.SymbolMedusaWorkflowComposerContext].parallelizeBinder;
    const resultSteps = steps.map((step) => step);
    return parallelizeBinder(function () {
        const stepOntoMerge = steps.shift();
        this.flow.mergeActions(stepOntoMerge.__step__, ...steps.map((step) => step.__step__));
        return resultSteps;
    });
}
exports.parallelize = parallelize;
//# sourceMappingURL=parallelize.js.map
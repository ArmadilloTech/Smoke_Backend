"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveValue = void 0;
const utils_1 = require("@medusajs/utils");
const symbol_1 = require("./symbol");
async function resolveProperty(property, transactionContext) {
    const { invoke: invokeRes } = transactionContext;
    if (property?.__type === symbol_1.SymbolInputReference) {
        return transactionContext.payload;
    }
    else if (property?.__type === symbol_1.SymbolWorkflowStepTransformer) {
        return await property.__resolver(transactionContext);
    }
    else if (property?.__type === symbol_1.SymbolWorkflowHook) {
        return await property.__value(transactionContext);
    }
    else if (property?.__type === symbol_1.SymbolWorkflowStep) {
        const output = invokeRes[property.__step__]?.output;
        if (output?.__type === symbol_1.SymbolWorkflowStepResponse) {
            return output.output;
        }
        return output;
    }
    else if (property?.__type === symbol_1.SymbolWorkflowStepResponse) {
        return property.output;
    }
    else {
        return property;
    }
}
/**
 * @internal
 */
async function resolveValue(input, transactionContext) {
    const unwrapInput = async (inputTOUnwrap, parentRef) => {
        if (inputTOUnwrap == null) {
            return inputTOUnwrap;
        }
        if (Array.isArray(inputTOUnwrap)) {
            return await (0, utils_1.promiseAll)(inputTOUnwrap.map((i) => unwrapInput(i, transactionContext)));
        }
        if (typeof inputTOUnwrap !== "object") {
            return inputTOUnwrap;
        }
        for (const key of Object.keys(inputTOUnwrap)) {
            parentRef[key] = await resolveProperty(inputTOUnwrap[key], transactionContext);
            if (typeof parentRef[key] === "object") {
                await unwrapInput(parentRef[key], parentRef[key]);
            }
        }
        return parentRef;
    };
    const result = input?.__type
        ? await resolveProperty(input, transactionContext)
        : await unwrapInput(input, {});
    return result && JSON.parse(JSON.stringify(result));
}
exports.resolveValue = resolveValue;
//# sourceMappingURL=resolve-value.js.map
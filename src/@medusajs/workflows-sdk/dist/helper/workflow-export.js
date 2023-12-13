"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportWorkflow = void 0;
const orchestration_1 = require("@medusajs/orchestration");
const modules_sdk_1 = require("@medusajs/modules-sdk");
const os_1 = require("os");
const ulid_1 = require("ulid");
const composer_1 = require("../utils/composer");
const exportWorkflow = (workflowId, defaultResult, dataPreparation) => {
    return function (container) {
        if (!container) {
            container = modules_sdk_1.MedusaModule.getLoadedModules().map((mod) => Object.values(mod)[0]);
        }
        const flow = new orchestration_1.LocalWorkflow(workflowId, container);
        const originalRun = flow.run.bind(flow);
        const newRun = async ({ input, context, throwOnError, resultFrom } = {
            throwOnError: true,
            resultFrom: defaultResult,
        }) => {
            resultFrom ?? (resultFrom = defaultResult);
            throwOnError ?? (throwOnError = true);
            if (typeof dataPreparation === "function") {
                try {
                    const copyInput = input ? JSON.parse(JSON.stringify(input)) : input;
                    input = await dataPreparation(copyInput);
                }
                catch (err) {
                    if (throwOnError) {
                        throw new Error(`Data preparation failed: ${err.message}${os_1.EOL}${err.stack}`);
                    }
                    return {
                        errors: [err],
                    };
                }
            }
            const transaction = await originalRun(context?.transactionId ?? (0, ulid_1.ulid)(), input, context);
            const errors = transaction.getErrors(orchestration_1.TransactionHandlerType.INVOKE);
            const failedStatus = [orchestration_1.TransactionState.FAILED, orchestration_1.TransactionState.REVERTED];
            if (failedStatus.includes(transaction.getState()) && throwOnError) {
                const errorMessage = errors
                    ?.map((err) => `${err.error?.message}${os_1.EOL}${err.error?.stack}`)
                    ?.join(`${os_1.EOL}`);
                throw new Error(errorMessage);
            }
            let result = undefined;
            if (resultFrom) {
                if (Array.isArray(resultFrom)) {
                    result = resultFrom.map((from) => {
                        const res = transaction.getContext().invoke?.[from];
                        return res?.__type === composer_1.SymbolWorkflowWorkflowData ? res.output : res;
                    });
                }
                else {
                    const res = transaction.getContext().invoke?.[resultFrom];
                    result = res?.__type === composer_1.SymbolWorkflowWorkflowData ? res.output : res;
                }
            }
            return {
                errors,
                transaction,
                result,
            };
        };
        flow.run = newRun;
        return flow;
    };
};
exports.exportWorkflow = exportWorkflow;
//# sourceMappingURL=workflow-export.js.map
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StepResponse___type, _StepResponse_output, _StepResponse_compensateInput;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepResponse = void 0;
const symbol_1 = require("./symbol");
/**
 * This class is used to create the response returned by a step. A step return its data by returning an instance of `StepResponse`.
 *
 * @typeParam TOutput - The type of the output of the step.
 * @typeParam TCompensateInput -
 * The type of the compensation input. If the step doesn't specify any compensation input, then the type of `TCompensateInput` is the same
 * as that of `TOutput`.
 */
class StepResponse {
    /**
     * The constructor of the StepResponse
     *
     * @typeParam TOutput - The type of the output of the step.
     * @typeParam TCompensateInput -
     * The type of the compensation input. If the step doesn't specify any compensation input, then the type of `TCompensateInput` is the same
     * as that of `TOutput`.
     */
    constructor(
    /**
     * The output of the step.
     */
    output, 
    /**
     * The input to be passed as a parameter to the step's compensation function. If not provided, the `output` will be provided instead.
     */
    compensateInput) {
        _StepResponse___type.set(this, symbol_1.SymbolWorkflowStepResponse);
        _StepResponse_output.set(this, void 0);
        _StepResponse_compensateInput.set(this, void 0);
        __classPrivateFieldSet(this, _StepResponse_output, output, "f");
        __classPrivateFieldSet(this, _StepResponse_compensateInput, (compensateInput ?? output), "f");
    }
    /**
     * @internal
     */
    get __type() {
        return __classPrivateFieldGet(this, _StepResponse___type, "f");
    }
    /**
     * @internal
     */
    get output() {
        return __classPrivateFieldGet(this, _StepResponse_output, "f");
    }
    /**
     * @internal
     */
    get compensateInput() {
        return __classPrivateFieldGet(this, _StepResponse_compensateInput, "f");
    }
    /**
     * @internal
     */
    toJSON() {
        return {
            __type: __classPrivateFieldGet(this, _StepResponse___type, "f"),
            output: __classPrivateFieldGet(this, _StepResponse_output, "f"),
            compensateInput: __classPrivateFieldGet(this, _StepResponse_compensateInput, "f"),
        };
    }
}
exports.StepResponse = StepResponse;
_StepResponse___type = new WeakMap(), _StepResponse_output = new WeakMap(), _StepResponse_compensateInput = new WeakMap();
//# sourceMappingURL=step-response.js.map
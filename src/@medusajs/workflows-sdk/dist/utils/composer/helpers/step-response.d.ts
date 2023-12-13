/**
 * This class is used to create the response returned by a step. A step return its data by returning an instance of `StepResponse`.
 *
 * @typeParam TOutput - The type of the output of the step.
 * @typeParam TCompensateInput -
 * The type of the compensation input. If the step doesn't specify any compensation input, then the type of `TCompensateInput` is the same
 * as that of `TOutput`.
 */
export declare class StepResponse<TOutput, TCompensateInput = TOutput> {
    #private;
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
    output: TOutput, 
    /**
     * The input to be passed as a parameter to the step's compensation function. If not provided, the `output` will be provided instead.
     */
    compensateInput?: TCompensateInput);
    /**
     * @internal
     */
    get __type(): symbol;
    /**
     * @internal
     */
    get output(): TOutput;
    /**
     * @internal
     */
    get compensateInput(): TCompensateInput;
    /**
     * @internal
     */
    toJSON(): {
        __type: symbol;
        output: TOutput;
        compensateInput: TCompensateInput | undefined;
    };
}

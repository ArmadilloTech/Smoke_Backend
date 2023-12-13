import { WorkflowArguments } from "@medusajs/workflows-sdk";
type RegionDTO = {
    region_id?: string;
};
type HandlerInputData = {
    region: {
        region_id: string;
    };
};
declare enum Aliases {
    Region = "region"
}
export declare function findRegion({ container, data, }: WorkflowArguments<HandlerInputData>): Promise<RegionDTO>;
export declare namespace findRegion {
    var aliases: typeof Aliases;
}
export {};

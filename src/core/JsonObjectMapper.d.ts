import { JsonView } from './JsonView';
declare class Serialization {
    private serialized;
    constructor(serialized: any);
    toString(space?: number): string;
    toJson(): object;
}
export declare class JsonObjectMapper {
    static serialize(data: any, view: typeof JsonView): Serialization;
    static serializeArray(dataArray: any[], view: typeof JsonView): Serialization;
}
export {};

import "reflect-metadata";
import { JsonView } from '../JsonView';
export interface IJsonProperty {
    name?: string;
    view?: [typeof JsonView] | typeof JsonView;
    type?: "string" | "number" | "array" | "object" | "date" | "boolean";
    enum?: (string | number | boolean)[];
    validator?: RegExp | string;
    format?: string;
    required?: boolean;
}
export declare function JsonProperty(view: typeof JsonView): Function;
export declare function JsonProperty(options: IJsonProperty): Function;
export declare function JsonProperty(target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor): void;
export declare function JsonProperty(): Function;

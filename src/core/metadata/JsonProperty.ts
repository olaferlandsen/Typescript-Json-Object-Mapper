import "reflect-metadata";
import { JsonView } from '../JsonView';

export interface IJsonProperty {
    name?: string;
    view?: [typeof JsonView]|typeof JsonView;
    type?: "string" | "number" | "array" | "object" | "date" | "boolean";

    default?: any;
    enum?: (string|number|boolean)[];
    validator?: RegExp | string;
    format?: string;
    required?: boolean;
    ignore?: boolean;
    topic?: string;
}
export function JsonProperty (view: typeof JsonView | [typeof JsonView]): Function;
export function JsonProperty (options: IJsonProperty): Function;
export function JsonProperty (target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor): void;
export function JsonProperty (): Function;
export function JsonProperty (...args: any[]): void | Function {
    const KEY = "JSON:PROPERTY";


    if (args.length > 2) {
        const designType  = Reflect.getMetadata("design:type", args[0], args[1]);
        let pre: { [key: string]: IJsonProperty } = Reflect.getMetadata(KEY, args[0]) || {};

        pre[args[1]] = {
            ...pre[args[1]],
            name: args[1],
            type: designType.name.toLowerCase()
        };
        Reflect.defineMetadata(KEY, pre, args[0]);
        return void 0;
    }
    else {
        return (...params: any[]) => {
            const designType  = Reflect.getMetadata("design:type", params[0], params[1]);
            let options: IJsonProperty = {};
            if (typeof args[0] === 'function') options.view = args[0];
            else options = args[0];
            let pre: { [key: string]: IJsonProperty } = Reflect.getMetadata(KEY, params[0]) || {};
            pre[params[1]] = {
                ...pre[params[1]],
                // view: designType.name,
                type: designType.name,
                name: params[1],
                ...options
            };
            Reflect.defineMetadata(KEY, pre, params[0]);
        };
    }
}

import { IJsonProperty } from "./JsonProperty";

export function JsonIgnore(target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor): void;
export function JsonIgnore(): Function;
export function JsonIgnore (...args: any[]): void | Function {
    const KEY = "JSON:PROPERTY";
    if (args.length > 2) {
        let pre: { [key: string]: IJsonProperty } = Reflect.getMetadata(KEY, args[0]) || {};
        if (typeof pre[args[1]] === "object") {
            pre[args[1]].ignore = true;
        } else {
            pre[args[1]] = {ignore: true};
        }
        Reflect.defineMetadata(KEY, pre, args[0]);

        return void 0;
    } else {
        return (...params: any[]) => {
            let pre: { [key: string]: IJsonProperty } = Reflect.getMetadata(KEY, params[0]) || {};
            if (typeof pre[params[1]] === "object") {
                pre[params[1]].ignore = true;
            } else {
                pre[params[1]] = {ignore: true};
            }
            Reflect.defineMetadata(KEY, pre, params[0]);
        };
    }
}

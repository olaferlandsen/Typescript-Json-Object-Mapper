export function JsonIgnore(target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor): void;
export function JsonIgnore(): Function;
export function JsonIgnore (...args: any[]): void | Function {
    if (args.length > 2) return void 0;
    else {
        return (...params: any[]): any => void 0;
    }
}

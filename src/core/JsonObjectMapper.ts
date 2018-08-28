import { JsonView } from './JsonView';

class Serialization {
    public constructor (private serialized: any) {}
    public toString (): string {
        return JSON.stringify(this.serialized);
    }
    public toJson (): object {
        return this.serialized;
    }
}

export class JsonObjectMapper {
    public static serialize(data: any, view: typeof JsonView): Serialization;
    public static serialize (...args: any[]): Serialization {
        const filter: Function = (target: typeof JsonView, input: {[key: string]: any}): any => {
            const jsonProperties: { [key: string]: any} = Reflect.getMetadata("JSON:PROPERTY", target.prototype) || {};
            for (let prop in input) {
                if (typeof jsonProperties[prop] === 'undefined') {
                    delete input[prop];
                    continue;
                }
                switch (jsonProperties[prop].type.toLowerCase()) {
                    case 'date':
                        if (typeof input[prop] === 'number') input[prop] = new Date(input[prop]);
                        else if (typeof input[prop] === 'string') input[prop] = new Date(Date.parse(input[prop]));
                        else if (input[prop] instanceof Date) continue;
                        else input[prop] = null;
                        break;

                    case 'number':
                        if (typeof input[prop] !== 'number') input[prop] = Number(input[prop]);
                        break;

                    case 'string':
                        if (typeof input[prop] !== 'string') input[prop] = String(input[prop]);
                        break;
                }
                if (typeof jsonProperties[prop].view !== 'undefined' && jsonProperties[prop].view !== null) {
                    if (Array.isArray(jsonProperties[prop].view)) {
                        if (jsonProperties[prop].view.length !== 1) {
                            delete input[prop];
                            continue;
                        }
                        const view: typeof JsonView = jsonProperties[prop].view[0];
                        if (view.prototype instanceof JsonView) {
                            for (let i = 0; i < input[prop].length; i++) {
                                input[prop][i] = filter(jsonProperties[prop].view[0], input[prop][i]);
                            }
                        }
                        else delete input[prop];
                    }
                }
            }
            for (let prop in input) {
                if (jsonProperties[prop].name !== prop) {
                    input[jsonProperties[prop].name] = input[prop];
                    delete input[prop];
                }
            }
            return input;
        };
        return new Serialization(filter(args[1], args[0]));
    }
}

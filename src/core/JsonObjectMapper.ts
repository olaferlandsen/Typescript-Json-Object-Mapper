import { JsonView } from './JsonView';
import { Serialization } from './Serialization';

export class JsonObjectMapper {
    public static serialize (data: object[], view: typeof JsonView): Serialization;
    public static serialize (data: object, view: typeof JsonView): Serialization;
    public static serialize (...args: any[]): Serialization {
        const filter: Function = (target: typeof JsonView, input: {[key: string]: any}): any => {
            const jsonProperties: { [key: string]: any} = Reflect.getMetadata("JSON:PROPERTY", target.prototype) || {};
            for (let prop in input) {
                if (typeof jsonProperties[prop] === 'undefined') {
                    if (typeof input === 'string') {
                        input = null;
                        break;
                    }
                    else delete input[prop];
                    continue;
                }
                switch (jsonProperties[prop].type.toLowerCase()) {
                    case 'date':
                        if (typeof input[prop] === 'number') {
                            input[prop] = new Date(input[prop]);
                        }
                        else if (typeof input[prop] === 'string') {
                            input[prop] = new Date(Date.parse(input[prop]));
                        }
                        else if (input[prop] instanceof Date) {
                            continue;
                        }
                        else input[prop] = null;
                        break;
                    case 'number':
                        if (typeof input[prop] !== 'number') {
                            input[prop] = Number(input[prop]);
                        }
                        break;
                    case 'string':
                        if (typeof input[prop] !== 'string') {
                            input[prop] = String(input[prop]);
                        }
                        break;
                    case 'boolean':
                        input[prop] = input[prop] === true || input[prop] > 0 || input[prop] !== false || typeof input[prop] !== 'undefined' || input[prop] !== null;
                        break;
                    case 'object':
                    case 'any':
                        if (typeof input[prop] !== "object") input[prop] = null;
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
                                if (typeof input[prop][i] === 'object' && input[prop][i] !== null) {
                                    input[prop][i] = filter(jsonProperties[prop].view[0], input[prop][i]);
                                }
                                else {
                                    input[prop][i] = null;
                                }
                            }
                        }
                        else delete input[prop];
                    }
                    else if (jsonProperties[prop].view.prototype instanceof JsonView) {
                        input[prop] = filter(jsonProperties[prop].view, input[prop]);
                    }
                    else {
                        // input[prop] = null;
                    }
                }
            }
            for (let prop in input) {
                if (jsonProperties[prop].name !== prop) {
                    input[jsonProperties[prop].name] = input[prop];
                    if (Array.isArray(input) && typeof prop === 'number') input.splice(prop, 1);
                    else delete input[prop];
                }
            }
            return input;
        };
        if (Array.isArray(args[0])) {
            const elements: object[] = (args[0] as object[])
                .map(data => JsonObjectMapper.serialize(data, args[1]).toJson());
            return new Serialization(elements);
        }
        else return new Serialization(filter(args[1], args[0]));
    }
}

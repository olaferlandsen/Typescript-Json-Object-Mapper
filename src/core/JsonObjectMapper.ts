import { JsonView } from './JsonView';
import { Serialization } from './Serialization';

export class JsonObjectMapper {
    public static serialize (data: object[] | object, view: typeof JsonView): Serialization;
    public static serialize (data: object[] | object, view: typeof JsonView, topic: string|string[]): Serialization;
    public static serialize (...args: any[]): Serialization {
        let immutably;
        if (Array.isArray(args[0])) {
            immutably = args[0].slice();
        } else {
            immutably = {...args[0]};
        }
        const filter: Function = (target: typeof JsonView, input: any): any => {
            const jsonProperties: { [key: string]: any} = Reflect.getMetadata("JSON:PROPERTY", target.prototype) || {};
            for (let prop in input) {
                if (typeof jsonProperties[prop] === 'undefined') {
                    if (typeof input === 'string') {
                        input = null;
                        break;
                    }
                    else {
                        delete input[prop];
                    }
                    continue;
                }

                // topic filter
                if (typeof args[2] === "string" || Array.isArray(args[2])) {
                    if (jsonProperties[prop].topic && jsonProperties[prop].topic.length > 0) {
                        // serialize topic is string, convert it to string-array
                        if (typeof args[2] === "string") {
                            args[2] = [args[2]];
                        }

                        // and now, if the current property not have som topic...
                        if (args[2].indexOf(jsonProperties[prop].topic) === -1) {
                            delete input[prop];
                            continue;
                        }
                    }
                }

                if (jsonProperties[prop].ignore === true) {
                    delete input[prop];
                    continue;
                }
                switch (jsonProperties[prop].type.toLowerCase()) {
                    case 'date':
                        if (typeof input[prop] === 'number') {
                            input[prop] = new Date(input[prop]);
                        } else if (typeof input[prop] === 'string') {
                            input[prop] = new Date(Date.parse(input[prop]));
                        } else if (input[prop] instanceof Date) {
                            continue;
                        } else {
                            input[prop] = null;
                        }
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
                }
                if (typeof jsonProperties[prop].view !== 'undefined' && jsonProperties[prop].view !== null) {
                    if (Array.isArray(jsonProperties[prop].view)) {
                        if (jsonProperties[prop].view.length !== 1) {
                            delete input[prop];
                            continue;
                        }
                        if (jsonProperties[prop].view[0].prototype instanceof JsonView) {
                            for (let i = 0; i < input[prop].length; i++) {
                                if (typeof input[prop][i] === 'object' && input[prop][i] !== null) {
                                    input[prop][i] = filter(jsonProperties[prop].view[0], input[prop][i]);
                                } else {
                                    input[prop][i] = null;
                                }
                            }
                        } else {
                            delete input[prop];
                        }
                    } else if (jsonProperties[prop].view.prototype instanceof JsonView) {
                        input[prop] = filter(jsonProperties[prop].view, input[prop]);
                    } else {
                        // input[prop] = null;
                    }
                }
            }
            for (let prop in input) {
                if (jsonProperties[prop].name !== prop) {
                    // change name of property
                    input[jsonProperties[prop].name] = input[prop];
                    if (Array.isArray(input) && typeof prop === 'number') {
                        input.splice(prop, 1);
                    }
                    else {
                        delete input[prop];
                    }
                }
            }
            return input;
        };
        let result;
        if (Array.isArray(immutably)) {
            result = (immutably as object[])
                .map(data =>
                    JsonObjectMapper.serialize(data, args[1], args[2]).toJson());
        } else {
            result = filter(args[1], immutably);
        }
        return new Serialization(result);
    }
}

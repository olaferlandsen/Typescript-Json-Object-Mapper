"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonView_1 = require("./JsonView");
class Serialization {
    constructor(serialized) {
        this.serialized = serialized;
    }
    toString(space = 4) {
        return JSON.stringify(this.serialized, null, space);
    }
    toJson() {
        return this.serialized;
    }
}
class JsonObjectMapper {
    static serialize(...args) {
        const filter = (target, input) => {
            const jsonProperties = Reflect.getMetadata("JSON:PROPERTY", target.prototype) || {};
            for (let prop in input) {
                if (typeof jsonProperties[prop] === 'undefined') {
                    delete input[prop];
                    continue;
                }
                console.log("property", prop, jsonProperties[prop].type);
                switch (jsonProperties[prop].type.toLowerCase()) {
                    case 'date':
                        if (typeof input[prop] === 'number')
                            input[prop] = new Date(input[prop]);
                        else if (typeof input[prop] === 'string')
                            input[prop] = new Date(Date.parse(input[prop]));
                        else if (input[prop] instanceof Date)
                            continue;
                        else
                            input[prop] = null;
                        break;
                    case 'number':
                        if (typeof input[prop] !== 'number')
                            input[prop] = Number(input[prop]);
                        break;
                    case 'string':
                        if (typeof input[prop] !== 'string') {
                            console.log("xyz", input[prop]);
                            input[prop] = String(input[prop]);
                        }
                        break;
                }
                if (typeof jsonProperties[prop].view !== 'undefined' && jsonProperties[prop].view !== null) {
                    if (Array.isArray(jsonProperties[prop].view)) {
                        if (jsonProperties[prop].view.length !== 1) {
                            delete input[prop];
                            continue;
                        }
                        const view = jsonProperties[prop].view[0];
                        if (view.prototype instanceof JsonView_1.JsonView) {
                            for (let i = 0; i < input[prop].length; i++) {
                                input[prop][i] = filter(jsonProperties[prop].view[0], input[prop][i]);
                            }
                        }
                        else
                            delete input[prop];
                    }
                    else if (jsonProperties[prop].view.prototype instanceof JsonView_1.JsonView) {
                        input[prop] = filter(jsonProperties[prop].view, input[prop]);
                    }
                    else
                        input[prop] = null;
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
    static serializeArray(dataArray, view) {
        return new Serialization(dataArray.map(data => JsonObjectMapper.serialize(data, view).toJson()));
    }
}
exports.JsonObjectMapper = JsonObjectMapper;
//# sourceMappingURL=JsonObjectMapper.js.map
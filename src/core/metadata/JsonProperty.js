"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function JsonProperty(...args) {
    const KEY = "JSON:PROPERTY";
    if (args.length > 2) {
        const designType = Reflect.getMetadata("design:type", args[0], args[1]);
        let pre = Reflect.getMetadata(KEY, args[0]) || {};
        pre[args[1]] = {
            name: args[1],
            type: designType.name.toLowerCase(),
            view: designType.name
        };
        Reflect.defineMetadata(KEY, pre, args[0]);
        return void 0;
    }
    else {
        return (...params) => {
            const designType = Reflect.getMetadata("design:type", params[0], params[1]);
            let options = {};
            if (typeof args[0] === 'function')
                options.view = args[0];
            else
                options = args[0];
            let pre = Reflect.getMetadata(KEY, params[0]) || {};
            pre[params[1]] = Object.assign({ view: designType.name, type: designType.name, name: params[1] }, options);
            Reflect.defineMetadata(KEY, pre, params[0]);
        };
    }
}
exports.JsonProperty = JsonProperty;
//# sourceMappingURL=JsonProperty.js.map
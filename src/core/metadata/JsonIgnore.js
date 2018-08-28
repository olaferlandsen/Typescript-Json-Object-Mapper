"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function JsonIgnore(...args) {
    if (args.length > 2)
        return void 0;
    else {
        return (...params) => void 0;
    }
}
exports.JsonIgnore = JsonIgnore;
//# sourceMappingURL=JsonIgnore.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_schema_1 = require("./role.schema");
const create = (role) => role_schema_1.roleModel.create(role);
const findOne = (filter) => role_schema_1.roleModel.findOne(filter);
exports.default = {
    create, findOne
};

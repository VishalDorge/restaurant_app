"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_schema_1 = require("./restaurant.schema");
const create = (restaurant) => restaurant_schema_1.restaurantModel.create(restaurant);
const find = (filter) => restaurant_schema_1.restaurantModel.find(Object.assign(Object.assign({}, filter), { isDeleted: false }));
const findOne = (filter) => restaurant_schema_1.restaurantModel.findOne(Object.assign({ isDeleted: false }, filter));
const update = (filter, data) => restaurant_schema_1.restaurantModel.updateMany(filter, data);
exports.default = {
    create, find, update, findOne
};

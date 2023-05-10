"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_RESTAURANT_MENU_VALIDATOR = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utility/validate");
exports.GET_RESTAURANT_MENU_VALIDATOR = [
    (0, express_validator_1.param)("restaurantId").isString().isLength({ min: 1 }).withMessage("RestaurantId is required!"),
    validate_1.validate
];

import { body, param } from "express-validator";
import { validate } from "../../utility/validate";

export const GET_RESTAURANT_MENU_VALIDATOR = [
    param("restaurantId").isString().isLength({min: 2}).withMessage("RestaurantId is required!"),
    validate
]

export const CHANGE_RESTAURANT_STATUS_VALIDATOR = [
    body("restaurantId").isString().isLength({min: 1}).withMessage("Invalid RestaurantId"),
    body("status").isString().isLength({min: 1, max: 1}).withMessage("Invalid status"),
    validate
]

export const UPDATE_RESTAURANT_MENU_VALIDATOR = [
    body("restaurantId").isString().isLength({min: 1}).withMessage("Invalid RestaurantId"),
    body("menu").isObject().withMessage("Invalid Menu Object!"),
    validate
]
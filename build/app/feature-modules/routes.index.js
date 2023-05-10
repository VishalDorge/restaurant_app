"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user/user.routes"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const restaurant_routes_1 = __importDefault(require("./restaurant/restaurant.routes"));
exports.default = {
    UserRouter: user_routes_1.default, AuthRouter: auth_routes_1.default, RestaurantRouter: restaurant_routes_1.default
};

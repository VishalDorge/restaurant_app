"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_services_1 = __importDefault(require("./restaurant.services"));
const response_handler_1 = require("../../utility/response.handler");
const role_validate_1 = require("../../middleware/role.validate");
const constants_1 = require("../../utility/constants");
const can_delete_1 = require("../../middleware/can.delete");
const can_update_menu_1 = require("../../middleware/can.update.menu");
const restaurant_validators_1 = require("./restaurant.validators");
const router = (0, express_1.Router)();
router.post("/add", (0, role_validate_1.roleValidator)([constants_1.Roles.OWNER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = req.body;
        const ownerId = res.locals.payload.id;
        const result = yield restaurant_services_1.default.create(restaurant, ownerId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
router.post("/add/:restaurantId", (0, role_validate_1.roleValidator)([constants_1.Roles.OWNER, constants_1.Roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId } = req.params;
        const credentials = req.body.location;
        const result = yield restaurant_services_1.default.createBranch(credentials, restaurantId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/", (0, role_validate_1.roleValidator)([constants_1.Roles.ADMIN, constants_1.Roles.OWNER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, role } = res.locals.payload;
        const result = yield restaurant_services_1.default.findAll({ ownerId: id }, role);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/public", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield restaurant_services_1.default.getPublic();
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.get("/menu/:restaurantId", restaurant_validators_1.GET_RESTAURANT_MENU_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId } = req.params;
        const result = yield restaurant_services_1.default.getMenu(restaurantId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/status", (0, role_validate_1.roleValidator)([constants_1.Roles.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId, status } = req.body;
        const result = yield restaurant_services_1.default.changeRestaurantStatus(restaurantId, status);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/add-menu", (0, role_validate_1.roleValidator)([constants_1.Roles.OWNER]), can_update_menu_1.canUpdateMenu, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId, menu } = req.body;
        const result = yield restaurant_services_1.default.updateMenu(restaurantId, menu, "add");
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/delete-menu", (0, role_validate_1.roleValidator)([constants_1.Roles.OWNER]), can_update_menu_1.canUpdateMenu, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId, menu } = req.body;
        const result = yield restaurant_services_1.default.updateMenu(restaurantId, menu, "remove");
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/", (0, role_validate_1.roleValidator)([constants_1.Roles.OWNER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { restaurantId } = _a, data = __rest(_a, ["restaurantId"]);
        const result = yield restaurant_services_1.default.editRestaurant(restaurantId, data);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.delete("/", (0, role_validate_1.roleValidator)([constants_1.Roles.ADMIN, constants_1.Roles.OWNER]), can_delete_1.canDelete, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId } = req.body;
        const result = yield restaurant_services_1.default.remove(restaurantId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;

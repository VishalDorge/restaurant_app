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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUpdateMenu = void 0;
const restaurant_services_1 = __importDefault(require("../feature-modules/restaurant/restaurant.services"));
const canUpdateMenu = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = res.locals.payload;
    const { restaurantId } = req.body;
    const restaurant = yield restaurant_services_1.default.find({ _id: restaurantId, ownerId: id });
    if (restaurant[0])
        next();
    else
        next({ statusCode: 401, message: "UNAUTHORISE" });
});
exports.canUpdateMenu = canUpdateMenu;

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
exports.canDelete = void 0;
const constants_1 = require("../utility/constants");
const restaurant_services_1 = __importDefault(require("../feature-modules/restaurant/restaurant.services"));
const canDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId } = req.body;
    const { id, role } = res.locals.payload;
    if (role === constants_1.Roles.ADMIN)
        next();
    else {
        const restaurant = yield restaurant_services_1.default.find({ _id: restaurantId, ownerId: id });
        if (restaurant[0])
            next();
        else
            next({ statusCode: 403, message: "FORBIDDEN" });
    }
});
exports.canDelete = canDelete;
// export const canDeleteUser = 

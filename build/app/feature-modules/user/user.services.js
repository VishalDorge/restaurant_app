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
const constants_1 = require("../../utility/constants");
const user_repo_1 = __importDefault(require("./user.repo"));
const user_responses_1 = require("./user.responses");
const restaurant_services_1 = __importDefault(require("../restaurant/restaurant.services"));
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user = Object.assign({ role: constants_1.Roles.OWNER }, user);
    const result = yield user_repo_1.default.create(user);
    return result;
});
const find = (filter) => user_repo_1.default.find(filter);
const update = (filter, data) => user_repo_1.default.update(filter, data);
const findOne = (filter) => user_repo_1.default.findOne(filter);
const remove = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield findOne({ _id: userId });
    if (!user)
        throw user_responses_1.USER_RESPONSES.USER_NOT_FOUND;
    const result = yield update({ _id: userId }, { isDelted: true });
    const allRestaurants = yield restaurant_services_1.default.find({ ownerId: userId, parentRestaurant: null });
    for (let restaurant of allRestaurants) {
        yield restaurant_services_1.default.remove(restaurant._id);
    }
    if (result.modifiedCount > 0) {
        return user_responses_1.USER_RESPONSES.DELETED_SUCCESS;
    }
    else
        return user_responses_1.USER_RESPONSES.DELETED_FAILURE;
});
const getAllOwners = () => __awaiter(void 0, void 0, void 0, function* () {
    const allOwners = yield find({ role: constants_1.Roles.OWNER });
    const result = [];
    for (let owner of allOwners) {
        const approvedRestaurants = yield restaurant_services_1.default.find({ ownerId: owner._id, status: constants_1.restaurantStatus.Approved });
        const pendingRestaurants = yield restaurant_services_1.default.find({ ownerId: owner._id, status: constants_1.restaurantStatus.Pending });
        if ((approvedRestaurants.length + pendingRestaurants.length) > 0) {
            result.push({
                ownerId: owner._id,
                totalRestaurants: approvedRestaurants.length + pendingRestaurants.length,
                approvedRestaurants: approvedRestaurants.length,
                pendingRestaurants: pendingRestaurants.length
            });
        }
    }
    return result;
});
exports.default = {
    create, find, findOne, update, remove, getAllOwners
};

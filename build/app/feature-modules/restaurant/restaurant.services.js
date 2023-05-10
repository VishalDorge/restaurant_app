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
const restaurant_repo_1 = __importDefault(require("./restaurant.repo"));
const restaurant_responses_1 = require("./restaurant.responses");
const constants_1 = require("../../utility/constants");
const user_services_1 = __importDefault(require("../user/user.services"));
const create = (restaurant, ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    const isRestaurantPresent = yield restaurant_repo_1.default.findOne({ name: restaurant.name, location: restaurant.location });
    if ((isRestaurantPresent === null || isRestaurantPresent === void 0 ? void 0 : isRestaurantPresent.ownerId) === ownerId)
        throw restaurant_responses_1.RESTAURANT_RESPONSES.RESTAURANT_ALREADY_EXIST;
    restaurant.ownerId = ownerId;
    const result = yield restaurant_repo_1.default.create(restaurant);
    user_services_1.default.update({ _id: result.ownerId }, { $push: { restaurants: result._id } });
    return result;
});
const editRestaurant = (restaurantId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield restaurant_repo_1.default.update({ _id: restaurantId }, data);
    if (result.modifiedCount > 0)
        return restaurant_responses_1.RESTAURANT_RESPONSES.UPDATE_SUCCESS;
    else
        return restaurant_responses_1.RESTAURANT_RESPONSES.UPDATE_FAILURE;
});
const find = (filter) => restaurant_repo_1.default.find(filter);
const getPublic = () => {
    return find({ status: constants_1.restaurantStatus.Approved }).select({ name: 1, location: 1, branches: 1, _id: 0 });
};
const getMenu = (restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurant_repo_1.default.findOne({ _id: restaurantId }).select({ name: 1, location: 1, branches: 1, menu: 1, _id: 0 });
    if (!restaurant)
        return restaurant_responses_1.RESTAURANT_RESPONSES.RESTAURANT_NOT_FOUND;
    return restaurant;
});
const findAll = (filter, role) => __awaiter(void 0, void 0, void 0, function* () {
    let availableRestaurants;
    if (role === constants_1.Roles.ADMIN)
        availableRestaurants = yield find({});
    else
        availableRestaurants = yield find(filter).select({ name: 1, location: 1, branches: 1, status: 1 });
    const approvedRestaurants = availableRestaurants.filter(r => r.status === constants_1.restaurantStatus.Approved);
    const pendingRestaurants = availableRestaurants.filter(r => r.status === constants_1.restaurantStatus.Pending);
    const rejectRestaurants = availableRestaurants.filter(r => r.status === constants_1.restaurantStatus.Reject);
    const result = {
        approved: { count: approvedRestaurants.length, approvedRestaurants },
        pending: { count: pendingRestaurants.length, pendingRestaurants },
        rejected: { count: rejectRestaurants.length, rejectRestaurants }
    };
    return result;
});
const changeRestaurantStatus = (restaurantId, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield restaurant_repo_1.default.update({ _id: restaurantId }, { $set: { status: newStatus } });
    if (result.modifiedCount > 0) {
        return restaurant_responses_1.RESTAURANT_RESPONSES.UPDATE_SUCCESS;
    }
    else
        throw restaurant_responses_1.RESTAURANT_RESPONSES.UPDATE_FAILURE;
});
const updateMenu = (restaurantId, foodItem, action) => __awaiter(void 0, void 0, void 0, function* () {
    if (action === "add") {
        const result = yield restaurant_repo_1.default.update({ _id: restaurantId }, { $push: { menu: foodItem } });
        if (result.modifiedCount > 0)
            return restaurant_responses_1.RESTAURANT_RESPONSES.UPDATE_SUCCESS;
        else
            return restaurant_responses_1.RESTAURANT_RESPONSES.UPDATE_FAILURE;
    }
    else if (action === 'remove') {
        const result = yield restaurant_repo_1.default.update({ _id: restaurantId }, { $pull: { menu: foodItem } });
        if (result.modifiedCount > 0)
            return restaurant_responses_1.RESTAURANT_RESPONSES.UPDATE_SUCCESS;
        else
            return restaurant_responses_1.RESTAURANT_RESPONSES.UPDATE_FAILURE;
    }
});
const createBranch = (newBranchLocation, restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield find({ _id: restaurantId });
    if (!restaurant[0])
        throw restaurant_responses_1.RESTAURANT_RESPONSES.RESTAURANT_NOT_FOUND;
    if (restaurant[0].status !== constants_1.restaurantStatus.Approved) {
        throw restaurant_responses_1.RESTAURANT_RESPONSES.MAIN_BRANCH_IS_PENDING;
    }
    const result = yield restaurant_repo_1.default.update({ _id: restaurantId }, { $push: { branches: newBranchLocation } });
    if (result.modifiedCount > 0)
        return restaurant_responses_1.RESTAURANT_RESPONSES.BRANCH_ADDED;
    else
        return restaurant_responses_1.RESTAURANT_RESPONSES.BRANCH_ADD_FAILURE;
});
const remove = (restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield find({ _id: restaurantId });
    if (!restaurant[0])
        throw restaurant_responses_1.RESTAURANT_RESPONSES.RESTAURANT_NOT_FOUND;
    const result = yield restaurant_repo_1.default.update({ _id: restaurantId }, { isDeleted: true });
    if (result.modifiedCount > 0) {
        return restaurant_responses_1.RESTAURANT_RESPONSES.DELETED_SUCCESS;
    }
    else
        throw restaurant_responses_1.RESTAURANT_RESPONSES.DELETED_FAILURE;
});
exports.default = {
    create, find, createBranch, findAll, changeRestaurantStatus, remove, updateMenu, getMenu, getPublic, editRestaurant
};

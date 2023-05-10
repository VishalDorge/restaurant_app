import { FilterQuery, UpdateQuery } from "mongoose";
import restaurantRepo from "./restaurant.repo";
import { IFoodItem, IRestaurant } from "./restaurant.types";
import { RESTAURANT_RESPONSES } from "./restaurant.responses";
import { Roles, restaurantStatus } from "../../utility/constants";
import userServices from "../user/user.services";

const create = async (restaurant: IRestaurant, ownerId: string) => {
    const isRestaurantPresent = await restaurantRepo.findOne({ name: restaurant.name, location: restaurant.location });
    if (isRestaurantPresent?.ownerId === ownerId) throw RESTAURANT_RESPONSES.RESTAURANT_ALREADY_EXIST;
    restaurant.ownerId = ownerId;
    const result = await restaurantRepo.create(restaurant);
    userServices.update({_id: result.ownerId}, {$push: {restaurants: result._id}});
    return result;
}

const editRestaurant = async (restaurantId: string, data: UpdateQuery<IRestaurant>) => {
    const result = await restaurantRepo.update({_id: restaurantId}, data);
    if(result.modifiedCount>0) return RESTAURANT_RESPONSES.UPDATE_SUCCESS;
    else return RESTAURANT_RESPONSES.UPDATE_FAILURE;
}

const find = (filter: FilterQuery<IRestaurant>) => restaurantRepo.find(filter);

const getPublic = () => {
    return find({status: restaurantStatus.Approved}).select({name: 1, location: 1, branches: 1, _id: 0});
}

const getMenu = async (restaurantId: string) => {
    const restaurant = await restaurantRepo.findOne({_id: restaurantId}).select({name: 1, location: 1, branches: 1, menu: 1, _id: 0});
    if(!restaurant) return RESTAURANT_RESPONSES.RESTAURANT_NOT_FOUND;
    return restaurant;
}

const findAll = async (filter: FilterQuery<IRestaurant>, role: string) => {
    let availableRestaurants: IRestaurant[];
    if(role === Roles.ADMIN) availableRestaurants = await find({});
    else availableRestaurants = await find(filter).select({name: 1, location: 1, branches: 1, status: 1});

    const approvedRestaurants = availableRestaurants.filter(r => r.status === restaurantStatus.Approved);
    const pendingRestaurants = availableRestaurants.filter(r => r.status === restaurantStatus.Pending);
    const rejectRestaurants = availableRestaurants.filter(r => r.status === restaurantStatus.Reject);
    
    const result = {
        approved: {count: approvedRestaurants.length, approvedRestaurants},
        pending: {count: pendingRestaurants.length, pendingRestaurants},
        rejected: {count: rejectRestaurants.length, rejectRestaurants}
    }
    return result;
}

const changeRestaurantStatus = async (restaurantId: string, newStatus: string) => {
    const result = await restaurantRepo.update({_id: restaurantId}, {$set: {status: newStatus}});
    if(result.modifiedCount > 0){
        return RESTAURANT_RESPONSES.UPDATE_SUCCESS;
    }else throw RESTAURANT_RESPONSES.UPDATE_FAILURE;
}

const updateMenu = async (restaurantId: string, foodItem: IFoodItem, action: string) => {
    if(action === "add"){
        const result = await restaurantRepo.update({_id: restaurantId}, {$push: {menu: foodItem}});
        if(result.modifiedCount>0) return RESTAURANT_RESPONSES.UPDATE_SUCCESS;
        else return RESTAURANT_RESPONSES.UPDATE_FAILURE;
    }else if(action === 'remove'){
        const result = await restaurantRepo.update({_id: restaurantId}, {$pull: {menu: foodItem}});
        if(result.modifiedCount>0) return RESTAURANT_RESPONSES.UPDATE_SUCCESS;
        else return RESTAURANT_RESPONSES.UPDATE_FAILURE;
    }
}

const createBranch = async (newBranchLocation: string, restaurantId: string) => {
    const restaurant = await find({ _id: restaurantId });
    if (!restaurant[0]) throw RESTAURANT_RESPONSES.RESTAURANT_NOT_FOUND;
    if (restaurant[0].status !== restaurantStatus.Approved){
        throw RESTAURANT_RESPONSES.MAIN_BRANCH_IS_PENDING;
    }
    const result = await restaurantRepo.update({_id: restaurantId}, {$push: {branches: newBranchLocation}});
    if(result.modifiedCount > 0) return RESTAURANT_RESPONSES.BRANCH_ADDED;
    else return RESTAURANT_RESPONSES.BRANCH_ADD_FAILURE;
}

const remove = async (restaurantId: string) => {
    const restaurant = await find({_id: restaurantId});
    if(!restaurant[0]) throw RESTAURANT_RESPONSES.RESTAURANT_NOT_FOUND;
    const result = await restaurantRepo.update({_id: restaurantId}, {isDeleted: true});
    if(result.modifiedCount > 0){
        return RESTAURANT_RESPONSES.DELETED_SUCCESS;
    }else throw RESTAURANT_RESPONSES.DELETED_FAILURE;
}

export default {
    create, find, createBranch, findAll, changeRestaurantStatus, remove, updateMenu, getMenu, getPublic, editRestaurant
}
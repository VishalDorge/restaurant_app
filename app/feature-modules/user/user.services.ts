import { FilterQuery, ProjectionFields } from "mongoose";
import { Roles, restaurantStatus } from "../../utility/constants";
import { UpdateQuery } from "mongoose";
import userRepo from "./user.repo";
import { IUser } from "./user.types";
import { USER_RESPONSES } from "./user.responses";
import restaurantServices from "../restaurant/restaurant.services";

const create = async (user: IUser) => {
    user = {role: Roles.OWNER, ...user};
    const result = await userRepo.create(user);
    return result;
}

const find = (filter: FilterQuery<IUser>) => userRepo.find(filter);
const update = (filter: FilterQuery<IUser>, data: UpdateQuery<IUser>) => userRepo.update(filter, data);
const findOne = (filter: FilterQuery<IUser>) => userRepo.findOne(filter);

const remove = async (userId: string) => {
    const user = await findOne({_id: userId});
    if(!user) throw USER_RESPONSES.USER_NOT_FOUND;
    const result = await update({_id: userId}, {isDelted: true});
    const allRestaurants = await restaurantServices.find({ownerId: userId, parentRestaurant: null});
    for(let restaurant of allRestaurants){
        await restaurantServices.remove(restaurant._id);
    }
    if(result.modifiedCount>0){
        return USER_RESPONSES.DELETED_SUCCESS;
    }else return USER_RESPONSES.DELETED_FAILURE;
}

const getAllOwners = async () => {
    const allOwners = await find({role: Roles.OWNER});
    const result = [];
    for(let owner of allOwners){
        const approvedRestaurants = await restaurantServices.find({ownerId: owner._id, status: restaurantStatus.Approved});
        const pendingRestaurants = await restaurantServices.find({ownerId: owner._id, status: restaurantStatus.Pending});
        if((approvedRestaurants.length + pendingRestaurants.length) > 0){
            result.push({
                ownerId: owner._id,
                totalRestaurants: approvedRestaurants.length + pendingRestaurants.length,
                approvedRestaurants: approvedRestaurants.length,
                pendingRestaurants: pendingRestaurants.length
            });
        }
    }
    return result;
}

export default{
    create, find, findOne, update, remove, getAllOwners
}
import { FilterQuery, UpdateQuery } from "mongoose";
import { restaurantModel } from "./restaurant.schema";
import { IRestaurant } from "./restaurant.types";

const create = (restaurant: IRestaurant) => restaurantModel.create(restaurant);
const find = (filter: FilterQuery<IRestaurant>) => restaurantModel.find({...filter, isDeleted: false});
const findOne = (filter: FilterQuery<IRestaurant>) => restaurantModel.findOne({isDeleted: false, ...filter});
const update = (filter: FilterQuery<IRestaurant>, data: UpdateQuery<IRestaurant>) => restaurantModel.updateMany(filter, data);

export default{
    create, find, update, findOne
}
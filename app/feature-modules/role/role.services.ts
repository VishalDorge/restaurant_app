import { FilterQuery } from "mongoose";
import roleRepo from "./role.repo";
import { IRole } from "./role.types";

const create = (role: IRole) => roleRepo.create(role);
const findOne = (filter: FilterQuery<IRole>) => roleRepo.findOne(filter);

export default{
    create, findOne
}
import { FilterQuery } from "mongoose";
import { roleModel } from "./role.schema";
import { IRole } from "./role.types";


const create = (role: IRole) => roleModel.create(role);
const findOne = (filter: FilterQuery<IRole>) => roleModel.findOne(filter);

export default{
    create, findOne
}
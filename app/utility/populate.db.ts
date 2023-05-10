import authServices from "../feature-modules/auth/auth.services";
import roleServices from "../feature-modules/role/role.services"
import { Roles, adminData, rolesData } from "./constants"

export const populateDb = async () => {
    rolesData.forEach(role => roleServices.create(role));
    adminData.forEach(admin => authServices.register(admin));
}
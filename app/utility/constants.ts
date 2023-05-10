import { IRole } from "../feature-modules/role/role.types";
import { IUser } from "../feature-modules/user/user.types";

export const restaurantStatus = {
    'Pending' : '0',
    "Approved": "1",
    "Reject" : "-1"
}

export const Roles = {
    ADMIN: "1",
    OWNER: "2"
}

export const rolesData: IRole[] = [
    {
        _id: Roles.ADMIN,
        name: "admin"
    },
    {
        _id: Roles.OWNER,
        name: "owner"
    }
]

export const adminData: IUser[] = [
    {
        name: "admin",
        email: "admin@gmail.com",
        password: "12345",
        role: Roles.ADMIN
    }
]
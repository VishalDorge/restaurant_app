"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminData = exports.rolesData = exports.Roles = exports.restaurantStatus = void 0;
exports.restaurantStatus = {
    'Pending': '0',
    "Approved": "1",
    "Reject": "-1"
};
exports.Roles = {
    ADMIN: "1",
    OWNER: "2"
};
exports.rolesData = [
    {
        _id: exports.Roles.ADMIN,
        name: "admin"
    },
    {
        _id: exports.Roles.OWNER,
        name: "owner"
    }
];
exports.adminData = [
    {
        name: "admin",
        email: "admin@gmail.com",
        password: "12345",
        role: exports.Roles.ADMIN
    }
];

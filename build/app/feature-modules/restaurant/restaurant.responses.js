"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESTAURANT_RESPONSES = void 0;
exports.RESTAURANT_RESPONSES = {
    RESTAURANT_ALREADY_EXIST: {
        statusCode: 400,
        message: "Restaurant is Already Registered!"
    },
    RESTAURANT_NOT_FOUND: {
        statusCode: 400,
        message: "Invalid Restaurant Credentials!"
    },
    MAIN_BRANCH_IS_PENDING: {
        statusCode: 401,
        message: "Main branch is not Approved Yet!"
    },
    BRANCH_ADDED: {
        statusCode: 201,
        message: "Successfully Opened a new Branch!"
    },
    BRANCH_ADD_FAILURE: {
        statusCode: 500,
        message: "Unable to add new branch!"
    },
    DELETED_SUCCESS: {
        statusCode: 200,
        message: "Restaurant Deleted Successfully!"
    },
    DELETED_FAILURE: {
        statusCode: 403,
        message: "Unable to Delete!"
    },
    UPDATE_SUCCESS: {
        statusCode: 200,
        message: "Updated Successfully!"
    },
    UPDATE_FAILURE: {
        statusCode: 403,
        message: "Unable to Update!"
    }
};

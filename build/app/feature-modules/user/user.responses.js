"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_RESPONSES = void 0;
exports.USER_RESPONSES = {
    USER_NOT_FOUND: {
        statusCode: 400,
        message: "Invalid User ki ID"
    },
    DELETED_SUCCESS: {
        statusCode: 200,
        message: "Owner Deleted Successfully!"
    },
    DELETED_FAILURE: {
        statusCode: 403,
        message: "Unable to Delete the Owner!"
    },
};

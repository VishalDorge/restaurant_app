"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const constants_1 = require("../../utility/constants");
const restaurantSchema = new base_schema_1.BaseSchema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    branches: {
        type: [String],
        default: []
    },
    ownerId: {
        type: String,
        required: true
    },
    menu: {
        type: [{
                itemName: String,
                itemPrice: String
            }],
        default: []
    },
    status: {
        type: String,
        default: constants_1.restaurantStatus.Pending
    }
});
exports.restaurantModel = (0, mongoose_1.model)("Restaurant", restaurantSchema);

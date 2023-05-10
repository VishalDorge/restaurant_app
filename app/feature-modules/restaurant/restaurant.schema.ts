import { Document, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { IRestaurant } from "./restaurant.types";
import { restaurantStatus } from "../../utility/constants";

const restaurantSchema = new BaseSchema({

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

    ownerId : {
        type: String,
        required: true
    },

    menu : {
        type: [{
            itemName: String,
            itemPrice: String
        }],
        default: []
    },

    status: {
        type: String,
        default: restaurantStatus.Pending
    }

});

export const restaurantModel = model<Document & IRestaurant>("Restaurant", restaurantSchema);
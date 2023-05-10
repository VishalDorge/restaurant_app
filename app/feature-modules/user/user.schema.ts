import { Document, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { IUser } from "./user.types";

const userSchema = new BaseSchema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: false
    },

    // restaurants : {
    //     type: [String],
    //     required: false,
    //     default: [],
    //     ref:'Restaurant'
    // }

})

export const userModel = model<Document & IUser>("User", userSchema);
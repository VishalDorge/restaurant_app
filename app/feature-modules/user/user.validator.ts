import { param } from "express-validator";
import { validate } from "../../utility/validate";


export const DELETE_USER_VALIDATOR = [
    param("userId").isString().isLength({min: 2}).withMessage("Valid UserId Required!"),
    validate
]
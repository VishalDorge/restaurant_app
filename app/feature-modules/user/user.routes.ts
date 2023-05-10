import { NextFunction, Request, Response, Router } from "express";
import { roleValidator } from "../../middleware/role.validate";
import { Roles } from "../../utility/constants";
import userServices from "./user.services";
import { ResponseHandler } from "../../utility/response.handler";
import { DELETE_USER_VALIDATOR } from "./user.validator";

const router = Router();

router.delete("/:userId", DELETE_USER_VALIDATOR, roleValidator([Roles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = req.params;
        const result = await userServices.remove(userId);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.get("/", roleValidator([Roles.ADMIN]), async (req, res, next) => {
    try {
        const result = await userServices.getAllOwners();
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

export default router;
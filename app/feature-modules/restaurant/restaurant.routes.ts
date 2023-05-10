import { NextFunction, Request, Response, Router } from "express";
import { IRestaurant } from "./restaurant.types";
import restaurantServices from "./restaurant.services";
import { ResponseHandler } from "../../utility/response.handler";
import { roleValidator } from "../../middleware/role.validate";
import { Roles } from "../../utility/constants";
import { canDelete } from "../../middleware/can.delete";
import { canUpdateMenu } from "../../middleware/can.update.menu";
import { CHANGE_RESTAURANT_STATUS_VALIDATOR, GET_RESTAURANT_MENU_VALIDATOR, UPDATE_RESTAURANT_MENU_VALIDATOR } from "./restaurant.validators";

const router = Router();

router.post("/add", roleValidator([Roles.OWNER]), async (req, res, next) => {
    try {
        const restaurant: IRestaurant = req.body;
        const ownerId = res.locals.payload.id;
        const result = await restaurantServices.create(restaurant, ownerId);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error)
    }
});

router.post("/add/:restaurantId", roleValidator([Roles.OWNER, Roles.ADMIN]), async (req, res, next) => {
    try {
        const { restaurantId } = req.params;
        const credentials = req.body.location;
        const result = await restaurantServices.createBranch(credentials, restaurantId);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.get("/", roleValidator([Roles.ADMIN, Roles.OWNER]), async (req, res, next) => {
    try {
        const {id, role} = res.locals.payload;
        const result = await restaurantServices.findAll({ownerId: id}, role);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.get("/public", async (req, res, next) => {
    try {
        const result = await restaurantServices.getPublic()
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.get("/menu/:restaurantId", GET_RESTAURANT_MENU_VALIDATOR, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {restaurantId} = req.params;
        const result = await restaurantServices.getMenu(restaurantId);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.patch("/status", CHANGE_RESTAURANT_STATUS_VALIDATOR, roleValidator([Roles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {restaurantId, status} = req.body;
        const result = await restaurantServices.changeRestaurantStatus(restaurantId, status);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.patch("/add-menu", UPDATE_RESTAURANT_MENU_VALIDATOR, roleValidator([Roles.OWNER]), canUpdateMenu, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {restaurantId, menu} = req.body;
        const result = await restaurantServices.updateMenu(restaurantId, menu, "add");
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.patch("/delete-menu", UPDATE_RESTAURANT_MENU_VALIDATOR, roleValidator([Roles.OWNER]), canUpdateMenu, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {restaurantId, menu} = req.body;
        const result = await restaurantServices.updateMenu(restaurantId, menu, "remove");
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.patch("/", roleValidator([Roles.OWNER]), async (req, res, next) => {
    try {
        const {restaurantId, ...data} = req.body;
        const result = await restaurantServices.editRestaurant(restaurantId, data);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.delete("/", roleValidator([Roles.ADMIN, Roles.OWNER]), canDelete, async (req, res, next) => {
    try {
        const {restaurantId} = req.body;
        const result = await restaurantServices.remove(restaurantId);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

export default router;
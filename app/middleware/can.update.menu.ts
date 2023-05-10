import { NextFunction, Request, Response } from "express";
import restaurantServices from "../feature-modules/restaurant/restaurant.services";

export const canUpdateMenu = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = res.locals.payload;
    const {restaurantId} = req.body;
    const restaurant = await restaurantServices.find({_id: restaurantId, ownerId: id});
    if(restaurant[0]) next();
    else next({statusCode: 401, message: "UNAUTHORISE"});
}
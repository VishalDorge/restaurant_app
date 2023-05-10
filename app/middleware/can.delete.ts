import { NextFunction, Request, Response } from "express";
import { Roles } from "../utility/constants";
import restaurantServices from "../feature-modules/restaurant/restaurant.services";

export const canDelete = async (req: Request, res: Response, next: NextFunction) => {
    const {restaurantId} = req.body;
    const {id, role} = res.locals.payload;
    if(role === Roles.ADMIN) next();
    else{
        const restaurant = await restaurantServices.find({_id: restaurantId, ownerId: id});
        if(restaurant[0]) next();
        else next({statusCode: 403, message: "FORBIDDEN"}) 
    }
}

// export const canDeleteUser = 
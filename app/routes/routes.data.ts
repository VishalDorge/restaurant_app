import { Route } from "./routes.types"
import Routers from "../feature-modules/routes.index"
import { ExcludedPath } from "../middleware/token.validate"

export const routes: Route[] = [
    new Route("/user", Routers.UserRouter),
    new Route("/auth", Routers.AuthRouter),
    new Route("/restaurant", Routers.RestaurantRouter)
]

export const excludedPaths: ExcludedPath[] = [
    new ExcludedPath("/auth/login", "POST"),
    new ExcludedPath("/auth/register", "POST"),
    new ExcludedPath("/restaurant/public", "GET"),
    new ExcludedPath("/restaurant/menu/", "GET")
]
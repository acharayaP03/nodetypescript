import { Express, Request, Response} from "express";
import {createUserHandler} from "./controller/User.Controller";
import validate from "./middleware/validateResource";
import { createUserSchema} from "./schema/User.Schema";
import {createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler} from "./controller/Session.controller";
import {createSessionSchema} from "./schema/Session.Schema";
import {requiredUser} from "./middleware/deserializeUser";
import validateResource from "./middleware/validateResource";
import {createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema} from "./schema/Product.schema";
import {
    createProductHandler,
    deleteProductHandler,
    getProductHandler,
    updateProductHandler
} from "./controller/Product.controller";


function routes ( app: Express) {
    app.get("/apptest", (req: Request, res: Response) => res.sendStatus(200));
    /**
     * validate is the middleware that will be called during user creation.
     * it will receive one argument which will ensure data is clean from user.
     *
     * the entire process of calling this route works as follows:
     * 1.) request goes to validate middleware where req.body will be checked with Zod.
     * 2.) if the data is clean and all good, then will go to createUserController which will then call user.service
     * 3.) User.Service then uses User model when user data wil be processed, and saved to mogodb.
     */
    app.post("/api/users", validate(createUserSchema) ,createUserHandler)

    /**
     * Create session route
     */
    app.post("/api/sessions", validate(createSessionSchema), createUserSessionHandler)

    /**
     * get user sessions
     */
    app.get("/api/sessions", requiredUser , getUserSessionsHandler)

    /**
     * Delete user session
     */

    app.delete("/api/sessions", requiredUser, deleteSessionHandler)

    /**
     * Create Product
     */

    app.post("/api/products", [requiredUser, validateResource(createProductSchema)], createProductHandler)

    /**
     * Update Product
     */

    app.put("/api/products/:productId", [requiredUser, validateResource(updateProductSchema)], updateProductHandler)

    /**
     * Update Product
     */

    app.get("/api/products/:productId", validateResource(getProductSchema), getProductHandler)

    /**
     * Update Product
     */

    app.delete("/api/products/:productId", validateResource(deleteProductSchema), deleteProductHandler)
}


export default routes;
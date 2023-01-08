import { Express, Request, Response} from "express";
import {createUserHandler} from "./controller/User.Controller";
import validate from "./middleware/validateResource";
import { createUserSchema} from "./schema/User.Schema";


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
}


export default routes;
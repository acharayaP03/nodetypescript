import { Express, Request, Response} from "express";
import {createUserHandler} from "./controller/User.Controller";
import validateResource from "./middleware/validateResource";
import {createUserSchema} from "./schema/User.Schema";


function routes ( app: Express) {
    app.get("/apptest", (req: Request, res: Response) => res.sendStatus(200));
    app.post("/api/users", validateResource(createUserSchema) ,createUserHandler)
}


export default routes;
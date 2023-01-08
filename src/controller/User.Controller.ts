/**
 * user handler
 */
import { Request, Response} from "express";
import logger from "../utils/logger";
import {createUser} from "../service/User.Service";
import {CreateUserInput} from "../schema/User.Schema";

/**
 *
 * the first two empty objects on Request generic is the query and params which is not needed during creation of user
 */

export async function createUserHandler( req: Request<{}, {}, CreateUserInput["body"]>, res: Response){
    try{
        const user = await createUser(req.body)
        return user;
    }catch (e: any){
        logger.error(e);
        return res.sendStatus(409).send(e.message);
    }
}
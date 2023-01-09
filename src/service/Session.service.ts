import SessionModel from "../models/Session.model";
import logger from "../utils/logger";


/**
 *
 * @param userId
 * @param userAgent here we will save the detail of browser to which user has last logged in.
 */
export async function createSession( userId: string, userAgent: string){
    try{
        const session = await SessionModel.create({ user: userId, userAgent});

        return session.toJSON();
    }catch(e: any){
        throw new Error(e)
    }
}
import {NextFunction, Request, Response} from "express";
import {validatePassword} from "../service/User.Service";
import {createSession, findSessions, updateSession} from "../service/Session.service";
import {signJwt} from "../utils/jwtUtils";
import config from "config";
import logger from "../utils/logger";


/**
 *
 * @param req
 * @param res on response, we will send access and refresh token to the user.
 *
 * steps we need to do are a follows:
 * 1.) Validate the user's password
 * 2.) create a session
 * 3.) create a access token
 * 4.) create a refresh token
 * 5.) return access & refresh tokens
 */
export async function createUserSessionHandler(req: Request, res: Response){

    const user = await validatePassword(req.body);

    if(!user){
        return res.status(401).send('Invalid email or password.');
    }

    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = signJwt({
            ...user,
            session: session._id
        },
    { expiresIn: config.get('accessTokenExpiresIn')}
    )

    const refreshToken = signJwt({
            ...user,
            session: session._id
        },
        { expiresIn: config.get('refreshTokenExpiresIn')}
    )

    return res.send({ accessToken, refreshToken})

}


/**
 * get User sessions handler
 */

export async function getUserSessionsHandler(req: Request, res: Response){
    try{
        const user = res.locals.user._id;
        const sessions = await findSessions({ user, valid: true})

        console.log('getUserSessionsHandler: ', sessions)
        return res.send(sessions)
    }catch (e: any){
        logger.error(e)
    }
}

/**
 * Delete session or in other words, logout user
 */

export async function deleteSessionHandler(req: Request, res: Response) {
    try{
        const sessionId = res.locals.user.session;

        await updateSession({ _id: sessionId}, { valid: false })
        return res.send({
            accessToken: null,
            refreshToken: null
        });
    }catch(e: any){
        logger.error(e)
    }
}
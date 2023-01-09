import { Request, Response } from "express";
import {validatePassword} from "../service/User.Service";
import {createSession} from "../service/Session.service";
import {signJwt} from "../utils/jwtUtils";
import config from "config";


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
/**
 * this function will help us retrieve user from request object
 */
import {NextFunction, Response, Request} from "express";
import {get} from "lodash";
import {verifyJwt} from "../utils/jwtUtils";
import {reIssueAccessToken} from "../service/Session.service";

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) =>{

    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = get(req, "headers.x-refresh")

    if(!accessToken){
        return next()
    }

    const { decoded, expired } = verifyJwt(accessToken)

    if(decoded){
        res.locals.user = decoded;
        return next();
    }


    if(expired && refreshToken){
        const newAccessToken = await reIssueAccessToken({ refreshToken } as { refreshToken: string});

        if(newAccessToken) {
            res.setHeader('x-access-token', newAccessToken);
        }

        const result = verifyJwt(newAccessToken as string)

        res.locals.user = result.decoded;
        return next()
    }


    return next()
}


export const  requiredUser = (req: Request, res: Response, next: NextFunction) =>{
    const user = res.locals.user;

    if(!user){
        return res.sendStatus(403);
    }

    return next()
}
/**
 * this function will help us retrieve user from request object
 */
import {NextFunction, Response, Request} from "express";
import {get} from "lodash";
import {verifyJwt} from "../utils/jwtUtils";

export const deserializeUser = (req: Request, res: Response, next: NextFunction) =>{

    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    // @ts-ignore
    const anotherAccessToken = req.headers.authorization.split(' ')[1];
    if(!accessToken){
        return next()
    }

    //const { decoded, expired } = verifyJwt(anotherAccessToken)
    /**
     * Getting malformed jwt error. This is for sure session is not available...
     * This problem usually stems from when the value of JWT isn't available to be read at all. Check and make sure the token is available at all;
     * maybe on the environment variable on your postman or any other API testing software you're using
     */
    //console.log('Access token deserializeUser decoded: ', decoded)
    //
    // if(decoded){
    //     res.locals.user = decoded;
    //     return next();
    // }


    return next()
}


export const  requiredUser = (req: Request, res: Response, next: NextFunction) =>{
    const user = res.locals.user;

    if(!user){
        return res.sendStatus(403);
    }

    return next()
}
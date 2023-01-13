/**
 * this function will help us retrieve user from request object
 */
import {NextFunction, Response, Request} from "express";
import {get} from "lodash";
import {verifyJwt} from "../utils/jwtUtils";

export const deserializeUser = (req: Request, res: Response, next: NextFunction) =>{

    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

    if(!accessToken){
        return next()
    }

    const { decoded, expired } = verifyJwt(accessToken)

    if(decoded){
        res.locals.user = decoded;
        return next();
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
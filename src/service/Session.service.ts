import Session, { SessionDocument } from "../models/Session.model";
import {FilterQuery, UpdateQuery} from "mongoose";
import {get} from "lodash";
import {signJwt, verifyJwt} from "../utils/jwtUtils";
import {findUser} from "./User.Service";
import config from "config";


/**
 *
 * @param userId
 * @param userAgent here we will save the detail of browser to which user has last logged in.
 */
export async function createSession( userId: string, userAgent: string){
    try{
        const session = await Session.create({ user: userId, userAgent});

        return session.toJSON();
    }catch(e: any){
        throw new Error(e)
    }
}


/**
 * get session service
 */

export async function findSessions( query: FilterQuery<SessionDocument>){
    return Session.find(query).lean();
}


/**
 * update sessions:
 */

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>){
    return Session.updateOne(query, update)
}

/**
 * refreshToken if token expired, or re issue them
 */

export async function reIssueAccessToken( { refreshToken }: any){
    const { decoded } = verifyJwt(refreshToken);

    if(!decoded || get(decoded, 'session')) return false

    const session = await Session.findById(get(decoded, "session"))

    if(!session || !session.valid) return false;

    const user = await findUser({ _id: session.user});

    if(!user) return false;

    const newAccessToken = signJwt(
        {...user, session: session._id },
        { expiresIn: config.get("accessTokenExpiresIn")}
    )

    return newAccessToken


}
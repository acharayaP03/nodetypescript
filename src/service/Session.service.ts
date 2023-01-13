import SessionModel, { SessionDocument } from "../models/Session.model";


import logger from "../utils/logger";
import {FilterQuery, UpdateQuery} from "mongoose";
import Session from "../models/Session.model";
import {update} from "lodash";


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


/**
 * get session service
 */

export async function findSessions( query: FilterQuery<SessionDocument>){
    return SessionModel.find(query).lean();
}


/**
 * update sessions:
 */

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>){
    return Session.updateOne(query, update)
}
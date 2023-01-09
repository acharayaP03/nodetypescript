import { DocumentDefinition} from "mongoose";
import User, { UserDocument} from "../models/User.model";

import {omit} from "lodash";

/**
 *
 * @param input doesnot need createdAt, updatedAt and comparePassword from UserDocument
 * Calls the User model so that data can be saved to db.
 */
export async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>){
    try{
        const user = await User.create(input);

        return omit(user.toJSON(), "password");

    }catch (e: any){
        throw new Error(e)
    }
}

export async function validatePassword({ email, password}: { email: string, password: string}){
    const user = await User.findOne({ email });

    if(!user){
        return false;
    }

    const isValidPassword = await user.comparePassword(password);
    if(!isValidPassword){
        return false
    }

    return omit(user.toJSON(), 'password')
}

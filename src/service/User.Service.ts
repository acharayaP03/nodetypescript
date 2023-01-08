import { DocumentDefinition} from "mongoose";
import User, { UserDocument} from "../models/User.model";

/**
 *
 * @param input doesnot need createdAt, updatedAt and comparePassword from UserDocument
 */
export async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>){
    try{
        return await User.create(input);
    }catch (e: any){
        throw new Error(e)
    }
}
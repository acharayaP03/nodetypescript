import mongoose from "mongoose";
import { Document,Schema } from "mongoose";
import {UserDocument} from "./User.model";

/**
 * Create SessionSchema type deffinition
 */

export interface SessionDocument extends Document{
    user: UserDocument["_id"];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}


const sessionSchema = new Schema<SessionDocument>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
        valid: { type: Boolean, default: true},
        userAgent: { type: String }
    },
    {
        timestamps: true
    }
);

const Session = mongoose.model<SessionDocument>("Session", sessionSchema)

export default Session;
import mongoose from "mongoose";
import { Document, Model, model, Types, Schema, Query } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";


/**
 * Create userSchema type deffinition
 */

export interface UserInput {
    email: string;
    password: string;
    name: string;
}

export interface UserDocument extends UserInput, Document{
    createdAt: Date;
    updatedAt: Date;
    comparePassword(userPassword: string): Promise<boolean>
}


const userSchema = new Schema<UserDocument>(
    {
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        name: { type: String, required: true}
    },
    {
        timestamps: true
    }
);

/**
 * here we will hash password before we save user to our db.
 * hence why we will use presave hook from mongoose
 */

userSchema.pre("save", async function (next){
    let user = this as UserDocument;

    if(!user.isModified("password")){
        return next()
    }

    /* if user is modified, then we will salt the password using bcrypt */
    const salt  = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

    const hash =  bcrypt.hashSync(user.password, salt);
    user.password = hash;

    return next();
})

/**
 * Compare password when user logs in
 */

userSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean>{
    const user = this as UserDocument;
    return bcrypt.compare(userPassword, user.password).catch((e) => false)
}

const User = mongoose.model<UserDocument>("User", userSchema)

export default User;
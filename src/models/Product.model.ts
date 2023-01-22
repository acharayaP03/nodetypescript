import mongoose from "mongoose";
import { Document,Schema, Types } from "mongoose";
import {UserDocument} from "./User.model";

/**
 * Create Product type deffinition
 */

export interface ProductDocument extends Document{
    productId: mongoose.Schema.Types.ObjectId;
    user: UserDocument["_id"];
    title: string;
    description: string;
    price: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}


const productSchema = new Schema<ProductDocument>(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },
        title: { type: String, required: true},
        description: { type: String, required: true},
        price: { type: Number, required: true},
        image: { type: String, required: true},
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model<ProductDocument>("Product", productSchema)

export default Product;
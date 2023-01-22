import mongoose from "mongoose";
import { customAlphabet } from 'nanoid'
import { Document,Schema } from "mongoose";
import {UserDocument} from "./User.model";


const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)
/**
 * Create Product type deffinition
 */

export interface ProductDocument extends Document{
    productId: string;
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
            type: String,
            required: true,
            unique: true,
            default: () => `product_${nanoid()}`
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
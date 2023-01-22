import { Response, Request} from "express";
import {
    CreateProductType,
    deleteProductSchema,
    DeleteProductType,
    ReadProductType,
    UpdateProductType
} from "../schema/Product.schema";
import {createProduct, deleteProduct, findAndUpdateProduct, findProduct} from "../service/Product.service";
import logger from "../utils/logger";
import {ProductDocument} from "../models/Product.model";

export async function createProductHandler( req: Request<{}, {}, CreateProductType["body"]>, res: Response){
    const userId = res.locals.user._id;

    const body = req.body;

    try{
        const product = await createProduct({ ...body, user: userId} as ProductDocument);
        return res.send( product);
    }catch (e: any){
        logger.error(e.message)
    }
}

export async function updateProductHandler( req: Request<UpdateProductType["params"]>, res: Response){
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({ productId })

    if(!product){
        return res.sendStatus(404);
    }

    if(String(product.user) !== userId) return res.sendStatus(403) // if the user is not the one who created this product

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
        new: true
    });

    return res.send(updatedProduct)
}

export async function getProductHandler( req: Request<ReadProductType["params"]>, res: Response){
    const productId = req.params.productId;
    const product = await findProduct({ productId });

    if(!product){
        return res.sendStatus(404);
    }

    return res.send(product)
}

export async function deleteProductHandler( req: Request<DeleteProductType["params"]>, res: Response){
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId })

    if(!product){
        return res.sendStatus(404);
    }

    if(String(product.user) !== userId) return res.sendStatus(403) // if the user is not the one who created this product

    await deleteProduct({ productId });

    return res.sendStatus(200)
}
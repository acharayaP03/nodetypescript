import { object, number, string, TypeOf} from "zod";

const payload = {
    body: object({
        title: string({required_error: 'Title is required!'}),
        description: string({required_error: 'Description is required!'}).min(120, " Description should be at least 120 chars long"),
        image: string({required_error: 'Image is required!'}),
        price: number({required_error: 'Price is required!'})
    })
}

const params = {
    params: object({
        productId: string({
            required_error: "Product Id is required!"
        })
    })
}


export const createProductSchema = object({
    ...payload
})

export const updateProductSchema = object({
    ...payload, ...params
})

export const deleteProductSchema = object({
    ...params
})

export const getProductSchema = object({
    ...params
})




/**
 * export types
 */
export type CreateProductType = TypeOf<typeof createProductSchema>;
export type UpdateProductType = TypeOf<typeof updateProductSchema>;
export type ReadProductType = TypeOf<typeof getProductSchema>;
export type DeleteProductType = TypeOf<typeof deleteProductSchema>;
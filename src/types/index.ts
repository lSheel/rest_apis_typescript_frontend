import {array, boolean, InferOutput, number, object, string} from "valibot";

export const DraftProductSChema = object({
    name : string(),
    price : number()

})

export const ProductSchema = object({
    id: number(),
    name : string(),
    price : number(),
    availability: boolean()
})

export const GetProductSchema = array(ProductSchema)


export type GetProduct = InferOutput<typeof GetProductSchema>
export type Product = InferOutput<typeof ProductSchema>
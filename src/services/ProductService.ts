import {safeParse, pipe, number, parse, transform, string} from "valibot";
import { DraftProductSChema, GetProductSchema, Product, ProductSchema} from "../types";
import axios from "axios";
import { toBoolean } from "../helpers";


type ProductData = {
    [k: string]: FormDataEntryValue;
}



export async function addProduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductSChema, {
            name : data.name,
            price : +data.price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name : result.output.name,
                price: result.output.price,
            })
        }else{
            throw new Error('Datos no validos')
        }
        
    } catch (error) {
        console.log(error);
    }
    
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)
        const result = safeParse(GetProductSchema, data.data)
        if(result.success ){
            console.log(result.output);
            return result.output

        }
        else{
            throw new Error('Hubo un error...')
        }        
    } catch (error) {
        console.log(error);
    }
    
}

export async function getProductsById(id : Product['id']) {
    try {

        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductSchema, data)
        if(result.success ){
            return result.output

        }
        else{
            throw new Error('Hubo un error...')
        }        
    } catch (error) {
        console.log(error);
    }
    
}

export async function updateProduct(data : ProductData, id : Product['id']) {
  try {
    const numberSchema = pipe(string(), transform(Number), number())
    const result = safeParse(ProductSchema, {
        id,
        name: data.name,
        price: parse(numberSchema, data.price),
        availability : toBoolean(data.availability.toString())
    })
    if (result.success) {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.put(url, result.output)
    }
     
  } catch (error) {
    console.log(error);
  } 
} 

export async function deleteProduct(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
        
    } catch (error) {
        console.log(error);
    }
}

export async function updateProductAvailability(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)  
    } catch (error) {
        console.log(error);
    }
    
}
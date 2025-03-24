import { ActionFunctionArgs } from "react-router-dom";
import { updateProductAvailability } from "../services/ProductService";

export async function action( {request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    if(data.id !== undefined){
        console.log(data.id);
    await updateProductAvailability(+data.id)
    }
}
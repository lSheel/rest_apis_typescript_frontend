import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { getProductsById } from "../services/ProductService";

export async function loader({ params }: LoaderFunctionArgs) {
  // Verifica si params.id está definido
  if (params.id === undefined) {
    return redirect('/'); // Redirige si no hay id
  }

  // Convierte el id a número
  const id = +params.id;

  // Valida que el id sea un número válido
  if (isNaN(id)) {
    console.error("ID inválido:", params.id);
    return redirect('/'); // Redirige si el id no es un número válido
  }

  // Obtén el producto usando el id
  const product = await getProductsById(id);

  // Si no se encuentra el producto, redirige
  if (!product) {
    return redirect('/');
  }

  // Retorna el producto
  return product;
}

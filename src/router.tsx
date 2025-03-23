import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products from "./views/Products";
import { loader as productsLoader} from './utils/getLoader'
import { action as ProductAction } from './utils/action'
import { loader as updateLoader } from "./utils/updateLoader";
import { action as updateAction } from "./utils/updateAction";
import { action as deleteAction} from "./utils/deleteAction";
import { action as availabilityAction} from './utils/availabilityAction'
import NewProduct  from "./views/NewProduct";
import EditProduct from "./views/EditProduct";
//React router nos permite definir rutas para la aplicacion s

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: availabilityAction
      },
      {
        path: 'productos/nuevo',
        element: <NewProduct/>,
        action: ProductAction
      },
      {
        path: 'productos/:id/editar', //ROA Pattern -  Resource oriented design
        element: <EditProduct/>,
        loader: updateLoader,
        action: updateAction
      },
      {
        path: 'productos/:id/eliminar', //ROA Pattern -  Resource oriented design
        action: deleteAction
      }
      
    ],
  },
]);

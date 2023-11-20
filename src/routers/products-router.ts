import { Router } from "express";
import { createProducts, destroy, findAll, findProduct, startImport, updateProduct } from "../controllers/products-controller.js";



const productRouter = Router();

productRouter.post('/products', createProducts)
productRouter.post('/import', startImport)
productRouter.get('/products', findAll)
productRouter.get('/products/:code', findProduct)
productRouter.put('/products/:code', updateProduct)
productRouter.delete('/products/:code', destroy)

export default productRouter;
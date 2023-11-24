import { Router } from "express";
import { createProducts, destroy, findAll, findProduct, importData, updateProduct } from "../controllers/products-controller";



const productRouter = Router();

productRouter.post('/products', createProducts)
productRouter.post('/import', importData)
productRouter.get('/products', findAll)
productRouter.get('/products/:code', findProduct)
productRouter.put('/products/:code', updateProduct)
productRouter.delete('/products/:code', destroy)

export default productRouter;
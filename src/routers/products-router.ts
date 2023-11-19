import { Router } from "express";
import { createProducts, findAll, findProduct, startImport } from "../controllers/products-controller.js";



const productRouter = Router();

productRouter.post('/products', createProducts)
productRouter.post('/import', startImport)
productRouter.get('/get', findAll)
productRouter.get('/products/:code', findProduct)

export default productRouter;
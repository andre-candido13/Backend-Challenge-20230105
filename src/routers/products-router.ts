import { Router } from "express";
import { createProducts, findAll, startImport } from "../controllers/products-controller.js";



const productRouter = Router();

productRouter.post('/products', createProducts)
productRouter.post('/import', startImport)
productRouter.get('/get', findAll)

export default productRouter;
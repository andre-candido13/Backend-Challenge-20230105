import { Router } from "express";
import { createProducts, startImport } from "../controllers/products-controller.js";



const productRouter = Router();

productRouter.post('/products', createProducts)
productRouter.post('/import', startImport)

export default productRouter;
import { Router } from "express";
import { createProducts } from "../controllers/products-controller.js";



const productRouter = Router();

productRouter.post('/products', createProducts)

export default productRouter;
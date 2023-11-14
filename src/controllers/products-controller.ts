import { Request, Response } from "express";
import { Product } from "../interface/product-interface";
import httpStatus from "http-status";
import createProductsService from "../service/products-service.js";



export async function createProducts (req: Request, res: Response) {

    const {
        status,
        imported_t,
        url,
        creator,
        created_t,
        last_modified_t,
        product_name,
        quantity,
        brands,
        categories,
        labels,
        cities,
        purchase_places,
        stores,
        ingredients_text,
        traces,
        serving_size,
        serving_quantity,
        nutriscore_score,
        nutriscore_grade,
        main_category,
        image_url
    } = req.body as Product

    try {
        await createProductsService.createProducts({
            status,
            imported_t,
            url,
            creator,
            created_t,
            last_modified_t,
            product_name,
            quantity,
            brands,
            categories,
            labels,
            cities,
            purchase_places,
            stores,
            ingredients_text,
            traces,
            serving_size,
            serving_quantity,
            nutriscore_score,
            nutriscore_grade,
            main_category,
            image_url
        })
            return res.sendStatus(httpStatus.CREATED)


    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    }

}
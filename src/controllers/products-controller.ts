import { NextFunction, Request, Response } from "express";
import { ProductCreate } from "../interface/product-interface";
import httpStatus from "http-status";
import productsService from "../service/products-service.js";
import axios, { AxiosResponse } from "axios";
import { importProducts } from "../service/cron-importProducts-service.js";
import pako from "pako"





export async function createProducts(req: Request, res: Response, next: NextFunction) {
    
    try {
    const {
        code,
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
    } = req.body as ProductCreate

        await productsService.createProducts({
            code,
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
       next(err)
    }

}
export async function importData() {
    try {
    const url = 'https://challenges.coode.sh/food/data/json/index.txt';

       
        const indexResponse = await axios.get<string>(url);
        const fileNames = indexResponse.data.split('\n').filter(Boolean);

        
        const targetFileName = 'products_01.json.gz';


        const fileUrl = `https://challenges.coode.sh/food/data/json/${targetFileName}`;

        // Baixar o arquivo .gz
        const fileResponse: AxiosResponse<ArrayBuffer> = await axios.get(fileUrl, { responseType: 'arraybuffer' });

        
        const inflatedData = pako.inflate(new Uint8Array(fileResponse.data), { to: 'string' });
        console.log(inflatedData)

        await importProducts(JSON.parse(inflatedData));

        
    } catch (err) {
        console.error(err)
    }
}

export async function startImport(req: Request, res: Response, next: NextFunction) {

    try {
        await importData()
        res.sendStatus(httpStatus.CREATED)

    } catch (err) {
        next (err)
    }

}


export async function findAll(req: Request, res: Response, next: NextFunction) {

    try {

        const foods = await productsService.findAll()
        res.send(foods)

    } catch (err) {
       next(err)
    }



}

export async function findProduct (req: Request, res: Response, next: NextFunction) {
    try {

   const productCode = +req.params.code


       const products= await productsService.findProduct(productCode)

            res.status(httpStatus.OK).send(products)
            
    } catch (err) {
        next(err)
    }

}

export async function updateProduct (req: Request, res: Response, next: NextFunction) {

    
    const productCode = +req.params.code
    
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
    } = req.body as ProductCreate
    
    try {
    await productsService.updateProduct(productCode,{
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
        image_url})

        res.sendStatus(201)
    } catch (err) {
        next(err)
    }

}
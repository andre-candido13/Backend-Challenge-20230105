import { Request, Response } from "express";
import { ProductCreate } from "../interface/product-interface";
import httpStatus from "http-status";
import productsService from "../service/products-service.js";
import axios, { AxiosResponse } from "axios";
import { importProducts } from "../service/cron-importProducts-service.js";
import pako from "pako"





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
    } = req.body as ProductCreate

    try {
        await productsService.createProducts({
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
export async function importData() {
    const url = 'https://challenges.coode.sh/food/data/json/index.txt';
  
    try {
      // Obter a lista de nomes de arquivos do índice
      const indexResponse = await axios.get<string>(url);
      const fileNames = indexResponse.data.split('\n').filter(Boolean);
  
      // Escolher o arquivo específico que você deseja importar (por exemplo, "products_01.json.gz")
      const targetFileName = 'products_01.json.gz';
  
      
        const fileUrl = `https://challenges.coode.sh/food/data/json/${targetFileName}`;
  
        // Baixar o arquivo .gz
        const fileResponse: AxiosResponse<ArrayBuffer> = await axios.get(fileUrl, { responseType: 'arraybuffer' });
  
        // Descomprimir os dados usando pako diretamente
        const inflatedData = pako.inflate(new Uint8Array(fileResponse.data), { to: 'string' });
        console.log('Conteúdo dos primeiros 100 caracteres:', inflatedData.toString().slice(0, 100));
  
        // Verificar se a descompressão foi bem-sucedida
    } catch (err) {
      console.error(err)
    }
  }

  export async function startImport (req: Request, res: Response) {

    try {
        await importData()
            res.sendStatus(httpStatus.CREATED)
        
    } catch(err) {
        res.status(httpStatus.BAD_REQUEST).send(err.message)
    }

}


export async function findAll (req: Request, res: Response) {

    try {

const foods = productsService.findAll()
    res.send(foods)

    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err.message)
    }



}
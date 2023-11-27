import { NextFunction, Request, Response } from "express";
import { ProductCreate } from "../interface/product-interface";
import httpStatus from "http-status";
import productsService from "../service/products-service";
import { importProducts } from "../service/importProducts-service";
import { promisify } from 'util';
import path from "path";
import * as fs from 'fs';
import * as readline from 'readline';
import stream from 'stream';
import  childProcess  from "child_process";


const readFileAsync = promisify(fs.readFile);

export async function createProducts(req: Request, res: Response, next: NextFunction) {

  try {
    const productData = req.body as ProductCreate

    await productsService.createProducts(productData)
    return res.sendStatus(httpStatus.CREATED)


  } catch (err) {
    next(err)
  }

}

async function readFirstNLines(filePath: string, n: number): Promise<string> {
  const instream = fs.createReadStream(filePath, 'utf-8');
  const outstream = new stream.Writable()
  const rl = readline.createInterface(instream, outstream);

  let lines = '';
  let lineCount = 0;

  // Define um listener para o evento de linha
  rl.on('line', (line) => {
    lines += line + '\n';
    lineCount++;

    // Verifica se atingiu o número desejado de linhas
    if (lineCount === n) {
      rl.close();
    }
  });

  // Retorna uma Promise resolvida quando a leitura estiver completa
  return new Promise((resolve) => {
    rl.on('close', () => {
      resolve(lines);
    });
  });
}


export async function importData(): Promise<void> {
  try {

    const targetFileName = 'products_03.json.gz';
    const fileUrl = `https://challenges.coode.sh/food/data/json/${targetFileName}`;

    //Baixar o arquivo .gz usando curl
    const curlCommand = `curl -O ${fileUrl}`;
    childProcess.execSync(curlCommand);

    //Descompactar o arquivo usando gzip
   const gzipCommand = `gzip -df ${targetFileName}`;
    childProcess.execSync(gzipCommand);

    const fileName = 'products_03.json';
    

   
    const filePath = path.resolve(__dirname, '..', '..', fileName);

    // Lê o conteúdo do arquivo como string
    const fileContent = await readFirstNLines(filePath, 50);

    //console.log('Conteúdo do arquivo:', fileContent);

    const objects = fileContent.split('\n').map(line => line.trim()).filter(line => line !== '');
    const jsonArray = `[${objects.join(',')}]`;
  

    // Faz o parsing do JSON
    const parsing = JSON.parse(jsonArray);
    console.log(parsing)

    // Agora você pode passar o array jsonArray para a sua função importProducts
    await importProducts(parsing);

  

  } catch (err) {
     console.error(err.message)
  }
}


export async function findAll(req: Request, res: Response, next: NextFunction) {

  try {

    const { page, pageSize } = req.query;

    if (page !== undefined && pageSize !== undefined) {

      const foods = await productsService.findAllWithPagination(+page, +pageSize);
      res.send(foods);
    } else {

      const foods = await productsService.findAll();
      res.send(foods);
    }
  } catch (err) {
    next(err);
  }
}



export async function findProduct(req: Request, res: Response, next: NextFunction) {
  try {

    const productCode = +req.params.code


    const products = await productsService.findProduct(productCode)

    res.status(httpStatus.OK).send(products)

  } catch (err) {
    next(err)
  }

}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {


  const productCode = +req.params.code

  const productData = req.body as ProductCreate

  try {

    await productsService.updateProduct(productCode, productData)

    res.sendStatus(201)
  } catch (err) {
    next(err)
  }

}


export async function destroy(req: Request, res: Response, next: NextFunction) {

  const productCode = +req.params.code

  try {

    await productsService.destroy(productCode)
    res.sendStatus(201)

  } catch (err) {
    next(err)
  }

}

function exists(filePath: string) {
  throw new Error("Function not implemented.");
}

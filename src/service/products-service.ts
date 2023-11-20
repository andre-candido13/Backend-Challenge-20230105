import { ProductCreate } from "../interface/product-interface.js";
import productsRepository from "../repository/products-repository.js";
import { notFoundError } from "../errors/index.js";




async function createProducts (createProduct: ProductCreate) {

const products = await productsRepository.createProducts(createProduct)
    return products

}

async function findAll () {

    const foods = await productsRepository.findAll()

    if (!foods.rowCount){ 
        throw notFoundError()
    }   
    return foods.rows

}


async function findProduct (code: number) {
    const productResult = await productsRepository.findProduct(code);

    if (!productResult.rowCount) {
        throw notFoundError()
    }

    return productResult.rows[0];
   
}

async function updateProduct (productCode: number, updateProduct: ProductCreate)
 {

    const existingProduct = await productsRepository.findProduct(productCode)

    if (!existingProduct.rows || existingProduct.rows.length === 0) {
      throw notFoundError()
    }    

    const update = await productsRepository.updateProducts(productCode, updateProduct)
       return update
}


async function destroy (productCode: number) {

    const existingProduct = await productsRepository.findProduct(productCode)

    if (!existingProduct.rows || existingProduct.rows.length === 0) {
        throw notFoundError()
      }  


  await productsRepository.updateProductsStatus(productCode, "trash");

}






const productsService = {
    createProducts,
    findAll,
    findProduct,
    updateProduct,
    destroy
}

export default productsService;
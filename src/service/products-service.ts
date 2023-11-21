import { ProductCreate } from "../interface/product-interface";
import productsRepository from "../repository/products-repository";
import { notFoundError } from "../errors/index";


async function createProducts(createProduct: ProductCreate) {

  const products = await productsRepository.createProducts(createProduct)
  return products

}

async function findAll(page = 1, pageSize = 10) {

  if (page !== undefined && pageSize !== undefined) {

    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const products = await productsRepository.findAllWithPagination(offset, limit);

    if (!products.rowCount) {
      throw notFoundError();
    }

    return products.rows;
  } else {

    const allProducts = await productsRepository.findAll();

    if (!allProducts.rowCount) {
      throw notFoundError();
    }

    return allProducts.rows;
  }

}

async function findAllWithPagination(page: number, pageSize: number) {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const products = await productsRepository.findAllWithPagination(offset, limit);

  if (!products.rowCount) {
    throw notFoundError();
  }

  return products.rows;
}


async function findProduct(code: number) {
  const productResult = await productsRepository.findProduct(code);

  if (!productResult.rowCount) {
    throw notFoundError()
  }

  return productResult.rows[0];

}

export async function updateProduct(productCode: number, updateProduct: ProductCreate) {

  const existingProduct = await productsRepository.findProduct(productCode)

  if (!existingProduct.rows || existingProduct.rows.length === 0) {
    throw notFoundError()
  }

  const update = await productsRepository.updateProducts(productCode, updateProduct)
  return update
}


async function destroy(productCode: number) {

  const existingProduct = await productsRepository.findProduct(productCode)

  if (!existingProduct.rows || existingProduct.rows.length === 0) {
    throw notFoundError()
  }


  await productsRepository.updateProductsStatus(productCode, "trash");

}

const productsService = {
  createProducts,
  findAll,
  findAllWithPagination,
  findProduct,
  updateProduct,
  destroy,

}

export default productsService;
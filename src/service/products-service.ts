import { ProductCreate } from "../interface/product-interface.js";
import productsRepository from "../repository/products-repository.js";
import { notFoundError } from "../errors/index.js";


async function createProducts ({
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

}: ProductCreate) {

const products = await productsRepository.createProducts({
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
    return products

}

async function findAll () {

    const foods = await productsRepository.findAll()

    if (!foods.rowCount) throw notFoundError
   
    return foods.rows

}


async function findProduct (code: number) {
    const productResult = await productsRepository.findProduct(code);

    if (!productResult.rowCount ) throw notFoundError()
    
    console.log(productResult.rows[0])
    return productResult.rows[0];
   
}

async function updateProduct (productCode: number, {
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
    
    }: ProductCreate)
 {

    const existingProduct = await productsRepository.findProduct(productCode)
    if (!existingProduct.rowCount) throw notFoundError()


    const update = productsRepository.updateProducts(productCode, { 
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
        } )

       return update

       




}







const productsService = {
    createProducts,
    findAll,
    findProduct,
    updateProduct
}

export default productsService;
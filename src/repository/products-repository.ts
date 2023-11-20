import { ProductCreate } from "../interface/product-interface";
import { db } from "../database/database.js";


async function createProducts ( createProduct: ProductCreate ) {

    await db.query(`INSERT INTO products (
    "code",
    "status",
    "imported_t",
    "url",
    "creator",
    "created_t",
    "last_modified_t",
    "product_name",
    "quantity",
    "brands", 
    "categories",
    "labels",
    "cities",
    "purchase_places",
    "stores",
    "ingredients_text",
    "traces",
    "serving_size",
    "serving_quantity",
    "nutriscore_score",
    "nutriscore_grade",
    "main_category",
    "image_url"
    ) VALUES ($1, $2, $3, $4, $5, to_timestamp($6), to_timestamp($7), $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23
    )`, [
        createProduct.code,
        createProduct.status,
        createProduct.imported_t,
        createProduct.url,
        createProduct.creator,
        createProduct.created_t,
        createProduct.last_modified_t,
        createProduct.product_name,
        createProduct.quantity,
        createProduct.brands,
        createProduct.categories,
        createProduct.labels,
        createProduct.cities,
        createProduct.purchase_places,
        createProduct.stores,
        createProduct.ingredients_text,
        createProduct.traces,
        createProduct.serving_size,
        createProduct.serving_quantity,
        createProduct.nutriscore_score,
        createProduct.nutriscore_grade,
        createProduct.main_category,
        createProduct.image_url 

    ])

}


async function findAll () {

    return await db.query(`SELECT * FROM products`)
   

}

async function findProduct (code: number) {

    return await db.query(`SELECT * FROM products WHERE code=$1`, [code])

}

async function updateProducts (productCode: number, updateProduct: ProductCreate) {

    await db.query(`
    UPDATE products 
    SET 
        status = $1,
        imported_t = $2,
        url = $3,
        creator = $4,
        created_t = to_timestamp($5),
        last_modified_t = to_timestamp($6),
        product_name= $7,
        quantity = $8,
        brands = $9, 
        categories = $10,
        labels = $11,
        cities = $12,
        purchase_places = $13,
        stores= $14,
        ingredients_text = $15,
        traces = $16,
        serving_size = $17,
        serving_quantity = $18,
        nutriscore_score = $19,
        nutriscore_grade = $20,
        main_category = $21,
        image_url = $22
        WHERE code = $23
        `, [
        updateProduct.status,
        updateProduct.imported_t,
        updateProduct.url,
        updateProduct.creator,
        updateProduct.created_t,
        updateProduct.last_modified_t,
        updateProduct.product_name,
        updateProduct.quantity,
        updateProduct.brands,
        updateProduct.categories,
        updateProduct.labels,
        updateProduct.cities,
        updateProduct.purchase_places,
        updateProduct.stores,
        updateProduct.ingredients_text,
        updateProduct.traces,
        updateProduct.serving_size,
        updateProduct.serving_quantity,
        updateProduct.nutriscore_score,
        updateProduct.nutriscore_grade,
        updateProduct.main_category,
        updateProduct.image_url,
        productCode
        ])

}

async function updateProductsStatus (productCode: number, newStatus: string) {

    await db.query('UPDATE products SET status = $1 WHERE code = $2', [newStatus, productCode]);

}






const productsRepository = {
    createProducts,
    findAll,
    findProduct, 
    updateProducts,
    updateProductsStatus
}

export default productsRepository;
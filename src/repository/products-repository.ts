import { Product } from "../interface/product-interface";
import { db } from "../database/database.js";


async function createProducts ({
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
}: Product ) {

    await db.query(`INSERT INTO products (
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
    ) VALUES ($1, $2, $3, $4, to_timestamp($5), to_timestamp($6), $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22
    )`, [
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

    ])

}

const createProductsRepository = {
    createProducts
}

export default createProductsRepository;
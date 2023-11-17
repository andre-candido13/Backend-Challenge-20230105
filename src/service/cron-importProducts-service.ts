import { Product } from "../interface/product-interface";
import createProductsRepository from "../repository/products-repository.js";



export async function importProducts (data:any) {

    const importDate = new Date();
    const status = 'draft'
    const productsToImport = data.slice(0, 100);

    const importPromises = productsToImport.map(async (productData) => {
        const product: Product =  {
            status: status,
            imported_t: importDate,
            url: productData.url,
            creator: productData.creator,
            created_t: productData.created_t,
            last_modified_t: productData.last_modified_t,
            product_name: productData.product_name,
            quantity: productData.quantity,
            brands: productData.brands,
            categories: productData.categories,
            labels: productData.labels,
            cities: productData.cities,
            purchase_places: productData.purchase,
            stores: productData.sotres,
            ingredients_text: productData.ingredients_text,
            traces: productData.traces,
            serving_size: productData.serving_size,
            serving_quantity: productData.serving_quantity,
            nutriscore_score: productData.nutriscore_score,
            nutriscore_grade: productData.nutriscore_grade,
            main_category: productData.main_category,
            image_url: productData.image_url

        }
            await createProductsRepository.createProducts(product)

    })

    await Promise.all(importPromises)
}


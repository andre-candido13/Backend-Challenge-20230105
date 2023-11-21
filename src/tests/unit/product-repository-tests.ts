import { db } from "database/database";
import productsRepository from "repository/products-repository";
import { ProductCreate } from "interface/product-interface";


jest.mock("database/database")


describe("find all prodcuts endpoint GET /", ()=> {
    it("should return all products", async () => {

        const mockProducts = [
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' },
           ];

        (db.query as jest.Mock).mockResolvedValue({ rowCount: mockProducts.length, rows: mockProducts });

        const result = await productsRepository.findAll();

        expect(db.query).toHaveBeenCalledWith('SELECT * FROM products');
        expect(result.rows).toEqual(mockProducts);

    })

})

describe("findProduct endpoint GET /products/:code",() =>{
    it("should be return products from repository", async () => {

  
    const mockProduct = { code: 123, name: 'Test Product' };

    (db.query as jest.Mock).mockResolvedValue({ rowCount: 1, rows: [mockProduct] });

    const result = await productsRepository.findProduct(123);

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM products WHERE code=$1', [123]);
    expect(result).toEqual({ rowCount: 1, rows: [mockProduct] });
  });

  it('should handle not finding product', async () => {
    (db.query as jest.Mock).mockResolvedValue({ rowCount: 0, rows: [] });

    const result = await productsRepository.findProduct(263);

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM products WHERE code=$1', [263]);
    expect(result).toEqual({ rowCount: 0, rows: [] });
})
  });

  describe("update products endpoint PUT /products/:code", () => {
    it("should return the updates", async ()=> {
        const mockUpdateProduct: ProductCreate = {
            status: "published",
            imported_t: new Date("2020-02-07T16:00:00Z"),
            url: "https://world.openfoodfacts.org/product/20221126",
            creator: "securita",
            created_t: 1415302075,
            last_modified_t: 1572265837,
            product_name: "Product 1 updated",
            quantity: "380 g (6 x 2 u.)",
            brands: "La Cestera",
            categories: "Lanches comida, Lanches doces, Biscoitos e Bolos, Bolos, Madalenas",
            labels: "Contem gluten, Contém derivados de ovos, Contém ovos",
            cities: "",
            purchase_places: "Braga,Portugal",
            stores: "Lidl",
            ingredients_text: "farinha de trigo, açúcar, óleo vegetal de girassol, clara de ovo, ovo, humidificante (sorbitol), levedantes químicos (difosfato dissódico, hidrogenocarbonato de sódio), xarope de glucose-frutose, sal, aroma",
            traces: "Frutos de casca rija,Leite,Soja,Sementes de sésamo,Produtos à base de sementes de sésamo",
            serving_size: "madalena 31.7 g",
            serving_quantity: 31.7,
            nutriscore_score: 17,
            nutriscore_grade: "d",
            main_category: "en:madeleines",
            image_url: "https://static.openfoodfacts.org/images/products/20221126/front_pt.5.400.jpg"
         
          };

          const productCode = 1313;

          (db.query as jest.Mock).mockResolvedValue(undefined);

          await productsRepository.updateProducts(productCode, mockUpdateProduct);
    
          expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE products'),
            expect.arrayContaining([
                mockUpdateProduct.status,
                mockUpdateProduct.imported_t,
                mockUpdateProduct.url,
                mockUpdateProduct.creator,
                mockUpdateProduct.created_t,
                mockUpdateProduct.last_modified_t,
                mockUpdateProduct.product_name,
                mockUpdateProduct.quantity,
                mockUpdateProduct.brands,
                mockUpdateProduct.categories,
                mockUpdateProduct.labels,
                mockUpdateProduct.cities,
                mockUpdateProduct.purchase_places,
                mockUpdateProduct.stores,
                mockUpdateProduct.ingredients_text,
                mockUpdateProduct.traces,
                mockUpdateProduct.serving_size,
                mockUpdateProduct.serving_quantity,
                mockUpdateProduct.nutriscore_score,
                mockUpdateProduct.nutriscore_grade,
                mockUpdateProduct.main_category,
                mockUpdateProduct.image_url,
                productCode
            ])
          );

    })
  })





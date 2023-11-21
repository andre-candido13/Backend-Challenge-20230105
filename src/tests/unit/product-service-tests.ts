import productsService, { updateProduct } from "service/products-service";
import productsRepository from "repository/products-repository";
import { ProductCreate } from "interface/product-interface";
import { notFoundError } from "errors";

jest.mock("repository/products-repository")


describe("create Products", () => {
it("should call productsRepository.createProducts with correct parameters", async () => {

    const productData: ProductCreate = { 
        code: 20221126,
        status: "published",
        imported_t: new Date("2020-02-07T16:00:00Z"),
        url: "https://world.openfoodfacts.org/product/20221126",
        creator: "securita",
        created_t: 1415302075,
        last_modified_t: 1572265837,
        product_name: "Madalenas quadradas",
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
     
    }

    const createProductsMock = productsRepository.createProducts as jest.Mock;
    createProductsMock.mockResolvedValue(productData);

    const result = await productsService.createProducts(productData)

    expect(createProductsMock).toHaveBeenCalledWith(productData);

    expect(result).toEqual(productData);

})
})

describe("findProduct endpoint GET /products", () => {
    it("should return the product when found", async () => {
      const mockProduct = { id: 1, name: "Product 1" };

      const findProductMock = productsRepository.findProduct as jest.Mock;
      findProductMock.mockResolvedValue({ rowCount: 1, rows: [mockProduct] })
  
      const result = await productsService.findProduct(1);
  
      expect(productsRepository.findProduct).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });
  
    it("should throw notFoundError when product is not found", async () => {
     const findProductMock = productsRepository.findProduct as jest.Mock;
     findProductMock.mockResolvedValue({ rowCount: 0, rows: [] });
  
      await expect(productsService.findProduct(1)).rejects.toThrow(notFoundError());
    });
  });

  describe("update Product endpoint PUT products/:code", () =>{
    it("should return an update of fields on product", async () =>{

      const mockProduct = {id: 1, name: "Product 1"}
      const mockUpdateProduct: ProductCreate = {
        code: 20221126,
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

      const findProductMock = productsRepository.findProduct as jest.Mock;
      findProductMock.mockResolvedValue({ rowCount: 1, rows: [mockProduct] })

      const updateProductMock = productsRepository.updateProducts as jest.Mock
      updateProductMock.mockResolvedValue(mockUpdateProduct)
      

      const result = await updateProduct(1, mockUpdateProduct);

      expect(findProductMock).toHaveBeenCalledWith(1);
      expect(updateProductMock).toHaveBeenCalledWith(1, mockUpdateProduct);
      expect(result).toEqual(mockUpdateProduct);

      
    })
      it("should throw notFoundError when the product is not found", async () => {
        const findProductMock = productsRepository.findProduct as jest.Mock;
        findProductMock.mockResolvedValue({ rowCount: 0, rows: [] });

        const mockUpdateProduct: ProductCreate = {
          code: 20221126,
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


    
        await expect(updateProduct(1, mockUpdateProduct)).rejects.toThrow(notFoundError());
      });

  })
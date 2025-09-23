import ProductFactory from "../../../domain/product/factory/product.factory";
import { ProductType } from "../create/create.product.dto";
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create(ProductType.A, "Product A", 100);

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
    it("should update a product A", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);
        const input: InputUpdateProductDto = {
            id: product.id,
            name: "Product A Updated",
            price: 150,
        }

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should update a product B", async () => {
        const product = ProductFactory.create(ProductType.B, "Product B", 200);
        const productRepository = MockRepository();
        productRepository.find.mockReturnValue(Promise.resolve(product));

        const productUpdateUseCase = new UpdateProductUseCase(productRepository);
        const input: InputUpdateProductDto = {
            id: product.id,
            name: "Product B Updated",
            price: 250
        };

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual({
            ...input,
            price: 500,
        });
    });

    it("should thrown an error when product not found", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockReturnValue(Promise.reject(new Error("Product not found")));
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);
        const input: InputUpdateProductDto = {
            id: "fake id",
            name: "Product B Updated",
            price: 250
        };

        await expect(productUpdateUseCase.execute(input)).rejects.toThrow(
            "Product not found"
        );
    });

    it("should thrown an error when name is missing", async () => { 
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);
        const input: InputUpdateProductDto = {
            id: product.id,
            name: "",
            price: 250
        };

        await expect(productUpdateUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );  
    });

    it("should thrown an error when price is less than zero", async () => { 
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);
        const input: InputUpdateProductDto = {
            id: product.id,
            name: "Product A",
            price: -1
        };

        await expect(productUpdateUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );  
    });
});
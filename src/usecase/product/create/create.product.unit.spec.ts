import { ProductType } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
    it("should create a product A", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const input = {
            name: "Product A",
            price: 100,
            type: ProductType.A
        }

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should create a product B", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const input = {
            name: "Product B",
            price: 200,
            type: ProductType.B
        }

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price * 2,
        });
    });

    it("should thrown an error when name is missing", async () => { 
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const input = {
            name: "",
            price: 200,
            type: ProductType.A
        }

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );  
    });

    it("should thrown an error when price is less than 0 missing", async () => { 
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const input = {
            name: "Product A",
            price: -1,
            type: ProductType.A
        }

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });
});
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";
import { InputCreateProductDto, ProductType } from "../create/create.product.dto";
import { InputUpdateProductDto } from "./update.product.dto";

describe("Integration test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product A", async () => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const input: InputCreateProductDto = {
            name: "Product A",
            price: 100,
            type: ProductType.A
        };

        const result = await productCreateUseCase.execute(input);

        const inputUpdated: InputUpdateProductDto = {
            id: result.id,
            name: "Product A Updated",
            price: 200
        };

        const resultUpdated = await productUpdateUseCase.execute(inputUpdated);

        expect(resultUpdated).toEqual({
            id: result.id,
            name: inputUpdated.name,
            price: inputUpdated.price,
        });
    });
});

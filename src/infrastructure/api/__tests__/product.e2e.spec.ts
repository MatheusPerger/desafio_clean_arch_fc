import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product A",
                price: 100,
                type: "a"
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product A");
        expect(response.body.price).toBe(100);
    });

    it("should create a product B", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product B",
                price: 100,
                type: "b"
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product B");
        expect(response.body.price).toBe(200);
    });

    it("should not create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "john",
        });

        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product A",
                price: 100,
                type: "a"
            });
        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                name: "Product B",
                price: 200,
                type: "b"
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();
        
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        expect(listResponse.body.products[0].name).toBe("Product A");
        expect(listResponse.body.products[0].price).toBe(100);
        expect(listResponse.body.products[1].name).toBe("Product B");
        expect(listResponse.body.products[1].price).toBe(400);
    });
});
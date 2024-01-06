const app = require('../../app');
const request = require('supertest');
const { sequelize, User, Product, Category } = require('../../models');
let { queryInterface } = sequelize;
const { sign } = require('jsonwebtoken');

let user1 = {
    username: "user1",
    email: "user1@gmail.com",
    password: "password",
};

let category1 = {
    name: "Kemeja",
}

let product = {
    name: "Test",
    description: "test product",
    price: 100000,
    stock: 1,
    imgUrl: "test.jpg",
    categoryId: 1,
    authorId: 1,
}

let token;
let invalidToken = "JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk5MDIyODg5fQ.0alPGFcBaD-LHcUZY60f6DtCwmZgdfGc5o8bqdKd8mg";

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete('Products', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
    await queryInterface.bulkDelete('Categories', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
});

beforeAll(async () => {
    let user = await User.create(user1);
    await Category.create(category1);
    await Product.create(product);
    token = sign({ id: user.id }, process.env.JWT_SECRET);
});

describe("/products/:id", () => {

    // Berhasil mendapatkan 1 Entitas Utama sesuai dengan params id yang diberikan
    test("Get product by ID", async () => {
        const { status, body } = await request(app)
            .get("/products/1")
            .set('Authorization', `Bearer ${token}`);

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
    });

    // Gagal menjalankan fitur karena belum login
    test("Gagal dapat product karena belum login", async () => {
        const { status, body } = await request(app).get(`/product/5`);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
    });

    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("invalid token", async () => {
        const { status, body } = await request(app)
            .get(`/products/5`)
            .set('Authorization', `Bearer ${invalidToken}`);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
    });

    // Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid
    test("product not found", async () => {
        const { status, body } = await request(app)
            .get(`/products/999`)
            .set('Authorization', `Bearer ${token}`);
        expect(status).toBe(404);
        expect(body).toBeInstanceOf(Object)
    });

});
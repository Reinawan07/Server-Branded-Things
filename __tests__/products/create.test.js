const app = require('../../app');
const request = require('supertest');
const { sequelize, User, Category } = require('../../models');
let { queryInterface } = sequelize;
const { sign } = require('jsonwebtoken');

let admin = {
    username: "admin",
    email: "admin@gmail.com",
    password: "password",
};

let chategory1 = {
    name: "Kemeja",
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
    let user = await User.create(admin);
    token = sign({ id: user.id }, process.env.JWT_SECRET);
});

describe("/products", () => {

    // Berhasil membuat entitas utama
    test("create products", async () => {
        const chategory = await Category.create(chategory1);

        const productData = {
            name: "Test",
            description: "test",
            price: 100000,
            stock: 1,
            imgUrl: "test.jpg",
            categoryId: chategory.id, 
            authorId: admin.id, 
        };

        const { status, body } = await request(app)
            .post('/products')
            .send(productData)
            .set('Authorization', `Bearer ${token}`);

        expect(status).toBe(201); 
        expect(body).toHaveProperty("id"); 
        expect(body).toHaveProperty("name", productData.name);
        expect(body).toHaveProperty("description", productData.description);
        expect(body).toHaveProperty("price", productData.price);
        expect(body).toHaveProperty("imgUrl", productData.imgUrl);
        expect(body).toHaveProperty("categoryId", productData.categoryId);
    });

    // Gagal menjalankan fitur karena belum login
    test("Gagal membuat products karena belum login", async () => {
        const productData = {
            name: "Test",
            description: "test",
            price: 100000,
            stock: 1,
            imgUrl: "test.jpg",
            categoryId: 2,
        };

        const { status, body } = await request(app)
            .post('/products')
            .send(productData);

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
    });

    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("Gagal membuat products dengan token tidak valid", async () => {
        const productData = {
            name: "Test",
            description: "test",
            price: 100000,
            stock: 1,
            imgUrl: "test.jpg", 
            categoryId: 2,
        };

        const { status, body } = await request(app)
            .post('/products')
            .send(productData)
            .set('Authorization', `Bearer ${invalidToken}`);

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
    });

    // Gagal ketika request body tidak sesuai (validation required)
    test("Gagal membuat products, request body tidak sesuai", async () => {
        const productData = {
            name: "Test",
            description: "test",
            imgUrl: "test.jpg",
            categoryId: 2,
        };

        const { status } = await request(app)
            .post('/products')
            .send(productData)
            .set('Authorization', `Bearer ${token}`);

        expect(status).toBe(400); 
    });
});
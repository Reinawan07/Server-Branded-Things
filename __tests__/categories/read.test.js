const app = require('../../app');
const request = require('supertest');
const { sequelize, User, Product, Category } = require('../../models');
let { queryInterface } = sequelize;
const { sign } = require('jsonwebtoken');

let adminUser = {
    username: "admin",
    email: "admin@gmail.com",
    password: "password",
    role: "admin"
};
let staffUser = {
    username: "admin",
    email: "staff@gmail.com",
    password: "password",
    role: "staff"
};

let category1 = {
    name: "Kemeja"
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
let product2 = {
    name: "Test",
    description: "test product",
    price: 100000,
    stock: 1,
    imgUrl: "test.jpg",
    categoryId: 1,
    authorId: 1,
}

let tokenAdmin;
let tokenStaff;
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
    let admin = await User.create(adminUser);
    let staff = await User.create(staffUser);

    await Category.create(category1);
    await Product.create(product);
    await Product.create(product2);

    tokenAdmin = sign({ id: admin.id }, process.env.JWT_SECRET);
    tokenStaff = sign({ id: staff.id }, process.env.JWT_SECRET);
});

describe("/categories", () => {

    // Berhasil mendapatkan data entitas kedua
    test("Berhasil mendapatkan data entitas Category", async () => {
        const { status, body } = await request(app)
            .get('/categories')
            .set('Authorization', `Bearer ${tokenAdmin}`);

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
    });

    // Gagal menjalankan fitur karena belum login
    test("Gagal menjalankan fitur karena belum login", async () => {
        const { status, body } = await request(app)
            .get('/categories');

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
    });

    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
        const { status, body } = await request(app)
            .get('/categories')
            .set('Authorization', `Bearer ${invalidToken}`);

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
    });
});
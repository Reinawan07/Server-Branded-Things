const request = require('supertest');
const app = require('../../app');
const { sequelize, Product, User, Category } = require('../../models');
let { queryInterface } = sequelize;
const { sign } = require('jsonwebtoken');
const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, "./img-test/test.jpg");
const imageBuffer = fs.readFileSync(filePath);

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

describe("/product/:id/imgurl", () => {

    // Berhasil mengupdate imgUrl Entitas Utama berdasarkan params id yang diberikan
    test("Berhasil mengupdate imgUrl Entitas Utama", async () => {
        const { status, body } = await request(app)
            .patch("/product/1/imgurl")
            .set("Authorization", `Bearer ${tokenAdmin}`)
            .attach("imgUrl", imageBuffer, "test.png");

        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Image Test success to update")
    })

    // Gagal menjalankan fitur karena belum login
    test("Belum login", async () => {
        const { status, body } = await request(app)
            .patch("/product/1/imgurl")
            .attach("imgUrl", imageBuffer, "test.png");

        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Unauthenticated")
    })

    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("invalid Token", async () => {
        const { status, body } = await request(app)
            .patch("/product/1/imgurl")
            .set("Authorization", `Bearer ${invalidToken}`)
            .attach("imgUrl", imageBuffer, "test.png");

        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Unauthenticated")
    })

    // Gagal menjalankan fiturl karena id entity yang dikirim tidak terdapat di database
    test("Not Found", async () => {
        const { status, body } = await request(app)
            .patch("/product/999/imgurl")
            .set("Authorization", `Bearer ${tokenAdmin}`)
            .attach("imgUrl", imageBuffer, "test.png");

        expect(status).toBe(404)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Data Not Found")
    })

    // Gagal menjalankan fitur ketika Staff mengolah data entity yang bukan miliknya
    test("Forbidden", async () => {
        const { status, body } = await request(app)
            .patch("/product/1/imgurl")
            .set("Authorization", `Bearer ${tokenStaff}`)
            .attach("imgUrl", imageBuffer, "test.png");

        expect(status).toBe(403)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Forbidden Error")
    })

    // Gagal ketika request body yang diberikan tidak sesuai
    test("Forbidden", async () => {
        const { status, body } = await request(app)
            .patch("/product/1/imgurl")
            .set("Authorization", `Bearer ${tokenAdmin}`)
            .attach("imgUrl", imageBuffer, "");

        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Img is missing")
    })
});
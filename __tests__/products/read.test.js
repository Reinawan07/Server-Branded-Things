const app = require('../../app');
const request = require('supertest');
const { sequelize, User } = require('../../models');
let { queryInterface } = sequelize;
const { sign } = require('jsonwebtoken');

let admin = {
    username: "admin",
    email: "admin@gmail.com",
    password: "password",
};

let token;
let invalidToken = "JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk5MDIyODg5fQ.0alPGFcBaD-LHcUZY60f6DtCwmZgdfGc5o8bqdKd8mg";

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
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

    // Berhasil mendapatkan data Entitas Utama
    test("get products", async () => {
        const { status, body } = await request(app)
            .get('/products')
            .set('Authorization', `Bearer ${token}`);
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
    });

    // Gagal menjalankan fitur karena belum login
    test("Unauthenticated", async () => {
        const { status, body } = await request(app)
            .get('/products');
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
    });

    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("invalid token", async () => {
        const { status, body } = await request(app)
            .get('/products')
            .set('Authorization', `Bearer ${invalidToken}`);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
    });
});
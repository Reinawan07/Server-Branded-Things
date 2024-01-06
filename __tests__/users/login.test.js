const app = require('../../app');
const request = require('supertest');
const { sequelize, User } = require('../../models');
let { queryInterface } = sequelize;


// Hapus semua data
afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
});

// Data user
const admin = {
    username: "admin",
    email: "admin@gmail.com",
    password: "password",
};


beforeAll(async () => {
    // Tambahkan data user 
    await User.create(admin)
});

describe("Login (Admin)", () => {
 
    // Email tidak diberikan / tidak diinput
    test("Email is missing", async () => {
        const { status, body } = await request(app)
            .post('/login')
            .send({
                password: admin.password
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Email is missing");
    });

    // Password tidak diberikan / tidak diinput
    test("Password is missing", async () => {
        const { status, body } = await request(app)
            .post('/login')
            .send({
                email: admin.email
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Password is missing");
    });

    // Email diberikan invalid / tidak terdaftar
    test("Invalid Email", async () => {
        const { status, body } = await request(app)
            .post('/login')
            .send({
                email: "invalid@gmail.com",
                password: admin.password
            });

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Invalid email/password");
    });

    // Password diberikan salah / tidak match
    test("Incorrect Password", async () => {
        const { status, body } = await request(app)
            .post('/login')
            .send({
                email: admin.email,
                password: "Invalidpassword"
            });

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Invalid email/password");
    });

    // Berhasil login
    test("Success Login", async () => {
        const { status, body } = await request(app)
            .post('/login')
            .send(admin);

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("access_token", expect.any(String));
    });
});
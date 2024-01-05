const app = require('../../app');
const request = require('supertest');
const { sequelize, User } = require('../../models');
let { queryInterface } = sequelize;
const { sign } = require('jsonwebtoken');

const admin = {
    username: "admin",
    email: "admin@gmail.com",
    password: "password",
    phoneNumber: "08765",
    address: "address",
    role: "admin"
};

const staff = {
    username: "staff",
    email: "staff@gmail.com",
    password: "password",
    phoneNumber: "08765",
    address: "address",
    role: "staff"
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

describe("/add-user", () => {

    // Berhasil register
    test("Success Register", async () => {
        const { status, body } = await request(app)
            .post('/add-user')
            .set(`Authorization`, `Bearer ${token}`)
            .send(staff);

            expect(status).toBe(201);
            expect(body).toBeInstanceOf(Object); // 2. 
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("email", expect.any(String));
            expect(body).toHaveProperty("phoneNumber", expect.any(String));
            expect(body).toHaveProperty("address", expect.any(String));
    });

    // Email tidak diberikan / tidak diinput
    test("Email not provided", async () => {
        const { status, body } = await request(app)
            .post('/add-user')
            .set(`Authorization`, `Bearer ${token}`)
            .send({
                username: staff.username,
                password: staff.password,
                phoneNumber: staff.phoneNumber,
                address: staff.address,
                role: staff.role
            });

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email is required");
    });

    // Password tidak diberikan / tidak diinput
    test("Password not provided", async () => {
        const { status, body } = await request(app)
            .post('/add-user')
            .set(`Authorization`, `Bearer ${token}`)
            .send({
                username: staff.username,
                email: staff.email,
                phoneNumber: staff.phoneNumber,
                address: staff.address,
                role: staff.role
            });

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Password is required");
    });

    // Email diberikan string kosong
    test("Email empty", async () => {
        const { status, body } = await request(app)
            .post('/add-user')
            .set(`Authorization`, `Bearer ${token}`)
            .send({
                username: staff.username,
                email: "",
                password: staff.password,
                phoneNumber: staff.phoneNumber,
                address: staff.address,
                role: staff.role
            });

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email is required");
    });

    // Password diberikan string kosong
    test("Password empty", async () => {
        const { status, body } = await request(app)
            .post('/add-user')
            .set(`Authorization`, `Bearer ${token}`)
            .send({
                username: staff.username,
                email: staff.email,
                password: "",
                phoneNumber: staff.phoneNumber,
                address: staff.address,
                role: staff.role
            });

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Password is required");
    });

    // Email sudah terdaftar
    test("Email already registered", async () => {
        const { status, body } = await request(app)
            .post('/add-user')
            .set(`Authorization`, `Bearer ${token}`)
            .send(staff);
            expect(status).toBe(400)
            expect(body).toBeInstanceOf(Object)
            expect(body.message).toContain("Email already exists")
       });

    // Format Email salah / invalid
    test("Format Email salah / invalid", async () => {
        const { status, body } = await request(app)
            .post('/add-user')
            .set(`Authorization`, `Bearer ${token}`)
            .send({
                username:`staff`,
                email: `staffgmail.com`,
                password: `halo123`
            })
            expect(status).toBe(400)
            expect(body).toBeInstanceOf(Object)
            expect(body.message).toContain("Must be in email format")
       });

    //Gagal register staff karena admin belum login
    test(`failed access_token (401)`, async () => {
        let {status, body} = await request(app)
            .post(`/add-user`)
            .send(staff)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Unauthenticated")
    })

    // Gagal register staff karena token yang diberikan tidak valid (random string)
    test(`invalid access_token (401)`, async () => {
        let {status, body} = await request(app)
            .post(`/add-user`)
            .set(`Authorization`, `Bearer ${invalidToken}`)
            .send(staff)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", "Unauthenticated")
    })

});
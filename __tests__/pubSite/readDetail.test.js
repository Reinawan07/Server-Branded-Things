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

let product = [
    {
        name: "Designer Polo Shirt",
        description: "Elegant designer polo shirt with embroidered logo.",
        price: "250000",
        stock: 50,
        imgUrl: "https://shahzebsaeed.com/cdn/shop/files/11_76fa4982-7c05-4198-9f9e-ed328c12bca7.jpg?v=1696839311",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Premium Hoodie",
        description: "High-quality and warm hoodie with a modern design.",
        price: "350000",
        stock: 30,
        imgUrl: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/13/d7fe741a-5bb4-40f8-a993-d9c972a697f1.jpg",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Designer Polo Shirt",
        description: "Elegant designer polo shirt with embroidered logo.",
        price: "250000",
        stock: 50,
        imgUrl: "https://shahzebsaeed.com/cdn/shop/files/11_76fa4982-7c05-4198-9f9e-ed328c12bca7.jpg?v=1696839311",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Premium Hoodie",
        description: "High-quality and warm hoodie with a modern design.",
        price: "350000",
        stock: 30,
        imgUrl: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/13/d7fe741a-5bb4-40f8-a993-d9c972a697f1.jpg",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Designer Polo Shirt",
        description: "Elegant designer polo shirt with embroidered logo.",
        price: "250000",
        stock: 50,
        imgUrl: "https://shahzebsaeed.com/cdn/shop/files/11_76fa4982-7c05-4198-9f9e-ed328c12bca7.jpg?v=1696839311",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Premium Hoodie",
        description: "High-quality and warm hoodie with a modern design.",
        price: "350000",
        stock: 30,
        imgUrl: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/13/d7fe741a-5bb4-40f8-a993-d9c972a697f1.jpg",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Designer Polo Shirt",
        description: "Elegant designer polo shirt with embroidered logo.",
        price: "250000",
        stock: 50,
        imgUrl: "https://shahzebsaeed.com/cdn/shop/files/11_76fa4982-7c05-4198-9f9e-ed328c12bca7.jpg?v=1696839311",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Premium Hoodie",
        description: "High-quality and warm hoodie with a modern design.",
        price: "350000",
        stock: 30,
        imgUrl: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/13/d7fe741a-5bb4-40f8-a993-d9c972a697f1.jpg",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Designer Polo Shirt",
        description: "Elegant designer polo shirt with embroidered logo.",
        price: "250000",
        stock: 50,
        imgUrl: "https://shahzebsaeed.com/cdn/shop/files/11_76fa4982-7c05-4198-9f9e-ed328c12bca7.jpg?v=1696839311",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Premium Hoodie",
        description: "High-quality and warm hoodie with a modern design.",
        price: "350000",
        stock: 30,
        imgUrl: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/13/d7fe741a-5bb4-40f8-a993-d9c972a697f1.jpg",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Designer Polo Shirt",
        description: "Elegant designer polo shirt with embroidered logo.",
        price: "250000",
        stock: 50,
        imgUrl: "https://shahzebsaeed.com/cdn/shop/files/11_76fa4982-7c05-4198-9f9e-ed328c12bca7.jpg?v=1696839311",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Premium Hoodie",
        description: "High-quality and warm hoodie with a modern design.",
        price: "350000",
        stock: 30,
        imgUrl: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/13/d7fe741a-5bb4-40f8-a993-d9c972a697f1.jpg",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Designer Polo Shirt",
        description: "Elegant designer polo shirt with embroidered logo.",
        price: "250000",
        stock: 50,
        imgUrl: "https://shahzebsaeed.com/cdn/shop/files/11_76fa4982-7c05-4198-9f9e-ed328c12bca7.jpg?v=1696839311",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Premium Hoodie",
        description: "High-quality and warm hoodie with a modern design.",
        price: "350000",
        stock: 30,
        imgUrl: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/13/d7fe741a-5bb4-40f8-a993-d9c972a697f1.jpg",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Designer Polo Shirt",
        description: "Elegant designer polo shirt with embroidered logo.",
        price: "250000",
        stock: 50,
        imgUrl: "https://shahzebsaeed.com/cdn/shop/files/11_76fa4982-7c05-4198-9f9e-ed328c12bca7.jpg?v=1696839311",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Premium Hoodie",
        description: "High-quality and warm hoodie with a modern design.",
        price: "350000",
        stock: 30,
        imgUrl: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/13/d7fe741a-5bb4-40f8-a993-d9c972a697f1.jpg",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Premium Hoodie",
        description: "High-quality and warm hoodie with a modern design.",
        price: "350000",
        stock: 30,
        imgUrl: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/13/d7fe741a-5bb4-40f8-a993-d9c972a697f1.jpg",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Designer Polo Shirt",
        description: "Elegant designer polo shirt with embroidered logo.",
        price: "250000",
        stock: 50,
        imgUrl: "https://shahzebsaeed.com/cdn/shop/files/11_76fa4982-7c05-4198-9f9e-ed328c12bca7.jpg?v=1696839311",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Premium Hoodie",
        description: "High-quality and warm hoodie with a modern design.",
        price: "350000",
        stock: 30,
        imgUrl: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/13/d7fe741a-5bb4-40f8-a993-d9c972a697f1.jpg",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Designer Polo Shirt",
        description: "Elegant designer polo shirt with embroidered logo.",
        price: "250000",
        stock: 50,
        imgUrl: "https://shahzebsaeed.com/cdn/shop/files/11_76fa4982-7c05-4198-9f9e-ed328c12bca7.jpg?v=1696839311",
        categoryId: 1,
        authorId: 1
    },
    {
        name: "Premium Hoodie",
        description: "High-quality and warm hoodie with a modern design.",
        price: "350000",
        stock: 30,
        imgUrl: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/13/d7fe741a-5bb4-40f8-a993-d9c972a697f1.jpg",
        categoryId: 1,
        authorId: 1
    }
]


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
    await Product.bulkCreate(product);

    tokenAdmin = sign({ id: admin.id }, process.env.JWT_SECRET);
    tokenStaff = sign({ id: staff.id }, process.env.JWT_SECRET);
});

describe("/pub/products/:id", () => {

    // Berhasil mendapatkan 1  Entitas Utama sesuai dengan params id yang diberikan
    test("return data by id", async () => {
        const { status, body } = await request(app)
            .get("/pub/products/1")

        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
    });

    // Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid
    test("return data by id", async () => {
        const { status, body } = await request(app)
            .get("/pub/products/999")

        expect(status).toBe(404)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty("message", 'Product id 999 not found')
    });

});
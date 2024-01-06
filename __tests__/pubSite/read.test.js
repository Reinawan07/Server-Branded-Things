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

describe("/pub/products", () => {

    // Berhasil mendapatkan Entitas Utama tanpa menggunakan query filter parameter
    test("get products", async () => {
        const { status, body } = await request(app)
            .get('/pub/products')

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
    });

    // Berhasil mendapatkan Entitas Utama dengan 1 query filter parameter
    test("get data by filter", async () => {
        const { status, body } = await request(app)
            .get("/pub/products")
            .query({ search: "Hoodie" }); // Adding query parameter

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
    });

    // Berhasil mendapatkan  Entitas Utama serta panjang yang sesuai ketika memberikan page tertentu (cek pagination-nya)
    test("get data with pagination", async () => {
        const pageSize = 10; 
        const pageToRetrieve = 1;

        const { status, body } = await request(app)
            .get("/pub/products")
            .query({ page: pageToRetrieve, size: pageSize });

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(pageSize);
});
});
const router = require('express').Router();
const CategoriesControllers = require('../controllers/category');
const ProductsControllers = require('../controllers/product');
const UsersControllers = require('../controllers/user');
const errorHandler = require('../middlewares/errorHandler');

router.get('/', (req, res) => res.json({message: "Buat Server Branded Things"}));

//User
router.post('/add-user', UsersControllers.AddUser)

//Public
router.get('/pub/products', ProductsControllers.ReadProductsPub)
router.get('/pub/products/:id', ProductsControllers.ReadProductsByIdPub)

//Entitas Utama
router.post('/products', ProductsControllers.CreateProducts)
router.get('/products', ProductsControllers.ReadProducts)
router.get('/products/:id', ProductsControllers.ReadProductsById)
router.put('/product/:id', ProductsControllers.UpdateProduct)
router.delete('/product/:id', ProductsControllers.DeleteProducts)

//Entitas Kedua
router.post('/categories', CategoriesControllers.CreateCategories)
router.get('/categories', CategoriesControllers.ReadCategories)
router.put('/categories/:id', CategoriesControllers.UpdateCategories)

router.use(errorHandler)
module.exports = router;
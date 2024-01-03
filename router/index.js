const router = require('express').Router();
const CategoriesControllers = require('../controllers/category');
const ProductsControllers = require('../controllers/product');
const UsersControllers = require('../controllers/user');
const authentication = require('../middlewares/authentication');
const { authorizationAdminOnly, authorizationProduct, authorizationCategory } = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');

router.get('/', (req, res) => res.json({message: "Buat Server Branded Things"}));


//Public
router.get('/pub/products', ProductsControllers.ReadProductsPub)
router.get('/pub/products/:id', ProductsControllers.ReadProductsByIdPub)

//User
router.post('/login', UsersControllers.Login)

router.use(authentication)

router.post('/add-user', authorizationAdminOnly,UsersControllers.AddUser)

//Entitas Utama
router.post('/products', ProductsControllers.CreateProducts)
router.get('/products', ProductsControllers.ReadProducts)
router.get('/products/:id', ProductsControllers.ReadProductsById)
router.put('/product/:id', authorizationProduct,ProductsControllers.UpdateProduct)
router.delete('/product/:id', authorizationProduct,ProductsControllers.DeleteProducts)

//Entitas Kedua
router.post('/categories', CategoriesControllers.CreateCategories)
router.get('/categories', CategoriesControllers.ReadCategories)
router.put('/categories/:id', authorizationCategory,CategoriesControllers.UpdateCategories)

router.use(errorHandler)
module.exports = router;
const router = require('express').Router();
const CategoriesControllers = require('../controllers/category');
const ProductsControllers = require('../controllers/product');
const errorHandler = require('../middlewares/errorHandler');

router.get('/', (req, res) => res.json({message: "Buat Server Branded Things"}));

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
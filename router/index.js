const router = require('express').Router();
const ProductsControllers = require('../controllers/product');
const errorHandler = require('../middlewares/errorHandler');

router.get('/', (req, res) => res.json({message: "Buat Server Branded Things"}));

router.post('/products', ProductsControllers.CreateProducts)

router.use(errorHandler)
module.exports = router;
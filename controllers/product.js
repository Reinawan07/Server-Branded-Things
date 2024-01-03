const {Product} = require('../models')

class ProductsControllers {

    static async CreateProducts(req, res, next) {
        try {
            const data = await Product.create({ ...req.body });
            res.status(201).json(data);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductsControllers
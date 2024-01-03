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

    static async ReadProducts(req, res, next) {
        try {
            const data = await Product.findAll();
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }

    static async ReadProductsById(req, res, next) {
        try {
            const data = await Product.findByPk(req.params.id);
            if (!data) {
                throw ({ name: "NotFound", message: 'Product not found' })
            }
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ProductsControllers
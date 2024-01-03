const {Product} = require('../models');

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

    static async UpdateProducts(req, res, next) {
        try {
            const data = await Product.findByPk(req.params.id);
            if (!data) {
                throw ({ name: "NotFound", message: 'Product not found' })
            }
            await Product.update(req.body, {where:{id: req.params.id}})
            res.status(200).json({message: "Sucsses"});
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ProductsControllers
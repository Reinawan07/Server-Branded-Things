const { Product } = require('../models');

class ProductsControllers {

    static async CreateProducts(req, res, next) {
        try {
            const data = await Product.create({ ...req.body, authorId: req.user.id });
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
                throw ({ name: "NotFound", message: `Product id ${req.params.id} not found` })
            }
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }

    static async UpdateProduct(req, res, next) {
        try {
            const data = await Product.findByPk(req.params.id);
            if (!data) {
                throw ({ name: "NotFound", message: `Product id ${req.params.id} not found` })
            }
            await data.update(req.body, { where: { id: req.params.id } })
            res.status(200).json({ message: `Success update product id ${req.params.id}` });
        } catch (error) {
            next(error)
        }
    }

    static async DeleteProducts(req, res, next) {
        try {
            const data = await Product.findByPk(req.params.id);
            if (!data) {
                throw ({ name: "NotFound", message: `Product id ${req.params.id} not found` })
            }
            await data.destroy()
            res.status(200).json({ message: `Id ${req.params.id} success to delete` });
        } catch (error) {
            next(error)
        }
    }

    // Controller public
    static async ReadProductsPub(req, res, next) {
        try {
            const data = await Product.findAll();
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }

    static async ReadProductsByIdPub(req, res, next) {
        try {
            const data = await Product.findByPk(req.params.id);
            if (!data) {
                throw ({ name: "NotFound", message: `Product id ${req.params.id} not found` })
            }
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ProductsControllers
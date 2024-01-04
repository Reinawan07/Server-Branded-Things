const { User, Product, Category } = require('../models');

async function authorizationProduct(req, res, next) {
    try {
        let product = await Product.findByPk(req.params.id)
        if (!product) throw ({ name: "NotFound" })

        if (req.user.role === "admin" || product.authorId === req.user.id) {
            next();
        } else {
            throw { name: "Forbidden Error" };
        }
    } catch (error) {
        next(error)
    }
}

async function authorizationCategory(req, res, next) {
    try {
        let category = await Category.findByPk(req.params.id)
        if (!category) throw ({ name: "NotFound" })

        if (req.user.role === "admin" || category.authorId === req.user.id) {
            next();
        } else {
            throw { name: "Forbidden Error" };
        }
    } catch (error) {
        next(error)
    }
}

const authorizationAdminOnly = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            next()
        } else {
            throw { name: "AdminOnly" }
        }
    } catch (error) {
        next(error);
    }
};


module.exports = { authorizationProduct, authorizationCategory, authorizationAdminOnly };
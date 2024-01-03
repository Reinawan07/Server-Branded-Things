const { Category } = require('../models')

class CategoriesControllers {

    static async CreateCategories(req, res, next) {
        try {
            const data = await Category.create(req.body)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoriesControllers
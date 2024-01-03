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

    static async ReadCategories(req, res, next) {
        try {
            const data = await Category.findAll()
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async UpdateCategories(req, res, next) {
        try {
            const data = await Category.findByPk(req.params.id)

            if(!data){
                throw({name: "NotFound", message: `Category id ${req.params.id} not found`})
            }

            await data.update(req.body, {where: {id: req.params.id}})
            res.status(201).json({ message: `Success update category id ${req.params.id}` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoriesControllers
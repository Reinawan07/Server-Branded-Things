const { Product } = require('../models');
const cloudinary = require('cloudinary').v2;
const { randomUUID } = require('crypto');
          
cloudinary.config({ 
  cloud_name: 'deh8z9bc2', 
  api_key: '319925632225391', 
  api_secret: 'sAgogFZaMcg-u17pPE9Z7g8PKkM' 
});

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

    static async UpdateImgUrl(req,res,next){
        try {
            const product = await Product.findByPk(req.params.id);

            if (!product) {
                throw({ name: "NotFound", message: `Product ${req.params.id} not found` })
            }

            const base64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${base64}`

            const data = await cloudinary.uploader.upload(dataURI, {
                public_id: `${req.file.originalname}_${randomUUID()}`,
                folder: 'Branded Things/ImgUrl'
            });

            await product.update({ imgUrl: data.secure_url })

            res.json({ message: `Image ${product.name} success to update` })
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
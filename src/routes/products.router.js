const BaseRouter = require('./router')

const { validateNewProduct, validateUpdateProduct, validateProduct } = require('../middlewares/product.middleware')

const ProducsController = require('../controllers/products.controller')

const withController = callback => {
    return (req, res) => {
        const producsController = new ProducsController()
        return callback(producsController, req, res)
    }
}

class ProductRouter extends BaseRouter {
    init() {
        this.get('/', withController((controller, req, res) => controller.getProducts(req, res)))

        this.get('/:pid', validateProduct, withController((controller, req, res) => controller.getProductById(req, res)))

        this.post('/create', validateNewProduct, withController((controller, req, res) => controller.addProduct(req, res)))

        this.put('/:pid', validateUpdateProduct, withController((controller, req, res) => controller.updateProduct(req, res)))

        this.delete('/:pid', validateProduct, withController((controller, req, res) => controller.deleteProduct(req, res)))

    }
}

module.exports = ProductRouter
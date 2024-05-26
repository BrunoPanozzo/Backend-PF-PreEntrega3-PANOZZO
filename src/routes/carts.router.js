const BaseRouter = require('./router')

const { validateNewCart, validateCart } = require('../middlewares/cart.middleware')
const { validateProduct } = require('../middlewares/product.middleware')

const CartsController = require('../controllers/carts.controller')

const withController = callback => {
    return (req, res) => {
        const cartsController = new CartsController()
        return callback(cartsController, req, res)
    }
}

class CartRouter extends BaseRouter {
    
    init() {
        this.get('/', withController((controller, req, res) => controller.getCarts(req, res)))

        this.get('/:cid', validateCart, withController((controller, req, res) => controller.getCartById(req, res)))

        this.post('/', validateNewCart, withController((controller, req, res) => controller.addCart(req, res)))

        this.post('/:cid/products/:pid', validateCart, validateProduct, withController((controller, req, res) => controller.addProductToCart(req, res)))
        
        this.put('/:cid', validateCart, withController((controller, req, res) => controller.updateCartProducts(req, res)))

        this.put('/:cid/products/:pid', validateCart, validateProduct, withController((controller, req, res) => controller.addProductToCart(req, res)))

        this.delete('/:cid', validateCart, withController((controller, req, res) => controller.deleteCart(req, res)))

        this.delete('/:cid/products/:pid', validateCart, validateProduct, withController((controller, req, res) => controller.deleteProductFromCart(req, res)))
    }
}

module.exports = CartRouter

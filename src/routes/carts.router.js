const BaseRouter = require('./router')

const { validateNewCart, validateCart } = require('../middlewares/cart.middleware')
const { validateProduct } = require('../middlewares/product.middleware')

const CartsController = require('../controllers/carts.controller')
const { PUBLIC, USER } = require('../config/policies.constants')
const { userIsNotAdmin } = require('../middlewares/auth.middleware')

const withController = callback => {
    return (req, res) => {
        const cartsController = new CartsController()
        return callback(cartsController, req, res)
    }
}

class CartRouter extends BaseRouter {
    
    init() {
        this.get('/', [USER], withController((controller, req, res) => controller.getCarts(req, res)))

        this.get('/:cid', [USER], validateCart, withController((controller, req, res) => controller.getCartById(req, res)))

        this.post('/', [USER], validateNewCart, userIsNotAdmin, withController((controller, req, res) => controller.addCart(req, res)))

        this.post('/:cid/products/:pid', [USER], validateCart, validateProduct, userIsNotAdmin, withController((controller, req, res) => controller.addProductToCart(req, res)))
        
        this.put('/:cid', [USER], validateCart, userIsNotAdmin, withController((controller, req, res) => controller.updateCartProducts(req, res)))

        this.put('/:cid/products/:pid', [USER], validateCart, validateProduct, userIsNotAdmin, withController((controller, req, res) => controller.addProductToCart(req, res)))

        this.delete('/:cid', [USER], validateCart, userIsNotAdmin, withController((controller, req, res) => controller.deleteCart(req, res)))

        this.delete('/:cid/products/:pid', [USER], validateCart, validateProduct, userIsNotAdmin, withController((controller, req, res) => controller.deleteProductFromCart(req, res)))
    }
}

module.exports = CartRouter

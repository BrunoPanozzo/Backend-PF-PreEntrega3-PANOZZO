const ProductsServices = require('../services/products.service')
const CartsServices = require('../services/carts.service')

const { CartDAO, ProductDAO } = require('../dao/factory')

class ViewsController {

    constructor() {
        const productDAO = ProductDAO()
        this.productsService = new ProductsServices(productDAO)
        const cartsDAO = CartDAO()
        this.cartsService = new CartsServices(cartsDAO)
    }

    async getProducts(req, res) {
        try {
            const filteredProducts = await this.productsService.getProducts(req.query)

            let user = req.session.user

            const data = {
                title: 'All Products',
                scripts: ['allProducts.js'],
                styles: ['home.css', 'allProducts.css'],
                useWS: false,
                user,
                filteredProducts
            }

            res.render('allProducts', data)
        }
        catch (err) {
            //return res.status(500).json({ message: err.message })
            return res.sendServerError(err)
        }
    }

    async getProductDetail(req, res) {
        try {
            const prodId = req.pid
            const user = req.session.user

            const product = await this.productsService.getProductById(prodId)
            if (!product) {
                return product === false
                    // HTTP 404 => el ID es válido, pero no se encontró ese producto
                    //return res.status(404).json(`El producto con código '${prodId}' no existe.`)
                    ? res.sendNotFoundError(`El producto con código '${prodId}' no existe.`)
                    : res.sendServerError({ message: 'Something went wrong!' })
            }

            //const carts = await this.cartsService.getCarts()
            let cid = user.cart //carts[0]._id
            let data = {
                title: 'Product detail',
                scripts: ['productDetail.js'],
                styles: ['home.css', 'productDetail.css'],
                useWS: false,
                useSweetAlert: false,
                product,
                cid
            }

            res.render('productDetail', data)
        }
        catch (err) {
            //return res.status(500).json({ message: err.message })
            return res.sendServerError(err)
        }
    }

    async addProductToCart(req, res) {
        try {
            const user = req.session.user
            const prodId = req.pid
            const product = await this.productsService.getProductById(prodId)
            if (!product) {
                return product === false
                    // HTTP 404 => el ID es válido, pero no se encontró ese producto
                    //return res.status(404).json(`El producto con código '${prodId}' no existe.`)
                    ? res.sendNotFoundError(`El producto con código '${prodId}' no existe.`)
                    : res.sendServerError({ message: 'Something went wrong!' })
            }

            // //agrego una unidad del producto al primer carrito que siempre existe
            // const carts = await this.cartsService.getCarts()
            await this.cartsService.addProductToCart(user.cart, prodId, 1);

            this.showAlert(res, user.cart, product)
        }
        catch (err) {
            //return res.status(500).json({ message: err.message })
            return res.sendServerError(err)
        }
    }

    showAlert = (res, userCart, product) => {
        try {
            const alertMessage = {
                icon: 'Success!',
                title: 'Compra confirmada.',
                text: `El producto ${product.title} se agregó al carrito.`
            }

            let cid = userCart //carts[0]._id
            let data = {
                title: 'Product detail',
                scripts: ['productDetail.js'],
                styles: ['home.css', 'productDetail.css'],
                useWS: false,
                useSweetAlert: true,
                product,
                cid, 
                alertMessage
            }

            res.render('productDetail', data)
        }
        catch (err) {
            console.log(err)
        }
    }

    async getCartById(req, res) {
        try {
            const cartId = req.cid
            const cart = await this.cartsService.getCartById(cartId)

            if (!cart) {
                return cart === false
                    // HTTP 404 => el ID es válido, pero no se encontró ese carrito
                    // return res.status(404).json(`El carrito con código '${cartId}' no existe.`)
                    ? res.sendNotFoundError(`El carrito con código '${cartId}' no existe.`)
                    : res.sendServerError({ message: 'Something went wrong!' })
            }

            let cid = cartId
            let data = {
                title: 'Cart detail',
                // scripts: ['cartDetail.js'],
                styles: ['home.css', 'cartDetail.css'],
                useWS: false,
                cart,
                cid
            }

            res.render('cartDetail', data)
        }
        catch (err) {
            //return res.status(500).json({ message: err.message })
            return res.sendServerError(err)
        }
    }

    async getRealTimeProducts(req, res) {
        try {
            let allProducts = await this.productsService.getProducts(req.query)

            const data = {
                title: 'Real Time Products',
                scripts: ['allProducts.js'],
                styles: ['home.css', 'allProducts.css'],
                useWS: false,
                allProducts
            }

            res.render('realtimeproducts', data)
        }
        catch (err) {
            //return res.status(500).json({ message: err.message })
            return res.sendServerError(err)
        }
    }

    createProduct(req, res) {
        try {
            const data = {
                title: 'Create Product',
                // scripts: ['createProduct.js'],
                styles: ['home.css'],
                useWS: false
            }

            res.render('createProduct', data)
        }
        catch (err) {
            //return res.status(500).json({ message: err.message })
            return res.sendServerError(err)
        }
    }

    chat(req, res) {
        try {
            const data = {
                title: 'Aplicación de chat',
                useWS: true,
                useSweetAlert: true,
                scripts: ['message.js'],
                styles: ['home.css']
            }

            res.render('message', data)
        }
        catch (err) {
            //return res.status(500).json({ message: err.message })
            return res.sendServerError(err)
        }
    }

    home(req, res) {
        try {
            const isLoggedIn = ![null, undefined].includes(req.session.user)

            res.render('index', {
                title: 'Inicio',
                isLoggedIn,
                isNotLoggedIn: !isLoggedIn,
            })
        }
        catch (err) {
            //return res.status(500).json({ message: err.message })
            return res.sendServerError(err)
        }
    }

    login(req, res) {
        try {
            // sólo se puede acceder si NO está logueado
            res.render('login', {
                title: 'Login'
            })
        }
        catch (err) {
            //return res.status(500).json({ message: err.message })
            return res.sendServerError(err)
        }
    }

    resetPassword(req, res) {
        try {
            // sólo se puede acceder si NO está logueado
            res.render('reset_password', {
                title: 'Reset Password'
            })
        }
        catch (err) {
            //return res.status(500).json({ message: err.message })
            return res.sendServerError(err)
        }
    }

    register(req, res) {
        try {
            //sólo se puede acceder si NO está logueado
            res.render('register', {
                title: 'Register'
            })
        }
        catch (err) {
            //return res.status(500).json({ message: err.message })
            return res.sendServerError(err)
        }
    }

    profile(req, res) {
        try {
            //sólo se puede acceder SI está logueado
            let user = req.session.user
            res.render('profile', {
                title: 'Mi perfil',
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    email: user.email
                }
            })
        }
        catch (err) {
            //return res.status(500).json({ message: err.message })
            return res.sendServerError(err)
        }
    }

}

module.exports = ViewsController
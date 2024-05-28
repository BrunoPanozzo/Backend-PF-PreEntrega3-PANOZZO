const { esPositivo } = require('../middlewares/product.middleware')

const CartsServices = require('../services/carts.service')
const ProductsServices = require('../services/products.service')

const { Cart , Product} = require('../dao/factory')

const productsStorage = new Product()
const productsServices = new ProductsServices(productsStorage)

const cartsStorage = new Cart()
const cartsServices = new CartsServices(cartsStorage)

module.exports = {
    validateNewCart: async (req, res, next) => {
        try {
            const { products } = req.body

            //valido que cada producto que quiero agregar a un carrito exista y que su quantity sea un valor positivo
            products.forEach(async producto => {
                const prod = await productsServices.getProductById(producto._id)
                if (!prod) {
                    return order === false
                        // HTTP 404 => el ID es válido, pero no se encontró ese producto
                        //return res.status(404).json(`El producto con código '${prodId}' no existe.`)
                        ? res.status(404).json(`No se puede crear el carrito porque no existe el producto con ID '${producto._id}'.`)
                        : res.status(500).json({ message: 'Something went wrong!' })
                }

                //valido además que su campo quantity sea un valor positivo
                if (!esPositivo(producto.quantity)) {
                    res.status(400).json({ error: `El valor de quantity del producto con ID '${producto._id}' es inválido.` })
                    return
                }
            })
            //exito, continuo al endpoint
            return next()
        }
        catch (err) {
            res.status(400).json({ error: `No se puede crear el carrito.` })
        }
    },
    validateCart: async (req, res, next) => {
        try {
            let cartId = req.params.cid;            

            const cart = await cartsServices.getCartById(cartId)
            if (!cart) {
                res.status(400).json({ error: `No existe el carrito con ID '${cartId}'.` })
                return
            }
            //exito, continuo al endpoint
            return next()
        }
        catch (err) {
            res.status(400).json({ error: `No existe el carrito con ID '${req.params.cid}'.` })
        }
    }
}

const ProductsServices = require('../services/products.service')
const TicketsServices = require('../services/tickets.service')

const { ProductDAO, TicketDAO } = require('../dao/factory')

class CartsServices {

    constructor(dao) {
        this.dao = dao

        const productDAO = ProductDAO()
        this.productsService = new ProductsServices(productDAO)

        const ticketDAO = TicketDAO()
        this.ticketsService = new TicketsServices(ticketDAO)
    }

    async getCarts() {
        return await this.dao.getCarts()
    }

    async getCartById(cartId) {
        return await this.dao.getCartById(cartId)
    }

    async addCart(products) {
        return await this.dao.addCart(products)
    }

    async addProductToCart(cartId, prodId, quantity) {
        return await this.dao.addProductToCart(cartId, prodId, quantity)
    }

    async updateCartProducts(cartId, products) {
        return await this.dao.updateCartProducts(cartId, products)
    }

    async deleteCart(cartId) {
        return await this.dao.deleteCart(cartId)
    }

    async deleteAllProductsFromCart(cartId) {
        return await this.dao.deleteAllProductsFromCart(cartId)
    }

    async deleteProductFromCart(cartId, prodId) {
        return await this.dao.deleteProductFromCart(cartId, prodId)
    }

    async purchaseCart(cartId, userEmail) {
        let cart = await this.getCartById(cartId)

        let productFromStock
        let productIdFromCart
        let purchasedAmount = 0        

        for (const productFromCart of cart.products) {         
            productIdFromCart = this.productsService.getID(productFromCart)
            productFromStock = await this.productsService.getProductById(productIdFromCart)

            if (productFromCart.quantity <= productFromStock.stock) { //hay stock puede comprar el producto 
                //actualizo el stock disponible del producto
                await this.productsService.decrementProductStock(productIdFromCart, productFromCart.quantity)
                purchasedAmount += (productFromCart.quantity * productFromStock.price)

                //elimino del carrito el producto
                this.deleteProductFromCart(cartId, this.productsService.getID(productIdFromCart).toString())
            }
        }

        //verifico si pudo comprar algun producto, en cuyo caso purchasedAmount > 0
        if (purchasedAmount > 0) {
            //creo el nuevo ticket con la compra total/parcial
            const newTicket = {
                purchase_datetime: Date.now(),
                purchaser: userEmail,
                amount: purchasedAmount,
            }
            await this.ticketsService.addTicket(newTicket)
        }
        //retorno el carrito actualizado, vacío si compró todo, o con los IDs de aquellos productos sin stock
        cart = await this.getCartById(cartId)
        return cart.products
    }

    getID(cart) {
        return this.dao.getID(cart)
    }

}

module.exports = CartsServices
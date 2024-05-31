class CartsServices {
    
    constructor(dao) {
        this.dao = dao
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
    
    async purchaseCart(cartId) {
        return await this.dao.purchaseCart(cartId)
    }
    
    getID(cart) {
        return this.dao.getID(cart)
    }

}

module.exports = CartsServices
class CartDAO {

    async getCarts() {
        try {
            
        }
        catch (err) {
            return []
        }
    }

    async getCartById(cartId) {
        try {
            
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    async addCart(products) {
        try {
            
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    async addProductToCart(cartId, prodId, quantity) {
        try {
            
            return true
        }
        catch (err) {
            console.error(err)
            return false
        }
    }

    async updateCartProducts(cartId, products) {
        try {
            
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    async deleteCart(cartId) {
        try {
            
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    async deleteAllProductsFromCart(cartId) {
        try {
            
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    async deleteProductFromCart(cartId, prodId) {
        try {
            
        }
        catch (err) {
            console.error(err)
            return false
        }
    }
}

module.exports = { CartDAO } 
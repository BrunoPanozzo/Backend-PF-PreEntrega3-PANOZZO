class ProductDAO {

    async getProducts(filters) {
        try {
            
        }
        catch (err) {
            console.log({ error: err })
            return []
        }
    }

    async getProductById(prodId) {
        try {
            
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    //buscar en el arreglo de productos un producto con un CODE determinado. Caso contrario devolver msje de error
    getProductByCode = async (prodCode) => {
        try {
            
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    async addProduct(title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category) {
        try {
            
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    async updateProduct(productUpdated, prodId) {
        try {
            
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    async deleteProduct(prodId) {
        try {
            
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

}

module.exports = { ProductDAO }
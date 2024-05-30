class ProductsServices {

    constructor(dao) {
        this.dao = dao
    }

    async getProducts(filters) {
        return await this.dao.getProducts(filters)
    }

    async getProductById(prodId) {
        return await this.dao.getProductById(prodId)
    }
    
    async getProductByCode(prodCode) {
        return await this.dao.getProductByCode(prodCode)
    }

    async addProduct(title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category) {
        return await this.dao.addProduct(title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category)
    }

    async updateProduct(productUpdated, prodId) {
        return await this.dao.updateProduct(productUpdated, prodId)
    }

    async deleteProduct(prodId) {
        return await this.dao.deleteProduct(prodId)
    }

}

module.exports = ProductsServices


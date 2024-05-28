
const { ProductDAO: ProductMongoDAO } = require("./mongo/product.dao");
const { CartDAO: CartMongoDAO } = require("./mongo/cart.dao");
const { UserDAO: UserMongoDAO } = require("./mongo/user.dao");
const { ProductDAO: ProductFSDAO } = require("./fs/product.dao");
const { CartDAO: CartFSDAO } = require("./fs/cart.dao");
const { UserDAO: UserFSDAO } = require("./fs/user.dao");
const { PERSISTENCE } = require('../config/config')

switch (PERSISTENCE) {
    case "MONGO":
        Product= ProductMongoDAO,
        Cart= CartMongoDAO,
        User= UserMongoDAO
        break;

    case "FILE":
        Product= ProductFSDAO,
        Cart= CartFSDAO,
        User= UserFSDAO
        break;
}  

module.exports = {
    Product,
    Cart,
    User
}
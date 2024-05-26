// routers
const CartRouter = require('./carts.router')
const cartRouter = new CartRouter().getRouter()
const ProductRouter = require('./products.router')
const productRouter = new ProductRouter().getRouter()
const ViewRouter = require('./views.router')
const viewRouter = new ViewRouter().getRouter()
const SessionRouter = require('./sessions.router')
const sessionRouter = new SessionRouter().getRouter()
const JwtRouter = require('./jwt.router')
const jwtRouter = new JwtRouter().getRouter()

module.exports = {
    //configurar los routers
    routers : [
        { path: '/api/products', router: productRouter },
        { path: '/api/carts', router: cartRouter },
        { path: '/', router: viewRouter },
        { path: '/api/sessions', router: sessionRouter },
        { path: '/api', router: jwtRouter }
    ]
}
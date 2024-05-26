const BaseRouter = require('./router')

const { verifyToken } = require('../utils/jwt')
const passportMiddleware = require('../middlewares/passport.middleware')

const JwtController = require('../controllers/jwt.controller')

const withController = callback => {
    return (req, res) => {
        const jwtController = new JwtController()
        return callback(jwtController, req, res)
    }
}

class JwtRouter extends BaseRouter {
    init() {

        this.post('/login', withController((controller, req, res) => controller.login(req, res)))

        this.get('/private', verifyToken, withController((controller, req, res) => controller.private(req, res)))

        this.get('/current', passportMiddleware('jwt') /*passport.authenticate('jwt', {session: false})*/, withController((controller, req, res) => controller.current(req, res)))

    }
}
    
module.exports = JwtRouter
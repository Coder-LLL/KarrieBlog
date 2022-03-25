const Router = require('koa-router')

const {
  login,
  success
} = require('../controller/auth.controller.js')
const {
  verifyLogin,
  verifyAuth
} = require('../middleware/auth.middleware.js')

const authRouter = new Router({
  // prefix: '/login'
})

authRouter.post('/login', verifyLogin, login)
authRouter.get('/test', verifyAuth, success);
module.exports = authRouter
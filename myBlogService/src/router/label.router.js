const Router = require('koa-router')

const {
  verifyAuth
} = require('../middleware/auth.middleware.js')

const {
  create,
  list,
  allLabel
} = require('../controller/label.controller.js')

const labelRouter = new Router({
  prefix: '/label'
})

labelRouter.post('/', verifyAuth, create)
labelRouter.get('/', list)
labelRouter.get('/all', allLabel)
module.exports = labelRouter
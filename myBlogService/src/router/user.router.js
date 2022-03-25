const Router = require('koa-router')
const {
  create,
  avatarInfo,
  updateAvatar,
  momentInfo,
  commentInfo
} = require('../controller/user.controller.js')

const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware.js')

const {
  verifyAuth
} = require('../middleware/auth.middleware.js')
const userRouter = new Router({
  prefix: '/users'
})

// 在create创建用户之前，要添加一个verifyUser中间件判断是否符合插入条件
userRouter.post('/', verifyUser, handlePassword, create)
// 获取用户头像
userRouter.get('/:userId/avatar', avatarInfo)
// 获取用户所发布的文章
userRouter.get('/:userId/moment', verifyAuth, momentInfo)
// 获取用户所发布的评论
userRouter.get('/:userId/comment', verifyAuth, commentInfo)
// userRouter.patch('/:userId/avatar', verifyAuth, avatarHandler, updateAvatar)

module.exports = userRouter
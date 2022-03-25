const {
  AVATAR_PATH
} = require('../constants/file-path.js')

const userService = require('../service/user.service.js')
const fileService = require('../service/file.service.js')
const momentService = require('../service/moment.service.js')
const commentService = require('../service/comment.service.js')
const fs = require('fs')

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body
    // 查询数据
    const result = await userService.create(user)
    // 返回数据
    ctx.body = result
  }
  async avatarInfo(ctx, next) {
    // 1.获取用户的id
    const {
      userId
    } = ctx.params

    // 查询数据
    const avatarInfo = await fileService.getAvatarByUserId(userId)
    // 
    // 返回数据
    // ctx.body = avatarInfo
    // 这样子写的话，浏览器会直接下载下来
    // ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)

    // 如果想直接展示，则要设置一下响应对象的类型
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
  async updateAvatar() {
    // // 1.获取用户的id
    // const {
    //   userId
    // } = ctx.params
    // // 1.获取图像相关的信息
    // const {
    //   mimetype,
    //   size
    // } = ctx.req.file;

    // // 查询数据
    // const avatarInfo = await userService.updateAvatarUrlById(filename, userId)

  }

  async momentInfo(ctx, next) {
    // 1.获取用户的id
    const {
      userId
    } = ctx.params
    // 查询数据
    const momentInfo = await momentService.getMomentByUserId(userId)
    ctx.body = momentInfo
  }

  async commentInfo(ctx, next) {
    // 1.获取用户的id
    const {
      userId
    } = ctx.params
    // 查询数据
    const momentInfo = await commentService.getCommentByUserId(userId)
    ctx.body = momentInfo
  }
}

module.exports = new UserController()
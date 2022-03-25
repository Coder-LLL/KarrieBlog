const Router = require('koa-router')


const fileRouter = new Router({
  prefix: '/upload'
})
const {
  verifyAuth
} = require('../middleware/auth.middleware.js')

const {
  avatarHandler,
  pictureHandler,
  pictureResize
} = require('../middleware/file.middleware.js')

const {
  saveAvatarInfo,
  savePictureInfo
} = require('../controller/file.controller.js')
// 头像上传接口 在中间件中保存图片 然后再controller中保存图片信息
// fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo);
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo);
fileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize, savePictureInfo);

module.exports = fileRouter
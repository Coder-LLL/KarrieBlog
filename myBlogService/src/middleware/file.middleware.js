const Multer = require('koa-multer')
const {
  AVATAR_PATH,
  PICTURE_PATH
} = require('../constants/file-path.js')
const Jimp = require('Jimp')
const path = require('path')

const avatarUpload = Multer({
  dest: AVATAR_PATH,
})
// const avatarHandler = avatarUpload.single('avatar')
const avatarHandler = avatarUpload.single('avatar');


const pictureUpload = Multer({
  dest: PICTURE_PATH,
})
// 第二个参数表示最大上传的数量
const pictureHandler = pictureUpload.array('picture', 9)


const pictureResize = async (ctx, next) => {
  // 1.获取所有的图像信息
  const files = ctx.req.files

  // 对图片进行处理 sharp/jump
  for (let file of files) {
    // const image = await jimp.read(file.path)
    const destPath = path.join(file.destination, file.filename)
    Jimp.read(file.path).then(image => {
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
      image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
    })
  }
  await next()
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}
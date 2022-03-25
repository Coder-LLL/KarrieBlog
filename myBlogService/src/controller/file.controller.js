const {
  AVATAR_PATH
} = require('../constants/file-path.js')
const userService = require('../service/user.service.js')
const fileService = require('../service/file.service.js')
const {
  APP_HOST,
  APP_PORT
} = require('../app/config');

class FileController {
  // async saveAvatarInfo(ctx, next) {
  //   // 1.获取图像相关的信息
  //   const {
  //     filename,
  //     mimetype,
  //     size
  //   } = ctx.req.file
  //   const {
  //     id
  //   } = ctx.user
  //   console.log(filename,
  //     mimetype,
  //     size)

  //   // 2.将图像信息保存到数据库中
  //   const result = await fileService.createAvatar(filename, mimetype, size, id)
  //   ctx.request.files.file
  //   console.log(555)
  //   // 3.将图片地址保存到user表中
  //   const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
  //   await userService.updateAvatarUrlById(avatarUrl, id)

  //   ctx.body = "上传头像成功"
  // }
  // async saveAvatarInfo(ctx, next) {
  //   console.log(4333)

  //   // 1.获取图像相关的信息
  //   const {
  //     filename,
  //     mimetype,
  //     size
  //   } = ctx.req.file;
  //   const {
  //     id
  //   } = ctx.user;
  //   // 2.将图像信息数据保存到数据库中
  //   const result = await fileService.createAvatar(filename, mimetype, size, id);

  //   // 3.将图片地址保存到user表中
  //   const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
  //   await userService.updateAvatarUrlById(avatarUrl, id);

  //   // 4.返回结果
  //   ctx.body = '上传头像成功~';
  // }


  async saveAvatarInfo(ctx, next) {
    // 1.获取图像相关的信息
    const {
      filename,
      mimetype,
      size
    } = ctx.req.file;
    const {
      id
    } = ctx.user;

    // 2.将图像信息数据保存到数据库中
    const result = await fileService.createAvatar(filename, mimetype, size, id);

    // 3.将图片地址保存到user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarUrlById(avatarUrl, id);

    // 4.返回结果
    ctx.body = '上传头像成功~';
  }


  async savePictureInfo(ctx, next) {
    try {
      // 1.获取图像信息,因为这里是多张图片，所以files是一个数组
      const files = ctx.req.files
      const {
        id
      } = ctx.user

      let resultList = []
      // 2.将所有的文件信息保存到数据库里
      for (let file of files) {
        const {
          filename,
          mimetype,
          size
        } = file

        await fileService.createPicture(filename, mimetype, size, id)
        resultList.push("http://localhost:8000/moment/images/" + filename)
      }
      ctx.body = resultList
    } catch (error) {
      console.log("图片上传失败")
    }
  }
}

module.exports = new FileController()
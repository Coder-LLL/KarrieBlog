const fs = require('fs')
const {
  PICTURE_PATH
} = require('../constants/file-path.js')
const momentService = require('../service/moment.service.js')
const fileService = require('../service/file.service.js')

class MomentController {
  async create(ctx, next) {
    // 1.获取数据 
    const userId = ctx.user.id
    const content = ctx.request.body.content
    const title = ctx.request.body.title
    // console.log(userId, content)
    // 2.将数据插入到数据库
    const result = await momentService.create(title, userId, content)
    ctx.body = result
  }

  async detail(ctx, next) {
    // 1.获取数据（momentId）
    const momentId = ctx.params.momentId
    // 2.根据id去查询这条数据
    const result = await momentService.getMomentById(momentId)
    ctx.body = result
  }

  async list(ctx, next) {
    // 1.获取数据( offset 和 size)
    const {
      offset,
      size
    } = ctx.query

    // 2.查询列表
    const result = await momentService.getMomentList(offset, size)
    ctx.body = result
  }

  async update(ctx, next) {
    const {
      momentId
    } = ctx.params

    const {
      title,
      content
    } = ctx.request.body

    const {
      id
    } = ctx.user
    const result = await momentService.update(title, content, momentId)
    ctx.body = result
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const {
      momentId
    } = ctx.params

    // 2.删除内容
    const result = await momentService.remove(momentId)
    ctx.body = result
  }

  async addLabels(ctx, next) {
    // 1.获取标签和动态的id
    const {
      labels
    } = ctx
    const {
      momentId
    } = ctx.params

    // 2.添加所有的标签
    for (let label of labels) {
      // 2.1 判断标签是否已经和动态有关系了
      const isExist = await momentService.hasLabel(momentId, label.id)
      if (!isExist) {
        await momentService.addLabel(momentId, label.id)
      }

    }
    ctx.body = "给动态添加标签成功"
  }

  // async fileInfo(ctx, next) {
  //   // 拿到filename
  //   let {
  //     filename
  //   } = ctx.params
  //   const {
  //     type
  //   } = ctx.query
  //   const types = ['small', 'middle', 'large']
  //   if (types.some(item => item === type)) {
  //     filename = filename + '-' + type
  //   }
  //   // 在查找动态的图片的时候，要根据filename来查找，不能通过moment_id，因为有可能一个动态有很多个图片
  //   const fileInfo = await fileService.getFileInfo(filename)
  //   ctx.response.set('content-type', fileInfo.mimetype);
  //   ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  // }

  async fileInfo(ctx, next) {
    let {
      filename
    } = ctx.params;
    const fileInfo = await fileService.getFileInfo(filename);
    const {
      type
    } = ctx.query;
    const types = ["small", "middle", "large"];
    if (types.some(item => item === type)) {
      filename = filename + '-' + type;
    }

    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }

  async sortedList(ctx, next) {
    // 1.查询列表
    const result = await momentService.getSortedMomentList()
    ctx.body = result
  }
}

module.exports = new MomentController()
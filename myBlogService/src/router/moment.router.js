const Router = require('koa-router')

const {
  create,
  list,
  detail,
  update,
  remove,
  addLabels,
  fileInfo,
  sortedList
} = require('../controller/moment.controller.js')
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware.js')

const {
  verifyLabelExists
} = require('../middleware/label.middleware.js')

const momentRouter = new Router({
  prefix: '/moment'
})

// 创建文章 在发布动态前要验证是否登陆
momentRouter.post('/', verifyAuth, create)
// 获取全部文章数据
momentRouter.get('/', list)
// 根据标签分类之后的文章数据
momentRouter.get('/sorted', sortedList)
// 获取特定id的文章详情
momentRouter.get('/:momentId', detail)


// 修改前要检查是否登录verifyAuth，并且验证是否具有修改当前文章的权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
// 删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)

// 查看动态的图片
momentRouter.get('/images/:filename', fileInfo)
module.exports = momentRouter
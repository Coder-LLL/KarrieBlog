const errorTypes = require('../constants/error-types.js')
const labelService = require('../service/label.service.js')

const verifyLabelExists = async (ctx, next) => {
  // 1.去除要添加的所有标签
  const {
    labels
  } = ctx.request.body
  const newLabels = []
  for (let name of labels) {
    const labelResult = await labelService.getLabelByName(name)
    const label = {
      name
    }
    if (!labelResult) {
      const result = await labelService.create(name)
      label.id = result.insertId
    } else {
      label.id = labelResult.id
    }
    newLabels.push(label)
  }
  ctx.labels = newLabels
  // console.log(newLabels)
  await next()
}

module.exports = {
  verifyLabelExists
}
const errorTypes = require('../constants/error-types')

const errHandler = (error, ctx) => {
  let status, message
  console.log(error)
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = '用户名或者密码为空'
      break
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409
      message = '用户名已存在'
      break
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400
      message = '用户名不存在'
      break
    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 400
      message = '密码不正确'
      break
    case errorTypes.UNAUTHORIZATION:
      status = 401
      message = '无效的token'
      break
    case errorTypes.UNPERMISSION:
      status = 401
      message = '您不具备操作权限'
      break
    default:
      status = 404
      message = "NOT FOUND"
  }

  ctx.status = status
  ctx.body = message
}

module.exports = errHandler
const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types.js')
const userService = require('../service/user.service.js')
const authService = require('../service/auth.service.js')
const md5password = require('../utils/password-handle.js')

const {
  PUBLIC_KEY
} = require('../app/config')

const verifyLogin = async (ctx, next) => {
  // 1.获取用户名和密码
  const {
    name,
    password
  } = ctx.request.body

  // 2.判断用户名和密码是否为空
  if (!name || !password || name == '' || password == '') {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断用户是否存在
  // service.getUserByName(name)的返回值还是一个数组，在这里取到第一个元素
  const result = await userService.getUserByName(name)
  const user = result[0]
  // console.log(user)
  // 返回的是一个数组，如果有长度，说明用户名已经存在
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 4.判断密码是否和数据库中的密码一致
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user
  await next()
}

const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware~");
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }
  const token = authorization.replace('Bearer ', '');

  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }
}
const verifyPermission = async (ctx, next) => {
  console.log("验证权限的middleware~");

  // 1.获取参数 { commentId: '1' }
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace('Id', '');
  const resourceId = ctx.params[resourceKey];
  const {
    id
  } = ctx.user;
  // console.log(tableName, resourceId, id)
  // 2.查询是否具备权限
  try {
    const isPermission = await authService.checkResource(tableName, resourceId, id);
    // console.log(isPermission)
    if (!isPermission) throw new Error();
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit('error', error, ctx);
  }
}


module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}
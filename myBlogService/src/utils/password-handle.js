const crypto = require('crypto')
const md5password = (password) => {
  const md5 = crypto.createHash('md5')
  // digest('hex')表示转为16进制
  // 传给md5的参数password必须是字符串或者buffer类型
  const result = md5.update(password).digest('hex')
  return result
}

module.exports = md5password
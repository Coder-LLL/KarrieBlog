const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

// 拿到dotenv后直接调用config函数，之后dotenv就会把根目录下面的 .env文件读取并放入process.env中
dotenv.config()

// console.log(process.env.APP_HOST)



const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));

// 相当于从process.env中取出APP_HOST，然后再导出
// const {
//   APP_HOST
// } = process.env
// module.exports = {
//   APP_HOST
// }

// 写法二
module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY
const Koa = require('koa')

// 启动跨域
var cors = require('koa2-cors');
// 
const bodyParser = require('koa-bodyparser')

// const userRouter = require('../router/user.router.js')
// const authRouter = require('../router/auth.router.js')
const errHandler = require('./error.handle.js')
const useRouter = require('../router/index.js')

const app = new Koa()

app.use(bodyParser())
app.use(cors());

// 如果每个路由都要这样自己导入太麻烦了，所以在router文件夹下创建了一个index.js文件用于动态导入创建的router
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods()) // 判断某个请求的方法是否存在，如果不存在则返回找不到方法，或者不允许
// app.use(authRouter.routes())
// app.use(authRouter.allowedMethods())
useRouter(app)


app.on('error', errHandler)

module.exports = app
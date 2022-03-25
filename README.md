# KarrieBlog
前端用vue2，后台用koa的博客

* node版本： v14.19.0
* vuecli版本：@vue/cli 5.0.1


# 运行：

## 后台：
1. 运行 myBlogService 下的karrieblog.mysql 创建数据库
2. 修改 myBlogService 下面的 .env 文件 
 *   APP_HOST=http://localhost
 *   APP_PORT=8000

 *   MYSQL_HOST=localhost
 *   MYSQL_PORT=3306
 *  MYSQL_DATABASE=karrieblog
 *   MYSQL_USER=root
 *   MYSQL_PASSWORD=123456789
 *   根据自己的数据库情况修改
  
 3. 终端进入 myBlogService 文件夹下，运行npm run start 启动（我已经把node_modules传上去了，所以不需要安装依赖） 

## 前端：
1. 终端进入 karrieBlog 文件夹下，运行npm run dev 启动（我已经把node_modules传上去了，所以不需要安装依赖） 

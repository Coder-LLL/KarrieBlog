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
  
 3. 终端进入 myBlogService 文件夹下，运行npm  install 安装依赖
 4. 终端进入 myBlogService 文件夹下，运行npm run start 启动项目
    如果出现：  
     *  服务器在8000启动成功~
     *  数据库连接成功
     则表示启动成功
    

## 前端：
1. 终端进入 karrieBlog 文件夹下，运行npm run dev 启动

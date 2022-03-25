const connection = require('../app/database.js')

class FileService {
  // async createAvatar(filename, mimetype, size, userId) {
  //   console.log(777)
  //   const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`;
  //   const [result] = await connection.execute(statement, [filename, mimetype, size, userId]);
  //   return result;
  // }

  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId]);
    return result;
  }

  async getAvatarByUserId(userId) {
    const statement = `select * from avatar where user_id = ?;`
    const [result] = await connection.execute(statement, [userId])
    // console.log(result)
    // 每次返回数组的最后一个元素，就是最新的头像
    return result[result.length - 1]
  }

  async createPicture(filename, mimetype, size, userId) {
    const statement = `insert into picture (filename,mimetype,size,user_id) values (?,?,?,?);`
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }

  async getFileInfo(filename) {
    const statement = `select * from picture where filename = ?;`
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }
}

module.exports = new FileService()
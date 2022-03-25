const connection = require('../app/database.js')

class UserService {
  // 
  async create(user) {
    const {
      name,
      password
    } = user

    // console.log(name, password)
    const statement = `insert into user (name,password) values (?,?);`
    const result = await connection.execute(statement, [name, password])
    // result里面有很多个字段，其中result[0]才是查找的数据
    return result[0]
  }

  async getUserByName(name) {
    const statement = `select * from user where name = ?;`
    const result = await connection.execute(statement, [name])
    // result里面有很多个字段，其中result[0]才是查找的数据
    return result[0]
  }


  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }


}

module.exports = new UserService()
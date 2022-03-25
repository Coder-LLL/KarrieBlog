const connection = require('../app/database.js')
class AuthService {
  async checkResource(tableName, momentId, userId) {
    const statement = `
      select * from ${tableName} where id = ? and user_id = ?;
    `
    const [result] = await connection.execute(statement, [momentId, userId])
    // console.log(result)
    return result.length === 0 ? false : true;
  }

}

module.exports = new AuthService()
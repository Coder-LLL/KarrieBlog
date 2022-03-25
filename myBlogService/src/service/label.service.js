const connection = require('../app/database.js')

class LabelService {
  async create(name) {
    const statement = `insert into label (name) values (?);`
    const [result] = await connection.execute(statement, [name])
    return result
  }

  async getLabelByName(name) {
    const statement = `select * from label where name = ?;`
    const [result] = await connection.execute(statement, [name])
    // console.log(result[0])
    return result[0]
  }

  async getLabels(limit, offset) {
    const statement = `select * from label limit ?,?;`
    const [result] = await connection.execute(statement, [offset, limit])
    return result
  }

  async getAllLabels() {
    const statement = `select * from label;`
    const [result] = await connection.execute(statement)
    return result
  }
}

module.exports = new LabelService()
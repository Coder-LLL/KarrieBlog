const connection = require('../app/database.js')

class MomentService {
  async create(title, userId, content) {
    const statement = `insert into moment (title,content,user_id) values (?,?,?)`
    const [result] = await connection.execute(statement, [title, content, userId])
    return result
  }

  async getMomentById(id) {
    const statement =
      // 22集-2:21:00
      `
      SELECT 
      m.id id,m.title title, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
      IF(COUNT(l.id),JSON_ARRAYAGG(
        JSON_OBJECT('id', l.id, 'name', l.name)
      ),NULL) labels,
      (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
        JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                    'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))
      ),NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments
    FROM moment m
    LEFT JOIN user u ON m.user_id = u.id
    LEFT JOIN moment_label ml ON m.id = ml.moment_id
    LEFT JOIN label l ON ml.label_id = l.id
    WHERE m.id = ?
    GROUP BY m.id;  
    `
    //   select 
    //   m.id as id,m.content as content,m.createAt as createTime,m.updateAt as updateTime ,
    //   JSON_OBJECT('id',u.id,'name',u.name) as author,
    //   JSON_ARRAYAGG(
    // JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAt,
    //     'user',JSON_OBJECT('id',cu.id,'name',cu.name))
    //   ) as comments
    // from moment as m 
    // left join user as u on m.user_id = u.id 
    // left join comment as c on c.moment_id = m.id
    //  left join user as cu on cu.id = c.user_id
    // where  m.id = 1;
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }

  async getMomentList(offset, size) {
    const statement = `
    select 
      m.id as id, m.title title, m.content as content,m.createAt as createTime,m.updateAt as updateTime ,
      JSON_OBJECT('id',u.id,'name',u.name) as author,
      (select count(*) from comment as c where c.moment_id =  m.id) as comentCount,
      (select count(*) from moment_label as ml where ml.moment_id =  m.id) as labelCount,
      (select count(*) from moment  ) as totalMomentsCount
    from moment as m left join user as u on m.user_id = u.id 
    order by m.createAt desc
    limit ?,?;
     `
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }

  async update(title, content, momentId) {
    const statement = `
      update moment set title = ?, content = ? where id = ?;
    `
    const [result] = await connection.execute(statement, [title, content, momentId])
    return result
  }

  async remove(momentId) {
    const statement = `delete from moment where id = ?;`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }

  async hasLabel(momentId, labelId) {
    const statement = `select * from moment_label where moment_id = ? and label_id = ?;`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result[0] ? true : false
  }

  async addLabel(momentId, labelId) {
    const statement = `insert into moment_label (moment_id,label_id) values (?,?);`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result
  }

  async getSortedMomentList() {
    const statement = `
    select label.id as labelId ,label.name as label, 
      (SELECT JSON_ARRAYAGG(JSON_OBJECT('id',moment.id,"title",moment.title,"content",moment.content,"createTime",moment.createAt,"updateTime",moment.updateAt, "author", JSON_OBJECT("id",user.id,"name",user.name)) )
      FROM moment 
      left join moment_label on moment.id = moment_label.moment_id 
      left join user on moment.user_id = user.id
      WHERE label.id = moment_label.label_id)  as momentList
    from label;`
    const [result] = await connection.execute(statement)
    return result
  }


  async getMomentByUserId(userId) {
    const statement = `
    select *
    from moment
    where user_id = ?;`
    const [result] = await connection.execute(statement, [userId])
    return result
  }
}
module.exports = new MomentService()
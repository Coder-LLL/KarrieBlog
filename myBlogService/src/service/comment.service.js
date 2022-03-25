const connection = require('../app/database.js')

class CommentService {
  async create(momentId, content, userId) {
    const statement = `insert into comment (content,moment_id,user_id) values (?,?,?);`
    const [result] = await connection.execute(statement, [content, momentId, userId])
    return result
  }


  async reply(momentId, content, userId, commentId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [content, momentId, userId, commentId]);
    return result;
  }

  async update(commentId, content) {
    const statement = `update comment set content = ? where id = ?; `;
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }

  async remove(commentId) {
    const statement = `delete from comment where id = ?; `;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }

  async getCommentsByMomentId(momentId) {
    // const statement = `select * from comment where moment_id = ?; `;
    // const statement = ` select c.id as id ,c.content as content,c.moment_id as moment_id,c.comment_id as comment_id,c.createAt as createAt,c.updateAt as updateAt,
    // JSON_OBJECT('id',u.id,'name' ,u.name,'avatar_url',u.avatar_url) as author
    // from comment as c left join user as u
    // on c.user_id = u.id
    // where moment_id = ?; `;

    const statement = `
    select c.id as id ,c.content as content,c.moment_id as moment_id,c.comment_id as comment_id,c.createAt as createAt,c.updateAt as updateAt,
c2.author as fatherCommentUser,
JSON_OBJECT('id',u.id,'name' ,u.name,'avatar_url',u.avatar_url) as author
from comment as c left join user as u on c.user_id = u.id
left join (select c.id as id ,c.content as content,c.moment_id as moment_id,c.comment_id as comment_id,c.createAt as createAt,c.updateAt as updateAt,
JSON_OBJECT('id',u.id,'name' ,u.name,'avatar_url',u.avatar_url) as author from comment as c left join user as u on c.user_id = u.id
where c.moment_id = ?
) as c2 on c.comment_id = c2.id
where c.moment_id = ?; 
    `;
    const [result] = await connection.execute(statement, [momentId, momentId]);
    return result;
  }

  async getCommentByUserId(userId) {
    const statement = `
        select *
        from comment
        where user_id = ?; 
    `;
    const [result] = await connection.execute(statement, [userId]);
    return result;
  }
}

module.exports = new CommentService()
const commentService = require('../service/comment.service.js')


class CommentController {
  async create(ctx, next) {
    // 拿到文章id和对应的评论内容
    const {
      momentId,
      content
    } = ctx.request.body
    // 拿到评论发布者的id,其实也就是登陆的账号的id
    const {
      id
    } = ctx.user
    const result = await commentService.create(momentId, content, id)
    ctx.body = result
  }

  async reply(ctx, next) {
    const {
      momentId,
      content
    } = ctx.request.body;
    const {
      commentId
    } = ctx.params;
    const {
      id
    } = ctx.user;

    const result = await commentService.reply(momentId, content, id, commentId);
    ctx.body = result;
  }

  async update(ctx, next) {
    const {
      commentId
    } = ctx.params

    const {
      content
    } = ctx.request.body

    const result = await commentService.update(commentId, content)
    ctx.body = result
  }

  async remove(ctx, next) {
    const {
      commentId
    } = ctx.params
    const result = await commentService.remove(commentId)
    ctx.body = result
  }

  async list(ctx, next) {
    const {
      momentId
    } = ctx.query

    const result = await commentService.getCommentsByMomentId(momentId)
    ctx.body = result

  }
}

module.exports = new CommentController()
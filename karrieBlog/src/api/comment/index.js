import request from '../../utils/request'



export const getCommentByMomentId = (query) => {
  return request({
    url: "/comment",
    method: 'get',
    params: query
  })
}



export const createComment = (query) => {
  return request({
    url: "/comment",
    method: 'post',
    data: query
  })
}

export const replyComment = (commentId, query) => {
  return request({
    url: "/comment/" + commentId + "/reply",
    method: 'post',
    data: query
  })
}

export const modifyCommentById = (query, commentId) => {
  return request({
    url: "/comment/" + commentId + "/update",
    method: 'patch',
    data: query
  })
}
export const deleteCommentById = (commentId) => {
  return request({
    url: "/comment/" + commentId,
    method: 'delete',
  })
}

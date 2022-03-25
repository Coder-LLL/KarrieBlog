import request from '../../utils/request'
import store from '../../store/index'

export const login = (params) => {
  return request({
    url: "/login",
    method: "post",
    data: params
  })
}

export const register = (params) => {
  return request({
    url: "/users",
    method: "post",
    data: params
  })
}

export const avatarUpload = (params) => {
  console.log(params)
  return request({
    url: "/upload/avatar",
    method: "post",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: params
  })
}


export const getPersonalMoment = (userId) => {
  return request({
    url: "/users/" + userId + "/moment",
    method: "get"
  })
}

export const getPersonalComment = (userId) => {
  return request({
    url: "/users/" + userId + "/comment",
    method: "get"
  })
}

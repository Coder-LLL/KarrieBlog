import request from '../../utils/request'


export const getAllLabel = () => {
  return request({
    url: '/label/all',
    method: "get"
  })
}

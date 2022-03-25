import request from '../../utils/request'

export const getMomentListApi = (query) => {
  return request({
    url: '/moment',
    method: 'get',
    params: query
  });
}

export const getMomentByIdApi = (query) => {
  return request({
    url: '/moment/' + query,
    method: 'get'
  });
}

export const createMoment = (query) => {
  return request({
    url: '/moment',
    method: 'post',
    data: query
  });
}

export const createLabelForMoment = (momentId, query) => {
  return request({
    url: '/moment/' + momentId + '/labels',
    method: 'post',
    data: query
  });
}

export const getSortedMomentListApi = () => {
  return request({
    url: '/moment/sorted',
    method: 'get',
  });
}

export const deleteMoment = (momentId) => {
  return request({
    url: '/moment/' + momentId,
    method: 'delete',
  });
}

export const modyfiMoment = (query, momentId) => {
  return request({
    url: '/moment/' + momentId,
    method: 'patch',
    data: query
  });
}

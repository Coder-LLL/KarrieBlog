import {
  login,
  register
} from '../../api/user/index'
import router from '@/router'
import cookies from "vue-cookies"

const state = {
  userId: '',
  userName: '',
  token: ''
}


const getters = {
  userIdGetter(state) {
    return state.userId
  },
  userNameGetter(state) {
    return state.userName
  },
  tokenGetter(state) {
    return state.token
  }
}

const actions = {
  async login({
    commit
  }, params) {
    const loginResult = await login(params)
    const {
      id,
      name,
      token
    } = loginResult.data
    console.log({
      id,
      name,
      token
    })
    commit('setToken', token)
    cookies.set('KarrieToken', token)

    commit('setUserName', name)
    cookies.set('KarrieName', name)

    commit('setUserId', id)
    cookies.set('KarrieId', id)

    // 登录成功后返回上一页
    router.go(-1);
  },
  loadLocalLogin({
    commit
  }) {
    const token = cookies.get('KarrieToken')
    if (token) {
      commit('setToken', token)
    }
    const name = cookies.get('KarrieName')
    if (name) {
      commit('setUserName', name)
    }
    const id = cookies.get('KarrieId')
    if (id) {
      commit('setUserId', id)
    }
  },

}

const mutations = {
  setUserId(state, payload) {
    state.userId = payload
  },
  setUserName(state, payload) {
    state.userName = payload
  },
  setToken(state, payload) {
    state.token = payload
  },
  loginOut() {
    // 退出登录的时候，把vuex的数据全部清理掉，并且把cookie的数据也清除
    this.commit('user/setToken', '')
    cookies.remove('KarrieToken')

    this.commit('user/setUserName', '')
    cookies.remove('KarrieName')

    this.commit('user/setUserId', '')
    cookies.remove('KarrieId')
  }

}

const user = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default user


import * as types from './mutation-types'

export default {
  setStatus({commit},status){
    commit(types.SET_STATUS,status)
  },
  login({commit}, token){
    commit(types.LOGIN, token)
  },
  logout({commit}){
    commit(types.LOGOUT)
  }

}

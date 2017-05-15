/**
 * Created by Lee on 2016/12/7.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
  status: 1,
  token: ''
}

let getToken = () => {
  let token = state.token

  if (null == token || '' == token){
    token = sessionStorage.getItem('token')
    if (null != sessionToken && '' != sessionToken)
      this.$store.dispatch('login', token)
  }

  return token
}


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getToken
})

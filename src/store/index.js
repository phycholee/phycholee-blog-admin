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


export default new Vuex.Store({
  state,
  mutations,
  actions
})

/**
 * Created by Lee on 2016/12/7.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

//先模拟数据
// 个人数据
const state = {
  status: 1
};

export default new Vuex.Store({
  state,
  mutations,
  actions
})

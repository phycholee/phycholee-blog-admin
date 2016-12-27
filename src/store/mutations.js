/**
 * Created by Lee on 2016/12/6.
 */
import * as types from './mutation-types'
import Vue from 'vue'

export default {

  //设置博客类型，已发布或已保存
  [types.SET_STATUS](state,status){
      state.status = status
  }
}

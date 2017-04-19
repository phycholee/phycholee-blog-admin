/**
 * Created by Lee on 2017/4/18.
 */
import Vue from 'vue'
import { getUrl } from './url'

let auth = {}

auth.login  = params => {
  return new Promise((resolve, reject) => {
    let url = getUrl('auth') + 'login'

    Vue.http.post(url, params).then((response)=>{
      resolve(response.body)
    }, (response)=>{
      let data  = {
        code: 400,
        message: '未知错误'
      }
      resolve(data)
    })
  })
}

auth.logout  = (token) => {
  return new Promise((resolve, reject) => {
    let url = getUrl('auth') + 'logout'

    Vue.http.post(url, {token: token}).then((response)=>{
      resolve(response.body)
    }, (response)=>{
      let data  = {
        code: 400,
        message: '未知错误'
      }
      resolve(data)
    })
  })
}

export default auth

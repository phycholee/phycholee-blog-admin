/**
 * Created by Lee on 2017/5/15.
 */
import Vue from 'vue'
import { getUrl } from './url'

let admin = {}

admin.list = () => {
  return new Promise((resolve, reject) => {
    let url = getUrl('admin') + 'admins'

    Vue.http.get(url).then((response)=>{
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

admin.update = params => {
  return new Promise((resolve, reject) => {
    let url = getUrl('admin') + 'update'

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

export default admin

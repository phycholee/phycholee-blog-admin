/**
 * Created by Lee on 2017/1/2.
 */

import Vue from 'vue'
import { getUrl } from './url'

let image = {}

image.delete  = param => {
  return new Promise((resolve, reject) => {
    let url = getUrl('deleteImage')

    Vue.http.post(url, param).then((response)=>{
      console.log(response.body)
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

export default image

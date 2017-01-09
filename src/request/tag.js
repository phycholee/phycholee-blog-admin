/**
 * Created by Lee on 2017/1/2.
 */

import Vue from 'vue'
import { getUrl } from './url'

let tag = {}

tag.tags  = () => {
  return new Promise((resolve, reject) => {
    let url = getUrl('tags')

    Vue.http.get(url).then((response)=>{
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

tag.save  = params => {
  return new Promise((resolve, reject) => {
    let url = getUrl('tag')

    Vue.http.post(url, params).then((response)=>{
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

tag.update  = params => {
  return new Promise((resolve, reject) => {
    let url = getUrl('tag')

    Vue.http.put(url, params).then((response)=>{
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

tag.delete  = id => {
  return new Promise((resolve, reject) => {
    let url = getUrl('tag')

    Vue.http.get(url+ "/" + id).then((response)=>{
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

export default tag

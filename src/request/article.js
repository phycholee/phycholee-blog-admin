/**
 * Created by Lee on 2016/12/22.
 */

import Vue from 'vue'
import { getUrl } from './url'

let article = {}

article.save  = params => {
  return new Promise((resolve, reject) => {
    let url = getUrl('article')

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

article.update  = params => {
  return new Promise((resolve, reject) => {
    let url = getUrl('article')

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

article.articles  = params => {
  return new Promise((resolve, reject) => {
    let url = getUrl('articles')

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

article.get  = id => {
  return new Promise((resolve, reject) => {
    let url = getUrl('article')

    Vue.http.get(url+ '/' +id).then((response)=>{
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

article.delete  = id => {
  return new Promise((resolve, reject) => {
    let url = getUrl('article')

    Vue.http.delete(url+ '/' +id).then((response)=>{
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

export default article

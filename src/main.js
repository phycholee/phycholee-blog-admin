
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'

import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import 'font-awesome/css/font-awesome.min.css'


//自定义组件
import Login from './components/Login'
import Home from './components/Home'
import Published from './components/blog/Published'
import Saved from './components/blog/Saved'
import AddBlog from './components/blog/AddBlog'
import BlogItem from './components/blog/BlogItem'
import EditBlog from './components/blog/EditBlog'

import AddTag from './components/tag/AddTag'
import Tags from './components/tag/Tags'

import Admin from './components/info/Admin'
import BlogInfo from './components/info/BlogInfo'



import store from './store'

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueRouter)

// Vue.http.options.emulateJSON = true
// Vue.http.options.xhr = { withCredentials: true }

//每个请求头添加token信息
Vue.http.interceptors.push((request, next) => {
  request.headers.set('token', store.state.token)
  console.log(request.headers)
  next(response => {

    if (401 === response.status){
      // 返回 401 清除token信息并跳转到登录页面
      store.dispatch('logout')
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
      })

      return
    }
    return response
  })
})

//路由
const routes = [{
  path:'/login',
  component: Login,
  hidden: true,//不显示在导航中
},{
  path:'/',
  component: Home,
  name:'博客',
  meta: { requiresAuth: true },
  children:[
    {path:'/published', component:Published, name:'已发布', icon:'fa fa-eye'},
    {path:'/saved', component:Saved, name:'未发布', icon:'fa fa-eye-slash'},
    {path:'/add-blog', component:AddBlog, name:'新博客', icon:'fa fa-pencil-square-o'},
    {path:'/blog-item', component:BlogItem, name:'博客内容', hidden: true},
    {path:'/edit-blog', component:EditBlog, name:'修改博客', hidden: true}
  ]
},{
  path:'/',
  component: Home,
  name:'标签',
  meta: { requiresAuth: true },
  children:[
    {path:'/tags', component:Tags, name:'标签管理', icon:'fa fa-tags'},
    {path:'/add-tag', component:AddTag, name:'新标签', icon:'fa fa-pencil-square-o'},
  ]
},{
  path:'/',
  component: Home,
  name:'信息',
  meta: { requiresAuth: true },
  children:[
    {path:'/admin', component:Admin, name:'用户信息', icon:'fa fa-user'},
    {path:'/blog-info', component:BlogInfo, name:'博客信息', icon:'fa fa-info-circle'},
  ]
}];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    //登录拦截
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
      next()
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })

    }
  }
})

router.afterEach(transition => {
  NProgress.done()
})

new Vue({
  el: '#app',
  router,
  store,
  ...App,
})

// router.replace('/login')

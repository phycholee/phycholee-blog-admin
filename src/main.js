
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

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

import store from './store'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)


const routes = [{
  path:'/login',
  component: Login,
  hidden: true//不显示在导航中
},{
  path:'/',
  component: Home,
  name:'博客',
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
  children:[
    {path:'/tags', component:Tags, name:'标签管理', icon:'fa fa-tags'},
    {path:'/add-tag', component:AddTag, name:'新标签', icon:'fa fa-pencil-square-o'},
  ]
}];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(transition => {
  NProgress.done();
});

new Vue({
  el: '#app',
  router,
  store,
  ...App,
})

// router.replace('/login')

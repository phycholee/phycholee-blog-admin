<template>
  <div>
    <div class="intro-header" :style="bgImg">
      <el-row>
        <el-col :span="16" :offset="4" class="post-heading">

            <h1 class="title">{{ article.title }}</h1>
            <h3 class="subtitle">
              {{ article.subTitle }}
            </h3>
            <div class="post-meta">
              <span class="author"><i class="fa fa-user-o" aria-hidden="true"></i>&nbsp;PhychoLee</span>&nbsp;&nbsp;&nbsp;
              <span class="time"><i class="fa fa-calendar" aria-hidden="true"></i>&nbsp;{{ article.createTime }}</span>
            </div>

        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="16" :offset="4" class="post-container">
        <div class="post-preview markdown-body" v-html="article.htmlContent">
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { request } from './../../request'

//  import 'bootstrap/dist/css/bootstrap.min.css'
//  import 'bootstrap/dist/js/bootstrap.min'
  import 'github-markdown-css/github-markdown.css'

  export default{
    name: 'BlogItem',
    data(){
      return {
        article: ''
      }
    },
    computed:{
      bgImg(){
        return {
          backgroundImage: 'url('+require('./../../assets/img/post.jpg')+')'
        }
      }
    },
    mounted(){
      request.article.get(this.$route.query.id).then(res=>{
        this.article = res.article
      })
    }
  }
</script>
<style scoped>
  @import "./../../assets/css/post.css";
</style>

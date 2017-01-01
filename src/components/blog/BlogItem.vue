<template>
  <div>
    <el-button-group class="btns-operate">

      <el-button type="primary" size="large" title="返回" @click="back()"><i class="fa fa-chevron-left"></i></el-button>
      <el-button type="primary" size="large" title="编辑"><i class="fa fa-pencil"></i></el-button>
      <el-button type="primary" size="large" title="删除" @click="deleteBlog()"><i class="fa fa-trash"></i></el-button>
    </el-button-group>

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

  import 'github-markdown-css/github-markdown.css'

  export default{
    name: 'BlogItem',
    data(){
      return {
        article: '',
        bgImg: {
          backgroundImage: 'url('+require('./../../assets/img/post.jpg')+')'
        }
      }
    },
    methods:{
      back(){
        var status = this.article.status
        if(1 == status){
          this.$router.push('/published')
        }else if(2 == status){
          this.$router.push('/saved')
        }
      },
      deleteBlog(){
        var id = this.article.id

        this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //往后台发送删除请求
          request.article.delete(id).then(res=>{
            if (200 == res.code){

              this.$message({
                message: res.message,
                type: 'success'
              });
              this.$router.back()
            }else {
              this.$message.error(res.message);
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    mounted(){
      request.article.get(this.$route.query.id).then(res=>{
        this.article = res.article
        var jumbotron = res.article.jumbotron;
        if('' != jumbotron && null != jumbotron){
          this.bgImg = {
            backgroundImage: 'url('+res.article.jumbotron+')'
          }
        }
      })
    }
  }
</script>
<style scoped>
  @import "./../../assets/css/post.css";

  .btns-operate{
    float: left;
    position: fixed;
    top: 117px;
    left: 250px;
    z-index: 2;

    /*设置透明度*/
    filter:alpha(opacity=50);
    -moz-opacity:0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
  }
  .btns-operate:hover{
    filter:alpha(opacity=80);
    -moz-opacity:0.8;
    -khtml-opacity: 0.8;
    opacity: 0.8;
  }
</style>

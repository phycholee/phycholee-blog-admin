<template>
  <div>
    <el-button-group class="btns-operate">

      <el-button type="default" size="large" title="返回" @click="back()"><i class="fa fa-chevron-left"></i></el-button>
      <el-button type="default" size="large" title="编辑" @click="editBlog()"><i class="fa fa-pencil"></i></el-button>
      <el-button type="default" size="large" title="删除" @click="deleteBlog()"><i class="fa fa-trash"></i></el-button>
    </el-button-group>

    <div class="intro-header" :style="bgImg">
      <el-row>
        <el-col :span="16" :offset="4" class="post-heading">

            <h1 class="title">{{ article.title }}</h1>
            <h3 class="subtitle">
              {{ article.subTitle }}
            </h3>
          <div style="display: inline-block" v-for="(tag, index) in tags">
            <a class="tag" :class="tag.colorClass">{{ tag.name }}</a>
            <!--<input type="hidden" v-model="tag.id">-->
          </div>
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
        tags: [],
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
      editBlog(){
        var id = this.article.id

        this.$router.push({
          path:'/edit-blog',
          query: {
            id: id
          }
        })
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
        this.tags = setColorClass(res.article.tags)
        var jumbotron = res.article.jumbotron;
        if('' != jumbotron && null != jumbotron){
          this.bgImg = {
            backgroundImage: 'url('+res.article.jumbotron+')'
          }
        }
      })
    }
  }

  var setColorClass = (tags) => {

    const tagPrimary = { 'tag-primary' : true }
    const tagSuccess = { 'tag-success' : true }
    const tagWarning = { 'tag-warning' : true }
    const tagDanger = { 'tag-danger' : true }
    const tagInfo = { 'tag-info' : true }

    for(var i=0; i<tags.length; i++){
      var randomNum = Math.floor(Math.random()*5)

      //根据随机数给不同节点不同的颜色class
      if(1 == randomNum){
        tags[i].colorClass = {
          'tag-primary' : true
        }
      }else if(2 == randomNum){
        tags[i].colorClass = {
          'tag-success' : true
        }
      }else if(3 == randomNum){
        tags[i].colorClass = {
          'tag-warning' : true
        }
      } else if(4 == randomNum){
        tags[i].colorClass = {
          'tag-danger' : true
        }
      }else if(5 == randomNum){
        tags[i].colorClass = {
          'tag-info' : true
        }
      }else {
        tags[i].colorClass = {
          'tag-primary' : false
        }
      }
    }

    return tags
  }
</script>
<style scoped>
  @import "./../../assets/css/post.css";
  @import "./../../assets/css/tag.css";

  .btns-operate{
    float: left;
    position: fixed;
    top: 97px;
    left: 250px;
    z-index: 2;

    /*设置透明度*/
    filter:alpha(opacity=50);
    -moz-opacity:0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
  }
  .btns-operate:hover{
    filter:alpha(opacity=100);
    -moz-opacity:1.0;
    -khtml-opacity: 1.0;
    opacity: 1.0;
  }

</style>

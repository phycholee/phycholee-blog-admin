<template>
  <div>
    <div class="tags box-block">
      <div style="display: inline-block" v-for="tag in tags">
        <a class="tag" @click="showTag(tag)">{{ tag.name }}</a>
        <input type="hidden" v-model="tag.id">
      </div>

      <!--<a class="tag tag-success">HTML</a>-->
      <!--<a class="tag tag-danger">Spring</a>-->
      <!--<a class="tag tag-primary">数据结构</a>-->
      <!--<a class="tag tag-warning">Database</a>-->
    </div>

    <div class="box-block">
      <div class="intro-header" :style="bgImg">
        <el-row>
          <el-col :span="16" :offset="4" class="tag-heading">

            <h1 class="title">{{ currentTag.name }}</h1>
            <span class="subtitle">{{ currentTag.description }}</span>
            <div class="tag-child">
              <span class="author">此标签下有<strong class="tag-child-num">100</strong> 篇博文</span>&nbsp;&nbsp;&nbsp;
            </div>

          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
  import {request} from './../../request'

  export default{
    name: 'Tags',
    data(){
      return {
        bgImg:{
          backgroundImage: 'url('+require('./../../assets/img/post.jpg')+')'
        },
        tags: [],
        currentTag: {
          name: '',
          description: '',
        }
      }
    },
    computed:{

    },
    mounted(){
      request.tag.tags().then(res => {
        if(200 == res.code){
          this.tags = res.rows

          //初始化初始数据
          this.currentTag = res.rows[0]

          this.bgImg = {
            backgroundImage: 'url('+res.rows[0].jumbotron+')'
          }
        } else{
          this.$message.error('获取数据失败');
        }
      })
    },
    methods:{
      showTag(tag){
        this.bgImg = {
          backgroundImage: 'url('+tag.jumbotron+')'
        }
        this.currentTag = tag

      }
    }
  }
</script>
<style scoped>
  .intro-header{
    background: no-repeat center center;
    background-color: gray;
    background-attachment: scroll;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    -o-background-size: cover;
    margin-bottom: 0;
  }
  .intro-header .tag-heading{
    text-align: center;
    padding: 100px 0 0 0;
    color: #fff;
  }
  .intro-header .tag-heading .title{
    font-size: 40px;
  }
  .intro-header .tag-heading .subtitle{
    font-size: 20px;
    font-weight: 400;
    line-height: 1.4;
    margin: -5px 0 20px;
  }
  .intro-header .tag-heading .tag-child{
    padding: 90px 0 0 5px;
  }
  .intro-header .tag-heading .tag-child .tag-child-num{
    font-size: 25px;
    font-style: italic;

  }


  .tag{
    display: inline-block;
    border-radius: 999em;
    padding: 0 10px;
    line-height: 24px;
    font-size: 12px;
    text-decoration: none;
    margin: 0 6px;
    margin-bottom: 6px;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
  }
  .tag:focus, .tag:hover{
    color: #20a0ff;
    border-color: #20a0ff;
    text-decoration: none;
  }
  .tag-primary{
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
  }
  .tag-primary:focus, .tag-primary:hover{
    background: #4db3ff;
    border-color: #4db3ff;
    color: #fff;
  }
  .tag-success{
    color: #fff;
    background-color: #13ce66;
    border-color: #13ce66;
  }
  .tag-success:focus, .tag-success:hover{
    background: #42d885;
    border-color: #42d885;
    color: #fff;
  }
  .tag-warning{
    color: #fff;
    background-color: #f7ba2a;
    border-color: #f7ba2a;
  }
  .tag-warning:focus, .tag-warning:hover{
    background: #f9c855;
    border-color: #f9c855;
    color: #fff;
  }
  .tag-danger{
    color: #fff;
    background-color: #ff4949;
    border-color: #ff4949;
  }
  .tag-danger:focus, .tag-danger:hover{
    background: #ff6d6d;
    border-color: #ff6d6d;
    color: #fff;
  }
  .tag-info{
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
  }
  .tag-info:hover{
    background: #73ccff;
    border-color: #73ccff;
    color: #fff;
  }


  .box-block{
    padding:10px;
    margin-top:10px;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    /*padding: 0 24px 24px 24px;*/

  }
  .box-block:hover {
    border: 1px solid #d3dce6;
    box-shadow:0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04)
  }
</style>

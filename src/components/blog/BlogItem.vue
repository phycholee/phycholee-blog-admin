<template>
  <div class="intro-header" :style="bgImg">
    <el-row>
      <el-col :span="16" :offset="4" class="post-heading">
        <h1>SpringBoot+Mybatis整合</h1>
        <h3 class="subtitle">
          SpringBoot+Mybatis
        </h3>
        <span class="meta">PhychoLee. 2016-11-05</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    name: 'BlogItem',
    computed:{
      bgImg(){
        return {
          backgroundImage: 'url('+require('./../../assets/img/post.jpg')+')'
        }
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

  .intro-header .post-heading{
    padding: 150px 0;
    color: #fff;
  }
</style>

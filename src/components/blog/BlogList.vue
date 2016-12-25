<template>
  <div class="blog-list">
    <el-row class="blog-item">
      <el-col :span="2" class="blog-status">
        <span class="label label-success">已发布</span>
      </el-col>
      <el-col :span="10" class="blog-title">
        <a href="#">
          <span>SpringBoot+Mybatis整合</span><br>
          <small>SpringBoot+Mybatis</small>
        </a>
      </el-col>
      <el-col :span="4" class="blog-time">
        <small>创建时间：</small>
        <br>
        <small class="create-time">2016-09-07</small>
      </el-col>
      <el-col :span="4" class="blog-author">
        <a href="#" title="作者">
          <span>PhychoLee</span>
        </a>
      </el-col>
      <el-col :span="4" class="blog-actions">
        <el-button :plain="true" type="warning" size="small"><i class="fa fa-pencil"></i> 编辑</el-button>
        <el-button :plain="true" type="danger" size="small"><i class="fa fa-trash"></i> 删除</el-button>
      </el-col>
    </el-row>

    <el-row class="blog-item">
      <el-col :span="2" class="blog-status">
        <span class="label label-success">已发布</span>
      </el-col>
      <el-col :span="10" class="blog-title">
        <a href="#">
          <span>SpringBoot+Mybatis整合</span><br>
          <small>SpringBoot+Mybatis</small>
        </a>
      </el-col>
      <el-col :span="4" class="blog-time">
        <small>创建时间：</small>
        <br>
        <small class="create-time">2016-09-07</small>
      </el-col>
      <el-col :span="4" class="blog-author">
        <a href="#" title="作者">
          <span>PhychoLee</span>
        </a>
      </el-col>
      <el-col :span="4" class="blog-actions">
        <el-button :plain="true" type="warning" size="small"><i class="fa fa-pencil"></i> 编辑</el-button>
        <el-button :plain="true" type="danger" size="small"><i class="fa fa-trash"></i> 删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    name: 'BlogList'
  }
</script>
<style scoped>

  .blog-item {
    vertical-align: middle;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    padding: 10px 0;
  }
  .blog-item:hover {
    border: 1px solid #d3dce6;
    box-shadow:0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04)
  }

  .blog-item a {
    text-decoration: none;
    color: #676a6c;
  }
  a:hover{
    text-decoration: none;
  }

  .label {
    /*background-color: #d1dade;*/
    /*color: #5e5e5e;*/
    border-radius: .25em;
    font-size: 10px;
    font-weight: 600;
    padding: 3px 8px;
    text-shadow: none;
  }

  .label-primary {
    background-color: #337ab7;
    color: #FFFFFF;
  }
  .label-success {
    background-color: #5cb85c;
    color: #FFFFFF;
  }

  .blog-title span{
    font-size: 1.2em;
    font-weight: bold;
  }

  .blog-time{
    /*font-size: 1.0em;*/
    font-weight: bold;
  }
  .blog-time .create-time{
    font-style: italic;
    font-weight: normal;
  }
  .blog-author img {
    width: 32px;
    height: 32px;
  }
  .blog-author span{
    font-size: 1.1em;
    font-family: Lora,"Times New Roman",serif;
    font-style: italic;
    padding-left: 3px;
  }
</style>

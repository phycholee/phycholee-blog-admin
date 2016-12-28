<template>
  <div class="blog-list">
    <el-row class="blog-item"  v-for="article in articles">
      <el-col :span="2" class="blog-status">
        <span class="label" :class="labelClass">{{ statusText }}</span>
      </el-col>
      <el-col :span="10" class="blog-title">
        <a href="#">
          <span>{{ article.title }}</span><br>
          <small>{{ article.subTitle }}</small>
        </a>
      </el-col>
      <el-col :span="4" class="blog-time">
        <small>创建时间：</small>
        <br>
        <small class="create-time">{{ article.createTime }}</small>
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

    <div class="pagination-block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="pageTotal">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { request } from './../../request'

  var params;

  export default{
    name: 'BlogList',
    data(){
      return {
        articles: [],
        statusText: '',
        blogStatus: 1,
        labelClass: 'label-success',

        currentPage: 1,
        pageTotal: 1,
        pageSize: 10
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        getData(this)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        getData(this)
      }
    },
    mounted(){
       this.blogStatus = this.$store.state.status

      if (1 == this.blogStatus){
        this.statusText = '已发布'
        this.labelClass = 'label-success'
      }else if(2 == this.blogStatus){
        this.statusText = '未发布'
        this.labelClass = 'label-primary'
      }

      getData(this)
    }
  }

  var getData = (_this) => {

    params = {
      offset: (_this.currentPage-1) * _this.pageSize,
      limit: _this.pageSize,
      status: _this.blogStatus
    }
    //获取数据
    request.article.articles(params).then(res=>{
      if(200 == res.code){
        _this.articles = res.rows
        _this.pageTotal = res.total
      }
    })
  }
</script>
<style scoped>

  .pagination-block{
    margin: 50px 0;
    float: right;
  }

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
    color: #676a6c;
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

<template>
  <div>
    <div class="tags box-block2">
      <div style="display: inline-block" v-for="tag in tags">
        <a class="tag" :class="tag.colorClass" @click="showTag(tag)">{{ tag.name }}</a>
        <input type="hidden" v-model="tag.id">
      </div>
    </div>


    <el-button-group class="btns-operate2">
      <el-button type="default" size="large" title="编辑" @click="editTag()" v-if="notEdit"><i class="fa fa-pencil"></i></el-button>
      <el-button type="default" size="large" title="退出编辑" @click="editTag()" v-else><i class="fa fa-chevron-left"></i></el-button>

      <el-button type="default" size="large" title="删除" @click="deleteTag()"><i class="fa fa-trash"></i></el-button>
    </el-button-group>

    <div class="box-block2" v-if="notEdit">
      <div class="intro-header" :style="bgImg">
        <el-row>
          <el-col :span="16" :offset="4" class="tag-heading">

            <h1 class="title">{{ tagForm.name }}</h1>
            <span class="subtitle">{{ tagForm.description }}</span>
            <div class="tag-child">
              <span class="author">此标签下有<strong class="tag-child-num">100</strong> 篇博文</span>&nbsp;&nbsp;&nbsp;
            </div>

          </el-col>
        </el-row>
      </div>
    </div>

    <div class="edit-tag" v-else>
      <el-form ref="tagForm" :model="tagForm" :rules="validateForm"  label-width="80px">
        <div class="box-block">
          <span class="block-label">标题信息（<span style="color:#ff4949;">*&nbsp;必填</span>）</span>

          <el-form-item label="标签名" prop="name">
            <el-input
              v-model="tagForm.name"
              class="inline-input"
              size="large"
              placeholder="请输入标签名">
            </el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input
              v-model="tagForm.description"
              class="inline-input"
              size="large"
              placeholder="请输入描述">
            </el-input>
          </el-form-item>
          <input type="hidden" v-model="tagForm.jumbotron">
        </div>

        <div class="box-block">
          <span class="block-label">上传文章巨幕图（<span style="color:#ff4949;">必选</span>）</span>
          <div class="jumbotronImg" :style="jumbotronImg" v-if="hasJumbotron" @mouseover="jbShow($event)" @mouseout="jbHide($event)">
            <div id="jb-delete" style="display: none" @click="deleteJumbotron(tagForm.jumbotron)">
              <i class="fa fa-trash"></i>
            </div>
          </div>

          <el-upload v-else
                     action="http://localhost:8080/admin/upload/jumbotronImage"
                     type="drag"
                     :data="uploadData"
                     :multiple="false"
                     :thumbnail-mode="true"
                     :on-preview="handlePreview"
                     :on-success="handleSuccess"
                     :on-error="handleError"
                     :on-remove="handleRemove">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10MB，分辨率建议为1920*1080</div>
          </el-upload>
        </div>

        <div class="btns-operate">
          <el-button size="large" @click="update">
            <i class="fa fa-save">&nbsp;</i>保存
          </el-button>
        </div>

      </el-form>
    </div>

  </div>
</template>
<script>
  import {request} from './../../request'
  var originalJumbotron;

  export default{
    name: 'Tags',
    data(){
      return {
        uploadData: {'data':'tag'},
        notEdit: true,
        bgImg:{
          backgroundImage: 'url('+require('./../../assets/img/post.jpg')+')'
        },
        tags: [],
        tagForm: {
          name: '',
          description: '',
          jumbotron: ''
        },
        validateForm:{
          name:[
            {required:true, message:'标签名不能为空！', trigger: 'blur'},
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          description:[
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    computed:{
      hasJumbotron(){
        var jumbotron = this.tagForm.jumbotron;
        if (jumbotron != null && "" != jumbotron){
          return true
        } else {
          return false
        }
      }
    },
    mounted(){
      request.tag.tags().then(res => {
        if(200 == res.code){

          //初始化初始数据
          this.tags = setColorClass(res.rows)
          originalJumbotron = res.rows[0].jumbotron

          this.tagForm = res.rows[0]

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

        this.jumbotronImg = {
          backgroundImage: 'url('+tag.jumbotron+')'
        }
        this.tagForm = tag
        originalJumbotron = tag.jumbotron
      },
      editTag(){
        if(this.notEdit){
          this.notEdit = false
        }else {
          this.notEdit = true
        }

        this.tagForm.jumbotron = originalJumbotron

        this.jumbotronImg = {
          backgroundImage: 'url('+this.tagForm.jumbotron+')'
        }

      },
      deleteTag(){
        this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //往后台发送删除请求


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteJumbotron(url){

        console.log('old:'+originalJumbotron)
        console.log('new:'+url)
        if (originalJumbotron == this.tagForm.jumbotron){
          this.$message({
            message: '未保存之前，此巨幕图不会删除',
            type: 'info'
          });
        }else{
          this.$message({
            message: '巨幕图删除成功',
            type: 'success'
          });
          //如果不是原始巨幕图url，就到服务器删除资源
          request.image.delete({url: url}).then(res=> {
            if (200 == res.code) {
              this.tagForm.jumbotron = ''
              this.$message({
                message: '巨幕图删除成功',
                type: 'success'
              });
            }
          })
        }

        this.tagForm.jumbotron = ''

      },
      jbShow(e){
        $('#jb-delete').css('display','inline-block')
      },
      jbHide(e){
        $('#jb-delete').css('display','none')
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);

        request.image.delete({url: this.tagForm.jumbotron}).then(res=>{
          if(200 == res.code){
            this.tagForm.jumbotron = ''
            this.$message({
              message: '巨幕图删除成功',
              type: 'success'
            });
          }
        })

      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(response, file, fileList){
        console.log(response.code)

        //巨幕图url设置
        this.tagForm.jumbotron = response.url
        this.jumbotronImg = {
          backgroundImage: 'url('+response.url+')'
        }
        this.$message({
          message: '巨幕图上传成功',
          type: 'success'
        });
      },
      handleError(err, response, file){
        this.$message.error('巨幕图上传失败');
      },
      update(){
        if (checkEmpty(this)){
          let params = {
            id: this.tagForm.id,
            name: this.tagForm.name,
            description: this.tagForm.description,
            jumbotron: this.tagForm.jumbotron
          }

          request.tag.update(params).then(res=>{
            if (200 == res.code){
              this.$message({
                message: res.message,
                type: 'success'
              });

              originalJumbotron = this.tagForm.jumbotron
              this.notEdit = true
              this.bgImg = {
                backgroundImage: 'url('+this.tagForm.jumbotron+')'
              }


            }else if(400 == res.code){
              this.$message.error(res.message);
            }
          })
        }
      }
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

  //检查内容不能为空
  var checkEmpty = _this => {

    _this.$refs.tagForm.validate((valid)=>{
      if(!valid){
        _this.$message.error('标题不能为空');
        return false
      }else if('' == _this.tagForm.jumbotron){
        _this.$message.error('巨幕图不能为空');
        return false
      }
    })

    return true
  }
</script>
<style scoped>
  @import "./../../assets/css/form.css";

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

  .box-block2{
    padding:10px;
    margin-top:10px;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    /*padding: 0 24px 24px 24px;*/

  }
  .box-block2:hover {
    border: 1px solid #d3dce6;
    box-shadow:0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04)
  }

  .btns-operate2{
    float: left;
    position: fixed;
    top: 202px;
    right: 48px;
    z-index: 2;

    /*设置透明度*/
    filter:alpha(opacity=50);
    -moz-opacity:0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
  }
  .btns-operate2:hover{
    filter:alpha(opacity=100);
    -moz-opacity:1.0;
    -khtml-opacity: 1.0;
    opacity: 1.0;
  }
</style>

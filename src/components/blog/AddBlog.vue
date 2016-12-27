<template>
  <el-form ref="blogForm" :model="blogForm" :rules="validateForm"  label-width="80px">
    <div class="title-group box-block">
      <span class="block-label">标题信息（必填）</span>
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="blogForm.title"
          class="inline-input"
          size="large"
          placeholder="请输入标题">
        </el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="subTitle">
        <el-input
          v-model="blogForm.subTitle"
          class="inline-input"
          size="large"
          placeholder="请输入副标题">
        </el-input>
      </el-form-item>
      <input type="hidden" v-model="blogForm.jumbotron">
    </div>

    <div class="box-block">
      <span class="block-label">上传文章巨幕图（可选）</span>
      <el-upload
        action="http://localhost:8080/admin/upload/jumbotronImage"
        type="drag"
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

    <div class="box-block" style="padding: 0">
      <span class="block-label" style="margin-left: 4px">编辑正文（必填）</span>
      <div id="editormd">
        <textarea style="display:none;"></textarea>
      </div>
    </div>

    <el-button-group class="btns-operate">
      <el-button size="large" @click="save"><i class="fa fa-save">&nbsp;</i>保存</el-button>
      <el-button size="large" type="primary" @click="publish"><i class="fa fa-location-arrow">&nbsp;</i>发布</el-button>
    </el-button-group>
  </el-form>
</template>

<script>
  import { request, getUrl } from './../../request'
//  import { getUrl } from './../../request/url'
//  import { Loading } from 'element-ui';

  var editor;

  export default{
    name: 'AddBlog',
    data(){
      return {
        blogForm:{
          title:'',
          subTitle:'',
          jumbotron:''
        },
        validateForm:{
          title:[
            {required:true, message:'标题不能为空！', trigger: 'blur'}
          ],
          subTitle:[
            {required:true, message:'副标题不能为空！', trigger: 'blur'}
          ]
        }
      }
    },
    mounted(){
      //MD编辑器初始化
      editor= editormd("editormd", {
        width   : "100%",
        height  : 600,
        path : "static/editor.md/lib/",
        emoji : true,
        saveHTMLToTextarea : true,
        imageUpload : true,
        imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL : getUrl('postImage'),
        crossDomainUpload : true,
        uploadCallbackURL : "http://localhost:8082/static/upload_callback.html"
      });

    },
    methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.blogForm.jumbotron = ''
        this.$message({
          message: '巨幕图删除成功',
          type: 'success'
        });
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(response, file, fileList){
        console.log(response.code)
        this.blogForm.jumbotron = response.url
        this.$message({
          message: '巨幕图上传成功',
          type: 'success'
        });
      },
      handleError(err, response, file){
        this.$message.error('巨幕图上传失败');
      },
      save(){
        let params = {
          status: 2,
          title: this.blogForm.title,
          subTitle: this.blogForm.subTitle,
          jumbotron: this.blogForm.jumbotron,
          markdownContent: editor.getMarkdown(),
          htmlContent: editor.getHTML()
        }
        saveArticle(this, params)
      },
      publish(){
        let params = {
          status: 1,
          title: this.blogForm.title,
          subTitle: this.blogForm.subTitle,
          jumbotron: this.blogForm.jumbotron,
          markdownContent: editor.getMarkdown(),
          htmlContent: editor.getHTML()
        }
        saveArticle(this, params)
      }
    }
  }

  //保存文章
  var saveArticle = (_this, params) =>{
    if (checkEmpty(_this)){
      var fLoding = _this.$loading({ fullscreen: true })
      var waitTime = 3000;
      var startTime = new Date();

      request.article.save(params).then(res=>{
        //计算通信花费时间
        var endTime = new Date();
        var useTime = endTime.getTime()-startTime.getTime();
        if (useTime<waitTime){
          waitTime = waitTime - useTime;
        }else{
          waitTime = useTime;
        }

        setTimeout(() => {
          fLoding.close()
          if (200 == res.code){
            _this.$message({
              message: res.message,
              type: 'success'
            });
          }else if(400 == res.code){
            _this.$message.error(res.message);
          }

        }, waitTime);
      })
    }
  }

  //检查内容不能为空
  var checkEmpty = _this => {
    var markdown = editor.getMarkdown();
    var html = editor.getHTML();

    if (''==markdown){
      _this.$message.error('markdown内容不能为空');
      return false
    }else if (''== html){
      _this.$message.error('markdown内容不能为空');
      return false
    }else{
      _this.$refs.blogForm.validate((valid)=>{
        if(!valid){
          _this.$message.error('标题信息不能为空');
          return false
        }
      })
    }

    return true
  }
</script>
<style scoped>

  .box-block{
    margin-top:10px;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 0 24px 24px 24px;

  }
  .box-block:hover {
    border: 1px solid #d3dce6;
    box-shadow:0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04)
  }
  .block-label{
    display: inline-block;
    color: #565059;
    margin: 4px 0 14px -20px;
    font-size: 0.8em;
  }

  .btns-operate{
    float: right;
    margin:20px 0 100px 0;
  }
</style>

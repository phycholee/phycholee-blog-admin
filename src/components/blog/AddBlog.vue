<template>
  <el-form ref="blogForm" :model="blogForm" :rules="validateForm"  label-width="80px">
    <div class="title-group box-block">
      <span class="block-label">标题信息（<span style="color:#ff4949;">*&nbsp;必填</span>）</span>

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
      <span class="block-label">上传文章巨幕图（<span style="color:#ff4949;">可选</span>）</span>
      <div class="jumbotronImg" :style="jumbotronImg" v-if="hasJumbotron" @mouseover="jbShow($event)" @mouseout="jbHide($event)">
        <div id="jb-delete" style="display: none" @click="deleteJumbotron(blogForm.jumbotron)">
          <i class="fa fa-trash"></i>
        </div>
      </div>

      <el-upload v-else
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
      <span class="block-label" style="margin-left: 4px">编辑正文（<span style="color:#ff4949;">必填</span>）</span>
      <div id="editormd">
        <textarea style="display:none;"></textarea>
      </div>
    </div>

    <div class="btns-operate">
      <el-radio class="radio" v-model="statusRadio" label="1">发布</el-radio>
      <el-radio class="radio" v-model="statusRadio" label="2">保存</el-radio>
      <br><br>

      <el-button size="large" :type="operateType" @click="save">
        <i :class="operateIcon">&nbsp;</i>{{operateBtn}}
      </el-button>
    </div>

  </el-form>
</template>

<script>
  import { request, getUrl } from './../../request'
  var editor;

  export default{
    name: 'AddBlog',
    data(){
      return {
        jumbotronImg: '',
        statusRadio: '1',
        blogForm:{
          title:'',
          subTitle:'',
          jumbotron:''
        },
        validateForm:{
          title:[
            {required:true, message:'标题不能为空！', trigger: 'blur'},
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          subTitle:[
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    computed:{
      hasJumbotron(){
        var jumbotron = this.blogForm.jumbotron;
        if (jumbotron != null && "" != jumbotron){
          return true
        } else {
          return false
        }
      },
      operateBtn(){
        var status = this.statusRadio
        if(1 == status){
          return '发布'
        }else if(2 == status){
          return '保存'
        }
      },
      operateIcon(){
        var status = this.statusRadio
        if(1 == status){
          return 'fa fa-location-arrow'
        }else if(2 == status){
          return 'fa fa-save'
        }
      },
      operateType(){
        var status = this.statusRadio
        if(1 == status){
          return 'primary'
        }else if(2 == status){
          return 'default'
        }
      }
    },
    mounted(){
      //MD编辑器初始化
      initEditor()
    },
    methods:{
      deleteJumbotron(url){

        this.$message({
          message: '巨幕图删除成功',
          type: 'success'
        });
        //如果不是原始巨幕图url，就到服务器删除资源
        request.image.delete({url: url}).then(res=> {
          if (200 == res.code) {
            this.blogForm.jumbotron = ''
            this.$message({
              message: '巨幕图删除成功',
              type: 'success'
            });
          }
        })
      },
      jbShow(e){
        $('#jb-delete').css('display','inline-block')
      },
      jbHide(e){
        $('#jb-delete').css('display','none')
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);

        request.image.delete({url: this.blogForm.jumbotron}).then(res=>{
          if(200 == res.code){
            this.blogForm.jumbotron = ''
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
        this.blogForm.jumbotron = response.url
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
      save(){
        var status = parseInt(this.statusRadio)
        let params = {
          status: status,
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

            if(1 == params.status){
              _this.$router.push('/published')
            }else if(2 == params.status){
              _this.$router.push('/saved')
            }
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
          _this.$message.error('标题不能为空');
          return false
        }
      })
    }

    return true
  }

  var initEditor = () =>{
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
      uploadCallbackURL : "http://localhost:8082/static/upload_callback.html",
      onload : function() {
        this.setMarkdown('');
      }
    });
  }

  $(function () {
    initEditor()
  })
</script>
<style scoped>
  .jumbotronImg{
    background: no-repeat center center;
    background-color: gray;
    background-attachment: scroll;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    -o-background-size: cover;
    margin-bottom: 0;
    height: 430px;
    text-align: center;
  }
  .jumbotronImg:hover{
    filter:alpha(opacity=70);
    -moz-opacity:0.7;
    -khtml-opacity: 0.7;
    opacity: 0.7;
  }
  #jb-delete{
    color: #fff;
    vertical-align: middle;
    margin-top: 210px;
    font-size: 30px;
    cursor: pointer;
  }

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
  .btns-operate button{
    width: 121.461px;
  }
</style>

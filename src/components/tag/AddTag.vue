<template>
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
      <el-button size="large" @click="save">
        <i class="fa fa-save">&nbsp;</i>保存
      </el-button>
    </div>

  </el-form>
</template>
<script>
  import { request, getUrl } from './../../request'

  export default{
    name: 'AddTag',
    data(){
      return {
        uploadData: {'data':'tag'},
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
    methods:{
      deleteJumbotron(url){

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
      save(){
        if (checkEmpty(this)){
          let params = {
            name: this.tagForm.name,
            description: this.tagForm.description,
            jumbotron: this.tagForm.jumbotron
          }

          request.tag.save(params).then(res=>{
            if (200 == res.code){
              this.$message({
                message: res.message,
                type: 'success'
              });

            }else if(400 == res.code){
              this.$message.error(res.message);
            }
          })
        }
      }
    }
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
</style>

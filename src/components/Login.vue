<template>
  <el-form ref="loginForm" :model="loginForm" :rules="validateForm" label-position="left" label-width="0px" class="card-box login-form">
    <h3 class="title">PhychoLee后台登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <!--<el-checkbox v-model="loginForm.checked" checked style="margin:0px 0px 35px 0px;">记住密码</el-checkbox>-->
    <el-form-item>
      <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  import { request, getUrl } from './../request'


  export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        checked: false
      },
      validateForm: {
        username:[
          {required:true, message:'用户名不能为空！', trigger: 'blur'}
        ],
        password:[
          {required:true, message:'密码不能为空！', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid)=>{
        if(valid){

          request.auth.login(this.loginForm).then(res => {
            if(200 == res.code){
              this.$store.dispatch('login', res.data)

              this.$router.replace('/published');
            } else if (400 == res.code){
              this.$message.error(res.msg);
            } else {
              this.$message.error('登录失败！');
            }
          })

        }else{
          return false
        }
      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-box {
    padding: 20px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    background-color: #F9FAFC;
    margin: 120px auto;
    width: 400px;
    border: 2px solid #8492A6;
  }
  .login-form {
    width: 350px;
    padding: 35px 35px 15px 35px;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>

<template>
  <el-row class="panel">
    <el-col :span="24" class="panel-top">
      <el-col :span="20" style="font-size:26px;">
        <img src="../assets/img/avatar.jpg" class="avatar">
        <span class="blog-name">PhychoLee <i style="color:#20a0ff">Blog</i></span>
      </el-col>
      <el-col :span="4">
        <el-tooltip class="item tip-logout" effect="dark" content="退出" placement="bottom" style="padding:0px;">
          <i class="fa fa-sign-out" aria-hidden="true" @click="logout"></i>
        </el-tooltip>
      </el-col>
    </el-col>

    <el-col :span="24" class="panel-center">
      <aside style="width:230px;">
        <!--<h5 class="admin"><i class="fa fa-user" aria-hidden="true" style="margin-right:5px;"></i>欢迎系统管理员：PhychoLee</h5>-->

        <el-menu style="border-top: 1px solid #475669;" default-active="/published" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 @select="handleSelect" theme="dark" unique-opened router>
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title">{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path"  v-if="!child.hidden"><i :class="child.icon">&nbsp;</i>{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.icon"></i>{{item.children[0].name}}</el-menu-item>
          </template>
        </el-menu>
      </aside>

      <section class="panel-c-c">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" style="margin-bottom:15px;">
            <strong style="width:200px;float:left;color: #475669;">{{currentPathName}}</strong>
            <el-breadcrumb separator="/" style="float:right;">
              <el-breadcrumb-item :to="{ path: '/published' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="currentPathNameParent!=''">{{currentPathNameParent}}</el-breadcrumb-item>
              <el-breadcrumb-item v-if="currentPathName!=''">{{currentPathName}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" style="background-color:#fff;box-sizing: border-box;">
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>

    </el-col>
  </el-row>
</template>

<script>
  import { request, getUrl } from './../request'

  export default{
    name: 'Home',
    data(){
      return{
        currentPathName: '已发布',
        currentPathNameParent: '博客'
      }
    },
    watch:{
      '$route'(to, from){
        this.currentPathName = to.name
        this.currentPathNameParent = to.matched[0].name
      }
    },
    methods:{
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      handleSelect(key, keyPath) {
      },
      logout(){
        this.$confirm('确认退出吗?','提示').then(()=>{
          request.auth.logout(this.$store.state.token).then(res => {
            if(200 == res.code){
              this.$store.dispatch('logout')
              sessionStorage.removeItem('token');

              this.$router.replace('/login')
            } else{
              this.$message.error('注销失败！');
            }
          })

        }).catch(()=>{

        })
      }
    }
  }
</script>

<style scoped>

  .panel {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .panel-top {
    height: 60px;
    line-height: 60px;
    background: #1F2D3D;
    color: #c0ccda;
  }

  .panel-center {
    background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
  }

  .panel-c-c {
    background: #fff;
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    left: 230px;
    overflow-y: scroll;
    padding: 20px;
  }

  .avatar {
    border-radius: 50%;
    width:50px;
    float: left;
    padding:0;
    margin:8px 10px 0 8px
  }
  .blog-name{
    text-align: center;
    vertical-align: middle;
  }

  .tip-logout {
    float: right;
    margin-right: 20px;
    padding-top: 5px;
  }

  .tip-logout i {
    cursor: pointer;
  }

  .admin {
    color: #c0ccda;
    text-align: center;
  }
</style>

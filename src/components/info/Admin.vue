<template>
  <div>
    <el-row v-if="!isEdit">
      <el-col :span="5">
        <el-card :body-style="{ padding: '0px'}">
          <img src="./../../assets/img/avatar.jpg" class="image">
          <div class="admin-info" style="padding: 14px;">
            <span class="nickname name-block">PhychoLee</span>
            <span class="username">llf</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-tabs type="border-card">
      <el-tab-pane label="基本信息" name="first">
        <el-row>
          <el-col :span="14">
            <div class="title-group box-block">
              <el-form label-position="top"
                       ref="adminForm"
                       :model="adminForm"
                       :rules="validateForm"
                       label-width="80px">
                <el-form-item label="昵称" prop="nickname">
                  <el-input
                    v-model="adminForm.nickname"
                    class="inline-input">
                  </el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input
                    v-model="adminForm.email"
                    class="inline-input">
                  </el-input>
                </el-form-item>
                <el-form-item label="GitHub" prop="github">
                  <el-input
                    v-model="adminForm.github"
                    class="inline-input">
                  </el-input>
                </el-form-item>
                <el-form-item label="GitHub" prop="github">
                  <el-input
                    v-model="adminForm.github"
                    class="inline-input">
                  </el-input>
                </el-form-item>
                <el-form-item label="个人介绍">
                  <el-input
                    type="textarea"
                    v-model="adminForm.cv"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="7" :offset="2">
            <div class="title-group box-block">
              <img class="avatar" :src="avatarImg">
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="密码修改" name="second">密码修改</el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
  export default{
    name: 'Admin',
    data(){
      return {
        adminForm: {
          nickname: '',
          email: '',
          github: '',
          cv: ''
        },
        validateForm:{

        },
        isEdit: true,
        avatarImg: require('./../../assets/img/avatar.jpg'),
      }
    },
  }
</script>

<style scoped>
  .image {
    width: 100%;
    display: block;
    cursor: pointer;
  }

  .admin-info .name-block{
    display: block !important;
  }
  .admin-info .nickname{
    font-size: 24px;
    line-height: 30px;
  }
  .admin-info .username{
    font-size: 18px;
    font-style: normal;
    font-weight: 300;
    line-height: 24px;
    color: #666;
  }

  .box-block{
    margin-top:10px;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px 24px 24px 24px;

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

  .avatar{
    width: 100%;
    display: inline-block;
    overflow: hidden;
    line-height: 1;
    vertical-align: middle;
    border-radius: 6px;
  }
</style>

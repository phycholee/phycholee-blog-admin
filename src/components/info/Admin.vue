<template>
  <el-row>
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
</template>

<script>
  export default{
    name: 'Admin',

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

</style>

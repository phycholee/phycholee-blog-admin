<template>
  <div id="app">
    <transition name="bounce">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
  body {
    margin: 0px;
    padding: 0px;
    background: #1F2D3D;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .editormd-preview-close-btn{
    display: none !important;
  }

  .el-draggeer__cover__btns span:nth-child(1){
    display:none;
  }
  .el-draggeer__cover__btns span:nth-child(2){
    display:none;
  }
</style>

<template>
  <el-dialog :visible.sync="dialogFormVisible" class="register" width="600px" :show-close="false">
    <div slot="title" class="title">用户注册</div>
  </el-dialog>
</template>

<script>
// import login from 'login';
export default {
  data() {
    return {
      dialogFormVisible: false
    };
  }
};
</script>

<style lang="less" scoped>
.register {
  .title {
    height: 53px;
    background-color: #0fa0fc;
    line-height: 53px;
    color: #000;
    text-align: center;
  }
//   .el-dialog__header {
//     padding: 0;
//   }
}
</style>
<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
}
</style>
<template>
  <el-dialog :visible.sync="dialogFormVisible" class="register" width="600px" :show-close="false">
    <div slot="title" class="title">用户注册</div>
    <el-form :model="form" label-width="100px" ref="form" :rules="rules">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
     
    </el-form>
     <div slot="footer" class="center">
          <el-button>取消</el-button>
          <el-button type="primary" @click="submitClick">确定</el-button>
      </div>
  </el-dialog>
</template>

<script>
// import login from 'login';
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        avatar: ""
      },
      rules:{
          avatar:[{required:true,message: '请上传头像', trigger: 'change'}]
      },
      baseUrl: process.env.VUE_APP_URL,
      imageUrl: ""
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res) {
      this.imageUrl = this.baseUrl + "/" + res.data.file_path;
      this.form.avatar = res.data.file_path;
      this.$refs.form.validateField('avatar')
    },
    submitClick(){
        this.$refs.form.validate(result=>{
            console.log(result);
        })
    }
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
  .center{
      text-align: center;
  }
}
</style>
<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
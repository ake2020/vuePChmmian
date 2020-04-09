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

      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" :show-password="true"></el-input>
      </el-form-item>

      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="code" :src="codeUrl" @click="changeCode" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button @click="getRecode" :disabled="totalTime!=60">
              获取验证码
              <span v-if="totalTime!=60">{{totalTime}}</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="center">
      <el-button @click="dialogFormVisible=false">取消</el-button>
      <el-button type="primary" @click="submitClick">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {getPhoneCode,register} from "@/api/register.js";
// import axios from 'axios';
// import login from 'login';
export default {
  data() {
    return {
      totalTime: 60,
      dialogFormVisible: false,
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      form: {
        avatar: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        rcode: ""
      },
      rules: {
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
        username: [
          { required: true, message: "请输入昵称", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入邮箱地址");
              }
            }
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机号");
              }
            }
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "请正确输入验证码", trigger: "change" }
        ],
        rcode: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "请正确输入验证码", trigger: "change" }
        ]
      },
      baseUrl: process.env.VUE_APP_URL,
      imageUrl: ""
    };
  },
  watch: {
    dialogFormVisible(nVal){
      if (nVal==false) {
        this.$refs.form.resetFields();
        this.imageUrl = '';
      }
    }
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
      this.$refs.form.validateField("avatar");
    },
    submitClick() {
      this.$refs.form.validate(result => {
        console.log(result);
        if (result) {
          register(this.form).then(res=>{
            if (res.data.code ==200) {
              this.$message.success('注册成功');
              this.dialogFormVisible = false;
            }
          })
        }
      });
    },
    changeCode() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    getRecode() {
      let _pass = true;
      this.$refs.form.validateField(["code", "phone"], error => {
        if (error != "") {
          _pass = false;
        }
      });
      if (_pass === false) {
        return;
      } else {
        // 请求前的定时器
        this.totalTime--;
        let _interval = setInterval(() => {
          this.totalTime--;
          if (this.totalTime <= 0) {
            clearInterval(_interval);
            this.totalTime = 60;
          }
        },1000);
        getPhoneCode({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          this.$message.success(res.data.captcha + "");
          console.log(res);
        });
      }
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
  .center {
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
  .code {
    width: 100px;
    height: 40px;
    border: 1px solid #ccc;
  }
}
</style>
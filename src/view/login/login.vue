<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/login_logo.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleName2">用户登录</span>
        <!-- <el-input class="text" placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="input" :disabled="false"></el-input>
        <el-input class="passw" placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="password" :show-password="true"></el-input> -->
        <!-- 验证框 -->
        <div class="verify">
          <!-- 表单 -->
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item prop="phone">
              <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" prefix-icon="el-icon-lock" placeholder="请输入密码" :show-password="true"></el-input>
            </el-form-item>
            <!-- 验证码区 -->
            <el-form-item  prop="code"> 
              <el-row>
                <el-col :span="16">
                  <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
                </el-col>
                <el-col :span="8">
                  <img src="@/assets/img/key.jpg" alt="" class="key">
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 默认条款 复选框使用 -->
            <el-form-item>
              <el-checkbox v-model="form.isCheck">我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link type="primary">用户协议</el-link></el-checkbox>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
              <el-button class="btn" type="primary" :plain="true" @click="loginClick">登录</el-button>
              <br>
              <el-button class="btn" type="primary" @click="registerClick">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
        
      </div>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
    <div>
      <!-- 将组件已标签的形式定义到html中 -->
      <register ref="register"></register>
    </div>
  </div>
</template>

<script>
// 导入子组件
import register from './register.vue'; 
export default {
  name: "login",
  // 注册子组件
  components:{
    register
  },
  data() {
    return {
      form:{
          phone:'',
          password:'',
          code:'',
          isCheck:''
      },
      rules:{
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '请输入6到12位密码', trigger: 'blur' }
          ],
          code:[
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '请输入正确的验证码', trigger: 'blur' }
          ]
      }
    };
  },
  methods: {
    loginClick(){
      // this.$refs.form.validate 全局表单验证
      this.$refs.form.validate(result=> {
          this.$message.success(result + '')
       }
      )
    },
    registerClick(){
      this.$refs.register.dialogFormVisible=true
    }
  },
};
</script>

<style lang="less">
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  // width: 1400px;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;
      .title{
        .titleName {
        width: 94px;
        height: 22px;
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 15px;
        margin-right: 15px;
      }
        .titleLine {
          color: #000;
          font-size: 24px;
        }
        .titleName2 {
          font-size: 22px;
          margin-left: 15px;
        }
        .verify{
          margin-top: 20px;
          .key{
            width: 100%;
            height: 40px;
          }
          .btn{
            width: 100%;
          }
          .btn:nth-child(1){
            margin-bottom: 26px;
          }
        }
      }
  }
  
}
</style>
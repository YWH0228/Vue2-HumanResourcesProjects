<template>
  <div class="about">
    <div class="login">
      <!-- 登录页客户端署名 -->
      <div class="login-title">iHRM后台登录系统</div>
      <!-- 登录页表单部分所在，用于登录参数的设置 -->
      <div class="login-from">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <!-- 用户名输入框 -->
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile"
              ><i slot="prefix" class="el-icon-user-solid" style="box-sizing: border-box; padding: 0 5px"></i
            ></el-input>
          </el-form-item>
          <!-- 密码输入框 -->
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" show-password
              ><i slot="prefix" class="el-icon-s-cooperation" style="box-sizing: border-box; padding: 0 5px"></i
            ></el-input>
          </el-form-item>
          <!-- 登录按钮所在，并绑定submitForm事件实现点击登录功能 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm" style="width: 100%">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 底部用户隐私安全提示 -->
      <div class="bootom-content">
        仅用于IT培训教学使用，为保障您的个人安全，请勿向平台录入任何个人敏感信息（如手机号、身份证号等）！
      </div>
    </div>
  </div>
</template>

<script>
//引入封装后的登录api
import { SetCookie } from "../utils/auth"
import { loginApi } from "../api/api"
export default {
  data() {
    return {
      //登录请求所传参数
      ruleForm: {
        mobile: "13800000002",
        password: "888itcast.CN764%..."
      },
      //登录输入框非空表单验证
      rules: {
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    }
  },
  methods: {
    //登录事件封装
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          loginApi(this.ruleForm).then((res) => {
            console.log(res)
            //根据后端返回状态码判断是否登陆成功
            if (res.code == 10000) {
              // 登陆成功后将token存入本地，使用localStorage来将token数据存入本地
              SetCookie(res.data)
              //登陆成功后，调用el-ui的请提示方法，进行轻提示
              this.$message.success(res.data.message)
              //调用Vue所附带的$router Api 进行成功后的网页跳转
              this.$router.push("/index")
            } else {
              //若登录失败，调用el-ui将后端返回的message数据请提示给用户，展示失败原因
              this.$message.error(res.data.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
// 登录页总页面样式
.about {
  width: 100vw;
  height: 100vh;
  background-image: url("../../public/imgs/login.jpg");
  background-size: 100% 100%;
  overflow: hidden;
  // 登录页中心公司署名和登录参数表单以及按钮样式所在
  .login {
    width: 500px;
    height: 450px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    margin: 200px auto;
    // 登录页公司署名样式
    .login-title {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 40px;
      margin-bottom: 20px;
    }
    //登录页表单样式
    .login-from {
      width: 100%;
      box-sizing: border-box;
      padding: 0 50px;
    }
    //登录页登录按钮样式
    .bootom-content {
      width: 100%;
      font-size: 12px;
      color: #fff;
      box-sizing: border-box;
      padding: 0 50px;
    }
  }
}
</style>

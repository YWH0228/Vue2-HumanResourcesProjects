<template>
  <div class="about">
    <div class="login">
      <div class="login-title">iHRM后台登录系统</div>
      <div class="login-from">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile"
              ><i slot="prefix" class="el-icon-user-solid" style="box-sizing: border-box; padding: 0 5px"></i
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" show-password
              ><i slot="prefix" class="el-icon-s-cooperation" style="box-sizing: border-box; padding: 0 5px"></i
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm" style="width: 100%">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="bootom-content">
        仅用于IT培训教学使用，为保障您的个人安全，请勿向平台录入任何个人敏感信息（如手机号、身份证号等）！
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi } from "../api/api"
export default {
  data() {
    return {
      ruleForm: {
        mobile: "13800000002",
        password: "888itcast.CN764%..."
      },
      rules: {
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          loginApi(this.ruleForm).then((res) => {
            console.log(res)
            if (res.data.code == 10000) {
              sessionStorage.setItem("token", res.data.data)
              this.$message.success(res.data.message)
              this.$router.push("/index")
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
.about {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/imgs/login.jpg");
  background-size: 100% 100%;
  overflow: hidden;

  .login {
    width: 500px;
    height: 450px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    margin: 200px auto;

    .login-title {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 40px;
      margin-bottom: 20px;
    }

    .login-from {
      width: 100%;
      box-sizing: border-box;
      padding: 0 50px;
    }

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

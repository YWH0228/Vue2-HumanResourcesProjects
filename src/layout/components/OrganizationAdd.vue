<template>
  <!-- 组织架构页面添加查看编辑弹窗组件页面 -->
  <div>
    <!-- 弹窗 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>
        <!-- 表单 -->
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" :rules="rules">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="部门编码" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
          </el-form-item>
          <el-form-item label="部门负责人" prop="manager">
            <el-input v-model="ruleForm.manager"></el-input>
          </el-form-item>
          <el-form-item label="部门介绍" prop="introduce">
            <el-input v-model="ruleForm.introduce"></el-input>
          </el-form-item>
        </el-form>
      </span>

      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrganization">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入添加部门接口api
import { addOrganizationApi } from "../../api/api"
export default {
  data() {
    return {
      // 弹窗显示隐藏
      dialogVisible: false,

      // 弹窗标题
      title: "",

      // 表单数据
      ruleForm: {
        name: "",
        code: "",
        manager: "",
        introduce: ""
      },

      // 表单验证
      rules: {
        name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入部门编码", trigger: "blur" }],
        manager: [{ required: true, message: "请输入部门负责人", trigger: "blur" }],
        introduce: [{ required: true, message: "请输入部门介绍", trigger: "blur" }]
      },

      // 传递过来的数据
      signs: ""
    }
  },
  methods: {
    // 关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    // 打开弹窗
    submitForm(e) {
      console.log(e, "7777")
      this.dialogVisible = e.flag

      // 判断是否传递过来数据
      // 传递过来数据赋值给ruleForm
      // 没有传递过来数据清空ruleForm
      if (e.id) {
        this.title = "查看部门"
        this.ruleForm = e
      } else {
        this.title = "编辑部门"
        this.ruleForm = {}
        this.signs = e
      }
      console.log(this.signs, "8888")
    },

    // 添加部门
    addOrganization() {
      // console.log(this.ruleForm)

      // 判断是否传递过来数据
      if (this.signs.ids === "") {
        // 没有传递过来数据，添加顶级部门
        addOrganizationApi({ ...this.ruleForm, pid: "", companyId: "1" }).then((res) => {
          console.log(res)
        })
      } else {
        // 传递过来数据，添加子部门
        addOrganizationApi({ ...this.ruleForm, pid: this.signs.ids, companyId: "1" }).then((res) => {
          console.log(res)
        })
      }
      // 关闭弹窗
      this.dialogVisible = false

      // 刷新页面
      this.$emit("updates")
    }
  }
}
</script>

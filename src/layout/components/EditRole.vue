<template>
  <!-- 公司设置添加或编辑弹窗组件页面 -->
  <div>
    <!-- 弹窗 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <span>
        <!-- 表单 -->
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入添加和编辑接口api
import { addRoleApi, editRoleApi } from "@/api/api"
export default {
  data() {
    return {
      // 弹窗显示隐藏
      dialogVisible: false,
      // 表单数据
      form: {
        name: "",
        description: ""
      },
      // 弹窗标题
      title: ""
    }
  },
  methods: {
    // 弹窗关闭前的回调函数
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    // 接收父组件传递的值
    dialogVisibles(e) {
      this.dialogVisible = e.flag

      // 判断是否有id，有id就是编辑，没有就是新增
      if (e.id) {
        this.form = e
        this.title = "编辑角色"
      } else {
        this.form = {}
        this.title = "新增角色"
      }
    },
    addRole() {
      // 判断是否有id，有id就是编辑，没有就是新增
      if (this.form.id) {
        // 调用编辑接口
        editRoleApi(this.form.id, this.form).then((res) => {
          if (res.code == 10000) {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        // 调用新增接口
        addRoleApi(this.form).then((res) => {
          if (res.code == 10000) {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      }

      // 关闭弹窗
      this.dialogVisible = false

      // 重新获取数据
      this.$emit("updateRole")
    }
  }
}
</script>

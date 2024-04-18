<template>
  <!-- 权限页面添加权限弹窗组件 -->
  <div>
    <!-- 功能弹窗 -->
    <el-dialog title="编辑权限" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <span>
        <!-- 权限设置表单 -->
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="权限名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="企业可见">
            <template>
              <span>不可见</span> <el-switch v-model="form.enVisible"> </el-switch> <span>可见</span>
            </template>
          </el-form-item>
          <el-form-item label="菜单顺序">
            <el-input v-model="form.menuOrder"></el-input>
          </el-form-item>
          <el-form-item label="菜单icon">
            <el-input v-model="form.menuIcon"></el-input>
          </el-form-item>
        </el-form>
      </span>

      <!-- 功能弹窗底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addPermission">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 权限添加接口
import { addPermissionPointApi } from "../../api/api"
export default {
  data() {
    return {
      // 弹窗显示隐藏
      dialogVisible: false,

      // 表单数据
      form: {
        name: "",
        code: "",
        description: "",
        enVisible: "1",
        menuIcon: "",
        menuOrder: ""
      }
    }
  },
  methods: {
    // 关闭弹窗前询问是否关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done()
        })
        .catch(() => {})
    },

    // 添加权限
    switchModalBox(e) {
      this.dialogVisible = e.flag

      // 判断是否为编辑还是添加
      if (e.id) {
        this.form = e
        if (e.enVisible == 0) {
          this.form.enVisible = "1"
        } else {
          this.form.enVisible = "0"
        }
      } else {
        this.form = {
          type: 1,
          pid: "0"
        }
      }
    },
    addPermission() {
      // 判断是否为编辑还是添加
      console.log(this.form)
      if (this.form.id) {
        console.log("查看并编辑")
      } else {
        // 判断是否可见数据转换
        if (this.form.enVisible == false) {
          this.form.enVisible = "0"
        } else {
          this.form.enVisible = "1"
        }
        // 调用添加接口进行添加
        addPermissionPointApi(this.form).then((res) => {
          console.log(res)
          if (res.code == 10000) {
            this.$message.success(res.message)
            this.$emit("getPermissionList")
          } else {
            this.$message.error(res.message)
          }
        })
        // 添加完成后表单赋空
        this.form = {}
      }
      // 关闭弹窗
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
// 弹窗顶部样式样式
:deep(.el-dialog__header) {
  background-color: #66b1ff !important;
  span,
  i {
    color: #ffffff;
  }
}

// 弹窗底部按钮样式-居中
:deep(.el-dialog__footer) {
  text-align: center !important;
}
</style>

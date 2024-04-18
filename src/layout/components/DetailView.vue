<template>
  <div></div>
</template>
<script>
// 引入不同页面的删除功能接口
import { deleteRoleApi, deletePermissionPointApi } from "@/api/api"
export default {
  methods: {
    // 组织结构页面子部门的删除功能按钮方法弹窗以及功能的实现
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    // 公司设置页面员工的删除按钮方法弹窗以及功能的实现
    open1(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除角色
          // 删除权限点
          deleteRoleApi(e).then((res) => {
            console.log(res)
          })
          this.$emit("dels")
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    // 权限设置页面员工权限的删除按钮方法弹窗以及功能的实现
    open2(e) {
      console.log(e)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletePermissionPointApi(e, {}).then((res) => {
            console.log(res)
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    }
  }
}
</script>

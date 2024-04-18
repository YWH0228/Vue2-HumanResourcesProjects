<template>
  <!-- 公司设置页面布局以及相关功能 -->
  <div class="CompanySettings">
    <!-- 员工信息与公司信息相关 -->
    <el-tabs v-model="activeName">
      <!-- 员工信息 -->
      <el-tab-pane label="角色管理" name="first">
        <!-- 员工信息相关功能,调用组件 -->
        <CompanyRole></CompanyRole>
      </el-tab-pane>

      <!-- 公司信息 -->
      <el-tab-pane label="公司信息" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 引入员工信息相关功能组件
import CompanyRole from "../../components/CompanySettings-Role.vue"
export default {
  components: {
    // 注册员工信息相关功能组件
    CompanyRole
  },
  data() {
    return {
      // 标签页默认选中
      activeName: "first"
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
// 设置页面样式
.CompanySettings {
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
}
</style>

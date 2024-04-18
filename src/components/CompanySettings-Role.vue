<template>
  <!-- 公司设置页面的员工信息相关组件页面 -->
  <div>
    <!-- 新增角色按钮 -->
    <el-button size="small" type="primary" @click="addrole"><i class="el-icon-plus"></i> 新增角色</el-button>

    <!-- 员工信息表格 -->
    <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column type="index" label="序号" sortable width="100"> </el-table-column>
      <el-table-column prop="name" label="角色名" sortable width="200"> </el-table-column>
      <el-table-column prop="description" label="描述" sortable style="width: 70%"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scped">
          <el-button type="text">分配权限</el-button>
          <el-button type="text" @click="editrole(scped.row)">修改</el-button>
          <el-button type="text" @click="detailrole(scped.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom">
      <!-- 分页功能 -->
      <el-pagination
        @size-change="getRoleList"
        @current-change="getRoleList"
        :current-page.sync="pages.page"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 新增角色弹出框 -->
    <EditRole ref="EditRoles" @updateRole="getRoleList"></EditRole>

    <!-- 角色删除弹出框 -->
    <detail ref="details" @dels="getRoleList"></detail>
  </div>
</template>

<script>
// 引入新增角色组件
import EditRole from "@/layout/components/EditRole.vue"
// 引入角色删除组件
import detail from "@/layout/components/DetailView.vue"
// 引入角色列表接口
import { getRoleListApi } from "@/api/api"
export default {
  name: "CompanySettings-Role",
  // 注册组件
  components: {
    EditRole,
    detail
  },
  data() {
    return {
      // 员工信息表格数据
      tableData: [],

      // 请求参数以及分页功能数据
      pages: {
        page: 1,
        pagesize: 10
      },

      // 总条数
      total: 0
    }
  },
  methods: {
    // 格式化表格
    formatter(row) {
      return row.address
    },

    // 获取员工信息列表
    getRoleList() {
      getRoleListApi(this.pages).then((res) => {
        console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
      })
    },

    // 新增角色功能
    addrole() {
      this.$refs.EditRoles.dialogVisibles({ flag: true })
    },

    // 修改角色工能
    editrole(row) {
      this.$refs.EditRoles.dialogVisibles({ flag: true, ...row })
    },

    // 删除角色功能
    detailrole(e) {
      this.$refs.details.open1(e)
    }
  },
  created() {
    // 获取员工信息列表
    this.getRoleList()
  }
}
</script>

<style lang="scss" scoped>
// 页面样式
.el-table {
  // 表格样式
  margin-top: 10px;
}
</style>

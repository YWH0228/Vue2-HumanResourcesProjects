<template>
  <div class="Permission">
    <div class="top">
      <el-button type="primary" size="small" @click="addPermission"><i class="el-icon-edit"></i> 添加菜单</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="菜单名称" width="180">
        <template slot-scope="scoped">
          <i class="el-icon-folder-opened"></i> <span>{{ scoped.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="权限标识" width="180"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scoped">
          <el-button type="text">添加权限点</el-button>
          <el-button type="text">查看api权限</el-button>
          <el-button type="text" @click="lookPermission(scoped.row)">查看</el-button>
          <el-button type="text" @click="del(scoped.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addModalBox ref="addModalBox" @getPermissionList="getPermissionList"></addModalBox>
    <detail ref="details"></detail>
  </div>
</template>

<script>
import { getPermissionPointListApi } from "@/api/api"
import addModalBox from "@/layout/components/AddPermission.vue"
import detail from "@/layout/components/DetailView.vue"
export default {
  name: "PermissionSettings",
  components: { addModalBox, detail },

  data() {
    return {
      tableData: []
    }
  },
  methods: {
    addPermission() {
      this.$refs.addModalBox.switchModalBox({ flag: true })
    },
    lookPermission(e) {
      console.log(e)
      this.$refs.addModalBox.switchModalBox({ flag: true, ...e })
    },
    getPermissionList() {
      getPermissionPointListApi().then((res) => {
        console.log(res)
        this.tableData = res.data
      })
    },
    del(e) {
      this.$refs.details.open2(e)
    }
  },
  created() {
    this.getPermissionList()
  }
}
</script>

<style lang="scss" scoped>
.Permission {
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 20px;
  .top {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: end;
    align-items: center;
  }
}
</style>

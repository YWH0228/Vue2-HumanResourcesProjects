<template>
  <div class="Organization">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      style="background-color: #fff; padding: 40px 60px; border-radius: 10px; height: 800px"
    >
      <el-tab-pane label="组织结构" name="first" style="padding: 20px 30px">
        <div class="Organization-name" style="border-bottom: 1px solid #ccc">
          <div class="left">
            <i class="el-icon-s-shop"></i>
            <div class="name">{{ companyName }}</div>
          </div>
          <div class="right">
            <div class="constant">负责人</div>
            <el-dropdown>
              <span class="el-dropdown-link" style="color: #000000">
                操作<i class="el-icon-arrow-down el-icon--right" style="color: #000000 !important"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span>添加子部门</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="Organization-list">
          <el-tree
            :data="main"
            :props="{
              children: 'children',
              label: 'name'
            }"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <div class="left">
                <span class="el-icon-s-custom"></span>
                <span>{{ node.label }}</span>
              </div>
              <span>
                <el-button type="text" size="mini" style="color: #000000">
                  {{ data.manager }}
                </el-button>
                <el-button type="text" size="mini">
                  <el-dropdown>
                    <span class="el-dropdown-link" style="color: #000000">
                      操作<i class="el-icon-arrow-down el-icon--right" style="color: #000000 !important"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><span>添加子部门</span></el-dropdown-item>
                      <el-dropdown-item><span>查看部门</span></el-dropdown-item>
                      <el-dropdown-item><span @click="del">删除部门</span></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </el-tab-pane>
    </el-tabs>
    <deltail ref="q"></deltail>
  </div>
</template>

<script>
import deltail from "../../layout/components/DetailView.vue"
import { getOrganizationListApi } from "@/api/api"
export default {
  components: { deltail },
  data() {
    return {
      activeName: "first",
      tableData: [],
      main: [],
      companyName: ""
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    del() {
      this.$refs.q.open()
      console.log(this.$refs.q)
    }
    // open() {
    //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       })
    //     })
    // }
  },
  created() {
    getOrganizationListApi().then((res) => {
      console.log(res)
      this.companyName = res.data.companyName
      this.tableData = res.data.depts.filter((item) => item.pid == "")
      this.tableData.forEach((item) => {
        this.main.push({ ...item, children: res.data.depts.filter((i) => i.pid == item.id) })
      })
      console.log(this.main)
    })
  }
}
</script>

<style lang="scss" scoped>
.OrganizationView {
  width: 100vw;
  background-color: #f0f2f5;
}
.Organization-name {
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-content: center;
  font-size: 15px;
  .left {
    height: 100%;
    display: flex;
    align-items: center;
    i {
      margin-right: 10px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    height: 100%;
    .constant {
      margin-right: 10px;
    }
  }
}
.Organization-list {
  padding: 10px 0 10px 20px;
}
:deep(.custom-tree-node) {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>

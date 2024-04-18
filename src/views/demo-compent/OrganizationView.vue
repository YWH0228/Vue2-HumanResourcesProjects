<template>
  <!-- 组织架构页面 -->
  <div class="Organization">
    <!-- 标签栏 -->
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      style="background-color: #fff; padding: 40px 60px; border-radius: 10px"
    >
      <!-- 组织结构 -->
      <el-tab-pane label="组织结构" name="first" style="padding: 20px 30px">
        <!-- 组织结构头部 -->
        <div class="Organization-name" style="border-bottom: 1px solid #ccc">
          <div class="left">
            <!-- 组织结构头部图标 -->
            <i class="el-icon-s-shop"></i>
            <!-- 组织结构头部名称 -->
            <div class="name">{{ companyName }}</div>
          </div>
          <div class="right">
            <!-- 组织结构负责人-->
            <div class="constant">负责人</div>
            <!-- 相关功能下拉框 -->
            <el-dropdown>
              <!-- 相关功能下拉框文字 -->
              <span class="el-dropdown-link" style="color: #000000">
                操作<i class="el-icon-arrow-down el-icon--right" style="color: #000000 !important"></i>
              </span>
              <!-- 相关功能下拉框内容 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span @click="add('father')">添加部门</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <!-- 组织架构树状接口数据展示 -->
        <div class="Organization-list">
          <el-tree
            :data="main"
            :props="{
              //数据映射
              children: 'children',
              label: 'name'
            }"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
          >
            <!-- 自定义节点 -->
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
                  <!-- 下拉框 -->
                  <el-dropdown>
                    <span class="el-dropdown-link" style="color: #000000">
                      操作<i class="el-icon-arrow-down el-icon--right" style="color: #000000 !important"></i>
                    </span>

                    <!-- 下拉框内容 -->
                    <el-dropdown-menu>
                      <template>
                        <el-dropdown-item
                          ><span
                            style="width: 100%; height: 100%; display: inline-block"
                            @click="add(data.id)"
                            v-if="data.pid == ''"
                            >添加子部门</span
                          ></el-dropdown-item
                        >
                        <el-dropdown-item
                          ><span style="width: 100%; height: 100%; display: inline-block" @click="look(data)"
                            >查看部门</span
                          ></el-dropdown-item
                        >
                        <el-dropdown-item
                          ><span style="width: 100%; height: 100%; display: inline-block" @click="del"
                            >删除部门</span
                          ></el-dropdown-item
                        >
                      </template>
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
    <OrganizationAdd ref="add" @updates="getOrganizationList"></OrganizationAdd>
  </div>
</template>

<script>
// 添加弹窗组件引入
import OrganizationAdd from "../../layout/components/OrganizationAdd.vue"
// 删除弹窗组件引入
import deltail from "../../layout/components/DetailView.vue"
// 组织架构接口引入
import { getOrganizationListApi } from "@/api/api"
export default {
  name: "OrganizationView",
  // 注册组件
  components: { deltail, OrganizationAdd },
  data() {
    return {
      // 标签栏默认选中
      activeName: "first",
      //处理完毕的接口数据
      main: [],
      // 组织架构头部名称
      companyName: ""
    }
  },
  methods: {
    // 标签栏点击事件
    handleClick(tab, event) {
      console.log(tab, event)
    },

    // 删除部门
    del() {
      this.$refs.q.open()
      console.log(this.$refs.q)
    },

    // 添加部门
    add(e) {
      // 判断是否为添加父级部门
      if (e == "father") {
        // 调用添加部门弹窗组件
        // 参数1：打开弹窗
        // 参数2：判断是添加顶级部门还是添加子级部门
        this.$refs.add.submitForm({ flag: true, ids: "" })
      } else {
        this.$refs.add.submitForm({ flag: true, ids: e })
      }
    },

    // 查看部门
    look(row) {
      // 调用添加部门弹窗组件
      // 参数1：打开弹窗
      // 参数2：向弹窗传递所查看部门的数据
      this.$refs.add.submitForm({ flag: true, ...row })
    },
    getOrganizationList() {
      // 调用组织架构接口
      getOrganizationListApi().then((res) => {
        // 组织架构头部名称
        this.companyName = res.data.companyName

        // 处理完毕的接口数据
        this.main = res.data.depts.filter((item) => item.pid == "")
        this.main.forEach((item) => {
          item.children = []
          res.data.depts.forEach((items) => {
            if (item.id == items.pid) {
              item.children.push(items)
            }
          })
        })
      })
    }
  },
  created() {
    this.getOrganizationList()
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

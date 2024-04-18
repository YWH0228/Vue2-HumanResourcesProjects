<template>
  <!-- 此组件样式使用内嵌式，如要修改定定位完毕后进行对应的修改 -->
  <div>
    <!-- 社保页面顶部选择栏 -->
    <div class="choice-one">
      <!-- 部门选择栏 -->
      <span style="margin-right: 20px; font-size: 14px; font-weight: bolder">部门:</span>
      <el-checkbox
        :checked="item.flag"
        v-for="(item, index) in departmentList"
        :key="item.id"
        @change="SearchOne(index)"
        >{{ item.name }}</el-checkbox
      >
    </div>
    <!-- 社保城市选择栏 -->
    <div class="choice-one">
      <span style="margin-right: 20px; font-size: 14px; font-weight: bolder">社保城市:</span
      ><el-checkbox v-model="SocialCity">北京</el-checkbox>
    </div>

    <!-- 公积金城市选择栏 -->
    <div class="choice-one">
      <span style="margin-right: 20px; font-size: 14px; font-weight: bolder">公积金城市:</span
      ><el-checkbox v-model="SocialCity1">北京</el-checkbox>
    </div>
  </div>
</template>

<script>
// 引入公司部门列表接口
import { getOrganizationListApi } from "../../api/api"
export default {
  name: "choiceView", //社保部门选择
  data() {
    return {
      // 公司部门列表
      departmentList: [],
      // 社保城市选中状态
      SocialCity: false,
      // 公积金城市选中状态
      SocialCity1: false,
      // 部门选中列表
      departemntChecks: [],
      // 社保选中列表
      providentFundChecks: [],
      // 公积金选中列表
      socialSecurityChecks: []
    }
  },
  methods: {
    // 部门选择栏并将数据处理完毕后发送给父组件进行搜索
    SearchOne(e) {
      this.departmentList[e].flag = !this.departmentList[e].flag
      this.departmentList.forEach((item) => {
        if (item.flag) {
          // 筛选出所有被选中的部门，调用一次筛选一次
          this.departemntChecks = this.departmentList.filter((item) => item.flag)
        }
      })
      let arr = []

      // 循环遍历出所有被选中的部门id
      this.departemntChecks.forEach((item) => {
        arr.push(item.id)
      })
      console.log(arr)

      // 将部门id发送给父组件
      this.$emit("choiceSearch", arr)
    }
  },
  created() {
    // 调用公司部门列表接口
    getOrganizationListApi().then((res) => {
      // console.log(res)
      this.departmentList = res.data.depts
      // 初始化部门列表选中状态
      this.departmentList.forEach((item) => {
        item.flag = false
      })
      // console.log(this.departmentList)
    })
  }
}
</script>

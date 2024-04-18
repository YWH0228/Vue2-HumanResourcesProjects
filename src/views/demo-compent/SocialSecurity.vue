<template>
  <!-- 社保页面 -->
  <div class="social">
    <div class="social-top">
      <!-- 顶部提示条 -->
      <div class="social-top-one">
        <el-alert
          title="本月：社保在缴 公积金在缴 增员 减员 入职 离职"
          type="info"
          show-icon
          style="color: #000000; background-color: #e6f7ff; border: 1px solid #ade0ff; width: 400px"
        >
        </el-alert>
        <!-- 顶部按钮操作 -->
        <div class="social-top-one-right">
          <el-button type="text" style="color: #666">历史归档</el-button>
          <el-button type="text" style="color: #666; margin-left: 20px">202001月报表</el-button>
        </div>
      </div>

      <!-- 顶部选项框，使用组件 -->
      <div class="social-top-tow">
        <choice class="choices" ref="choices" @choiceSearch="choiceSearch"></choice>
      </div>
    </div>
    <div class="social-buttom">
      <!-- 社保表格展示 -->
      <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
        <el-table-column type="index" label="序号" width="50"> </el-table-column>
        <el-table-column prop="username" label="姓名" sortable width="180"> </el-table-column>
        <el-table-column prop="mobile" label="手机" sortable width="180"> </el-table-column>
        <el-table-column prop="id" label="工号" sortable width="180"> </el-table-column>
        <el-table-column prop="departmentName" label="部门" sortable width="180"> </el-table-column>
        <el-table-column prop="timeOfEntry" label="入职时间" sortable width="180"> </el-table-column>
        <el-table-column prop="leaveTime" label="离职时间" sortable width="180"> </el-table-column>
        <el-table-column prop="providentFundCity" label="社保城市"> </el-table-column>
        <el-table-column prop="participatingInTheCity" label="公积金城市"> </el-table-column>
        <el-table-column prop="socialSecurityBase" label="社保基数"> </el-table-column>
        <el-table-column prop="providentFundBase" label="公积金基数"> </el-table-column>
      </el-table>
      <!-- 底部分页组件 -->
      <el-pagination
        @size-change="getList"
        @current-change="getList"
        :current-page.sync="Pages.page"
        :page-sizes="[10, 15, 20, 25]"
        :page-size.sync="Pages.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 导入搜索选项组件
import choice from "../../layout/components/choiceView.vue"
// 导入获取社保列表接口
import { getSocialSecurityListApi } from "@/api/api"
export default {
  name: "SocialSecurity",
  components: {
    choice
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      // 请求参数
      Pages: {
        // 顶部部门选中数据
        departmentChecks: [],

        // 当前页数
        page: 1,

        // 每页显示条数
        pageSize: 10,

        // 顶部社保城市选中数据
        providentFundChecks: [],

        // 顶部公积金城市选中数据
        socialSecurityChecks: []
      },

      // 社保列表总条数
      total: 0
    }
  },
  methods: {
    getList() {
      // console.log(val)
      // 获取社保列表数据
      getSocialSecurityListApi(this.Pages).then((res) => {
        // console.log(this.Pages.page)
        console.log(res)

        // 获取数据成功后，将数据赋值给tableData
        this.tableData = res.data.rows

        // 获取数据成功后，将总条数赋值给total
        this.total = res.data.total
      })
    },
    Search() {
      // 调用选项组件的方法进行部门数据选择
      this.$refs.choices.Search()
    },
    choiceSearch(e) {
      // 获取选项组件传递的部门id数据
      this.Pages.departmentChecks = e
      this.getList()
    }
  },
  created() {
    // 进入页面调用获取社保列表数据的方法
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
//顶部框的样式设置
.social-top {
  width: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 20px;

  // 顶部框的提示栏与按钮栏样式设置
  .social-top-one {
    width: 100%;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    display: flex;
  }

  // 顶部框的选项栏样式设置
  .social-top-tow {
    width: 100%;

    // 选项栏组件样式设置
    .choices {
      padding: 5px 20px;
    }
  }
}

// 底部表格的样式设置
.social-buttom {
  width: 100%;
  height: 700px;
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 20px;
}
</style>

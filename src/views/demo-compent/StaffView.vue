<template>
  <div class="employees-view">
    <!-- 头部 -->
    <div class="top">
      <el-button size="small" type="primary" @click="outExcel">导出</el-button>
      <el-upload
        ref="uploadRef"
        class="upload-demo"
        action=""
        accept=".jpg , .png"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleUploadChange"
      >
        <el-button icon="upload" type="primary" size="small">导入</el-button>
      </el-upload>
      <el-button size="small" type="primary" icon="el-icon-plus">新增员工</el-button>
    </div>
    <!-- 表格主体 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="username" label="姓名"> </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="180px"> </el-table-column>
      <el-table-column prop="workNumber" label="工号"> </el-table-column>
      <el-table-column prop="enableState" label="聘用形式"> </el-table-column>
      <el-table-column prop="departmentName" label="部门" width="120px"> </el-table-column>
      <el-table-column prop="timeOfEntry" label="入职时间" width="240px">
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.timeOfEntry).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="inServiceStatus" label="是否在职">
        <template slot-scope="scope">
          <span v-if="scope.row.inServiceStatus == 1">在职</span>
          <span v-else>离职</span>
        </template>
      </el-table-column>
      <el-table-column prop="formOfEmployment" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.formOfEmployment == 1">可用</span>
          <span v-else>不可用</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="300px">
        <template>
          <el-button type="text">查看</el-button>
          <el-button type="text">转正</el-button>
          <el-button type="text">调岗</el-button>
          <el-button type="text">离职</el-button>
          <el-button type="text">角色</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getEmployeeApi } from "@/api/api"
import { xlsx, readFile } from "@/utils/xlsx"
import XLSX from "xlsx"
export default {
  data() {
    return {
      tableData: [{}],
      page: {
        page: 1,
        size: 10
      },
      total: 0,
      listHander: {
        id: "序号",
        username: "姓名",
        mobile: "手机号",
        workNumber: "工号",
        departmentName: "部门",
        timeOfEntry: "入职时间"
      },
      arr: ""
    }
  },
  methods: {
    // 获取员工列表
    getList() {
      getEmployeeApi(this.page).then((res) => {
        console.log(res)
        this.tableData = res.data.rows
        this.total = res.data.total
      })
      // this.$http.get(this.$http.adUrl('/sys/user')).then((res) => {
      // 	console.log(res);
      // })
    },
    outExcel() {
      // this.jsonData是要导出的数据内容（表格里的内容），
      // this.listHander对应要导出内容的表头
      // 学生：指向的是excel文件名
      xlsx(this.tableData, this.listHander, "学生")
    },
    async handleUploadChange(file) {
      let dataBinary = await readFile(file.raw)
      let workBook = XLSX.read(dataBinary, { type: "binary", cellDates: true })
      let workSheet = workBook.Sheets[workBook.SheetNames[0]]
      const data = XLSX.utils.sheet_to_json(workSheet)
      this.arr = data
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
.employees-view {
  width: 100%;
  .top {
    height: 60px;
    background-color: #fff;
    padding-right: 20px;
    display: flex;
    justify-content: end;
    align-items: center;
    margin: 10px 0;
    box-shadow: 0 0 10px #ccc;
    .el-button {
      margin: 0 10px;
    }
  }
  .el-table {
    box-shadow: 0 0 10px #ccc;
    border-radius: 5px;
    padding: 10px;
  }
}
</style>

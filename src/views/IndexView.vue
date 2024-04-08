<template>
  <el-container>
    <el-aside
      width="200px"
      style="height: 100vh; background-color: #4677fa; background-image: url(leftImage); background-size: 100% 100%"
    >
      <img src="" alt="" />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      leftImage: require("../assets/imgs/LOGO.png")
    }
  },
  created() {
    console.log(this.leftImage)
  }
}
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <!-- 侧边栏区域 -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#4676fa"
        text-color="#ffffff"
        style="height: calc(100vh - 65px)"
        router
      >
        <!-- 侧边栏顶部logo图片 -->
        <div class="el-logo">
          <img src="../../public/imgs/LOGO.png" alt="" />
        </div>
        <!-- 侧边栏权限的展示，其数据来自public文件的sidebar.js文件 -->
        <!-- 此时侧边栏已实现菜单路由跳转相关页面功能 -->
        <el-menu-item :index="item.path" v-for="item in sidebar" :key="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 主页头部相关内容设置 -->
      <el-header>
        <!-- 主页头部左侧侧边栏收缩开关图标、公司名称以及版本的设置 -->
        <div class="left">
          <!-- 侧边栏收缩开关所在 -->
          <i class="el-icon-s-fold"></i>
          <!-- 公司名称设置 -->
          <div class="title" style="margin-left: 10px">江苏传智播客教育科技股份有限公司</div>
          <!-- 相关版本的设置 -->
          <el-button class="buts" size="small">体验版</el-button>
        </div>
        <!-- 主页头部右侧相关内容设置 -->
        <div class="right">
          <!-- 局部搜索输入框所在，默认为隐藏，采用v-if指令，绑定serchFlag状态码实现dom的显示隐藏 -->
          <el-input v-model="inputSearch" placeholder="请输入内容" v-if="inputFlag"></el-input>
          <!-- 全屏功能按钮所在，功能尚未实现！！！！！！ -->
          <i class="el-icon-search" style="font-size: 24px; margin-right: 10px"></i>
          <!-- 中英文切换功能设置，功能尚未实现！！！！！！ -->
          <i class="el-icon-full-screen" style="font-size: 24px; margin-right: 10px"></i>
          <!-- 换肤功能按钮所在，功能尚未实现！！！！！！ -->
          <i class="iconfont icon-zhongyingqiehuan" style="font-size: 30px; margin-right: 10px"></i>
          <!-- 其他功能选择所在，其中暂有换肤选择但其功能尚未实现 -->
          <!-- 可向其添加新的功能，可拓展 -->
          <el-dropdown>
            <div class="el-dropdown-link topColor" style="margin-right: 10px"><i class="el-icon-arrow-down"></i></div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>换肤</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 管理员以及头像跳转首页和退出登录功能所在，但功能尚未开发实现！！！！！ -->
          <div class="right-userInfo">
            <!-- 管理员头像设置 -->
            <img src="../../public/imgs/touxiang.png" alt="" style="width: 30px; height: 30px" />
            <!-- 管理员名称设置，可由后端提供，此处暂无，因此为静态数据 -->
            <div>管理员</div>
            <el-dropdown>
              <!-- 管理员名称下拉框相关功能设置暂只有跳转首页以及退出登录功能，但功能尚未实现！！！！ -->
              <div class="el-dropdown-link" style="color: #fff"><i class="el-icon-arrow-down"></i></div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div>首页</div></el-dropdown-item>
                <el-dropdown-item><div>退出登录</div></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <!-- 主页跳转子路由页展示位置所在，可展示侧边栏跳转页的内容 -->
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfoApi } from "@/api/api"
export default {
  data() {
    return {
      // 左侧边栏的相关数据
      sidebar: [],
      // 搜索框显示隐藏状态吗
      inputFlag: false,
      // 搜索框双向数据绑定属性值
      inputSearch: ""
    }
  },
  created() {
    //进入主页后请求用户的相关数据
    getUserInfoApi().then((res) => {
      console.log(res)
    })
    //获取左侧边栏的相关数据
    const sidebarList = require("../../public/sidebar ")
    //左侧边栏数据赋值
    this.sidebar = sidebarList.sidebar
  }
}
</script>

<style scoped lang="scss">
// 主页左侧边栏样式设置
.el-aside {
  height: 100vh;
  background: url("../../public/imgs/left.png");
  background-position: 0 80vh;
  background-size: 100% 190px;
  background-color: #4777fa;
  background-repeat: no-repeat;
}
//左侧边栏顶部logo设置
.el-logo {
  text-align: center;
  width: 100%;
  height: 65px;
  line-height: 50px;
  box-sizing: border-box;
  padding: 10px 5px;
  img {
    width: 140px;
    height: 100%;
  }
}
// 主页顶部header样式设置
.el-header {
  width: 100%;
  height: 50px;
  background-color: #4878fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // 深度触发改变版本按钮样式
  :deep(.buts) {
    background-color: #ffffff6c !important;
    color: #fff !important;
    border-radius: 10px;
    margin-left: 10px;
    border: 0;
  }
  //主页顶部左半部分的样式设置
  .left {
    display: flex;
    align-items: center;
    height: 100%;
    color: #fff;
    font-size: 18px;
  }
  //主页顶部右半部分的样式设置
  .right {
    height: 100%;
    display: flex;
    align-items: center;
    color: #fff;
    font-weight: bolder;
    // 其他功能按钮样式设置
    .topColor {
      border: 1px solid #ccc;
      color: #fff;
      background-color: #409eff;
      width: 25px;
      height: 25px;
      text-align: center;
      line-height: 20px;
      border-radius: 5px;
    }
    // 用户头像、名称以及功能样式的设置
    .right-userInfo {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
// 深度触发改变左侧边栏的字体和背景颜色
:deep(.el-menu-vertical-demo) {
  color: #fff !important;
  background-color: #4777fa !important;
}
// 深度触发改变左侧边栏选中项的字体颜色
:deep(.el-menu-item.is-active) {
  background-color: #fff !important;
  color: #4c7cfb !important;
}
</style>

<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <!-- 侧边栏区域 -->
      <div :class="isCollapse ? 'el-logo-active' : 'el-logo'">
        <img src="../../public/imgs/LOGO.png" alt="" />
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#4676fa"
        text-color="#ffffff"
        style="height: calc(100vh - 65px); border: 0"
        :collapse="isCollapse"
        router
      >
        <!-- 侧边栏顶部logo图片 -->
        <!-- 侧边栏权限的展示，其数据来自public文件的sidebar.js文件 -->
        <!-- 此时侧边栏已实现菜单路由跳转相关页面功能 -->
        <el-menu-item :index="item.path" v-for="item in sidebar" :key="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ $t(`route.${item.zh}`) }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 主页头部相关内容设置 -->
      <el-header>
        <!-- 主页头部左侧侧边栏收缩开关图标、公司名称以及版本的设置 -->
        <div class="left">
          <!-- 侧边栏收缩开关所在 -->
          <i class="el-icon-s-fold" @click="isCollapse = !isCollapse"></i>
          <!-- 公司名称设置 -->
          <div class="title" style="margin-left: 10px">{{ $t("test.companyname") }}</div>
          <!-- 相关版本的设置 -->
          <el-button class="buts" size="small">{{ $t("test.version") }}</el-button>
        </div>
        <!-- 主页头部右侧相关内容设置 -->
        <div class="right">
          <!-- 局部搜索输入框所在，默认为隐藏，采用v-if指令，绑定serchFlag状态码实现dom的显示隐藏 -->
          <input
            type="text"
            v-model="inputSearch"
            placeholder="请输入内容"
            style="width: 200px; height: 35px; border-radius: 5px; padding: 5px 10px; border: 0"
            v-if="inputFlag"
            @keydown.enter="inputFlag = !inputFlag"
          />
          <!-- 搜索功能按钮所在，功能尚未实现！！！！！！ -->
          <i
            class="el-icon-search"
            style="font-size: 24px; margin-right: 10px"
            @click="inputFlag = !inputFlag"
            v-else
          ></i>
          <!-- 全屏功能按钮所在 -->
          <svg-icon
            style="font-size: 24px; margin-right: 10px"
            :icon-class="fullScreen ? 'fullscreen-exit' : 'fullscreen'"
            @click="enterFullscreen"
          />
          <!-- 中英文切换功能设置，功能尚未实现！！！！！！ -->
          <el-dropdown trigger="click" @command="changeLanguage">
            <!-- 这里必须加一个div -->
            <div>
              <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <!-- 这块需要注意,两个command需要配合我们实例化i18的时候去使用 -->
              <el-dropdown-item command="zh" :disabled="'zh' === $i18n.locale">中文</el-dropdown-item>
              <el-dropdown-item command="en" :disabled="'en' === $i18n.locale">en</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 换肤功能按钮所在，功能尚未实现！！！！！！ -->
          <theme style="margin: 0 10px"></theme>
          <!-- 主题模式的切换 -->
          <el-button size="mini" @click="toggleTheme">切换主题</el-button>
          <!-- 管理员以及头像跳转首页和退出登录功能所在，但功能尚未开发实现！！！！！ -->
          <div class="right-userInfo">
            <!-- 管理员头像设置 -->
            <img src="../../public/imgs/touxiang.png" alt="" style="width: 30px; height: 30px" />
            <!-- 管理员名称设置，可由后端提供，此处暂无，因此为静态数据 -->
            <div>{{ $t("test.administrators") }}</div>
            <el-dropdown>
              <!-- 管理员名称下拉框相关功能设置暂只有跳转首页以及退出登录功能，但功能尚未实现！！！！ -->
              <div class="el-dropdown-link" style="color: #fff"><i class="el-icon-arrow-down"></i></div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div>首页</div></el-dropdown-item>
                <el-dropdown-item><div @click="loginDown">退出登录</div></el-dropdown-item>
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
import Cookie from "js-cookie"
import theme from "@/components/theme"
import { RemoveCookie } from "../utils/auth"
// import { getPermissionListApi } from "@/api/api"
import screenfull from "screenfull"
export default {
  components: {
    theme
  },
  data() {
    return {
      fullScreen: false,
      // 左侧边栏的相关数据
      sidebar: [],
      // 搜索框显示隐藏状态吗
      inputFlag: false,
      // 搜索框双向数据绑定属性值
      inputSearch: "",
      isCollapse: false,
      color: "#ffffff", // 初始颜色值，
      isfull: false,
      theme: "light" // 初始主题为白天模式
    }
  },
  methods: {
    // 退出登录功能
    loginDown() {
      RemoveCookie()
      // 退出登录后跳转到登录页，使用replace方法，防止用户刷新页面时返回登录页
      this.$router.replace("/login")
      //调用elementui的message方法，实现退出登录成功提示
      this.$message.success("退出登录成功")
    },
    enterFullscreen() {
      //全屏按钮icon的变化
      this.fullScreen = !this.fullScreen
      //全屏功能的实现
      // 判断浏览器是否支持全屏
      if (!screenfull.isEnabled) {
        this.$message.warning("当前浏览器不支持全屏")
        return false
      }
      screenfull.toggle()
    },
    changeLanguage(lang) {
      Cookie.set("language", lang) // 切换多语言
      this.$i18n.locale = lang // 设置给本地的i18n插件
      this.$message.success("切换多语言成功")
    },
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light"
      document.documentElement.setAttribute("data-theme", this.theme)
    }
  },
  created() {
    //获取左侧边栏的相关数据
    const sidebarList = require("../../public/sidebar ")
    //左侧边栏数据赋值
    this.sidebar = sidebarList.sidebar
    this.inputFlag = false
    // getPermissionListApi().then((res) => {
    //   // console.log(res)
    // })
  }
}
</script>

<style scoped lang="scss">
// 主页左侧边栏样式设置
.el-aside {
  height: 100vh;
  background: url("../../public/imgs/left.png");
  background-position: 0 100%;
  background-size: 100% 190px;
  background-color: #4777fa;
  background-repeat: no-repeat;
  border: 0;
  transition: all 0.5s;
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
.el-logo-active {
  text-align: center;
  width: 100%;
  height: 65px;
  line-height: 65px;
  box-sizing: border-box;
  padding: 5px 1px;
  img {
    width: 55px;
    height: 20px;
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
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
  background-color: #4777fa00 !important;
  i {
    color: #fff !important;
  }
}
// 深度触发改变左侧边栏选中项的字体颜色
:deep(.el-menu-item.is-active) {
  background-color: #fff !important;
  color: #4c7cfb !important;
  i {
    color: #4c7cfb !important;
  }
}
.el-main {
  background-color: #edeff2;
  height: calc(100vh - 60px);
}
</style>

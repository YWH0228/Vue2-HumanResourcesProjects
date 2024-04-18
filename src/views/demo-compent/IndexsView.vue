<template>
  <!-- 进入主页后首页布局以及相关功能 -->
  <div>
    <!-- 登陆后员工相关数据 -->
    <div class="userInfo">
      <!-- 员工头像 -->
      <img src="../../../public/imgs/touxiang2.jpg" alt="" />
      <!-- 员工相关信息 -->
      <div class="user-content">
        <!-- 问候语 员工名称 -->
        <div class="top-content">{{ $t("test.greetings") }}</div>
        <!--问候语 员工职位 部门 等-->
        <div class="bottom-content">
          {{ $t("test.administrators") }} | {{ $t("test.logo") }} - {{ $t("test.department") }}
        </div>
      </div>
    </div>
    <!-- 工作以及功能区 -->
    <div class="work-area">
      <!-- 工作区左侧 -->
      <div class="work-area-left">
        <!-- 工作区之工作日历功能 -->
        <div class="Shop-Calendar">
          <!-- 日历标题 -->
          <div class="Calendar-title">{{ $t("test.calendar") }}</div>
          <el-calendar v-model="TimeValue"> </el-calendar>
        </div>

        <!-- 工作区之工作公告功能 -->
        <div class="Work-Announcement">
          <!-- 工作公告标题 -->
          <div class="Announcement-title">{{ $t("test.announcement") }}</div>
          <!-- 工作公告内容、静态数据-->
          <div class="content" style="padding: 0 20px">
            <div class="Announcement-item">
              <img src="../../../public/imgs/touxiang3.jpeg" style="width: 50px; height: 50px" alt="" />
              <div class="Announcement-content">
                <div class="Announcement-content-top">
                  <span>{{ $t("announcement.announcementname") }}</span> {{ $t("announcement.announcementcontent") }}
                </div>
                <div class="Announcement-content-time">2018-07-21 15:21:38</div>
              </div>
            </div>
            <div class="Announcement-item">
              <img src="../../../public/imgs/touxiang3.jpeg" style="width: 50px; height: 50px" alt="" />
              <div class="Announcement-content">
                <div class="Announcement-content-top">
                  <span>{{ $t("announcement.announcementname") }}</span> {{ $t("announcement.announcementcontent") }}
                </div>
                <div class="Announcement-content-time">2018-07-21 15:21:38</div>
              </div>
            </div>
            <div class="Announcement-item">
              <img src="../../../public/imgs/touxiang3.jpeg" style="width: 50px; height: 50px" alt="" />
              <div class="Announcement-content">
                <div class="Announcement-content-top">
                  <span>{{ $t("announcement.announcementname") }}</span> {{ $t("announcement.announcementcontent") }}
                </div>
                <div class="Announcement-content-time">2018-07-21 15:21:38</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 工作区右侧 -->
      <div class="work-area-right">
        <!-- 流程申请功能区-->
        <div class="application">
          <!-- 流程申请标题 -->
          <div class="application-title">
            <span>{{ $t("test.application") }}</span>
          </div>

          <!-- 流程申请按钮 -->
          <div class="application-button" style="overflow-y: auto !important">
            <!-- 加班离职按钮 -->
            <el-button>{{ $t("application.applicationone") }}</el-button>
            <!-- 请假调休按钮 -->
            <el-button>{{ $t("application.applicationtow") }}</el-button>
            <!-- 审批列表按钮 -->
            <el-button>{{ $t("application.applicationthree") }}</el-button>
            <!-- 我的信息按钮 -->
            <el-button>{{ $t("application.applicationfore") }}</el-button>
          </div>
        </div>

        <!-- 导航功能区 -->
        <div class="navigation" style="margin-top: 20px; height: 260px !important">
          <!-- 导航功能标题 -->
          <div class="navigation-title">
            <span>{{ $t("test.navigation") }}</span>
          </div>

          <!-- 导航功能按钮 -->
          <div class="navigation-button">
            <!-- 人事管理按钮 -->
            <el-button>人事月报</el-button>

            <!-- 考勤管理按钮 -->
            <el-button>考勤查询</el-button>

            <!-- 审批管理按钮 -->
            <el-button>审批列表</el-button>

            <!-- 薪资管理按钮 -->
            <el-button>薪资查询</el-button>

            <!-- 员工审核按钮 -->
            <el-button>员工审核</el-button>

            <!-- 组织架构按钮 -->
            <el-button>组织架构</el-button>
          </div>
        </div>

        <!-- 帮助功能区 -->
        <div class="help" style="margin-top: 20px; height: 188px !important">
          <!-- 帮助功能标题 -->
          <div class="help-title">
            <span>{{ $t("test.help") }}</span>
          </div>

          <!-- 帮助功能按钮 -->
          <div class="help-button" style="justify-content: space-around">
            <!-- 入门指南按钮 -->
            <div class="help-item">
              <img src="../../../public/imgs/point.png" alt="" />
              <div class="help-name">入门指南</div>
            </div>

            <!-- 在线帮助手册按钮 -->
            <div class="help-item">
              <img src="../../../public/imgs/manual.png" alt="" />
              <div class="help-name">在线帮助手册</div>
            </div>

            <!-- 联系技术支持按钮 -->
            <div class="help-item">
              <img src="../../../public/imgs/phone.png" alt="" />
              <div class="help-name">联系技术支持</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 员工登录信息接口
// import { getUserInfoApi } from "@/api/api"
export default {
  data() {
    return {
      // 工作日历数据
      TimeValue: new Date()
    }
  },
  created() {
    //进入主页后请求用户的相关数据
    // getUserInfoApi().then((res) => {
    //   console.log(res)
    // })
  }
}
</script>

<style lang="scss" scoped>
// 员工相关数据样式
.userInfo {
  display: flex;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
  box-shadow:
    /* 内层阴影 */ inset 0 0 3px rgba(0, 0, 0, 0.1), /* 外层阴影 */ 0 0 6px rgba(0, 0, 0, 0.3);

  // 员工头像
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  // 员工相关信息
  .user-content {
    margin-left: 20px;
    // 问候语样式 员工名称
    .top-content {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 20px;
    }

    //  员工职位 部门 等
    .bottom-content {
      font-size: 16px;
      color: #666;
    }
  }
}

// 工作以及功能区样式
.work-area {
  width: 100%;
  height: 678.2px;
  margin-top: 20px;
  display: flex;
  // 工作区左侧样式
  .work-area-left {
    width: 60%;
    height: 100%;
    // background-color: aqua;
    border-radius: 5px;
    box-sizing: border-box;
    // 工作日历样式
    .Shop-Calendar {
      width: 100%;
      height: 58.53%;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 0 20px;
      border-radius: 5px;

      // 工作日历标题样式
      .Calendar-title {
        width: 100%;
        height: 40px;
        font-size: 20px;
        line-height: 40px;
      }
    }

    // 工作公告样式
    .Work-Announcement {
      width: 100%;
      height: 38.53%;
      margin-top: 20px;
      background-color: #fff;
      border-radius: 5px;
      padding: 0 10px;

      // 工作公告标题样式
      .Announcement-item {
        width: 100%;
        height: 65px;
        display: flex;
        padding: 7.5px 20px;
        border-bottom: 1px solid #ccc;
        // 公告内容展示
        .Announcement-content {
          margin-left: 20px;
          font-size: 14px;
          // 公告人名称样式
          span {
            color: #8c99f8;
          }

          // 公告内容样式
          .Announcement-content-time {
            margin-top: 5px;
          }
        }
      }
      // 公告功能区标题样式
      .Announcement-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        border-bottom: 1px solid #ccc;
        font-size: 20px;
      }
    }
    // 工作日历表格展示样式
    :deep(.el-calendar-table .el-calendar-day) {
      height: 40px;
      text-align: center;
    }
    // 工作日历表头样式
    :deep(.el-calendar-table_th) {
      height: 40px;
    }
    // 工作日历表头样式
    :deep(.el-calendar__header) {
      height: 40px;
    }
    :deep(.el-calendar__body) {
      height: 317px;
    }
  }
  // 工作区右侧样式
  .work-area-right {
    width: 40%;
    height: 100%;
    margin-left: 20px;
    // background-color: chartreuse;
    border-radius: 5px;

    .application,
    .navigation,
    .help {
      width: 100%;
      height: 190px;
      background-color: #fff;
      border-radius: 5px;
      // 右侧功能区表头样式设计
      .application-title,
      .navigation-title,
      .help-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 5px 10px;
        span {
          border-bottom: 5px solid #8a97f8;
          font-size: 20px;
          padding: 5px 0;
        }
      }
      // 右侧功能区按钮样式设计
      .application-button,
      .navigation-button,
      .help-button {
        width: 100%;
        margin-top: 20px;
        padding: 10px 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .el-button {
          // flex: 1;
          width: 140px;
          height: 40px;
          margin: 10px 0;
          text-align: center !important;
        }
        .help-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 40px !important;
            height: 40px !important;
          }
          .help-name {
            margin-top: 10px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>

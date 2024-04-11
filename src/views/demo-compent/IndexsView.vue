<template>
  <div>
    <div class="userInfo">
      <img src="../../../public/imgs/touxiang2.jpg" alt="" />
      <div class="user-content">
        <div class="top-content">早安，管理员，祝你开心每一天！</div>
        <div class="bottom-content">管理员 | 传智播客-总裁办</div>
      </div>
    </div>
    <div class="work-area">
      <div class="work-area-left">
        <div class="Shop-Calendar">
          <div class="Calendar-title">工作日历</div>
          <el-calendar v-model="TimeValue"> </el-calendar>
        </div>
        <div class="Work-Announcement">
          <div class="Announcement-title">公告</div>
          <div class="content" style="padding: 0 20px">
            <div class="Announcement-item">
              <img src="../../../public/imgs/touxiang3.jpeg" style="width: 50px; height: 50px" alt="" />
              <div class="Announcement-content">
                <div class="Announcement-content-top">
                  <span>朱继柳</span> 发布了第一期“传智大讲堂”互动讨论获奖名单公布
                </div>
                <div class="Announcement-content-time">2018-07-21 15:21:38</div>
              </div>
            </div>
            <div class="Announcement-item">
              <img src="../../../public/imgs/touxiang3.jpeg" style="width: 50px; height: 50px" alt="" />
              <div class="Announcement-content">
                <div class="Announcement-content-top">
                  <span>朱继柳</span> 发布了第一期“传智大讲堂”互动讨论获奖名单公布
                </div>
                <div class="Announcement-content-time">2018-07-21 15:21:38</div>
              </div>
            </div>
            <div class="Announcement-item">
              <img src="../../../public/imgs/touxiang3.jpeg" style="width: 50px; height: 50px" alt="" />
              <div class="Announcement-content">
                <div class="Announcement-content-top">
                  <span>朱继柳</span> 发布了第一期“传智大讲堂”互动讨论获奖名单公布
                </div>
                <div class="Announcement-content-time">2018-07-21 15:21:38</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="work-area-right">
        <div class="application">
          <div class="application-title"><span>流程申请</span></div>
          <div class="application-button">
            <el-button>加班离职</el-button>
            <el-button>请假调休</el-button>
            <el-button>审批列表</el-button>
            <el-button>我的信息</el-button>
          </div>
        </div>
        <div class="navigation" style="margin-top: 20px; height: 260px !important">
          <div class="navigation-title"><span>快速开始/便捷导航</span></div>
          <div class="navigation-button">
            <el-button>人事月报</el-button>
            <el-button>考勤查询</el-button>
            <el-button>考勤统计</el-button>
            <el-button>员工审核</el-button>
            <el-button>组织架构</el-button>
          </div>
        </div>
        <div class="help" style="margin-top: 20px; height: 188px !important">
          <div class="help-title"><span>帮助链接</span></div>
          <div class="help-button">
            <div class="help-item">
              <img src="../../../public/imgs/point.png" alt="" />
              <div class="help-name">入门指南</div>
            </div>
            <div class="help-item">
              <img src="../../../public/imgs/manual.png" alt="" />
              <div class="help-name">在线帮助手册</div>
            </div>
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
import { getUserInfoApi } from "@/api/api"
export default {
  data() {
    return {
      TimeValue: new Date()
    }
  },
  created() {
    //进入主页后请求用户的相关数据
    getUserInfoApi().then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
.userInfo {
  display: flex;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
  box-shadow:
    /* 内层阴影 */ inset 0 0 3px rgba(0, 0, 0, 0.1), /* 外层阴影 */ 0 0 6px rgba(0, 0, 0, 0.3);
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .user-content {
    margin-left: 20px;
    .top-content {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .bottom-content {
      font-size: 16px;
      color: #666;
    }
  }
}
.work-area {
  width: 100%;
  height: 678.2px;
  margin-top: 20px;
  display: flex;
  .work-area-left {
    width: 60%;
    height: 100%;
    // background-color: aqua;
    border-radius: 5px;
    box-sizing: border-box;
    .Shop-Calendar {
      width: 100%;
      height: 58.53%;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 0 20px;
      border-radius: 5px;
      .Calendar-title {
        width: 100%;
        height: 40px;
        font-size: 20px;
        line-height: 40px;
      }
    }
    .Work-Announcement {
      width: 100%;
      height: 38.53%;
      margin-top: 20px;
      background-color: #fff;
      border-radius: 5px;
      padding: 0 10px;
      .Announcement-item {
        width: 100%;
        height: 65px;
        display: flex;
        padding: 7.5px 20px;
        border-bottom: 1px solid #ccc;
        .Announcement-content {
          margin-left: 20px;
          font-size: 14px;
          span {
            color: #8c99f8;
          }
          .Announcement-content-time {
            margin-top: 5px;
          }
        }
      }
      .Announcement-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        border-bottom: 1px solid #ccc;
        font-size: 20px;
      }
    }
    :deep(.el-calendar-table .el-calendar-day) {
      height: 40px;
      text-align: center;
    }
    :deep(.el-calendar-table_th) {
      height: 40px;
    }
    :deep(.el-calendar__header) {
      height: 40px;
      :nth-child(6) {
        color: #ff6600 !important;
      }
    }
    :deep(.el-calendar__body) {
      height: 317px;
    }
  }
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

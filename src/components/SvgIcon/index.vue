<template>
  <!-- Svg图标引入相关组件 -->
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from "@/utils/validate"

export default {
  // 组件名称
  name: "SvgIcon",
  props: {
    // 传入的图标名称
    iconClass: {
      type: String,
      required: true
    },
    // 传入的图标样式
    className: {
      type: String,
      default: ""
    }
  },
  // 计算属性
  computed: {
    // 判断是否为外部链接
    isExternal() {
      return isExternal(this.iconClass)
    },
    // 拼接图标名称
    iconName() {
      return `#icon-${this.iconClass}`
    },
    // 拼接图标样式
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className
      } else {
        return "svg-icon"
      }
    },
    // 判断是否为外部链接
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>

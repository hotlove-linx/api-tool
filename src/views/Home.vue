<template>
  <div class="home">
    <!-- 页面头部 -->
    <div class="home-header">
      <span class="header-logo">
<!--        <span>Fun</span>-->
        <img src="../assets/e-do-blue.png"></img>
      </span>
      <span class="header-oper">
        <el-avatar class="header-avatar" :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
        <span class="header-min iconfont icon-line"></span>
        <span class="header-close iconfont icon-close"></span>
      </span>
    </div>

    <!-- 导航 -->
    <div class="home-navi">
      <div class="navi-item" :class="clickType == 'api' ? 'navi-click' : ''" @click="clickItem('api')">
        <span class="iconfont icon-api"></span>
        <span>api</span>
      </div>
      <div class="navi-item" :class="clickType == 'tool' ? 'navi-click': ''" @click="clickItem('tool')">
        <span class="iconfont icon-gongju"></span>
        <span>tool</span>
      </div>
    </div>
    <!-- 右侧内容 -->
    <div class="home-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {useRouter} from "vue-router";

// 路由
const router = useRouter();

const clickType = ref<string>("api")

onMounted(() => {
  clickItem(clickType.value)
})

const clickItem = (type: string) => {
  clickType.value = type
  router.push({name: type})
}
</script>
<style lang="scss">
.home {
  position: relative;
  height: 100vh;
  width: 100%;

  /* 头部 */
  .home-header {
    display: flex;
    background: #f9f9f9;
    width: 100%;
    -webkit-app-region: drag;
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #ebebeb;
    span {
      display: inline-block;
    }

    .header-logo {
      display: flex;
      align-items: center;
      width: 20%;
      text-align: left;
      font-size: 20px;
      padding-left: 20px;
      height: 48px;
      line-height: 62px;

      img {
        display: inline-block;
        width: 30px;
        height: 30px;
      }
    }
    .header-oper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 78%;
      text-align: right;
      .header-avatar {
        margin-right: 20px;
        // box-shadow: var(--el-box-shadow-light);
        border: 1px solid #b7b7b7;
      }
      .header-min {
        cursor: pointer;
        margin-right: 5px;
        -webkit-app-region: none;
        width: 30px;
        height: 30px;
        display: inline-block;
        text-align: center;
        line-height: 30px;
      }
      .header-min:hover {
        background: #bebebe;
      }

      .header-close {
        cursor: pointer;
        -webkit-app-region: none;
        width: 30px;
        height: 30px;
        display: inline-block;
        text-align: center;
        line-height: 30px;
      }
      .header-close:hover {
        background: #e53b3b;
        color: white;
      }


    }
  }

  .home-navi {
    background: #f9f9f9;
    display: inline-block;
    height: calc(100vh - 48px);
    width: 70px;
    text-align: center;
    padding: 5px;
    border-right: 1px solid #ebebeb;
    .navi-item {
      cursor: pointer;
      margin: 10px 0;
      padding: 10px 0;
    }
    .navi-item > span:first-child {
      font-size: 25px;
    }
    .navi-item > span {
      display: block;
    }
    .navi-item:hover {
      background: rgba(232, 232, 232, 0.7);
      border-radius: 3px;
    }
    .navi-click {
      background: rgba(220,220,220, 0.7);
      border-radius: 3px;
    }
  }

  .home-content {
    float: right;
    display: inline-block;
    width: calc(100% - 81px);
    height: calc(100vh - 55px);
  }

}
</style>
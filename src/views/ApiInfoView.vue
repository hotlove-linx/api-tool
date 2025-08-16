<template>
  <div class="api-info-view">
    <!-- 标题 -->
    <div class="api-info-header">
      <span>MyCollection/获取用户名</span>
    </div>

    <!-- 输入框 -->
    <div class="api-info-content">
      <el-input
          v-model="sendUrl"
          size="large"
          style="width: 85%; margin-right: 10px"
          placeholder="Enter URL to Send"
          class="input-with-select">
        <template #prepend>
          <el-select v-model="methodType" size="large" placeholder="Select" style="width: 115px;">
            <el-option label="GET" value="1">
              <span class="GET">GET</span>
            </el-option>
            <el-option label="POST" value="2" />
            <el-option label="PUT" value="3" />
            <el-option label="DELETE" value="3" />
          </el-select>
        </template>
      </el-input>

      <el-dropdown split-button type="primary" size="large">
        Send
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Send And Download</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 参数列表及结果 -->
    <div class="api-info-result">
      <el-splitter layout="vertical">
        <el-splitter-panel :min="100">
          <div class="demo-panel">1</div>
        </el-splitter-panel>
        <el-splitter-panel :min="100">
          <div class="demo-panel">2</div>
        </el-splitter-panel>
      </el-splitter>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const methodType = ref<string>('GET')
const sendUrl = ref<string>();

</script>

<style scoped lang="scss">
.api-info-view {
  position: relative;
  display: inline-block;
  width: 100%;
  height: calc(100vh - 50px);
  padding: 5px 10px;

  .api-info-header {
    margin-bottom: 18px;
  }

  .api-info-content {
    ::v-deep(.el-input-group__prepend) {
      background-color: transparent !important;
    }
    .POST {
      color: #E6A23C;
    }
    .GET {
      color: #67C23A;
    }
    .DEL {
      color: #F56C6C;
    }
    .PUT {
      color: #409EFF;
    }
  }

  .api-info-result {
    padding: 10px;
    display: inline-block;
    width: calc(100% - 32px);
    background-color: #F56C6C;
    height: calc(100vh - 163px);
    .demo-panel {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
    }
  }
}

</style>
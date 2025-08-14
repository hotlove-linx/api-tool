<template>
  <div class="api-info-view">
    <!-- 标题 -->
    <div>
      <span>MyCollection/获取用户名</span>
    </div>

    <!-- 输入框 -->
    <div>
      <el-input
          v-model="sendUrl"
          style="max-width: 600px"
          placeholder="Please input"
          class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="methodType" placeholder="Select" style="width: 115px">
            <el-option label="Restaurant" value="1" />
            <el-option label="Order No." value="2" />
            <el-option label="Tel" value="3" />
          </el-select>
        </template>
      </el-input>
    </div>

    <!-- 参数列表及结果 -->
    <div></div>
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
}
</style>
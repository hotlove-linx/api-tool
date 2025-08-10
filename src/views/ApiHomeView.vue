<template>
  <div class="api-home">
    <el-row>
      <!-- 导航 -->
      <el-col :span="7">
        <div class="api-navi">
          <div class="api-navi-header">
            <span class="api-header-add iconfont icon-jia"></span>
            <span class="api-header-search">
              <el-input
                  v-model="searchCollectionName"
                  style="max-width: 250px"
                  placeholder="Search Collections"
                  :prefix-icon="Search"
              />
            </span>
          </div>
          <div class="api-navi-content">
            <el-tree
                style="max-width: 600px"
                :data="dataSource"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false">
              <template #default="{ node, data }">
                <el-icon class="el-icon--left">
                  <Document v-if="node.isLeaf" />
                  <Folder v-else-if="!node.expanded" />
                  <FolderOpened v-else />
                </el-icon>
                <div class="custom-tree-node">
                  <span>{{ node.label }}</span>
                  <span v-if="!node.isLeaf" class="iconfont icon-jia"></span>
                </div>
              </template>
            </el-tree>
          </div>
        </div>
      </el-col>

      <!-- 内容 -->
      <el-col :span="17"></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {Search} from "@element-plus/icons-vue";
interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const searchCollectionName = ref<string>("")

const dataSource = ref<Tree[]>([
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 9,
        label: 'Level three 1-1-1',
      },
      {
        id: 10,
        label: 'Level three 1-1-2',
      }
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
])

</script>

<style scoped lang="scss">
.api-home {
  .api-navi {
    height: calc(100vh - 50px);
    .api-navi-header {
      height: 40px;
      line-height: 40px;

      .api-header-add {
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        margin-right: 5px;
        font-size: 20px;
        vertical-align: middle;
        cursor: pointer;
      }

      .api-header-add:hover {
        border-radius: 3px;
        background: rgba(232, 232, 232, 0.7);
      }

      .api-header-search {
        width: calc(100% - 30px);
      }
    }
    .api-navi-header > span {
      display: inline-block;
    }

    .api-navi-content {
      height: calc(100vh - 105px);
      //background: darkgray;
      overflow-y: auto;
      padding-top: 10px;
    }


  }
}
</style>
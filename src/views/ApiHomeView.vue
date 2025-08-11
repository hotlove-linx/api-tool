<template>
  <div class="api-home">
    <!-- 导航 -->
    <div class="api-navi">
      <div class="api-navi-header">
        <span class="api-header-add iconfont icon-jia"></span>
        <span class="api-header-search">
            <el-input
                v-model="searchCollectionName"
                style="max-width: 550px"
                placeholder="Search Collections"
                :prefix-icon="Search"
            />
        </span>
      </div>
      <div class="api-navi-content">
        <el-tree
            style="max-width: 600px; background: #f9f9f9"
            :data="dataSource"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
          <template #default="{ node, data }">
            <el-icon v-if="!node.isLeaf" class="tree-show-oper el-icon--left">
              <Folder v-if="!node.expanded" />
              <FolderOpened v-else/>
            </el-icon>
            <div class="tree-show-oper custom-tree-node">
                  <span class="node-label">
                    <span class="node-method" :class="data.method">{{ data.method }}</span>
                    <span class="label-name">{{ node.label }}</span>
                  </span>
              <span v-if="!node.isLeaf" class="node-oper">
                    <el-dropdown trigger="click">
                    <span  class="iconfont icon-shenglvehao"></span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>Add Request</el-dropdown-item>
                        <el-dropdown-item>Add Folder</el-dropdown-item>
                        <el-dropdown-item>Rename</el-dropdown-item>
                        <el-dropdown-item>Delete</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  </span>
              <span v-if="node.isLeaf" class="node-oper">
                    <el-dropdown trigger="click">
                    <span  class="iconfont icon-shenglvehao"></span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>Rename</el-dropdown-item>
                        <el-dropdown-item>Delete</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>

                  </span>
              <span v-if="!node.isLeaf" class="node-oper iconfont icon-jia"></span>
            </div>
          </template>
        </el-tree>
      </div>
    </div>

    <!--内容-->
    <div class="api-content"></div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {Search} from "@element-plus/icons-vue";
interface Tree {
  id: number
  label: string
  method?: string
  children?: Tree[]
}

const searchCollectionName = ref<string>("")

const dataSource = ref<Tree[]>([
  {
    id: 1,
    label: 'Aimind平台接口',
    children: [
      {
        id: 9,
        label: '新增用户接口',
        method: 'POST',
      },
      {
        id: 10,
        label: '删除用户接口',
        method: 'DEL',
      }
    ],
  },
  {
    id: 2,
    label: 'turing接口',
    children: [
      {
        id: 5,
        label: '查询向量接口',
        method: 'GET',
      },
      {
        id: 6,
        label: '修改向量值',
        method: 'PUT',
      },
    ],
  }
])

</script>

<style scoped lang="scss">
.api-home {
  .api-navi {
    background: #f9f9f9;
    display: inline-block;
    padding: 5px 10px;
    border-right: 1px solid #ebebeb;
    height: calc(100vh - 50px);
    width: 300px;
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

      .custom-tree-node {
        position: relative;
        width: 100%;
        display: inline-block;
        .node-label {
          float: left;
          .node-method {
            margin-right: 3px;
            font-size: 10px;
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
          .label-name {

          }
        }

        .node-oper {
          float: right;
          margin-right: 5px;
          visibility: hidden;
        }
      }

      .tree-show-oper:hover .node-oper {
        visibility: visible;
      }
    }
  }

  .api-content {
    display: inline-block;
    width: calc(100% - 323px);
    height: calc(100vh - 50px);
    background: darkgray;
  }
}
</style>
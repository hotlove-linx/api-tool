<template>
  <div class="api-home">
    <!-- 导航 -->
    <div class="api-navi">
      <div class="api-navi-header">
        <span class="api-header-add iconfont icon-jia" @click="addCollection"></span>
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
            empty-text="No Request"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
          <template #default="{ node, data }">
            <el-icon v-if="data.type == 'folder'"  class="tree-show-oper el-icon--left">
              <Folder v-if="!node.expanded" />
              <FolderOpened v-else/>
            </el-icon>
            <div class="tree-show-oper custom-tree-node">
                <!-- 编辑框 -->
                <span v-if="data.status !='complete'">
                    <el-input
                        v-model="folderName"
                        style="width: 100%"
                        size="small"
                        placeholder="Please Input"
                        @keyup.enter="updateFolderName(data)"
                    />
                </span>

                <!-- 名称展示 -->
                <span v-if="data.status =='complete' " class="node-label">
                  <span v-if="data.type == 'file'" class="node-method" :class="data.method">{{ data.method }}</span>
                  <span class="label-name">{{ data.name }}</span>
                </span>

                <!-- 操作 -->
                <span  class="node-oper" :class="data.oper == 'show' ? 'show-oper':''">
                    <el-dropdown v-if="data.status == 'complete'" trigger="click">
                      <span  class="iconfont icon-shenglvehao" @click="showOper(data)"></span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item v-if="data.type == 'folder'" @click="addFile(data)">Add Request</el-dropdown-item>
                          <el-dropdown-item v-if="data.type == 'folder'" @click="addSubCollection(data)">Add Folder</el-dropdown-item>
                          <el-dropdown-item @click="renameTreeItem(data)">Rename</el-dropdown-item>
                          <el-dropdown-item @click="deleteTreeItem(node, data)">Delete</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                </span>

                <span v-if="data.type=='folder' && data.status == 'complete'" class="node-oper iconfont icon-jia" @click="addFile(data)"></span>
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
import {TreeItem} from "../domain/TreeDomain.ts"
import {CommonUtil} from "../common/CommonUtil.ts"

const dataSource = ref<TreeItem[]>([])

const folderName = ref<string>("")


const searchCollectionName = ref<string>("")

const addCollection = () => {
  let item: TreeItem = {
    id: CommonUtil.getUUID(),
    type: "folder",
    name: "",
    method: "",
    status: "add",
    oper: "hidden",
    children: []
  }
  dataSource.value.push(item)
}

const addSubCollection = (parent: TreeItem) => {
  let item: TreeItem = {
    id: CommonUtil.getUUID(),
    type: "folder",
    name: "",
    method: "",
    status: "add",
    oper: "hidden",
    children: []
  }
  parent.children.push(item)
  parent.oper = "hidden"
}

const addFile = (data: TreeItem) => {
  let item: TreeItem = {
    id: CommonUtil.getUUID(),
    type: "file",
    name: "New Request",
    method: "GET",
    status: "complete",
    oper: "hidden",
    children: []
  }
  data.children.push(item)
  data.oper = "hidden"
}

const deleteTreeItem = (node: Node, data: TreeItem) => {
  const parent = node.parent
  const children: TreeItem[] = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
}

const updateFolderName = (item: TreeItem) => {
  item.name = folderName.value
  item.status = "complete"
  folderName.value = ""
}

const renameTreeItem = (item: TreeItem) => {
  item.status = "edit"
  folderName.value = item.name
  item.oper = "hidden"
}

const showOper = (item: TreeItem) => {
  item.oper = "show"
}

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

      .show-oper {
        visibility: visible !important;
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
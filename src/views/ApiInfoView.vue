<template>
  <div class="api-info-view">
    <!-- 标题 -->
    <div class="api-info-header">
      <span>MyCollection / 获取用户名</span>
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
        <el-splitter-panel :min="250">
          <div class="api-request">
            <el-tabs v-model="activeName" >
              <!-- query 参数 -->
              <el-tab-pane label="Params" name="params">
                <div class="query-header">
                  Query Params
                </div>
                <el-table :data="queryTableData" :class="queryTableData.length == 0 ? 'query-table' : ''" empty-text="" style="width: 100%" border >
                  <el-table-column width="40">
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.check"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="Key">
                    <template #default="scope">
                      <el-input v-if="scope.row.status == 'edit'"
                                v-model="scope.row.key"
                                style="width: 100%"
                                placeholder="Please input"
                                @keyup.enter="updateQuery(scope.row)"/>
                      <span class="query-item" v-else @dblclick="editQuery(scope.row)">{{ scope.row.key }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Value">
                    <template #default="scope">
                      <el-input v-if="scope.row.status == 'edit'"
                                v-model="scope.row.value"
                                style="width: 100%"
                                placeholder="Please input"
                                @keyup.enter="updateQuery(scope.row)"/>
                      <span class="query-item" v-else @dblclick="editQuery(scope.row, )">{{ scope.row.value }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Description">
                    <template #default="scope">
                      <el-input v-if="scope.row.status == 'edit'"
                                v-model="scope.row.desc"
                                style="width: 100%"
                                placeholder="Please input"
                                @keyup.enter="updateQuery(scope.row)"/>
                      <span class="query-item" v-else @dblclick="editQuery(scope.row, )">{{ scope.row.desc }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column width="45">
                    <template #default="scope">
                      <span class="query-item query-item-del iconfont icon-line" @click="deleteQuery(scope.row, 'query')"></span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="query-tail iconfont icon-jia" @click="addQuery('query')"></div>
              </el-tab-pane>
<!--              <el-tab-pane label="Authorization" name="authorization">Task</el-tab-pane>-->

              <!-- 请求头 -->
              <el-tab-pane label="Header" name="header">
                <div class="query-header">
                  Headers
                </div>
                <el-table :data="headerTableData" :class="headerTableData.length == 0 ? 'query-table' : ''" empty-text="" style="width: 100%" border >
                  <el-table-column width="40">
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.check"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="Key">
                    <template #default="scope">
                      <el-input v-if="scope.row.status == 'edit'"
                                v-model="scope.row.key"
                                style="width: 100%"
                                placeholder="Please input"
                                @keyup.enter="updateQuery(scope.row)"/>
<!--                      <el-select-->
<!--                          v-if="scope.row.status == 'edit'"-->
<!--                          v-model="scope.row.key"-->
<!--                          filterable-->
<!--                          clearable-->
<!--                          allow-create-->
<!--                          default-first-option-->
<!--                          placeholder="Please enter a keyword"-->
<!--                          @keyup.enter="updateQuery(scope.row)"-->
<!--                          @focus="focusValue($event, scope.row)"-->
<!--                          @blur="selectValue($event, scope.row)"-->
<!--                          style="width: 100%"-->
<!--                      >-->
<!--                        <el-option-->
<!--                            v-for="item in headerOptions"-->
<!--                            :key="item.id"-->
<!--                            :label="item.label"-->
<!--                            :value="item.value"-->
<!--                        />-->
<!--                      </el-select>-->
                      <span class="query-item" v-else @dblclick="editQuery(scope.row)">{{ scope.row.key }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Value">
                    <template #default="scope">
                      <el-input v-if="scope.row.status == 'edit'"
                                v-model="scope.row.value"
                                style="width: 100%"
                                placeholder="Please input"
                                @keyup.enter="updateQuery(scope.row)"/>
                      <span class="query-item" v-else @dblclick="editQuery(scope.row, )">{{ scope.row.value }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Description">
                    <template #default="scope">
                      <el-input v-if="scope.row.status == 'edit'"
                                v-model="scope.row.desc"
                                style="width: 100%"
                                placeholder="Please input"
                                @keyup.enter="updateQuery(scope.row)"/>
                      <span class="query-item" v-else @dblclick="editQuery(scope.row, )">{{ scope.row.desc }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column width="45">
                    <template #default="scope">
                      <span class="query-item query-item-del iconfont icon-line" @click="deleteQuery(scope.row, 'header')"></span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="query-tail iconfont icon-jia" @click="addQuery('header')"></div>
              </el-tab-pane>
              <el-tab-pane label="Body" name="body">
                <div class="query-header">
                  <el-radio-group v-model="bodyType">
                    <el-radio :value="1">none</el-radio>
                    <el-radio :value="2">form-data</el-radio>
                    <el-radio :value="3">x-www-form-urlencoded</el-radio>
                    <el-radio :value="4">raw</el-radio>
                  </el-radio-group>
                  <el-table v-if="bodyType == 2" :data="headerTableData" :class="headerTableData.length == 0 ? 'query-table' : ''" empty-text="" style="width: 100%" border >
                    <el-table-column width="40">
                      <template #default="scope">
                        <el-checkbox v-model="scope.row.check"></el-checkbox>
                      </template>
                    </el-table-column>
                    <el-table-column label="Key">
                      <template #default="scope">
                        <el-input v-if="scope.row.status == 'edit'"
                                  v-model="scope.row.key"
                                  style="width: 100%"
                                  placeholder="Please input"
                                  @keyup.enter="updateQuery(scope.row)">
                          <template #append>
                            <el-select  v-model="select" style="width: 72px">
                              <el-option label="File" value="1" />
                              <el-option label="Text" value="2" />
                            </el-select>
                          </template>
                        </el-input>
                        <span class="query-item" v-else @dblclick="editQuery(scope.row)">{{ scope.row.key }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="Value">
                      <template #default="scope">
                        <el-upload
                            ref="uploadRef"
                            class="upload-demo"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            :auto-upload="false"
                        >
                          <template #trigger>
                            <el-button type="primary" size="small">select file</el-button>
                          </template>
                        </el-upload>
                      </template>
                    </el-table-column>
                    <el-table-column label="Description">
                      <template #default="scope">
                        <el-input v-if="scope.row.status == 'edit'"
                                  v-model="scope.row.desc"
                                  style="width: 100%"
                                  placeholder="Please input"
                                  @keyup.enter="updateQuery(scope.row)"/>
                        <span class="query-item" v-else @dblclick="editQuery(scope.row, )">{{ scope.row.desc }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column width="45">
                      <template #default="scope">
                        <span class="query-item query-item-del iconfont icon-line" @click="deleteQuery(scope.row, 'header')"></span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-splitter-panel>
        <el-splitter-panel :min="200">
          <div class="api-response">2</div>
        </el-splitter-panel>
      </el-splitter>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {HeaderDomain, QueryDomain, headerOptions} from "@/domain/RequestDomain.ts";

const methodType = ref<string>('GET')
const sendUrl = ref<string>();
const activeName = ref<string>("params")
const queryTableData = ref<QueryDomain[]>([])
const headerTableData = ref<HeaderDomain[]>([])
const bodyType = ref<number>(1)
const select = ref<string>('1')
queryTableData.value = [
  {
    id: '1',
    key: 'Key',
    value: 'Value',
    desc: '',
    status: 'edit',
    check: true
  }
]

headerTableData.value = [
  {
    id: '1',
    key: 'Key',
    value: 'Value',
    desc: '',
    status: 'edit',
    check: true
  }
]

const editQuery = (item: QueryDomain) => {
  // tempQueryDomain.value.status = 'complete'
  item.status = 'edit'
}

const updateQuery = (item: QueryDomain) => {
  item.status = 'complete'
}

const addQuery = (type: string) => {
  let item: QueryDomain = {
    id: '4',
    key: '',
    value: '',
    desc: '',
    status: 'edit',
    check: true
  }
  if (type == 'query') {
    queryTableData.value.push(item)
  } else {
    headerTableData.value.push(item)
  }

}

const deleteQuery = (item: QueryDomain, type: string) => {
  if (type == 'query') {
    queryTableData.value.splice(queryTableData.value.indexOf(item), 1)
  } else {
    headerTableData.value.splice(headerTableData.value.indexOf(item), 1)
  }
}
</script>

<style scoped lang="scss">
.api-info-view {
  position: relative;
  display: inline-block;
  width: 100%;
  //height: calc(100vh - 50px);
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
    height: calc(100vh - 163px);
    .api-request {
      width: 100%;

      .query-table {
        ::v-deep(.el-table__body-wrapper) {
          height: 0;
          flex: none;
        }
      }

      .query-header {
        margin-bottom: 10px;
      }

      .query-item {
        display: inline-block;
        width: 100%;
        height: 14px;
      }

      .query-item-del {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #e54a4a;
        text-align: center;
        line-height: 20px;
        color: #f1f1f1;
        cursor: pointer;
      }

      .query-tail {
        margin-top: 5px;
        border: 1px dashed #dadada;
        text-align: center;
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
}

</style>
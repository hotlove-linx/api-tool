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

              <!-- 请求体 -->
              <el-tab-pane label="Body" name="body">
                <div class="query-header">
                  <el-radio-group v-model="bodyType">
                    <el-radio :value="1">none</el-radio>
                    <el-radio :value="2">form-data</el-radio>
                    <el-radio :value="3">x-www-form-urlencoded</el-radio>
                    <el-radio :value="4">raw</el-radio>
                  </el-radio-group>
                </div>
                <el-table v-if="bodyType == 2" :data="formDataTableData" :class="formDataTableData.length == 0 ? 'query-table' : ''" empty-text="" style="width: 100%" border >
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
                          <el-select  v-model="scope.row.keyType" style="width: 72px">
                            <el-option label="File" value="file" />
                            <el-option label="Text" value="text" />
                          </el-select>
                        </template>
                      </el-input>
                      <span class="query-item" v-else @dblclick="editQuery(scope.row)">{{ scope.row.key }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Value">
                    <template #default="scope">
                      <el-upload
                          v-if="scope.row.keyType == 'file'"
                          ref="uploadRef"
                          class="upload-file"
                          :auto-upload="false">
                        <template #trigger>
                          <el-button type="primary" size="small">select file</el-button>
                        </template>
                      </el-upload>
                      <el-input v-if="scope.row.keyType == 'text' && scope.row.status == 'edit'"
                                v-model="scope.row.desc"
                                style="width: 100%"
                                placeholder="Please input"
                                @keyup.enter="updateQuery(scope.row)"/>
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
                      <span class="query-item query-item-del iconfont icon-line" @click="deleteQuery(scope.row, 'body')"></span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table v-if="bodyType == 3" :data="urlEncodeDomainData" :class="urlEncodeDomainData.length == 0 ? 'query-table' : ''" empty-text="" style="width: 100%" border >
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
                      <span class="query-item query-item-del iconfont icon-line" @click="deleteQuery(scope.row, 'body')"></span>
                    </template>
                  </el-table-column>
                </el-table>
                <vue-json-pretty v-if="bodyType == 4" :data="{ 'key': 'value' }" :editable="true"/>
                <div v-if="bodyType == 2 || bodyType == 3" class="query-tail iconfont icon-jia" @click="addQuery('body')"></div>
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
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {ref} from 'vue';
import {HeaderDomain, QueryDomain, FormDataDomain, UrlEncodeDomain} from "@/domain/RequestDomain.ts";

const methodType = ref<string>('GET')
const sendUrl = ref<string>();
const activeName = ref<string>("params")

const queryTableData = ref<QueryDomain[]>([])
const headerTableData = ref<HeaderDomain[]>([])
const formDataTableData = ref<FormDataDomain[]>([])
const urlEncodeDomainData = ref<UrlEncodeDomain[]>([])


const bodyType = ref<number>(1)


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

formDataTableData.value = [
  {
    id: '1',
    key: 'Key',
    value: 'Value',
    desc: '',
    status: 'edit',
    check: true,
    keyType: 'text',
    filePath: ''
  }
]

urlEncodeDomainData.value = [
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
  if (type == 'query') {
    let item: QueryDomain = {
      id: '4',
      key: '',
      value: '',
      desc: '',
      status: 'edit',
      check: true
    }
    queryTableData.value.push(item)
  }
  if (type == 'header') {
    let item: HeaderDomain = {
      id: '4',
      key: '',
      value: '',
      desc: '',
      status: 'edit',
      check: true
    }
    headerTableData.value.push(item)
  }
  if (type == 'body') {
    if  (bodyType.value == 2) {
      let item: FormDataDomain = {
        id: '4',
        key: '',
        keyType: 'text',
        filePath: '',
        value: '',
        desc: '',
        status: 'edit',
        check: true
      }
      formDataTableData.value.push(item)
    }
    if (bodyType.value == 3) {
      let item: UrlEncodeDomain = {
        id: '4',
        key: '',
        value: '',
        desc: '',
        status: 'edit',
        check: true
      }
      urlEncodeDomainData.value.push(item)
    }
  }

}

const deleteQuery = (item: QueryDomain, type: string) => {
  if (type == 'query') {
    queryTableData.value.splice(queryTableData.value.indexOf(item), 1)
  }
  if (type == 'header'){
    headerTableData.value.splice(headerTableData.value.indexOf(item), 1)
  }

  if (type == 'body') {
    if (bodyType.value == 2) {
      formDataTableData.value.splice(formDataTableData.value.indexOf(item), 1)
    }
    if (bodyType.value == 3) {
      urlEncodeDomainData.value.splice(urlEncodeDomainData.value.indexOf(item), 1)
    }
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
    overflow: hidden;
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

        .upload-file {
        }
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
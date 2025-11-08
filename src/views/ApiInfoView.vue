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
          <div class="api-request">
            <el-tabs v-model="activeName" >
              <!-- query 参数 -->
              <el-tab-pane label="Params" name="params">
                <div class="query-header">
                  Query Params
                </div>
                <el-splitter layout="vertical">
                  <el-splitter-panel :min="250" class="panel-param">
                      <ApiParams v-model="queryTableData" type="param"></ApiParams>
                  </el-splitter-panel>
                  <el-splitter-panel :min="200">
                    <div class="api-response">2</div>
                  </el-splitter-panel>
                </el-splitter>
              </el-tab-pane>
<!--              <el-tab-pane label="Authorization" name="authorization">Task</el-tab-pane>-->
              <!-- 请求头 -->
              <el-tab-pane label="Header" name="header">
                <div class="query-header">
                  Headers
                </div>
                <ApiParams v-model="headerTableData" type="param"></ApiParams>
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
                <ApiParams v-if="bodyType == 2" v-model="formDataTableData" type="form"></ApiParams>
                <ApiParams v-if="bodyType == 3" v-model="urlEncodeDomainData"></ApiParams>
                <div v-if="bodyType == 4" class="body-raw">
                  <Codemirror
                      v-model:value="code"
                      :options="cmOptions"
                      border
                      height="200"
                      width="99%">
                  </Codemirror>
                </div>
              </el-tab-pane>

            </el-tabs>
          </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {HeaderDomain, QueryDomain, FormDataDomain, UrlEncodeDomain} from "@/domain/RequestDomain.ts";

import "codemirror/mode/javascript/javascript.js";
import Codemirror from "codemirror-editor-vue3";
import "codemirror/addon/lint/json-lint";

// 主题样式（我直接用了纯白色的，看着比较舒服）
import "codemirror/theme/rubyblue.css";
// 括号显示匹配
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/selection/active-line";
// 括号、引号编辑和删除时成对出现
import "codemirror/addon/edit/closebrackets";
// 折叠代码要用到一些玩意
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/xml-fold";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import type { EditorConfiguration } from "codemirror";

import ApiParams from "@/components/ApiParamsComponent.vue"



const code = ref<string>('');

const cmOptions: EditorConfiguration = {
  mode: "application/json",
  // theme: "base16-light", // 主题样式
  lint: true,
  tabSize: 2,
  smartIndent: true, // 是否智能缩进
  styleActiveLine: true, // 当前行高亮
  lineNumbers: true, // 显示行号
  lineWrapping: true, // 自动换行
  matchBrackets: true, // 括号匹配显示
  autoCloseBrackets: true, // 输入和退格时成对
};

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

      .panel-param {
        height: 500px;
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

      .body-raw {
        .codemirror-container.bordered {
          border: 1px solid #e1e1e1
        }
      }
    }
  }
}

</style>
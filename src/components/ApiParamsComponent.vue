<template>
  <div class="api-param">
    <el-table :data="params" :class="params.length == 0 ? 'query-table' : ''" empty-text="" style="width: 100%" border >
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
            <template v-if="type == 'form'" #append>
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
              v-if="type == 'form' && scope.row.keyType == 'file'"
              ref="uploadRef"
              class="upload-file"
              :auto-upload="false">
            <template #trigger>
              <el-button type="primary" size="small">select file</el-button>
            </template>
          </el-upload>

          <el-input v-if="(scope.row.keyType == undefined || scope.row.keyType == 'text') && scope.row.status == 'edit'"
                    v-model="scope.row.value"
                    style="width: 100%"
                    placeholder="Please input"
                    @keyup.enter="updateQuery(scope.row)"/>
          <span class="query-item" v-if="scope.row.status == 'complete'" @dblclick="editQuery(scope.row, )">{{ scope.row.value }}</span>
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
  </div>

</template>

<script setup lang="ts">
import {BaseDomain} from "@/domain/RequestDomain.ts";

const params = defineModel<BaseDomain[]>({ default: [] })

defineProps({
  type: String
})

const editQuery = (item: BaseDomain) => {
  // tempQueryDomain.value.status = 'complete'
  item.status = 'edit'
}

const updateQuery = (item: BaseDomain) => {
  item.status = 'complete'
}

const addQuery = (type: string) => {
  if (type == 'query') {
    let item: BaseDomain = {
      id: '4',
      key: '',
      value: '',
      desc: '',
      status: 'edit',
      check: true
    }
    params.value.push(item)
  }
}

const deleteQuery = (item: BaseDomain) => {
  params.value.splice(params.value.indexOf(item), 1)
}
</script>
<style scoped lang="scss">
.api-param {

  .query-item {
    display: inline-block;
    width: 100%;
    height: 14px;
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

  .query-table {
    ::v-deep(.el-table__body-wrapper) {
      height: 0;
      flex: none;
    }
  }
}
</style>
<template>
  <vue-list-table :options="tableOptions" :records="records" ref="tableRef">
    <ListColumn key="0" field="0" title="名字" max-width="300" :drag-header="true" />
    <!-- <ListColumn title="年龄" field="1" /> -->
    <ListColumn title="年龄" :columns="[{ key: '1', field: '1', title: '年龄2' }]" />
    <ListColumn key="2" field="2" title="性别" max-width="300" :drag-header="true">
      <template #headerCustomLayout="{ width, height }">
        <Group :width="width" :height="height" display="flex" align-items="center" :vue="{}">
          <ATag color="green"> 性别 </ATag>
        </Group>
      </template>
    </ListColumn>
    <ListColumn key="3" field="3" title="爱好" max-width="300" :drag-header="true" />
  </vue-list-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Tag as ATag } from '@arco-design/web-vue';
import { Group, ListColumn } from '../../../../../src/components/index';

//优先级：records > tableOptions.records
const records = ref([
  ['张三2', 18, '男', '篮球'],
  ['李四', 20, '女', '足球'],
  ['王五', 22, '男', '羽毛球'],
  ['赵六', 24, '女', '乒乓球']
]);
const tableRef = ref();
const tableOptions = ref({
  columns: [
    {
      field: '0',
      caption: '名称1'
    },
    {
      field: '1',
      caption: '年龄1'
    },
    {
      field: '2',
      caption: '性别1'
    },
    {
      field: '3',
      caption: '爱好1'
    }
  ],
  records: [
    ['张三', 18, '男', '篮球'],
    ['李四', 20, '女', '足球'],
    ['王五', 22, '男', '羽毛球'],
    ['赵六', 24, '女', '乒乓球'],
    ['张三', 18, '男', '篮球'],
    ['李四', 20, '女', '足球'],
    ['王五', 22, '男', '羽毛球'],
    ['赵六', 24, '女', '乒乓球']
  ],
  defaultHeaderRowHeight: 40,
  defaultRowHeight: 80,
  customConfig: {
    createReactContainer: true
  }
});
</script>

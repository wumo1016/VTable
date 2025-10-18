<template>
  <div id="aaa" style="width: 300px; height: 200px"></div>
  <button @click="test">测试</button>
  <!-- <ElInput v-model="text" style="width: 100%; height: 100%" clearable /> -->
  <vue-list-table ref="tableRef" :options="option">
    <ListColumn
      v-for="column in columns"
      :key="column.field"
      :field="column.field"
      :title="column.title"
      :width="column.width"
      :editor="DYNAMIC_RENDER_EDITOR"
      :edit-config="editConfig"
    >
      <template #edit="{ value, modelValue, onChange }">
        <a-date-picker
          v-if="column.field === 'birthday'"
          :default-value="value"
          style="width: 100%; height: 100%"
          :trigger-props="{ 'content-class': 'table-editor-element' }"
          @change="onChange"
        />
        <ElInput
          v-else
          :modelValue="modelValue.value"
          style="width: 100%; height: 100%"
          clearable
          @update:modelValue="
            value => {
              modelValue.value = value;
              console.log(123, value);
            }
          "
        />
        <!-- <a-input 
          v-else
          :default-value="value"
          style="width: 100%; height: 100%"
          allow-clear
          @input="onChange"
          @clear="onChange()"
        /> -->
      </template>
    </ListColumn>
  </vue-list-table>
</template>

<script setup lang="ts">
import { getCurrentInstance, h, ref, render } from 'vue';
import { ListColumn, DYNAMIC_RENDER_EDITOR } from '../../../../../src';
import { generateMockData } from '../../utils';
import { ElInput } from 'element-plus';
import 'element-plus/theme-chalk/index.css';

const { columns, records } = generateMockData(20);

const text = ref('');

const editBefore = (param: any): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(param.row !== 1);
    }, 50);
  });
};

const validateValue = (param: any): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(param.row !== 2 || !!param.value);
    }, 50);
  });
};

const editConfig = {
  editBefore,
  disablePrompt: '🚫当前行禁止编辑',
  validateValue,
  invalidPrompt: '⚠️当前行禁止空值'
};

const option = {
  records,
  editCellTrigger: 'click'
};

const tableRef = ref();
const ins = getCurrentInstance();

const modelValue = ref('2342');
const test = () => {
  const vnode = h('div', [
    h('div', modelValue.value),
    h(ElInput, {
      modelValue: modelValue.value,
      'onUpdate:modelValue'(value) {
        modelValue.value = value;
        console.log(234, value);
      }
    }),
    h('input', {
      type: 'text',
      value: modelValue.value,
      'onInput'(e) {
        modelValue.value = e.target.value;
        console.log(234, e.target.value);
      }
    })
  ]);
  console.log(vnode, ins);
  vnode.appContext = ins?.appContext;
  const container = document.getElementById('aaa');
  const div = document.createElement('div');
  render(vnode, div);
  container?.appendChild(div);
};
</script>
<style lang="scss" scoped></style>

---
category: examples
group: edit-cell
title: 动态渲染式编辑器
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/preview/vue-edit-render.png
link: Developer_Ecology/vue
---

# 动态渲染式编辑器

通过插槽式渲染机制实现动态编辑器注入，同步支持条件校验拦截，且可以不依赖 `@visactor/vtable-editors` 组件。

**✨ 核心功能**

- **插槽式编辑器注入** - 通过 `<template #edit>` 注入任意 Vue 组件
- **条件校验拦截** - `editConfig.editBefore` 和 `editConfig.validateValue` 分别校验**进入编辑状态前**和**修改值后**，支持同步/异步校验逻辑
- **禁用提示配置** - `editConfig.disablePrompt` 和 `editConfig.invalidPrompt` 分别配置**禁用时**和**校验失败时**的文字提示

**element-plus 组件使用注意事项**

- records 需要通过 option 传入, 且必须是响应式数据
- 组件需要通过 `v-model` 绑定值，且必须通过 `record[column.field]` 绑定值

## 代码演示

```javascript livedemo template=vtable-vue
const app = createApp({
  template: `
    <vue-list-table :options="option">
      <ListColumn
        v-for="column in columns"
        :key="column.field"
        :field="column.field"
        :title="column.title"
        :width="column.width"
        editor="dynamic-render-editor"
      >
        <template #edit="{ value, record, column, onChange }">
          <a-date-picker
            v-if="column.field === 'deliveryDate'"
            :default-value="value"
            style="width: 100%; height: 100%"
            :trigger-props="{
              'content-class': 'table-editor-element'
            }"
            @change="onChange"
          />
          <a-input
            v-else-if="column.field === 'orderId'"
            :default-value="value"
            style="width: 100%; height: 100%"
            allow-clear
            @input="onChange"
            @clear="onChange()"
          />
          <el-select v-else-if="column.field === 'sex'" v-model="record[column.field]" popper-class="table-editor-element" style="width: 100%; height: 100%" clearable @change="onChange">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
          <el-input v-else v-model="record[column.field]" style="width: 100%; height: 100%" clearable @input="onChange" />
        </template>
      </ListColumn>
    </vue-list-table>
  `,
  data() {
    return {
      columns: [
        { field: 'orderId', title: '订单号(a-input)', width: 150 },
        {
          field: 'deliveryDate',
          title: '交付日期(a-date-picker)',
          width: 210
        },
        {
          field: 'product',
          title: '商品名称(el-input)',
          width: 170
        },
        {
          field: 'sex',
          title: '性别(el-select)',
          width: 170
        }
        // {
        //   field: 'region',
        //   title: '配送区域',
        //   width: 200
        // }
      ],
      option: {
        records: [
          {
            orderId: 'ORD1000',
            product: '手机',
            sex: '男',
            quantity: 43,
            region: '华北',
            deliveryDate: '2024-01-01',
            status: '待发货'
          },
          {
            orderId: 'ORD1001',
            product: '笔记本',
            sex: '女',
            quantity: 27,
            region: '华东',
            deliveryDate: '2024-02-02',
            status: '运输中'
          },
          {
            orderId: 'ORD1002',
            product: '耳机',
            sex: '男',
            quantity: 58,
            region: '华南',
            deliveryDate: '2024-03-03',
            status: '已签收'
          },
          {
            orderId: 'ORD1003',
            product: '智能手表',
            sex: '男',
            quantity: 19,
            region: '西部',
            deliveryDate: '2024-04-04',
            status: '待发货'
          },
          {
            orderId: 'ORD1004',
            product: '手机',
            sex: '男',
            quantity: 36,
            region: '华北',
            deliveryDate: '2024-05-05',
            status: '运输中'
          },
          {
            orderId: 'ORD1005',
            product: '笔记本',
            sex: '女',
            quantity: 52,
            region: '华东',
            deliveryDate: '2024-06-06',
            status: '已签收'
          },
          {
            orderId: 'ORD1006',
            product: '耳机',
            sex: '男',
            quantity: 14,
            region: '华南',
            deliveryDate: '2024-07-07',
            status: '待发货'
          },
          {
            orderId: 'ORD1007',
            product: '智能手表',
            sex: '男',
            quantity: 47,
            region: '西部',
            deliveryDate: '2024-08-08',
            status: '运输中'
          },
          {
            orderId: 'ORD1008',
            product: '手机',
            sex: '男',
            quantity: 29,
            region: '华北',
            deliveryDate: '2024-09-09',
            status: '已签收'
          },
          {
            orderId: 'ORD1009',
            product: '笔记本',
            sex: '女',
            quantity: 55,
            region: '华东',
            deliveryDate: '2024-10-10',
            status: '待发货'
          },
          {
            orderId: 'ORD1010',
            product: '耳机',
            sex: '男',
            quantity: 22,
            region: '华南',
            deliveryDate: '2024-11-11',
            status: '运输中'
          }
        ],
        editCellTrigger: 'click'
      }
    };
  }
});

app.component('vue-list-table', VueVTable.ListTable);
app.component('ListColumn', VueVTable.ListColumn);
app.component('a-date-picker', ArcoDesignVue.DatePicker);
app.component('a-input', ArcoDesignVue.Input);
app.component('el-input', ElementPlus.ElInput);
app.component('el-select', ElementPlus.ElSelect);
app.component('el-option', ElementPlus.ElOption);

app.mount(`#${CONTAINER_ID}`);

// release Vue instance, do not copy
window.customRelease = () => {
  app.unmount();
};
```

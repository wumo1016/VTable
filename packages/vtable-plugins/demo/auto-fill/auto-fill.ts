import * as VTable from '@visactor/vtable';
import { bindDebugTool } from '@visactor/vtable/es/scenegraph/debug-tool';
import * as VTablePlugins from '../../src';
import * as VTable_editors from '@visactor/vtable-editors';
import { register } from '@visactor/vtable';

const CONTAINER_ID = 'vTable';

const input_editor = new VTable_editors.InputEditor();
VTable.register.editor('input', input_editor);

// 注册插件
const addRowColumn = new VTablePlugins.AddRowColumnPlugin({
    addColumnCallback: col => {
      // 新增列时，重置列数
      columnSeries.resetColumnCount(columnSeries.pluginOptions.columnCount + 1);
      // 将table实例中的数据源records每一个数组中新增一个空字符串，对应新增的列
      const newRecords = tableInstance.records.map(record => {
        if (Array.isArray(record)) {
          record.splice(col - 1, 0, '');
        }
        return record;
      });
      tableInstance.setRecords(newRecords);
    },
    addRowCallback: row => {
      // 新增行时，填充空行数据
      tableInstance.addRecord([], row - tableInstance.columnHeaderLevelCount);
    }
  });

const columnSeries = new VTablePlugins.ColumnSeriesPlugin({
  columnCount: 26,
  autoExtendColumnTriggerKeys: ['ArrowRight', 'Tab']
});
const rowSeries = new VTablePlugins.RowSeriesPlugin({
  rowCount: 100,
  autoExtendRowTriggerKeys: ['ArrowDown', 'Enter'],
  //records数据以外 填充空行数据
  fillRowRecord: index => {
    return [];
  },
  rowSeriesNumber: {
    width: 'auto'
  }
});
const highlightPlugin = new VTablePlugins.HighlightHeaderWhenSelectCellPlugin({
  colHighlight: true,
  rowHighlight: true
});
const excelEditCellKeyboardPlugin = new VTablePlugins.ExcelEditCellKeyboardPlugin();
const pasteAddRowColumnPlugin = new VTablePlugins.PasteAddRowColumnPlugin({
  addColumnCallback: col => {
    // 新增列时，重置列数
    columnSeries.resetColumnCount(columnSeries.pluginOptions.columnCount + 1);
    // 将table实例中的数据源records每一个数组中新增一个空字符串，对应新增的列
    const newRecords = tableInstance.records.map(record => {
      if (Array.isArray(record)) {
        record.splice(col - 1, 0, '');
      }
      return record;
    });
    tableInstance.setRecords(newRecords);
  }
});
const option = {
  // 二维数组的数据 和excel的行列一致
  records: [
    ['姓名', '年龄', '地址'],
    ['张三', 18, '北京'],
    ['李四', 20, '上海'],
    ['王五', 22, '广州'],
    ['赵六', 24, '深圳'],
    ['孙七', 26, '成都']
  ],
  padding: 30,
  editor: 'input',
  editCellTrigger: ['api', 'keydown', 'doubleclick'], // 编辑单元格触发方式
  select: {
    cornerHeaderSelectMode: 'body',
    headerSelectMode: 'body'
  },
  // theme: VTable.themes.DEFAULT.extends({
  //   defaultStyle: {
  //     textAlign: 'left',
  //     padding: [2, 6, 2, 6]
  //   },
  //   headerStyle: {
  //     textAlign: 'center'
  //   }
  // }),
  // frozenColCount: 1,
  defaultRowHeight: 30,
  // keyboardOptions: {
  //   moveFocusCellOnEnter: true,
  //   copySelected: true,
  //   pasteValueToCell: true
  // },
  plugins: [
    addRowColumn,
    columnSeries,
    rowSeries,
    // highlightPlugin,
    // excelEditCellKeyboardPlugin,
    // pasteAddRowColumnPlugin
  ],
};
const tableInstance = new VTable.ListTable(document.getElementById(CONTAINER_ID), option);
window.tableInstance = tableInstance;
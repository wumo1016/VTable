import * as VTable from '../../src';
const CONTAINER_ID = 'vTable';

// import { ListTable, TYPES } from '@visactor/vtable';
// import * as VTable from '@visactor/vtable';
import { ListEditor, InputEditor } from '@visactor/vtable-editors';
VTable.register.editor(
  'list-editor',
  new ListEditor({
    values: ['1', '2', '3']
  })
);
VTable.register.editor('input-editor', new InputEditor());

export function createTable() {
  const records = generatePersons(15);
  const columns: VTable.ColumnsDefine = [
    {
      field: '',
      title: '行号',
      width: 80,
      fieldFormat(data, col, row, table) {
        return row - 1;
      },
      style: {
        underline: true,
        underlineDash: [2, 0],
        underlineOffset: 3
      }
    },
    {
      field: 'id',
      title: 'ID',
      width: 'auto',
      minWidth: 50,
      sort: true,
      disableSelect: true
    },
    {
      field: 'email1',
      title: 'email',
      width: 200,
      sort: true,
    },
    {
      title: 'full name',
      columns: [
        {
          field: 'name',
          title: 'First Name',
          width: 200
        },
        {
          field: 'name',
          title: 'Last Name',
          width: 200
        }
      ]
    },
    {
      field: 'date1',
      title: 'birthday',
      width: 200
    }
    // {
    //   field: 'sex',
    //   title: 'sex',
    //   width: 100
    // },
    // {
    //   field: 'tel',
    //   title: 'telephone',
    //   width: 150
    // },
    // {
    //   field: 'work',
    //   title: 'job',
    //   width: 200
    // },
    // {
    //   field: 'city',
    //   title: 'city',
    //   width: 150,
    //   mergeCell: true
    // },
    // {
    //   field: 'date1',
    //   title: 'birthday',
    //   width: 200
    // },
    // {
    //   field: 'sex',
    //   title: 'sex',
    //   width: 100
    // },
    // {
    //   field: 'tel',
    //   title: 'telephone',
    //   width: 150
    // },
    // {
    //   field: 'work',
    //   title: 'job',
    //   width: 200
    // },
    // {
    //   field: 'city',
    //   title: 'city',
    //   width: 150
    // },
    // {
    //   field: 'date1',
    //   title: 'birthday',
    //   width: 200
    // },
    // {
    //   field: 'sex',
    //   title: 'sex',
    //   width: 100
    // },
    // {
    //   field: 'tel',
    //   title: 'telephone',
    //   width: 150
    // },
    // {
    //   field: 'work',
    //   title: 'job',
    //   width: 200
    // },
    // {
    //   field: 'city',
    //   title: 'city',
    //   width: 150
    // },
    // {
    //   field: 'date1',
    //   title: 'birthday',
    //   width: 200
    // },
    // {
    //   field: 'sex',
    //   title: 'sex',
    //   width: 100
    // },
    // {
    //   field: 'tel',
    //   title: 'telephone',
    //   width: 150
    // },
    // {
    //   field: 'work',
    //   title: 'job',
    //   width: 200
    // },
    // {
    //   field: 'city',
    //   title: 'city',
    //   width: 150
    // }
  ];
  
  const option: VTable.ListTableConstructorOptions = {
    container: document.getElementById(CONTAINER_ID),
    emptyTip: true,
    records,
    // rowSeriesNumber: {
    //   dragOrder: true
    // },
    // dragOrder: {
    //   dragHeaderMode: 'column'
    // },
    columns: [...columns],
    tooltip: {
      isShowOverflowTextTooltip: true
    },
    // frozenColCount: 1,
    // bottomFrozenRowCount: 2,
    // rightFrozenColCount: 2,
    // overscrollBehavior: 'none',
    // dragHeaderMode: 'all',
    select: {
      disableSelect: (col, row, table) => {
        console.log(row, col);
        // return row === 2 && col === 2;
        return row === 3
      }
    },
    // keyboardOptions: {
    //   pasteValueToCell: true,
    //   copySelected: true,
    //   selectAllOnCtrlA: true
    //   // ctrlMultiSelect: false,
    //   // shiftMultiSelect: false
    // },
    // eventOptions: {
    //   preventDefaultContextMenu: false
    // },
    // autoWrapText: true,
    // editor: '',
    // theme: VTable.themes.ARCO,
    // hover: {
    //   highlightMode: 'cross'
    // },
    // select: {
    //   headerSelectMode: 'cell',
    //   highlightMode: 'cross'
    // },
    // theme: {
    //   frameStyle: {
    //     cornerRadius: [10, 0, 0, 10],
    //     // cornerRadius: 10,
    //     borderLineWidth: [10, 0, 10, 10],
    //     // borderLineWidth: 10,
    //     borderColor: 'red',
    //     shadowBlur: 0
    //   },
    //   columnResize: {
    //     lineColor: 'red',
    //     lineWidth: 2,
    //     width: 1,
    //     resizeHotSpotSize: 4
    //   }
    // },
    // excelOptions: {
    //   fillHandle: true
    // },
    // widthMode: 'adaptive',
    // disableDblclickAutoResizeColWidth: false
  };
  const tableInstance = new VTable.ListTable(document.getElementById(CONTAINER_ID)!, option);
  window.tableInstance = tableInstance;

  const numHobbies = Math.floor(Math.random() * 3) + 1; // 生成 1-3 之间的随机整数
  const selectedHobbies: string[] = [];

  for (let i = 0; i < numHobbies; i++) {
    const randomIndex = Math.floor(Math.random() * hobbies.length);
    const hobby = hobbies[randomIndex];
    selectedHobbies.push(hobby);
    hobbies.splice(randomIndex, 1);
  }

  return selectedHobbies.join(', ');
}

function generateRecords(count: number) {
  return Array.from(new Array(count)).map((_, i) => {
    return {
      id: i + 1,
      hobbies: generateRandomHobbies()
    };
  });
}

const records = generateRecords(10);

const columns = [
  {
    field: 'id',
    title: 'ID',
    width: 80,
    editor: 'list-editor'
  },
  {
    field: 'hobbies',
    title: 'hobbies',
    width: 200
  }
];
const option = {
  records,
  columns,
  widthMode: 'adaptive',
  autoFillWidth: true,
  // widthMode: 'standard'
};
const tableInstance = new VTable.ListTable(document.getElementById(CONTAINER_ID), option);

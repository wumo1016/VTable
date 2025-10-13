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

function generateRandomHobbies() {
  const hobbies = [
    'Reading books',
    'Playing video games',
    'Watching movies',
    'Cooking',
    'Hiking',
    'Traveling',
    'Photography',
    'Playing musical instruments',
    'Gardening',
    'Painting',
    'Writing',
    'Swimming'
  ];

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
  // widthMode: 'adaptive'
  widthMode: 'standard'
};
const tableInstance = new VTable.ListTable(document.getElementById(CONTAINER_ID), option);

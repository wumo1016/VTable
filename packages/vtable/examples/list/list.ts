import { ListTable } from '../../src';

const container = document.getElementById('vTable');
fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/North_American_Superstore_Pivot_data.json')
  .then(res => res.json())
  .then(data => {
    const option = {
      records: data,
      columns: [
        {
          field: 'Category',
          title: 'Category',
          width: 400
        },
        {
          field: 'City',
          title: 'City',
          width: 500
        },
        {
          field: 'Quantity',
          title: 'Quantity',
          width: 200
        },
        {
          field: 'Sales',
          title: 'Sales',
          width: 200
        },
        {
          field: 'Profit',
          title: 'Profit',
          width: 200
        }
      ],
      // frozenColCount: 2
      rightFrozenColCount: 2
    };
    const tableInstance = new ListTable(container, option);
    window['tableInstance'] = tableInstance;
  });

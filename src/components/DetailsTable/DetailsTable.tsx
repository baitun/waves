import React from 'react';
import { Item } from '../../types';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';

export type DetailsTableProps = {
  item: Item;
};

const columns: ColumnProps<any>[] = [
  { title: 'key', dataIndex: 'key' },
  { title: 'value', dataIndex: 'value' },
];

export const DetailsTable: React.FC<DetailsTableProps> = ({ item }) => {
  const data = Object.entries(item).map(([key, value]) => ({ key, value }));
  return <Table columns={columns} dataSource={data} pagination={false}></Table>;
};

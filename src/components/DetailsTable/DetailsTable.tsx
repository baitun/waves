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
  const map = {
    'Auction id ': item.id,
    'Max bid ': item.deposit,
    'Amount ': item.lot_amount,
    'Lot id ': item.lot_assetId,
    'Organizer address ': item.organizer,
    'Currency ': item.priceAssetId,
    'Start bid ': item.startPrice,
    'Time left for bids ': '@TODO',
    'Second price': item.second_price
      ? item.second_price
      : 'Will be known after time left for bids complete',
    'Top price ': item.top_price
      ? item.top_price
      : 'Will be known after time left for bids completed',
    'Unrevealed count': item.unrevealed_count
      ? item.unrevealed_count
      : 'Will be known after time left for bids completed',
    'Time left for reveal bids': '@TODO closing_start - today',
    Settle: item.settle
      ? 'Winner took the prize'
      : 'The prize is held by the organizer',
  };
  const data = Object.entries(map).map(([key, value]) => ({ key, value }));

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      showHeader={false}
    ></Table>
  );
};

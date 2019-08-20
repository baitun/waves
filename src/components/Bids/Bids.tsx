import { Table, Typography } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { getBids } from '../../mocks';
import { Bid } from '../../utils/api';
import { Section } from '../Section/Section';

const columns: ColumnProps<any>[] = [
  { title: 'Auction ID', dataIndex: 'auctionId' },
  { title: 'Start price', dataIndex: 'startPrice' },
  { title: 'Deposit', dataIndex: 'deposit' },
];

type Props = {};
export const Bids: React.FC<Props> = () => {
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    const bids = getBids();
    setBids(bids);
  }, []);

  return (
    <Section>
      <Typography.Title level={1}>My bids</Typography.Title>

      <Table columns={columns} dataSource={bids} pagination={false}></Table>
    </Section>
  );
};

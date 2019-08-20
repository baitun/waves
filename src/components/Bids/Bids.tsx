import { Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Bid } from '../../utils/api';
import { Section } from '../Section/Section';
import { ColumnProps } from 'antd/lib/table';

const columns: ColumnProps<any>[] = [
  { title: 'Auction ID', dataIndex: 'auctionId' },
  { title: 'deposit', dataIndex: 'deposit' },
];

type Props = {};
export const Bids: React.FC<Props> = () => {
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    const bids: Bid[] = [
      {
        auctionId: 'TAyRZ8XwQ5HYTkZUrTkMFb4oG43UMkCmB3wT5zdj6nL',
        hash: 'hashhashhashhashhashhashhashhash',
        priceAssetId: 'WAVES',
        deposit: 1000,
      },
    ];
    setBids(bids);
  }, []);

  return (
    <Section>
      <Typography.Title level={1}>My bids</Typography.Title>

      <Table columns={columns} dataSource={bids} pagination={false}></Table>
    </Section>
  );
};

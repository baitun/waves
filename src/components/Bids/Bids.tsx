import { Table, Typography, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { Bid, getBidsAsBidder } from '../../utils/api';
import { withKeeper } from '../../utils/tmpSimpleKeeper';
import { Section } from '../Section/Section';

const columns: ColumnProps<any>[] = [
  { title: 'Auction ID', dataIndex: '' },
  { title: 'Start price', dataIndex: 'startPrice' },
  { title: 'Deposit', dataIndex: 'deposit' },
  { title: 'My bid', dataIndex: 'myBid' },
  { title: 'Status', dataIndex: 'Status' },
  {
    title: 'Actions',
    render: () => (
      <>
        <Button>UP</Button>
      </>
    ),
  },
];

type Props = {};
export const Bids: React.FC<Props> = () => {
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    withKeeper((api) => {
      api.publicState().then((ps) => {
        const address = ps.account && ps.account.address;

        if (address) {
          getBidsAsBidder(address).then((result) => {
            setBids(result);
          });
        }
      });
    });
  }, []);

  return (
    <Section>
      <Typography.Title level={1}>My bids</Typography.Title>

      <Table
        columns={columns}
        dataSource={bids}
        pagination={false}
        rowKey="auctionId"
      ></Table>
    </Section>
  );
};

import { Table, Typography, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import {
  getBidsAsBidder,
  toShortTokenAmount,
  reveal,
  HashedBid,
  withdraw,
} from '../../utils/api';
import { withKeeper } from '../../utils/tmpSimpleKeeper';
import { Section } from '../Section/Section';

type BidView = {
  deposit: string;
  myBid: string;
  fullHash: HashedBid;
  auctionId: string;
  startPrice: string;
  status: string;
  alreadyRevealed: boolean;
};

const columns: ColumnProps<BidView>[] = [
  { title: 'Auction ID', dataIndex: 'auctionId' },
  { title: 'Start price', dataIndex: 'startPrice' },
  { title: 'Deposit', dataIndex: 'deposit' },
  { title: 'My bid', dataIndex: 'myBid' },
  { title: 'Status', dataIndex: 'status' },
  {
    title: 'Actions',
    render: (_, record) => (
      <>
        {record.status === 'REVEAL' && !record.alreadyRevealed ? (
          <Button onClick={doReveal(record)}>Reveal</Button>
        ) : (
          ''
        )}
        {record.status === 'SETTLE' ? (
          <Button onClick={doWithdraw(record)}>Withdraw</Button>
        ) : (
          ''
        )}
      </>
    ),
  },
];

const doWithdraw = (view: BidView) => () => {
  withKeeper(async (api) => {
    const lotTx = await withdraw(view.auctionId, api.signAndPublishTransaction);

    console.info('Created asset: ' + lotTx.id + ' waiting for tx');
  });
};

const doReveal = (view: BidView) => () => {
  withKeeper(async (api) => {
    const lotTx = await reveal(
      {
        auctionId: view.auctionId,
        salt: view.fullHash.salt,
        amount: parseInt(view.fullHash.amount),
      },
      api.signAndPublishTransaction
    );

    console.info('Created asset: ' + lotTx.id + ' waiting for tx');
  });
};

type Props = {};

export const Bids: React.FC<Props> = () => {
  const [bids, setBids] = useState<BidView[]>([]);

  useEffect(() => {
    withKeeper((api) => {
      api.publicState().then((ps) => {
        const address = ps.account && ps.account.address;

        if (address) {
          getBidsAsBidder(address).then((result) => {
            setBids(
              result
                .map((bid) => {
                  const fullHash = JSON.parse(
                    localStorage.getItem(bid.auctionId) || '{}'
                  ) as HashedBid;

                  const alreadyRevealed = bid[`${address}_revealed`];
                  const alreadySettled = bid[`${address}_settle]`];

                  return {
                    deposit: toShortTokenAmount(bid.deposit),
                    myBid: toShortTokenAmount(fullHash.amount),
                    auctionId: bid.auctionId,
                    fullHash: fullHash,
                    startPrice: toShortTokenAmount(bid.startPrice || 0),
                    status: bid.phase,
                    alreadyRevealed: alreadyRevealed,
                    alreadySettled: alreadySettled,
                  };
                })
                .filter((bid) => !bid.alreadySettled)
            );
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

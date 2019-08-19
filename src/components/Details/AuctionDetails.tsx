import { Button, InputNumber, Typography } from 'antd';
import React, { useState } from 'react';
import { IAuctionDetails } from '../../utils/api';
import { getImage } from '../../utils/getImage';
import { IPublicState } from '../../utils/keeper';
import { DetailsTable } from '../DetailsTable/DetailsTable';
import { Section } from '../Section/Section';

type Props = {
  auction?: IAuctionDetails;
  state?: IPublicState;
};
export const AuctionDetails: React.FC<Props> = ({ auction, state }) => {
  const [bidAmount, setBidAmount] = useState(0);

  if (auction === undefined) return <>Auction not found</>;

  return (
    <Section>
      <Typography.Title level={1}>{auction.id}</Typography.Title>
      <img src={getImage(auction)} alt={''} />
      <DetailsTable item={auction} />
      <br />
      <br />

      {state!.account!.address === auction.organizer ? (
        <>
          <Button type="primary">SETTLE</Button>
        </>
      ) : (
        <>
          <InputNumber
            value={bidAmount}
            min={0}
            formatter={(value) => (value ? (+value / 100).toFixed(2) : '')}
            parser={(value) => (value ? parseFloat(value) * 100 : 0)}
            onChange={(value) => value && setBidAmount(value)}
          />{' '}
          <Button type="primary">Bid</Button>
        </>
      )}
    </Section>
  );
};

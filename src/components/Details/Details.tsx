import { Button, InputNumber, Typography } from 'antd';
import React, { useState } from 'react';
import { Item } from '../../types';
import { getImage } from '../../utils/getImage';
import { IPublicState } from '../../utils/keeper';
import { DetailsTable } from '../DetailsTable/DetailsTable';
import { Section } from '../Section/Section';

type Props = {
  id: string;
  item?: Item;
  state?: IPublicState;
};
export const Details: React.FC<Props> = ({ id, item, state }) => {
  const [bidAmount, setBidAmount] = useState(0);

  if (item === undefined) return <>Auction not found</>;

  return (
    <Section>
      <Typography.Title level={1}>{item.id}</Typography.Title>
      <img src={getImage(item)} alt={''} />
      <DetailsTable item={item} />
      <br />
      <br />

      {state!.account!.address === item.organizer ? (
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

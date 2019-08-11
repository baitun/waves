import { Button, InputNumber, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { MOCK_ITEMS } from '../../mocks';
import { Item } from '../../types';
import { Attributes } from '../Card/Attributes';
import style from './Details.module.css';

type Props = {
  uuid: string;
};
export const Details: React.FC<Props> = ({ uuid }) => {
  const [item, setItem] = useState<Item | undefined>(undefined);
  const [bidAmount, setBidAmount] = useState(0);
  useEffect(() => {
    setItem(MOCK_ITEMS.find((item) => item.uuid === uuid) || MOCK_ITEMS[0]);
  }, [uuid]);
  useEffect(() => {
    if (item === undefined) return;
    setBidAmount(item.price);
  }, [item]);

  if (item === undefined) return <>Not found</>;
  return (
    <div className={style.details}>
      <Typography.Title level={1}>{item.name}</Typography.Title>
      <img src={item.image} alt={item.name} />
      <Attributes item={item} />
      <p>{item.description}</p>
      <InputNumber
        value={bidAmount}
        min={0}
        formatter={(value) => (value ? (+value / 100).toFixed(2) : '')}
        parser={(value) => (value ? parseFloat(value) * 100 : 0)}
        onChange={(value) => value && setBidAmount(value)}
      />{' '}
      <Button type="primary">Bid</Button>
    </div>
  );
};

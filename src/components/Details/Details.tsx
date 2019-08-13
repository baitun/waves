import { Button, InputNumber, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Item } from '../../types';
import { Attributes } from '../Card/Attributes';
import style from './Details.module.css';

type Props = {
  id: string;
  items: Item[];
};
export const Details: React.FC<Props> = ({ id, items }) => {
  const [item, setItem] = useState<Item | undefined>(undefined);
  const [bidAmount, setBidAmount] = useState(0);
  useEffect(() => {
    setItem(items.find((item) => item.id === id) || items[0]);
  }, [id, items]);
  useEffect(() => {
    if (item === undefined) return;
    // setBidAmount(item.price);
  }, [item]);

  if (item === undefined) return <>Not found</>;
  const image =
    `https://placekitten.com/400/200?image=` + (parseInt(item.id) % 15);

  return (
    <div className={style.details}>
      <Typography.Title level={1}>{item.id}</Typography.Title>
      <img src={image} alt={''} />
      <Attributes item={item} />
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

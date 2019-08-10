import { Icon, Typography } from 'antd';
import style from './Details.module.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { MOCK_ITEMS } from '../../mocks';
import { Item } from '../../types';
console.log(style);

type Props = {
  uuid: string;
};
export const Details: React.FC<Props> = ({ uuid }) => {
  const [item, setItem] = useState<Item | undefined>(undefined);
  useEffect(() => {
    setItem(MOCK_ITEMS.find((item) => item.uuid === uuid) || MOCK_ITEMS[0]);
  }, [uuid]);

  if (item === undefined) return <>Not found</>;
  return (
    <div className={style.details}>
      <img src={item.image} alt={item.name} />
      <Typography.Title level={4}>{item.name}</Typography.Title>
      <div className={style.timeLeft}>
        <Icon type="clock-circle" /> Ends {moment().to(item.endDate)}
      </div>
      <div className={style.price}>
        <Icon type="money-collect" /> {item.price.toFixed(2)} Waves
      </div>
      <div className={style.bids}>
        <Icon type="number" /> {item.bids} bids
      </div>
    </div>
  );
};

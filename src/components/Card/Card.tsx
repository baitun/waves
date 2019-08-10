import React from 'react';
import style from './Card.module.css';
import { Icon, Typography } from 'antd';
import { Item } from '../../types';
import moment from 'moment';

type Props = {
  item: Item;
};
export const Card: React.FC<Props> = ({ item }) => {
  return (
    <div className={style.card}>
      <img src={item.imageUrl} alt={item.name} />
      <Typography.Title level={4}>{item.name}</Typography.Title>
      <div className={style.timeLeft}>
        <Icon type="clock-circle" /> {moment().to(item.endDate)}
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

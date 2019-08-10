import { Icon, Typography } from 'antd';
import { navigate } from 'hookrouter';
import moment from 'moment';
import React from 'react';
import { Item } from '../../types';
import style from './Card.module.css';

type Props = {
  item: Item;
};
export const Card: React.FC<Props> = ({ item }) => {
  const handleClick = () => navigate(`/bid/${item.uuid}`);
  return (
    <div className={style.card} onClick={handleClick}>
      <img src={item.imageUrl} alt={item.name} />
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

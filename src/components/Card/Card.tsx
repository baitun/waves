import { Icon, Typography } from 'antd';
import { navigate } from 'hookrouter';
import moment from 'moment';
import React from 'react';
import { Item } from '../../types';
import { getImage } from '../../utils/getImage';
import style from './Card.module.css';

export type CardProps = {
  item: Item;
};
export const Card: React.FC<CardProps> = ({ item }) => {
  const handleClick = () => navigate(`/waves/bid/${item.id}`);

  return (
    <div className={style.card} onClick={handleClick}>
      <img src={getImage(item)} alt={''} />
      <Typography.Title className={style.title} level={4}>
        {item.id}
      </Typography.Title>
      <div className={style.attributes}>
        <div>
          <Icon type="user" /> {item.organizer}
        </div>
        <div>
          <Icon type="clock-circle" /> Ends {moment().to(0)}
        </div>
        <div>
          <Icon type="money-collect" /> {item.startPrice} Waves
        </div>
        <div>
          <Icon type="number" /> {item.unrevealed_count} bids
        </div>
      </div>
    </div>
  );
};

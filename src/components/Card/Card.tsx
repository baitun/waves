import { Typography } from 'antd';
import { navigate } from 'hookrouter';
import React from 'react';
import { Item } from '../../types';
import { Attributes } from './Attributes';
import style from './Card.module.css';

export type CardProps = {
  item: Item;
};
export const Card: React.FC<CardProps> = ({ item }) => {
  const handleClick = () => navigate(`/waves/bid/${item.id}`);
  const image =
    `https://placekitten.com/400/200?image=` + (parseInt(item.id) % 15);
  return (
    <div className={style.card} onClick={handleClick}>
      <img src={image} alt={''} />
      <Typography.Title className={style.title} level={4}>
        {item.id}
      </Typography.Title>
      <Attributes item={item} />
    </div>
  );
};

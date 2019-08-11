import { Typography } from 'antd';
import { navigate } from 'hookrouter';
import React from 'react';
import { Item } from '../../types';
import { Attributes } from './Attributes';
import style from './Card.module.css';

type Props = {
  item: Item;
};
export const Card: React.FC<Props> = ({ item }) => {
  const handleClick = () => navigate(`/bid/${item.uuid}`);
  return (
    <div className={style.card} onClick={handleClick}>
      <img src={item.thumbnail} alt={item.name} />
      <Typography.Title level={4}>{item.name}</Typography.Title>
      <Attributes item={item} />
    </div>
  );
};

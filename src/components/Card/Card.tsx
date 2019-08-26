import { Icon, Typography } from 'antd';
import { navigate } from 'hookrouter';
import React, { useEffect, useState } from 'react';
import { Item } from '../../types';
import { WAVES } from '../../utils/api';
import { getImage } from '../../utils/getImage';
import { blocks2string } from '../../utils/time';
import style from './Card.module.css';

export type CardProps = {
  item: Item;
};
export const Card: React.FC<CardProps> = ({ item }) => {
  const handleClick = () => navigate(`/waves/auction/${item.id}`);

  const [image, setImage] = useState<string>('');

  useEffect(() => {
    getImage(item).then((img) => {
      setImage(img);
    });
  }, [item]);

  return (
    <div className={style.card} onClick={handleClick}>
      <img src={image} alt={''} />
      <Typography.Title className={style.title} level={4}>
        {item.id}
      </Typography.Title>
      <div className={style.attributes}>
        <div>
          <Icon type="user" /> {item.organizer}
        </div>
        <div>
          <Icon type="clock-circle" />
          {item.deltaReveal && item.deltaReveal > 0
            ? blocks2string(item.deltaReveal)
            : 'Ended'}
        </div>
        <div>
          <Icon type="money-collect" /> {(item.startPrice! / WAVES).toFixed(2)}{' '}
          WAVES
        </div>
        <div>
          <Icon type="number" /> {item.unrevealed_count} bids
        </div>
      </div>
    </div>
  );
};

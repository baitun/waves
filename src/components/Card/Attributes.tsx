import { Icon } from 'antd';
import moment from 'moment';
import React from 'react';
import { Item } from '../../types';
import style from './Card.module.css';

type Props = {
  item: Item;
};
export const Attributes: React.FC<Props> = ({ item }) => {
  return (
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
  );
};

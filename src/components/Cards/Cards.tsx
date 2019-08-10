import React from 'react';
import { Card } from '../Card/Card';
import style from './Cards.module.css';
import { Item } from '../../types';
import { CardAdd } from '../Card/CardAdd';

type Props = { items: Item[] };
export const Cards: React.FC<Props> = ({ items }) => {
  return (
    <div className={style.cards}>
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
      <CardAdd />
    </div>
  );
};

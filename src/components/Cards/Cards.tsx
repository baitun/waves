import React from 'react';
import { Item } from '../../types';
import { Card } from '../Card/Card';
import { CardAdd } from '../Card/CardAdd';
import style from './Cards.module.css';

export type CardsProps = { items: Item[] };

export const Cards: React.FC<CardsProps> = ({ items }) => {
  return (
    <div className={style.cards}>
      <CardAdd />
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

import { navigate } from 'hookrouter';
import React from 'react';
import { IAuctionDetails } from '../../utils/api';
import { Card } from '../Card/Card';
import { CardAdd } from '../Card/CardAdd';
import style from './Cards.module.css';

export type CardsProps = { auctions: IAuctionDetails[] };

export const CardsAuctions: React.FC<CardsProps> = ({ auctions }) => {
  return (
    <div className={style.cards}>
      <CardAdd
        onClick={() => navigate('/waves/create/auction')}
        title="Create a new auction"
      />
      {auctions.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

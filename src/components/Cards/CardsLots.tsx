import { navigate } from 'hookrouter';
import React, { useEffect, useState } from 'react';
import { getLots } from '../../mocks';
import { ILotDetails } from '../../utils/api';
import { CardAdd } from '../Card/CardAdd';
import { CardLot } from '../Card/CardLot';
import style from './Cards.module.css';

export type CardsLotsProps = {};

export const CardsLots: React.FC<CardsLotsProps> = () => {
  const [lots, setLots] = useState<ILotDetails[]>([]);

  useEffect(() => {
    setLots(getLots());
  }, []);

  return (
    <div className={style.cards}>
      <CardAdd
        onClick={() => navigate('/waves/create/lot')}
        title="Create a new lot"
      />
      {lots.map((lot) => (
        <CardLot key={lot.id} lot={lot} />
      ))}
    </div>
  );
};

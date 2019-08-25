import { navigate } from 'hookrouter';
import React, { useEffect, useState } from 'react';
import { NFT, getLots } from '../../utils/api';
import { withKeeper } from '../../utils/tmpSimpleKeeper';
import { CardAdd } from '../Card/CardAdd';
import { CardLot } from '../Card/CardLot';
import style from './Cards.module.css';

export type CardsLotsProps = {};

export const CardsLots: React.FC<CardsLotsProps> = () => {
  const [lots, setLots] = useState<NFT[]>([]);

  useEffect(() => {
    withKeeper((api) => {
      api.publicState().then((ps) => {
        const address = ps.account && ps.account.address;

        if (address) {
          getLots(address).then((result) => {
            setLots(result);
          });
        }
      });
    });
  }, []);

  return (
    <div className={style.cards}>
      <CardAdd
        onClick={() => navigate('/waves/create/lot')}
        title="Create a new lot"
      />
      {lots.map((lot) => (
        <CardLot
          key={lot.id}
          lot={{
            name: lot.name,
            imageUrl: lot.description,
            id: lot.id,
          }}
        />
      ))}
    </div>
  );
};

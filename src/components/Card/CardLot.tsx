import { Typography } from 'antd';
import { navigate } from 'hookrouter';
import React from 'react';
import { ILotDetails } from '../../utils/api';
import style from './Card.module.css';

export type CardLotProps = {
  lot: ILotDetails;
};
export const CardLot: React.FC<CardLotProps> = ({ lot }) => {
  const handleClick = () => navigate(`/waves/lot/${lot.id}`);

  return (
    <div className={style.card} onClick={handleClick}>
      <img src={lot.imageUrl} alt={''} />

      <Typography.Title className={style.title} level={4}>
        {lot.name}
      </Typography.Title>
    </div>
  );
};

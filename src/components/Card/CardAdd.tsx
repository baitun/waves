import React from 'react';
import style from './Card.module.css';
import { Icon } from 'antd';

type Props = {};
export const CardAdd: React.FC<Props> = () => {
  return (
    <div className={`${style.card} ${style.add}`}>
      <Icon className={style.add} type="plus" />
    </div>
  );
};

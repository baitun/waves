import { Icon } from 'antd';
import { navigate } from 'hookrouter';
import React from 'react';
import style from './Card.module.css';

type Props = {};
export const CardAdd: React.FC<Props> = () => {
  return (
    <div
      className={`${style.card} ${style.add}`}
      onClick={() => navigate('/create')}
      title="Create a new lot"
    >
      <Icon className={style.add} type="plus" />
    </div>
  );
};

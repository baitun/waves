import { Icon } from 'antd';
import React from 'react';
import style from './Card.module.css';

type Props = {
  onClick: () => void;
  title: string;
};
export const CardAdd: React.FC<Props> = (props) => {
  return (
    <div className={`${style.card} ${style.add}`} {...props}>
      <Icon className={style.add} type="plus" />
    </div>
  );
};

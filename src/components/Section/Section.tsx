import React from 'react';
import style from './Section.module.css';

export const Section: React.FC = ({ children }) => {
  return <div className={style.section}>{children}</div>;
};

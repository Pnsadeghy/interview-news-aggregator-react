import BaseAlertThemeEnum from './base.alert.theme.enum';
import React from 'react';
import './base.alert.scss';

interface componentProps {
  children: React.ReactNode;
  theme: BaseAlertThemeEnum;
}

export default function BaseAlert({ children, theme }: componentProps) {
  return <div className={`alert ${theme}`}>{children}</div>;
}

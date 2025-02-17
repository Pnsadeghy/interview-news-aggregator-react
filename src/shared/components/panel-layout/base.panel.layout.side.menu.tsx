import LinkInterface from '@/shared/interfaces/link.interface';
import './base.panel.layout.side.menu.scss';
import Link from 'next/link';
import React from 'react';

interface componentProps {
  items: LinkInterface[];
  children?: React.ReactNode;
}

export default function BasePanelLayoutSideMenu({
  items,
  children,
}: componentProps) {
  return (
    <nav className='panel-layout_side_nav'>
      <ul>
        {items.map((item) => (
          <li key={item.path}>
            <Link href={item.path}>{item.label}</Link>
          </li>
        ))}
        {children}
      </ul>
    </nav>
  );
}

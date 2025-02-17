'use client';

import BaseIconNav from '@/shared/components/icons/base.icon.nav';
import React, { useMemo, useState } from 'react';

interface componentProps {
  side: React.ReactNode;
  children: React.ReactNode;
}

export default function BasePanelLayout({ children, side }: componentProps) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const sidebarClass = useMemo(
    () => (showSidebar ? 'start-0' : 'xl:start-0 -start-64'),
    [showSidebar],
  );

  const handleToggleNav = () => {
    setShowSidebar((v) => !v);
  };

  return (
    <div className='relative items-stretch lg:flex lg:h-screen'>
      <aside
        className={
          'fixed top-0 z-30 h-full w-64 flex-shrink-0 border-e border-gray-300 bg-gray-200 transition-all duration-700 lg:static lg:transition-none ' +
          sidebarClass
        }
      >
        {side}
      </aside>
      <section className='grow'>{children}</section>
      <button
        onClick={handleToggleNav}
        type='button'
        className='fixed start-0 top-0 z-10 flex h-16 w-16 cursor-pointer items-center justify-center text-gray-600 lg:hidden'
      >
        <BaseIconNav className='h-10' />
      </button>
      {showSidebar && (
        <button
          onClick={handleToggleNav}
          type='button'
          className='fixed start-0 top-0 z-20 h-full w-full cursor-pointer bg-black/50 lg:hidden'
        ></button>
      )}
    </div>
  );
}

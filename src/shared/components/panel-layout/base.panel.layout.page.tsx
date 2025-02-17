import React from 'react';

interface componentProps {
  title: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export default function BasePanelLayoutPage({
  children,
  actions,
  title,
}: componentProps) {
  return (
    <div className='relative h-screen overflow-y-auto'>
      <header className='sticky top-0 z-[2] flex h-16 items-center justify-between border-b border-gray-300 bg-gray-200 ps-16 pe-4 xl:ps-4'>
        <h2 className='text-lg lg:text-xl'>{title}</h2>

        {actions}
      </header>
      <div className='p-4'>{children}</div>
    </div>
  );
}

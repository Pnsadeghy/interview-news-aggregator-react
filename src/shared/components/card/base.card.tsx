import React from 'react';

interface componentProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function BaseCard({ title, children, footer }: componentProps) {
  return (
    <div className='rounded-2xl bg-white p-4 ring-1 ring-gray-200'>
      {title && <h3 className='mb-6 text-xl font-semibold'>{title}</h3>}
      <div>{children}</div>

      {footer && (
        <div className='mt-4 border-t border-gray-200 pt-4'>{footer}</div>
      )}
    </div>
  );
}

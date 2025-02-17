import React from 'react';

interface componentProps {
  children: React.ReactNode;
  submit?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function BaseButton({
  children,
  submit,
  disabled,
  className,
  onClick,
}: componentProps) {
  return (
    <button
      onClick={onClick}
      className={
        className +
        ' block h-8 rounded-lg bg-indigo-500 px-3 text-sm text-white transition enabled:cursor-pointer enabled:hover:bg-indigo-700 disabled:opacity-75'
      }
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

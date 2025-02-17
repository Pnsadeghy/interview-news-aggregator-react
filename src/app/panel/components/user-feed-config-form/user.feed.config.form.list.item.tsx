import type OptionInterface from '@/shared/interfaces/option.interface';
import { useMemo } from 'react';

interface componentProps {
  item: OptionInterface;
  selected?: boolean;
  onClick: () => void;
}

export default function UserFeedConfigFormListItem({
  item,
  selected,
  onClick,
}: componentProps) {
  const className = useMemo(
    () =>
      `block w-full text-start p-1 flex text-sm gap-1 cursor-pointer hover:opacity-60 transition ${selected && 'font-bold'}`,
    [selected],
  );
  const checkboxClassName = useMemo(
    () =>
      `h-4 w-4 ring ring-gray-200 ${selected ? 'bg-indigo-500' : 'bg-white'}`,
    [selected],
  );

  return (
    <button type='button' className={className} onClick={onClick}>
      <span className={checkboxClassName}></span>
      <span className='grow'>{item.label}</span>
    </button>
  );
}

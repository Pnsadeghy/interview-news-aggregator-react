import type OptionInterface from '@/shared/interfaces/option.interface';
import { useCallback, useMemo } from 'react';
import UserFeedConfigFormListItem from '@/app/panel/components/user-feed-config-form/user.feed.config.form.list.item';

interface componentProps {
  title: string;
  selected: string[];
  list: OptionInterface[];
  onUpdate: (selected: string[]) => void;
}

export default function UserFeedConfigFormList({
  title,
  selected,
  list,
  onUpdate,
}: componentProps) {
  const selectedList = useMemo(
    () => list.filter((s) => selected.includes(s.value)),
    [list, selected],
  );
  const unselectedList = useMemo(
    () => list.filter((s) => !selected.includes(s.value)),
    [list, selected],
  );

  const onRemoveItem = useCallback(
    (value: string) => {
      onUpdate(selected.filter((i) => i !== value));
    },
    [selected, onUpdate],
  );

  const onAddItem = useCallback(
    (value: string) => {
      onUpdate([...selected, value]);
    },
    [selected, onUpdate],
  );

  return (
    <div className='overflow-hidden rounded bg-white ring-1 ring-gray-200'>
      <h5 className='border-b border-gray-200 py-1 text-center'>{title}</h5>
      <div className='divide-y divide-gray-200 overflow-auto bg-gray-50 md:h-[calc(100vh_-_9rem)]'>
        {selectedList.map((i) => (
          <UserFeedConfigFormListItem
            key={i.value}
            item={i}
            selected
            onClick={() => onRemoveItem(i.value)}
          />
        ))}
        {unselectedList.map((i) => (
          <UserFeedConfigFormListItem
            key={i.value}
            item={i}
            onClick={() => onAddItem(i.value)}
          />
        ))}
      </div>
    </div>
  );
}

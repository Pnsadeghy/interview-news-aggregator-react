'use client';

import React, { useEffect, useRef } from 'react';
import { debounceTime, map } from 'rxjs/operators';
import { useTranslations } from 'next-intl';
import { fromEvent } from 'rxjs';

interface componentProps {
  onSearchAction: (value: string) => void;
}

export default function ArticleListSearch({ onSearchAction }: componentProps) {
  const t = useTranslations('common');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const subscription = fromEvent(inputRef.current, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
      )
      .subscribe((value) => {
        onSearchAction(value);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [onSearchAction]);

  return (
    <div className='mb-4'>
      <input
        ref={inputRef}
        type='text'
        className='h-8 w-full rounded bg-white px-2 text-sm ring-1 ring-gray-200'
        placeholder={t('search')}
      />
    </div>
  );
}

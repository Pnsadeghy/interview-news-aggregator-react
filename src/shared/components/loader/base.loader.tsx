'use client';

import BaseBoxLoading from '@/shared/components/box-loading/base.box.loading';
import React from 'react';

interface componentProps {
  children: React.ReactNode;
  loader: React.ReactNode;
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  tryAgainAction: () => void;
}

export default function BaseLoader({
  children,
  loader,
  loading,
  loaded,
  failed,
  tryAgainAction,
}: componentProps) {
  return (
    <BaseBoxLoading loading={loading}>
      {failed && (
        <button type='button' onClick={tryAgainAction}>
          Failed
        </button>
      )}
      {loading && !loaded && loader}
      {loaded && !failed && children}
    </BaseBoxLoading>
  );
}

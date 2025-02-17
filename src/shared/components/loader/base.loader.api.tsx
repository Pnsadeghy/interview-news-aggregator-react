'use client';

import React, { useCallback, useEffect, useState } from 'react';
import BaseLoader from '@/shared/components/loader/base.loader';

interface componentProps {
  apiAction: () => Promise<unknown>;
  children: React.ReactNode;
  loader: React.ReactNode;
  loading?: boolean;
}

enum Status {
  Loading,
  Loaded,
  Failed,
}

export default function BaseLoaderApi({
  apiAction,
  children,
  loader,
  loading,
}: componentProps) {
  const [status, setStatus] = useState<Status>(Status.Loading);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = useCallback(() => {
    setStatus(Status.Loading);
    apiAction()
      .then(() => {
        setStatus(Status.Loaded);
        setLoaded(true);
      })
      .catch(() => {
        setStatus(Status.Failed);
      });
  }, [apiAction]);

  return (
    <BaseLoader
      loader={loader}
      loading={status === Status.Loading || loading}
      loaded={loaded}
      failed={!loaded && status === Status.Failed}
      tryAgainAction={callApi}
    >
      {children}
    </BaseLoader>
  );
}

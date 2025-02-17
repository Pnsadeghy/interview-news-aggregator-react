'use client';

import type ArticleItemInterface from '@/modules/article/interfaces/article.item.interface';
import ArticleItem from '@/modules/article/components/item/article.item';
import BaseLoaderApi from '@/shared/components/loader/base.loader.api';
import articleApi from '@/modules/article/services/article.api';
import BaseButton from '@/shared/components/button/base.button';
import ArticleListSearch from './article.list.search';
import { useCallback, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

interface componentProps {
  apiUrl?: string;
}

export default function ArticleList({ apiUrl }: componentProps) {
  const t = useTranslations();

  const [loading, setLoading] = useState<boolean>(false);
  const [articleList, setArticleList] = useState<ArticleItemInterface[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const isEmpty = useMemo(() => articleList.length === 0, [articleList]);

  const callApi = useCallback(
    (
      data: {
        per_page?: number;
        page?: number;
        q?: string;
      } = {},
    ) =>
      new Promise<void>((resolve, reject) => {
        data = {
          per_page: 24,
          q: searchValue,
          page: 1,
          ...data,
        };
        setLoading(true);

        articleApi
          .index(data, apiUrl)
          .then((response) => {
            if (data.page === 1) {
              setArticleList(response.data.data);
            } else {
              setArticleList((v) => [...v, ...response.data.data]);
            }

            setHasMore(response.data.data.length === data.per_page);
            setPage(response.data.meta.current_page);
            resolve();
          })
          .catch(reject)
          .finally(() => setLoading(false));
      }),
    [apiUrl, searchValue],
  );

  const handleSearch = useCallback(
    async (value: string) => {
      setSearchValue(value);
      await callApi({
        q: value,
      });
    },
    [callApi],
  );

  const handleLoadMore = useCallback(async () => {
    await callApi({
      page: page + 1,
    });
  }, [page, callApi]);

  return (
    <div>
      <BaseLoaderApi
        apiAction={() => callApi()}
        loader={<div>{t('article.load')}</div>}
      >
        <ArticleListSearch onSearchAction={handleSearch} />
        {isEmpty ? (
          <div>No articles!</div>
        ) : (
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:md:grid-cols-3 2xl:grid-cols-4'>
            {articleList.map((article) => (
              <ArticleItem key={article.id} article={article} />
            ))}
          </div>
        )}

        {hasMore && (
          <BaseButton
            className='mt-8 w-full'
            disabled={loading}
            onClick={handleLoadMore}
          >
            {t(loading ? 'common.loading' : 'button.load_more')}
          </BaseButton>
        )}
      </BaseLoaderApi>
    </div>
  );
}

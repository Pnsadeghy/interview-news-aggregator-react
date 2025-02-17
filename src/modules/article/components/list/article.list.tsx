"use client"

import type ArticleItemInterface from "@/modules/article/interfaces/article.item.interface";
import BaseLoaderApi from "@/shared/components/loader/base.loader.api";
import articleApi from "@/modules/article/services/article.api";
import ArticleListSearch from './article.list.search';
import {useMemo, useState} from "react";
import ArticleItem from "@/modules/article/components/item/article.item";
import BaseButton from "@/shared/components/button/base.button";
import * as sea from "node:sea";

interface componentProps {
    apiUrl?: string
}

export default function ArticleList({apiUrl}: componentProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const [articleList, setArticleList] = useState<ArticleItemInterface[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const isEmpty = useMemo(() => articleList.length === 0, [articleList]);

    const handleSearch = async (value: string) => {
        setSearchValue(value)
        await callApi({
            q: value
        })
    }

    const handleLoadMore = async () => {
        await callApi({
            page: page + 1
        })
    }

    const callApi = (data: {
        per_page?: number
        page?: number
        q?: string
    } = {}) => new Promise<void>((resolve, reject) => {
        data = {
            per_page: 24,
            q: searchValue,
            page: 1,
            ...data
        }
        setLoading(true);

        articleApi.index(data, apiUrl).then(response => {

            if (data.page === 1) {
                setArticleList(response.data.data)
            } else {
                setArticleList(v => [...v, ...response.data.data])
            }

            setHasMore(response.data.data.length === data.per_page)
            setPage(response.data.meta.current_page)
            resolve()
        })
            .catch(reject)
            .finally(() => setLoading(false))
    });

  return (
    <div>
        <BaseLoaderApi apiAction={() => callApi()}
                       loader={<div>Getting articles ...</div>}>
          <ArticleListSearch onSearch={handleSearch} />
            {
                isEmpty
                    ? <div>No articles!</div>
                    : <div className="grid 2xl:grid-cols-4 xl:md:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 gap-4" >
                        {articleList.map(article => <ArticleItem key={article.id} article={article} />)}
                    </div>
            }

            {hasMore && <BaseButton className="w-full mt-8" disabled={loading}
                                    onClick={handleLoadMore}>
                {loading ? 'Loading...' : 'Load more' }
            </BaseButton>}
      </BaseLoaderApi>
    </div>
  );
}

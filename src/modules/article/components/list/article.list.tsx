"use client"

import type ArticleItemInterface from "@/modules/article/interfaces/article.item.interface";
import BaseLoaderApi from "@/shared/components/loader/base.loader.api";
import articleApi from "@/modules/article/services/article.api";
import ArticleListSearch from './article.list.search';
import {useMemo, useState} from "react";
import ArticleItem from "@/modules/article/components/item/article.item";

interface componentProps {
    apiUrl?: string
}

export default function ArticleList({apiUrl}: componentProps) {

    const [articleList, setArticleList] = useState<ArticleItemInterface[]>([]);

    const isEmpty = useMemo(() => articleList.length === 0, [articleList]);

    const callApi = (data: object = {}) => new Promise<void>((resolve, reject) => {
        data.per_page = 24
        articleApi.index(data, apiUrl).then(response => {
            setArticleList(response.data.data)
            resolve()
        }).catch(reject)
    })

  return (
    <div>
        <BaseLoaderApi apiAction={() => callApi()} loader={<div>Getting articles ...</div>}>
          <ArticleListSearch />
            {
                isEmpty
                    ? <div>No articles!</div>
                    : <div className="grid 2xl:grid-cols-4 xl:md:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 gap-4" >
                        {articleList.map(article => <ArticleItem key={article.id} article={article} />)}
                    </div>
            }
      </BaseLoaderApi>
    </div>
  );
}

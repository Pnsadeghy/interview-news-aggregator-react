import type ArticleItemInterface from '@/modules/article/interfaces/article.item.interface';
import ArticleItemLink from '@/modules/article/components/item/article.item.link';
import { useMemo } from 'react';

interface ComponentProps {
  article: ArticleItemInterface;
}

export default function ArticleItem({ article }: ComponentProps) {
  const showInfoLinks = useMemo(
    () =>
      article.source || (article.categories && article.categories.length > 0),
    [article],
  );

  return (
    <div className='flex flex-col bg-white p-4 ring-1 ring-gray-200 transition hover:ring-gray-400'>
      <a
        href={article.url}
        target='_blank'
        rel='noopener noreferrer'
        className='block grow hover:text-indigo-500'
      >
        <h4>{article.title}</h4>
      </a>

      {showInfoLinks && (
        <div className='article-item_info_links flex flex-wrap gap-1'>
          {article.source && (
            <ArticleItemLink href={article.source.url}>
              {article.source.title}
            </ArticleItemLink>
          )}
          {article.categories?.map((category) => (
            <ArticleItemLink key={category.id}>
              #{category.title}
            </ArticleItemLink>
          ))}
        </div>
      )}
    </div>
  );
}

import ApiLoader from '@/shared/components/loader/api.loader';
import ArticleListSearch from './article.list.search';

export default function articleList() {
  return (
    <div>
      <h3>Article list</h3>

      <ArticleListSearch />

      <ApiLoader>Inner data</ApiLoader>
    </div>
  );
}

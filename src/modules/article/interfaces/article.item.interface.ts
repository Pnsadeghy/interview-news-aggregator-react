export default interface ArticleItemInterface {
  id: string;
  slug: string;
  url: string;
  title: string;
  description: string;
  body: string;
  image: string;
  published_at: string;
  source?: {
    id: string;
    title: string;
    url: string;
  };
  categories?: {
    id: string;
    title: string;
  }[];
  authors?: {
    id: string;
    name: string;
    url: string;
  }[];
}

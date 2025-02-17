import type ArticleItemInterface from "@/modules/article/interfaces/article.item.interface";
import ArticleItemLink from "@/modules/article/components/item/article.item.link";

interface ComponentProps {
    article: ArticleItemInterface;
}

export default function ArticleItem({ article }: ComponentProps) {

    const showInfoLinks = article.source || (article.categories && article.categories.length > 0);

    return (
        <div className="bg-white p-4 flex flex-col hover:ring-1 hover:ring-gray-300 transition">
            <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-500 grow block"
            >
                <h4>{article.title}</h4>
            </a>

            {showInfoLinks && (
                <div className="flex flex-wrap gap-1 article-item_info_links">
                    {article.source && <ArticleItemLink href={article.source.url} >{article.source.title}</ArticleItemLink>}
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
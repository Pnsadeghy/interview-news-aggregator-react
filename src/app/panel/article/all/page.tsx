import {useTranslations} from "next-intl";
import BasePanelLayoutPage from "@/shared/components/panel-layout/base.panel.layout.page";
import ArticleList from "@/modules/article/components/list/article.list";

export default function ArticleAllPage() {
  const t = useTranslations();

  return (
      <BasePanelLayoutPage title={t('user.article.all.link')}>
        <ArticleList />
      </BasePanelLayoutPage>
  );
}

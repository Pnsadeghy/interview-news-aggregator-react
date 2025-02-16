import ArticleList from '@/modules/article/components/list/article.list';
import BasePanelLayoutPage from "@/shared/components/panel-layout/base.panel.layout.page";
import {useTranslations} from "next-intl";

export default function PanelMainPage() {
  const t = useTranslations();

  return (
    <BasePanelLayoutPage title={t('user.article.feed')}>
        <ArticleList />
    </BasePanelLayoutPage>
  );
}

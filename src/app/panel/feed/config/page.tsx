"use client"

import UserFeedConfigFormList from "@/app/panel/components/user-feed-config-form/user.feed.config.form.list";
import type NewsSourceItemInterface from "@/modules/newsSource/interfaces/news.source.item.interface";
import type CategoryItemInterface from "@/modules/category/interfaces/category.item.interface";
import BasePanelLayoutPage from "@/shared/components/panel-layout/base.panel.layout.page";
import type AuthorItemInterface from "@/modules/author/interfaces/author.item.interface";
import newsSourceApi from "@/modules/newsSource/services/news.source.api";
import type OptionInterface from "@/shared/interfaces/option.interface";
import BaseLoaderApi from "@/shared/components/loader/base.loader.api";
import categoryApi from "@/modules/category/services/category.api";
import userFeedApi from "@/modules/feed/services/user.feed.api";
import BaseButton from "@/shared/components/button/base.button";
import {getApiCallErrorMessage} from "@/shared/utils/api.utils";
import authorApi from "@/modules/author/services/author.api";
import {useCallback, useMemo, useState} from "react";
import {useTranslations} from "next-intl";

export default function FeedConfigPage() {
    const t = useTranslations("user.feed")

    const [loading, setLoading] = useState<boolean>(false)
    const [authors, setAuthors] = useState<OptionInterface[]|null>(null)
    const [categories, setCategories] = useState<OptionInterface[]|null>(null)
    const [newsSources, setNewsSources] = useState<OptionInterface[]|null>(null)
    const [config, setConfig] = useState<{
        sources: string[]
        authors: string[]
        categories: string[]
    }|null>(null)

    const showContent = useMemo(() =>
            authors && categories && newsSources && config
        , [authors, categories, newsSources, config])

    const loaderApiCall = () => Promise.all([
        callAuthorsApi(),
        callCategoriesApi(),
        callNewsSourcesApi(),
        callConfigApi(),
    ])

    const onUpdate = (key: string, value: string[]) => {
        setConfig({
            ...config!,
            [key]: value
        })
    }

    const onSave = async () => {
        setLoading(true)

        try {
            await userFeedApi.update(config!)
        } catch (error) {
            alert(getApiCallErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }

    const callAuthorsApi = useCallback(() => new Promise<void>((resolve, reject) => {
        if (authors) {
            resolve();
            return;
        }

        authorApi.userList().then((response) => {
            setAuthors(response.data.map((i: AuthorItemInterface) => ({
                value: i.id,
                label: i.name,
            })))
            resolve()
        }).catch(reject)
    }), [authors])

    const callCategoriesApi = useCallback(() => new Promise<void>((resolve, reject) => {
        if (categories) {
            resolve();
            return;
        }

        categoryApi.userList().then((response) => {
            setCategories(response.data.map((i: CategoryItemInterface) => ({
                value: i.id,
                label: i.title,
            })))
            resolve()
        }).catch(reject)
    }), [categories])

    const callNewsSourcesApi = useCallback(() => new Promise<void>((resolve, reject) => {
        if (newsSources) {
            resolve();
            return;
        }

        newsSourceApi.userList().then((response) => {
            setNewsSources(response.data.map((i: NewsSourceItemInterface) => ({
                value: i.id,
                label: i.title,
            })))
            resolve()
        }).catch(reject)
    }), [newsSources])

    const callConfigApi = useCallback(() => new Promise<void>((resolve, reject) => {
        if (config) {
            resolve();
            return;
        }

        userFeedApi.get().then((response) => {
            setConfig(response.data)
            resolve()
        }).catch(reject)
    }), [config])

    return (
        <BasePanelLayoutPage title={t('config.link')} actions={<BaseButton onClick={onSave} disabled={loading} >Save</BaseButton>}>
            <BaseLoaderApi apiAction={loaderApiCall} loader={<div>Getting configs...</div>}>
                {showContent && <div className="grid md:grid-cols-3 gap-8">
                    <UserFeedConfigFormList title="News sources"
                                            selected={config!.sources}
                                            list={newsSources!}
                                            onUpdate={v => onUpdate('sources', v)} />
                    <UserFeedConfigFormList title="Categories"
                                            selected={config!.categories}
                                            list={categories!}
                                            onUpdate={v => onUpdate('categories', v)} />
                    <UserFeedConfigFormList title="Authors"
                                            selected={config!.authors}
                                            list={authors!}
                                            onUpdate={v => onUpdate('authors', v)} />
                </div>}
            </BaseLoaderApi>
        </BasePanelLayoutPage>
    )
}
"use client"

import BasePanelLayoutSideMenu from "@/shared/components/panel-layout/base.panel.layout.side.menu";
import type LinkInterface from "@/shared/interfaces/link.interface";
import useAuthStore from "@/modules/auth/stores/auth.store";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function PanelLayoutSide() {
    const t = useTranslations();
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    const menuItems: LinkInterface[] = [
        {
            path: "/panel",
            label: t('user.article.feed'),
        },
        {
            path: "/panel/article/all",
            label: t('user.article.all.link'),
        },
        {
            path: "/panel/feed/config",
            label: t('user.feed.config.link'),
        }
    ];

    const handleLogout = () => {
        logout();
        router.push('/auth/login');
    }

    return (
        <div>
            <Link href="/panel" className="flex items-center h-16 px-4 bg-gray-600 text-white uppercase font-semibold" >
                {t('common.title')}
            </Link>
            <BasePanelLayoutSideMenu items={menuItems}>
                <li>
                    <button type="button" onClick={handleLogout}>
                        {t('auth.logout')}
                    </button>
                </li>
            </BasePanelLayoutSideMenu>
        </div>
    )
}
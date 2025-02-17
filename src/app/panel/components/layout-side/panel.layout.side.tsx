'use client';

import BasePanelLayoutSideMenu from '@/shared/components/panel-layout/base.panel.layout.side.menu';
import type LinkInterface from '@/shared/interfaces/link.interface';
import useAuthStore from '@/modules/auth/stores/auth.store';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCallback } from 'react';

export default function PanelLayoutSide() {
  const t = useTranslations();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const menuItems: LinkInterface[] = [
    {
      path: '/panel',
      label: t('user.article.feed'),
    },
    {
      path: '/panel/article/all',
      label: t('user.article.all.link'),
    },
    {
      path: '/panel/feed/config',
      label: t('user.feed.config.link'),
    },
  ];

  const handleLogout = useCallback(() => {
    logout();
    router.push('/auth/login');
  }, [logout, router]);

  return (
    <div>
      <Link
        href='/panel'
        className='flex h-16 items-center bg-gray-600 px-4 font-semibold text-white uppercase'
      >
        {t('common.title')}
      </Link>
      <BasePanelLayoutSideMenu items={menuItems}>
        <li>
          <button type='button' onClick={handleLogout}>
            {t('auth.logout')}
          </button>
        </li>
      </BasePanelLayoutSideMenu>
    </div>
  );
}

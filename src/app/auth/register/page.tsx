'use client';

import BaseCard from '@/shared/components/card/base.card';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import RegisterForm from './form';
import Link from 'next/link';
import React from 'react';

export default function RegisterPage() {
  const t = useTranslations();

  const router = useRouter();

  const handleRegisterSuccess = () => {
    router.push('/panel');
  };

  return (
    <BaseCard
      title={t('register.title')}
      footer={
        <Link href='/auth/login' className='text-sm text-indigo-500'>
          {t('login.link')}
        </Link>
      }
    >
      <RegisterForm onSuccess={handleRegisterSuccess} />
    </BaseCard>
  );
}

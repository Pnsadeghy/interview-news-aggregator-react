import { useTranslations } from 'next-intl';

export default function AppAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations('common');
  return (
    <div className='container mx-auto px-4'>
      <div className='flex min-h-screen items-center justify-center py-8'>
        <div className='w-96'>
          <h1 className='mb-8 block text-center text-3xl font-bold'>
            {t('title')}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}

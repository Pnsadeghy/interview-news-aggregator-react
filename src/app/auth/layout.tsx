import {useTranslations} from "next-intl";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations('common')
  return (
      <div className="container mx-auto px-4">
          <div className="min-h-screen py-8 flex items-center justify-center" >
              <div className="w-96" >
                  <h1 className="text-center block text-3xl mb-8 font-bold" >{t('title')}</h1>
                  {children}
              </div>
          </div>
      </div>
  );
}

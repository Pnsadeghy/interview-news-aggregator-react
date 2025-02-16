import { AuthProvider } from '@/modules/auth/auth.state'
import {getLocale, getMessages} from 'next-intl/server'
import {NextIntlClientProvider} from 'next-intl'
import React from "react"
import "./globals.css"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
          <NextIntlClientProvider messages={messages}>
              <AuthProvider>
                {children}
              </AuthProvider>
          </NextIntlClientProvider>
      </body>
    </html>
  )
}

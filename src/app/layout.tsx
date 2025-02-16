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
      <body className="bg-gray-100" >
          <NextIntlClientProvider messages={messages}>
              {children}
          </NextIntlClientProvider>
      </body>
    </html>
  )
}

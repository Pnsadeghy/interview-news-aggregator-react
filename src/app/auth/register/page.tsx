"use client"

import useAuthStore from "@/modules/auth/stores/auth.store"
import Card from "@/shared/components/card/card"
import {useTranslations} from "next-intl"
import React from "react"
import Link from "next/link";

export default function RegisterPage() {
    const t = useTranslations()

    return (
        <Card title={t('register.title')} footer={
            <Link href="/auth/login" className="text-sm text-indigo-500" >{t('login.link')}</Link>
        } >
           content
        </Card>
    )
}
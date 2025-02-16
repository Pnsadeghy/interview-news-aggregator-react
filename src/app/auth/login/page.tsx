"use client"

import BaseCard from "@/shared/components/card/base.card"
import LoginForm from "@/app/auth/login/form"
import { useRouter } from "next/navigation"
import {useTranslations} from "next-intl"
import Link from 'next/link'
import React from "react"

export default function LoginPage() {
    const t = useTranslations()

    const router = useRouter()

    const handleLoginSuccess = () => {
        router.push("/panel")
    }

    return (
        <BaseCard title={t('login.title')} footer={
            <Link href="/auth/register" className="text-sm text-indigo-500" >{t('register.link')}</Link>
        } >
            <LoginForm onSuccess={handleLoginSuccess} />
        </BaseCard>
    )
}
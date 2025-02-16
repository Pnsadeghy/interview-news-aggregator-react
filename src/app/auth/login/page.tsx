"use client"

import useAuthStore from "@/modules/auth/stores/auth.store"
import Card from "@/shared/components/card/card"
import {useTranslations} from "next-intl"
import Link from 'next/link'
import React from "react"

export default function LoginPage() {
    const t = useTranslations()
    const login = useAuthStore((state) => state.login)

    const onClick = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await login({
                email: "kdamore@example.net",
                password: "password"
            });
            alert('Login Successful');
        } catch (e) {
            alert('Login Failed');
            console.log(e)
        }
    }

    return (
        <Card title={t('login.title')} footer={
            <Link href="/auth/register" className="text-sm text-indigo-500" >{t('register.link')}</Link>
        } >
            <button onClick={onClick} >Test login</button>
        </Card>
    )
}
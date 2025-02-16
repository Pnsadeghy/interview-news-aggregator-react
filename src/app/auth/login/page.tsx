"use client"

import useAuthStore from "@/modules/auth/stores/auth.store"
import React from "react"

export default function LoginPage() {
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
        <div>
            <div>Login</div>

            <button onClick={onClick} >Test login</button>
        </div>
    )
}
import type AuthUserInterface from "@/modules/auth/interfaces/auth.user.interface"
import React, {createContext, useContext, useEffect, useState} from "react"
import {AUTH_TOKEN_COOKIE_KEY} from "@/shared/constants"
import authApi from "@/modules/auth/services/auth.api"
import Cookies from "js-cookie"

interface AuthContextType {
    authData: { token: string | null; user: AuthUserInterface | null }
    isLoggedIn: boolean
    login: (data: { email: string; password: string }) => Promise<void>
    register: (data: {
        name: string
        email: string
        password: string
        password_confirmation: string
    }) => Promise<void>
    loadFromCookie: () => void
    logout: () => Promise<void>
    getToken: () => string | null
}

const AUTH_DATA_COOKIE_KEY = "AUTH_DATA_COOKIE_KEY"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authData, setAuthData] = useState<{ token: string | null; user: User | null }>({
        token: null,
        user: null,
    })

    useEffect(() => {
        loadFromCookie();
    }, [])

    const loadFromCookie = () => {
        const storedToken = Cookies.get(AUTH_TOKEN_COOKIE_KEY);
        const storedData = Cookies.get(AUTH_DATA_COOKIE_KEY);
        if (storedToken && storedData) {
            setAuthData({
                token: storedToken,
                user: JSON.parse(storedData)
            })
        }
    }

    const login = async (data: { email: string; password: string }): Promise<void> => {
        try {
            const response = await authApi.login(data)
            const { access_token, token_type, user } = response.data
            setAuthDataHelper(`${token_type} ${access_token}`, user)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const register = async (data: {
        name: string
        email: string
        password: string
        password_confirmation: string
    }): Promise<void> => {
        try {
            const response = await authApi.register(data)
            const { access_token, token_type, user } = response.data
            setAuthDataHelper(`${token_type} ${access_token}`, user)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const logout = async (): Promise<void> => {
        try {
            await authApi.logout(authData.token!)
        } catch (error) {
            console.log("logout", error)
        } finally {
            Cookies.remove(AUTH_TOKEN_COOKIE_KEY);
            Cookies.remove(AUTH_DATA_COOKIE_KEY);
            setAuthData({ token: null, user: null });
        }
    }

    const getToken = () => authData.token

    const isLoggedIn = !!authData.token

    const setAuthDataHelper = (token: string, user: AuthUserInterface): void => {
        Cookies.set(AUTH_TOKEN_COOKIE_KEY, token, { expires: 7 })
        setAuthData({ token, user })
    }

    return (
        <AuthContext.Provider value={{ authData, isLoggedIn, login, register, loadFromCookie, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
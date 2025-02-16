import {AUTH_TOKEN_COOKIE_KEY} from "@/shared/constants"
import {NextRequest, NextResponse} from "next/server"

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/panel')) {
        const token = request.cookies.get(AUTH_TOKEN_COOKIE_KEY)
        if (!token) {
            const loginUrl = new URL('/auth/login', request.url)
            return NextResponse.redirect(loginUrl)
        }
    }
    return NextResponse.next()
}
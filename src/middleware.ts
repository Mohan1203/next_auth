import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const token = request.cookies.get('token')?.value;

    const publicPah = path === '/login' || path === "/signup" || path === '/verifyemail'

    if (publicPah && token) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (!token && !publicPah) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

}

export const config = {
    matcher: [
        "/",
        "/login",
        "/signup"
    ],
}

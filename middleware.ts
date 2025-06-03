import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname === "/";

    // ✅ Redirect signed-in users from landing page to /chat
    if (isAuth && isAuthPage) {
        return NextResponse.redirect(new URL("/chat", req.url));
    }

    // 🚫 Redirect unauthenticated users from /chat to /
    if (!isAuth && req.nextUrl.pathname.startsWith("/chat")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/chat"],
};
import WithAuth from "./middlewares/withAuth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function mainMiddleware(request: NextRequest){
    const url = request.nextUrl.clone();

    console.log('Requested URL:', url.pathname);
    const res = NextResponse.next();
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (url.pathname.startsWith('/guru') && token?.role !== 'guru') {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (url.pathname.startsWith('/admin') && token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (url.pathname.startsWith('/member') && token?.role !== 'member') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return res;
}

export default WithAuth(mainMiddleware, [
    'admin',
    'auth',
    'member',
    'cart',
    'editor'
])

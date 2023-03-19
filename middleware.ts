import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
   const cart = req.cookies.get('cart');
   const session: any = await getToken({ req });
   const query = req.nextUrl.searchParams.get('page');

   const { pathname = '' } = req.nextUrl;

   const url = req.nextUrl.clone();
   url.search = '';

   const validRoles = ['admin', 'super-user', 'seo'];

   if (pathname.includes('login-checkout') && session) {
      url.pathname = '/checkout';
      return NextResponse.redirect(url);
   }

   if (pathname.includes('auth') && session) {
      url.pathname = query || '/menu';
      return NextResponse.redirect(url);
   }

   if (pathname.includes('mi-cuenta') && !session) {
      url.pathname = query || '/auth/login';
      return NextResponse.redirect(url);
   }

   if (pathname.includes('pedidos') && !session) {
      url.pathname = query || '/auth/login';
      return NextResponse.redirect(url);
   }

   if (pathname.includes('checkout') && !cart) {
      url.pathname = query || '/cart/empty';
      return NextResponse.redirect(url);
   }

   if (pathname.includes('admin') && (!session || !validRoles.includes(session.user.role))) {
      url.pathname = '/';
      return NextResponse.redirect(url);
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      '/admin/:path*',
      '/auth/login-checkout/:path*',
      '/auth/:path*',
      '/mi-cuenta/:path*',
      '/pedidos/:path*',
      '/checkout/:path*',
   ],
};

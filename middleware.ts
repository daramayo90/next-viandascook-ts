import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export { default } from 'next-auth/middleware';

export async function middleware(req: NextRequest) {
   const cart = req.cookies.get('cart');
   const session = req.cookies.get('next-auth.session-token');

   const { protocol, host, pathname = '' } = req.nextUrl;

   if (pathname.includes('login-checkout') && session) {
      return NextResponse.redirect(`${protocol}//${host}/checkout`);
   }

   if (pathname.includes('login') && session) {
      return NextResponse.redirect(`${protocol}//${host}/menu`);
   }

   if (pathname.includes('register') && session) {
      return NextResponse.redirect(`${protocol}//${host}/menu`);
   }

   if (pathname.includes('mi-cuenta') && !session) {
      return NextResponse.redirect(`${protocol}//${host}/auth/login?page=${pathname}`);
   }

   if (pathname.includes('pedidos') && !session) {
      return NextResponse.redirect(`${protocol}//${host}/auth/login?page=${pathname}`);
   }

   if (pathname.includes('checkout') && !cart) {
      return NextResponse.redirect(`${protocol}//${host}/cart/empty`);
   }

   return NextResponse.next();
}

export const config = {
   matcher: [
      '/auth/login-checkout/:path*',
      '/auth/login/:path*',
      '/auth/register/:path*',
      '/mi-cuenta/:path*',
      '/pedidos/:path*',
      '/checkout/:path*',
   ],
};

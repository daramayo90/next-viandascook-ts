import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export { default } from 'next-auth/middleware';

export async function middleware(req: NextRequest) {
   const cart = req.cookies.get('cart');
   const session = req.cookies.get('next-auth.session-token');
   const query = req.nextUrl.searchParams.get('page');

   const { protocol, host, pathname = '' } = req.nextUrl;

   console.log('session', session);
   console.log('query', query);
   console.log('protocol', protocol);
   console.log('host', host);
   console.log('pathname', pathname);

   if (pathname.includes('login-checkout') && session) {
      console.log('LOGIN-CHECKOUT', `${protocol}//${host}/checkout`);
      return NextResponse.redirect(`${protocol}//${host}/checkout`);
   }

   if (pathname.includes('login') && session) {
      console.log('LOGIN', `${protocol}//${host}/checkout`);
      return NextResponse.redirect(`${protocol}//${host}${query}`);
   }

   if (pathname.includes('register') && session) {
      console.log('REGISTER', `${protocol}//${host}/checkout`);
      return NextResponse.redirect(`${protocol}//${host}${query}`);
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

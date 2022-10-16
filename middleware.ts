import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
   const cart = req.cookies.get('cart');

   const { protocol, host } = req.nextUrl;

   if (!cart) {
      return NextResponse.redirect(`${protocol}//${host}/cart/empty`);
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/checkout/:path*'],
};

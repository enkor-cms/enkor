import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { i18n } from './i18n';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import {
  createMiddlewareSupabaseClient,
  logger,
} from '@supabase/auth-helpers-nextjs';
import Negotiator from 'negotiator';
import { Database } from './lib/db_types';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  try {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (error) {
    logger.error('getLocale', error);
    return undefined;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url),
    );
  }

  // Add the second part of the code
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient<Database>({
    req: request,
    res,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if session is not found and the pathname begin with settings
  if (!session && pathname.startsWith(`/${getLocale(request)}/settings`)) {
    const redirectUrl = new URL(
      `${getLocale(request)}/auth/login`,
      request.nextUrl.origin,
    );
    redirectUrl.searchParams.set('redirect', request.nextUrl.clone().href);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// export const config = {
//   // Matcher ignoring `/_next/` and `/api/`
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

export const config = {
  // Matcher ignoring `/api/`, `/_next/static/`, `/_next/image/`, `/favicon.ico`, and files with extensions (e.g., `.css`, `.js`)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)'],
};

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();

//   const supabase = createMiddlewareSupabaseClient<Database>({ req, res });

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) {
//     const redirectUrl = new URL('/dashboard/auth/login', req.nextUrl.origin);
//     redirectUrl.searchParams.set('redirect', req.nextUrl.clone().href);
//     return NextResponse.redirect(redirectUrl);
//   }

//   return res;
// }

// export const config = {
//   matcher: ['/dashboard/settings/:path*'],
// };

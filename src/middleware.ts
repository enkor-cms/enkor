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

function getLocaleFromReferer(request: NextRequest): string | undefined {
  const referer = request.headers.get('referer');
  if (!referer) return undefined;

  const refererUrl = new URL(referer);
  const refererPath = refererUrl.pathname;

  // Check if there is any supported locale in the referer
  const refererIsMissingLocale = i18n.locales.every(
    (locale) =>
      !refererPath.startsWith(`/${locale}/`) && refererPath !== `/${locale}`,
  );

  // If there is no locale in the referer, we can't get the locale from it
  if (refererIsMissingLocale) return undefined;

  // Get the locale from the referer
  const refererLocale = refererPath.split('/')[1];
  return refererLocale;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  logger.debug(pathname);
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocaleFromReferer(request) || getLocale(request);

    logger.debug(locale);

    return NextResponse.redirect(
      new URL(
        `/${locale}/${pathname}${request.nextUrl.search}`,
        request.nextUrl.origin,
      ),
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

export const config = {
  // Matcher ignoring `/api/`, `/_next/static/`, `/_next/image/`, `/favicon.ico`, and files with extensions (e.g., `.css`, `.js`)
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};

import { RequestCookie } from 'next/dist/server/web/spec-extension/cookies';

interface IFetcherProps {
  url: string;
  method?: string;
  body?: Record<string, unknown>;
  cookies?: RequestCookie[];
  revalidation?: number;
}

export interface IFetcherResponse<T> {
  status: number;
  data: T;
}

const getAllCookies = (cookies: RequestCookie[]) => {
  return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
};

const buildUrl = (url: string) => {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:3000${url}`;
  }
  return url;
};

export const fetcher = async <T>({
  url,
  method = 'GET',
  body,
  cookies,
  revalidation = 20,
}: IFetcherProps): Promise<IFetcherResponse<T>> => {
  const cookie = getAllCookies(cookies as RequestCookie[]);
  const res = await fetch(buildUrl(url), {
    method,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie,
    } as any,
    body: JSON.stringify(body),
    next: {
      revalidate: revalidation,
    },
  });
  return {
    status: res.status,
    data: await res.json(),
  };
};

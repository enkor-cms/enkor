import { ReadonlyRequestCookies } from 'next/dist/server/app-render';
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';

interface IFetcherProps {
  url: string;
  method?: string;
  body?: any;
  cookies?: RequestCookies | ReadonlyRequestCookies;
}

interface IFetcherResponse<T> {
  status: number;
  data: T;
}

const getAllCookies = (cookies: RequestCookies | ReadonlyRequestCookies) => {
  return cookies
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');
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
}: IFetcherProps): Promise<IFetcherResponse<T>> => {
  const cookie = getAllCookies(cookies as RequestCookies);
  const res = await fetch(buildUrl(url), {
    method,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie,
    } as any,
    body: body && JSON.stringify(body),
  });
  return {
    status: res.status,
    data: await res.json(),
  };
};

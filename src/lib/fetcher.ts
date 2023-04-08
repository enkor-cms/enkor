interface IFetcherProps {
  url: string;
  method?: string;
  body?: Record<string, unknown>;
  revalidation?: number;
}

export interface IFetcherResponse<T> {
  status: number;
  data: T;
}

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
  revalidation = 20,
}: IFetcherProps): Promise<IFetcherResponse<T>> => {
  const res = await fetch(buildUrl(url), {
    method,
    headers: {
      'Content-Type': 'application/json',
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

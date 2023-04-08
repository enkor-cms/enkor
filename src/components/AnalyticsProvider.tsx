'use client';

import { Analytics } from '@vercel/analytics/react';

export const AnalyticsProvider = () => {
  return <Analytics mode="production" />;
};

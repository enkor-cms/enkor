import dynamic from 'next/dynamic';

export const LazyMarker = dynamic(
  async () => (await import('react-leaflet')).Marker,
  {
    ssr: false,
  }
);

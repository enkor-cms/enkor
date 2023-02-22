import { Sidebar } from '@/components/sidebar';
import React from 'react';
import './globals.css';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-screen h-screen flex justify-center items-center bg-white-200 dark:bg-dark-100">
        <Sidebar />
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}

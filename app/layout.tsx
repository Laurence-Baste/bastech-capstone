import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JRU SWIT',
  description: 'JRU SWIT Login System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 
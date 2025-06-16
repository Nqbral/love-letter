'use client';

import { AuthProvider } from '@contexts/AuthContext';
import { SocketProvider } from '@contexts/SocketContext';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
});
export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SocketProvider>
        <html className={`${montserrat.className}`}>
          <body>{children}</body>
        </html>
      </SocketProvider>
    </AuthProvider>
  );
}

'use client';

import { AuthProvider } from '@contexts/AuthContext';
import { SocketProvider } from '@contexts/SocketContext';
import { MedievalSharp } from 'next/font/google';

const medievalsharp = MedievalSharp({
  subsets: ['latin'],
  weight: ['400'],
});
export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SocketProvider>
        <html className={`${medievalsharp.className}`}>
          <body>{children}</body>
        </html>
      </SocketProvider>
    </AuthProvider>
  );
}

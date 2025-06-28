import App from '@components/app';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Shadow Network by Nqbral Games',
  description: "Jeu de stratégie en ligne dans le milieu de l'espionnage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <App>{children}</App>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Shadow Network',
            url: 'https://shadow-network.nqbral-games.fr/',
            alternateName: 'Nqbral Games',
            inLanguage: 'fr',
            sameAs: [
              'https://nqbral-games.fr/',
              'https://last-hope.nqbral-games.fr/',
            ],
          }),
        }}
      />
    </>
  );
}

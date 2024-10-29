'use client';

import { withTRPC } from '@trpc/next';
import { httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../trpc/pokemonRouter';

import './globals.css';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Pokedex for Madverse</title>
        <meta name="description" content="Pokedex submission for Madverse by Siddharth" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href="/pokeball.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

export default withTRPC<AppRouter>({
  config() {
    return {
      url: '/api/trpc',
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
            retry: false,
          },
        },
      },
    };
  },
  ssr: false,
})(RootLayout);

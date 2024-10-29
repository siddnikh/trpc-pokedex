import { appRouter } from "../../../../../trpc/pokemonRouter";
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createContext } from '../../../../../trpc/trpc';

export const runtime = 'nodejs';

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  });
};

export { handler as GET, handler as POST };

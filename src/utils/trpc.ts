import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../trpc/pokemonRouter';

export const trpc = createTRPCReact<AppRouter>();

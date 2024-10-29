import { router, publicProcedure } from './trpc';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const pokemonRouter = router({
  getPokemon: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      return await prisma.pokemon.findFirst({
        where: { name: input.name },
      });
    }),
  
  getPokemonArray: publicProcedure
    .input(z.object({ names: z.array(z.string()) }))
    .query(async ({ input }) => {
      return await prisma.pokemon.findMany({
        where: { name: { in: input.names } },
        select: {
          id: true,
          name: true,
          types: true,
          sprite: true,
        },
      });
    }),
  
  getPokemonByType: publicProcedure
    .input(z.object({ type: z.string().optional() }))
    .query(async ({ input }) => {
      if (!input.type) return [];
      return await prisma.pokemon.findMany({
        where: { types: { has: input.type } },
        select: {
          id: true,
          name: true,
          types: true,
          sprite: true,
        },
      });
    }),
});

export const appRouter = router({
  pokemon: pokemonRouter,
});

export type AppRouter = typeof appRouter;

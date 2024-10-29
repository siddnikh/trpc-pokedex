import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pokemonData = [
    {
      id: 1,
      name: 'Bulbasaur',
      types: ['grass'],
      sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png',
    },
    {
      id: 2,
      name: 'Charmander',
      types: ['fire'],
      sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png',
    },
    {
      id: 3,
      name: 'Squirtle',
      types: ['water'],
      sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png',
    },
    {
      id: 4,
      name: 'Pikachu',
      types: ['electric'],
      sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png',
    },
    {
      id: 5,
      name: 'Eevee',
      types: ['normal'],
      sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png',
    },
    {
      id: 6,
      name: 'Jigglypuff',
      types: ['normal', 'fairy'],
      sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/039.png',
    },
    {
      id: 7,
      name: 'Caterpie',
      types: ['bug'],
      sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/010.png',
    },
    {
      id: 8,
      name: 'Weedle',
      types: ['bug', 'poison'],
      sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/013.png',
    },
    {
      id: 9,
      name: 'Pidgey',
      types: ['normal', 'flying'],
      sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/016.png',
    },
    {
      id: 10,
      name: 'Rattata',
      types: ['normal'],
      sprite: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/019.png',
    },
  ];

  for (const pokemon of pokemonData) {
    await prisma.pokemon.upsert({
      where: { id: pokemon.id },
      update: {},
      create: pokemon,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

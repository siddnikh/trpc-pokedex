import React, { useState } from 'react';
import { trpc } from '../utils/trpc';
import PokemonTypeSelection from './PokemonTypeSelection';
import PokedexTable from './PokedexTable';

const FilterablePokedexTable: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const { data: pokemonArray } = trpc.pokemon.getPokemonByType.useQuery({ type: selectedType }, { enabled: !!selectedType });

  return (
    <div>
      <PokemonTypeSelection selectedType={selectedType} selectType={setSelectedType} />
      {pokemonArray && <PokedexTable pokemonArray={pokemonArray} />}
    </div>
  );
};

export default FilterablePokedexTable; 
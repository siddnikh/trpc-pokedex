import React from 'react';
import Image from 'next/image';

interface PokemonRowProps {
  name: string;
  sprite: string;
  types: string[];
}

const PokemonRow: React.FC<PokemonRowProps> = ({ name, sprite, types }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#4A775D] rounded-lg p-4">
      <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">{name}</h2>
      <Image src={sprite} alt={name} width={100} height={100} className="w-20 sm:w-[100px]" />
      <p className="text-base sm:text-lg">Type: {types.join(', ')}</p>
    </div>
  );
};

export default PokemonRow; 
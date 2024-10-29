import React from 'react';
import { Pokemon } from '@prisma/client';
import Image from 'next/image';

interface PokedexTableProps {
  pokemonArray: Pokemon[]; // Array of Pokémon to display
}

const PokedexTable: React.FC<PokedexTableProps> = ({ pokemonArray }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pokemonArray.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pokemonArray.length / itemsPerPage);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-[#4A775D] rounded-lg text-white">
          <thead className="border-b border-[#5B886E]">
            <tr>
              <th className="p-2 md:p-4 text-left text-sm md:text-base">Name</th>
              <th className="p-2 md:p-4 text-left text-sm md:text-base">Sprite</th>
              <th className="p-2 md:p-4 text-left text-sm md:text-base">Types</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#5B886E]">
            {currentItems.map((pokemon) => (
              <tr key={pokemon.id} className="hover:bg-[#5B886E] transition-colors">
                <td className="p-2 md:p-4 text-sm md:text-base font-medium">{pokemon.name}</td>
                <td className="p-2 md:p-4">
                  <div className="flex justify-center sm:justify-start">
                    <Image 
                      src={pokemon.sprite} 
                      alt={pokemon.name} 
                      width={48} 
                      height={48} 
                      className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain"
                    />
                  </div>
                </td>
                <td className="p-2 md:p-4 text-sm md:text-base">{pokemon.types.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-4 px-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-full sm:w-auto px-4 py-2 bg-[#4A775D] text-white rounded disabled:opacity-50 hover:bg-[#5B886E] transition-colors text-sm md:text-base"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm md:text-base">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-full sm:w-auto px-4 py-2 bg-[#4A775D] text-white rounded disabled:opacity-50 hover:bg-[#5B886E] transition-colors text-sm md:text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokedexTable; 
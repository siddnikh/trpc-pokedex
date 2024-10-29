"use client";

import { useState } from "react";
import { trpc } from "../utils/trpc";
import PokemonRow from "../components/PokemonRow";
import PokedexTable from "../components/PokedexTable";
import FilterablePokedexTable from "../components/FilterablePokedexTable";

export default function HomePage() {
  const [singlePokemonName, setSinglePokemonName] = useState("Bulbasaur");
  const [multiplePokemonName, setMultiplePokemonName] = useState("");

  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const { data: singlePokemon, refetch: refetchSingle, isLoading: singlePokemonLoading } =
    trpc.pokemon.getPokemon.useQuery({ name: singlePokemonName });
  const { data: pokemonArray, refetch: refetchArray, isLoading: multiplePokemonLoading } =
    trpc.pokemon.getPokemonArray.useQuery(
      { names: pokemonNames },
      { enabled: false }
    );

  const handleSingleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && singlePokemonName) {
      refetchSingle();
    }
  };

  const handleMultipleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === " ") && multiplePokemonName.trim()) {
      setPokemonNames((prev) => [...prev, multiplePokemonName.trim()]);
      setMultiplePokemonName("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setPokemonNames((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white p-4 sm:p-8 rounded-lg shadow-lg font-press-start">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-4">Pokedex</h1>
      <input
        type="text"
        value={singlePokemonName}
        onChange={(e) => setSinglePokemonName(e.target.value)}
        onKeyDown={handleSingleKeyDown}
        placeholder="Enter single Pokémon name"
        className="border-2 border-green-500 rounded-lg p-2 mb-2 sm:mb-4 w-full text-black text-sm sm:text-base"
      />
      <button
        onClick={() => {
          refetchSingle();
        }}
        className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 rounded-lg mb-4 text-sm sm:text-base"
      >
        Fetch Single Pokemon
      </button>
      {singlePokemonLoading && <i className="fa fa-spinner fa-spin"></i>}
      {singlePokemon && (
        <div className="mt-12">
          <PokemonRow
            name={singlePokemon.name}
            sprite={singlePokemon.sprite}
            types={singlePokemon.types}
          />
        </div>
      )}
      <div className="mt-8 sm:mt-12">
        <input
          type="text"
          value={multiplePokemonName}
          onChange={(e) => setMultiplePokemonName(e.target.value)}
          onKeyDown={handleMultipleKeyDown}
          placeholder="Enter multiple Pokémon names"
          className="border-2 border-green-500 rounded-lg p-2 mb-2 sm:mb-4 w-full text-black text-sm sm:text-base"
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {pokemonNames.map((name, index) => (
            <span
              key={index}
              className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center"
            >
              {name}
              <button
                onClick={() => removeTag(index)}
                className="ml-2 hover:text-red-200"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <button
          onClick={() => {
            refetchArray();
          }}
          className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 rounded-lg mb-4 text-sm sm:text-base"
        >
          Fetch Multiple Pokemon
        </button>
      </div>
      {multiplePokemonLoading && <i className="fa fa-spinner fa-spin"></i>}
      {pokemonArray && <PokedexTable pokemonArray={pokemonArray} />}
      <div className="mt-12">
        <p className="text-lg font-bold mb-4">Pokemon by Type</p>
        <FilterablePokedexTable />
      </div>
    </div>
  );
}

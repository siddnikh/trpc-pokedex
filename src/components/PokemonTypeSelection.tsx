import React from "react";

type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
};

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
  selectedType,
  selectType,
}) => {
  const types = [
    "grass",
    "fire",
    "water",
    "electric",
    "flying",
    "poison",
    "bug",
    "normal",
    "fairy",
  ];

  return (
    <div className="w-full">
      <select
        value={selectedType}
        onChange={(e) => selectType(e.target.value)}
        className="w-full max-w-md border-2 border-green-500 rounded-lg text-black
                 text-sm sm:text-base
                 p-2 sm:p-3
                 mb-3 sm:mb-4
                 bg-white
                 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent
                 transition-all duration-200 ease-in-out"
      >
        <option value="">Select a type</option>
        {types.map((type) => (
          <option key={type} value={type} className="capitalize">
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonTypeSelection;

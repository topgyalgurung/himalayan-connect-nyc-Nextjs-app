"use client";

import { useState } from "react";

const boroughs = [
  { id: 1, name: "Manhattan" },
  { id: 2, name: "Brooklyn" },
  { id: 3, name: "Queens" },
  { id: 4, name: "Bronx" },
  { id: 5, name: "Staten Island" },
];

export default function BoroughFilter() {
  const [selectedBoroughs, setSelectedBoroughs] = useState<number[]>([]);

  const handleBoroughChange = (boroughId: number) => {
    setSelectedBoroughs(
      (prevSelected) =>
        prevSelected.includes(boroughId)
          ? prevSelected.filter((id) => id !== boroughId) // Remove if already selected
          : [...prevSelected, boroughId] // Add to selected boroughs
    );
  };

  const clearFilters = () => {
    setSelectedBoroughs([]);
    // onFilterChange([]);
  };

  return (
    <div className="p-4 border rounded-md text-black">
      <div className="flex items-center">
        <h3 className="text-black font-bold mb-2">Filter </h3>
        <span className="mx-2 border-l border-gray-300 h-6" />
        {/* Vertical divider */}
        <button onClick={clearFilters} className="text-black-500 ml-2">
          &times;
        </button>
      </div>
      {boroughs.map((borough) => (
        <div key={borough.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={`borough-${borough.id}`}
            checked={selectedBoroughs.includes(borough.id)}
            onChange={() => handleBoroughChange(borough.id)}
            className="mr-2"
          />
          <label htmlFor={`borough-${borough.id}`} className="cursor-pointer">
            {borough.name}
          </label>
        </div>
      ))}
    </div>
  );
}

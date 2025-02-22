"use client";

import { useState } from "react";

const categories = [
  { id: 1, name: "community" },
  { id: 2, name: "legal" },
  { id: 3, name: "health" },
  { id: 4, name: "education" },
  { id: 5, name: "finance" },
  { id: 6, name: "real estate" },
];

type ResourceFilterProps = {
  onFilterChange: (selectedCategories: string[]) => void;
};

export default function ResourceFilter({
  onFilterChange,
}: ResourceFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // Remove if already selected
          : [...prev, category] // Add if not selected
    );

  };

  const clearFilters = () => {
    setSelectedCategories([]);
    // onFilterChange([]);
  };

  return (
    <div className="p-4 border rounded-md text-black">
      <div className="flex items-center">
        <h3 className="text-lg font-bold mb-2">Filter</h3>
        <span className="mx-2 border-l border-gray-300 h-6" />
        {/* Vertical divider */}
        <button onClick={clearFilters} className="text-black-900 ml-2">
          &times;
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        {categories.map((cat) => (
          <label key={cat.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={cat.name}
              checked={selectedCategories.includes(cat.name)}
              onChange={() => handleCategoryChange(cat.name)}
              className="w-4 h-4"
            />
            <span className="capitalize">{cat.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

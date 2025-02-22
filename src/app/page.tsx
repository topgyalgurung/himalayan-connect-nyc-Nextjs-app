"use client";
import Image from "next/image";
import { useState } from "react";
import ResourceFilter from "./(homepage)/filter/ResourceFilter";
import BoroughFilter from "./(homepage)/filter/BoroughFilter";
import ResourceList from "./(homepage)/resources/ResourceList";

// you can also generate metadata on the fly
// export async function generateMetadata({params}:any){}

export default function Home() {
  // State for selected categories and boroughs
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);

  // Function to handle category selection
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  // Function to handle borough selection
  const handleBoroughChange = (boroughs: string[]) => {
    setSelectedBoroughs(boroughs);
  };
  return (
    <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)] text-black">
      {/* Left: Filter Sidebar */}
      <aside className="w-52 bg-white shadow-md p-4 overflow-y-auto">
        <ResourceFilter />
        <BoroughFilter />
      </aside>

      {/* Middle: Resources List (Takes Full Space) */}
      <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
        <ResourceList
          selectedCategories={selectedCategories}
          selectedBoroughs={selectedBoroughs}
        />
      </main>

      {/* Right: Map Display */}
      <aside className="w-[800px] bg-white shadow-md p-4 overflow-y-auto">
        {/* <Map /> */}
      </aside>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("query", searchQuery);
    } else {
      params.delete("query");
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex ">
      <input
        type="search"
        placeholder="Search name, category or location"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-m focus:outline-none w-3/4"
      />
      <button
        type="submit"
        className="ml-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Search
      </button>
    </form>
  );
}

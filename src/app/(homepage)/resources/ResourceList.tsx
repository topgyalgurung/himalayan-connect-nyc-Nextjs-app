// app/components/resources/ResourcesList.tsx
"use client";
import { useState } from "react";
import ResourceCard from "./ResourceCard"; // Assuming Resource is your resource type

const resources = [
  {
    id: 1,
    name: "Community Center",
    category: "community",
    borough: "Brooklyn",
    openDays: "Mon-Fri",
    openTime: "9:00 AM",
    closeTime: "5:00 PM",
    phone: "(718) 123-4567",
  },
  {
    id: 2,
    name: "Legal Aid Society",
    category: "legal",
    borough: "Manhattan",
    openDays: "Mon-Fri",
    openTime: "8:30 AM",
    closeTime: "6:00 PM",
    phone: "(212) 987-6543",
  },
  {
    id: 3,
    name: "Health Clinic",
    category: "health",
    borough: "Queens",
    openDays: "Mon-Sat",
    openTime: "7:00 AM",
    closeTime: "7:00 PM",
    phone: "(347) 555-7890",
  },
  {
    id: 4,
    name: "Library",
    category: "education",
    borough: "Bronx",
    openDays: "Mon-Sun",
    openTime: "10:00 AM",
    closeTime: "6:00 PM",
    phone: "(718) 321-0987",
  },
  {
    id: 5,
    name: "Finance Advisory",
    category: "finance",
    borough: "Staten Island",
    openDays: "Mon-Fri",
    openTime: "9:00 AM",
    closeTime: "4:00 PM",
    phone: "(718) 222-3333",
  },
  {
    id: 6,
    name: "Real Estate Agency",
    category: "real estate",
    borough: "Brooklyn",
    openDays: "Mon-Sat",
    openTime: "9:30 AM",
    closeTime: "6:30 PM",
    phone: "(347) 888-7777",
  },
];

type ResourceListProps = {
  selectedCategories?: string[];
  selectedBoroughs?: string[];
};

export default function ResourceList({
  selectedCategories = [],
  selectedBoroughs = [],
}: ResourceListProps) {
  const filteredResources = resources.filter(
    (resource) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(resource.category)) &&
      (selectedBoroughs.length === 0 ||
        selectedBoroughs.includes(resource.borough)) &&
      (selectedBoroughs.length === 0 ||
        selectedBoroughs.includes(resource.borough)) // Adjust based on how boroughId is stored
  );
  return (
    <div className="w-full">
      <h3 className="text-lg font-bold mb-4">Resources</h3>
      {filteredResources.length > 0 ? (
        <ul className="space-y-4">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              name={resource.name}
              category={resource.category}
              borough={resource.borough}
              openDays={resource.openDays}
              openTime={resource.openTime}
              closeTime={resource.closeTime}
              phone={resource.phone}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No resources found.</p>
      )}
    </div>
  );
}

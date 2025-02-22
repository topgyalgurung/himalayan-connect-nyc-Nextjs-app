"use client";
import Link from "next/link";

type ResourceProps = {
  id: string;
  name: string;
  category: string;
  borough: string;
  openDays: string;
  openTime: string;
  closeTime: string;
  image: string | null;
  phone: string;
};

export default function ResourceCard({
  id,
  name,
  category,
  borough,
  openDays,
  openTime,
  closeTime,
  image,
  phone,
}: ResourceProps) {
  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <h4 className="text-lg font-bold">{name}</h4>
      <p className="text-gray-600 capitalize">
        {category} - {borough}
      </p>
      <p className="text-gray-500">
        <strong>Open:</strong> {openDays}, {openTime} - {closeTime}
      </p>
      <p className="text-gray-500">
        <strong>Phone:</strong> {phone}
      </p>
      <div>
        <img
          src={image ?? "/mememan.webp"}
          alt="`${name}'s profile"
          className=""
        />
      </div>
      <div>
        <Link href={`/resources/${id}`}>View Details</Link>
      </div>
    </div>
  );
}

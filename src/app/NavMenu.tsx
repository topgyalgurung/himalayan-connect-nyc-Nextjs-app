"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchInput from "../components/SearchInput";

export default function NavMenu() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <Link
        href="/"
        className={pathname === "/" ? "font-bold mr-4" : "mr-4 text-blue-500"}
      >
        <Image
          src="/logo.png"
          alt="Himalayan Connect Logo"
          width={60}
          height={30}
          className="cursor-pointer"
        />
      </Link>
      {/* Search input  */}

      <div className=" flex-grow mx-4 flex justify-center">
        <SearchInput />
      </div>
      <div className="flex items-center ml-4">
        <Link
          href="/add-resource"
          className={
            pathname === "/add-resource"
              ? "font-bold mr-4"
              : "ml-3 text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
          }
        >
          Add Resource
        </Link>

        <Link
          href="/login"
          className={
            pathname === "/login"
              ? "font-bold mr-4"
              : "ml-5 text-white bg-blue-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
          }
        >
          Login / Sign up
        </Link>
      </div>

      {/* 
      <Link
        href="/resources/1"
        className={
          pathname.startsWith("/resources/1")
            ? "font-bold mr-4"
            : "mr-4 text-blue-500"
        }
      >
        Resource1
      </Link> */}
    </nav>
  );
}

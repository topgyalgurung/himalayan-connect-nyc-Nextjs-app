"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successful");
      router.push("/login");
    } catch (error: unknown) {
      console.log(error);
      toast.error(error);
    }
  };
  // run it with button click. you can also make it run with useEffect as soon as page loads
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setUserData(res.data.data.id);
    } catch (error: unknown) {
      console.log("Did not get the data");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1> Profile Page</h1>
      <hr />
      <h2 className="p-1 rounded bg-black-500">
        {userData === "nothing" ? (
          "Nothing here"
        ) : (
          <Link href={`/profile/${userData}`}> {userData}</Link>
        )}
      </h2>

      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounder"
        onClick={logout}
      >
        Logout
      </button>

      <button
        className="bg-green-500 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounder"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
}

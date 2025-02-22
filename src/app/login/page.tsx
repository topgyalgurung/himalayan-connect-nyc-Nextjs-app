"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error || "Login failed. Please try again.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("Login failed:", errorMessage);
      // set error message from backend
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-center text-white text-3xl">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr />
      <br />

      {/* <label htmlFor="email"> Email</label> */}
      <input
        className="text-black p-1 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      {/* <label htmlFor="password"> password</label> */}
      <div className="flex justify-end mt-1">
        <Link
          href="/passwordforgot"
          className="text-sm text-blue-400 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <input
        className="text-black p-1 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounder-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Login here
      </button>

      <Link href="/signup"> Visit Signup page</Link>
    </div>
  );
}

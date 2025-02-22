"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      console.log("Sending signup data: ", user);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: unknown) {
      console.log("Sign up failed !!!", error);
      // use toast
      toast.error(error instanceof Error ? error.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.firstName.length > 0 &&
      user.lastName.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-center text-white text-3xl">
        {" "}
        {loading ? "Processing" : "Signup"}
      </h1>
      <br />

      <input
        className="text-black p-1 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        placeholder="first name"
      />

      <input
        className="text-black p-1 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        placeholder="last name"
      />
      <input
        className="text-black p-1 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <input
        className="text-black p-1 border border-gray-50 rounded-md mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounder-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Link href="/login"> Visit login page</Link>
    </div>
  );
}

"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ForgotPassword() {
  // const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // when user submit email for password reset
  // axios request send to backend
  const handleSubmit = async () => {
    // e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/users/forgotpassword", {
        email,
      });
      setSuccess(true);
    } catch (error: unknown) {
      console.error("An error occurred: ", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full space-y-4"
      >
        <h2 className="text-xl text-black font-semibold text-center">
          Forgot Password
        </h2>

        <label htmlFor="email" className="text-gray-700 font-medium">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full disabled:bg-gray-400"
        >
          {loading ? "Sending..." : "Request Reset Link"}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <Link href="/login" className="mt-4 text-blue-600 hover:underline">
        Back to Login
      </Link>
      {success && <p> Check your email for password reset link </p>}
    </div>
  );
}

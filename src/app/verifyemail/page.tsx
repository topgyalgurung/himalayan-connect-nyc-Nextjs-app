"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
// import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  //memoize ensuring it is not re-created on every render, changes only with token
  const verifyUserEmail = useCallback(async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: unknown) {
      setError(true);
      console.error("Verification failed:", error);
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  // improved version using useSearchParams
  // const searchParams = useSearchParams();
  // const token = searchParams.get("token") || "";

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email </h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : " no token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified </h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500">Error: {error}</h2>
        </div>
      )}
    </div>
  );
}

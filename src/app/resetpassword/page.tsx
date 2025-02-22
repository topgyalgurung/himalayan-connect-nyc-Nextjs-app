"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";
  // const [token, setToken] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!token) {
      setError("Token is missing.");
      return;
    }
    try {
      setLoading(true);
      console.log("token to send: ", token);
      await axios.post("/api/users/resetpassword", {
        token, // pass token from the URL
        password: newPassword,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error || "Reset failed. Please try again.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("Reset failed:", errorMessage);
      // set error message from backend
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Reset Password</h1>
      {/* <h2> {token ? `${token}` : "no token"}</h2> */}
      {success ? (
        <div>
          <p className="text-green-500">Password reset successful! ✅</p>
          <Link href="/login">Go to Login</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="new-password">New Password: </label>
          <input
            id="new-password"
            type="password"
            placeholder="New  password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 text-black border border-gray-300 rounded"
          />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="p-2 text-black border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {error && <div className="text-red-500">{error}</div>}
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
      <Link href="/login"> Back to Login</Link>
    </div>
  );
}

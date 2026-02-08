"use client";

import { AuthInput } from "@/components/ui/AuthInput";
import { AuthLogoEye } from "@/components/ui/AuthLogoEye";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";

// Disable static generation - page should render dynamically
export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="layout-shell py-16">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check token and show error if missing
  if (!token) {
    return (
      <main className="w-full px-4 flex items-center">
        <div
          className="
            mx-auto 
            w-[500px]
            bg-[#1A1A1A]
            rounded-[12px]
            shadow-[0_20px_50px_rgba(0,0,0,0.55)]
            p-[30px]
            flex flex-col gap-6
          "
        >
          <AuthLogoEye />
          <h1 className="font-sans-serif text-2xl font-bold text-center">
            Invalid Token
          </h1>
          <p className="font-sans-serif text-sm text-gray-400 font-bold text-center">
            Invalid or missing token. Please request a new password reset link.
          </p>
          <div className="flex flex-row items-center justify-center gap-1">
            <Link
              href="/auth/forgot-password"
              className="font-sans-serif text-sm text-secondary-purple font-bold"
            >
              Request new link
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== confirm) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch {
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <main className="w-full px-4 flex items-center">
        <div
          className="
            mx-auto 
            w-[500px]
            bg-[#1A1A1A]
            rounded-[12px]
            shadow-[0_20px_50px_rgba(0,0,0,0.55)]
            p-[30px]
            flex flex-col gap-6
          "
        >
          <AuthLogoEye />
          <h1 className="font-sans-serif text-2xl font-bold text-center text-white">
            Password Updated
          </h1>
          <div className="flex flex-col p-6 gap-4 border-[1px] border-[#3A3A3A] rounded-[12px]">
            <p className="font-sans-serif text-sm text-gray-400 font-bold text-center">
              Your password has been successfully updated. Redirecting to
              login...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full px-4 flex items-center">
      <div
        className="
          mx-auto 
          w-[500px]
          bg-[#1A1A1A]
          rounded-[12px]
          shadow-[0_20px_50px_rgba(0,0,0,0.55)]
          p-[30px]
          flex flex-col gap-6
        "
      >
        <AuthLogoEye />
        <h1 className="font-sans-serif text-2xl font-bold text-center text-white">
          Set a new password
        </h1>
        <form
          onSubmit={submit}
          className="flex flex-col p-5 gap-6 border-[1px] border-[#3A3A3A] rounded-[12px]"
        >
          <AuthInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(""); // Clear error on input
            }}
            error={error}
            placeholder="New password"
          />

          <AuthInput
            label="Password repeat"
            type="password"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              setError(""); // Clear error on input
            }}
            error={error}
            placeholder="Repeat password"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full flex items-center justify-center px-4 py-2 rounded-md bg-secondary-purple text-white font-sans-serif text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save password"}
          </button>
        </form>
        <div className="flex flex-row items-center justify-center gap-1">
          <p className="font-sans-serif text-sm text-gray-400 font-bold">
            Remembered your password?
          </p>
          <Link
            href="/auth/login"
            className="font-sans-serif text-sm text-white font-bold"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}

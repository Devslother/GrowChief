"use client";

import { AuthInput } from "@/components/ui/AuthInput";
import { AuthLogoEye } from "@/components/ui/AuthLogoEye";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // показываю ли экран "письмо отправлено"
  const [submitted, setSubmitted] = useState(false);
  // показываю ли баннер сверху
  const [showBanner, setShowBanner] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (!email.includes("@")) {
      setEmailError("email must be an email");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!isValid) return;

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setEmailError(data.error || "Something went wrong");
        return;
      }

      setSubmitted(true); // переключаю контент
      setShowBanner(true); // показываю баннер

      setTimeout(() => {
        setShowBanner(false);
      }, 4000); // убираю баннер через 4 сек
    } catch (error) {
      console.error("❌ Forgot password error:", error);
      setEmailError("Something went wrong. Please try again.");
    }
  };

  const handleTryAgain = () => {
    setSubmitted(false);
    setEmail("");
    setEmailError("");
  };

  return (
    <main className="w-full px-4 flex flex-col items-center">
      {/* баннер сверху */}
      {showBanner && (
        <div className="my-10 flex items-center gap-3 w-full max-w-[500px] rounded-md bg-gray-600 p-4 text-base font-sans-serif font-bold text-white">
          {/* Иконка */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" fill="#26a764" />
            <path
              d="M16.5 9l-6.7 6.7L7.5 13.4"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>Check your inbox for password reset instructions.</span>
        </div>
      )}

      <div className="mx-auto w-[500px] bg-[#1A1A1A] rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.55)] p-[30px] flex flex-col gap-6">
        <AuthLogoEye />
        <h1 className="font-sans-serif text-2xl font-bold text-center text-secondary-purple">
          Forgot Password
        </h1>
        <p className="font-sans-serif text-sm text-gray-400 font-bold text-center">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
        {/* если еще не отправляли форму */}
        {!submitted && (
          <form
            onSubmit={onSubmit}
            className="flex flex-col p-5 gap-6 border-[1px] border-[#3A3A3A] rounded-[12px]"
          >
            <AuthInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(""); // очищаю ошибку
              }}
              error={emailError}
              placeholder="m@example.com"
            />

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full flex items-center justify-center px-4 py-2 rounded-md bg-secondary-purple text-white font-sans-serif text-sm font-bold"
            >
              Send Reset Link
            </button>
          </form>
        )}

        {/* экран после отправки */}
        {submitted && (
          <div className="flex flex-col p-6 gap-4 border-[1px] border-[#3A3A3A] rounded-[12px]">
            <h2 className="font-sans-serif text-lg font-bold">
              Check your email
            </h2>
            <p className="font-sans-serif text-sm text-gray-400 font-bold">
              We&apos;ve sent you a password reset link. Please check your
              inbox.
            </p>

            <button
              type="button"
              onClick={handleTryAgain}
              className="h-[44px] w-full rounded-md px-4 bg-transparent border border-[#3A3A3A] text-gray-400 font-sans-serif text-sm font-bold"
            >
              Try again with a different email
            </button>
          </div>
        )}

        <div className="flex flex-row items-center justify-center gap-1">
          <p className="font-sans-serif text-sm text-gray-400 font-bold">
            Remembered your password?
          </p>
          <Link
            href="/auth/login"
            className="font-sans-serif text-sm text-secondary-purple font-bold"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}

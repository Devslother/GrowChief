// RegisterForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import GoogleLogo from "@/public/icons/Googlelogo.svg";
import { AuthInput } from "../ui/AuthInput";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");

  // показываю ли экран "письмо отправлено"
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPassError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPassError("");
    }

    if (confirmPassword !== password) {
      setConfirmPassError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPassError("");
    }

    if (companyName.trim().length < 3) {
      setCompanyNameError("Company name must be at least 3 characters");
      isValid = false;
    } else {
      setCompanyNameError("");
    }

    if (!isValid) return;

    // Регистрация пользователя
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, companyName }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setEmailError("User with this email already exists");
        } else {
          setPassError(data.error || "Something went wrong. Please try again.");
        }
        return;
      }

      // Если всё прошло успешно → автоматически логиним пользователя
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        // Если автологин не удался, показываем сообщение об успешной регистрации
        setSubmitted(true);
      } else {
        // Если автологин успешен → редирект на главную
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Registration error:", error);
      setPassError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSignIn = () => {
    // провайдер "google" будет в конфиге next-auth
    signIn("google", {
      callbackUrl: "/", // или "/dashboard"
    });
  };

  return (
    <>
      {/* если еще не отправляли форму */}
      {!submitted && (
        <form onSubmit={onSubmit} className="flex flex-col px-5 pb-5 gap-6">
          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-md bg-white"
          >
            <GoogleLogo />
            <span className="font-sans-serif text-base font-bold text-black">
              Continue with Google
            </span>
          </button>

          {/* Email */}
          <AuthInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(""); // очищаю ошибку
            }}
            error={emailError}
            placeholder="m@example.com"
          />

          {/* Password */}
          <AuthInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPassError(""); // очищаю ошибку
            }}
            error={passError}
          />

          {/* Confirm Password */}
          <AuthInput
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPassError(""); // очищаю ошибку
            }}
            error={confirmPassError}
          />

          {/* Company Name */}
          <AuthInput
            label="Company"
            type="text"
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
              setCompanyNameError(""); // очищаю ошибку
            }}
            error={companyNameError}
            placeholder="Your company name"
          />

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full flex items-center justify-center px-[18px] py-[10px] rounded-md bg-secondary-purple text-white font-sans-serif text-sm font-bold"
          >
            Create account
          </button>
        </form>
      )}
      {/* если уже отправляли форму */}
      {submitted && (
        <div className="flex flex-col gap-6 text-center">
          <div className="flex flex-col gap-4 bg-transparent border border-[#3A3A3A] rounded-md p-6">
            <h1 className="font-sans-serif text-xl font-bold text-secondary-purple">
              Account created successfully
            </h1>
            <p className="font-sans-serif text-base text-gray-300 font-bold">
              We&apos;ve sent an activation link to {email}.
            </p>
            <p className="font-sans-serif text-sm text-gray-400 font-bold">
              Please check your email and click the activation link to complete
              your registration.
            </p>
          </div>

          <p className="font-sans-serif text-sm text-gray-400">
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <Link
              href="/auth/register"
              className="font-sans-serif text-sm text-secondary-purple font-bold"
            >
              try again
            </Link>
          </p>
        </div>
      )}
    </>
  );
}

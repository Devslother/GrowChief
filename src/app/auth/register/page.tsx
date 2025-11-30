"use client";
import RegisterForm from "@/components/forms/RegisterForm";
import { AuthLogoEye } from "@/components/ui/AuthLogoEye";
import Link from "next/link";

export default function RegisterPage() {
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
        {/* логотип + Grow */}
        <AuthLogoEye />

        <h1 className="font-sans-serif text-2xl font-bold text-center">
          Create an account
        </h1>

        <RegisterForm />
        <div className="flex flex-row items-center justify-center gap-1">
          <p className="font-sans-serif text-sm text-gray-300 font-bold">
            Already have an account?
          </p>
          <Link
            href="/auth/login"
            className="font-sans-serif text-sm text-white font-bold"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}

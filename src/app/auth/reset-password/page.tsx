"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

// Отключаем статическую генерацию - страница должна рендериться динамически
export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="layout-shell py-16">
        <p className="text-red-400">Invalid or missing token.</p>
      </div>
    );
  }

  const submit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/auth/login"), 2000);
  };

  return (
    <div className="layout-shell max-w-md mx-auto py-16">
      <h1 className="text-2xl mb-6">Set a new password</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          type="password"
          placeholder="New password"
          className="w-full rounded-xl border p-3 bg-black text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Repeat password"
          className="w-full rounded-xl border p-3 bg-black text-white"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">Password updated</p>}

        <button className="btn_primary rounded-xl px-6 py-3">
          Save password
        </button>
      </form>
    </div>
  );
}

// src/app/auth/layout.tsx
import { SessionProvider } from "@/components/providers/SessionProvider";
export const metadata = {
  title: "Auth — GrowChief",
  description: "Login and registration",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen flex items-center justify-center">
        {children}
      </div>
    </SessionProvider>
  );
}

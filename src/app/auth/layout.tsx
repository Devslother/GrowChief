// src/app/auth/layout.tsx
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
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}

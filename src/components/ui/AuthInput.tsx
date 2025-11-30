import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hideLabel?: boolean;
  error?: string;
  placeholder?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, hideLabel = false, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {!hideLabel && label && (
          <label className="text-sm text-white font-bold">{label}</label>
        )}

        <input
          ref={ref}
          {...props}
          className={cn(
            "h-[44px] w-full rounded-md px-3 py-2 bg-transparent border border-[#3A3A3A]",
            "placeholder:text-gray-400 font-sans-serif text-sm font-bold focus:placeholder-transparent",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-purple",
            className
          )}
        />

        {error && <p className="text-primary-orange text-sm">{error}</p>}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

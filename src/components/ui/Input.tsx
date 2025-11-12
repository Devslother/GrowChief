import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "default" | "focus" | "filled" | "error" | "completed";
type InputVariant = "newsletter" | "faq";

const variantClasses: Record<InputVariant, string> = {
  newsletter: `
    h-[74px]
    max-md:h-[56px]
    py-1
    pl-6 
    pr-1
  `,
  faq: `
    h-[100px]
    p-9
    max-md:h-[112px]
    max-md:p-8
  `,
};

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  status?: Status;
  variant?: InputVariant;
  helperText?: string;
  actionLabel?: string;
  onAction?: () => void;
  rightSlot?: ReactNode;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      status = "default",
      variant = "newsletter",
      helperText,
      actionLabel = "Get Started",
      onAction,
      rightSlot,
      wrapperClassName,
      className,
      ...inputProps
    },
    ref
  ) => {
    const isCompleted = status === "completed";
    const showError = status === "error" && !!helperText;

    return (
      <div className={cn("input-gradient-border", wrapperClassName)}>
        <div
          className={cn(
            "input-base flex w-full items-center justify-between rounded-full",
            variantClasses[variant],
            isCompleted && "px-0"
          )}
        >
          {isCompleted ? (
            <div className="w-full h-full rounded-full flex items-center justify-center text-center px-6">
              <span className="font-body-3">{helperText}</span>
            </div>
          ) : (
            <>
              <input
                ref={ref}
                className={cn(
                  "w-full h-full rounded-full outline-none bg-transparent",
                  className
                )}
                {...inputProps}
                aria-invalid={showError || undefined}
                aria-describedby={showError ? "input-helper" : undefined}
              />
              {rightSlot ?? (
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={onAction}
                >
                  {actionLabel}
                </Button>
              )}
            </>
          )}
        </div>

        {showError && (
          <p
            id="input-helper"
            className="mt-2 text-[14px] leading-[20px] font-normal text-danger-red"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };

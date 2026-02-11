import { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isBusy?: boolean;
};

export function Button({
  className,
  variant = "primary",
  isBusy = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold tracking-wide transition-all duration-200",
        variant === "primary" &&
          "signal-sweep bg-accent-primary text-bg-primary shadow-signal hover:translate-y-[-1px]",
        variant === "outline" &&
          "border border-border-base bg-transparent text-text-primary hover:border-border-hover hover:bg-bg-surface",
        variant === "ghost" &&
          "bg-transparent text-text-secondary hover:bg-bg-surface hover:text-text-primary",
        (disabled || isBusy) && "cursor-not-allowed opacity-70",
        className
      )}
      disabled={disabled || isBusy}
      {...props}
    >
      {isBusy ? "Procesando solicitud..." : children}
    </button>
  );
}
